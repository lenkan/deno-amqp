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
  ChannelCloseArgs,
  HARD_ERROR_CONNECTION_FORCED,
  ChannelCloseOk,
  QueueDeclareArgs,
  QueueDeclareOk,
  ExchangeDeclareArgs,
  ExchangeDeclareOk,
  ChannelClose
} from "./amqp_protocol.ts";

export interface BasicDeliverHandler {
  (args: BasicDeliverArgs, props: BasicProperties, data: Uint8Array): void;
}

export interface AmqpChannel {
  close(args?: ChannelCloseArgs): Promise<ChannelCloseOk>;
  qos(args: BasicQosArgs): Promise<BasicQosOk>;
  ack(args: BasicAckArgs): Promise<void>;
  nack(args: BasicNackArgs): Promise<void>;
  consume(args: BasicConsumeArgs, handler: BasicDeliverHandler): Promise<
    BasicConsumeOk
  >;
  cancel(args: BasicCancelArgs): Promise<BasicCancelOk>;
  publish(
    args: BasicPublishArgs,
    props: BasicProperties,
    data: Uint8Array
  ): Promise<void>;
  declareQueue(args: QueueDeclareArgs): Promise<QueueDeclareOk>;
  declareExchange(args: ExchangeDeclareArgs): Promise<
    ExchangeDeclareOk
  >;
}

interface Consumer {
  tag: string;
  handler: BasicDeliverHandler;
}

export type ChannelCloseHandler = (args: ChannelClose) => void;

export async function openChannel(
  channelNumber: number,
  protocol: AmqpProtocol,
  onClose: ChannelCloseHandler
) {
  const consumers: Consumer[] = [];
  let isOpen: boolean = false;
  const cancelDelivery = protocol.subscribeBasicDeliver(
    channelNumber,
    (args, props, data) => {
      consumers.forEach(consumer => {
        if (consumer.tag === args.consumerTag) {
          consumer.handler(args, props, data);
        }
      });
    }
  );

  protocol.subscribeChannelClose(channelNumber, args => {
    handleClose(args);
    return protocol.sendChannelCloseOk(channelNumber, {});
  });

  function assertOpen() {
    if (!isOpen) {
      throw new Error(`Cannot use closed channel ${channelNumber}`);
    }
  }

  function handleClose(args?: ChannelClose) {
    isOpen = false;
    args && onClose(args);
    cancelDelivery();
    consumers.splice(0, consumers.length);
  }

  async function close(args?: ChannelCloseArgs): Promise<ChannelCloseOk> {
    assertOpen();
    handleClose();
    return protocol.sendChannelClose(channelNumber, {
      classId: args?.classId || 0,
      methodId: args?.methodId || 0,
      replyCode: args?.replyCode || HARD_ERROR_CONNECTION_FORCED,
      replyText: args?.replyText || ""
    });
  }

  async function qos(args: BasicQosArgs): Promise<BasicQosOk> {
    assertOpen();
    return protocol.sendBasicQos(channelNumber, args);
  }

  async function ack(args: BasicAckArgs) {
    assertOpen();
    await protocol.sendBasicAck(channelNumber, args);
  }

  async function nack(args: BasicNackArgs) {
    assertOpen();
    await protocol.sendBasicNack(channelNumber, args);
  }

  async function consume(
    args: BasicConsumeArgs,
    handler: BasicDeliverHandler
  ): Promise<
    BasicConsumeOk
  > {
    assertOpen();
    const response = await protocol.sendBasicConsume(
      channelNumber,
      args
    );
    consumers.push({ tag: response.consumerTag, handler });
    return response;
  }

  async function cancel(args: BasicCancelArgs): Promise<BasicCancelOk> {
    assertOpen();
    const response = await protocol.sendBasicCancel(
      channelNumber,
      args
    );

    const index = consumers.findIndex(c => c.tag === args.consumerTag);
    if (index !== -1) {
      consumers.splice(index, index + 1);
    }

    return response;
  }

  async function publish(
    args: BasicPublishArgs,
    props: BasicProperties,
    data: Uint8Array
  ): Promise<void> {
    assertOpen();
    await protocol.sendBasicPublish(
      channelNumber,
      args,
      props,
      data
    );
  }

  async function declareQueue(args: QueueDeclareArgs): Promise<
    QueueDeclareOk
  > {
    assertOpen();
    return protocol.sendQueueDeclare(channelNumber, args);
  }

  async function declareExchange(args: ExchangeDeclareArgs): Promise<
    ExchangeDeclareOk
  > {
    assertOpen();
    return protocol.sendExchangeDeclare(channelNumber, args);
  }

  const channel: AmqpChannel = {
    close,
    declareExchange,
    declareQueue,
    ack,
    nack,
    cancel,
    consume,
    publish,
    qos
  };

  return new Promise<AmqpChannel>(async (resolve, reject) => {
    await protocol.sendChannelOpen(channelNumber, {});
    isOpen = true;
    return resolve(channel);
  });
}
