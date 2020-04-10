export interface ConnectionProperties {
}

export interface ChannelProperties {
}

export interface AccessProperties {
}

export interface ExchangeProperties {
}

export interface QueueProperties {
}

export interface BasicProperties {
  contentType?: string;
  contentEncoding?: string;
  headers?: Record<string, unknown>;
  deliveryMode?: number;
  priority?: number;
  correlationId?: string;
  replyTo?: string;
  expiration?: string;
  messageId?: string;
  timestamp?: number;
  type?: string;
  userId?: string;
  appId?: string;
  clusterId?: string;
}

export interface TxProperties {
}

export interface ConfirmProperties {
}

export interface ConnectionStartArgs {
  /** Default 0 */ versionMajor?: number;
  /** Default 9 */ versionMinor?: number;
  serverProperties: Record<string, unknown>;
  /** Default "PLAIN" */ mechanisms?: string;
  /** Default "en_US" */ locales?: string;
}

export interface ConnectionStartOkArgs {
  clientProperties: Record<string, unknown>;
  /** Default "PLAIN" */ mechanism?: string;
  response: string;
  /** Default "en_US" */ locale?: string;
}

export interface ConnectionSecureArgs {
  challenge: string;
}

export interface ConnectionSecureOkArgs {
  response: string;
}

export interface ConnectionTuneArgs {
  /** Default 0 */ channelMax?: number;
  /** Default 0 */ frameMax?: number;
  /** Default 0 */ heartbeat?: number;
}

export interface ConnectionTuneOkArgs {
  /** Default 0 */ channelMax?: number;
  /** Default 0 */ frameMax?: number;
  /** Default 0 */ heartbeat?: number;
}

export interface ConnectionOpenArgs {
  /** Default "/" */ virtualHost?: string;
  /** Default "" */ capabilities?: string;
  /** Default false */ insist?: boolean;
}

export interface ConnectionOpenOkArgs {
  /** Default "" */ knownHosts?: string;
}

export interface ConnectionCloseArgs {
  replyCode: number;
  /** Default "" */ replyText?: string;
  classId: number;
  methodId: number;
}

export interface ConnectionCloseOkArgs {
}

export interface ConnectionBlockedArgs {
  /** Default "" */ reason?: string;
}

export interface ConnectionUnblockedArgs {
}

export interface ConnectionUpdateSecretArgs {
  newSecret: string;
  reason: string;
}

export interface ConnectionUpdateSecretOkArgs {
}

export interface ChannelOpenArgs {
  /** Default "" */ outOfBand?: string;
}

export interface ChannelOpenOkArgs {
  /** Default "" */ channelId?: string;
}

export interface ChannelFlowArgs {
  active: boolean;
}

export interface ChannelFlowOkArgs {
  active: boolean;
}

export interface ChannelCloseArgs {
  replyCode: number;
  /** Default "" */ replyText?: string;
  classId: number;
  methodId: number;
}

export interface ChannelCloseOkArgs {
}

export interface AccessRequestArgs {
  /** Default "/data" */ realm?: string;
  /** Default false */ exclusive?: boolean;
  /** Default true */ passive?: boolean;
  /** Default true */ active?: boolean;
  /** Default true */ write?: boolean;
  /** Default true */ read?: boolean;
}

export interface AccessRequestOkArgs {
  /** Default 1 */ ticket?: number;
}

export interface ExchangeDeclareArgs {
  /** Default 0 */ ticket?: number;
  exchange: string;
  /** Default "direct" */ type?: string;
  /** Default false */ passive?: boolean;
  /** Default false */ durable?: boolean;
  /** Default false */ autoDelete?: boolean;
  /** Default false */ internal?: boolean;
  /** Default {} */ arguments?: Record<string, unknown>;
}

export interface ExchangeDeclareOkArgs {
}

export interface ExchangeDeleteArgs {
  /** Default 0 */ ticket?: number;
  exchange: string;
  /** Default false */ ifUnused?: boolean;
}

export interface ExchangeDeleteOkArgs {
}

export interface ExchangeBindArgs {
  /** Default 0 */ ticket?: number;
  destination: string;
  source: string;
  /** Default "" */ routingKey?: string;
  /** Default {} */ arguments?: Record<string, unknown>;
}

export interface ExchangeBindOkArgs {
}

