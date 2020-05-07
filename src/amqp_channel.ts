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

export interface AmqpChannel {
  close(args?: ChannelCloseArgs): Promise<ChannelCloseOk>;
  qos(args: BasicQosArgs): Promise<BasicQosOk>;
  ack(args: BasicAckArgs): Promise<void>;
  nack(args: BasicNackArgs): Promise<void>;
  consume(
    args: BasicConsumeArgs,
    handler: BasicDeliverHandler,
  ): Promise<BasicConsumeOk>;
  cancel(args: BasicCancelArgs): Promise<BasicCancelOk>;
  publish(
    args: BasicPublishArgs,
    props: BasicProperties,
    data: Uint8Array,
  ): Promise<void>;
  declareQueue(args: QueueDeclareArgs): Promise<QueueDeclareOk>;
  bindQueue(args: QueueBindArgs): Promise<QueueBindOk>;
  unbindQueue(args: QueueUnbindArgs): Promise<QueueUnbindOk>;
  declareExchange(args: ExchangeDeclareArgs): Promise<ExchangeDeclareOk>;
  deleteQueue(args: QueueDeleteArgs): Promise<QueueDeleteOk>;
  deleteExchange(args: ExchangeDeleteArgs): Promise<ExchangeDeleteOk>;
}

interface Consumer {
  tag: string;
  handler: BasicDeliverHandler;
}

export async function openChannel(
  channelNumber: number,
  protocol: AmqpProtocol,
): Promise<AmqpChannel> {
  const consumers: Consumer[] = [];
  const cancelDelivery = protocol.subscribeBasicDeliver(
    channelNumber,
    (args, props, data) => {
      consumers.forEach((consumer) => {
        if (consumer.tag === args.consumerTag) {
          consumer.handler(args, props, data);
        }
      });
    },
  );

  protocol.subscribeChannelClose(channelNumber, (args) => {
    return protocol.sendChannelCloseOk(channelNumber, {});
  });

  function handleClose() {
    cancelDelivery();
    consumers.splice(0, consumers.length);
  }

  async function close(args?: ChannelCloseArgs): Promise<ChannelCloseOk> {
    handleClose();
    const result = await protocol.sendChannelClose(channelNumber, {
      classId: args?.classId || 0,
      methodId: args?.methodId || 0,
      replyCode: args?.replyCode || HARD_ERROR_CONNECTION_FORCED,
      replyText: args?.replyText || "",
    });

    return result;
  }

  async function qos(args: BasicQosArgs): Promise<BasicQosOk> {
    return protocol.sendBasicQos(channelNumber, args);
  }

  async function ack(args: BasicAckArgs) {
    await protocol.sendBasicAck(channelNumber, args);
  }

  async function nack(args: BasicNackArgs) {
    await protocol.sendBasicNack(channelNumber, args);
  }

  async function consume(
    args: BasicConsumeArgs,
    handler: BasicDeliverHandler,
  ): Promise<BasicConsumeOk> {
    const response = await protocol.sendBasicConsume(
      channelNumber,
      args,
    );
    consumers.push({ tag: response.consumerTag, handler });
    return response;
  }

  async function cancel(args: BasicCancelArgs): Promise<BasicCancelOk> {
    const response = await protocol.sendBasicCancel(
      channelNumber,
      args,
    );

    const index = consumers.findIndex((c) => c.tag === args.consumerTag);
    if (index !== -1) {
      consumers.splice(index, index + 1);
    }

    return response;
  }

  async function publish(
    args: BasicPublishArgs,
    props: BasicProperties,
    data: Uint8Array,
  ): Promise<void> {
    await protocol.sendBasicPublish(
      channelNumber,
      args,
      props,
      data,
    );
  }

  async function declareQueue(args: QueueDeclareArgs): Promise<QueueDeclareOk> {
    return protocol.sendQueueDeclare(channelNumber, args);
  }

  async function deleteQueue(args: QueueDeleteArgs): Promise<QueueDeleteOk> {
    return protocol.sendQueueDelete(channelNumber, args);
  }

  async function bindQueue(args: QueueBindArgs): Promise<QueueBindOk> {
    return protocol.sendQueueBind(channelNumber, args);
  }

  async function unbindQueue(args: QueueUnbindArgs): Promise<QueueUnbindOk> {
    return protocol.sendQueueUnbind(channelNumber, args);
  }

  async function deleteExchange(
    args: ExchangeDeleteArgs,
  ): Promise<ExchangeDeleteOk> {
    return protocol.sendExchangeDelete(channelNumber, args);
  }

  async function declareExchange(
    args: ExchangeDeclareArgs,
  ): Promise<ExchangeDeclareOk> {
    return protocol.sendExchangeDeclare(channelNumber, args);
  }

  await protocol.sendChannelOpen(channelNumber, {});
  return {
    close,
    declareExchange,
    declareQueue,
    deleteQueue,
    bindQueue,
    unbindQueue,
    deleteExchange,
    ack,
    nack,
    cancel,
    consume,
    publish,
    qos,
  };
}
