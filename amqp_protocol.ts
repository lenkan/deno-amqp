import * as enc from "./encoding/mod.ts";
export const FRAME_METHOD = 1;
export const FRAME_HEADER = 2;
export const FRAME_BODY = 3;
export const FRAME_HEARTBEAT = 8;
export const FRAME_MIN_SIZE = 4096;
export const FRAME_END = 206;
export const REPLY_SUCCESS = 200;
export const SOFT_ERROR_CONTENT_TOO_LARGE = 311;
export const SOFT_ERROR_NO_ROUTE = 312;
export const SOFT_ERROR_NO_CONSUMERS = 313;
export const SOFT_ERROR_ACCESS_REFUSED = 403;
export const SOFT_ERROR_NOT_FOUND = 404;
export const SOFT_ERROR_RESOURCE_LOCKED = 405;
export const SOFT_ERROR_PRECONDITION_FAILED = 406;
export const HARD_ERROR_CONNECTION_FORCED = 320;
export const HARD_ERROR_INVALID_PATH = 402;
export const HARD_ERROR_FRAME_ERROR = 501;
export const HARD_ERROR_SYNTAX_ERROR = 502;
export const HARD_ERROR_COMMAND_INVALID = 503;
export const HARD_ERROR_CHANNEL_ERROR = 504;
export const HARD_ERROR_UNEXPECTED_FRAME = 505;
export const HARD_ERROR_RESOURCE_ERROR = 506;
export const HARD_ERROR_NOT_ALLOWED = 530;
export const HARD_ERROR_NOT_IMPLEMENTED = 540;
export const HARD_ERROR_INTERNAL_ERROR = 541;
export const CONNECTION = 10;
export const CONNECTION_START = 10;
export const CONNECTION_START_OK = 11;
export const CONNECTION_SECURE = 20;
export const CONNECTION_SECURE_OK = 21;
export const CONNECTION_TUNE = 30;
export const CONNECTION_TUNE_OK = 31;
export const CONNECTION_OPEN = 40;
export const CONNECTION_OPEN_OK = 41;
export const CONNECTION_CLOSE = 50;
export const CONNECTION_CLOSE_OK = 51;
export const CONNECTION_BLOCKED = 60;
export const CONNECTION_UNBLOCKED = 61;
export const CONNECTION_UPDATE_SECRET = 70;
export const CONNECTION_UPDATE_SECRET_OK = 71;
export const CHANNEL = 20;
export const CHANNEL_OPEN = 10;
export const CHANNEL_OPEN_OK = 11;
export const CHANNEL_FLOW = 20;
export const CHANNEL_FLOW_OK = 21;
export const CHANNEL_CLOSE = 40;
export const CHANNEL_CLOSE_OK = 41;
export const ACCESS = 30;
export const ACCESS_REQUEST = 10;
export const ACCESS_REQUEST_OK = 11;
export const EXCHANGE = 40;
export const EXCHANGE_DECLARE = 10;
export const EXCHANGE_DECLARE_OK = 11;
export const EXCHANGE_DELETE = 20;
export const EXCHANGE_DELETE_OK = 21;
export const EXCHANGE_BIND = 30;
export const EXCHANGE_BIND_OK = 31;
export const EXCHANGE_UNBIND = 40;
export const EXCHANGE_UNBIND_OK = 51;
export const QUEUE = 50;
export const QUEUE_DECLARE = 10;
export const QUEUE_DECLARE_OK = 11;
export const QUEUE_BIND = 20;
export const QUEUE_BIND_OK = 21;
export const QUEUE_PURGE = 30;
export const QUEUE_PURGE_OK = 31;
export const QUEUE_DELETE = 40;
export const QUEUE_DELETE_OK = 41;
export const QUEUE_UNBIND = 50;
export const QUEUE_UNBIND_OK = 51;
export const BASIC = 60;
export const BASIC_QOS = 10;
export const BASIC_QOS_OK = 11;
export const BASIC_CONSUME = 20;
export const BASIC_CONSUME_OK = 21;
export const BASIC_CANCEL = 30;
export const BASIC_CANCEL_OK = 31;
export const BASIC_PUBLISH = 40;
export const BASIC_RETURN = 50;
export const BASIC_DELIVER = 60;
export const BASIC_GET = 70;
export const BASIC_GET_OK = 71;
export const BASIC_GET_EMPTY = 72;
export const BASIC_ACK = 80;
export const BASIC_REJECT = 90;
export const BASIC_RECOVER_ASYNC = 100;
export const BASIC_RECOVER = 110;
export const BASIC_RECOVER_OK = 111;
export const BASIC_NACK = 120;
export const TX = 90;
export const TX_SELECT = 10;
export const TX_SELECT_OK = 11;
export const TX_COMMIT = 20;
export const TX_COMMIT_OK = 21;
export const TX_ROLLBACK = 30;
export const TX_ROLLBACK_OK = 31;
export const CONFIRM = 85;
export const CONFIRM_SELECT = 10;
export const CONFIRM_SELECT_OK = 11;

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
  size: bigint;
}

export interface ChannelHeader {
  classId: 20;
  props: ChannelProperties;
  size: bigint;
}

export interface AccessHeader {
  classId: 30;
  props: AccessProperties;
  size: bigint;
}

export interface ExchangeHeader {
  classId: 40;
  props: ExchangeProperties;
  size: bigint;
}

export interface QueueHeader {
  classId: 50;
  props: QueueProperties;
  size: bigint;
}

export interface BasicHeader {
  classId: 60;
  props: BasicProperties;
  size: bigint;
}

export interface TxHeader {
  classId: 90;
  props: TxProperties;
  size: bigint;
}

export interface ConfirmHeader {
  classId: 85;
  props: ConfirmProperties;
  size: bigint;
}

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

export function encodeConnectionStart(args: ConnectionStartArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(10));
  w.writeSync(enc.encodeShortUint(10));
  w.writeSync(enc.encodeFields([
    {
      type: "octet" as const,
      value: args.versionMajor !== undefined ? args.versionMajor : 0
    },
    {
      type: "octet" as const,
      value: args.versionMinor !== undefined ? args.versionMinor : 9
    },
    { type: "table" as const, value: args.serverProperties },
    {
      type: "longstr" as const,
      value: args.mechanisms !== undefined ? args.mechanisms : "PLAIN"
    },
    {
      type: "longstr" as const,
      value: args.locales !== undefined ? args.locales : "en_US"
    }
  ]));
  return w.bytes();
}

export function encodeConnectionStartOk(
  args: ConnectionStartOkArgs
): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(10));
  w.writeSync(enc.encodeShortUint(11));
  w.writeSync(enc.encodeFields([
    { type: "table" as const, value: args.clientProperties },
    {
      type: "shortstr" as const,
      value: args.mechanism !== undefined ? args.mechanism : "PLAIN"
    },
    { type: "longstr" as const, value: args.response },
    {
      type: "shortstr" as const,
      value: args.locale !== undefined ? args.locale : "en_US"
    }
  ]));
  return w.bytes();
}

export function encodeConnectionSecure(
  args: ConnectionSecureArgs
): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(10));
  w.writeSync(enc.encodeShortUint(20));
  w.writeSync(enc.encodeFields([
    { type: "longstr" as const, value: args.challenge }
  ]));
  return w.bytes();
}

export function encodeConnectionSecureOk(
  args: ConnectionSecureOkArgs
): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(10));
  w.writeSync(enc.encodeShortUint(21));
  w.writeSync(enc.encodeFields([
    { type: "longstr" as const, value: args.response }
  ]));
  return w.bytes();
}

export function encodeConnectionTune(args: ConnectionTuneArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(10));
  w.writeSync(enc.encodeShortUint(30));
  w.writeSync(enc.encodeFields([
    {
      type: "short" as const,
      value: args.channelMax !== undefined ? args.channelMax : 0
    },
    {
      type: "long" as const,
      value: args.frameMax !== undefined ? args.frameMax : 0
    },
    {
      type: "short" as const,
      value: args.heartbeat !== undefined ? args.heartbeat : 0
    }
  ]));
  return w.bytes();
}

export function encodeConnectionTuneOk(
  args: ConnectionTuneOkArgs
): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(10));
  w.writeSync(enc.encodeShortUint(31));
  w.writeSync(enc.encodeFields([
    {
      type: "short" as const,
      value: args.channelMax !== undefined ? args.channelMax : 0
    },
    {
      type: "long" as const,
      value: args.frameMax !== undefined ? args.frameMax : 0
    },
    {
      type: "short" as const,
      value: args.heartbeat !== undefined ? args.heartbeat : 0
    }
  ]));
  return w.bytes();
}

export function encodeConnectionOpen(args: ConnectionOpenArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(10));
  w.writeSync(enc.encodeShortUint(40));
  w.writeSync(enc.encodeFields([
    {
      type: "shortstr" as const,
      value: args.virtualHost !== undefined ? args.virtualHost : "/"
    },
    {
      type: "shortstr" as const,
      value: args.capabilities !== undefined ? args.capabilities : ""
    },
    {
      type: "bit" as const,
      value: args.insist !== undefined ? args.insist : false
    }
  ]));
  return w.bytes();
}

export function encodeConnectionOpenOk(
  args: ConnectionOpenOkArgs
): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(10));
  w.writeSync(enc.encodeShortUint(41));
  w.writeSync(enc.encodeFields([
    {
      type: "shortstr" as const,
      value: args.knownHosts !== undefined ? args.knownHosts : ""
    }
  ]));
  return w.bytes();
}

export function encodeConnectionClose(args: ConnectionCloseArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(10));
  w.writeSync(enc.encodeShortUint(50));
  w.writeSync(enc.encodeFields([
    { type: "short" as const, value: args.replyCode },
    {
      type: "shortstr" as const,
      value: args.replyText !== undefined ? args.replyText : ""
    },
    { type: "short" as const, value: args.classId },
    { type: "short" as const, value: args.methodId }
  ]));
  return w.bytes();
}

export function encodeConnectionCloseOk(
  args: ConnectionCloseOkArgs
): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(10));
  w.writeSync(enc.encodeShortUint(51));
  w.writeSync(enc.encodeFields([]));
  return w.bytes();
}

export function encodeConnectionBlocked(
  args: ConnectionBlockedArgs
): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(10));
  w.writeSync(enc.encodeShortUint(60));
  w.writeSync(enc.encodeFields([
    {
      type: "shortstr" as const,
      value: args.reason !== undefined ? args.reason : ""
    }
  ]));
  return w.bytes();
}

export function encodeConnectionUnblocked(
  args: ConnectionUnblockedArgs
): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(10));
  w.writeSync(enc.encodeShortUint(61));
  w.writeSync(enc.encodeFields([]));
  return w.bytes();
}

export function encodeConnectionUpdateSecret(
  args: ConnectionUpdateSecretArgs
): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(10));
  w.writeSync(enc.encodeShortUint(70));
  w.writeSync(enc.encodeFields([
    { type: "longstr" as const, value: args.newSecret },
    { type: "shortstr" as const, value: args.reason }
  ]));
  return w.bytes();
}

export function encodeConnectionUpdateSecretOk(
  args: ConnectionUpdateSecretOkArgs
): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(10));
  w.writeSync(enc.encodeShortUint(71));
  w.writeSync(enc.encodeFields([]));
  return w.bytes();
}

export function encodeChannelOpen(args: ChannelOpenArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(20));
  w.writeSync(enc.encodeShortUint(10));
  w.writeSync(enc.encodeFields([
    {
      type: "shortstr" as const,
      value: args.outOfBand !== undefined ? args.outOfBand : ""
    }
  ]));
  return w.bytes();
}

export function encodeChannelOpenOk(args: ChannelOpenOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(20));
  w.writeSync(enc.encodeShortUint(11));
  w.writeSync(enc.encodeFields([
    {
      type: "longstr" as const,
      value: args.channelId !== undefined ? args.channelId : ""
    }
  ]));
  return w.bytes();
}

export function encodeChannelFlow(args: ChannelFlowArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(20));
  w.writeSync(enc.encodeShortUint(20));
  w.writeSync(enc.encodeFields([
    { type: "bit" as const, value: args.active }
  ]));
  return w.bytes();
}

export function encodeChannelFlowOk(args: ChannelFlowOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(20));
  w.writeSync(enc.encodeShortUint(21));
  w.writeSync(enc.encodeFields([
    { type: "bit" as const, value: args.active }
  ]));
  return w.bytes();
}

export function encodeChannelClose(args: ChannelCloseArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(20));
  w.writeSync(enc.encodeShortUint(40));
  w.writeSync(enc.encodeFields([
    { type: "short" as const, value: args.replyCode },
    {
      type: "shortstr" as const,
      value: args.replyText !== undefined ? args.replyText : ""
    },
    { type: "short" as const, value: args.classId },
    { type: "short" as const, value: args.methodId }
  ]));
  return w.bytes();
}

