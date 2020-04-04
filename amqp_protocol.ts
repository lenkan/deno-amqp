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

export type ReceiveMethod =
  | ReceiveConnectionStart
  | ReceiveConnectionStartOk
  | ReceiveConnectionSecure
  | ReceiveConnectionSecureOk
  | ReceiveConnectionTune
  | ReceiveConnectionTuneOk
  | ReceiveConnectionOpen
  | ReceiveConnectionOpenOk
  | ReceiveConnectionClose
  | ReceiveConnectionCloseOk
  | ReceiveConnectionBlocked
  | ReceiveConnectionUnblocked
  | ReceiveConnectionUpdateSecret
  | ReceiveConnectionUpdateSecretOk
  | ReceiveChannelOpen
  | ReceiveChannelOpenOk
  | ReceiveChannelFlow
  | ReceiveChannelFlowOk
  | ReceiveChannelClose
  | ReceiveChannelCloseOk
  | ReceiveAccessRequest
  | ReceiveAccessRequestOk
  | ReceiveExchangeDeclare
  | ReceiveExchangeDeclareOk
  | ReceiveExchangeDelete
  | ReceiveExchangeDeleteOk
  | ReceiveExchangeBind
  | ReceiveExchangeBindOk
  | ReceiveExchangeUnbind
  | ReceiveExchangeUnbindOk
  | ReceiveQueueDeclare
  | ReceiveQueueDeclareOk
  | ReceiveQueueBind
  | ReceiveQueueBindOk
  | ReceiveQueuePurge
  | ReceiveQueuePurgeOk
  | ReceiveQueueDelete
  | ReceiveQueueDeleteOk
  | ReceiveQueueUnbind
  | ReceiveQueueUnbindOk
  | ReceiveBasicQos
  | ReceiveBasicQosOk
  | ReceiveBasicConsume
  | ReceiveBasicConsumeOk
  | ReceiveBasicCancel
  | ReceiveBasicCancelOk
  | ReceiveBasicPublish
  | ReceiveBasicReturn
  | ReceiveBasicDeliver
  | ReceiveBasicGet
  | ReceiveBasicGetOk
  | ReceiveBasicGetEmpty
  | ReceiveBasicAck
  | ReceiveBasicReject
  | ReceiveBasicRecoverAsync
  | ReceiveBasicRecover
  | ReceiveBasicRecoverOk
  | ReceiveBasicNack
  | ReceiveTxSelect
  | ReceiveTxSelectOk
  | ReceiveTxCommit
  | ReceiveTxCommitOk
  | ReceiveTxRollback
  | ReceiveTxRollbackOk
  | ReceiveConfirmSelect
  | ReceiveConfirmSelectOk;
export type Header =
  | ConnectionHeader
  | ChannelHeader
  | AccessHeader
  | ExchangeHeader
  | QueueHeader
  | BasicHeader
  | TxHeader
  | ConfirmHeader;

function encodeConnectionStart(args: ConnectionStartArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(10));
  w.writeSync(enc.encodeShortUint(10));
  w.writeSync(enc.encodeFields([
    {
      type: "octet" as const,
      value: args.versionMajor !== undefined ? args.versionMajor : 0,
    },
    {
      type: "octet" as const,
      value: args.versionMinor !== undefined ? args.versionMinor : 9,
    },
    { type: "table" as const, value: args.serverProperties },
    {
      type: "longstr" as const,
      value: args.mechanisms !== undefined ? args.mechanisms : "PLAIN",
    },
    {
      type: "longstr" as const,
      value: args.locales !== undefined ? args.locales : "en_US",
    },
  ]));
  return w.bytes();
}

function encodeConnectionStartOk(args: ConnectionStartOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(10));
  w.writeSync(enc.encodeShortUint(11));
  w.writeSync(enc.encodeFields([
    { type: "table" as const, value: args.clientProperties },
    {
      type: "shortstr" as const,
      value: args.mechanism !== undefined ? args.mechanism : "PLAIN",
    },
    { type: "longstr" as const, value: args.response },
    {
      type: "shortstr" as const,
      value: args.locale !== undefined ? args.locale : "en_US",
    },
  ]));
  return w.bytes();
}

function encodeConnectionSecure(args: ConnectionSecureArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(10));
  w.writeSync(enc.encodeShortUint(20));
  w.writeSync(enc.encodeFields([
    { type: "longstr" as const, value: args.challenge },
  ]));
  return w.bytes();
}

function encodeConnectionSecureOk(args: ConnectionSecureOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(10));
  w.writeSync(enc.encodeShortUint(21));
  w.writeSync(enc.encodeFields([
    { type: "longstr" as const, value: args.response },
  ]));
  return w.bytes();
}

function encodeConnectionTune(args: ConnectionTuneArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(10));
  w.writeSync(enc.encodeShortUint(30));
  w.writeSync(enc.encodeFields([
    {
      type: "short" as const,
      value: args.channelMax !== undefined ? args.channelMax : 0,
    },
    {
      type: "long" as const,
      value: args.frameMax !== undefined ? args.frameMax : 0,
    },
    {
      type: "short" as const,
      value: args.heartbeat !== undefined ? args.heartbeat : 0,
    },
  ]));
  return w.bytes();
}

function encodeConnectionTuneOk(args: ConnectionTuneOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(10));
  w.writeSync(enc.encodeShortUint(31));
  w.writeSync(enc.encodeFields([
    {
      type: "short" as const,
      value: args.channelMax !== undefined ? args.channelMax : 0,
    },
    {
      type: "long" as const,
      value: args.frameMax !== undefined ? args.frameMax : 0,
    },
    {
      type: "short" as const,
      value: args.heartbeat !== undefined ? args.heartbeat : 0,
    },
  ]));
  return w.bytes();
}

function encodeConnectionOpen(args: ConnectionOpenArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(10));
  w.writeSync(enc.encodeShortUint(40));
  w.writeSync(enc.encodeFields([
    {
      type: "shortstr" as const,
      value: args.virtualHost !== undefined ? args.virtualHost : "/",
    },
    {
      type: "shortstr" as const,
      value: args.capabilities !== undefined ? args.capabilities : "",
    },
    {
      type: "bit" as const,
      value: args.insist !== undefined ? args.insist : false,
    },
  ]));
  return w.bytes();
}

function encodeConnectionOpenOk(args: ConnectionOpenOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(10));
  w.writeSync(enc.encodeShortUint(41));
  w.writeSync(enc.encodeFields([
    {
      type: "shortstr" as const,
      value: args.knownHosts !== undefined ? args.knownHosts : "",
    },
  ]));
  return w.bytes();
}

function encodeConnectionClose(args: ConnectionCloseArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(10));
  w.writeSync(enc.encodeShortUint(50));
  w.writeSync(enc.encodeFields([
    { type: "short" as const, value: args.replyCode },
    {
      type: "shortstr" as const,
      value: args.replyText !== undefined ? args.replyText : "",
    },
    { type: "short" as const, value: args.classId },
    { type: "short" as const, value: args.methodId },
  ]));
  return w.bytes();
}

function encodeConnectionCloseOk(args: ConnectionCloseOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(10));
  w.writeSync(enc.encodeShortUint(51));
  w.writeSync(enc.encodeFields([]));
  return w.bytes();
}

function encodeConnectionBlocked(args: ConnectionBlockedArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(10));
  w.writeSync(enc.encodeShortUint(60));
  w.writeSync(enc.encodeFields([
    {
      type: "shortstr" as const,
      value: args.reason !== undefined ? args.reason : "",
    },
  ]));
  return w.bytes();
}

function encodeConnectionUnblocked(args: ConnectionUnblockedArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(10));
  w.writeSync(enc.encodeShortUint(61));
  w.writeSync(enc.encodeFields([]));
  return w.bytes();
}

function encodeConnectionUpdateSecret(
  args: ConnectionUpdateSecretArgs,
): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(10));
  w.writeSync(enc.encodeShortUint(70));
  w.writeSync(enc.encodeFields([
    { type: "longstr" as const, value: args.newSecret },
    { type: "shortstr" as const, value: args.reason },
  ]));
  return w.bytes();
}

