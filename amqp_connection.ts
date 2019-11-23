import {
  CONNECTION,
  CONNECTION_START,
  CONNECTION_START_OK,
  CONNECTION_TUNE,
  CONNECTION_TUNE_OK,
  CONNECTION_OPEN,
  CONNECTION_OPEN_OK,
  CONNECTION_CLOSE,
  CONNECTION_CLOSE_OK,
  CONNECTION_FORCED
} from "./framing/constants.ts";
import {
  ConnectionStartArgs,
  ConnectionTuneArgs,
  ConnectionOpenOkArgs,
  ConnectionCloseArgs,
  ConnectionCloseOkArgs
} from "./framing/method_decoder.ts";
import { MethodPayload as OutgoingMethodPayload } from "./framing/method_encoder.ts";
import {
  Next,
  FrameContext,
  AmqpSocket
} from "./framing/socket.ts";
import { AmqpChannel } from "./amqp_channel.ts";

const NULL_CHAR = String.fromCharCode(0);

export interface ConnectionOptions {
  user: string;
  password: string;
}

export interface ConnectionState {
  open: boolean;
  closing: boolean;
}

export class AmqpConnection {
  private closing : boolean = false;
  private open : boolean = false;

  public constructor(private options: ConnectionOptions, private socket: AmqpSocket) {
    this.socket.use(this.middleware.bind(this));
  }

  private async emit(m: OutgoingMethodPayload) {
    return this.socket.write({ channel: 0, type: "method", ...m });
  }

  private async handleStart(args: ConnectionStartArgs) {
    return this.emit({
      methodId: CONNECTION_START_OK,
      classId: CONNECTION,
      args: {
        clientProperties: {},
        locale: args.locales.split(" ")[0],
        mechanism: args.mechanisms.split(" ")[0],
        response: `${NULL_CHAR}${this.options.user}${NULL_CHAR}${this.options.password}`
      }
    });
  }

  private async handleTune(args: ConnectionTuneArgs) {
    await this.emit({
      classId: CONNECTION,
      methodId: CONNECTION_TUNE_OK,
      args: {
        channelMax: args.channelMax,
        frameMax: args.frameMax,
        heartbeat: 0 //method.args.heartbeat
      }
    });

    await this.emit({
      classId: CONNECTION,
      methodId: CONNECTION_OPEN,
      args: {}
    });
  }

  async handleOpenOk(args: ConnectionOpenOkArgs) {
    console.log("Connection opened");
    this.open = true;
  }

  async handleClose(args: ConnectionCloseArgs) {
    console.log("Received close", args);
    this.open = false;
    await this.emit({
      classId: CONNECTION,
      methodId: CONNECTION_CLOSE_OK,
      args: {}
    });
  }

  async handleCloseOk(args: ConnectionCloseOkArgs) {
    console.log("Received close", args);
    this.open = false;
    this.closing = false;
  }

  async init() {
    await this.socket.start();
    await this.socket.receive(0, {
      classId: CONNECTION,
      methodId: CONNECTION_OPEN_OK
    });
  }

  async close() {
    await this.socket.send(0, {
      methodId: CONNECTION_CLOSE,
      classId: CONNECTION,
      args: {
        classId: CONNECTION,
        methodId: CONNECTION_CLOSE,
        replyCode: CONNECTION_FORCED,
        replyText: `Connection closed by client`
      }
    });

    await this.socket.receive(0, {
      classId: CONNECTION,
      methodId: CONNECTION_CLOSE_OK
    });
  }

  private async middleware(context: FrameContext, next: Next) {
    const { frame: method } = context;
    if (
      this.closing &&
      !(
        method.type === "method" &&
        method.classId === CONNECTION &&
        method.methodId === CONNECTION_CLOSE_OK
      )
    ) {
      return;
    }

    if (method.type !== "method" || method.classId !== CONNECTION) {
      return next();
    }

    switch (method.methodId) {
      case CONNECTION_START:
        await this.handleStart(method.args);
        break;
      case CONNECTION_TUNE:
        await this.handleTune(method.args);
        break;
      case CONNECTION_OPEN_OK:
        await this.handleOpenOk(method.args);
        break;
      case CONNECTION_CLOSE:
        await this.handleClose(method.args);
        break;
      case CONNECTION_CLOSE_OK:
        await this.handleCloseOk(method.args);
        break;
    }

    return next();
  }
}