export function encodeChannelCloseOk(args: ChannelCloseOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(20));
  w.writeSync(enc.encodeShortUint(41));
  w.writeSync(enc.encodeFields([]));
  return w.bytes();
}

export function encodeAccessRequest(args: AccessRequestArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(30));
  w.writeSync(enc.encodeShortUint(10));
  w.writeSync(enc.encodeFields([
    {
      type: "shortstr" as const,
      value: args.realm !== undefined ? args.realm : "/data"
    },
    {
      type: "bit" as const,
      value: args.exclusive !== undefined ? args.exclusive : false
    },
    {
      type: "bit" as const,
      value: args.passive !== undefined ? args.passive : true
    },
    {
      type: "bit" as const,
      value: args.active !== undefined ? args.active : true
    },
    {
      type: "bit" as const,
      value: args.write !== undefined ? args.write : true
    },
    { type: "bit" as const, value: args.read !== undefined ? args.read : true }
  ]));
  return w.bytes();
}

export function encodeAccessRequestOk(args: AccessRequestOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(30));
  w.writeSync(enc.encodeShortUint(11));
  w.writeSync(enc.encodeFields([
    {
      type: "short" as const,
      value: args.ticket !== undefined ? args.ticket : 1
    }
  ]));
  return w.bytes();
}

export function encodeExchangeDeclare(args: ExchangeDeclareArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(40));
  w.writeSync(enc.encodeShortUint(10));
  w.writeSync(enc.encodeFields([
    {
      type: "short" as const,
      value: args.ticket !== undefined ? args.ticket : 0
    },
    { type: "shortstr" as const, value: args.exchange },
    {
      type: "shortstr" as const,
      value: args.type !== undefined ? args.type : "direct"
    },
    {
      type: "bit" as const,
      value: args.passive !== undefined ? args.passive : false
    },
    {
      type: "bit" as const,
      value: args.durable !== undefined ? args.durable : false
    },
    {
      type: "bit" as const,
      value: args.autoDelete !== undefined ? args.autoDelete : false
    },
    {
      type: "bit" as const,
      value: args.internal !== undefined ? args.internal : false
    },
    {
      type: "bit" as const,
      value: args.nowait !== undefined ? args.nowait : false
    },
    {
      type: "table" as const,
      value: args.arguments !== undefined ? args.arguments : {}
    }
  ]));
  return w.bytes();
}

export function encodeExchangeDeclareOk(
  args: ExchangeDeclareOkArgs
): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(40));
  w.writeSync(enc.encodeShortUint(11));
  w.writeSync(enc.encodeFields([]));
  return w.bytes();
}

export function encodeExchangeDelete(args: ExchangeDeleteArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(40));
  w.writeSync(enc.encodeShortUint(20));
  w.writeSync(enc.encodeFields([
    {
      type: "short" as const,
      value: args.ticket !== undefined ? args.ticket : 0
    },
    { type: "shortstr" as const, value: args.exchange },
    {
      type: "bit" as const,
      value: args.ifUnused !== undefined ? args.ifUnused : false
    },
    {
      type: "bit" as const,
      value: args.nowait !== undefined ? args.nowait : false
    }
  ]));
  return w.bytes();
}

export function encodeExchangeDeleteOk(
  args: ExchangeDeleteOkArgs
): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(40));
  w.writeSync(enc.encodeShortUint(21));
  w.writeSync(enc.encodeFields([]));
  return w.bytes();
}

export function encodeExchangeBind(args: ExchangeBindArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(40));
  w.writeSync(enc.encodeShortUint(30));
  w.writeSync(enc.encodeFields([
    {
      type: "short" as const,
      value: args.ticket !== undefined ? args.ticket : 0
    },
    { type: "shortstr" as const, value: args.destination },
    { type: "shortstr" as const, value: args.source },
    {
      type: "shortstr" as const,
      value: args.routingKey !== undefined ? args.routingKey : ""
    },
    {
      type: "bit" as const,
      value: args.nowait !== undefined ? args.nowait : false
    },
    {
      type: "table" as const,
      value: args.arguments !== undefined ? args.arguments : {}
    }
  ]));
  return w.bytes();
}

export function encodeExchangeBindOk(args: ExchangeBindOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(40));
  w.writeSync(enc.encodeShortUint(31));
  w.writeSync(enc.encodeFields([]));
  return w.bytes();
}

export function encodeExchangeUnbind(args: ExchangeUnbindArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(40));
  w.writeSync(enc.encodeShortUint(40));
  w.writeSync(enc.encodeFields([
    {
      type: "short" as const,
      value: args.ticket !== undefined ? args.ticket : 0
    },
    { type: "shortstr" as const, value: args.destination },
    { type: "shortstr" as const, value: args.source },
    {
      type: "shortstr" as const,
      value: args.routingKey !== undefined ? args.routingKey : ""
    },
    {
      type: "bit" as const,
      value: args.nowait !== undefined ? args.nowait : false
    },
    {
      type: "table" as const,
      value: args.arguments !== undefined ? args.arguments : {}
    }
  ]));
  return w.bytes();
}

export function encodeExchangeUnbindOk(
  args: ExchangeUnbindOkArgs
): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(40));
  w.writeSync(enc.encodeShortUint(51));
  w.writeSync(enc.encodeFields([]));
  return w.bytes();
}

export function encodeQueueDeclare(args: QueueDeclareArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(50));
  w.writeSync(enc.encodeShortUint(10));
  w.writeSync(enc.encodeFields([
    {
      type: "short" as const,
      value: args.ticket !== undefined ? args.ticket : 0
    },
    {
      type: "shortstr" as const,
      value: args.queue !== undefined ? args.queue : ""
    },
    {
      type: "bit" as const,
      value: args.passive !== undefined ? args.passive : false
    },
    {
      type: "bit" as const,
      value: args.durable !== undefined ? args.durable : false
    },
    {
      type: "bit" as const,
      value: args.exclusive !== undefined ? args.exclusive : false
    },
    {
      type: "bit" as const,
      value: args.autoDelete !== undefined ? args.autoDelete : false
    },
    {
      type: "bit" as const,
      value: args.nowait !== undefined ? args.nowait : false
    },
    {
      type: "table" as const,
      value: args.arguments !== undefined ? args.arguments : {}
    }
  ]));
  return w.bytes();
}

export function encodeQueueDeclareOk(args: QueueDeclareOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(50));
  w.writeSync(enc.encodeShortUint(11));
  w.writeSync(enc.encodeFields([
    { type: "shortstr" as const, value: args.queue },
    { type: "long" as const, value: args.messageCount },
    { type: "long" as const, value: args.consumerCount }
  ]));
  return w.bytes();
}

export function encodeQueueBind(args: QueueBindArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(50));
  w.writeSync(enc.encodeShortUint(20));
  w.writeSync(enc.encodeFields([
    {
      type: "short" as const,
      value: args.ticket !== undefined ? args.ticket : 0
    },
    {
      type: "shortstr" as const,
      value: args.queue !== undefined ? args.queue : ""
    },
    { type: "shortstr" as const, value: args.exchange },
    {
      type: "shortstr" as const,
      value: args.routingKey !== undefined ? args.routingKey : ""
    },
    {
      type: "bit" as const,
      value: args.nowait !== undefined ? args.nowait : false
    },
    {
      type: "table" as const,
      value: args.arguments !== undefined ? args.arguments : {}
    }
  ]));
  return w.bytes();
}

export function encodeQueueBindOk(args: QueueBindOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(50));
  w.writeSync(enc.encodeShortUint(21));
  w.writeSync(enc.encodeFields([]));
  return w.bytes();
}

export function encodeQueuePurge(args: QueuePurgeArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(50));
  w.writeSync(enc.encodeShortUint(30));
  w.writeSync(enc.encodeFields([
    {
      type: "short" as const,
      value: args.ticket !== undefined ? args.ticket : 0
    },
    {
      type: "shortstr" as const,
      value: args.queue !== undefined ? args.queue : ""
    },
    {
      type: "bit" as const,
      value: args.nowait !== undefined ? args.nowait : false
    }
  ]));
  return w.bytes();
}

export function encodeQueuePurgeOk(args: QueuePurgeOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(50));
  w.writeSync(enc.encodeShortUint(31));
  w.writeSync(enc.encodeFields([
    { type: "long" as const, value: args.messageCount }
  ]));
  return w.bytes();
}

export function encodeQueueDelete(args: QueueDeleteArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(50));
  w.writeSync(enc.encodeShortUint(40));
  w.writeSync(enc.encodeFields([
    {
      type: "short" as const,
      value: args.ticket !== undefined ? args.ticket : 0
    },
    {
      type: "shortstr" as const,
      value: args.queue !== undefined ? args.queue : ""
    },
    {
      type: "bit" as const,
      value: args.ifUnused !== undefined ? args.ifUnused : false
    },
    {
      type: "bit" as const,
      value: args.ifEmpty !== undefined ? args.ifEmpty : false
    },
    {
      type: "bit" as const,
      value: args.nowait !== undefined ? args.nowait : false
    }
  ]));
  return w.bytes();
}

export function encodeQueueDeleteOk(args: QueueDeleteOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(50));
  w.writeSync(enc.encodeShortUint(41));
  w.writeSync(enc.encodeFields([
    { type: "long" as const, value: args.messageCount }
  ]));
  return w.bytes();
}

export function encodeQueueUnbind(args: QueueUnbindArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(50));
  w.writeSync(enc.encodeShortUint(50));
  w.writeSync(enc.encodeFields([
    {
      type: "short" as const,
      value: args.ticket !== undefined ? args.ticket : 0
    },
    {
      type: "shortstr" as const,
      value: args.queue !== undefined ? args.queue : ""
    },
    { type: "shortstr" as const, value: args.exchange },
    {
      type: "shortstr" as const,
      value: args.routingKey !== undefined ? args.routingKey : ""
    },
    {
      type: "table" as const,
      value: args.arguments !== undefined ? args.arguments : {}
    }
  ]));
  return w.bytes();
}

export function encodeQueueUnbindOk(args: QueueUnbindOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(50));
  w.writeSync(enc.encodeShortUint(51));
  w.writeSync(enc.encodeFields([]));
  return w.bytes();
}

export function encodeBasicQos(args: BasicQosArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(60));
  w.writeSync(enc.encodeShortUint(10));
  w.writeSync(enc.encodeFields([
    {
      type: "long" as const,
      value: args.prefetchSize !== undefined ? args.prefetchSize : 0
    },
    {
      type: "short" as const,
      value: args.prefetchCount !== undefined ? args.prefetchCount : 0
    },
    {
      type: "bit" as const,
      value: args.global !== undefined ? args.global : false
    }
  ]));
  return w.bytes();
}

export function encodeBasicQosOk(args: BasicQosOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(60));
  w.writeSync(enc.encodeShortUint(11));
  w.writeSync(enc.encodeFields([]));
  return w.bytes();
}

export function encodeBasicConsume(args: BasicConsumeArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(60));
  w.writeSync(enc.encodeShortUint(20));
  w.writeSync(enc.encodeFields([
    {
      type: "short" as const,
      value: args.ticket !== undefined ? args.ticket : 0
    },
    {
      type: "shortstr" as const,
      value: args.queue !== undefined ? args.queue : ""
    },
    {
      type: "shortstr" as const,
      value: args.consumerTag !== undefined ? args.consumerTag : ""
    },
    {
      type: "bit" as const,
      value: args.noLocal !== undefined ? args.noLocal : false
    },
    {
      type: "bit" as const,
      value: args.noAck !== undefined ? args.noAck : false
    },
    {
      type: "bit" as const,
      value: args.exclusive !== undefined ? args.exclusive : false
    },
    {
      type: "bit" as const,
      value: args.nowait !== undefined ? args.nowait : false
    },
    {
      type: "table" as const,
      value: args.arguments !== undefined ? args.arguments : {}
    }
  ]));
  return w.bytes();
}

export function encodeBasicConsumeOk(args: BasicConsumeOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(60));
  w.writeSync(enc.encodeShortUint(21));
  w.writeSync(enc.encodeFields([
    { type: "shortstr" as const, value: args.consumerTag }
  ]));
  return w.bytes();
}

export function encodeBasicCancel(args: BasicCancelArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(60));
  w.writeSync(enc.encodeShortUint(30));
  w.writeSync(enc.encodeFields([
    { type: "shortstr" as const, value: args.consumerTag },
    {
      type: "bit" as const,
      value: args.nowait !== undefined ? args.nowait : false
    }
  ]));
  return w.bytes();
}