function encodeConnectionUpdateSecretOk(
  args: ConnectionUpdateSecretOkArgs,
): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(10));
  w.writeSync(enc.encodeShortUint(71));
  w.writeSync(enc.encodeFields([]));
  return w.bytes();
}

function encodeChannelOpen(args: ChannelOpenArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(20));
  w.writeSync(enc.encodeShortUint(10));
  w.writeSync(enc.encodeFields([
    {
      type: "shortstr" as const,
      value: args.outOfBand !== undefined ? args.outOfBand : "",
    },
  ]));
  return w.bytes();
}

function encodeChannelOpenOk(args: ChannelOpenOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(20));
  w.writeSync(enc.encodeShortUint(11));
  w.writeSync(enc.encodeFields([
    {
      type: "longstr" as const,
      value: args.channelId !== undefined ? args.channelId : "",
    },
  ]));
  return w.bytes();
}

function encodeChannelFlow(args: ChannelFlowArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(20));
  w.writeSync(enc.encodeShortUint(20));
  w.writeSync(enc.encodeFields([
    { type: "bit" as const, value: args.active },
  ]));
  return w.bytes();
}

function encodeChannelFlowOk(args: ChannelFlowOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(20));
  w.writeSync(enc.encodeShortUint(21));
  w.writeSync(enc.encodeFields([
    { type: "bit" as const, value: args.active },
  ]));
  return w.bytes();
}

function encodeChannelClose(args: ChannelCloseArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(20));
  w.writeSync(enc.encodeShortUint(40));
  w.writeSync(enc.encodeFields([
    { type: "short" as const, value: args.replyCode },
    {
      type: "shortstr" as const,
      value: args.replyText !== undefined ? args.replyText : "",
    },
    { type: "short" as const, value: args.classId },
    { type: "short" as const, value: args.methodId },
  ]));
  return w.bytes();
}

function encodeChannelCloseOk(args: ChannelCloseOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(20));
  w.writeSync(enc.encodeShortUint(41));
  w.writeSync(enc.encodeFields([]));
  return w.bytes();
}

function encodeAccessRequest(args: AccessRequestArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(30));
  w.writeSync(enc.encodeShortUint(10));
  w.writeSync(enc.encodeFields([
    {
      type: "shortstr" as const,
      value: args.realm !== undefined ? args.realm : "/data",
    },
    {
      type: "bit" as const,
      value: args.exclusive !== undefined ? args.exclusive : false,
    },
    {
      type: "bit" as const,
      value: args.passive !== undefined ? args.passive : true,
    },
    {
      type: "bit" as const,
      value: args.active !== undefined ? args.active : true,
    },
    {
      type: "bit" as const,
      value: args.write !== undefined ? args.write : true,
    },
    { type: "bit" as const, value: args.read !== undefined ? args.read : true },
  ]));
  return w.bytes();
}

function encodeAccessRequestOk(args: AccessRequestOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(30));
  w.writeSync(enc.encodeShortUint(11));
  w.writeSync(enc.encodeFields([
    {
      type: "short" as const,
      value: args.ticket !== undefined ? args.ticket : 1,
    },
  ]));
  return w.bytes();
}

function encodeExchangeDeclare(args: ExchangeDeclareArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(40));
  w.writeSync(enc.encodeShortUint(10));
  w.writeSync(enc.encodeFields([
    {
      type: "short" as const,
      value: args.ticket !== undefined ? args.ticket : 0,
    },
    { type: "shortstr" as const, value: args.exchange },
    {
      type: "shortstr" as const,
      value: args.type !== undefined ? args.type : "direct",
    },
    {
      type: "bit" as const,
      value: args.passive !== undefined ? args.passive : false,
    },
    {
      type: "bit" as const,
      value: args.durable !== undefined ? args.durable : false,
    },
    {
      type: "bit" as const,
      value: args.autoDelete !== undefined ? args.autoDelete : false,
    },
    {
      type: "bit" as const,
      value: args.internal !== undefined ? args.internal : false,
    },
    {
      type: "bit" as const,
      value: args.nowait !== undefined ? args.nowait : false,
    },
    {
      type: "table" as const,
      value: args.arguments !== undefined ? args.arguments : {},
    },
  ]));
  return w.bytes();
}

function encodeExchangeDeclareOk(args: ExchangeDeclareOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(40));
  w.writeSync(enc.encodeShortUint(11));
  w.writeSync(enc.encodeFields([]));
  return w.bytes();
}

function encodeExchangeDelete(args: ExchangeDeleteArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(40));
  w.writeSync(enc.encodeShortUint(20));
  w.writeSync(enc.encodeFields([
    {
      type: "short" as const,
      value: args.ticket !== undefined ? args.ticket : 0,
    },
    { type: "shortstr" as const, value: args.exchange },
    {
      type: "bit" as const,
      value: args.ifUnused !== undefined ? args.ifUnused : false,
    },
    {
      type: "bit" as const,
      value: args.nowait !== undefined ? args.nowait : false,
    },
  ]));
  return w.bytes();
}

function encodeExchangeDeleteOk(args: ExchangeDeleteOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(40));
  w.writeSync(enc.encodeShortUint(21));
  w.writeSync(enc.encodeFields([]));
  return w.bytes();
}

function encodeExchangeBind(args: ExchangeBindArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(40));
  w.writeSync(enc.encodeShortUint(30));
  w.writeSync(enc.encodeFields([
    {
      type: "short" as const,
      value: args.ticket !== undefined ? args.ticket : 0,
    },
    { type: "shortstr" as const, value: args.destination },
    { type: "shortstr" as const, value: args.source },
    {
      type: "shortstr" as const,
      value: args.routingKey !== undefined ? args.routingKey : "",
    },
    {
      type: "bit" as const,
      value: args.nowait !== undefined ? args.nowait : false,
    },
    {
      type: "table" as const,
      value: args.arguments !== undefined ? args.arguments : {},
    },
  ]));
  return w.bytes();
}

function encodeExchangeBindOk(args: ExchangeBindOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(40));
  w.writeSync(enc.encodeShortUint(31));
  w.writeSync(enc.encodeFields([]));
  return w.bytes();
}

function encodeExchangeUnbind(args: ExchangeUnbindArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(40));
  w.writeSync(enc.encodeShortUint(40));
  w.writeSync(enc.encodeFields([
    {
      type: "short" as const,
      value: args.ticket !== undefined ? args.ticket : 0,
    },
    { type: "shortstr" as const, value: args.destination },
    { type: "shortstr" as const, value: args.source },
    {
      type: "shortstr" as const,
      value: args.routingKey !== undefined ? args.routingKey : "",
    },
    {
      type: "bit" as const,
      value: args.nowait !== undefined ? args.nowait : false,
    },
    {
      type: "table" as const,
      value: args.arguments !== undefined ? args.arguments : {},
    },
  ]));
  return w.bytes();
}

function encodeExchangeUnbindOk(args: ExchangeUnbindOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(40));
  w.writeSync(enc.encodeShortUint(51));
  w.writeSync(enc.encodeFields([]));
  return w.bytes();
}

function encodeQueueDeclare(args: QueueDeclareArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(50));
  w.writeSync(enc.encodeShortUint(10));
  w.writeSync(enc.encodeFields([
    {
      type: "short" as const,
      value: args.ticket !== undefined ? args.ticket : 0,
    },
    {
      type: "shortstr" as const,
      value: args.queue !== undefined ? args.queue : "",
    },
    {
      type: "bit" as const,
      value: args.passive !== undefined ? args.passive : false,
    },
    {
      type: "bit" as const,
      value: args.durable !== undefined ? args.durable : false,
    },
    {
      type: "bit" as const,
      value: args.exclusive !== undefined ? args.exclusive : false,
    },
    {
      type: "bit" as const,
      value: args.autoDelete !== undefined ? args.autoDelete : false,
    },
    {
      type: "bit" as const,
      value: args.nowait !== undefined ? args.nowait : false,
    },
    {
      type: "table" as const,
      value: args.arguments !== undefined ? args.arguments : {},
    },
  ]));
  return w.bytes();
}

