import {
  FrameContext,
  Next,
  AmqpSocket
} from "./framing/socket.ts";
import {
  CHANNEL,
  CHANNEL_OPEN_OK,
  CHANNEL_OPEN,
  CHANNEL_CLOSE,
  CONNECTION_FORCED,
  CHANNEL_CLOSE_OK
} from "./framing/constants.ts";
import {
  ChannelOpenOkArgs,
  ChannelCloseArgs
} from "./framing/method_decoder.ts";

export interface ChannelOptions {
  channelNumber: number;
}

export interface ChannelState {
  open: boolean;
}

export class AmqpChannel {
  private unregister: () => void;
  constructor(private options: ChannelOptions, private socket: AmqpSocket) {
    this.unregister = this.socket.use(this.middleware.bind(this));
  }

  handleClose(args: ChannelCloseArgs) {
    console.log("Channel closed by server", this.options, args);
  }

  handleOpenOk(args: ChannelOpenOkArgs) {
    console.log("Channel open", this.options, args);
  }

  async close() {
    await this.socket.send(this.options.channelNumber, {
      classId: CHANNEL,
      methodId: CHANNEL_CLOSE,
      args: {
        classId: 0,
        methodId: 0,
        replyCode: CONNECTION_FORCED,
        replyText: `Channel closed by client`
      }
    });

    const response = await this.socket.receive(this.options.channelNumber, {
      classId: CHANNEL,
      methodId: CHANNEL_CLOSE_OK
    });

    console.log("Channel closed by client", this.options, response);
  }

  async open(): Promise<ChannelOpenOkArgs> {
    await this.socket.send(this.options.channelNumber, {
      classId: CHANNEL,
      methodId: CHANNEL_OPEN,
      args: {}
    });

    const result = await this.socket.receive(this.options.channelNumber, {
      classId: CHANNEL,
      methodId: CHANNEL_OPEN_OK
    });

    return result;
  }

  private async middleware(context: FrameContext, next: Next) {
    const { frame: method } = context;

    if (
      method.type !== "method" ||
      method.classId !== CHANNEL ||
      method.channel !== this.options.channelNumber
    ) {
      return next();
    }

    switch (method.methodId) {
      case CHANNEL_OPEN_OK:
        this.handleOpenOk(method.args);
        break;
      case CHANNEL_CLOSE:
        this.handleClose(method.args);
        break;
    }

    return next();
  }
}