export function encodeBasicCancelOk(args: BasicCancelOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(60));
  w.writeSync(enc.encodeShortUint(31));
  w.writeSync(enc.encodeFields([
    { type: "shortstr" as const, value: args.consumerTag }
  ]));
  return w.bytes();
}

export function encodeBasicPublish(args: BasicPublishArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(60));
  w.writeSync(enc.encodeShortUint(40));
  w.writeSync(enc.encodeFields([
    {
      type: "short" as const,
      value: args.ticket !== undefined ? args.ticket : 0
    },
    {
      type: "shortstr" as const,
      value: args.exchange !== undefined ? args.exchange : ""
    },
    {
      type: "shortstr" as const,
      value: args.routingKey !== undefined ? args.routingKey : ""
    },
    {
      type: "bit" as const,
      value: args.mandatory !== undefined ? args.mandatory : false
    },
    {
      type: "bit" as const,
      value: args.immediate !== undefined ? args.immediate : false
    }
  ]));
  return w.bytes();
}

export function encodeBasicReturn(args: BasicReturnArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(60));
  w.writeSync(enc.encodeShortUint(50));
  w.writeSync(enc.encodeFields([
    { type: "short" as const, value: args.replyCode },
    {
      type: "shortstr" as const,
      value: args.replyText !== undefined ? args.replyText : ""
    },
    { type: "shortstr" as const, value: args.exchange },
    { type: "shortstr" as const, value: args.routingKey }
  ]));
  return w.bytes();
}

export function encodeBasicDeliver(args: BasicDeliverArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(60));
  w.writeSync(enc.encodeShortUint(60));
  w.writeSync(enc.encodeFields([
    { type: "shortstr" as const, value: args.consumerTag },
    { type: "longlong" as const, value: args.deliveryTag },
    {
      type: "bit" as const,
      value: args.redelivered !== undefined ? args.redelivered : false
    },
    { type: "shortstr" as const, value: args.exchange },
    { type: "shortstr" as const, value: args.routingKey }
  ]));
  return w.bytes();
}

export function encodeBasicGet(args: BasicGetArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(60));
  w.writeSync(enc.encodeShortUint(70));
  w.writeSync(enc.encodeFields([
    {
      type: "short" as const,
      value: args.ticket !== undefined ? args.ticket : 0
    },
    {
      type: "shortstr" as const,
      value: args.queue !== undefined ? args.queue : ""
    },
    {
      type: "bit" as const,
      value: args.noAck !== undefined ? args.noAck : false
    }
  ]));
  return w.bytes();
}

export function encodeBasicGetOk(args: BasicGetOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(60));
  w.writeSync(enc.encodeShortUint(71));
  w.writeSync(enc.encodeFields([
    { type: "longlong" as const, value: args.deliveryTag },
    {
      type: "bit" as const,
      value: args.redelivered !== undefined ? args.redelivered : false
    },
    { type: "shortstr" as const, value: args.exchange },
    { type: "shortstr" as const, value: args.routingKey },
    { type: "long" as const, value: args.messageCount }
  ]));
  return w.bytes();
}

export function encodeBasicGetEmpty(args: BasicGetEmptyArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(60));
  w.writeSync(enc.encodeShortUint(72));
  w.writeSync(enc.encodeFields([
    {
      type: "shortstr" as const,
      value: args.clusterId !== undefined ? args.clusterId : ""
    }
  ]));
  return w.bytes();
}

export function encodeBasicAck(args: BasicAckArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(60));
  w.writeSync(enc.encodeShortUint(80));
  w.writeSync(enc.encodeFields([
    {
      type: "longlong" as const,
      value: args.deliveryTag !== undefined ? args.deliveryTag : BigInt(0)
    },
    {
      type: "bit" as const,
      value: args.multiple !== undefined ? args.multiple : false
    }
  ]));
  return w.bytes();
}

export function encodeBasicReject(args: BasicRejectArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(60));
  w.writeSync(enc.encodeShortUint(90));
  w.writeSync(enc.encodeFields([
    { type: "longlong" as const, value: args.deliveryTag },
    {
      type: "bit" as const,
      value: args.requeue !== undefined ? args.requeue : true
    }
  ]));
  return w.bytes();
}

export function encodeBasicRecoverAsync(
  args: BasicRecoverAsyncArgs
): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(60));
  w.writeSync(enc.encodeShortUint(100));
  w.writeSync(enc.encodeFields([
    {
      type: "bit" as const,
      value: args.requeue !== undefined ? args.requeue : false
    }
  ]));
  return w.bytes();
}

export function encodeBasicRecover(args: BasicRecoverArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(60));
  w.writeSync(enc.encodeShortUint(110));
  w.writeSync(enc.encodeFields([
    {
      type: "bit" as const,
      value: args.requeue !== undefined ? args.requeue : false
    }
  ]));
  return w.bytes();
}

export function encodeBasicRecoverOk(args: BasicRecoverOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(60));
  w.writeSync(enc.encodeShortUint(111));
  w.writeSync(enc.encodeFields([]));
  return w.bytes();
}

export function encodeBasicNack(args: BasicNackArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(60));
  w.writeSync(enc.encodeShortUint(120));
  w.writeSync(enc.encodeFields([
    {
      type: "longlong" as const,
      value: args.deliveryTag !== undefined ? args.deliveryTag : BigInt(0)
    },
    {
      type: "bit" as const,
      value: args.multiple !== undefined ? args.multiple : false
    },
    {
      type: "bit" as const,
      value: args.requeue !== undefined ? args.requeue : true
    }
  ]));
  return w.bytes();
}

export function encodeTxSelect(args: TxSelectArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(90));
  w.writeSync(enc.encodeShortUint(10));
  w.writeSync(enc.encodeFields([]));
  return w.bytes();
}

export function encodeTxSelectOk(args: TxSelectOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(90));
  w.writeSync(enc.encodeShortUint(11));
  w.writeSync(enc.encodeFields([]));
  return w.bytes();
}

export function encodeTxCommit(args: TxCommitArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(90));
  w.writeSync(enc.encodeShortUint(20));
  w.writeSync(enc.encodeFields([]));
  return w.bytes();
}

export function encodeTxCommitOk(args: TxCommitOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(90));
  w.writeSync(enc.encodeShortUint(21));
  w.writeSync(enc.encodeFields([]));
  return w.bytes();
}

export function encodeTxRollback(args: TxRollbackArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(90));
  w.writeSync(enc.encodeShortUint(30));
  w.writeSync(enc.encodeFields([]));
  return w.bytes();
}

export function encodeTxRollbackOk(args: TxRollbackOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(90));
  w.writeSync(enc.encodeShortUint(31));
  w.writeSync(enc.encodeFields([]));
  return w.bytes();
}

export function encodeConfirmSelect(args: ConfirmSelectArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(85));
  w.writeSync(enc.encodeShortUint(10));
  w.writeSync(enc.encodeFields([
    {
      type: "bit" as const,
      value: args.nowait !== undefined ? args.nowait : false
    }
  ]));
  return w.bytes();
}

export function encodeConfirmSelectOk(args: ConfirmSelectOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(85));
  w.writeSync(enc.encodeShortUint(11));
  w.writeSync(enc.encodeFields([]));
  return w.bytes();
}

function decodeConnectionStart(r: Deno.SyncReader): ConnectionStart {
  const fields = enc.decodeFields(
    r,
    ["octet", "octet", "table", "longstr", "longstr"]
  );
  const args = {
    versionMajor: fields[0] as number,
    versionMinor: fields[1] as number,
    serverProperties: fields[2] as Record<string, unknown>,
    mechanisms: fields[3] as string,
    locales: fields[4] as string
  };
  return args;
}

function decodeConnectionStartOk(r: Deno.SyncReader): ConnectionStartOk {
  const fields = enc.decodeFields(
    r,
    ["table", "shortstr", "longstr", "shortstr"]
  );
  const args = {
    clientProperties: fields[0] as Record<string, unknown>,
    mechanism: fields[1] as string,
    response: fields[2] as string,
    locale: fields[3] as string
  };
  return args;
}

function decodeConnectionSecure(r: Deno.SyncReader): ConnectionSecure {
  const fields = enc.decodeFields(r, ["longstr"]);
  const args = { challenge: fields[0] as string };
  return args;
}

function decodeConnectionSecureOk(r: Deno.SyncReader): ConnectionSecureOk {
  const fields = enc.decodeFields(r, ["longstr"]);
  const args = { response: fields[0] as string };
  return args;
}

function decodeConnectionTune(r: Deno.SyncReader): ConnectionTune {
  const fields = enc.decodeFields(r, ["short", "long", "short"]);
  const args = {
    channelMax: fields[0] as number,
    frameMax: fields[1] as number,
    heartbeat: fields[2] as number
  };
  return args;
}

function decodeConnectionTuneOk(r: Deno.SyncReader): ConnectionTuneOk {
  const fields = enc.decodeFields(r, ["short", "long", "short"]);
  const args = {
    channelMax: fields[0] as number,
    frameMax: fields[1] as number,
    heartbeat: fields[2] as number
  };
  return args;
}

function decodeConnectionOpen(r: Deno.SyncReader): ConnectionOpen {
  const fields = enc.decodeFields(r, ["shortstr", "shortstr", "bit"]);
  const args = {
    virtualHost: fields[0] as string,
    capabilities: fields[1] as string,
    insist: fields[2] as boolean
  };
  return args;
}

function decodeConnectionOpenOk(r: Deno.SyncReader): ConnectionOpenOk {
  const fields = enc.decodeFields(r, ["shortstr"]);
  const args = { knownHosts: fields[0] as string };
  return args;
}

function decodeConnectionClose(r: Deno.SyncReader): ConnectionClose {
  const fields = enc.decodeFields(r, ["short", "shortstr", "short", "short"]);
  const args = {
    replyCode: fields[0] as number,
    replyText: fields[1] as string,
    classId: fields[2] as number,
    methodId: fields[3] as number
  };
  return args;
}

function decodeConnectionCloseOk(r: Deno.SyncReader): ConnectionCloseOk {
  const fields = enc.decodeFields(r, []);
  const args = {};
  return args;
}

function decodeConnectionBlocked(r: Deno.SyncReader): ConnectionBlocked {
  const fields = enc.decodeFields(r, ["shortstr"]);
  const args = { reason: fields[0] as string };
  return args;
}

function decodeConnectionUnblocked(r: Deno.SyncReader): ConnectionUnblocked {
  const fields = enc.decodeFields(r, []);
  const args = {};
  return args;
}

function decodeConnectionUpdateSecret(
  r: Deno.SyncReader
): ConnectionUpdateSecret {
  const fields = enc.decodeFields(r, ["longstr", "shortstr"]);
  const args = { newSecret: fields[0] as string, reason: fields[1] as string };
  return args;
}

function decodeConnectionUpdateSecretOk(
  r: Deno.SyncReader
): ConnectionUpdateSecretOk {
  const fields = enc.decodeFields(r, []);
  const args = {};
  return args;
}

function decodeChannelOpen(r: Deno.SyncReader): ChannelOpen {
  const fields = enc.decodeFields(r, ["shortstr"]);
  const args = { outOfBand: fields[0] as string };
  return args;
}

function decodeChannelOpenOk(r: Deno.SyncReader): ChannelOpenOk {
  const fields = enc.decodeFields(r, ["longstr"]);
  const args = { channelId: fields[0] as string };
  return args;
}

function decodeChannelFlow(r: Deno.SyncReader): ChannelFlow {
  const fields = enc.decodeFields(r, ["bit"]);
  const args = { active: fields[0] as boolean };
  return args;
}

function decodeChannelFlowOk(r: Deno.SyncReader): ChannelFlowOk {
  const fields = enc.decodeFields(r, ["bit"]);
  const args = { active: fields[0] as boolean };
  return args;
}

function decodeChannelClose(r: Deno.SyncReader): ChannelClose {
  const fields = enc.decodeFields(r, ["short", "shortstr", "short", "short"]);
  const args = {
    replyCode: fields[0] as number,
    replyText: fields[1] as string,
    classId: fields[2] as number,
    methodId: fields[3] as number
  };
  return args;
}

function decodeChannelCloseOk(r: Deno.SyncReader): ChannelCloseOk {
  const fields = enc.decodeFields(r, []);
  const args = {};
  return args;
}

function decodeAccessRequest(r: Deno.SyncReader): AccessRequest {
  const fields = enc.decodeFields(
    r,
    ["shortstr", "bit", "bit", "bit", "bit", "bit"]
  );
  const args = {
    realm: fields[0] as string,
    exclusive: fields[1] as boolean,
    passive: fields[2] as boolean,
    active: fields[3] as boolean,
    write: fields[4] as boolean,
    read: fields[5] as boolean
  };
  return args;
}

