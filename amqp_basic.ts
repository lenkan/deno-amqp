import { ChannelManager } from "./connection/channel_manager.ts";
import {
  BasicDeliverArgs,
  BasicProperties,
  BasicQosArgs,
  BasicQosOk,
  BasicAckArgs,
  BasicNackArgs,
  BasicConsumeArgs,
  BasicConsumeOk,
  BasicCancelArgs,
  BasicCancelOk,
  BasicPublishArgs,
  QueueDeclareArgs,
  ExchangeDeclareArgs,
  ExchangeDeclareOk,
  QueueDeclareOk
} from "./amqp_types.ts";
import {
  BASIC,
  BASIC_DELIVER,
  BASIC_QOS,
  BASIC_QOS_OK,
  BASIC_ACK,
  BASIC_NACK,
  BASIC_CONSUME_OK,
  BASIC_CONSUME,
  BASIC_CANCEL_OK,
  BASIC_CANCEL,
  BASIC_PUBLISH,
  QUEUE,
  QUEUE_DECLARE_OK,
  QUEUE_DECLARE,
  EXCHANGE_DECLARE,
  EXCHANGE,
  EXCHANGE_DECLARE_OK
} from "./amqp_constants.ts";

export interface BasicHandler {
  (args: BasicDeliverArgs, props: BasicProperties, data: Uint8Array): void;
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

  async qos(args: BasicQosArgs): Promise<BasicQosOk> {
    await this.socket.send(BASIC, BASIC_QOS, args);
    return this.socket.receive(BASIC, BASIC_QOS_OK);
  }

  async ack(args: BasicAckArgs) {
    await this.socket.send(BASIC, BASIC_ACK, args);
  }

  async nack(args: BasicNackArgs) {
    await this.socket.send(BASIC, BASIC_NACK, args);
  }

  async consume(args: BasicConsumeArgs, handler: BasicHandler): Promise<
    BasicConsumeOk
  > {
    await this.socket.send(BASIC, BASIC_CONSUME, args);
    const response = await this.socket.receive(BASIC, BASIC_CONSUME_OK);
    this.consumers.push({ tag: response.consumerTag, handler });
    return response;
  }

  async cancel(args: BasicCancelArgs): Promise<BasicCancelOk> {
    await this.socket.send(BASIC, BASIC_CANCEL, args);
    const response = await this.socket.receive(BASIC, BASIC_CANCEL_OK);

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
    await this.socket.send(BASIC, BASIC_PUBLISH, args, props, data);
  }

  async declareQueue(args: QueueDeclareArgs): Promise<QueueDeclareOk> {
    await this.socket.send(QUEUE, QUEUE_DECLARE, args);
    const response = await this.socket.receive(QUEUE, QUEUE_DECLARE_OK);
    return response;
  }

  async declareExchange(args: ExchangeDeclareArgs): Promise<
    ExchangeDeclareOk
  > {
    await this.socket.send(EXCHANGE, EXCHANGE_DECLARE, args);
    const response = await this.socket.receive(
      EXCHANGE,
      EXCHANGE_DECLARE_OK
    );
    return response;
  }
}
