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
  CHANNEL_CLOSE_OK,
  QUEUE_DECLARE,
  QUEUE,
  QUEUE_DECLARE_OK,
  QUEUE_DELETE,
  QUEUE_DELETE_OK,
  QUEUE_BIND,
  QUEUE_BIND_OK,
  EXCHANGE,
  EXCHANGE_DECLARE,
  EXCHANGE_DECLARE_OK,
  EXCHANGE_DELETE
} from "./framing/constants.ts";
import {
  ChannelOpenOkArgs,
  ChannelCloseArgs,
  ExchangeDeleteOkArgs,
  ExchangeDeclareOkArgs,
  QueueBindOkArgs
} from "./framing/method_decoder.ts";
import { QueueDeclareArgs, QueueDeleteArgs, QueueBindArgs, ExchangeDeclareArgs, ExchangeDeleteArgs } from "./framing/method_encoder.ts";
import { initQueue, QueueMethods, TxMethods, initExchange, ExchangeMethods, initChannel, ChannelMethods, initTx, initBasic, BasicMethods } from "./amqp_methods.ts";

export interface ChannelOptions {
  channelNumber: number;
}

export interface ChannelState {
  open: boolean;
}

export class AmqpChannel {
  private channelNumber: any;
  public readonly queue: QueueMethods;
  public readonly exchange: ExchangeMethods;
  public readonly tx: TxMethods;
  public readonly channel: ChannelMethods;
  public readonly basic: BasicMethods;

  constructor(options: ChannelOptions, private socket: AmqpSocket) {
    this.socket.use(this.middleware.bind(this));
    this.channelNumber = options.channelNumber
    this.queue = initQueue(this.channelNumber, this.socket);
    this.exchange = initExchange(this.channelNumber, this.socket);
    this.channel = initChannel(this.channelNumber, this.socket);
    this.tx = initTx(this.channelNumber, this.socket);
    this.basic = initBasic(this.channelNumber, this.socket);
  }

  handleClose(args: ChannelCloseArgs) {
    console.log(`Channel ${this.channelNumber} closed by server`, args);
  }

  async close() {
    await this.channel.close({
        classId: 0,
        methodId: 0,
        replyCode: CONNECTION_FORCED,
        replyText: `Channel closed by client`
    });
  }

  async open(): Promise<ChannelOpenOkArgs> {
    return this.channel.open({})
  }

  private async middleware(context: FrameContext, next: Next) {
    const { frame: method } = context;

    if (
      method.type !== "method" ||
      method.classId !== CHANNEL ||
      method.channel !== this.channelNumber
    ) {
      return next();
    }

    switch (method.methodId) {
      case CHANNEL_CLOSE:
        this.handleClose(method.args);
        break;
    }

    return next();
  }
}