function decodeAccessRequestOk(r: Deno.SyncReader): AccessRequestOk {
  const fields = enc.decodeFields(r, ["short"]);
  const args = { ticket: fields[0] as number };
  return args;
}

function decodeExchangeDeclare(r: Deno.SyncReader): ExchangeDeclare {
  const fields = enc.decodeFields(
    r,
    [
      "short",
      "shortstr",
      "shortstr",
      "bit",
      "bit",
      "bit",
      "bit",
      "bit",
      "table"
    ]
  );
  const args = {
    ticket: fields[0] as number,
    exchange: fields[1] as string,
    type: fields[2] as string,
    passive: fields[3] as boolean,
    durable: fields[4] as boolean,
    autoDelete: fields[5] as boolean,
    internal: fields[6] as boolean,
    nowait: fields[7] as boolean,
    arguments: fields[8] as Record<string, unknown>
  };
  return args;
}

function decodeExchangeDeclareOk(r: Deno.SyncReader): ExchangeDeclareOk {
  const fields = enc.decodeFields(r, []);
  const args = {};
  return args;
}

function decodeExchangeDelete(r: Deno.SyncReader): ExchangeDelete {
  const fields = enc.decodeFields(r, ["short", "shortstr", "bit", "bit"]);
  const args = {
    ticket: fields[0] as number,
    exchange: fields[1] as string,
    ifUnused: fields[2] as boolean,
    nowait: fields[3] as boolean
  };
  return args;
}

function decodeExchangeDeleteOk(r: Deno.SyncReader): ExchangeDeleteOk {
  const fields = enc.decodeFields(r, []);
  const args = {};
  return args;
}

function decodeExchangeBind(r: Deno.SyncReader): ExchangeBind {
  const fields = enc.decodeFields(
    r,
    ["short", "shortstr", "shortstr", "shortstr", "bit", "table"]
  );
  const args = {
    ticket: fields[0] as number,
    destination: fields[1] as string,
    source: fields[2] as string,
    routingKey: fields[3] as string,
    nowait: fields[4] as boolean,
    arguments: fields[5] as Record<string, unknown>
  };
  return args;
}

function decodeExchangeBindOk(r: Deno.SyncReader): ExchangeBindOk {
  const fields = enc.decodeFields(r, []);
  const args = {};
  return args;
}

function decodeExchangeUnbind(r: Deno.SyncReader): ExchangeUnbind {
  const fields = enc.decodeFields(
    r,
    ["short", "shortstr", "shortstr", "shortstr", "bit", "table"]
  );
  const args = {
    ticket: fields[0] as number,
    destination: fields[1] as string,
    source: fields[2] as string,
    routingKey: fields[3] as string,
    nowait: fields[4] as boolean,
    arguments: fields[5] as Record<string, unknown>
  };
  return args;
}

function decodeExchangeUnbindOk(r: Deno.SyncReader): ExchangeUnbindOk {
  const fields = enc.decodeFields(r, []);
  const args = {};
  return args;
}

function decodeQueueDeclare(r: Deno.SyncReader): QueueDeclare {
  const fields = enc.decodeFields(
    r,
    ["short", "shortstr", "bit", "bit", "bit", "bit", "bit", "table"]
  );
  const args = {
    ticket: fields[0] as number,
    queue: fields[1] as string,
    passive: fields[2] as boolean,
    durable: fields[3] as boolean,
    exclusive: fields[4] as boolean,
    autoDelete: fields[5] as boolean,
    nowait: fields[6] as boolean,
    arguments: fields[7] as Record<string, unknown>
  };
  return args;
}

function decodeQueueDeclareOk(r: Deno.SyncReader): QueueDeclareOk {
  const fields = enc.decodeFields(r, ["shortstr", "long", "long"]);
  const args = {
    queue: fields[0] as string,
    messageCount: fields[1] as number,
    consumerCount: fields[2] as number
  };
  return args;
}

function decodeQueueBind(r: Deno.SyncReader): QueueBind {
  const fields = enc.decodeFields(
    r,
    ["short", "shortstr", "shortstr", "shortstr", "bit", "table"]
  );
  const args = {
    ticket: fields[0] as number,
    queue: fields[1] as string,
    exchange: fields[2] as string,
    routingKey: fields[3] as string,
    nowait: fields[4] as boolean,
    arguments: fields[5] as Record<string, unknown>
  };
  return args;
}

function decodeQueueBindOk(r: Deno.SyncReader): QueueBindOk {
  const fields = enc.decodeFields(r, []);
  const args = {};
  return args;
}

function decodeQueuePurge(r: Deno.SyncReader): QueuePurge {
  const fields = enc.decodeFields(r, ["short", "shortstr", "bit"]);
  const args = {
    ticket: fields[0] as number,
    queue: fields[1] as string,
    nowait: fields[2] as boolean
  };
  return args;
}

function decodeQueuePurgeOk(r: Deno.SyncReader): QueuePurgeOk {
  const fields = enc.decodeFields(r, ["long"]);
  const args = { messageCount: fields[0] as number };
  return args;
}

function decodeQueueDelete(r: Deno.SyncReader): QueueDelete {
  const fields = enc.decodeFields(
    r,
    ["short", "shortstr", "bit", "bit", "bit"]
  );
  const args = {
    ticket: fields[0] as number,
    queue: fields[1] as string,
    ifUnused: fields[2] as boolean,
    ifEmpty: fields[3] as boolean,
    nowait: fields[4] as boolean
  };
  return args;
}

function decodeQueueDeleteOk(r: Deno.SyncReader): QueueDeleteOk {
  const fields = enc.decodeFields(r, ["long"]);
  const args = { messageCount: fields[0] as number };
  return args;
}

function decodeQueueUnbind(r: Deno.SyncReader): QueueUnbind {
  const fields = enc.decodeFields(
    r,
    ["short", "shortstr", "shortstr", "shortstr", "table"]
  );
  const args = {
    ticket: fields[0] as number,
    queue: fields[1] as string,
    exchange: fields[2] as string,
    routingKey: fields[3] as string,
    arguments: fields[4] as Record<string, unknown>
  };
  return args;
}

function decodeQueueUnbindOk(r: Deno.SyncReader): QueueUnbindOk {
  const fields = enc.decodeFields(r, []);
  const args = {};
  return args;
}

function decodeBasicQos(r: Deno.SyncReader): BasicQos {
  const fields = enc.decodeFields(r, ["long", "short", "bit"]);
  const args = {
    prefetchSize: fields[0] as number,
    prefetchCount: fields[1] as number,
    global: fields[2] as boolean
  };
  return args;
}

function decodeBasicQosOk(r: Deno.SyncReader): BasicQosOk {
  const fields = enc.decodeFields(r, []);
  const args = {};
  return args;
}

function decodeBasicConsume(r: Deno.SyncReader): BasicConsume {
  const fields = enc.decodeFields(
    r,
    ["short", "shortstr", "shortstr", "bit", "bit", "bit", "bit", "table"]
  );
  const args = {
    ticket: fields[0] as number,
    queue: fields[1] as string,
    consumerTag: fields[2] as string,
    noLocal: fields[3] as boolean,
    noAck: fields[4] as boolean,
    exclusive: fields[5] as boolean,
    nowait: fields[6] as boolean,
    arguments: fields[7] as Record<string, unknown>
  };
  return args;
}

function decodeBasicConsumeOk(r: Deno.SyncReader): BasicConsumeOk {
  const fields = enc.decodeFields(r, ["shortstr"]);
  const args = { consumerTag: fields[0] as string };
  return args;
}

function decodeBasicCancel(r: Deno.SyncReader): BasicCancel {
  const fields = enc.decodeFields(r, ["shortstr", "bit"]);
  const args = {
    consumerTag: fields[0] as string,
    nowait: fields[1] as boolean
  };
  return args;
}

function decodeBasicCancelOk(r: Deno.SyncReader): BasicCancelOk {
  const fields = enc.decodeFields(r, ["shortstr"]);
  const args = { consumerTag: fields[0] as string };
  return args;
}

function decodeBasicPublish(r: Deno.SyncReader): BasicPublish {
  const fields = enc.decodeFields(
    r,
    ["short", "shortstr", "shortstr", "bit", "bit"]
  );
  const args = {
    ticket: fields[0] as number,
    exchange: fields[1] as string,
    routingKey: fields[2] as string,
    mandatory: fields[3] as boolean,
    immediate: fields[4] as boolean
  };
  return args;
}

function decodeBasicReturn(r: Deno.SyncReader): BasicReturn {
  const fields = enc.decodeFields(
    r,
    ["short", "shortstr", "shortstr", "shortstr"]
  );
  const args = {
    replyCode: fields[0] as number,
    replyText: fields[1] as string,
    exchange: fields[2] as string,
    routingKey: fields[3] as string
  };
  return args;
}

function decodeBasicDeliver(r: Deno.SyncReader): BasicDeliver {
  const fields = enc.decodeFields(
    r,
    ["shortstr", "longlong", "bit", "shortstr", "shortstr"]
  );
  const args = {
    consumerTag: fields[0] as string,
    deliveryTag: fields[1] as bigint,
    redelivered: fields[2] as boolean,
    exchange: fields[3] as string,
    routingKey: fields[4] as string
  };
  return args;
}

function decodeBasicGet(r: Deno.SyncReader): BasicGet {
  const fields = enc.decodeFields(r, ["short", "shortstr", "bit"]);
  const args = {
    ticket: fields[0] as number,
    queue: fields[1] as string,
    noAck: fields[2] as boolean
  };
  return args;
}

function decodeBasicGetOk(r: Deno.SyncReader): BasicGetOk {
  const fields = enc.decodeFields(
    r,
    ["longlong", "bit", "shortstr", "shortstr", "long"]
  );
  const args = {
    deliveryTag: fields[0] as bigint,
    redelivered: fields[1] as boolean,
    exchange: fields[2] as string,
    routingKey: fields[3] as string,
    messageCount: fields[4] as number
  };
  return args;
}

function decodeBasicGetEmpty(r: Deno.SyncReader): BasicGetEmpty {
  const fields = enc.decodeFields(r, ["shortstr"]);
  const args = { clusterId: fields[0] as string };
  return args;
}

function decodeBasicAck(r: Deno.SyncReader): BasicAck {
  const fields = enc.decodeFields(r, ["longlong", "bit"]);
  const args = {
    deliveryTag: fields[0] as bigint,
    multiple: fields[1] as boolean
  };
  return args;
}

function decodeBasicReject(r: Deno.SyncReader): BasicReject {
  const fields = enc.decodeFields(r, ["longlong", "bit"]);
  const args = {
    deliveryTag: fields[0] as bigint,
    requeue: fields[1] as boolean
  };
  return args;
}

function decodeBasicRecoverAsync(r: Deno.SyncReader): BasicRecoverAsync {
  const fields = enc.decodeFields(r, ["bit"]);
  const args = { requeue: fields[0] as boolean };
  return args;
}

function decodeBasicRecover(r: Deno.SyncReader): BasicRecover {
  const fields = enc.decodeFields(r, ["bit"]);
  const args = { requeue: fields[0] as boolean };
  return args;
}

function decodeBasicRecoverOk(r: Deno.SyncReader): BasicRecoverOk {
  const fields = enc.decodeFields(r, []);
  const args = {};
  return args;
}

function decodeBasicNack(r: Deno.SyncReader): BasicNack {
  const fields = enc.decodeFields(r, ["longlong", "bit", "bit"]);
  const args = {
    deliveryTag: fields[0] as bigint,
    multiple: fields[1] as boolean,
    requeue: fields[2] as boolean
  };
  return args;
}

function decodeTxSelect(r: Deno.SyncReader): TxSelect {
  const fields = enc.decodeFields(r, []);
  const args = {};
  return args;
}

function decodeTxSelectOk(r: Deno.SyncReader): TxSelectOk {
  const fields = enc.decodeFields(r, []);
  const args = {};
  return args;
}

function decodeTxCommit(r: Deno.SyncReader): TxCommit {
  const fields = enc.decodeFields(r, []);
  const args = {};
  return args;
}

function decodeTxCommitOk(r: Deno.SyncReader): TxCommitOk {
  const fields = enc.decodeFields(r, []);
  const args = {};
  return args;
}

function decodeTxRollback(r: Deno.SyncReader): TxRollback {
  const fields = enc.decodeFields(r, []);
  const args = {};
  return args;
}

function decodeTxRollbackOk(r: Deno.SyncReader): TxRollbackOk {
  const fields = enc.decodeFields(r, []);
  const args = {};
  return args;
}