function encodeQueueDeclareOk(args: QueueDeclareOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(50));
  w.writeSync(enc.encodeShortUint(11));
  w.writeSync(enc.encodeFields([
    { type: "shortstr" as const, value: args.queue },
    { type: "long" as const, value: args.messageCount },
    { type: "long" as const, value: args.consumerCount },
  ]));
  return w.bytes();
}

function encodeQueueBind(args: QueueBindArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(50));
  w.writeSync(enc.encodeShortUint(20));
  w.writeSync(enc.encodeFields([
    {
      type: "short" as const,
      value: args.ticket !== undefined ? args.ticket : 0,
    },
    {
      type: "shortstr" as const,
      value: args.queue !== undefined ? args.queue : "",
    },
    { type: "shortstr" as const, value: args.exchange },
    {
      type: "shortstr" as const,
      value: args.routingKey !== undefined ? args.routingKey : "",
    },
    {
      type: "bit" as const,
      value: args.nowait !== undefined ? args.nowait : false,
    },
    {
      type: "table" as const,
      value: args.arguments !== undefined ? args.arguments : {},
    },
  ]));
  return w.bytes();
}

function encodeQueueBindOk(args: QueueBindOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(50));
  w.writeSync(enc.encodeShortUint(21));
  w.writeSync(enc.encodeFields([]));
  return w.bytes();
}

function encodeQueuePurge(args: QueuePurgeArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(50));
  w.writeSync(enc.encodeShortUint(30));
  w.writeSync(enc.encodeFields([
    {
      type: "short" as const,
      value: args.ticket !== undefined ? args.ticket : 0,
    },
    {
      type: "shortstr" as const,
      value: args.queue !== undefined ? args.queue : "",
    },
    {
      type: "bit" as const,
      value: args.nowait !== undefined ? args.nowait : false,
    },
  ]));
  return w.bytes();
}

function encodeQueuePurgeOk(args: QueuePurgeOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(50));
  w.writeSync(enc.encodeShortUint(31));
  w.writeSync(enc.encodeFields([
    { type: "long" as const, value: args.messageCount },
  ]));
  return w.bytes();
}

function encodeQueueDelete(args: QueueDeleteArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(50));
  w.writeSync(enc.encodeShortUint(40));
  w.writeSync(enc.encodeFields([
    {
      type: "short" as const,
      value: args.ticket !== undefined ? args.ticket : 0,
    },
    {
      type: "shortstr" as const,
      value: args.queue !== undefined ? args.queue : "",
    },
    {
      type: "bit" as const,
      value: args.ifUnused !== undefined ? args.ifUnused : false,
    },
    {
      type: "bit" as const,
      value: args.ifEmpty !== undefined ? args.ifEmpty : false,
    },
    {
      type: "bit" as const,
      value: args.nowait !== undefined ? args.nowait : false,
    },
  ]));
  return w.bytes();
}

function encodeQueueDeleteOk(args: QueueDeleteOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(50));
  w.writeSync(enc.encodeShortUint(41));
  w.writeSync(enc.encodeFields([
    { type: "long" as const, value: args.messageCount },
  ]));
  return w.bytes();
}

function encodeQueueUnbind(args: QueueUnbindArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(50));
  w.writeSync(enc.encodeShortUint(50));
  w.writeSync(enc.encodeFields([
    {
      type: "short" as const,
      value: args.ticket !== undefined ? args.ticket : 0,
    },
    {
      type: "shortstr" as const,
      value: args.queue !== undefined ? args.queue : "",
    },
    { type: "shortstr" as const, value: args.exchange },
    {
      type: "shortstr" as const,
      value: args.routingKey !== undefined ? args.routingKey : "",
    },
    {
      type: "table" as const,
      value: args.arguments !== undefined ? args.arguments : {},
    },
  ]));
  return w.bytes();
}

function encodeQueueUnbindOk(args: QueueUnbindOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(50));
  w.writeSync(enc.encodeShortUint(51));
  w.writeSync(enc.encodeFields([]));
  return w.bytes();
}

function encodeBasicQos(args: BasicQosArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(60));
  w.writeSync(enc.encodeShortUint(10));
  w.writeSync(enc.encodeFields([
    {
      type: "long" as const,
      value: args.prefetchSize !== undefined ? args.prefetchSize : 0,
    },
    {
      type: "short" as const,
      value: args.prefetchCount !== undefined ? args.prefetchCount : 0,
    },
    {
      type: "bit" as const,
      value: args.global !== undefined ? args.global : false,
    },
  ]));
  return w.bytes();
}

function encodeBasicQosOk(args: BasicQosOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(60));
  w.writeSync(enc.encodeShortUint(11));
  w.writeSync(enc.encodeFields([]));
  return w.bytes();
}

function encodeBasicConsume(args: BasicConsumeArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(60));
  w.writeSync(enc.encodeShortUint(20));
  w.writeSync(enc.encodeFields([
    {
      type: "short" as const,
      value: args.ticket !== undefined ? args.ticket : 0,
    },
    {
      type: "shortstr" as const,
      value: args.queue !== undefined ? args.queue : "",
    },
    {
      type: "shortstr" as const,
      value: args.consumerTag !== undefined ? args.consumerTag : "",
    },
    {
      type: "bit" as const,
      value: args.noLocal !== undefined ? args.noLocal : false,
    },
    {
      type: "bit" as const,
      value: args.noAck !== undefined ? args.noAck : false,
    },
    {
      type: "bit" as const,
      value: args.exclusive !== undefined ? args.exclusive : false,
    },
    {
      type: "bit" as const,
      value: args.nowait !== undefined ? args.nowait : false,
    },
    {
      type: "table" as const,
      value: args.arguments !== undefined ? args.arguments : {},
    },
  ]));
  return w.bytes();
}

function encodeBasicConsumeOk(args: BasicConsumeOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(60));
  w.writeSync(enc.encodeShortUint(21));
  w.writeSync(enc.encodeFields([
    { type: "shortstr" as const, value: args.consumerTag },
  ]));
  return w.bytes();
}

function encodeBasicCancel(args: BasicCancelArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(60));
  w.writeSync(enc.encodeShortUint(30));
  w.writeSync(enc.encodeFields([
    { type: "shortstr" as const, value: args.consumerTag },
    {
      type: "bit" as const,
      value: args.nowait !== undefined ? args.nowait : false,
    },
  ]));
  return w.bytes();
}

function encodeBasicCancelOk(args: BasicCancelOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(60));
  w.writeSync(enc.encodeShortUint(31));
  w.writeSync(enc.encodeFields([
    { type: "shortstr" as const, value: args.consumerTag },
  ]));
  return w.bytes();
}

function encodeBasicPublish(args: BasicPublishArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(60));
  w.writeSync(enc.encodeShortUint(40));
  w.writeSync(enc.encodeFields([
    {
      type: "short" as const,
      value: args.ticket !== undefined ? args.ticket : 0,
    },
    {
      type: "shortstr" as const,
      value: args.exchange !== undefined ? args.exchange : "",
    },
    {
      type: "shortstr" as const,
      value: args.routingKey !== undefined ? args.routingKey : "",
    },
    {
      type: "bit" as const,
      value: args.mandatory !== undefined ? args.mandatory : false,
    },
    {
      type: "bit" as const,
      value: args.immediate !== undefined ? args.immediate : false,
    },
  ]));
  return w.bytes();
}

function encodeBasicReturn(args: BasicReturnArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(60));
  w.writeSync(enc.encodeShortUint(50));
  w.writeSync(enc.encodeFields([
    { type: "short" as const, value: args.replyCode },
    {
      type: "shortstr" as const,
      value: args.replyText !== undefined ? args.replyText : "",
    },
    { type: "shortstr" as const, value: args.exchange },
    { type: "shortstr" as const, value: args.routingKey },
  ]));
  return w.bytes();
}

