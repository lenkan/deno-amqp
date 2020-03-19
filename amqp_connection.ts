import { AmqpSocket, Frame, AmqpWriter } from "./framing/socket.ts";
import {
  CONNECTION,
  CONNECTION_START,
  CONNECTION_TUNE,
  CONNECTION_OPEN_OK,
  CONNECTION_CLOSE,
  CONNECTION_CLOSE_OK,
  CONNECTION_START_OK,
  CONNECTION_TUNE_OK,
  CONNECTION_OPEN,
  HARD_ERROR_CONNECTION_FORCED,
  HARD_ERROR_COMMAND_INVALID
} from "./amqp_constants.ts";
import { AmqpChannel } from "./amqp_channel.ts";
import { Logger, createLogger } from "./amqp_connection_logger.ts";
import { ConnectionCloseArgs, ChannelCloseArgs } from "./amqp_types.ts";

export interface AmqpConnectionOptions {
  username: string;
  password: string;
  heartbeatInterval?: number;
}

const NULL_CHAR = String.fromCharCode(0);
function credentials(username: string, password: string) {
  return `${NULL_CHAR}${username}${NULL_CHAR}${password}`;
}

function getFrameError(frame: Frame): ChannelCloseArgs | null {
  if (frame.type === "heartbeat" && frame.channel !== 0) {
    return { classId: 0, methodId: 0, replyCode: HARD_ERROR_COMMAND_INVALID };
  }

  if ((frame.type === "method" || frame.type === "header") &&
    frame.payload.classId === CONNECTION && frame.channel !== 0)
  {
    const methodId = "methodId" in frame.payload
      ? frame.payload.methodId
      : 0;

    return {
      classId: frame.payload.classId,
      methodId,
      replyCode: HARD_ERROR_COMMAND_INVALID
    };
  }
  return null;
}

export class AmqpConnection implements AmqpWriter {
  private username: string;
  private password: string;
  private heartbeatInterval: number;
  private channels: AmqpChannel[] = [];
  private channel0: AmqpChannel;
  private channelMax: number = -1;
  private frameMax: number = -1;
  private logger: {
    logSend: (...args: any) => void;
    logRecv: (...args: any) => void;
  };

  constructor(
    private socket: AmqpSocket,
    options: AmqpConnectionOptions,
    logger?: Logger
  ) {
    this.username = options.username;
    this.password = options.password;
    this.heartbeatInterval = options.heartbeatInterval || 0;
    this.channel0 = new AmqpChannel(0, this);
    this.channels.push(this.channel0);
    this.logger = createLogger(logger);
  }

  write(frame: Frame): Promise<void> {
    this.logger.logSend(frame);
    return this.socket.write(frame);
  }

  async open() {
    return new Promise(async (resolve, reject) => {
      this.listen().catch(reject);

      await this.socket.start();

      await this.channel0.receive(CONNECTION, CONNECTION_START);
      await this.channel0.send(CONNECTION, CONNECTION_START_OK, {
        clientProperties: {},
        response: credentials(this.username, this.password)
      });

      await this.channel0.receive(CONNECTION, CONNECTION_TUNE).then(
        async args => {
          const interval = this.heartbeatInterval !== undefined
            ? this.heartbeatInterval
            : args.heartbeat;

          const channelMax = args.channelMax;
          const frameMax = args.frameMax;

          await this.channel0.send(CONNECTION, CONNECTION_TUNE_OK, {
            heartbeat: interval,
            channelMax: channelMax,
            frameMax: frameMax
          });

          this.channelMax = channelMax;
          this.frameMax = frameMax;
          this.heartbeatInterval = interval;
          // await resetSendHeartbeatTimer();
        }
      );

      await this.channel0.send(10, CONNECTION_OPEN, {});
      await this.channel0.receive(CONNECTION, CONNECTION_OPEN_OK);
      return resolve();
    });
  }

  async close(args?: Partial<ConnectionCloseArgs>) {
    await this.channel0.send(CONNECTION, CONNECTION_CLOSE, {
      classId: args?.classId || 0,
      methodId: args?.methodId || 0,
      replyCode: args?.replyCode || HARD_ERROR_CONNECTION_FORCED,
      replyText: args?.replyText
    });

    await this.channel0.receive(CONNECTION, CONNECTION_CLOSE_OK);
  }

  createChannel(): AmqpChannel {
    for (let i = 0; i < this.channelMax; ++i) {
      if (!this.channels.find(c => c.channel === i)) {
        const channel = new AmqpChannel(i, this);
        this.channels.push(channel);
        return channel;
      }
    }

    throw new Error(`Maximum channels ${this.channelMax} reached`);
  }

  private async listen() {
    while (true) {
      const frame = await this.socket.read();

      if (!frame) {
        this.socket.close();
        throw new Error(`Connection failed`);
      }

      this.logger.logRecv(frame);

      const error = getFrameError(frame);
      if (error) {
        await this.channel0.send(CONNECTION, CONNECTION_CLOSE, error);
      }

      if (frame.type === "heartbeat") {
        continue;
      }

      this.channels.forEach(channel => channel.push(frame));

      if (frame.type === "method" && frame.channel === 0 &&
        frame.payload.classId === CONNECTION &&
        frame.payload.methodId === CONNECTION_CLOSE)
      {
        await this.channel0.send(CONNECTION, CONNECTION_CLOSE_OK, {});
        console.error(
          "Connection closed by server ",
          JSON.stringify(frame.payload.args)
        );
        this.socket.close();
      }

      if (frame.type === "method" && frame.channel === 0 &&
        frame.payload.classId === CONNECTION &&
        frame.payload.methodId === CONNECTION_CLOSE_OK)
      {
        this.socket.close();
        return;
      }
    }
  }
}