function decodeConfirmSelect(r: Deno.SyncReader): ConfirmSelect {
  const fields = enc.decodeFields(r, ["bit"]);
  const args = { nowait: fields[0] as boolean };
  return args;
}

function decodeConfirmSelectOk(r: Deno.SyncReader): ConfirmSelectOk {
  const fields = enc.decodeFields(r, []);
  const args = {};
  return args;
}

export function decodeMethod(data: Uint8Array): ReceiveMethod {
  const r = new Deno.Buffer(data);
  const classId = enc.decodeShortUint(r);
  const methodId = enc.decodeShortUint(r);
  switch (classId) {
    case 10: {
      switch (methodId) {
        case 10:
          return { classId, methodId, args: decodeConnectionStart(r) };
        case 11:
          return { classId, methodId, args: decodeConnectionStartOk(r) };
        case 20:
          return { classId, methodId, args: decodeConnectionSecure(r) };
        case 21:
          return { classId, methodId, args: decodeConnectionSecureOk(r) };
        case 30:
          return { classId, methodId, args: decodeConnectionTune(r) };
        case 31:
          return { classId, methodId, args: decodeConnectionTuneOk(r) };
        case 40:
          return { classId, methodId, args: decodeConnectionOpen(r) };
        case 41:
          return { classId, methodId, args: decodeConnectionOpenOk(r) };
        case 50:
          return { classId, methodId, args: decodeConnectionClose(r) };
        case 51:
          return { classId, methodId, args: decodeConnectionCloseOk(r) };
        case 60:
          return { classId, methodId, args: decodeConnectionBlocked(r) };
        case 61:
          return { classId, methodId, args: decodeConnectionUnblocked(r) };
        case 70:
          return { classId, methodId, args: decodeConnectionUpdateSecret(r) };
        case 71:
          return {
            classId,
            methodId,
            args: decodeConnectionUpdateSecretOk(r)
          };
        default:
          throw new Error(
            "Unknown method " + methodId + " for class 'connection'"
          );
      }
    }

    case 20: {
      switch (methodId) {
        case 10:
          return { classId, methodId, args: decodeChannelOpen(r) };
        case 11:
          return { classId, methodId, args: decodeChannelOpenOk(r) };
        case 20:
          return { classId, methodId, args: decodeChannelFlow(r) };
        case 21:
          return { classId, methodId, args: decodeChannelFlowOk(r) };
        case 40:
          return { classId, methodId, args: decodeChannelClose(r) };
        case 41:
          return { classId, methodId, args: decodeChannelCloseOk(r) };
        default:
          throw new Error(
            "Unknown method " + methodId + " for class 'channel'"
          );
      }
    }

    case 30: {
      switch (methodId) {
        case 10:
          return { classId, methodId, args: decodeAccessRequest(r) };
        case 11:
          return { classId, methodId, args: decodeAccessRequestOk(r) };
        default:
          throw new Error(
            "Unknown method " + methodId + " for class 'access'"
          );
      }
    }

    case 40: {
      switch (methodId) {
        case 10:
          return { classId, methodId, args: decodeExchangeDeclare(r) };
        case 11:
          return { classId, methodId, args: decodeExchangeDeclareOk(r) };
        case 20:
          return { classId, methodId, args: decodeExchangeDelete(r) };
        case 21:
          return { classId, methodId, args: decodeExchangeDeleteOk(r) };
        case 30:
          return { classId, methodId, args: decodeExchangeBind(r) };
        case 31:
          return { classId, methodId, args: decodeExchangeBindOk(r) };
        case 40:
          return { classId, methodId, args: decodeExchangeUnbind(r) };
        case 51:
          return { classId, methodId, args: decodeExchangeUnbindOk(r) };
        default:
          throw new Error(
            "Unknown method " + methodId + " for class 'exchange'"
          );
      }
    }

    case 50: {
      switch (methodId) {
        case 10:
          return { classId, methodId, args: decodeQueueDeclare(r) };
        case 11:
          return { classId, methodId, args: decodeQueueDeclareOk(r) };
        case 20:
          return { classId, methodId, args: decodeQueueBind(r) };
        case 21:
          return { classId, methodId, args: decodeQueueBindOk(r) };
        case 30:
          return { classId, methodId, args: decodeQueuePurge(r) };
        case 31:
          return { classId, methodId, args: decodeQueuePurgeOk(r) };
        case 40:
          return { classId, methodId, args: decodeQueueDelete(r) };
        case 41:
          return { classId, methodId, args: decodeQueueDeleteOk(r) };
        case 50:
          return { classId, methodId, args: decodeQueueUnbind(r) };
        case 51:
          return { classId, methodId, args: decodeQueueUnbindOk(r) };
        default:
          throw new Error("Unknown method " + methodId + " for class 'queue'");
      }
    }

    case 60: {
      switch (methodId) {
        case 10:
          return { classId, methodId, args: decodeBasicQos(r) };
        case 11:
          return { classId, methodId, args: decodeBasicQosOk(r) };
        case 20:
          return { classId, methodId, args: decodeBasicConsume(r) };
        case 21:
          return { classId, methodId, args: decodeBasicConsumeOk(r) };
        case 30:
          return { classId, methodId, args: decodeBasicCancel(r) };
        case 31:
          return { classId, methodId, args: decodeBasicCancelOk(r) };
        case 40:
          return { classId, methodId, args: decodeBasicPublish(r) };
        case 50:
          return { classId, methodId, args: decodeBasicReturn(r) };
        case 60:
          return { classId, methodId, args: decodeBasicDeliver(r) };
        case 70:
          return { classId, methodId, args: decodeBasicGet(r) };
        case 71:
          return { classId, methodId, args: decodeBasicGetOk(r) };
        case 72:
          return { classId, methodId, args: decodeBasicGetEmpty(r) };
        case 80:
          return { classId, methodId, args: decodeBasicAck(r) };
        case 90:
          return { classId, methodId, args: decodeBasicReject(r) };
        case 100:
          return { classId, methodId, args: decodeBasicRecoverAsync(r) };
        case 110:
          return { classId, methodId, args: decodeBasicRecover(r) };
        case 111:
          return { classId, methodId, args: decodeBasicRecoverOk(r) };
        case 120:
          return { classId, methodId, args: decodeBasicNack(r) };
        default:
          throw new Error("Unknown method " + methodId + " for class 'basic'");
      }
    }

    case 90: {
      switch (methodId) {
        case 10:
          return { classId, methodId, args: decodeTxSelect(r) };
        case 11:
          return { classId, methodId, args: decodeTxSelectOk(r) };
        case 20:
          return { classId, methodId, args: decodeTxCommit(r) };
        case 21:
          return { classId, methodId, args: decodeTxCommitOk(r) };
        case 30:
          return { classId, methodId, args: decodeTxRollback(r) };
        case 31:
          return { classId, methodId, args: decodeTxRollbackOk(r) };
        default:
          throw new Error("Unknown method " + methodId + " for class 'tx'");
      }
    }

    case 85: {
      switch (methodId) {
        case 10:
          return { classId, methodId, args: decodeConfirmSelect(r) };
        case 11:
          return { classId, methodId, args: decodeConfirmSelectOk(r) };
        default:
          throw new Error(
            "Unknown method " + methodId + " for class 'confirm'"
          );
      }
    }

    default:
      throw new Error("Unknown class " + classId);
  }
}

export function encodeConnectionHeader(
  size: bigint,
  props: ConnectionProperties
): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(10));
  w.writeSync(enc.encodeShortUint(0));
  w.writeSync(enc.encodeLongLongUint(size));
  w.writeSync(enc.encodeOptionalFields([]));
  return w.bytes();
}

export function encodeChannelHeader(
  size: bigint,
  props: ChannelProperties
): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(20));
  w.writeSync(enc.encodeShortUint(0));
  w.writeSync(enc.encodeLongLongUint(size));
  w.writeSync(enc.encodeOptionalFields([]));
  return w.bytes();
}

export function encodeAccessHeader(
  size: bigint,
  props: AccessProperties
): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(30));
  w.writeSync(enc.encodeShortUint(0));
  w.writeSync(enc.encodeLongLongUint(size));
  w.writeSync(enc.encodeOptionalFields([]));
  return w.bytes();
}

export function encodeExchangeHeader(
  size: bigint,
  props: ExchangeProperties
): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(40));
  w.writeSync(enc.encodeShortUint(0));
  w.writeSync(enc.encodeLongLongUint(size));
  w.writeSync(enc.encodeOptionalFields([]));
  return w.bytes();
}

export function encodeQueueHeader(
  size: bigint,
  props: QueueProperties
): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(50));
  w.writeSync(enc.encodeShortUint(0));
  w.writeSync(enc.encodeLongLongUint(size));
  w.writeSync(enc.encodeOptionalFields([]));
  return w.bytes();
}

export function encodeBasicHeader(
  size: bigint,
  props: BasicProperties
): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(60));
  w.writeSync(enc.encodeShortUint(0));
  w.writeSync(enc.encodeLongLongUint(size));
  w.writeSync(enc.encodeOptionalFields([
    { type: "shortstr", value: props.contentType },
    { type: "shortstr", value: props.contentEncoding },
    { type: "table", value: props.headers },
    { type: "octet", value: props.deliveryMode },
    { type: "octet", value: props.priority },
    { type: "shortstr", value: props.correlationId },
    { type: "shortstr", value: props.replyTo },
    { type: "shortstr", value: props.expiration },
    { type: "shortstr", value: props.messageId },
    { type: "timestamp", value: props.timestamp },
    { type: "shortstr", value: props.type },
    { type: "shortstr", value: props.userId },
    { type: "shortstr", value: props.appId },
    { type: "shortstr", value: props.clusterId }
  ]));
  return w.bytes();
}

export function encodeTxHeader(size: bigint, props: TxProperties): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(90));
  w.writeSync(enc.encodeShortUint(0));
  w.writeSync(enc.encodeLongLongUint(size));
  w.writeSync(enc.encodeOptionalFields([]));
  return w.bytes();
}

export function encodeConfirmHeader(
  size: bigint,
  props: ConfirmProperties
): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(85));
  w.writeSync(enc.encodeShortUint(0));
  w.writeSync(enc.encodeLongLongUint(size));
  w.writeSync(enc.encodeOptionalFields([]));
  return w.bytes();
}

function decodeConnectionHeader(r: Deno.SyncReader): ConnectionHeader {
  const weight = enc.decodeShortUint(r);
  const size = enc.decodeLongLongUint(r);
  const fields = enc.decodeOptionalFields(r, []);
  const props = {};

  return { classId: 10, size, props };
}

function decodeChannelHeader(r: Deno.SyncReader): ChannelHeader {
  const weight = enc.decodeShortUint(r);
  const size = enc.decodeLongLongUint(r);
  const fields = enc.decodeOptionalFields(r, []);
  const props = {};

  return { classId: 20, size, props };
}

function decodeAccessHeader(r: Deno.SyncReader): AccessHeader {
  const weight = enc.decodeShortUint(r);
  const size = enc.decodeLongLongUint(r);
  const fields = enc.decodeOptionalFields(r, []);
  const props = {};

  return { classId: 30, size, props };
}

function decodeExchangeHeader(r: Deno.SyncReader): ExchangeHeader {
  const weight = enc.decodeShortUint(r);
  const size = enc.decodeLongLongUint(r);
  const fields = enc.decodeOptionalFields(r, []);
  const props = {};

  return { classId: 40, size, props };
}

function decodeQueueHeader(r: Deno.SyncReader): QueueHeader {
  const weight = enc.decodeShortUint(r);
  const size = enc.decodeLongLongUint(r);
  const fields = enc.decodeOptionalFields(r, []);
  const props = {};

  return { classId: 50, size, props };
}

function decodeBasicHeader(r: Deno.SyncReader): BasicHeader {
  const weight = enc.decodeShortUint(r);
  const size = enc.decodeLongLongUint(r);
  const fields = enc.decodeOptionalFields(
    r,
    [
      "shortstr",
      "shortstr",
      "table",
      "octet",
      "octet",
      "shortstr",
      "shortstr",
      "shortstr",
      "shortstr",
      "timestamp",
      "shortstr",
      "shortstr",
      "shortstr",
      "shortstr"
    ]
  );
  const props = {
    contentType: fields[0] as string,
    contentEncoding: fields[1] as string,
    headers: fields[2] as Record<string, unknown>,
    deliveryMode: fields[3] as number,
    priority: fields[4] as number,
    correlationId: fields[5] as string,
    replyTo: fields[6] as string,
    expiration: fields[7] as string,
    messageId: fields[8] as string,
    timestamp: fields[9] as bigint,
    type: fields[10] as string,
    userId: fields[11] as string,
    appId: fields[12] as string,
    clusterId: fields[13] as string
  };

  return { classId: 60, size, props };
}