function encodeBasicDeliver(args: BasicDeliverArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(60));
  w.writeSync(enc.encodeShortUint(60));
  w.writeSync(enc.encodeFields([
    { type: "shortstr" as const, value: args.consumerTag },
    { type: "longlong" as const, value: BigInt(args.deliveryTag) },
    {
      type: "bit" as const,
      value: args.redelivered !== undefined ? args.redelivered : false,
    },
    { type: "shortstr" as const, value: args.exchange },
    { type: "shortstr" as const, value: args.routingKey },
  ]));
  return w.bytes();
}

function encodeBasicGet(args: BasicGetArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(60));
  w.writeSync(enc.encodeShortUint(70));
  w.writeSync(enc.encodeFields([
    {
      type: "short" as const,
      value: args.ticket !== undefined ? args.ticket : 0,
    },
    {
      type: "shortstr" as const,
      value: args.queue !== undefined ? args.queue : "",
    },
    {
      type: "bit" as const,
      value: args.noAck !== undefined ? args.noAck : false,
    },
  ]));
  return w.bytes();
}

function encodeBasicGetOk(args: BasicGetOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(60));
  w.writeSync(enc.encodeShortUint(71));
  w.writeSync(enc.encodeFields([
    { type: "longlong" as const, value: BigInt(args.deliveryTag) },
    {
      type: "bit" as const,
      value: args.redelivered !== undefined ? args.redelivered : false,
    },
    { type: "shortstr" as const, value: args.exchange },
    { type: "shortstr" as const, value: args.routingKey },
    { type: "long" as const, value: args.messageCount },
  ]));
  return w.bytes();
}

function encodeBasicGetEmpty(args: BasicGetEmptyArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(60));
  w.writeSync(enc.encodeShortUint(72));
  w.writeSync(enc.encodeFields([
    {
      type: "shortstr" as const,
      value: args.clusterId !== undefined ? args.clusterId : "",
    },
  ]));
  return w.bytes();
}

function encodeBasicAck(args: BasicAckArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(60));
  w.writeSync(enc.encodeShortUint(80));
  w.writeSync(enc.encodeFields([
    {
      type: "longlong" as const,
      value: BigInt(args.deliveryTag !== undefined ? args.deliveryTag : 0),
    },
    {
      type: "bit" as const,
      value: args.multiple !== undefined ? args.multiple : false,
    },
  ]));
  return w.bytes();
}

function encodeBasicReject(args: BasicRejectArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(60));
  w.writeSync(enc.encodeShortUint(90));
  w.writeSync(enc.encodeFields([
    { type: "longlong" as const, value: BigInt(args.deliveryTag) },
    {
      type: "bit" as const,
      value: args.requeue !== undefined ? args.requeue : true,
    },
  ]));
  return w.bytes();
}

function encodeBasicRecoverAsync(args: BasicRecoverAsyncArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(60));
  w.writeSync(enc.encodeShortUint(100));
  w.writeSync(enc.encodeFields([
    {
      type: "bit" as const,
      value: args.requeue !== undefined ? args.requeue : false,
    },
  ]));
  return w.bytes();
}

function encodeBasicRecover(args: BasicRecoverArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(60));
  w.writeSync(enc.encodeShortUint(110));
  w.writeSync(enc.encodeFields([
    {
      type: "bit" as const,
      value: args.requeue !== undefined ? args.requeue : false,
    },
  ]));
  return w.bytes();
}

function encodeBasicRecoverOk(args: BasicRecoverOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(60));
  w.writeSync(enc.encodeShortUint(111));
  w.writeSync(enc.encodeFields([]));
  return w.bytes();
}

function encodeBasicNack(args: BasicNackArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(60));
  w.writeSync(enc.encodeShortUint(120));
  w.writeSync(enc.encodeFields([
    {
      type: "longlong" as const,
      value: BigInt(args.deliveryTag !== undefined ? args.deliveryTag : 0),
    },
    {
      type: "bit" as const,
      value: args.multiple !== undefined ? args.multiple : false,
    },
    {
      type: "bit" as const,
      value: args.requeue !== undefined ? args.requeue : true,
    },
  ]));
  return w.bytes();
}

function encodeTxSelect(args: TxSelectArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(90));
  w.writeSync(enc.encodeShortUint(10));
  w.writeSync(enc.encodeFields([]));
  return w.bytes();
}

function encodeTxSelectOk(args: TxSelectOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(90));
  w.writeSync(enc.encodeShortUint(11));
  w.writeSync(enc.encodeFields([]));
  return w.bytes();
}

function encodeTxCommit(args: TxCommitArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(90));
  w.writeSync(enc.encodeShortUint(20));
  w.writeSync(enc.encodeFields([]));
  return w.bytes();
}

function encodeTxCommitOk(args: TxCommitOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(90));
  w.writeSync(enc.encodeShortUint(21));
  w.writeSync(enc.encodeFields([]));
  return w.bytes();
}

function encodeTxRollback(args: TxRollbackArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(90));
  w.writeSync(enc.encodeShortUint(30));
  w.writeSync(enc.encodeFields([]));
  return w.bytes();
}

function encodeTxRollbackOk(args: TxRollbackOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(90));
  w.writeSync(enc.encodeShortUint(31));
  w.writeSync(enc.encodeFields([]));
  return w.bytes();
}

function encodeConfirmSelect(args: ConfirmSelectArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(85));
  w.writeSync(enc.encodeShortUint(10));
  w.writeSync(enc.encodeFields([
    {
      type: "bit" as const,
      value: args.nowait !== undefined ? args.nowait : false,
    },
  ]));
  return w.bytes();
}

function encodeConfirmSelectOk(args: ConfirmSelectOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(85));
  w.writeSync(enc.encodeShortUint(11));
  w.writeSync(enc.encodeFields([]));
  return w.bytes();
}

function decodeConnectionStart(r: Deno.SyncReader): ConnectionStart {
  const fields = enc.decodeFields(
    r,
    ["octet", "octet", "table", "longstr", "longstr"],
  );
  const args = {
    versionMajor: fields[0] as number,
    versionMinor: fields[1] as number,
    serverProperties: fields[2] as Record<string, unknown>,
    mechanisms: fields[3] as string,
    locales: fields[4] as string,
  };
  return args;
}

function decodeConnectionStartOk(r: Deno.SyncReader): ConnectionStartOk {
  const fields = enc.decodeFields(
    r,
    ["table", "shortstr", "longstr", "shortstr"],
  );
  const args = {
    clientProperties: fields[0] as Record<string, unknown>,
    mechanism: fields[1] as string,
    response: fields[2] as string,
    locale: fields[3] as string,
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
    heartbeat: fields[2] as number,
  };
  return args;
}

function decodeConnectionTuneOk(r: Deno.SyncReader): ConnectionTuneOk {
  const fields = enc.decodeFields(r, ["short", "long", "short"]);
  const args = {
    channelMax: fields[0] as number,
    frameMax: fields[1] as number,
    heartbeat: fields[2] as number,
  };
  return args;
}