export interface ExchangeUnbindArgs {
  /** Default 0 */ ticket?: number;
  destination: string;
  source: string;
  /** Default "" */ routingKey?: string;
  /** Default {} */ arguments?: Record<string, unknown>;
}

export interface ExchangeUnbindOkArgs {
}

export interface QueueDeclareArgs {
  /** Default 0 */ ticket?: number;
  /** Default "" */ queue?: string;
  /** Default false */ passive?: boolean;
  /** Default false */ durable?: boolean;
  /** Default false */ exclusive?: boolean;
  /** Default false */ autoDelete?: boolean;
  /** Default {} */ arguments?: Record<string, unknown>;
}

export interface QueueDeclareOkArgs {
  queue: string;
  messageCount: number;
  consumerCount: number;
}

export interface QueueBindArgs {
  /** Default 0 */ ticket?: number;
  /** Default "" */ queue?: string;
  exchange: string;
  /** Default "" */ routingKey?: string;
  /** Default {} */ arguments?: Record<string, unknown>;
}

export interface QueueBindOkArgs {
}

export interface QueuePurgeArgs {
  /** Default 0 */ ticket?: number;
  /** Default "" */ queue?: string;
}

export interface QueuePurgeOkArgs {
  messageCount: number;
}

export interface QueueDeleteArgs {
  /** Default 0 */ ticket?: number;
  /** Default "" */ queue?: string;
  /** Default false */ ifUnused?: boolean;
  /** Default false */ ifEmpty?: boolean;
}

export interface QueueDeleteOkArgs {
  messageCount: number;
}

export interface QueueUnbindArgs {
  /** Default 0 */ ticket?: number;
  /** Default "" */ queue?: string;
  exchange: string;
  /** Default "" */ routingKey?: string;
  /** Default {} */ arguments?: Record<string, unknown>;
}

export interface QueueUnbindOkArgs {
}

export interface BasicQosArgs {
  /** Default 0 */ prefetchSize?: number;
  /** Default 0 */ prefetchCount?: number;
  /** Default false */ global?: boolean;
}

export interface BasicQosOkArgs {
}

export interface BasicConsumeArgs {
  /** Default 0 */ ticket?: number;
  /** Default "" */ queue?: string;
  /** Default "" */ consumerTag?: string;
  /** Default false */ noLocal?: boolean;
  /** Default false */ noAck?: boolean;
  /** Default false */ exclusive?: boolean;
  /** Default {} */ arguments?: Record<string, unknown>;
}

export interface BasicConsumeOkArgs {
  consumerTag: string;
}

export interface BasicCancelArgs {
  consumerTag: string;
}

export interface BasicCancelOkArgs {
  consumerTag: string;
}

export interface BasicPublishArgs {
  /** Default 0 */ ticket?: number;
  /** Default "" */ exchange?: string;
  /** Default "" */ routingKey?: string;
  /** Default false */ mandatory?: boolean;
  /** Default false */ immediate?: boolean;
}

export interface BasicReturnArgs {
  replyCode: number;
  /** Default "" */ replyText?: string;
  exchange: string;
  routingKey: string;
}

export interface BasicDeliverArgs {
  consumerTag: string;
  deliveryTag: number;
  /** Default false */ redelivered?: boolean;
  exchange: string;
  routingKey: string;
}

export interface BasicGetArgs {
  /** Default 0 */ ticket?: number;
  /** Default "" */ queue?: string;
  /** Default false */ noAck?: boolean;
}

export interface BasicGetOkArgs {
  deliveryTag: number;
  /** Default false */ redelivered?: boolean;
  exchange: string;
  routingKey: string;
  messageCount: number;
}

export interface BasicGetEmptyArgs {
  /** Default "" */ clusterId?: string;
}

export interface BasicAckArgs {
  /** Default 0 */ deliveryTag?: number;
  /** Default false */ multiple?: boolean;
}

export interface BasicRejectArgs {
  deliveryTag: number;
  /** Default true */ requeue?: boolean;
}

export interface BasicRecoverAsyncArgs {
  /** Default false */ requeue?: boolean;
}

export interface BasicRecoverArgs {
  /** Default false */ requeue?: boolean;
}

export interface BasicRecoverOkArgs {
}