function decodeTxHeader(r: Deno.SyncReader): TxHeader {
  const weight = enc.decodeShortUint(r);
  const size = enc.decodeLongLongUint(r);
  const fields = enc.decodeOptionalFields(r, []);
  const props = {};

  return { classId: 90, size, props };
}

function decodeConfirmHeader(r: Deno.SyncReader): ConfirmHeader {
  const weight = enc.decodeShortUint(r);
  const size = enc.decodeLongLongUint(r);
  const fields = enc.decodeOptionalFields(r, []);
  const props = {};

  return { classId: 85, size, props };
}

export function decodeHeader(data: Uint8Array): Header {
  const r = new Deno.Buffer(data);
  const classId = enc.decodeShortUint(r);
  switch (classId) {
    case 10:
      return decodeConnectionHeader(r);
    case 20:
      return decodeChannelHeader(r);
    case 30:
      return decodeAccessHeader(r);
    case 40:
      return decodeExchangeHeader(r);
    case 50:
      return decodeQueueHeader(r);
    case 60:
      return decodeBasicHeader(r);
    case 90:
      return decodeTxHeader(r);
    case 85:
      return decodeConfirmHeader(r);
    default:
      throw new Error("Unknown class " + classId);
  }
}

interface Socket {
  write(channel: number, type: number, payload: Uint8Array): Promise<void>;
  subscribe(
    channel: number,
    handler: (err: Error | null, type: number, payload: Uint8Array) => void
  ): () => void;
}

export class AmqpProtocol {
  constructor(private socket: Socket) {}

  private async receiveMethod(channel: number) {
    return new Promise<ReceiveMethod>((resolve, reject) => {
      const cancel = this.socket.subscribe(channel, (err, type, payload) => {
        if (err) {
          cancel();
          return reject(err);
        }

        if (type !== 1) {
          cancel();
          return reject(err);
        }

        cancel();
        return resolve(decodeMethod(payload));
      });
    });
  }

  private async receiveHeader(channel: number) {
    return new Promise<Header>((resolve, reject) => {
      const cancel = this.socket.subscribe(channel, (err, type, payload) => {
        if (err) {
          cancel();
          return reject(err);
        }

        if (type !== 2) {
          cancel();
          return reject(err);
        }

        cancel();
        return resolve(decodeHeader(payload));
      });
    });
  }

  private async receiveContent(channel: number, size: bigint) {
    const buffer = new Deno.Buffer();
    return new Promise<Uint8Array>((resolve, reject) => {
      const cancel = this.socket.subscribe(channel, (err, type, payload) => {
        if (err) {
          cancel();
          return reject(err);
        }

        if (type !== 3) {
          cancel();
          return resolve(buffer.bytes());
        }

        if (buffer.length >= Number(size)) {
          cancel();
          return resolve(buffer.bytes());
        }

        buffer.writeSync(payload);
      });
    });
  }

  async sendConnectionStart(
    channel: number,
    args: ConnectionStartArgs
  ): Promise<ConnectionStartOk> {
    await this.socket.write(channel, 1, encodeConnectionStart(args));
    const reply = await this.receiveMethod(channel);
    if (reply.classId === 10 && reply.methodId === 11) {
      return reply.args;
    }

    throw new Error("Unexpected method");
  }

  async sendConnectionStartOk(
    channel: number,
    args: ConnectionStartOkArgs
  ): Promise<void> {
    await this.socket.write(channel, 1, encodeConnectionStartOk(args));
  }

  async sendConnectionSecure(
    channel: number,
    args: ConnectionSecureArgs
  ): Promise<ConnectionSecureOk> {
    await this.socket.write(channel, 1, encodeConnectionSecure(args));
    const reply = await this.receiveMethod(channel);
    if (reply.classId === 10 && reply.methodId === 21) {
      return reply.args;
    }

    throw new Error("Unexpected method");
  }

  async sendConnectionSecureOk(
    channel: number,
    args: ConnectionSecureOkArgs
  ): Promise<void> {
    await this.socket.write(channel, 1, encodeConnectionSecureOk(args));
  }

  async sendConnectionTune(channel: number, args: ConnectionTuneArgs): Promise<
    ConnectionTuneOk
  > {
    await this.socket.write(channel, 1, encodeConnectionTune(args));
    const reply = await this.receiveMethod(channel);
    if (reply.classId === 10 && reply.methodId === 31) {
      return reply.args;
    }

    throw new Error("Unexpected method");
  }

  async sendConnectionTuneOk(
    channel: number,
    args: ConnectionTuneOkArgs
  ): Promise<void> {
    await this.socket.write(channel, 1, encodeConnectionTuneOk(args));
  }

  async sendConnectionOpen(channel: number, args: ConnectionOpenArgs): Promise<
    ConnectionOpenOk
  > {
    await this.socket.write(channel, 1, encodeConnectionOpen(args));
    const reply = await this.receiveMethod(channel);
    if (reply.classId === 10 && reply.methodId === 41) {
      return reply.args;
    }

    throw new Error("Unexpected method");
  }

  async sendConnectionOpenOk(
    channel: number,
    args: ConnectionOpenOkArgs
  ): Promise<void> {
    await this.socket.write(channel, 1, encodeConnectionOpenOk(args));
  }

  async sendConnectionClose(
    channel: number,
    args: ConnectionCloseArgs
  ): Promise<ConnectionCloseOk> {
    await this.socket.write(channel, 1, encodeConnectionClose(args));
    const reply = await this.receiveMethod(channel);
    if (reply.classId === 10 && reply.methodId === 51) {
      return reply.args;
    }

    throw new Error("Unexpected method");
  }

  async sendConnectionCloseOk(
    channel: number,
    args: ConnectionCloseOkArgs
  ): Promise<void> {
    await this.socket.write(channel, 1, encodeConnectionCloseOk(args));
  }

  async sendConnectionBlocked(
    channel: number,
    args: ConnectionBlockedArgs
  ): Promise<void> {
    await this.socket.write(channel, 1, encodeConnectionBlocked(args));
  }

  async sendConnectionUnblocked(
    channel: number,
    args: ConnectionUnblockedArgs
  ): Promise<void> {
    await this.socket.write(channel, 1, encodeConnectionUnblocked(args));
  }

  async sendConnectionUpdateSecret(
    channel: number,
    args: ConnectionUpdateSecretArgs
  ): Promise<ConnectionUpdateSecretOk> {
    await this.socket.write(channel, 1, encodeConnectionUpdateSecret(args));
    const reply = await this.receiveMethod(channel);
    if (reply.classId === 10 && reply.methodId === 71) {
      return reply.args;
    }

    throw new Error("Unexpected method");
  }

  async sendConnectionUpdateSecretOk(
    channel: number,
    args: ConnectionUpdateSecretOkArgs
  ): Promise<void> {
    await this.socket.write(channel, 1, encodeConnectionUpdateSecretOk(args));
  }

  async sendChannelOpen(channel: number, args: ChannelOpenArgs): Promise<
    ChannelOpenOk
  > {
    await this.socket.write(channel, 1, encodeChannelOpen(args));
    const reply = await this.receiveMethod(channel);
    if (reply.classId === 20 && reply.methodId === 11) {
      return reply.args;
    }

    throw new Error("Unexpected method");
  }

  async sendChannelOpenOk(channel: number, args: ChannelOpenOkArgs): Promise<
    void
  > {
    await this.socket.write(channel, 1, encodeChannelOpenOk(args));
  }

  async sendChannelFlow(channel: number, args: ChannelFlowArgs): Promise<
    ChannelFlowOk
  > {
    await this.socket.write(channel, 1, encodeChannelFlow(args));
    const reply = await this.receiveMethod(channel);
    if (reply.classId === 20 && reply.methodId === 21) {
      return reply.args;
    }

    throw new Error("Unexpected method");
  }

  async sendChannelFlowOk(channel: number, args: ChannelFlowOkArgs): Promise<
    void
  > {
    await this.socket.write(channel, 1, encodeChannelFlowOk(args));
  }

  async sendChannelClose(channel: number, args: ChannelCloseArgs): Promise<
    ChannelCloseOk
  > {
    await this.socket.write(channel, 1, encodeChannelClose(args));
    const reply = await this.receiveMethod(channel);
    if (reply.classId === 20 && reply.methodId === 41) {
      return reply.args;
    }

    throw new Error("Unexpected method");
  }

  async sendChannelCloseOk(channel: number, args: ChannelCloseOkArgs): Promise<
    void
  > {
    await this.socket.write(channel, 1, encodeChannelCloseOk(args));
  }

  async sendAccessRequest(channel: number, args: AccessRequestArgs): Promise<
    AccessRequestOk
  > {
    await this.socket.write(channel, 1, encodeAccessRequest(args));
    const reply = await this.receiveMethod(channel);
    if (reply.classId === 30 && reply.methodId === 11) {
      return reply.args;
    }

    throw new Error("Unexpected method");
  }

  async sendAccessRequestOk(
    channel: number,
    args: AccessRequestOkArgs
  ): Promise<void> {
    await this.socket.write(channel, 1, encodeAccessRequestOk(args));
  }

  async sendExchangeDeclare(
    channel: number,
    args: ExchangeDeclareArgs
  ): Promise<ExchangeDeclareOk> {
    await this.socket.write(channel, 1, encodeExchangeDeclare(args));
    const reply = await this.receiveMethod(channel);
    if (reply.classId === 40 && reply.methodId === 11) {
      return reply.args;
    }

    throw new Error("Unexpected method");
  }

  async sendExchangeDeclareOk(
    channel: number,
    args: ExchangeDeclareOkArgs
  ): Promise<void> {
    await this.socket.write(channel, 1, encodeExchangeDeclareOk(args));
  }

  async sendExchangeDelete(channel: number, args: ExchangeDeleteArgs): Promise<
    ExchangeDeleteOk
  > {
    await this.socket.write(channel, 1, encodeExchangeDelete(args));
    const reply = await this.receiveMethod(channel);
    if (reply.classId === 40 && reply.methodId === 21) {
      return reply.args;
    }

    throw new Error("Unexpected method");
  }

  async sendExchangeDeleteOk(
    channel: number,
    args: ExchangeDeleteOkArgs
  ): Promise<void> {
    await this.socket.write(channel, 1, encodeExchangeDeleteOk(args));
  }

  async sendExchangeBind(channel: number, args: ExchangeBindArgs): Promise<
    ExchangeBindOk
  > {
    await this.socket.write(channel, 1, encodeExchangeBind(args));
    const reply = await this.receiveMethod(channel);
    if (reply.classId === 40 && reply.methodId === 31) {
      return reply.args;
    }

    throw new Error("Unexpected method");
  }

  async sendExchangeBindOk(channel: number, args: ExchangeBindOkArgs): Promise<
    void
  > {
    await this.socket.write(channel, 1, encodeExchangeBindOk(args));
  }

  async sendExchangeUnbind(channel: number, args: ExchangeUnbindArgs): Promise<
    ExchangeUnbindOk
  > {
    await this.socket.write(channel, 1, encodeExchangeUnbind(args));
    const reply = await this.receiveMethod(channel);
    if (reply.classId === 40 && reply.methodId === 51) {
      return reply.args;
    }

    throw new Error("Unexpected method");
  }

  async sendExchangeUnbindOk(
    channel: number,
    args: ExchangeUnbindOkArgs
  ): Promise<void> {
    await this.socket.write(channel, 1, encodeExchangeUnbindOk(args));
  }

  async sendQueueDeclare(channel: number, args: QueueDeclareArgs): Promise<
    QueueDeclareOk
  > {
    await this.socket.write(channel, 1, encodeQueueDeclare(args));
    const reply = await this.receiveMethod(channel);
    if (reply.classId === 50 && reply.methodId === 11) {
      return reply.args;
    }

    throw new Error("Unexpected method");
  }

  async sendQueueDeclareOk(channel: number, args: QueueDeclareOkArgs): Promise<
    void
  > {
    await this.socket.write(channel, 1, encodeQueueDeclareOk(args));
  }

  async sendQueueBind(channel: number, args: QueueBindArgs): Promise<
    QueueBindOk
  > {
    await this.socket.write(channel, 1, encodeQueueBind(args));
    const reply = await this.receiveMethod(channel);
    if (reply.classId === 50 && reply.methodId === 21) {
      return reply.args;
    }

    throw new Error("Unexpected method");
  }

  async sendQueueBindOk(channel: number, args: QueueBindOkArgs): Promise<
    void
  > {
    await this.socket.write(channel, 1, encodeQueueBindOk(args));
  }