function decodeConnectionOpen(r: Deno.SyncReader): ConnectionOpen {
  const fields = enc.decodeFields(r, ["shortstr", "shortstr", "bit"]);
  const args = {
    virtualHost: fields[0] as string,
    capabilities: fields[1] as string,
    insist: fields[2] as boolean,
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
    methodId: fields[3] as number,
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
  r: Deno.SyncReader,
): ConnectionUpdateSecret {
  const fields = enc.decodeFields(r, ["longstr", "shortstr"]);
  const args = { newSecret: fields[0] as string, reason: fields[1] as string };
  return args;
}

function decodeConnectionUpdateSecretOk(
  r: Deno.SyncReader,
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
    methodId: fields[3] as number,
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
    ["shortstr", "bit", "bit", "bit", "bit", "bit"],
  );
  const args = {
    realm: fields[0] as string,
    exclusive: fields[1] as boolean,
    passive: fields[2] as boolean,
    active: fields[3] as boolean,
    write: fields[4] as boolean,
    read: fields[5] as boolean,
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
      "table",
    ],
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
    arguments: fields[8] as Record<string, unknown>,
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
    nowait: fields[3] as boolean,
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
    ["short", "shortstr", "shortstr", "shortstr", "bit", "table"],
  );
  const args = {
    ticket: fields[0] as number,
    destination: fields[1] as string,
    source: fields[2] as string,
    routingKey: fields[3] as string,
    nowait: fields[4] as boolean,
    arguments: fields[5] as Record<string, unknown>,
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
    ["short", "shortstr", "shortstr", "shortstr", "bit", "table"],
  );
  const args = {
    ticket: fields[0] as number,
    destination: fields[1] as string,
    source: fields[2] as string,
    routingKey: fields[3] as string,
    nowait: fields[4] as boolean,
    arguments: fields[5] as Record<string, unknown>,
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
    ["short", "shortstr", "bit", "bit", "bit", "bit", "bit", "table"],
  );
  const args = {
    ticket: fields[0] as number,
    queue: fields[1] as string,
    passive: fields[2] as boolean,
    durable: fields[3] as boolean,
    exclusive: fields[4] as boolean,
    autoDelete: fields[5] as boolean,
    nowait: fields[6] as boolean,
    arguments: fields[7] as Record<string, unknown>,
  };
  return args;
}

function decodeQueueDeclareOk(r: Deno.SyncReader): QueueDeclareOk {
  const fields = enc.decodeFields(r, ["shortstr", "long", "long"]);
  const args = {
    queue: fields[0] as string,
    messageCount: fields[1] as number,
    consumerCount: fields[2] as number,
  };
  return args;
}

function decodeQueueBind(r: Deno.SyncReader): QueueBind {
  const fields = enc.decodeFields(
    r,
    ["short", "shortstr", "shortstr", "shortstr", "bit", "table"],
  );
  const args = {
    ticket: fields[0] as number,
    queue: fields[1] as string,
    exchange: fields[2] as string,
    routingKey: fields[3] as string,
    nowait: fields[4] as boolean,
    arguments: fields[5] as Record<string, unknown>,
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
    nowait: fields[2] as boolean,
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
    ["short", "shortstr", "bit", "bit", "bit"],
  );
  const args = {
    ticket: fields[0] as number,
    queue: fields[1] as string,
    ifUnused: fields[2] as boolean,
    ifEmpty: fields[3] as boolean,
    nowait: fields[4] as boolean,
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
    ["short", "shortstr", "shortstr", "shortstr", "table"],
  );
  const args = {
    ticket: fields[0] as number,
    queue: fields[1] as string,
    exchange: fields[2] as string,
    routingKey: fields[3] as string,
    arguments: fields[4] as Record<string, unknown>,
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
    global: fields[2] as boolean,
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
    ["short", "shortstr", "shortstr", "bit", "bit", "bit", "bit", "table"],
  );
  const args = {
    ticket: fields[0] as number,
    queue: fields[1] as string,
    consumerTag: fields[2] as string,
    noLocal: fields[3] as boolean,
    noAck: fields[4] as boolean,
    exclusive: fields[5] as boolean,
    nowait: fields[6] as boolean,
    arguments: fields[7] as Record<string, unknown>,
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
    nowait: fields[1] as boolean,
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
    ["short", "shortstr", "shortstr", "bit", "bit"],
  );
  const args = {
    ticket: fields[0] as number,
    exchange: fields[1] as string,
    routingKey: fields[2] as string,
    mandatory: fields[3] as boolean,
    immediate: fields[4] as boolean,
  };
  return args;
}

function decodeBasicReturn(r: Deno.SyncReader): BasicReturn {
  const fields = enc.decodeFields(
    r,
    ["short", "shortstr", "shortstr", "shortstr"],
  );
  const args = {
    replyCode: fields[0] as number,
    replyText: fields[1] as string,
    exchange: fields[2] as string,
    routingKey: fields[3] as string,
  };
  return args;
}

function decodeBasicDeliver(r: Deno.SyncReader): BasicDeliver {
  const fields = enc.decodeFields(
    r,
    ["shortstr", "longlong", "bit", "shortstr", "shortstr"],
  );
  const args = {
    consumerTag: fields[0] as string,
    deliveryTag: Number(fields[1]),
    redelivered: fields[2] as boolean,
    exchange: fields[3] as string,
    routingKey: fields[4] as string,
  };
  return args;
}

function decodeBasicGet(r: Deno.SyncReader): BasicGet {
  const fields = enc.decodeFields(r, ["short", "shortstr", "bit"]);
  const args = {
    ticket: fields[0] as number,
    queue: fields[1] as string,
    noAck: fields[2] as boolean,
  };
  return args;
}

function decodeBasicGetOk(r: Deno.SyncReader): BasicGetOk {
  const fields = enc.decodeFields(
    r,
    ["longlong", "bit", "shortstr", "shortstr", "long"],
  );
  const args = {
    deliveryTag: Number(fields[0]),
    redelivered: fields[1] as boolean,
    exchange: fields[2] as string,
    routingKey: fields[3] as string,
    messageCount: fields[4] as number,
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
    deliveryTag: Number(fields[0]),
    multiple: fields[1] as boolean,
  };
  return args;
}

function decodeBasicReject(r: Deno.SyncReader): BasicReject {
  const fields = enc.decodeFields(r, ["longlong", "bit"]);
  const args = {
    deliveryTag: Number(fields[0]),
    requeue: fields[1] as boolean,
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
    deliveryTag: Number(fields[0]),
    multiple: fields[1] as boolean,
    requeue: fields[2] as boolean,
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

function decodeMethod(data: Uint8Array): ReceiveMethod {
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
          return { classId, methodId, args: decodeConnectionUpdateSecretOk(r) };
        default:
          throw new Error(
            "Unknown method " + methodId + " for class 'connection'",
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
            "Unknown method " + methodId + " for class 'channel'",
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
          throw new Error("Unknown method " + methodId + " for class 'access'");
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
            "Unknown method " + methodId + " for class 'exchange'",
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
            "Unknown method " + methodId + " for class 'confirm'",
          );
      }
    }

    default:
      throw new Error("Unknown class " + classId);
  }
}

function encodeConnectionHeader(
  size: bigint,
  props: ConnectionProperties,
): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(10));
  w.writeSync(enc.encodeShortUint(0));
  w.writeSync(enc.encodeLongLongUint(size));
  w.writeSync(enc.encodeOptionalFields([]));
  return w.bytes();
}

function encodeChannelHeader(
  size: bigint,
  props: ChannelProperties,
): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(20));
  w.writeSync(enc.encodeShortUint(0));
  w.writeSync(enc.encodeLongLongUint(size));
  w.writeSync(enc.encodeOptionalFields([]));
  return w.bytes();
}

function encodeAccessHeader(size: bigint, props: AccessProperties): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(30));
  w.writeSync(enc.encodeShortUint(0));
  w.writeSync(enc.encodeLongLongUint(size));
  w.writeSync(enc.encodeOptionalFields([]));
  return w.bytes();
}

function encodeExchangeHeader(
  size: bigint,
  props: ExchangeProperties,
): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(40));
  w.writeSync(enc.encodeShortUint(0));
  w.writeSync(enc.encodeLongLongUint(size));
  w.writeSync(enc.encodeOptionalFields([]));
  return w.bytes();
}

function encodeQueueHeader(size: bigint, props: QueueProperties): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(50));
  w.writeSync(enc.encodeShortUint(0));
  w.writeSync(enc.encodeLongLongUint(size));
  w.writeSync(enc.encodeOptionalFields([]));
  return w.bytes();
}

function encodeBasicHeader(size: bigint, props: BasicProperties): Uint8Array {
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
    {
      type: "timestamp",
      value: props.timestamp !== undefined
        ? BigInt(props.timestamp)
        : undefined,
    },
    { type: "shortstr", value: props.type },
    { type: "shortstr", value: props.userId },
    { type: "shortstr", value: props.appId },
    { type: "shortstr", value: props.clusterId },
  ]));
  return w.bytes();
}

