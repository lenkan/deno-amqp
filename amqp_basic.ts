import {
  BasicConsumeArgs,
  BasicQosArgs,
  BASIC,
  BASIC_CONSUME_OK,
  BASIC_QOS_OK,
  BasicCancelArgs,
  BASIC_CANCEL_OK,
  BasicPublishArgs,
  BasicProperties,
  methods,
  BasicDeliverPayload,
  BASIC_DELIVER,
  BasicCancelOkPayload,
  QueueDeclareArgs,
  QueueDeclareOkPayload,
  QUEUE_DECLARE_OK,
  QUEUE,
  ExchangeDeclareArgs,
  ExchangeDeclareOkPayload,
  EXCHANGE,
  EXCHANGE_DECLARE_OK,
  BasicAckArgs,
  BasicConsumeOkPayload,
  BasicQosOkPayload,
  BasicNackArgs
} from "./framing/methods.ts";
import { ChannelManager } from "./connection/channel_manager.ts";

export type ContentHandler<T> = (
  args: T,
  props: BasicProperties,
  data: Uint8Array
) => void;

export interface BasicHandler {
  (args: BasicDeliverPayload, props: BasicProperties, data: Uint8Array): void;
}

export interface BasicConsumer {
  consumerTag: string;
}

export class AmqpBasic {
  private consumers: { tag: string; handler: BasicHandler }[] = [];

  constructor(private socket: ChannelManager) {
    this.socket.on(BASIC, BASIC_DELIVER, (args, props, data) => {
      this.consumers.forEach(consumer => {
        if (consumer.tag === args.consumerTag) {
          consumer.handler(args, props, data);
        }
      });
    });
  }

  async qos(args: BasicQosArgs): Promise<BasicQosOkPayload> {
    await this.socket.send(methods.basic.qos(args));
    return this.socket.once(BASIC, BASIC_QOS_OK, a => a);
  }

  async ack(args: BasicAckArgs) {
    await this.socket.send(methods.basic.ack(args));
  }

  async nack(args: BasicNackArgs) {
    await this.socket.send(methods.basic.nack(args));
  }

  async consume(args: BasicConsumeArgs, handler: BasicHandler): Promise<
    BasicConsumeOkPayload
  > {
    await this.socket.send(methods.basic.consume(args));
    const response = await this.socket.once(BASIC, BASIC_CONSUME_OK, a => a);
    this.consumers.push({ tag: response.consumerTag, handler });
    return response;
  }

  async cancel(args: BasicCancelArgs): Promise<BasicCancelOkPayload> {
    await this.socket.send(methods.basic.cancel(args));
    const response = await this.socket.once(BASIC, BASIC_CANCEL_OK, a => a);

    const index = this.consumers.findIndex(c => c.tag === args.consumerTag);
    if (index !== -1) {
      this.consumers.splice(index, index + 1);
    }

    return response;
  }

  async publish(
    args: BasicPublishArgs,
    props: BasicProperties,
    data: Uint8Array
  ): Promise<void> {
    await this.socket.send(methods.basic.publish(args), props, data);
  }

  async declareQueue(args: QueueDeclareArgs): Promise<QueueDeclareOkPayload> {
    await this.socket.send(methods.queue.declare(args));
    const response = await this.socket.once(QUEUE, QUEUE_DECLARE_OK, a => a);
    return response;
  }

  async declareExchange(args: ExchangeDeclareArgs): Promise<
    ExchangeDeclareOkPayload
  > {
    await this.socket.send(methods.exchange.declare(args));
    const response = await this.socket.once(
      EXCHANGE,
      EXCHANGE_DECLARE_OK,
      a => a
    );
    return response;
  }
}