  async sendQueuePurge(channel: number, args: QueuePurgeArgs): Promise<
    QueuePurgeOk
  > {
    await this.socket.write(channel, 1, encodeQueuePurge(args));
    const reply = await this.receiveMethod(channel);
    if (reply.classId === 50 && reply.methodId === 31) {
      return reply.args;
    }

    throw new Error("Unexpected method");
  }

  async sendQueuePurgeOk(channel: number, args: QueuePurgeOkArgs): Promise<
    void
  > {
    await this.socket.write(channel, 1, encodeQueuePurgeOk(args));
  }

  async sendQueueDelete(channel: number, args: QueueDeleteArgs): Promise<
    QueueDeleteOk
  > {
    await this.socket.write(channel, 1, encodeQueueDelete(args));
    const reply = await this.receiveMethod(channel);
    if (reply.classId === 50 && reply.methodId === 41) {
      return reply.args;
    }

    throw new Error("Unexpected method");
  }

  async sendQueueDeleteOk(channel: number, args: QueueDeleteOkArgs): Promise<
    void
  > {
    await this.socket.write(channel, 1, encodeQueueDeleteOk(args));
  }

  async sendQueueUnbind(channel: number, args: QueueUnbindArgs): Promise<
    QueueUnbindOk
  > {
    await this.socket.write(channel, 1, encodeQueueUnbind(args));
    const reply = await this.receiveMethod(channel);
    if (reply.classId === 50 && reply.methodId === 51) {
      return reply.args;
    }

    throw new Error("Unexpected method");
  }

  async sendQueueUnbindOk(channel: number, args: QueueUnbindOkArgs): Promise<
    void
  > {
    await this.socket.write(channel, 1, encodeQueueUnbindOk(args));
  }

  async sendBasicQos(channel: number, args: BasicQosArgs): Promise<
    BasicQosOk
  > {
    await this.socket.write(channel, 1, encodeBasicQos(args));
    const reply = await this.receiveMethod(channel);
    if (reply.classId === 60 && reply.methodId === 11) {
      return reply.args;
    }

    throw new Error("Unexpected method");
  }

  async sendBasicQosOk(channel: number, args: BasicQosOkArgs): Promise<void> {
    await this.socket.write(channel, 1, encodeBasicQosOk(args));
  }

  async sendBasicConsume(channel: number, args: BasicConsumeArgs): Promise<
    BasicConsumeOk
  > {
    await this.socket.write(channel, 1, encodeBasicConsume(args));
    const reply = await this.receiveMethod(channel);
    if (reply.classId === 60 && reply.methodId === 21) {
      return reply.args;
    }

    throw new Error("Unexpected method");
  }

  async sendBasicConsumeOk(channel: number, args: BasicConsumeOkArgs): Promise<
    void
  > {
    await this.socket.write(channel, 1, encodeBasicConsumeOk(args));
  }

  async sendBasicCancel(channel: number, args: BasicCancelArgs): Promise<
    BasicCancelOk
  > {
    await this.socket.write(channel, 1, encodeBasicCancel(args));
    const reply = await this.receiveMethod(channel);
    if (reply.classId === 60 && reply.methodId === 31) {
      return reply.args;
    }

    throw new Error("Unexpected method");
  }

  async sendBasicCancelOk(channel: number, args: BasicCancelOkArgs): Promise<
    void
  > {
    await this.socket.write(channel, 1, encodeBasicCancelOk(args));
  }

  async sendBasicPublish(
    channel: number,
    args: BasicPublishArgs,
    props: BasicProperties,
    data: Uint8Array
  ) {
    await this.socket.write(channel, 1, encodeBasicPublish(args));
    await this.socket.write(
      channel,
      2,
      encodeBasicHeader(BigInt(data.length), props)
    );
    await this.socket.write(channel, 3, data);
  }

  async sendBasicReturn(
    channel: number,
    args: BasicReturnArgs,
    props: BasicProperties,
    data: Uint8Array
  ) {
    await this.socket.write(channel, 1, encodeBasicReturn(args));
    await this.socket.write(
      channel,
      2,
      encodeBasicHeader(BigInt(data.length), props)
    );
    await this.socket.write(channel, 3, data);
  }

  async sendBasicDeliver(
    channel: number,
    args: BasicDeliverArgs,
    props: BasicProperties,
    data: Uint8Array
  ) {
    await this.socket.write(channel, 1, encodeBasicDeliver(args));
    await this.socket.write(
      channel,
      2,
      encodeBasicHeader(BigInt(data.length), props)
    );
    await this.socket.write(channel, 3, data);
  }

  async sendBasicGet(channel: number, args: BasicGetArgs): Promise<
    BasicGetOk | BasicGetEmpty
  > {
    await this.socket.write(channel, 1, encodeBasicGet(args));
    const reply = await this.receiveMethod(channel);
    if (reply.classId === 60 && reply.methodId === 71) {
      return reply.args;
    }
    if (reply.classId === 60 && reply.methodId === 72) {
      return reply.args;
    }

    throw new Error("Unexpected method");
  }

  async sendBasicGetOk(
    channel: number,
    args: BasicGetOkArgs,
    props: BasicProperties,
    data: Uint8Array
  ) {
    await this.socket.write(channel, 1, encodeBasicGetOk(args));
    await this.socket.write(
      channel,
      2,
      encodeBasicHeader(BigInt(data.length), props)
    );
    await this.socket.write(channel, 3, data);
  }

  async sendBasicGetEmpty(channel: number, args: BasicGetEmptyArgs): Promise<
    void
  > {
    await this.socket.write(channel, 1, encodeBasicGetEmpty(args));
  }

  async sendBasicAck(channel: number, args: BasicAckArgs): Promise<void> {
    await this.socket.write(channel, 1, encodeBasicAck(args));
  }

  async sendBasicReject(channel: number, args: BasicRejectArgs): Promise<
    void
  > {
    await this.socket.write(channel, 1, encodeBasicReject(args));
  }

  async sendBasicRecoverAsync(
    channel: number,
    args: BasicRecoverAsyncArgs
  ): Promise<void> {
    await this.socket.write(channel, 1, encodeBasicRecoverAsync(args));
  }

  async sendBasicRecover(channel: number, args: BasicRecoverArgs): Promise<
    BasicRecoverOk
  > {
    await this.socket.write(channel, 1, encodeBasicRecover(args));
    const reply = await this.receiveMethod(channel);
    if (reply.classId === 60 && reply.methodId === 111) {
      return reply.args;
    }

    throw new Error("Unexpected method");
  }

  async sendBasicRecoverOk(channel: number, args: BasicRecoverOkArgs): Promise<
    void
  > {
    await this.socket.write(channel, 1, encodeBasicRecoverOk(args));
  }

  async sendBasicNack(channel: number, args: BasicNackArgs): Promise<void> {
    await this.socket.write(channel, 1, encodeBasicNack(args));
  }

  async sendTxSelect(channel: number, args: TxSelectArgs): Promise<
    TxSelectOk
  > {
    await this.socket.write(channel, 1, encodeTxSelect(args));
    const reply = await this.receiveMethod(channel);
    if (reply.classId === 90 && reply.methodId === 11) {
      return reply.args;
    }

    throw new Error("Unexpected method");
  }

  async sendTxSelectOk(channel: number, args: TxSelectOkArgs): Promise<void> {
    await this.socket.write(channel, 1, encodeTxSelectOk(args));
  }

  async sendTxCommit(channel: number, args: TxCommitArgs): Promise<
    TxCommitOk
  > {
    await this.socket.write(channel, 1, encodeTxCommit(args));
    const reply = await this.receiveMethod(channel);
    if (reply.classId === 90 && reply.methodId === 21) {
      return reply.args;
    }

    throw new Error("Unexpected method");
  }

  async sendTxCommitOk(channel: number, args: TxCommitOkArgs): Promise<void> {
    await this.socket.write(channel, 1, encodeTxCommitOk(args));
  }

  async sendTxRollback(channel: number, args: TxRollbackArgs): Promise<
    TxRollbackOk
  > {
    await this.socket.write(channel, 1, encodeTxRollback(args));
    const reply = await this.receiveMethod(channel);
    if (reply.classId === 90 && reply.methodId === 31) {
      return reply.args;
    }

    throw new Error("Unexpected method");
  }

  async sendTxRollbackOk(channel: number, args: TxRollbackOkArgs): Promise<
    void
  > {
    await this.socket.write(channel, 1, encodeTxRollbackOk(args));
  }

  async sendConfirmSelect(channel: number, args: ConfirmSelectArgs): Promise<
    ConfirmSelectOk
  > {
    await this.socket.write(channel, 1, encodeConfirmSelect(args));
    const reply = await this.receiveMethod(channel);
    if (reply.classId === 85 && reply.methodId === 11) {
      return reply.args;
    }

    throw new Error("Unexpected method");
  }

  async sendConfirmSelectOk(
    channel: number,
    args: ConfirmSelectOkArgs
  ): Promise<void> {
    await this.socket.write(channel, 1, encodeConfirmSelectOk(args));
  }