function encodeTxHeader(size: bigint, props: TxProperties): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(90));
  w.writeSync(enc.encodeShortUint(0));
  w.writeSync(enc.encodeLongLongUint(size));
  w.writeSync(enc.encodeOptionalFields([]));
  return w.bytes();
}

function encodeConfirmHeader(
  size: bigint,
  props: ConfirmProperties,
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
  const size = Number(enc.decodeLongLongUint(r));
  const fields = enc.decodeOptionalFields(r, []);
  const props = {};

  return { classId: 10, size, props };
}

function decodeChannelHeader(r: Deno.SyncReader): ChannelHeader {
  const weight = enc.decodeShortUint(r);
  const size = Number(enc.decodeLongLongUint(r));
  const fields = enc.decodeOptionalFields(r, []);
  const props = {};

  return { classId: 20, size, props };
}

function decodeAccessHeader(r: Deno.SyncReader): AccessHeader {
  const weight = enc.decodeShortUint(r);
  const size = Number(enc.decodeLongLongUint(r));
  const fields = enc.decodeOptionalFields(r, []);
  const props = {};

  return { classId: 30, size, props };
}

function decodeExchangeHeader(r: Deno.SyncReader): ExchangeHeader {
  const weight = enc.decodeShortUint(r);
  const size = Number(enc.decodeLongLongUint(r));
  const fields = enc.decodeOptionalFields(r, []);
  const props = {};

  return { classId: 40, size, props };
}

function decodeQueueHeader(r: Deno.SyncReader): QueueHeader {
  const weight = enc.decodeShortUint(r);
  const size = Number(enc.decodeLongLongUint(r));
  const fields = enc.decodeOptionalFields(r, []);
  const props = {};

  return { classId: 50, size, props };
}

function decodeBasicHeader(r: Deno.SyncReader): BasicHeader {
  const weight = enc.decodeShortUint(r);
  const size = Number(enc.decodeLongLongUint(r));
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
      "shortstr",
    ],
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
    timestamp: fields[9] as number,
    type: fields[10] as string,
    userId: fields[11] as string,
    appId: fields[12] as string,
    clusterId: fields[13] as string,
  };

  return { classId: 60, size, props };
}

function decodeTxHeader(r: Deno.SyncReader): TxHeader {
  const weight = enc.decodeShortUint(r);
  const size = Number(enc.decodeLongLongUint(r));
  const fields = enc.decodeOptionalFields(r, []);
  const props = {};

  return { classId: 90, size, props };
}

function decodeConfirmHeader(r: Deno.SyncReader): ConfirmHeader {
  const weight = enc.decodeShortUint(r);
  const size = Number(enc.decodeLongLongUint(r));
  const fields = enc.decodeOptionalFields(r, []);
  const props = {};

  return { classId: 85, size, props };
}

