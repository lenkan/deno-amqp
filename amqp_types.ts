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
  timestamp?: bigint;
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
  /** Default false */ nowait?: boolean;
  /** Default {} */ arguments?: Record<string, unknown>;
}

export interface ExchangeDeclareOkArgs {
}

export interface ExchangeDeleteArgs {
  /** Default 0 */ ticket?: number;
  exchange: string;
  /** Default false */ ifUnused?: boolean;
  /** Default false */ nowait?: boolean;
}

export interface ExchangeDeleteOkArgs {
}

export interface ExchangeBindArgs {
  /** Default 0 */ ticket?: number;
  destination: string;
  source: string;
  /** Default "" */ routingKey?: string;
  /** Default false */ nowait?: boolean;
  /** Default {} */ arguments?: Record<string, unknown>;
}

export interface ExchangeBindOkArgs {
}

export interface ExchangeUnbindArgs {
  /** Default 0 */ ticket?: number;
  destination: string;
  source: string;
  /** Default "" */ routingKey?: string;
  /** Default false */ nowait?: boolean;
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
  /** Default false */ nowait?: boolean;
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
  /** Default false */ nowait?: boolean;
  /** Default {} */ arguments?: Record<string, unknown>;
}

export interface QueueBindOkArgs {
}

export interface QueuePurgeArgs {
  /** Default 0 */ ticket?: number;
  /** Default "" */ queue?: string;
  /** Default false */ nowait?: boolean;
}

export interface QueuePurgeOkArgs {
  messageCount: number;
}

export interface QueueDeleteArgs {
  /** Default 0 */ ticket?: number;
  /** Default "" */ queue?: string;
  /** Default false */ ifUnused?: boolean;
  /** Default false */ ifEmpty?: boolean;
  /** Default false */ nowait?: boolean;
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
  /** Default false */ nowait?: boolean;
  /** Default {} */ arguments?: Record<string, unknown>;
}

export interface BasicConsumeOkArgs {
  consumerTag: string;
}

export interface BasicCancelArgs {
  consumerTag: string;
  /** Default false */ nowait?: boolean;
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
  deliveryTag: bigint;
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
  deliveryTag: bigint;
  /** Default false */ redelivered?: boolean;
  exchange: string;
  routingKey: string;
  messageCount: number;
}

export interface BasicGetEmptyArgs {
  /** Default "" */ clusterId?: string;
}

export interface BasicAckArgs {
  /** Default 0 */ deliveryTag?: bigint;
  /** Default false */ multiple?: boolean;
}