  async receiveConnectionStart(channel: number): Promise<ConnectionStart> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 10 && method.methodId === 10) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveConnectionStartOk(channel: number): Promise<ConnectionStartOk> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 10 && method.methodId === 11) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveConnectionSecure(channel: number): Promise<ConnectionSecure> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 10 && method.methodId === 20) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveConnectionSecureOk(channel: number): Promise<
    ConnectionSecureOk
  > {
    const method = await this.receiveMethod(channel);

    if (method.classId === 10 && method.methodId === 21) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveConnectionTune(channel: number): Promise<ConnectionTune> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 10 && method.methodId === 30) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveConnectionTuneOk(channel: number): Promise<ConnectionTuneOk> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 10 && method.methodId === 31) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveConnectionOpen(channel: number): Promise<ConnectionOpen> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 10 && method.methodId === 40) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveConnectionOpenOk(channel: number): Promise<ConnectionOpenOk> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 10 && method.methodId === 41) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveConnectionClose(channel: number): Promise<ConnectionClose> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 10 && method.methodId === 50) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveConnectionCloseOk(channel: number): Promise<ConnectionCloseOk> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 10 && method.methodId === 51) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveConnectionBlocked(channel: number): Promise<ConnectionBlocked> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 10 && method.methodId === 60) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveConnectionUnblocked(channel: number): Promise<
    ConnectionUnblocked
  > {
    const method = await this.receiveMethod(channel);

    if (method.classId === 10 && method.methodId === 61) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveConnectionUpdateSecret(channel: number): Promise<
    ConnectionUpdateSecret
  > {
    const method = await this.receiveMethod(channel);

    if (method.classId === 10 && method.methodId === 70) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveConnectionUpdateSecretOk(channel: number): Promise<
    ConnectionUpdateSecretOk
  > {
    const method = await this.receiveMethod(channel);

    if (method.classId === 10 && method.methodId === 71) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveChannelOpen(channel: number): Promise<ChannelOpen> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 20 && method.methodId === 10) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveChannelOpenOk(channel: number): Promise<ChannelOpenOk> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 20 && method.methodId === 11) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveChannelFlow(channel: number): Promise<ChannelFlow> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 20 && method.methodId === 20) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveChannelFlowOk(channel: number): Promise<ChannelFlowOk> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 20 && method.methodId === 21) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveChannelClose(channel: number): Promise<ChannelClose> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 20 && method.methodId === 40) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveChannelCloseOk(channel: number): Promise<ChannelCloseOk> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 20 && method.methodId === 41) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveAccessRequest(channel: number): Promise<AccessRequest> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 30 && method.methodId === 10) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveAccessRequestOk(channel: number): Promise<AccessRequestOk> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 30 && method.methodId === 11) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveExchangeDeclare(channel: number): Promise<ExchangeDeclare> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 40 && method.methodId === 10) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveExchangeDeclareOk(channel: number): Promise<ExchangeDeclareOk> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 40 && method.methodId === 11) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveExchangeDelete(channel: number): Promise<ExchangeDelete> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 40 && method.methodId === 20) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveExchangeDeleteOk(channel: number): Promise<ExchangeDeleteOk> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 40 && method.methodId === 21) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveExchangeBind(channel: number): Promise<ExchangeBind> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 40 && method.methodId === 30) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveExchangeBindOk(channel: number): Promise<ExchangeBindOk> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 40 && method.methodId === 31) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveExchangeUnbind(channel: number): Promise<ExchangeUnbind> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 40 && method.methodId === 40) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveExchangeUnbindOk(channel: number): Promise<ExchangeUnbindOk> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 40 && method.methodId === 51) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveQueueDeclare(channel: number): Promise<QueueDeclare> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 50 && method.methodId === 10) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveQueueDeclareOk(channel: number): Promise<QueueDeclareOk> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 50 && method.methodId === 11) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveQueueBind(channel: number): Promise<QueueBind> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 50 && method.methodId === 20) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveQueueBindOk(channel: number): Promise<QueueBindOk> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 50 && method.methodId === 21) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveQueuePurge(channel: number): Promise<QueuePurge> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 50 && method.methodId === 30) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveQueuePurgeOk(channel: number): Promise<QueuePurgeOk> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 50 && method.methodId === 31) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveQueueDelete(channel: number): Promise<QueueDelete> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 50 && method.methodId === 40) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveQueueDeleteOk(channel: number): Promise<QueueDeleteOk> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 50 && method.methodId === 41) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveQueueUnbind(channel: number): Promise<QueueUnbind> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 50 && method.methodId === 50) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveQueueUnbindOk(channel: number): Promise<QueueUnbindOk> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 50 && method.methodId === 51) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveBasicQos(channel: number): Promise<BasicQos> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 60 && method.methodId === 10) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveBasicQosOk(channel: number): Promise<BasicQosOk> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 60 && method.methodId === 11) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveBasicConsume(channel: number): Promise<BasicConsume> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 60 && method.methodId === 20) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveBasicConsumeOk(channel: number): Promise<BasicConsumeOk> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 60 && method.methodId === 21) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveBasicCancel(channel: number): Promise<BasicCancel> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 60 && method.methodId === 30) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveBasicCancelOk(channel: number): Promise<BasicCancelOk> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 60 && method.methodId === 31) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveBasicGet(channel: number): Promise<BasicGet> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 60 && method.methodId === 70) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveBasicGetEmpty(channel: number): Promise<BasicGetEmpty> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 60 && method.methodId === 72) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveBasicAck(channel: number): Promise<BasicAck> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 60 && method.methodId === 80) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveBasicReject(channel: number): Promise<BasicReject> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 60 && method.methodId === 90) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveBasicRecoverAsync(channel: number): Promise<BasicRecoverAsync> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 60 && method.methodId === 100) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveBasicRecover(channel: number): Promise<BasicRecover> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 60 && method.methodId === 110) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveBasicRecoverOk(channel: number): Promise<BasicRecoverOk> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 60 && method.methodId === 111) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveBasicNack(channel: number): Promise<BasicNack> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 60 && method.methodId === 120) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveTxSelect(channel: number): Promise<TxSelect> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 90 && method.methodId === 10) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveTxSelectOk(channel: number): Promise<TxSelectOk> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 90 && method.methodId === 11) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveTxCommit(channel: number): Promise<TxCommit> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 90 && method.methodId === 20) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveTxCommitOk(channel: number): Promise<TxCommitOk> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 90 && method.methodId === 21) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveTxRollback(channel: number): Promise<TxRollback> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 90 && method.methodId === 30) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveTxRollbackOk(channel: number): Promise<TxRollbackOk> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 90 && method.methodId === 31) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveConfirmSelect(channel: number): Promise<ConfirmSelect> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 85 && method.methodId === 10) {
      return method.args;
    }

    throw new Error("");
  }

  async receiveConfirmSelectOk(channel: number): Promise<ConfirmSelectOk> {
    const method = await this.receiveMethod(channel);

    if (method.classId === 85 && method.methodId === 11) {
      return method.args;
    }

    throw new Error("");
  }

  subscribeConnectionStart(
    channel: number,
    handler: (args: ConnectionStart) => void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 10 && method.methodId === 10) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeConnectionStartOk(
    channel: number,
    handler: (args: ConnectionStartOk) => void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 10 && method.methodId === 11) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeConnectionSecure(
    channel: number,
    handler: (args: ConnectionSecure) => void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 10 && method.methodId === 20) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeConnectionSecureOk(
    channel: number,
    handler: (args: ConnectionSecureOk) => void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 10 && method.methodId === 21) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeConnectionTune(
    channel: number,
    handler: (args: ConnectionTune) => void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 10 && method.methodId === 30) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeConnectionTuneOk(
    channel: number,
    handler: (args: ConnectionTuneOk) => void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 10 && method.methodId === 31) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeConnectionOpen(
    channel: number,
    handler: (args: ConnectionOpen) => void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 10 && method.methodId === 40) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeConnectionOpenOk(
    channel: number,
    handler: (args: ConnectionOpenOk) => void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 10 && method.methodId === 41) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeConnectionClose(
    channel: number,
    handler: (args: ConnectionClose) => void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 10 && method.methodId === 50) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeConnectionCloseOk(
    channel: number,
    handler: (args: ConnectionCloseOk) => void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 10 && method.methodId === 51) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeConnectionBlocked(
    channel: number,
    handler: (args: ConnectionBlocked) => void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 10 && method.methodId === 60) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeConnectionUnblocked(
    channel: number,
    handler: (args: ConnectionUnblocked) => void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 10 && method.methodId === 61) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeConnectionUpdateSecret(
    channel: number,
    handler: (args: ConnectionUpdateSecret) => void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 10 && method.methodId === 70) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeConnectionUpdateSecretOk(
    channel: number,
    handler: (args: ConnectionUpdateSecretOk) => void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 10 && method.methodId === 71) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeChannelOpen(
    channel: number,
    handler: (args: ChannelOpen) => void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 20 && method.methodId === 10) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeChannelOpenOk(
    channel: number,
    handler: (args: ChannelOpenOk) => void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 20 && method.methodId === 11) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeChannelFlow(
    channel: number,
    handler: (args: ChannelFlow) => void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 20 && method.methodId === 20) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeChannelFlowOk(
    channel: number,
    handler: (args: ChannelFlowOk) => void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 20 && method.methodId === 21) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeChannelClose(
    channel: number,
    handler: (args: ChannelClose) => void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 20 && method.methodId === 40) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeChannelCloseOk(
    channel: number,
    handler: (args: ChannelCloseOk) => void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 20 && method.methodId === 41) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeAccessRequest(
    channel: number,
    handler: (args: AccessRequest) => void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 30 && method.methodId === 10) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeAccessRequestOk(
    channel: number,
    handler: (args: AccessRequestOk) => void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 30 && method.methodId === 11) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeExchangeDeclare(
    channel: number,
    handler: (args: ExchangeDeclare) => void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 40 && method.methodId === 10) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeExchangeDeclareOk(
    channel: number,
    handler: (args: ExchangeDeclareOk) => void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 40 && method.methodId === 11) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeExchangeDelete(
    channel: number,
    handler: (args: ExchangeDelete) => void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 40 && method.methodId === 20) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeExchangeDeleteOk(
    channel: number,
    handler: (args: ExchangeDeleteOk) => void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 40 && method.methodId === 21) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeExchangeBind(
    channel: number,
    handler: (args: ExchangeBind) => void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 40 && method.methodId === 30) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeExchangeBindOk(
    channel: number,
    handler: (args: ExchangeBindOk) => void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 40 && method.methodId === 31) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeExchangeUnbind(
    channel: number,
    handler: (args: ExchangeUnbind) => void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 40 && method.methodId === 40) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeExchangeUnbindOk(
    channel: number,
    handler: (args: ExchangeUnbindOk) => void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 40 && method.methodId === 51) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeQueueDeclare(
    channel: number,
    handler: (args: QueueDeclare) => void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 50 && method.methodId === 10) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeQueueDeclareOk(
    channel: number,
    handler: (args: QueueDeclareOk) => void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 50 && method.methodId === 11) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeQueueBind(
    channel: number,
    handler: (args: QueueBind) => void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 50 && method.methodId === 20) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeQueueBindOk(
    channel: number,
    handler: (args: QueueBindOk) => void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 50 && method.methodId === 21) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeQueuePurge(
    channel: number,
    handler: (args: QueuePurge) => void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 50 && method.methodId === 30) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeQueuePurgeOk(
    channel: number,
    handler: (args: QueuePurgeOk) => void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 50 && method.methodId === 31) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeQueueDelete(
    channel: number,
    handler: (args: QueueDelete) => void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 50 && method.methodId === 40) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeQueueDeleteOk(
    channel: number,
    handler: (args: QueueDeleteOk) => void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 50 && method.methodId === 41) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeQueueUnbind(
    channel: number,
    handler: (args: QueueUnbind) => void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 50 && method.methodId === 50) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeQueueUnbindOk(
    channel: number,
    handler: (args: QueueUnbindOk) => void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 50 && method.methodId === 51) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeBasicQos(channel: number, handler: (args: BasicQos) => void): () =>
    void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 60 && method.methodId === 10) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeBasicQosOk(
    channel: number,
    handler: (args: BasicQosOk) => void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 60 && method.methodId === 11) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeBasicConsume(
    channel: number,
    handler: (args: BasicConsume) => void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 60 && method.methodId === 20) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeBasicConsumeOk(
    channel: number,
    handler: (args: BasicConsumeOk) => void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 60 && method.methodId === 21) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeBasicCancel(
    channel: number,
    handler: (args: BasicCancel) => void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 60 && method.methodId === 30) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeBasicCancelOk(
    channel: number,
    handler: (args: BasicCancelOk) => void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 60 && method.methodId === 31) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeBasicPublish(
    channel: number,
    handler: (args: BasicPublish, props: BasicProperties, data: Uint8Array) =>
      void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 60 && method.methodId === 40) {
          const header = await this.receiveHeader(channel);
          const content = await this.receiveContent(channel, header.size);
          return handler(method.args, header.props, content);
        }
      }
    );
    return cancel;
  }

  subscribeBasicReturn(
    channel: number,
    handler: (args: BasicReturn, props: BasicProperties, data: Uint8Array) =>
      void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 60 && method.methodId === 50) {
          const header = await this.receiveHeader(channel);
          const content = await this.receiveContent(channel, header.size);
          return handler(method.args, header.props, content);
        }
      }
    );
    return cancel;
  }

  subscribeBasicDeliver(
    channel: number,
    handler: (args: BasicDeliver, props: BasicProperties, data: Uint8Array) =>
      void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 60 && method.methodId === 60) {
          const header = await this.receiveHeader(channel);
          const content = await this.receiveContent(channel, header.size);
          return handler(method.args, header.props, content);
        }
      }
    );
    return cancel;
  }

  subscribeBasicGet(channel: number, handler: (args: BasicGet) => void): () =>
    void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 60 && method.methodId === 70) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeBasicGetOk(
    channel: number,
    handler: (args: BasicGetOk, props: BasicProperties, data: Uint8Array) =>
      void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 60 && method.methodId === 71) {
          const header = await this.receiveHeader(channel);
          const content = await this.receiveContent(channel, header.size);
          return handler(method.args, header.props, content);
        }
      }
    );
    return cancel;
  }

  subscribeBasicGetEmpty(
    channel: number,
    handler: (args: BasicGetEmpty) => void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 60 && method.methodId === 72) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeBasicAck(channel: number, handler: (args: BasicAck) => void): () =>
    void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 60 && method.methodId === 80) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeBasicReject(
    channel: number,
    handler: (args: BasicReject) => void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 60 && method.methodId === 90) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeBasicRecoverAsync(
    channel: number,
    handler: (args: BasicRecoverAsync) => void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 60 && method.methodId === 100) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeBasicRecover(
    channel: number,
    handler: (args: BasicRecover) => void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 60 && method.methodId === 110) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeBasicRecoverOk(
    channel: number,
    handler: (args: BasicRecoverOk) => void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 60 && method.methodId === 111) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeBasicNack(
    channel: number,
    handler: (args: BasicNack) => void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 60 && method.methodId === 120) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeTxSelect(channel: number, handler: (args: TxSelect) => void): () =>
    void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 90 && method.methodId === 10) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeTxSelectOk(
    channel: number,
    handler: (args: TxSelectOk) => void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 90 && method.methodId === 11) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeTxCommit(channel: number, handler: (args: TxCommit) => void): () =>
    void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 90 && method.methodId === 20) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeTxCommitOk(
    channel: number,
    handler: (args: TxCommitOk) => void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 90 && method.methodId === 21) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeTxRollback(
    channel: number,
    handler: (args: TxRollback) => void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 90 && method.methodId === 30) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeTxRollbackOk(
    channel: number,
    handler: (args: TxRollbackOk) => void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 90 && method.methodId === 31) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeConfirmSelect(
    channel: number,
    handler: (args: ConfirmSelect) => void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 85 && method.methodId === 10) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }

  subscribeConfirmSelectOk(
    channel: number,
    handler: (args: ConfirmSelectOk) => void
  ): () => void {
    const cancel = this.socket.subscribe(
      channel,
      async (err, type, payload) => {
        if (err || type !== 1) {
          return;
        }

        const method = decodeMethod(payload);
        if (method.classId === 85 && method.methodId === 11) {
          return handler(method.args);
        }
      }
    );
    return cancel;
  }
}
