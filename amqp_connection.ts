import { AmqpSocket } from "./framing/socket.ts";
import { AmqpChannel } from "./amqp_channel.ts";
import {
  AmqpProtocol,
  ConnectionCloseArgs,
  ConnectionClose,
  ConnectionCloseOk,
  HARD_ERROR_CONNECTION_FORCED
} from "./amqp_protocol.ts";

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
  private heartbeatInterval?: number;
  private channels: AmqpChannel[] = [];
  private channelMax: number = -1;
  private frameMax: number = -1;
  private protocol: AmqpProtocol;

  constructor(
    private socket: AmqpSocket,
    options: AmqpConnectionOptions
  ) {
    this.username = options.username;
    this.password = options.password;
    this.heartbeatInterval = options.heartbeatInterval;
    this.protocol = new AmqpProtocol(socket);

    this.protocol.subscribeConnectionClose(0, args => this.handleClose(args));
    this.protocol.subscribeConnectionCloseOk(
      0,
      args => this.handleCloseOk(args)
    );
  }

  private async handleClose(close: ConnectionClose) {
    await this.protocol.sendConnectionCloseOk(0, {});
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

    await this.protocol.receiveConnectionStart(0);
    await this.protocol.sendConnectionStartOk(0, {
      clientProperties: {},
      response: credentials(this.username, this.password)
    });

    await this.protocol.receiveConnectionTune(0).then(
      async args => {
        const interval = this.heartbeatInterval !== undefined
          ? this.heartbeatInterval
          : args.heartbeat;

        const channelMax = args.channelMax;
        const frameMax = args.frameMax;

        await this.protocol.sendConnectionTuneOk(0, {
          heartbeat: interval,
          channelMax: channelMax,
          frameMax: frameMax
        });

        this.channelMax = channelMax;
        this.frameMax = frameMax;
        this.socket.tuneHeartbeat(interval);
      }
    );

    await this.protocol.sendConnectionOpen(0, {});
  }

  async close(args?: Partial<ConnectionCloseArgs>) {
    await this.protocol.sendConnectionClose(0, {
      classId: args?.classId || 0,
      methodId: args?.methodId || 0,
      replyCode: args?.replyCode || HARD_ERROR_CONNECTION_FORCED,
      replyText: args?.replyText
    });
  }

  createChannel(): AmqpChannel {
    for (let i = 0; i < this.channelMax; ++i) {
      if (!this.channels.find(c => c.channelNumber === i)) {
        const channel = new AmqpChannel(i, this.protocol);
        this.channels.push(channel);
        return channel;
      }
    }

    throw new Error(`Maximum channels ${this.channelMax} reached`);
  }
}
