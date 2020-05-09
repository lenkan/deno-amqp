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
  ChannelCloseArgs,
  ChannelCloseOk,
  QueueDeclareArgs,
  QueueDeclareOk,
  ExchangeDeclareArgs,
  ExchangeDeclareOk,
  BasicDeliver,
  QueueDeleteArgs,
  QueueDeleteOk,
  ExchangeDeleteOk,
  ExchangeDeleteArgs,
  QueueBindArgs,
  QueueBindOk,
  QueueUnbindOk,
  QueueUnbindArgs,
} from "./amqp_types.ts";
import { AmqpProtocol } from "./amqp_protocol.ts";
import { HARD_ERROR_CONNECTION_FORCED } from "./amqp_constants.ts";

export interface BasicDeliverHandler {
  (args: BasicDeliver, props: BasicProperties, data: Uint8Array): void;
}

interface Consumer {
  tag: string;
  handler: BasicDeliverHandler;
}

export class AmqpChannel {
  #consumers: Consumer[] = [];
  #channelNumber: number;
  #cancelDelivery: () => void;
  #protocol: AmqpProtocol;

  constructor(channelNumber: number, protocol: AmqpProtocol) {
    this.#protocol = protocol;
    this.#channelNumber = channelNumber;
    this.#cancelDelivery = protocol.subscribeBasicDeliver(
      channelNumber,
      (args, props, data) => {
        this.#consumers.forEach((consumer) => {
          if (consumer.tag === args.consumerTag) {
            consumer.handler(args, props, data);
          }
        });
      },
    );

    protocol.subscribeChannelClose(channelNumber, (args) => {
      return protocol.sendChannelCloseOk(channelNumber, {});
    });
  }

  #handleClose = () => {
    this.#cancelDelivery();
    this.#consumers.splice(0, this.#consumers.length);
  };

  async close(args?: ChannelCloseArgs): Promise<ChannelCloseOk> {
    this.#handleClose();
    const result = await this.#protocol.sendChannelClose(this.#channelNumber, {
      classId: args?.classId || 0,
      methodId: args?.methodId || 0,
      replyCode: args?.replyCode || HARD_ERROR_CONNECTION_FORCED,
      replyText: args?.replyText || "",
    });

    return result;
  }

  async qos(args: BasicQosArgs): Promise<BasicQosOk> {
    return this.#protocol.sendBasicQos(this.#channelNumber, args);
  }

  async ack(args: BasicAckArgs) {
    await this.#protocol.sendBasicAck(this.#channelNumber, args);
  }

  async nack(args: BasicNackArgs) {
    await this.#protocol.sendBasicNack(this.#channelNumber, args);
  }

  async consume(
    args: BasicConsumeArgs,
    handler: BasicDeliverHandler,
  ): Promise<BasicConsumeOk> {
    const response = await this.#protocol.sendBasicConsume(
      this.#channelNumber,
      args,
    );
    this.#consumers.push({ tag: response.consumerTag, handler });
    return response;
  }

  async cancel(args: BasicCancelArgs): Promise<BasicCancelOk> {
    const response = await this.#protocol.sendBasicCancel(
      this.#channelNumber,
      args,
    );

    const index = this.#consumers.findIndex((c) => c.tag === args.consumerTag);
    if (index !== -1) {
      this.#consumers.splice(index, index + 1);
    }

    return response;
  }

  async publish(
    args: BasicPublishArgs,
    props: BasicProperties,
    data: Uint8Array,
  ): Promise<void> {
    await this.#protocol.sendBasicPublish(
      this.#channelNumber,
      args,
      props,
      data,
    );
  }

  async declareQueue(args: QueueDeclareArgs): Promise<QueueDeclareOk> {
    return this.#protocol.sendQueueDeclare(this.#channelNumber, args);
  }

  async deleteQueue(args: QueueDeleteArgs): Promise<QueueDeleteOk> {
    return this.#protocol.sendQueueDelete(this.#channelNumber, args);
  }

  async bindQueue(args: QueueBindArgs): Promise<QueueBindOk> {
    return this.#protocol.sendQueueBind(this.#channelNumber, args);
  }

  async unbindQueue(args: QueueUnbindArgs): Promise<QueueUnbindOk> {
    return this.#protocol.sendQueueUnbind(this.#channelNumber, args);
  }

  async deleteExchange(
    args: ExchangeDeleteArgs,
  ): Promise<ExchangeDeleteOk> {
    return this.#protocol.sendExchangeDelete(this.#channelNumber, args);
  }

  async declareExchange(
    args: ExchangeDeclareArgs,
  ): Promise<ExchangeDeclareOk> {
    return this.#protocol.sendExchangeDeclare(this.#channelNumber, args);
  }
}