export interface BasicRejectArgs {
  deliveryTag: bigint;
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
  /** Default 0 */ deliveryTag?: bigint;
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
  /** Default false */ nowait?: boolean;
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

export interface ConnectionUpdateSecretOk
  extends ConnectionUpdateSecretOkArgs {
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
  deliveryTag: bigint;
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
  deliveryTag: bigint;
  redelivered: boolean;
  exchange: string;
  routingKey: string;
  messageCount: number;
}

export interface BasicGetEmpty extends BasicGetEmptyArgs {
  clusterId: string;
}

export interface BasicAck extends BasicAckArgs {
  deliveryTag: bigint;
  multiple: boolean;
}

export interface BasicReject extends BasicRejectArgs {
  deliveryTag: bigint;
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
  deliveryTag: bigint;
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

export interface SendConnectionStart {
  classId: 10;
  methodId: 10;
  args: ConnectionStartArgs;
}

export interface SendConnectionStartOk {
  classId: 10;
  methodId: 11;
  args: ConnectionStartOkArgs;
}

export interface SendConnectionSecure {
  classId: 10;
  methodId: 20;
  args: ConnectionSecureArgs;
}

export interface SendConnectionSecureOk {
  classId: 10;
  methodId: 21;
  args: ConnectionSecureOkArgs;
}

export interface SendConnectionTune {
  classId: 10;
  methodId: 30;
  args: ConnectionTuneArgs;
}

export interface SendConnectionTuneOk {
  classId: 10;
  methodId: 31;
  args: ConnectionTuneOkArgs;
}

export interface SendConnectionOpen {
  classId: 10;
  methodId: 40;
  args: ConnectionOpenArgs;
}

export interface SendConnectionOpenOk {
  classId: 10;
  methodId: 41;
  args: ConnectionOpenOkArgs;
}

export interface SendConnectionClose {
  classId: 10;
  methodId: 50;
  args: ConnectionCloseArgs;
}

export interface SendConnectionCloseOk {
  classId: 10;
  methodId: 51;
  args: ConnectionCloseOkArgs;
}

export interface SendConnectionBlocked {
  classId: 10;
  methodId: 60;
  args: ConnectionBlockedArgs;
}

export interface SendConnectionUnblocked {
  classId: 10;
  methodId: 61;
  args: ConnectionUnblockedArgs;
}

export interface SendConnectionUpdateSecret {
  classId: 10;
  methodId: 70;
  args: ConnectionUpdateSecretArgs;
}

export interface SendConnectionUpdateSecretOk {
  classId: 10;
  methodId: 71;
  args: ConnectionUpdateSecretOkArgs;
}

export interface SendChannelOpen {
  classId: 20;
  methodId: 10;
  args: ChannelOpenArgs;
}

export interface SendChannelOpenOk {
  classId: 20;
  methodId: 11;
  args: ChannelOpenOkArgs;
}

export interface SendChannelFlow {
  classId: 20;
  methodId: 20;
  args: ChannelFlowArgs;
}

export interface SendChannelFlowOk {
  classId: 20;
  methodId: 21;
  args: ChannelFlowOkArgs;
}

export interface SendChannelClose {
  classId: 20;
  methodId: 40;
  args: ChannelCloseArgs;
}

export interface SendChannelCloseOk {
  classId: 20;
  methodId: 41;
  args: ChannelCloseOkArgs;
}

export interface SendAccessRequest {
  classId: 30;
  methodId: 10;
  args: AccessRequestArgs;
}

export interface SendAccessRequestOk {
  classId: 30;
  methodId: 11;
  args: AccessRequestOkArgs;
}

export interface SendExchangeDeclare {
  classId: 40;
  methodId: 10;
  args: ExchangeDeclareArgs;
}

export interface SendExchangeDeclareOk {
  classId: 40;
  methodId: 11;
  args: ExchangeDeclareOkArgs;
}

export interface SendExchangeDelete {
  classId: 40;
  methodId: 20;
  args: ExchangeDeleteArgs;
}

export interface SendExchangeDeleteOk {
  classId: 40;
  methodId: 21;
  args: ExchangeDeleteOkArgs;
}

export interface SendExchangeBind {
  classId: 40;
  methodId: 30;
  args: ExchangeBindArgs;
}

export interface SendExchangeBindOk {
  classId: 40;
  methodId: 31;
  args: ExchangeBindOkArgs;
}

export interface SendExchangeUnbind {
  classId: 40;
  methodId: 40;
  args: ExchangeUnbindArgs;
}

export interface SendExchangeUnbindOk {
  classId: 40;
  methodId: 51;
  args: ExchangeUnbindOkArgs;
}

export interface SendQueueDeclare {
  classId: 50;
  methodId: 10;
  args: QueueDeclareArgs;
}

export interface SendQueueDeclareOk {
  classId: 50;
  methodId: 11;
  args: QueueDeclareOkArgs;
}

export interface SendQueueBind {
  classId: 50;
  methodId: 20;
  args: QueueBindArgs;
}

export interface SendQueueBindOk {
  classId: 50;
  methodId: 21;
  args: QueueBindOkArgs;
}

export interface SendQueuePurge {
  classId: 50;
  methodId: 30;
  args: QueuePurgeArgs;
}

export interface SendQueuePurgeOk {
  classId: 50;
  methodId: 31;
  args: QueuePurgeOkArgs;
}

export interface SendQueueDelete {
  classId: 50;
  methodId: 40;
  args: QueueDeleteArgs;
}

export interface SendQueueDeleteOk {
  classId: 50;
  methodId: 41;
  args: QueueDeleteOkArgs;
}

export interface SendQueueUnbind {
  classId: 50;
  methodId: 50;
  args: QueueUnbindArgs;
}

export interface SendQueueUnbindOk {
  classId: 50;
  methodId: 51;
  args: QueueUnbindOkArgs;
}

export interface SendBasicQos {
  classId: 60;
  methodId: 10;
  args: BasicQosArgs;
}

export interface SendBasicQosOk {
  classId: 60;
  methodId: 11;
  args: BasicQosOkArgs;
}

export interface SendBasicConsume {
  classId: 60;
  methodId: 20;
  args: BasicConsumeArgs;
}

export interface SendBasicConsumeOk {
  classId: 60;
  methodId: 21;
  args: BasicConsumeOkArgs;
}

export interface SendBasicCancel {
  classId: 60;
  methodId: 30;
  args: BasicCancelArgs;
}

export interface SendBasicCancelOk {
  classId: 60;
  methodId: 31;
  args: BasicCancelOkArgs;
}

export interface SendBasicPublish {
  classId: 60;
  methodId: 40;
  args: BasicPublishArgs;
}

export interface SendBasicReturn {
  classId: 60;
  methodId: 50;
  args: BasicReturnArgs;
}

export interface SendBasicDeliver {
  classId: 60;
  methodId: 60;
  args: BasicDeliverArgs;
}

export interface SendBasicGet {
  classId: 60;
  methodId: 70;
  args: BasicGetArgs;
}

export interface SendBasicGetOk {
  classId: 60;
  methodId: 71;
  args: BasicGetOkArgs;
}

export interface SendBasicGetEmpty {
  classId: 60;
  methodId: 72;
  args: BasicGetEmptyArgs;
}

export interface SendBasicAck {
  classId: 60;
  methodId: 80;
  args: BasicAckArgs;
}

export interface SendBasicReject {
  classId: 60;
  methodId: 90;
  args: BasicRejectArgs;
}

export interface SendBasicRecoverAsync {
  classId: 60;
  methodId: 100;
  args: BasicRecoverAsyncArgs;
}

export interface SendBasicRecover {
  classId: 60;
  methodId: 110;
  args: BasicRecoverArgs;
}

export interface SendBasicRecoverOk {
  classId: 60;
  methodId: 111;
  args: BasicRecoverOkArgs;
}

export interface SendBasicNack {
  classId: 60;
  methodId: 120;
  args: BasicNackArgs;
}

export interface SendTxSelect {
  classId: 90;
  methodId: 10;
  args: TxSelectArgs;
}

export interface SendTxSelectOk {
  classId: 90;
  methodId: 11;
  args: TxSelectOkArgs;
}

export interface SendTxCommit {
  classId: 90;
  methodId: 20;
  args: TxCommitArgs;
}

export interface SendTxCommitOk {
  classId: 90;
  methodId: 21;
  args: TxCommitOkArgs;
}

export interface SendTxRollback {
  classId: 90;
  methodId: 30;
  args: TxRollbackArgs;
}

export interface SendTxRollbackOk {
  classId: 90;
  methodId: 31;
  args: TxRollbackOkArgs;
}

export interface SendConfirmSelect {
  classId: 85;
  methodId: 10;
  args: ConfirmSelectArgs;
}

export interface SendConfirmSelectOk {
  classId: 85;
  methodId: 11;
  args: ConfirmSelectOkArgs;
}

export interface ReceiveConnectionStart {
  classId: 10;
  methodId: 10;
  args: ConnectionStart;
}

export interface ReceiveConnectionStartOk {
  classId: 10;
  methodId: 11;
  args: ConnectionStartOk;
}

export interface ReceiveConnectionSecure {
  classId: 10;
  methodId: 20;
  args: ConnectionSecure;
}

export interface ReceiveConnectionSecureOk {
  classId: 10;
  methodId: 21;
  args: ConnectionSecureOk;
}

export interface ReceiveConnectionTune {
  classId: 10;
  methodId: 30;
  args: ConnectionTune;
}

export interface ReceiveConnectionTuneOk {
  classId: 10;
  methodId: 31;
  args: ConnectionTuneOk;
}

export interface ReceiveConnectionOpen {
  classId: 10;
  methodId: 40;
  args: ConnectionOpen;
}

export interface ReceiveConnectionOpenOk {
  classId: 10;
  methodId: 41;
  args: ConnectionOpenOk;
}

export interface ReceiveConnectionClose {
  classId: 10;
  methodId: 50;
  args: ConnectionClose;
}

export interface ReceiveConnectionCloseOk {
  classId: 10;
  methodId: 51;
  args: ConnectionCloseOk;
}

export interface ReceiveConnectionBlocked {
  classId: 10;
  methodId: 60;
  args: ConnectionBlocked;
}

export interface ReceiveConnectionUnblocked {
  classId: 10;
  methodId: 61;
  args: ConnectionUnblocked;
}

export interface ReceiveConnectionUpdateSecret {
  classId: 10;
  methodId: 70;
  args: ConnectionUpdateSecret;
}

export interface ReceiveConnectionUpdateSecretOk {
  classId: 10;
  methodId: 71;
  args: ConnectionUpdateSecretOk;
}

export interface ReceiveChannelOpen {
  classId: 20;
  methodId: 10;
  args: ChannelOpen;
}

export interface ReceiveChannelOpenOk {
  classId: 20;
  methodId: 11;
  args: ChannelOpenOk;
}

export interface ReceiveChannelFlow {
  classId: 20;
  methodId: 20;
  args: ChannelFlow;
}

export interface ReceiveChannelFlowOk {
  classId: 20;
  methodId: 21;
  args: ChannelFlowOk;
}

export interface ReceiveChannelClose {
  classId: 20;
  methodId: 40;
  args: ChannelClose;
}

export interface ReceiveChannelCloseOk {
  classId: 20;
  methodId: 41;
  args: ChannelCloseOk;
}

export interface ReceiveAccessRequest {
  classId: 30;
  methodId: 10;
  args: AccessRequest;
}

export interface ReceiveAccessRequestOk {
  classId: 30;
  methodId: 11;
  args: AccessRequestOk;
}

export interface ReceiveExchangeDeclare {
  classId: 40;
  methodId: 10;
  args: ExchangeDeclare;
}

export interface ReceiveExchangeDeclareOk {
  classId: 40;
  methodId: 11;
  args: ExchangeDeclareOk;
}

export interface ReceiveExchangeDelete {
  classId: 40;
  methodId: 20;
  args: ExchangeDelete;
}

export interface ReceiveExchangeDeleteOk {
  classId: 40;
  methodId: 21;
  args: ExchangeDeleteOk;
}

export interface ReceiveExchangeBind {
  classId: 40;
  methodId: 30;
  args: ExchangeBind;
}

export interface ReceiveExchangeBindOk {
  classId: 40;
  methodId: 31;
  args: ExchangeBindOk;
}

export interface ReceiveExchangeUnbind {
  classId: 40;
  methodId: 40;
  args: ExchangeUnbind;
}

export interface ReceiveExchangeUnbindOk {
  classId: 40;
  methodId: 51;
  args: ExchangeUnbindOk;
}

export interface ReceiveQueueDeclare {
  classId: 50;
  methodId: 10;
  args: QueueDeclare;
}

export interface ReceiveQueueDeclareOk {
  classId: 50;
  methodId: 11;
  args: QueueDeclareOk;
}

export interface ReceiveQueueBind {
  classId: 50;
  methodId: 20;
  args: QueueBind;
}

export interface ReceiveQueueBindOk {
  classId: 50;
  methodId: 21;
  args: QueueBindOk;
}

export interface ReceiveQueuePurge {
  classId: 50;
  methodId: 30;
  args: QueuePurge;
}

export interface ReceiveQueuePurgeOk {
  classId: 50;
  methodId: 31;
  args: QueuePurgeOk;
}

export interface ReceiveQueueDelete {
  classId: 50;
  methodId: 40;
  args: QueueDelete;
}

export interface ReceiveQueueDeleteOk {
  classId: 50;
  methodId: 41;
  args: QueueDeleteOk;
}

export interface ReceiveQueueUnbind {
  classId: 50;
  methodId: 50;
  args: QueueUnbind;
}

export interface ReceiveQueueUnbindOk {
  classId: 50;
  methodId: 51;
  args: QueueUnbindOk;
}

export interface ReceiveBasicQos {
  classId: 60;
  methodId: 10;
  args: BasicQos;
}

export interface ReceiveBasicQosOk {
  classId: 60;
  methodId: 11;
  args: BasicQosOk;
}

export interface ReceiveBasicConsume {
  classId: 60;
  methodId: 20;
  args: BasicConsume;
}

export interface ReceiveBasicConsumeOk {
  classId: 60;
  methodId: 21;
  args: BasicConsumeOk;
}

export interface ReceiveBasicCancel {
  classId: 60;
  methodId: 30;
  args: BasicCancel;
}

export interface ReceiveBasicCancelOk {
  classId: 60;
  methodId: 31;
  args: BasicCancelOk;
}

export interface ReceiveBasicPublish {
  classId: 60;
  methodId: 40;
  args: BasicPublish;
}

export interface ReceiveBasicReturn {
  classId: 60;
  methodId: 50;
  args: BasicReturn;
}

export interface ReceiveBasicDeliver {
  classId: 60;
  methodId: 60;
  args: BasicDeliver;
}

export interface ReceiveBasicGet {
  classId: 60;
  methodId: 70;
  args: BasicGet;
}

export interface ReceiveBasicGetOk {
  classId: 60;
  methodId: 71;
  args: BasicGetOk;
}

export interface ReceiveBasicGetEmpty {
  classId: 60;
  methodId: 72;
  args: BasicGetEmpty;
}

export interface ReceiveBasicAck {
  classId: 60;
  methodId: 80;
  args: BasicAck;
}

export interface ReceiveBasicReject {
  classId: 60;
  methodId: 90;
  args: BasicReject;
}

export interface ReceiveBasicRecoverAsync {
  classId: 60;
  methodId: 100;
  args: BasicRecoverAsync;
}

export interface ReceiveBasicRecover {
  classId: 60;
  methodId: 110;
  args: BasicRecover;
}

export interface ReceiveBasicRecoverOk {
  classId: 60;
  methodId: 111;
  args: BasicRecoverOk;
}

export interface ReceiveBasicNack {
  classId: 60;
  methodId: 120;
  args: BasicNack;
}

export interface ReceiveTxSelect {
  classId: 90;
  methodId: 10;
  args: TxSelect;
}

export interface ReceiveTxSelectOk {
  classId: 90;
  methodId: 11;
  args: TxSelectOk;
}

export interface ReceiveTxCommit {
  classId: 90;
  methodId: 20;
  args: TxCommit;
}

export interface ReceiveTxCommitOk {
  classId: 90;
  methodId: 21;
  args: TxCommitOk;
}

export interface ReceiveTxRollback {
  classId: 90;
  methodId: 30;
  args: TxRollback;
}

export interface ReceiveTxRollbackOk {
  classId: 90;
  methodId: 31;
  args: TxRollbackOk;
}

export interface ReceiveConfirmSelect {
  classId: 85;
  methodId: 10;
  args: ConfirmSelect;
}

export interface ReceiveConfirmSelectOk {
  classId: 85;
  methodId: 11;
  args: ConfirmSelectOk;
}

export interface ConnectionHeader {
  classId: 10;
  props: ConnectionProperties;
  size: number;
}

export interface ChannelHeader {
  classId: 20;
  props: ChannelProperties;
  size: number;
}

export interface AccessHeader {
  classId: 30;
  props: AccessProperties;
  size: number;
}

export interface ExchangeHeader {
  classId: 40;
  props: ExchangeProperties;
  size: number;
}

export interface QueueHeader {
  classId: 50;
  props: QueueProperties;
  size: number;
}

export interface BasicHeader {
  classId: 60;
  props: BasicProperties;
  size: number;
}

export interface TxHeader {
  classId: 90;
  props: TxProperties;
  size: number;
}

export interface ConfirmHeader {
  classId: 85;
  props: ConfirmProperties;
  size: number;
}

export type SendMethod = SendConnectionStart | SendConnectionStartOk
  | SendConnectionSecure | SendConnectionSecureOk | SendConnectionTune
  | SendConnectionTuneOk | SendConnectionOpen | SendConnectionOpenOk
  | SendConnectionClose | SendConnectionCloseOk | SendConnectionBlocked
  | SendConnectionUnblocked | SendConnectionUpdateSecret
  | SendConnectionUpdateSecretOk | SendChannelOpen | SendChannelOpenOk
  | SendChannelFlow | SendChannelFlowOk | SendChannelClose | SendChannelCloseOk
  | SendAccessRequest | SendAccessRequestOk | SendExchangeDeclare
  | SendExchangeDeclareOk | SendExchangeDelete | SendExchangeDeleteOk
  | SendExchangeBind | SendExchangeBindOk | SendExchangeUnbind
  | SendExchangeUnbindOk | SendQueueDeclare | SendQueueDeclareOk
  | SendQueueBind | SendQueueBindOk | SendQueuePurge | SendQueuePurgeOk
  | SendQueueDelete | SendQueueDeleteOk | SendQueueUnbind | SendQueueUnbindOk
  | SendBasicQos | SendBasicQosOk | SendBasicConsume | SendBasicConsumeOk
  | SendBasicCancel | SendBasicCancelOk | SendBasicPublish | SendBasicReturn
  | SendBasicDeliver | SendBasicGet | SendBasicGetOk | SendBasicGetEmpty
  | SendBasicAck | SendBasicReject | SendBasicRecoverAsync | SendBasicRecover
  | SendBasicRecoverOk | SendBasicNack | SendTxSelect | SendTxSelectOk
  | SendTxCommit | SendTxCommitOk | SendTxRollback | SendTxRollbackOk
  | SendConfirmSelect | SendConfirmSelectOk;
export type ReceiveMethod = ReceiveConnectionStart | ReceiveConnectionStartOk
  | ReceiveConnectionSecure | ReceiveConnectionSecureOk | ReceiveConnectionTune
  | ReceiveConnectionTuneOk | ReceiveConnectionOpen | ReceiveConnectionOpenOk
  | ReceiveConnectionClose | ReceiveConnectionCloseOk
  | ReceiveConnectionBlocked | ReceiveConnectionUnblocked
  | ReceiveConnectionUpdateSecret | ReceiveConnectionUpdateSecretOk
  | ReceiveChannelOpen | ReceiveChannelOpenOk | ReceiveChannelFlow
  | ReceiveChannelFlowOk | ReceiveChannelClose | ReceiveChannelCloseOk
  | ReceiveAccessRequest | ReceiveAccessRequestOk | ReceiveExchangeDeclare
  | ReceiveExchangeDeclareOk | ReceiveExchangeDelete | ReceiveExchangeDeleteOk
  | ReceiveExchangeBind | ReceiveExchangeBindOk | ReceiveExchangeUnbind
  | ReceiveExchangeUnbindOk | ReceiveQueueDeclare | ReceiveQueueDeclareOk
  | ReceiveQueueBind | ReceiveQueueBindOk | ReceiveQueuePurge
  | ReceiveQueuePurgeOk | ReceiveQueueDelete | ReceiveQueueDeleteOk
  | ReceiveQueueUnbind | ReceiveQueueUnbindOk | ReceiveBasicQos
  | ReceiveBasicQosOk | ReceiveBasicConsume | ReceiveBasicConsumeOk
  | ReceiveBasicCancel | ReceiveBasicCancelOk | ReceiveBasicPublish
  | ReceiveBasicReturn | ReceiveBasicDeliver | ReceiveBasicGet
  | ReceiveBasicGetOk | ReceiveBasicGetEmpty | ReceiveBasicAck
  | ReceiveBasicReject | ReceiveBasicRecoverAsync | ReceiveBasicRecover
  | ReceiveBasicRecoverOk | ReceiveBasicNack | ReceiveTxSelect
  | ReceiveTxSelectOk | ReceiveTxCommit | ReceiveTxCommitOk | ReceiveTxRollback
  | ReceiveTxRollbackOk | ReceiveConfirmSelect | ReceiveConfirmSelectOk;
export type Header = ConnectionHeader | ChannelHeader | AccessHeader
  | ExchangeHeader | QueueHeader | BasicHeader | TxHeader | ConfirmHeader;
