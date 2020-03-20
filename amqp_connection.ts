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
import {
  ConnectionCloseArgs,
  ChannelCloseArgs,
  ConnectionClose,
  ConnectionCloseOk
} from "./amqp_types.ts";

export interface AmqpConnectionOptions {
  username: string;
  password: string;
  heartbeatInterval?: number;
}

const NULL_CHAR = String.fromCharCode(0);
function credentials(username: string, password: string) {
  return `${NULL_CHAR}${username}${NULL_CHAR}${password}`;
}

export class AmqpConnection {
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
    this.channel0 = new AmqpChannel(0, socket);
    this.channels.push(this.channel0);
    this.logger = createLogger(logger);

    this.channel0.subscribe(
      CONNECTION,
      CONNECTION_CLOSE,
      args => this.handleClose(args)
    );

    this.channel0.subscribe(
      CONNECTION,
      CONNECTION_CLOSE_OK,
      args => this.handleCloseOk(args)
    );
    this.socket.subscribe(0, async frame => {
      if (frame.type === "heartbeat") {
        return;
      }
    });
  }

  private async handleClose(close: ConnectionClose) {
    await this.channel0.send(CONNECTION, CONNECTION_CLOSE_OK, {});
    console.error(
      "Connection closed by server ",
      JSON.stringify(close)
    );
    this.socket.close();
  }

  private async handleCloseOk(close: ConnectionCloseOk) {
    this.socket.close();
  }

  async open() {
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
        const channel = new AmqpChannel(i, this.socket);
        this.channels.push(channel);
        return channel;
      }
    }

    throw new Error(`Maximum channels ${this.channelMax} reached`);
  }
}