function decodeHeader(data: Uint8Array): Header {
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

interface Frame {
  channel: number;
  type: number;
  payload: Uint8Array;
}

interface Socket {
  write(frame: Frame): Promise<void>;
  read(): Promise<Frame>;
}

interface MethodSubscriber<T extends number, U extends number> {
  channel: number;
  classId: T;
  methodId: U;
  maxCount: number;
  count: number;
  handler: (m: ExtractArgs<T, U>) => void;
  error: (e: Error) => void;
}

interface HeaderReceiver<T extends number> {
  channel: number;
  classId: T;
  handler: (h: Extract<Header, { classId: T }>) => void;
  error: (e: Error) => void;
}

interface ContentSubscriber {
  channel: number;
  handler: (data: Uint8Array) => void;
  error: (e: Error) => void;
}

type ExtractMethod<T extends number, U extends number> = Extract<
  ReceiveMethod,
  { classId: T; methodId: U }
>;
type ExtractArgs<T extends number, U extends number> = ExtractMethod<
  T,
  U
>["args"];

function serializeChannelError(channel: number, args: ChannelClose) {
  return `Channel ${channel} closed by server - ${args.replyCode} ${args
    .replyText || ""}`;
}

function serializeConnectionError(args: ConnectionClose) {
  return `Connection closed by server - ${args.replyCode} ${args
    .replyText || ""}`;
}

export class AmqpProtocol {
  private methodSubscribers: MethodSubscriber<any, any>[] = [];
  private contentSubscribers: ContentSubscriber[] = [];
  private headerReceivers: HeaderReceiver<any>[] = [];

  constructor(private socket: Socket) {
    this.listen();
  }

  private async listen() {
    while (true) {
      try {
        const frame = await this.socket.read();
        if (frame.type === 1) {
          this.emitMethod(frame.channel, decodeMethod(frame.payload));
        } else if (frame.type === 2) {
          this.emitHeader(frame.channel, decodeHeader(frame.payload));
        } else if (frame.type === 3) {
          this.emitContent(frame.channel, frame.payload);
        }
      } catch (err) {
        this.emitConnectionError(err);
        return;
      }
    }
  }

  private unsubscribeMethod(sub: MethodSubscriber<any, any>) {
    const index = this.methodSubscribers.indexOf(sub);
    if (index !== -1) {
      this.methodSubscribers.splice(index, index + 1);
    }
  }

  private unsubscribeHeader(sub: HeaderReceiver<any>) {
    const index = this.headerReceivers.indexOf(sub);
    if (index !== -1) {
      this.headerReceivers.splice(index, index + 1);
    }
  }

  private emitMethod(channel: number, method: ReceiveMethod) {
    const subscribers = [...this.methodSubscribers];
    subscribers.forEach((sub, index, self) => {
      if (
        channel === sub.channel && method.classId === sub.classId &&
        method.methodId === sub.methodId
      ) {
        sub.count++;
        if (sub.maxCount > 0 && sub.count >= sub.maxCount) {
          this.unsubscribeMethod(sub);
        }
        return sub.handler(method.args);
      }

      if (
        method.classId === CONNECTION && method.methodId === CONNECTION_CLOSE
      ) {
        this.unsubscribeMethod(sub);
        return sub.error(
          new Error(serializeConnectionError(method.args)),
        );
      }

      if (
        channel === sub.channel && method.classId === CHANNEL &&
        method.methodId === CHANNEL_CLOSE
      ) {
        this.unsubscribeMethod(sub);
        sub.error(
          new Error(serializeChannelError(channel, method.args)),
        );
      }
    });
  }

  private emitConnectionError(error: Error) {
    this.methodSubscribers.forEach((sub) => sub.error(error));
    this.headerReceivers.forEach((sub) => sub.error(error));
  }

  private emitHeader(channel: number, header: Header) {
    const receivers = [...this.headerReceivers];
    receivers.forEach((sub) => {
      if (sub.channel === channel && sub.classId === header.classId) {
        this.unsubscribeHeader(sub);
        sub.handler(header);
      }
    });
  }

  private emitContent(channel: number, data: Uint8Array) {
    const subscribers = [...this.contentSubscribers];
    subscribers.forEach((sub) => {
      if (sub.channel === channel) {
        sub.handler(data);
      }
    });
  }

  private subscribeContent(
    channel: number,
    handler: (data: Uint8Array) => void,
    onError: (error: Error) => void,
  ) {
    const sub: ContentSubscriber = { channel, handler, error: onError };
    this.contentSubscribers.push(sub);
    return () => this.unsubscribeContent(sub);
  }

  private unsubscribeContent(sub: ContentSubscriber) {
    const index = this.contentSubscribers.indexOf(sub);
    if (index !== -1) {
      this.contentSubscribers.splice(index, index + 1);
    }
  }

  private subscribeMethod<T extends number, U extends number>(
    channel: number,
    classId: T,
    methodId: U,
    handler: (m: ExtractArgs<T, U>) => void,
    onError: (e: Error) => void = () => {},
    maxCount: number = 0,
  ) {
    const sub = {
      channel,
      classId,
      methodId,
      handler,
      error: onError,
      maxCount,
      count: 0,
    } as MethodSubscriber<
      any,
      any
    >;
    this.methodSubscribers.push(sub);
    return () => this.unsubscribeMethod(sub);
  }

  private receiveHeader<T extends number>(
    channel: number,
    classId: T,
  ): Promise<Extract<Header, { classId: T }>> {
    return new Promise<any>((resolve, reject) => {
      const receiver: HeaderReceiver<any> = {
        channel,
        classId,
        handler: resolve,
        error: reject,
      };
      this.headerReceivers.push(receiver);
    });
  }

  private async receiveMethod<T extends number, U extends number>(
    channel: number,
    classId: T,
    methodId: U,
  ): Promise<ExtractArgs<T, U>> {
    return new Promise<any>((resolve, reject) => {
      this.subscribeMethod<T, U>(
        channel,
        classId,
        methodId,
        resolve,
        reject,
        1,
      );
    });
  }

  private async receiveContent(channel: number, size: number) {
    const buffer = new Deno.Buffer();
    return new Promise<Uint8Array>((resolve, reject) => {
      const cancel = this.subscribeContent(channel, (data) => {
        buffer.writeSync(data);
        if (buffer.length >= size) {
          cancel();
          return resolve(buffer.bytes());
        }
      }, reject);
    });
  }

  async sendConnectionStartOk(
    channel: number,
    args: ConnectionStartOkArgs,
  ): Promise<void> {
    await this.socket.write(
      { channel, type: 1, payload: encodeConnectionStartOk(args) },
    );
  }

  async sendConnectionSecureOk(
    channel: number,
    args: ConnectionSecureOkArgs,
  ): Promise<void> {
    await this.socket.write(
      { channel, type: 1, payload: encodeConnectionSecureOk(args) },
    );
  }

  async sendConnectionTuneOk(
    channel: number,
    args: ConnectionTuneOkArgs,
  ): Promise<void> {
    await this.socket.write(
      { channel, type: 1, payload: encodeConnectionTuneOk(args) },
    );
  }

  async sendConnectionOpen(
    channel: number,
    args: ConnectionOpenArgs,
  ): Promise<ConnectionOpenOk> {
    await this.socket.write(
      { channel, type: 1, payload: encodeConnectionOpen(args) },
    );
    return this.receiveMethod(channel, 10, 41);
  }

  async sendConnectionClose(
    channel: number,
    args: ConnectionCloseArgs,
  ): Promise<ConnectionCloseOk> {
    await this.socket.write(
      { channel, type: 1, payload: encodeConnectionClose(args) },
    );
    return this.receiveMethod(channel, 10, 51);
  }

  async sendConnectionCloseOk(
    channel: number,
    args: ConnectionCloseOkArgs,
  ): Promise<void> {
    await this.socket.write(
      { channel, type: 1, payload: encodeConnectionCloseOk(args) },
    );
  }

  async sendChannelOpen(
    channel: number,
    args: ChannelOpenArgs,
  ): Promise<ChannelOpenOk> {
    await this.socket.write(
      { channel, type: 1, payload: encodeChannelOpen(args) },
    );
    return this.receiveMethod(channel, 20, 11);
  }

  async sendChannelFlow(
    channel: number,
    args: ChannelFlowArgs,
  ): Promise<ChannelFlowOk> {
    await this.socket.write(
      { channel, type: 1, payload: encodeChannelFlow(args) },
    );
    return this.receiveMethod(channel, 20, 21);
  }

  async sendChannelClose(
    channel: number,
    args: ChannelCloseArgs,
  ): Promise<ChannelCloseOk> {
    await this.socket.write(
      { channel, type: 1, payload: encodeChannelClose(args) },
    );
    return this.receiveMethod(channel, 20, 41);
  }

  async sendChannelCloseOk(
    channel: number,
    args: ChannelCloseOkArgs,
  ): Promise<void> {
    await this.socket.write(
      { channel, type: 1, payload: encodeChannelCloseOk(args) },
    );
  }

  async sendExchangeDeclare(
    channel: number,
    args: ExchangeDeclareArgs,
  ): Promise<ExchangeDeclareOk> {
    await this.socket.write(
      { channel, type: 1, payload: encodeExchangeDeclare(args) },
    );
    return this.receiveMethod(channel, 40, 11);
  }

  async sendExchangeDeclareOk(
    channel: number,
    args: ExchangeDeclareOkArgs,
  ): Promise<void> {
    await this.socket.write(
      { channel, type: 1, payload: encodeExchangeDeclareOk(args) },
    );
  }

  async sendExchangeDelete(
    channel: number,
    args: ExchangeDeleteArgs,
  ): Promise<ExchangeDeleteOk> {
    await this.socket.write(
      { channel, type: 1, payload: encodeExchangeDelete(args) },
    );
    return this.receiveMethod(channel, 40, 21);
  }

  async sendExchangeDeleteOk(
    channel: number,
    args: ExchangeDeleteOkArgs,
  ): Promise<void> {
    await this.socket.write(
      { channel, type: 1, payload: encodeExchangeDeleteOk(args) },
    );
  }

  async sendExchangeBind(
    channel: number,
    args: ExchangeBindArgs,
  ): Promise<ExchangeBindOk> {
    await this.socket.write(
      { channel, type: 1, payload: encodeExchangeBind(args) },
    );
    return this.receiveMethod(channel, 40, 31);
  }

  async sendExchangeBindOk(
    channel: number,
    args: ExchangeBindOkArgs,
  ): Promise<void> {
    await this.socket.write(
      { channel, type: 1, payload: encodeExchangeBindOk(args) },
    );
  }

  async sendExchangeUnbind(
    channel: number,
    args: ExchangeUnbindArgs,
  ): Promise<ExchangeUnbindOk> {
    await this.socket.write(
      { channel, type: 1, payload: encodeExchangeUnbind(args) },
    );
    return this.receiveMethod(channel, 40, 51);
  }

  async sendExchangeUnbindOk(
    channel: number,
    args: ExchangeUnbindOkArgs,
  ): Promise<void> {
    await this.socket.write(
      { channel, type: 1, payload: encodeExchangeUnbindOk(args) },
    );
  }

  async sendQueueDeclare(
    channel: number,
    args: QueueDeclareArgs,
  ): Promise<QueueDeclareOk> {
    await this.socket.write(
      { channel, type: 1, payload: encodeQueueDeclare(args) },
    );
    return this.receiveMethod(channel, 50, 11);
  }

  async sendQueueDeclareOk(
    channel: number,
    args: QueueDeclareOkArgs,
  ): Promise<void> {
    await this.socket.write(
      { channel, type: 1, payload: encodeQueueDeclareOk(args) },
    );
  }

  async sendQueueBind(
    channel: number,
    args: QueueBindArgs,
  ): Promise<QueueBindOk> {
    await this.socket.write(
      { channel, type: 1, payload: encodeQueueBind(args) },
    );
    return this.receiveMethod(channel, 50, 21);
  }

  async sendQueueBindOk(channel: number, args: QueueBindOkArgs): Promise<void> {
    await this.socket.write(
      { channel, type: 1, payload: encodeQueueBindOk(args) },
    );
  }

  async sendQueuePurge(
    channel: number,
    args: QueuePurgeArgs,
  ): Promise<QueuePurgeOk> {
    await this.socket.write(
      { channel, type: 1, payload: encodeQueuePurge(args) },
    );
    return this.receiveMethod(channel, 50, 31);
  }

  async sendQueuePurgeOk(
    channel: number,
    args: QueuePurgeOkArgs,
  ): Promise<void> {
    await this.socket.write(
      { channel, type: 1, payload: encodeQueuePurgeOk(args) },
    );
  }

  async sendQueueDelete(
    channel: number,
    args: QueueDeleteArgs,
  ): Promise<QueueDeleteOk> {
    await this.socket.write(
      { channel, type: 1, payload: encodeQueueDelete(args) },
    );
    return this.receiveMethod(channel, 50, 41);
  }

  async sendQueueDeleteOk(
    channel: number,
    args: QueueDeleteOkArgs,
  ): Promise<void> {
    await this.socket.write(
      { channel, type: 1, payload: encodeQueueDeleteOk(args) },
    );
  }

  async sendQueueUnbind(
    channel: number,
    args: QueueUnbindArgs,
  ): Promise<QueueUnbindOk> {
    await this.socket.write(
      { channel, type: 1, payload: encodeQueueUnbind(args) },
    );
    return this.receiveMethod(channel, 50, 51);
  }

  async sendQueueUnbindOk(
    channel: number,
    args: QueueUnbindOkArgs,
  ): Promise<void> {
    await this.socket.write(
      { channel, type: 1, payload: encodeQueueUnbindOk(args) },
    );
  }

  async sendBasicQos(channel: number, args: BasicQosArgs): Promise<BasicQosOk> {
    await this.socket.write(
      { channel, type: 1, payload: encodeBasicQos(args) },
    );
    return this.receiveMethod(channel, 60, 11);
  }

  async sendBasicConsume(
    channel: number,
    args: BasicConsumeArgs,
  ): Promise<BasicConsumeOk> {
    await this.socket.write(
      { channel, type: 1, payload: encodeBasicConsume(args) },
    );
    return this.receiveMethod(channel, 60, 21);
  }

  async sendBasicCancel(
    channel: number,
    args: BasicCancelArgs,
  ): Promise<BasicCancelOk> {
    await this.socket.write(
      { channel, type: 1, payload: encodeBasicCancel(args) },
    );
    return this.receiveMethod(channel, 60, 31);
  }

  async sendBasicPublish(
    channel: number,
    args: BasicPublishArgs,
    props: BasicProperties,
    data: Uint8Array,
  ) {
    await Promise.all([
      this.socket.write(
        { channel, type: 1, payload: encodeBasicPublish(args) },
      ),
      this.socket.write(
        {
          channel,
          type: 2,
          payload: encodeBasicHeader(BigInt(data.length), props),
        },
      ),
      this.socket.write({ channel, type: 3, payload: data }),
    ]);
  }

  async sendBasicGet(
    channel: number,
    args: BasicGetArgs,
  ): Promise<BasicGetOk | BasicGetEmpty> {
    await this.socket.write(
      { channel, type: 1, payload: encodeBasicGet(args) },
    );
    return Promise.race([
      this.receiveMethod(channel, 60, 71),
      this.receiveMethod(channel, 60, 72),
    ]);
  }

  async sendBasicAck(channel: number, args: BasicAckArgs): Promise<void> {
    await this.socket.write(
      { channel, type: 1, payload: encodeBasicAck(args) },
    );
  }

  async sendBasicReject(channel: number, args: BasicRejectArgs): Promise<void> {
    await this.socket.write(
      { channel, type: 1, payload: encodeBasicReject(args) },
    );
  }

  async sendBasicRecoverAsync(
    channel: number,
    args: BasicRecoverAsyncArgs,
  ): Promise<void> {
    await this.socket.write(
      { channel, type: 1, payload: encodeBasicRecoverAsync(args) },
    );
  }

  async sendBasicRecover(
    channel: number,
    args: BasicRecoverArgs,
  ): Promise<BasicRecoverOk> {
    await this.socket.write(
      { channel, type: 1, payload: encodeBasicRecover(args) },
    );
    return this.receiveMethod(channel, 60, 111);
  }

  async sendBasicNack(channel: number, args: BasicNackArgs): Promise<void> {
    await this.socket.write(
      { channel, type: 1, payload: encodeBasicNack(args) },
    );
  }

  async sendTxSelect(channel: number, args: TxSelectArgs): Promise<TxSelectOk> {
    await this.socket.write(
      { channel, type: 1, payload: encodeTxSelect(args) },
    );
    return this.receiveMethod(channel, 90, 11);
  }

  async sendTxCommit(channel: number, args: TxCommitArgs): Promise<TxCommitOk> {
    await this.socket.write(
      { channel, type: 1, payload: encodeTxCommit(args) },
    );
    return this.receiveMethod(channel, 90, 21);
  }

  async sendTxRollback(
    channel: number,
    args: TxRollbackArgs,
  ): Promise<TxRollbackOk> {
    await this.socket.write(
      { channel, type: 1, payload: encodeTxRollback(args) },
    );
    return this.receiveMethod(channel, 90, 31);
  }

  async sendConfirmSelect(
    channel: number,
    args: ConfirmSelectArgs,
  ): Promise<ConfirmSelectOk> {
    await this.socket.write(
      { channel, type: 1, payload: encodeConfirmSelect(args) },
    );
    return this.receiveMethod(channel, 85, 11);
  }

  async receiveConnectionStart(channel: number): Promise<ConnectionStart> {
    return this.receiveMethod(channel, 10, 10);
  }

  async receiveConnectionSecure(channel: number): Promise<ConnectionSecure> {
    return this.receiveMethod(channel, 10, 20);
  }

  async receiveConnectionTune(channel: number): Promise<ConnectionTune> {
    return this.receiveMethod(channel, 10, 30);
  }

  async receiveConnectionClose(channel: number): Promise<ConnectionClose> {
    return this.receiveMethod(channel, 10, 50);
  }

  async receiveChannelFlow(channel: number): Promise<ChannelFlow> {
    return this.receiveMethod(channel, 20, 20);
  }

  async receiveChannelClose(channel: number): Promise<ChannelClose> {
    return this.receiveMethod(channel, 20, 40);
  }

  async receiveBasicAck(channel: number): Promise<BasicAck> {
    return this.receiveMethod(channel, 60, 80);
  }

  async receiveBasicNack(channel: number): Promise<BasicNack> {
    return this.receiveMethod(channel, 60, 120);
  }

  subscribeConnectionStart(
    channel: number,
    handler: (args: ConnectionStart) => void,
  ): () => void {
    return this.subscribeMethod(channel, 10, 10, handler);
  }

  subscribeConnectionSecure(
    channel: number,
    handler: (args: ConnectionSecure) => void,
  ): () => void {
    return this.subscribeMethod(channel, 10, 20, handler);
  }

  subscribeConnectionTune(
    channel: number,
    handler: (args: ConnectionTune) => void,
  ): () => void {
    return this.subscribeMethod(channel, 10, 30, handler);
  }

  subscribeConnectionClose(
    channel: number,
    handler: (args: ConnectionClose) => void,
  ): () => void {
    return this.subscribeMethod(channel, 10, 50, handler);
  }

  subscribeChannelFlow(
    channel: number,
    handler: (args: ChannelFlow) => void,
  ): () => void {
    return this.subscribeMethod(channel, 20, 20, handler);
  }

  subscribeChannelClose(
    channel: number,
    handler: (args: ChannelClose) => void,
  ): () => void {
    return this.subscribeMethod(channel, 20, 40, handler);
  }

  subscribeBasicReturn(
    channel: number,
    handler: (
      args: BasicReturn,
      props: BasicProperties,
      data: Uint8Array,
    ) => void,
  ): () => void {
    return this.subscribeMethod(channel, 60, 50, async (method) => {
      const header = await this.receiveHeader(channel, 60);
      const content = await this.receiveContent(channel, header.size);
      return handler(method, header.props, content);
    });
  }

  subscribeBasicDeliver(
    channel: number,
    handler: (
      args: BasicDeliver,
      props: BasicProperties,
      data: Uint8Array,
    ) => void,
  ): () => void {
    return this.subscribeMethod(channel, 60, 60, async (method) => {
      const header = await this.receiveHeader(channel, 60);
      const content = await this.receiveContent(channel, header.size);
      return handler(method, header.props, content);
    });
  }

  subscribeBasicAck(
    channel: number,
    handler: (args: BasicAck) => void,
  ): () => void {
    return this.subscribeMethod(channel, 60, 80, handler);
  }

  subscribeBasicNack(
    channel: number,
    handler: (args: BasicNack) => void,
  ): () => void {
    return this.subscribeMethod(channel, 60, 120, handler);
  }
}
