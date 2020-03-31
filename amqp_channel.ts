import {
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
  BasicDeliverArgs,
  AmqpProtocol,
  ChannelOpenArgs,
  ChannelOpenOk,
  ChannelCloseArgs,
  HARD_ERROR_CONNECTION_FORCED,
  ChannelCloseOk,
  QueueDeclareArgs,
  QueueDeclareOk,
  ExchangeDeclareArgs,
  ExchangeDeclareOk
} from "./amqp_protocol.ts";

export interface BasicDeliverHandler {
  (args: BasicDeliverArgs, props: BasicProperties, data: Uint8Array): void;
}

export class AmqpChannel {
  private consumers: { tag: string; handler: BasicDeliverHandler }[] = [];

  constructor(public channelNumber: number, private protocol: AmqpProtocol) {
    this.protocol.subscribeBasicDeliver(channelNumber, (args, props, data) => {
      this.consumers.forEach(consumer => {
        if (consumer.tag === args.consumerTag) {
          consumer.handler(args, props, data);
        }
      });
    });
  }

  async open(args: ChannelOpenArgs): Promise<ChannelOpenOk> {
    return this.protocol.sendChannelOpen(this.channelNumber, args);
  }

  async close(args?: ChannelCloseArgs): Promise<ChannelCloseOk> {
    return this.protocol.sendChannelClose(this.channelNumber, {
      classId: args?.classId || 0,
      methodId: args?.methodId || 0,
      replyCode: args?.replyCode || HARD_ERROR_CONNECTION_FORCED,
      replyText: args?.replyText || ""
    });
  }

  async qos(args: BasicQosArgs): Promise<BasicQosOk> {
    return this.protocol.sendBasicQos(this.channelNumber, args);
  }

  async ack(args: BasicAckArgs) {
    await this.protocol.sendBasicAck(this.channelNumber, args);
  }

  async nack(args: BasicNackArgs) {
    await this.protocol.sendBasicNack(this.channelNumber, args);
  }

  async consume(args: BasicConsumeArgs, handler: BasicDeliverHandler): Promise<
    BasicConsumeOk
  > {
    const response = await this.protocol.sendBasicConsume(
      this.channelNumber,
      args
    );
    this.consumers.push({ tag: response.consumerTag, handler });
    return response;
  }

  async cancel(args: BasicCancelArgs): Promise<BasicCancelOk> {
    const response = await this.protocol.sendBasicCancel(
      this.channelNumber,
      args
    );

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
    await this.protocol.sendBasicPublish(
      this.channelNumber,
      args,
      props,
      data
    );
  }

  async declareQueue(args: QueueDeclareArgs): Promise<QueueDeclareOk> {
    return this.protocol.sendQueueDeclare(this.channelNumber, args);
  }

  async declareExchange(args: ExchangeDeclareArgs): Promise<
    ExchangeDeclareOk
  > {
    return this.protocol.sendExchangeDeclare(this.channelNumber, args);
  }
}