export interface BasicNackArgs {
  /** Default 0 */ deliveryTag?: number;
  /** Default false */ multiple?: boolean;
  /** Default true */ requeue?: boolean;
}

export interface TxSelectArgs {
}

export interface TxSelectOkArgs {
}

export interface TxCommitArgs {
}

export interface TxCommitOkArgs {
}

export interface TxRollbackArgs {
}

export interface TxRollbackOkArgs {
}

export interface ConfirmSelectArgs {
}

export interface ConfirmSelectOkArgs {
}

export interface ConnectionStart extends ConnectionStartArgs {
  versionMajor: number;
  versionMinor: number;
  serverProperties: Record<string, unknown>;
  mechanisms: string;
  locales: string;
}

export interface ConnectionStartOk extends ConnectionStartOkArgs {
  clientProperties: Record<string, unknown>;
  mechanism: string;
  response: string;
  locale: string;
}

export interface ConnectionSecure extends ConnectionSecureArgs {
  challenge: string;
}

export interface ConnectionSecureOk extends ConnectionSecureOkArgs {
  response: string;
}

export interface ConnectionTune extends ConnectionTuneArgs {
  channelMax: number;
  frameMax: number;
  heartbeat: number;
}

export interface ConnectionTuneOk extends ConnectionTuneOkArgs {
  channelMax: number;
  frameMax: number;
  heartbeat: number;
}

export interface ConnectionOpen extends ConnectionOpenArgs {
  virtualHost: string;
  capabilities: string;
  insist: boolean;
}

export interface ConnectionOpenOk extends ConnectionOpenOkArgs {
  knownHosts: string;
}

export interface ConnectionClose extends ConnectionCloseArgs {
  replyCode: number;
  replyText: string;
  classId: number;
  methodId: number;
}

export interface ConnectionCloseOk extends ConnectionCloseOkArgs {
}

export interface ConnectionBlocked extends ConnectionBlockedArgs {
  reason: string;
}

export interface ConnectionUnblocked extends ConnectionUnblockedArgs {
}

export interface ConnectionUpdateSecret extends ConnectionUpdateSecretArgs {
  newSecret: string;
  reason: string;
}

export interface ConnectionUpdateSecretOk extends ConnectionUpdateSecretOkArgs {
}

export interface ChannelOpen extends ChannelOpenArgs {
  outOfBand: string;
}

export interface ChannelOpenOk extends ChannelOpenOkArgs {
  channelId: string;
}

export interface ChannelFlow extends ChannelFlowArgs {
  active: boolean;
}

export interface ChannelFlowOk extends ChannelFlowOkArgs {
  active: boolean;
}

export interface ChannelClose extends ChannelCloseArgs {
  replyCode: number;
  replyText: string;
  classId: number;
  methodId: number;
}

export interface ChannelCloseOk extends ChannelCloseOkArgs {
}

export interface AccessRequest extends AccessRequestArgs {
  realm: string;
  exclusive: boolean;
  passive: boolean;
  active: boolean;
  write: boolean;
  read: boolean;
}

export interface AccessRequestOk extends AccessRequestOkArgs {
  ticket: number;
}

export interface ExchangeDeclare extends ExchangeDeclareArgs {
  ticket: number;
  exchange: string;
  type: string;
  passive: boolean;
  durable: boolean;
  autoDelete: boolean;
  internal: boolean;
  nowait: boolean;
  arguments: Record<string, unknown>;
}

export interface ExchangeDeclareOk extends ExchangeDeclareOkArgs {
}

export interface ExchangeDelete extends ExchangeDeleteArgs {
  ticket: number;
  exchange: string;
  ifUnused: boolean;
  nowait: boolean;
}

export interface ExchangeDeleteOk extends ExchangeDeleteOkArgs {
}

export interface ExchangeBind extends ExchangeBindArgs {
  ticket: number;
  destination: string;
  source: string;
  routingKey: string;
  nowait: boolean;
  arguments: Record<string, unknown>;
}

export interface ExchangeBindOk extends ExchangeBindOkArgs {
}

export interface ExchangeUnbind extends ExchangeUnbindArgs {
  ticket: number;
  destination: string;
  source: string;
  routingKey: string;
  nowait: boolean;
  arguments: Record<string, unknown>;
}

export interface ExchangeUnbindOk extends ExchangeUnbindOkArgs {
}

