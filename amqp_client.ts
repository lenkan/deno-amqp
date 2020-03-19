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
  QueueDeclareOk,
  QueueDeleteArgs,
  QueueDeleteOk,
  ExchangeDeleteArgs,
  ExchangeDeleteOk,
  QueueBindOk,
  QueueBindArgs,
  QueueUnbindArgs,
  QueueUnbindOk,
  ExchangeBindArgs,
  ExchangeBindOk,
  ExchangeUnbindArgs,
  ExchangeUnbindOk,
  QueuePurgeArgs,
  QueuePurgeOk
} from "./amqp_types.ts";

export interface BasicDeliverHandler {
  (args: BasicDeliverArgs, props: BasicProperties, data: Uint8Array): void;
}

export interface AmqpBasic {
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
}

export interface AmqpQueue {
  declareQueue(args: QueueDeclareArgs): Promise<QueueDeclareOk>;
  deleteQueue(args: QueueDeleteArgs): Promise<QueueDeleteOk>;
  bindQueue(args: QueueBindArgs): Promise<QueueBindOk>;
  unbindQueue(args: QueueUnbindArgs): Promise<QueueUnbindOk>;
  purgeQueue(args: QueuePurgeArgs): Promise<QueuePurgeOk>;
}

export interface AmqpExchange {
  declareExchange(args: ExchangeDeclareArgs): Promise<ExchangeDeclareOk>;
  deleteExchange(args: ExchangeDeleteArgs): Promise<ExchangeDeleteOk>;
  bindExchange(args: ExchangeBindArgs): Promise<ExchangeBindOk>;
  unbindExchange(args: ExchangeUnbindArgs): Promise<ExchangeUnbindOk>;
}