export interface QueueDeclare extends QueueDeclareArgs {
  ticket: number;
  queue: string;
  passive: boolean;
  durable: boolean;
  exclusive: boolean;
  autoDelete: boolean;
  nowait: boolean;
  arguments: Record<string, unknown>;
}

export interface QueueDeclareOk extends QueueDeclareOkArgs {
  queue: string;
  messageCount: number;
  consumerCount: number;
}

export interface QueueBind extends QueueBindArgs {
  ticket: number;
  queue: string;
  exchange: string;
  routingKey: string;
  nowait: boolean;
  arguments: Record<string, unknown>;
}

export interface QueueBindOk extends QueueBindOkArgs {
}

export interface QueuePurge extends QueuePurgeArgs {
  ticket: number;
  queue: string;
  nowait: boolean;
}

export interface QueuePurgeOk extends QueuePurgeOkArgs {
  messageCount: number;
}

export interface QueueDelete extends QueueDeleteArgs {
  ticket: number;
  queue: string;
  ifUnused: boolean;
  ifEmpty: boolean;
  nowait: boolean;
}

export interface QueueDeleteOk extends QueueDeleteOkArgs {
  messageCount: number;
}

export interface QueueUnbind extends QueueUnbindArgs {
  ticket: number;
  queue: string;
  exchange: string;
  routingKey: string;
  arguments: Record<string, unknown>;
}

export interface QueueUnbindOk extends QueueUnbindOkArgs {
}

export interface BasicQos extends BasicQosArgs {
  prefetchSize: number;
  prefetchCount: number;
  global: boolean;
}

export interface BasicQosOk extends BasicQosOkArgs {
}

export interface BasicConsume extends BasicConsumeArgs {
  ticket: number;
  queue: string;
  consumerTag: string;
  noLocal: boolean;
  noAck: boolean;
  exclusive: boolean;
  nowait: boolean;
  arguments: Record<string, unknown>;
}

export interface BasicConsumeOk extends BasicConsumeOkArgs {
  consumerTag: string;
}

export interface BasicCancel extends BasicCancelArgs {
  consumerTag: string;
  nowait: boolean;
}

export interface BasicCancelOk extends BasicCancelOkArgs {
  consumerTag: string;
}

export interface BasicPublish extends BasicPublishArgs {
  ticket: number;
  exchange: string;
  routingKey: string;
  mandatory: boolean;
  immediate: boolean;
}

export interface BasicReturn extends BasicReturnArgs {
  replyCode: number;
  replyText: string;
  exchange: string;
  routingKey: string;
}

export interface BasicDeliver extends BasicDeliverArgs {
  consumerTag: string;
  deliveryTag: number;
  redelivered: boolean;
  exchange: string;
  routingKey: string;
}

export interface BasicGet extends BasicGetArgs {
  ticket: number;
  queue: string;
  noAck: boolean;
}

export interface BasicGetOk extends BasicGetOkArgs {
  deliveryTag: number;
  redelivered: boolean;
  exchange: string;
  routingKey: string;
  messageCount: number;
}

export interface BasicGetEmpty extends BasicGetEmptyArgs {
  clusterId: string;
}

export interface BasicAck extends BasicAckArgs {
  deliveryTag: number;
  multiple: boolean;
}

export interface BasicReject extends BasicRejectArgs {
  deliveryTag: number;
  requeue: boolean;
}

export interface BasicRecoverAsync extends BasicRecoverAsyncArgs {
  requeue: boolean;
}

export interface BasicRecover extends BasicRecoverArgs {
  requeue: boolean;
}

export interface BasicRecoverOk extends BasicRecoverOkArgs {
}

export interface BasicNack extends BasicNackArgs {
  deliveryTag: number;
  multiple: boolean;
  requeue: boolean;
}

export interface TxSelect extends TxSelectArgs {
}

export interface TxSelectOk extends TxSelectOkArgs {
}

export interface TxCommit extends TxCommitArgs {
}

export interface TxCommitOk extends TxCommitOkArgs {
}

export interface TxRollback extends TxRollbackArgs {
}

export interface TxRollbackOk extends TxRollbackOkArgs {
}

export interface ConfirmSelect extends ConfirmSelectArgs {
  nowait: boolean;
}

export interface ConfirmSelectOk extends ConfirmSelectOkArgs {
}
