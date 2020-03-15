import * as enc from "./encoder.ts";
export const CONNECTION = 10;
export const CHANNEL = 20;
export const ACCESS = 30;
export const EXCHANGE = 40;
export const QUEUE = 50;
export const BASIC = 60;
export const TX = 90;
export const CONFIRM = 85;
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
export const CHANNEL_OPEN = 10;
export const CHANNEL_OPEN_OK = 11;
export const CHANNEL_FLOW = 20;
export const CHANNEL_FLOW_OK = 21;
export const CHANNEL_CLOSE = 40;
export const CHANNEL_CLOSE_OK = 41;
export const ACCESS_REQUEST = 10;
export const ACCESS_REQUEST_OK = 11;
export const EXCHANGE_DECLARE = 10;
export const EXCHANGE_DECLARE_OK = 11;
export const EXCHANGE_DELETE = 20;
export const EXCHANGE_DELETE_OK = 21;
export const EXCHANGE_BIND = 30;
export const EXCHANGE_BIND_OK = 31;
export const EXCHANGE_UNBIND = 40;
export const EXCHANGE_UNBIND_OK = 51;
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
export const TX_SELECT = 10;
export const TX_SELECT_OK = 11;
export const TX_COMMIT = 20;
export const TX_COMMIT_OK = 21;
export const TX_ROLLBACK = 30;
export const TX_ROLLBACK_OK = 31;
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
  timestamp?: Uint8Array;
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
  versionMajor?: number;
  versionMinor?: number;
  serverProperties: Record<string, unknown>;
  mechanisms?: string;
  locales?: string;
}

export interface ConnectionStartOkArgs {
  clientProperties: Record<string, unknown>;
  mechanism?: string;
  response: string;
  locale?: string;
}

export interface ConnectionSecureArgs {
  challenge: string;
}

export interface ConnectionSecureOkArgs {
  response: string;
}

export interface ConnectionTuneArgs {
  channelMax?: number;
  frameMax?: number;
  heartbeat?: number;
}

export interface ConnectionTuneOkArgs {
  channelMax?: number;
  frameMax?: number;
  heartbeat?: number;
}

export interface ConnectionOpenArgs {
  virtualHost?: string;
  capabilities?: string;
  insist?: boolean;
}

export interface ConnectionOpenOkArgs {
  knownHosts?: string;
}

export interface ConnectionCloseArgs {
  replyCode: number;
  replyText?: string;
  classId: number;
  methodId: number;
}

export interface ConnectionCloseOkArgs {
}

export interface ConnectionBlockedArgs {
  reason?: string;
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
  outOfBand?: string;
}

export interface ChannelOpenOkArgs {
  channelId?: string;
}

export interface ChannelFlowArgs {
  active: boolean;
}

export interface ChannelFlowOkArgs {
  active: boolean;
}

export interface ChannelCloseArgs {
  replyCode: number;
  replyText?: string;
  classId: number;
  methodId: number;
}

export interface ChannelCloseOkArgs {
}

export interface AccessRequestArgs {
  realm?: string;
  exclusive?: boolean;
  passive?: boolean;
  active?: boolean;
  write?: boolean;
  read?: boolean;
}

export interface AccessRequestOkArgs {
  ticket?: number;
}

export interface ExchangeDeclareArgs {
  ticket?: number;
  exchange: string;
  type?: string;
  passive?: boolean;
  durable?: boolean;
  autoDelete?: boolean;
  internal?: boolean;
  nowait?: boolean;
  arguments?: Record<string, unknown>;
}

export interface ExchangeDeclareOkArgs {
}

export interface ExchangeDeleteArgs {
  ticket?: number;
  exchange: string;
  ifUnused?: boolean;
  nowait?: boolean;
}

export interface ExchangeDeleteOkArgs {
}

export interface ExchangeBindArgs {
  ticket?: number;
  destination: string;
  source: string;
  routingKey?: string;
  nowait?: boolean;
  arguments?: Record<string, unknown>;
}

export interface ExchangeBindOkArgs {
}

export interface ExchangeUnbindArgs {
  ticket?: number;
  destination: string;
  source: string;
  routingKey?: string;
  nowait?: boolean;
  arguments?: Record<string, unknown>;
}

export interface ExchangeUnbindOkArgs {
}

export interface QueueDeclareArgs {
  ticket?: number;
  queue?: string;
  passive?: boolean;
  durable?: boolean;
  exclusive?: boolean;
  autoDelete?: boolean;
  nowait?: boolean;
  arguments?: Record<string, unknown>;
}

export interface QueueDeclareOkArgs {
  queue: string;
  messageCount: number;
  consumerCount: number;
}

export interface QueueBindArgs {
  ticket?: number;
  queue?: string;
  exchange: string;
  routingKey?: string;
  nowait?: boolean;
  arguments?: Record<string, unknown>;
}

export interface QueueBindOkArgs {
}

export interface QueuePurgeArgs {
  ticket?: number;
  queue?: string;
  nowait?: boolean;
}

export interface QueuePurgeOkArgs {
  messageCount: number;
}

export interface QueueDeleteArgs {
  ticket?: number;
  queue?: string;
  ifUnused?: boolean;
  ifEmpty?: boolean;
  nowait?: boolean;
}

export interface QueueDeleteOkArgs {
  messageCount: number;
}

export interface QueueUnbindArgs {
  ticket?: number;
  queue?: string;
  exchange: string;
  routingKey?: string;
  arguments?: Record<string, unknown>;
}

export interface QueueUnbindOkArgs {
}

export interface BasicQosArgs {
  prefetchSize?: number;
  prefetchCount?: number;
  global?: boolean;
}

export interface BasicQosOkArgs {
}

export interface BasicConsumeArgs {
  ticket?: number;
  queue?: string;
  consumerTag?: string;
  noLocal?: boolean;
  noAck?: boolean;
  exclusive?: boolean;
  nowait?: boolean;
  arguments?: Record<string, unknown>;
}

export interface BasicConsumeOkArgs {
  consumerTag: string;
}

export interface BasicCancelArgs {
  consumerTag: string;
  nowait?: boolean;
}

export interface BasicCancelOkArgs {
  consumerTag: string;
}

export interface BasicPublishArgs {
  ticket?: number;
  exchange?: string;
  routingKey?: string;
  mandatory?: boolean;
  immediate?: boolean;
}

export interface BasicReturnArgs {
  replyCode: number;
  replyText?: string;
  exchange: string;
  routingKey: string;
}

export interface BasicDeliverArgs {
  consumerTag: string;
  deliveryTag: number;
  redelivered?: boolean;
  exchange: string;
  routingKey: string;
}

export interface BasicGetArgs {
  ticket?: number;
  queue?: string;
  noAck?: boolean;
}

export interface BasicGetOkArgs {
  deliveryTag: number;
  redelivered?: boolean;
  exchange: string;
  routingKey: string;
  messageCount: number;
}

export interface BasicGetEmptyArgs {
  clusterId?: string;
}

export interface BasicAckArgs {
  deliveryTag?: number;
  multiple?: boolean;
}

export interface BasicRejectArgs {
  deliveryTag: number;
  requeue?: boolean;
}

export interface BasicRecoverAsyncArgs {
  requeue?: boolean;
}

export interface BasicRecoverArgs {
  requeue?: boolean;
}

export interface BasicRecoverOkArgs {
}

export interface BasicNackArgs {
  deliveryTag?: number;
  multiple?: boolean;
  requeue?: boolean;
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
  nowait?: boolean;
}

export interface ConfirmSelectOkArgs {
}

export interface ConnectionStartPayload {
  versionMajor: number;
  versionMinor: number;
  serverProperties: Record<string, unknown>;
  mechanisms: string;
  locales: string;
}

export interface ConnectionStartOkPayload {
  clientProperties: Record<string, unknown>;
  mechanism: string;
  response: string;
  locale: string;
}

export interface ConnectionSecurePayload {
  challenge: string;
}

export interface ConnectionSecureOkPayload {
  response: string;
}

export interface ConnectionTunePayload {
  channelMax: number;
  frameMax: number;
  heartbeat: number;
}

export interface ConnectionTuneOkPayload {
  channelMax: number;
  frameMax: number;
  heartbeat: number;
}

export interface ConnectionOpenPayload {
  virtualHost: string;
  capabilities: string;
  insist: boolean;
}

export interface ConnectionOpenOkPayload {
  knownHosts: string;
}

export interface ConnectionClosePayload {
  replyCode: number;
  replyText: string;
  classId: number;
  methodId: number;
}

export interface ConnectionCloseOkPayload {
}

export interface ConnectionBlockedPayload {
  reason: string;
}

export interface ConnectionUnblockedPayload {
}

export interface ConnectionUpdateSecretPayload {
  newSecret: string;
  reason: string;
}

export interface ConnectionUpdateSecretOkPayload {
}

export interface ChannelOpenPayload {
  outOfBand: string;
}

export interface ChannelOpenOkPayload {
  channelId: string;
}

export interface ChannelFlowPayload {
  active: boolean;
}

export interface ChannelFlowOkPayload {
  active: boolean;
}

export interface ChannelClosePayload {
  replyCode: number;
  replyText: string;
  classId: number;
  methodId: number;
}

export interface ChannelCloseOkPayload {
}

export interface AccessRequestPayload {
  realm: string;
  exclusive: boolean;
  passive: boolean;
  active: boolean;
  write: boolean;
  read: boolean;
}

export interface AccessRequestOkPayload {
  ticket: number;
}

export interface ExchangeDeclarePayload {
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

export interface ExchangeDeclareOkPayload {
}

export interface ExchangeDeletePayload {
  ticket: number;
  exchange: string;
  ifUnused: boolean;
  nowait: boolean;
}

export interface ExchangeDeleteOkPayload {
}

export interface ExchangeBindPayload {
  ticket: number;
  destination: string;
  source: string;
  routingKey: string;
  nowait: boolean;
  arguments: Record<string, unknown>;
}

export interface ExchangeBindOkPayload {
}

export interface ExchangeUnbindPayload {
  ticket: number;
  destination: string;
  source: string;
  routingKey: string;
  nowait: boolean;
  arguments: Record<string, unknown>;
}

export interface ExchangeUnbindOkPayload {
}

export interface QueueDeclarePayload {
  ticket: number;
  queue: string;
  passive: boolean;
  durable: boolean;
  exclusive: boolean;
  autoDelete: boolean;
  nowait: boolean;
  arguments: Record<string, unknown>;
}

export interface QueueDeclareOkPayload {
  queue: string;
  messageCount: number;
  consumerCount: number;
}

export interface QueueBindPayload {
  ticket: number;
  queue: string;
  exchange: string;
  routingKey: string;
  nowait: boolean;
  arguments: Record<string, unknown>;
}

export interface QueueBindOkPayload {
}

export interface QueuePurgePayload {
  ticket: number;
  queue: string;
  nowait: boolean;
}

export interface QueuePurgeOkPayload {
  messageCount: number;
}

export interface QueueDeletePayload {
  ticket: number;
  queue: string;
  ifUnused: boolean;
  ifEmpty: boolean;
  nowait: boolean;
}

export interface QueueDeleteOkPayload {
  messageCount: number;
}

export interface QueueUnbindPayload {
  ticket: number;
  queue: string;
  exchange: string;
  routingKey: string;
  arguments: Record<string, unknown>;
}

export interface QueueUnbindOkPayload {
}

export interface BasicQosPayload {
  prefetchSize: number;
  prefetchCount: number;
  global: boolean;
}

export interface BasicQosOkPayload {
}

export interface BasicConsumePayload {
  ticket: number;
  queue: string;
  consumerTag: string;
  noLocal: boolean;
  noAck: boolean;
  exclusive: boolean;
  nowait: boolean;
  arguments: Record<string, unknown>;
}

export interface BasicConsumeOkPayload {
  consumerTag: string;
}

export interface BasicCancelPayload {
  consumerTag: string;
  nowait: boolean;
}

export interface BasicCancelOkPayload {
  consumerTag: string;
}

export interface BasicPublishPayload {
  ticket: number;
  exchange: string;
  routingKey: string;
  mandatory: boolean;
  immediate: boolean;
}

export interface BasicReturnPayload {
  replyCode: number;
  replyText: string;
  exchange: string;
  routingKey: string;
}

export interface BasicDeliverPayload {
  consumerTag: string;
  deliveryTag: number;
  redelivered: boolean;
  exchange: string;
  routingKey: string;
}

export interface BasicGetPayload {
  ticket: number;
  queue: string;
  noAck: boolean;
}

export interface BasicGetOkPayload {
  deliveryTag: number;
  redelivered: boolean;
  exchange: string;
  routingKey: string;
  messageCount: number;
}

export interface BasicGetEmptyPayload {
  clusterId: string;
}

export interface BasicAckPayload {
  deliveryTag: number;
  multiple: boolean;
}

export interface BasicRejectPayload {
  deliveryTag: number;
  requeue: boolean;
}

export interface BasicRecoverAsyncPayload {
  requeue: boolean;
}

export interface BasicRecoverPayload {
  requeue: boolean;
}

export interface BasicRecoverOkPayload {
}

export interface BasicNackPayload {
  deliveryTag: number;
  multiple: boolean;
  requeue: boolean;
}

export interface TxSelectPayload {
}

export interface TxSelectOkPayload {
}

export interface TxCommitPayload {
}

export interface TxCommitOkPayload {
}

export interface TxRollbackPayload {
}

export interface TxRollbackOkPayload {
}

export interface ConfirmSelectPayload {
  nowait: boolean;
}

export interface ConfirmSelectOkPayload {
}

export interface ConnectionStart {
  classId: 10;
  methodId: 10;
  payload: ConnectionStartPayload;
}

export interface ConnectionStartOk {
  classId: 10;
  methodId: 11;
  payload: ConnectionStartOkPayload;
}

export interface ConnectionSecure {
  classId: 10;
  methodId: 20;
  payload: ConnectionSecurePayload;
}

export interface ConnectionSecureOk {
  classId: 10;
  methodId: 21;
  payload: ConnectionSecureOkPayload;
}

export interface ConnectionTune {
  classId: 10;
  methodId: 30;
  payload: ConnectionTunePayload;
}

export interface ConnectionTuneOk {
  classId: 10;
  methodId: 31;
  payload: ConnectionTuneOkPayload;
}

export interface ConnectionOpen {
  classId: 10;
  methodId: 40;
  payload: ConnectionOpenPayload;
}

export interface ConnectionOpenOk {
  classId: 10;
  methodId: 41;
  payload: ConnectionOpenOkPayload;
}

export interface ConnectionClose {
  classId: 10;
  methodId: 50;
  payload: ConnectionClosePayload;
}

export interface ConnectionCloseOk {
  classId: 10;
  methodId: 51;
  payload: ConnectionCloseOkPayload;
}

export interface ConnectionBlocked {
  classId: 10;
  methodId: 60;
  payload: ConnectionBlockedPayload;
}

export interface ConnectionUnblocked {
  classId: 10;
  methodId: 61;
  payload: ConnectionUnblockedPayload;
}

export interface ConnectionUpdateSecret {
  classId: 10;
  methodId: 70;
  payload: ConnectionUpdateSecretPayload;
}

export interface ConnectionUpdateSecretOk {
  classId: 10;
  methodId: 71;
  payload: ConnectionUpdateSecretOkPayload;
}

export interface ChannelOpen {
  classId: 20;
  methodId: 10;
  payload: ChannelOpenPayload;
}

export interface ChannelOpenOk {
  classId: 20;
  methodId: 11;
  payload: ChannelOpenOkPayload;
}

export interface ChannelFlow {
  classId: 20;
  methodId: 20;
  payload: ChannelFlowPayload;
}

export interface ChannelFlowOk {
  classId: 20;
  methodId: 21;
  payload: ChannelFlowOkPayload;
}

export interface ChannelClose {
  classId: 20;
  methodId: 40;
  payload: ChannelClosePayload;
}

export interface ChannelCloseOk {
  classId: 20;
  methodId: 41;
  payload: ChannelCloseOkPayload;
}

export interface AccessRequest {
  classId: 30;
  methodId: 10;
  payload: AccessRequestPayload;
}

export interface AccessRequestOk {
  classId: 30;
  methodId: 11;
  payload: AccessRequestOkPayload;
}

export interface ExchangeDeclare {
  classId: 40;
  methodId: 10;
  payload: ExchangeDeclarePayload;
}

export interface ExchangeDeclareOk {
  classId: 40;
  methodId: 11;
  payload: ExchangeDeclareOkPayload;
}

export interface ExchangeDelete {
  classId: 40;
  methodId: 20;
  payload: ExchangeDeletePayload;
}

export interface ExchangeDeleteOk {
  classId: 40;
  methodId: 21;
  payload: ExchangeDeleteOkPayload;
}

export interface ExchangeBind {
  classId: 40;
  methodId: 30;
  payload: ExchangeBindPayload;
}

export interface ExchangeBindOk {
  classId: 40;
  methodId: 31;
  payload: ExchangeBindOkPayload;
}

export interface ExchangeUnbind {
  classId: 40;
  methodId: 40;
  payload: ExchangeUnbindPayload;
}

export interface ExchangeUnbindOk {
  classId: 40;
  methodId: 51;
  payload: ExchangeUnbindOkPayload;
}

export interface QueueDeclare {
  classId: 50;
  methodId: 10;
  payload: QueueDeclarePayload;
}

export interface QueueDeclareOk {
  classId: 50;
  methodId: 11;
  payload: QueueDeclareOkPayload;
}

export interface QueueBind {
  classId: 50;
  methodId: 20;
  payload: QueueBindPayload;
}

export interface QueueBindOk {
  classId: 50;
  methodId: 21;
  payload: QueueBindOkPayload;
}

export interface QueuePurge {
  classId: 50;
  methodId: 30;
  payload: QueuePurgePayload;
}

export interface QueuePurgeOk {
  classId: 50;
  methodId: 31;
  payload: QueuePurgeOkPayload;
}

export interface QueueDelete {
  classId: 50;
  methodId: 40;
  payload: QueueDeletePayload;
}

export interface QueueDeleteOk {
  classId: 50;
  methodId: 41;
  payload: QueueDeleteOkPayload;
}

export interface QueueUnbind {
  classId: 50;
  methodId: 50;
  payload: QueueUnbindPayload;
}

export interface QueueUnbindOk {
  classId: 50;
  methodId: 51;
  payload: QueueUnbindOkPayload;
}

export interface BasicQos {
  classId: 60;
  methodId: 10;
  payload: BasicQosPayload;
}

export interface BasicQosOk {
  classId: 60;
  methodId: 11;
  payload: BasicQosOkPayload;
}

export interface BasicConsume {
  classId: 60;
  methodId: 20;
  payload: BasicConsumePayload;
}

export interface BasicConsumeOk {
  classId: 60;
  methodId: 21;
  payload: BasicConsumeOkPayload;
}

export interface BasicCancel {
  classId: 60;
  methodId: 30;
  payload: BasicCancelPayload;
}

export interface BasicCancelOk {
  classId: 60;
  methodId: 31;
  payload: BasicCancelOkPayload;
}

export interface BasicPublish {
  classId: 60;
  methodId: 40;
  payload: BasicPublishPayload;
}

export interface BasicReturn {
  classId: 60;
  methodId: 50;
  payload: BasicReturnPayload;
}

export interface BasicDeliver {
  classId: 60;
  methodId: 60;
  payload: BasicDeliverPayload;
}

export interface BasicGet {
  classId: 60;
  methodId: 70;
  payload: BasicGetPayload;
}

export interface BasicGetOk {
  classId: 60;
  methodId: 71;
  payload: BasicGetOkPayload;
}

export interface BasicGetEmpty {
  classId: 60;
  methodId: 72;
  payload: BasicGetEmptyPayload;
}

export interface BasicAck {
  classId: 60;
  methodId: 80;
  payload: BasicAckPayload;
}

export interface BasicReject {
  classId: 60;
  methodId: 90;
  payload: BasicRejectPayload;
}

export interface BasicRecoverAsync {
  classId: 60;
  methodId: 100;
  payload: BasicRecoverAsyncPayload;
}

export interface BasicRecover {
  classId: 60;
  methodId: 110;
  payload: BasicRecoverPayload;
}

export interface BasicRecoverOk {
  classId: 60;
  methodId: 111;
  payload: BasicRecoverOkPayload;
}

export interface BasicNack {
  classId: 60;
  methodId: 120;
  payload: BasicNackPayload;
}

export interface TxSelect {
  classId: 90;
  methodId: 10;
  payload: TxSelectPayload;
}

export interface TxSelectOk {
  classId: 90;
  methodId: 11;
  payload: TxSelectOkPayload;
}

export interface TxCommit {
  classId: 90;
  methodId: 20;
  payload: TxCommitPayload;
}

export interface TxCommitOk {
  classId: 90;
  methodId: 21;
  payload: TxCommitOkPayload;
}

export interface TxRollback {
  classId: 90;
  methodId: 30;
  payload: TxRollbackPayload;
}

export interface TxRollbackOk {
  classId: 90;
  methodId: 31;
  payload: TxRollbackOkPayload;
}

export interface ConfirmSelect {
  classId: 85;
  methodId: 10;
  payload: ConfirmSelectPayload;
}

export interface ConfirmSelectOk {
  classId: 85;
  methodId: 11;
  payload: ConfirmSelectOkPayload;
}

export interface ConnectionHeader {
  classId: 10;
  weight: number;
  size: number;
  props: ConnectionProperties;
}

export interface ChannelHeader {
  classId: 20;
  weight: number;
  size: number;
  props: ChannelProperties;
}

export interface AccessHeader {
  classId: 30;
  weight: number;
  size: number;
  props: AccessProperties;
}

export interface ExchangeHeader {
  classId: 40;
  weight: number;
  size: number;
  props: ExchangeProperties;
}

export interface QueueHeader {
  classId: 50;
  weight: number;
  size: number;
  props: QueueProperties;
}

export interface BasicHeader {
  classId: 60;
  weight: number;
  size: number;
  props: BasicProperties;
}

export interface TxHeader {
  classId: 90;
  weight: number;
  size: number;
  props: TxProperties;
}

export interface ConfirmHeader {
  classId: 85;
  weight: number;
  size: number;
  props: ConfirmProperties;
}

export const methods = {
  connection: {
    start(args: ConnectionStartArgs): ConnectionStart {
      return {
        classId: 10,
        methodId: 10,
        payload: {
          versionMajor: args.versionMajor !== undefined
            ? args.versionMajor
            : 0,
          versionMinor: args.versionMinor !== undefined
            ? args.versionMinor
            : 9,
          serverProperties: args.serverProperties,
          mechanisms: args.mechanisms !== undefined
            ? args.mechanisms
            : "PLAIN",
          locales: args.locales !== undefined ? args.locales : "en_US"
        }
      };
    },

    startOk(args: ConnectionStartOkArgs): ConnectionStartOk {
      return {
        classId: 10,
        methodId: 11,
        payload: {
          clientProperties: args.clientProperties,
          mechanism: args.mechanism !== undefined ? args.mechanism : "PLAIN",
          response: args.response,
          locale: args.locale !== undefined ? args.locale : "en_US"
        }
      };
    },

    secure(args: ConnectionSecureArgs): ConnectionSecure {
      return {
        classId: 10,
        methodId: 20,
        payload: { challenge: args.challenge }
      };
    },

    secureOk(args: ConnectionSecureOkArgs): ConnectionSecureOk {
      return {
        classId: 10,
        methodId: 21,
        payload: { response: args.response }
      };
    },

    tune(args: ConnectionTuneArgs): ConnectionTune {
      return {
        classId: 10,
        methodId: 30,
        payload: {
          channelMax: args.channelMax !== undefined ? args.channelMax : 0,
          frameMax: args.frameMax !== undefined ? args.frameMax : 0,
          heartbeat: args.heartbeat !== undefined ? args.heartbeat : 0
        }
      };
    },

    tuneOk(args: ConnectionTuneOkArgs): ConnectionTuneOk {
      return {
        classId: 10,
        methodId: 31,
        payload: {
          channelMax: args.channelMax !== undefined ? args.channelMax : 0,
          frameMax: args.frameMax !== undefined ? args.frameMax : 0,
          heartbeat: args.heartbeat !== undefined ? args.heartbeat : 0
        }
      };
    },

    open(args: ConnectionOpenArgs): ConnectionOpen {
      return {
        classId: 10,
        methodId: 40,
        payload: {
          virtualHost: args.virtualHost !== undefined ? args.virtualHost : "/",
          capabilities: args.capabilities !== undefined
            ? args.capabilities
            : "",
          insist: args.insist !== undefined ? args.insist : false
        }
      };
    },

    openOk(args: ConnectionOpenOkArgs): ConnectionOpenOk {
      return {
        classId: 10,
        methodId: 41,
        payload: {
          knownHosts: args.knownHosts !== undefined ? args.knownHosts : ""
        }
      };
    },

    close(args: ConnectionCloseArgs): ConnectionClose {
      return {
        classId: 10,
        methodId: 50,
        payload: {
          replyCode: args.replyCode,
          replyText: args.replyText !== undefined ? args.replyText : "",
          classId: args.classId,
          methodId: args.methodId
        }
      };
    },

    closeOk(args: ConnectionCloseOkArgs): ConnectionCloseOk {
      return { classId: 10, methodId: 51, payload: {} };
    },

    blocked(args: ConnectionBlockedArgs): ConnectionBlocked {
      return {
        classId: 10,
        methodId: 60,
        payload: { reason: args.reason !== undefined ? args.reason : "" }
      };
    },

    unblocked(args: ConnectionUnblockedArgs): ConnectionUnblocked {
      return { classId: 10, methodId: 61, payload: {} };
    },

    updateSecret(args: ConnectionUpdateSecretArgs): ConnectionUpdateSecret {
      return {
        classId: 10,
        methodId: 70,
        payload: { newSecret: args.newSecret, reason: args.reason }
      };
    },

    updateSecretOk(
      args: ConnectionUpdateSecretOkArgs
    ): ConnectionUpdateSecretOk {
      return { classId: 10, methodId: 71, payload: {} };
    }
  },

  channel: {
    open(args: ChannelOpenArgs): ChannelOpen {
      return {
        classId: 20,
        methodId: 10,
        payload: {
          outOfBand: args.outOfBand !== undefined ? args.outOfBand : ""
        }
      };
    },

    openOk(args: ChannelOpenOkArgs): ChannelOpenOk {
      return {
        classId: 20,
        methodId: 11,
        payload: {
          channelId: args.channelId !== undefined ? args.channelId : ""
        }
      };
    },

    flow(args: ChannelFlowArgs): ChannelFlow {
      return { classId: 20, methodId: 20, payload: { active: args.active } };
    },

    flowOk(args: ChannelFlowOkArgs): ChannelFlowOk {
      return { classId: 20, methodId: 21, payload: { active: args.active } };
    },

    close(args: ChannelCloseArgs): ChannelClose {
      return {
        classId: 20,
        methodId: 40,
        payload: {
          replyCode: args.replyCode,
          replyText: args.replyText !== undefined ? args.replyText : "",
          classId: args.classId,
          methodId: args.methodId
        }
      };
    },

    closeOk(args: ChannelCloseOkArgs): ChannelCloseOk {
      return { classId: 20, methodId: 41, payload: {} };
    }
  },

  access: {
    request(args: AccessRequestArgs): AccessRequest {
      return {
        classId: 30,
        methodId: 10,
        payload: {
          realm: args.realm !== undefined ? args.realm : "/data",
          exclusive: args.exclusive !== undefined ? args.exclusive : false,
          passive: args.passive !== undefined ? args.passive : true,
          active: args.active !== undefined ? args.active : true,
          write: args.write !== undefined ? args.write : true,
          read: args.read !== undefined ? args.read : true
        }
      };
    },

    requestOk(args: AccessRequestOkArgs): AccessRequestOk {
      return {
        classId: 30,
        methodId: 11,
        payload: { ticket: args.ticket !== undefined ? args.ticket : 1 }
      };
    }
  },

  exchange: {
    declare(args: ExchangeDeclareArgs): ExchangeDeclare {
      return {
        classId: 40,
        methodId: 10,
        payload: {
          ticket: args.ticket !== undefined ? args.ticket : 0,
          exchange: args.exchange,
          type: args.type !== undefined ? args.type : "direct",
          passive: args.passive !== undefined ? args.passive : false,
          durable: args.durable !== undefined ? args.durable : false,
          autoDelete: args.autoDelete !== undefined ? args.autoDelete : false,
          internal: args.internal !== undefined ? args.internal : false,
          nowait: args.nowait !== undefined ? args.nowait : false,
          arguments: args.arguments !== undefined ? args.arguments : {}
        }
      };
    },

    declareOk(args: ExchangeDeclareOkArgs): ExchangeDeclareOk {
      return { classId: 40, methodId: 11, payload: {} };
    },

    delete(args: ExchangeDeleteArgs): ExchangeDelete {
      return {
        classId: 40,
        methodId: 20,
        payload: {
          ticket: args.ticket !== undefined ? args.ticket : 0,
          exchange: args.exchange,
          ifUnused: args.ifUnused !== undefined ? args.ifUnused : false,
          nowait: args.nowait !== undefined ? args.nowait : false
        }
      };
    },

    deleteOk(args: ExchangeDeleteOkArgs): ExchangeDeleteOk {
      return { classId: 40, methodId: 21, payload: {} };
    },

    bind(args: ExchangeBindArgs): ExchangeBind {
      return {
        classId: 40,
        methodId: 30,
        payload: {
          ticket: args.ticket !== undefined ? args.ticket : 0,
          destination: args.destination,
          source: args.source,
          routingKey: args.routingKey !== undefined ? args.routingKey : "",
          nowait: args.nowait !== undefined ? args.nowait : false,
          arguments: args.arguments !== undefined ? args.arguments : {}
        }
      };
    },

    bindOk(args: ExchangeBindOkArgs): ExchangeBindOk {
      return { classId: 40, methodId: 31, payload: {} };
    },

    unbind(args: ExchangeUnbindArgs): ExchangeUnbind {
      return {
        classId: 40,
        methodId: 40,
        payload: {
          ticket: args.ticket !== undefined ? args.ticket : 0,
          destination: args.destination,
          source: args.source,
          routingKey: args.routingKey !== undefined ? args.routingKey : "",
          nowait: args.nowait !== undefined ? args.nowait : false,
          arguments: args.arguments !== undefined ? args.arguments : {}
        }
      };
    },

    unbindOk(args: ExchangeUnbindOkArgs): ExchangeUnbindOk {
      return { classId: 40, methodId: 51, payload: {} };
    }
  },

  queue: {
    declare(args: QueueDeclareArgs): QueueDeclare {
      return {
        classId: 50,
        methodId: 10,
        payload: {
          ticket: args.ticket !== undefined ? args.ticket : 0,
          queue: args.queue !== undefined ? args.queue : "",
          passive: args.passive !== undefined ? args.passive : false,
          durable: args.durable !== undefined ? args.durable : false,
          exclusive: args.exclusive !== undefined ? args.exclusive : false,
          autoDelete: args.autoDelete !== undefined ? args.autoDelete : false,
          nowait: args.nowait !== undefined ? args.nowait : false,
          arguments: args.arguments !== undefined ? args.arguments : {}
        }
      };
    },

    declareOk(args: QueueDeclareOkArgs): QueueDeclareOk {
      return {
        classId: 50,
        methodId: 11,
        payload: {
          queue: args.queue,
          messageCount: args.messageCount,
          consumerCount: args.consumerCount
        }
      };
    },

    bind(args: QueueBindArgs): QueueBind {
      return {
        classId: 50,
        methodId: 20,
        payload: {
          ticket: args.ticket !== undefined ? args.ticket : 0,
          queue: args.queue !== undefined ? args.queue : "",
          exchange: args.exchange,
          routingKey: args.routingKey !== undefined ? args.routingKey : "",
          nowait: args.nowait !== undefined ? args.nowait : false,
          arguments: args.arguments !== undefined ? args.arguments : {}
        }
      };
    },

    bindOk(args: QueueBindOkArgs): QueueBindOk {
      return { classId: 50, methodId: 21, payload: {} };
    },

    purge(args: QueuePurgeArgs): QueuePurge {
      return {
        classId: 50,
        methodId: 30,
        payload: {
          ticket: args.ticket !== undefined ? args.ticket : 0,
          queue: args.queue !== undefined ? args.queue : "",
          nowait: args.nowait !== undefined ? args.nowait : false
        }
      };
    },

    purgeOk(args: QueuePurgeOkArgs): QueuePurgeOk {
      return {
        classId: 50,
        methodId: 31,
        payload: { messageCount: args.messageCount }
      };
    },

    delete(args: QueueDeleteArgs): QueueDelete {
      return {
        classId: 50,
        methodId: 40,
        payload: {
          ticket: args.ticket !== undefined ? args.ticket : 0,
          queue: args.queue !== undefined ? args.queue : "",
          ifUnused: args.ifUnused !== undefined ? args.ifUnused : false,
          ifEmpty: args.ifEmpty !== undefined ? args.ifEmpty : false,
          nowait: args.nowait !== undefined ? args.nowait : false
        }
      };
    },

    deleteOk(args: QueueDeleteOkArgs): QueueDeleteOk {
      return {
        classId: 50,
        methodId: 41,
        payload: { messageCount: args.messageCount }
      };
    },

    unbind(args: QueueUnbindArgs): QueueUnbind {
      return {
        classId: 50,
        methodId: 50,
        payload: {
          ticket: args.ticket !== undefined ? args.ticket : 0,
          queue: args.queue !== undefined ? args.queue : "",
          exchange: args.exchange,
          routingKey: args.routingKey !== undefined ? args.routingKey : "",
          arguments: args.arguments !== undefined ? args.arguments : {}
        }
      };
    },

    unbindOk(args: QueueUnbindOkArgs): QueueUnbindOk {
      return { classId: 50, methodId: 51, payload: {} };
    }
  },

  basic: {
    qos(args: BasicQosArgs): BasicQos {
      return {
        classId: 60,
        methodId: 10,
        payload: {
          prefetchSize: args.prefetchSize !== undefined
            ? args.prefetchSize
            : 0,
          prefetchCount: args.prefetchCount !== undefined
            ? args.prefetchCount
            : 0,
          global: args.global !== undefined ? args.global : false
        }
      };
    },

    qosOk(args: BasicQosOkArgs): BasicQosOk {
      return { classId: 60, methodId: 11, payload: {} };
    },

    consume(args: BasicConsumeArgs): BasicConsume {
      return {
        classId: 60,
        methodId: 20,
        payload: {
          ticket: args.ticket !== undefined ? args.ticket : 0,
          queue: args.queue !== undefined ? args.queue : "",
          consumerTag: args.consumerTag !== undefined ? args.consumerTag : "",
          noLocal: args.noLocal !== undefined ? args.noLocal : false,
          noAck: args.noAck !== undefined ? args.noAck : false,
          exclusive: args.exclusive !== undefined ? args.exclusive : false,
          nowait: args.nowait !== undefined ? args.nowait : false,
          arguments: args.arguments !== undefined ? args.arguments : {}
        }
      };
    },

    consumeOk(args: BasicConsumeOkArgs): BasicConsumeOk {
      return {
        classId: 60,
        methodId: 21,
        payload: { consumerTag: args.consumerTag }
      };
    },

    cancel(args: BasicCancelArgs): BasicCancel {
      return {
        classId: 60,
        methodId: 30,
        payload: {
          consumerTag: args.consumerTag,
          nowait: args.nowait !== undefined ? args.nowait : false
        }
      };
    },

    cancelOk(args: BasicCancelOkArgs): BasicCancelOk {
      return {
        classId: 60,
        methodId: 31,
        payload: { consumerTag: args.consumerTag }
      };
    },

    publish(args: BasicPublishArgs): BasicPublish {
      return {
        classId: 60,
        methodId: 40,
        payload: {
          ticket: args.ticket !== undefined ? args.ticket : 0,
          exchange: args.exchange !== undefined ? args.exchange : "",
          routingKey: args.routingKey !== undefined ? args.routingKey : "",
          mandatory: args.mandatory !== undefined ? args.mandatory : false,
          immediate: args.immediate !== undefined ? args.immediate : false
        }
      };
    },

    return(args: BasicReturnArgs): BasicReturn {
      return {
        classId: 60,
        methodId: 50,
        payload: {
          replyCode: args.replyCode,
          replyText: args.replyText !== undefined ? args.replyText : "",
          exchange: args.exchange,
          routingKey: args.routingKey
        }
      };
    },

    deliver(args: BasicDeliverArgs): BasicDeliver {
      return {
        classId: 60,
        methodId: 60,
        payload: {
          consumerTag: args.consumerTag,
          deliveryTag: args.deliveryTag,
          redelivered: args.redelivered !== undefined
            ? args.redelivered
            : false,
          exchange: args.exchange,
          routingKey: args.routingKey
        }
      };
    },

    get(args: BasicGetArgs): BasicGet {
      return {
        classId: 60,
        methodId: 70,
        payload: {
          ticket: args.ticket !== undefined ? args.ticket : 0,
          queue: args.queue !== undefined ? args.queue : "",
          noAck: args.noAck !== undefined ? args.noAck : false
        }
      };
    },

    getOk(args: BasicGetOkArgs): BasicGetOk {
      return {
        classId: 60,
        methodId: 71,
        payload: {
          deliveryTag: args.deliveryTag,
          redelivered: args.redelivered !== undefined
            ? args.redelivered
            : false,
          exchange: args.exchange,
          routingKey: args.routingKey,
          messageCount: args.messageCount
        }
      };
    },

    getEmpty(args: BasicGetEmptyArgs): BasicGetEmpty {
      return {
        classId: 60,
        methodId: 72,
        payload: {
          clusterId: args.clusterId !== undefined ? args.clusterId : ""
        }
      };
    },

    ack(args: BasicAckArgs): BasicAck {
      return {
        classId: 60,
        methodId: 80,
        payload: {
          deliveryTag: args.deliveryTag !== undefined ? args.deliveryTag : 0,
          multiple: args.multiple !== undefined ? args.multiple : false
        }
      };
    },

    reject(args: BasicRejectArgs): BasicReject {
      return {
        classId: 60,
        methodId: 90,
        payload: {
          deliveryTag: args.deliveryTag,
          requeue: args.requeue !== undefined ? args.requeue : true
        }
      };
    },

    recoverAsync(args: BasicRecoverAsyncArgs): BasicRecoverAsync {
      return {
        classId: 60,
        methodId: 100,
        payload: {
          requeue: args.requeue !== undefined ? args.requeue : false
        }
      };
    },

    recover(args: BasicRecoverArgs): BasicRecover {
      return {
        classId: 60,
        methodId: 110,
        payload: {
          requeue: args.requeue !== undefined ? args.requeue : false
        }
      };
    },

    recoverOk(args: BasicRecoverOkArgs): BasicRecoverOk {
      return { classId: 60, methodId: 111, payload: {} };
    },

    nack(args: BasicNackArgs): BasicNack {
      return {
        classId: 60,
        methodId: 120,
        payload: {
          deliveryTag: args.deliveryTag !== undefined ? args.deliveryTag : 0,
          multiple: args.multiple !== undefined ? args.multiple : false,
          requeue: args.requeue !== undefined ? args.requeue : true
        }
      };
    }
  },

  tx: {
    select(args: TxSelectArgs): TxSelect {
      return { classId: 90, methodId: 10, payload: {} };
    },

    selectOk(args: TxSelectOkArgs): TxSelectOk {
      return { classId: 90, methodId: 11, payload: {} };
    },

    commit(args: TxCommitArgs): TxCommit {
      return { classId: 90, methodId: 20, payload: {} };
    },

    commitOk(args: TxCommitOkArgs): TxCommitOk {
      return { classId: 90, methodId: 21, payload: {} };
    },

    rollback(args: TxRollbackArgs): TxRollback {
      return { classId: 90, methodId: 30, payload: {} };
    },

    rollbackOk(args: TxRollbackOkArgs): TxRollbackOk {
      return { classId: 90, methodId: 31, payload: {} };
    }
  },

  confirm: {
    select(args: ConfirmSelectArgs): ConfirmSelect {
      return {
        classId: 85,
        methodId: 10,
        payload: { nowait: args.nowait !== undefined ? args.nowait : false }
      };
    },

    selectOk(args: ConfirmSelectOkArgs): ConfirmSelectOk {
      return { classId: 85, methodId: 11, payload: {} };
    }
  }
};

export type Header = ConnectionHeader | ChannelHeader | AccessHeader
  | ExchangeHeader | QueueHeader | BasicHeader | TxHeader | ConfirmHeader;

export type Method = ConnectionStart | ConnectionStartOk | ConnectionSecure
  | ConnectionSecureOk | ConnectionTune | ConnectionTuneOk | ConnectionOpen
  | ConnectionOpenOk | ConnectionClose | ConnectionCloseOk | ConnectionBlocked
  | ConnectionUnblocked | ConnectionUpdateSecret | ConnectionUpdateSecretOk
  | ChannelOpen | ChannelOpenOk | ChannelFlow | ChannelFlowOk | ChannelClose
  | ChannelCloseOk | AccessRequest | AccessRequestOk | ExchangeDeclare
  | ExchangeDeclareOk | ExchangeDelete | ExchangeDeleteOk | ExchangeBind
  | ExchangeBindOk | ExchangeUnbind | ExchangeUnbindOk | QueueDeclare
  | QueueDeclareOk | QueueBind | QueueBindOk | QueuePurge | QueuePurgeOk
  | QueueDelete | QueueDeleteOk | QueueUnbind | QueueUnbindOk | BasicQos
  | BasicQosOk | BasicConsume | BasicConsumeOk | BasicCancel | BasicCancelOk
  | BasicPublish | BasicReturn | BasicDeliver | BasicGet | BasicGetOk
  | BasicGetEmpty | BasicAck | BasicReject | BasicRecoverAsync | BasicRecover
  | BasicRecoverOk | BasicNack | TxSelect | TxSelectOk | TxCommit | TxCommitOk
  | TxRollback | TxRollbackOk | ConfirmSelect | ConfirmSelectOk;

export function encodeMethod(method: Method): Uint8Array {
  const writer = new Deno.Buffer();
  writer.writeSync(enc.encodeShortUint(method.classId));
  writer.writeSync(enc.encodeShortUint(method.methodId));
  switch (method.classId) {
    case 10:
      {
        switch (method.methodId) {
          case 10:
            writer.writeSync(enc.encodeFields([
              { type: "octet", value: method.payload.versionMajor },
              { type: "octet", value: method.payload.versionMinor },
              { type: "table", value: method.payload.serverProperties },
              { type: "longstr", value: method.payload.mechanisms },
              { type: "longstr", value: method.payload.locales }
            ]));
            break;
          case 11:
            writer.writeSync(enc.encodeFields([
              { type: "table", value: method.payload.clientProperties },
              { type: "shortstr", value: method.payload.mechanism },
              { type: "longstr", value: method.payload.response },
              { type: "shortstr", value: method.payload.locale }
            ]));
            break;
          case 20:
            writer.writeSync(enc.encodeFields([
              { type: "longstr", value: method.payload.challenge }
            ]));
            break;
          case 21:
            writer.writeSync(enc.encodeFields([
              { type: "longstr", value: method.payload.response }
            ]));
            break;
          case 30:
            writer.writeSync(enc.encodeFields([
              { type: "short", value: method.payload.channelMax },
              { type: "long", value: method.payload.frameMax },
              { type: "short", value: method.payload.heartbeat }
            ]));
            break;
          case 31:
            writer.writeSync(enc.encodeFields([
              { type: "short", value: method.payload.channelMax },
              { type: "long", value: method.payload.frameMax },
              { type: "short", value: method.payload.heartbeat }
            ]));
            break;
          case 40:
            writer.writeSync(enc.encodeFields([
              { type: "shortstr", value: method.payload.virtualHost },
              { type: "shortstr", value: method.payload.capabilities },
              { type: "bit", value: method.payload.insist }
            ]));
            break;
          case 41:
            writer.writeSync(enc.encodeFields([
              { type: "shortstr", value: method.payload.knownHosts }
            ]));
            break;
          case 50:
            writer.writeSync(enc.encodeFields([
              { type: "short", value: method.payload.replyCode },
              { type: "shortstr", value: method.payload.replyText },
              { type: "short", value: method.payload.classId },
              { type: "short", value: method.payload.methodId }
            ]));
            break;
          case 51:
            writer.writeSync(enc.encodeFields([]));
            break;
          case 60:
            writer.writeSync(enc.encodeFields([
              { type: "shortstr", value: method.payload.reason }
            ]));
            break;
          case 61:
            writer.writeSync(enc.encodeFields([]));
            break;
          case 70:
            writer.writeSync(enc.encodeFields([
              { type: "longstr", value: method.payload.newSecret },
              { type: "shortstr", value: method.payload.reason }
            ]));
            break;
          case 71:
            writer.writeSync(enc.encodeFields([]));
            break;
        }
      }
      break;

    case 20:
      {
        switch (method.methodId) {
          case 10:
            writer.writeSync(enc.encodeFields([
              { type: "shortstr", value: method.payload.outOfBand }
            ]));
            break;
          case 11:
            writer.writeSync(enc.encodeFields([
              { type: "longstr", value: method.payload.channelId }
            ]));
            break;
          case 20:
            writer.writeSync(enc.encodeFields([
              { type: "bit", value: method.payload.active }
            ]));
            break;
          case 21:
            writer.writeSync(enc.encodeFields([
              { type: "bit", value: method.payload.active }
            ]));
            break;
          case 40:
            writer.writeSync(enc.encodeFields([
              { type: "short", value: method.payload.replyCode },
              { type: "shortstr", value: method.payload.replyText },
              { type: "short", value: method.payload.classId },
              { type: "short", value: method.payload.methodId }
            ]));
            break;
          case 41:
            writer.writeSync(enc.encodeFields([]));
            break;
        }
      }
      break;

    case 30:
      {
        switch (method.methodId) {
          case 10:
            writer.writeSync(enc.encodeFields([
              { type: "shortstr", value: method.payload.realm },
              { type: "bit", value: method.payload.exclusive },
              { type: "bit", value: method.payload.passive },
              { type: "bit", value: method.payload.active },
              { type: "bit", value: method.payload.write },
              { type: "bit", value: method.payload.read }
            ]));
            break;
          case 11:
            writer.writeSync(enc.encodeFields([
              { type: "short", value: method.payload.ticket }
            ]));
            break;
        }
      }
      break;

    case 40:
      {
        switch (method.methodId) {
          case 10:
            writer.writeSync(enc.encodeFields([
              { type: "short", value: method.payload.ticket },
              { type: "shortstr", value: method.payload.exchange },
              { type: "shortstr", value: method.payload.type },
              { type: "bit", value: method.payload.passive },
              { type: "bit", value: method.payload.durable },
              { type: "bit", value: method.payload.autoDelete },
              { type: "bit", value: method.payload.internal },
              { type: "bit", value: method.payload.nowait },
              { type: "table", value: method.payload.arguments }
            ]));
            break;
          case 11:
            writer.writeSync(enc.encodeFields([]));
            break;
          case 20:
            writer.writeSync(enc.encodeFields([
              { type: "short", value: method.payload.ticket },
              { type: "shortstr", value: method.payload.exchange },
              { type: "bit", value: method.payload.ifUnused },
              { type: "bit", value: method.payload.nowait }
            ]));
            break;
          case 21:
            writer.writeSync(enc.encodeFields([]));
            break;
          case 30:
            writer.writeSync(enc.encodeFields([
              { type: "short", value: method.payload.ticket },
              { type: "shortstr", value: method.payload.destination },
              { type: "shortstr", value: method.payload.source },
              { type: "shortstr", value: method.payload.routingKey },
              { type: "bit", value: method.payload.nowait },
              { type: "table", value: method.payload.arguments }
            ]));
            break;
          case 31:
            writer.writeSync(enc.encodeFields([]));
            break;
          case 40:
            writer.writeSync(enc.encodeFields([
              { type: "short", value: method.payload.ticket },
              { type: "shortstr", value: method.payload.destination },
              { type: "shortstr", value: method.payload.source },
              { type: "shortstr", value: method.payload.routingKey },
              { type: "bit", value: method.payload.nowait },
              { type: "table", value: method.payload.arguments }
            ]));
            break;
          case 51:
            writer.writeSync(enc.encodeFields([]));
            break;
        }
      }
      break;

    case 50:
      {
        switch (method.methodId) {
          case 10:
            writer.writeSync(enc.encodeFields([
              { type: "short", value: method.payload.ticket },
              { type: "shortstr", value: method.payload.queue },
              { type: "bit", value: method.payload.passive },
              { type: "bit", value: method.payload.durable },
              { type: "bit", value: method.payload.exclusive },
              { type: "bit", value: method.payload.autoDelete },
              { type: "bit", value: method.payload.nowait },
              { type: "table", value: method.payload.arguments }
            ]));
            break;
          case 11:
            writer.writeSync(enc.encodeFields([
              { type: "shortstr", value: method.payload.queue },
              { type: "long", value: method.payload.messageCount },
              { type: "long", value: method.payload.consumerCount }
            ]));
            break;
          case 20:
            writer.writeSync(enc.encodeFields([
              { type: "short", value: method.payload.ticket },
              { type: "shortstr", value: method.payload.queue },
              { type: "shortstr", value: method.payload.exchange },
              { type: "shortstr", value: method.payload.routingKey },
              { type: "bit", value: method.payload.nowait },
              { type: "table", value: method.payload.arguments }
            ]));
            break;
          case 21:
            writer.writeSync(enc.encodeFields([]));
            break;
          case 30:
            writer.writeSync(enc.encodeFields([
              { type: "short", value: method.payload.ticket },
              { type: "shortstr", value: method.payload.queue },
              { type: "bit", value: method.payload.nowait }
            ]));
            break;
          case 31:
            writer.writeSync(enc.encodeFields([
              { type: "long", value: method.payload.messageCount }
            ]));
            break;
          case 40:
            writer.writeSync(enc.encodeFields([
              { type: "short", value: method.payload.ticket },
              { type: "shortstr", value: method.payload.queue },
              { type: "bit", value: method.payload.ifUnused },
              { type: "bit", value: method.payload.ifEmpty },
              { type: "bit", value: method.payload.nowait }
            ]));
            break;
          case 41:
            writer.writeSync(enc.encodeFields([
              { type: "long", value: method.payload.messageCount }
            ]));
            break;
          case 50:
            writer.writeSync(enc.encodeFields([
              { type: "short", value: method.payload.ticket },
              { type: "shortstr", value: method.payload.queue },
              { type: "shortstr", value: method.payload.exchange },
              { type: "shortstr", value: method.payload.routingKey },
              { type: "table", value: method.payload.arguments }
            ]));
            break;
          case 51:
            writer.writeSync(enc.encodeFields([]));
            break;
        }
      }
      break;

    case 60:
      {
        switch (method.methodId) {
          case 10:
            writer.writeSync(enc.encodeFields([
              { type: "long", value: method.payload.prefetchSize },
              { type: "short", value: method.payload.prefetchCount },
              { type: "bit", value: method.payload.global }
            ]));
            break;
          case 11:
            writer.writeSync(enc.encodeFields([]));
            break;
          case 20:
            writer.writeSync(enc.encodeFields([
              { type: "short", value: method.payload.ticket },
              { type: "shortstr", value: method.payload.queue },
              { type: "shortstr", value: method.payload.consumerTag },
              { type: "bit", value: method.payload.noLocal },
              { type: "bit", value: method.payload.noAck },
              { type: "bit", value: method.payload.exclusive },
              { type: "bit", value: method.payload.nowait },
              { type: "table", value: method.payload.arguments }
            ]));
            break;
          case 21:
            writer.writeSync(enc.encodeFields([
              { type: "shortstr", value: method.payload.consumerTag }
            ]));
            break;
          case 30:
            writer.writeSync(enc.encodeFields([
              { type: "shortstr", value: method.payload.consumerTag },
              { type: "bit", value: method.payload.nowait }
            ]));
            break;
          case 31:
            writer.writeSync(enc.encodeFields([
              { type: "shortstr", value: method.payload.consumerTag }
            ]));
            break;
          case 40:
            writer.writeSync(enc.encodeFields([
              { type: "short", value: method.payload.ticket },
              { type: "shortstr", value: method.payload.exchange },
              { type: "shortstr", value: method.payload.routingKey },
              { type: "bit", value: method.payload.mandatory },
              { type: "bit", value: method.payload.immediate }
            ]));
            break;
          case 50:
            writer.writeSync(enc.encodeFields([
              { type: "short", value: method.payload.replyCode },
              { type: "shortstr", value: method.payload.replyText },
              { type: "shortstr", value: method.payload.exchange },
              { type: "shortstr", value: method.payload.routingKey }
            ]));
            break;
          case 60:
            writer.writeSync(enc.encodeFields([
              { type: "shortstr", value: method.payload.consumerTag },
              { type: "longlong", value: method.payload.deliveryTag },
              { type: "bit", value: method.payload.redelivered },
              { type: "shortstr", value: method.payload.exchange },
              { type: "shortstr", value: method.payload.routingKey }
            ]));
            break;
          case 70:
            writer.writeSync(enc.encodeFields([
              { type: "short", value: method.payload.ticket },
              { type: "shortstr", value: method.payload.queue },
              { type: "bit", value: method.payload.noAck }
            ]));
            break;
          case 71:
            writer.writeSync(enc.encodeFields([
              { type: "longlong", value: method.payload.deliveryTag },
              { type: "bit", value: method.payload.redelivered },
              { type: "shortstr", value: method.payload.exchange },
              { type: "shortstr", value: method.payload.routingKey },
              { type: "long", value: method.payload.messageCount }
            ]));
            break;
          case 72:
            writer.writeSync(enc.encodeFields([
              { type: "shortstr", value: method.payload.clusterId }
            ]));
            break;
          case 80:
            writer.writeSync(enc.encodeFields([
              { type: "longlong", value: method.payload.deliveryTag },
              { type: "bit", value: method.payload.multiple }
            ]));
            break;
          case 90:
            writer.writeSync(enc.encodeFields([
              { type: "longlong", value: method.payload.deliveryTag },
              { type: "bit", value: method.payload.requeue }
            ]));
            break;
          case 100:
            writer.writeSync(enc.encodeFields([
              { type: "bit", value: method.payload.requeue }
            ]));
            break;
          case 110:
            writer.writeSync(enc.encodeFields([
              { type: "bit", value: method.payload.requeue }
            ]));
            break;
          case 111:
            writer.writeSync(enc.encodeFields([]));
            break;
          case 120:
            writer.writeSync(enc.encodeFields([
              { type: "longlong", value: method.payload.deliveryTag },
              { type: "bit", value: method.payload.multiple },
              { type: "bit", value: method.payload.requeue }
            ]));
            break;
        }
      }
      break;

    case 90:
      {
        switch (method.methodId) {
          case 10:
            writer.writeSync(enc.encodeFields([]));
            break;
          case 11:
            writer.writeSync(enc.encodeFields([]));
            break;
          case 20:
            writer.writeSync(enc.encodeFields([]));
            break;
          case 21:
            writer.writeSync(enc.encodeFields([]));
            break;
          case 30:
            writer.writeSync(enc.encodeFields([]));
            break;
          case 31:
            writer.writeSync(enc.encodeFields([]));
            break;
        }
      }
      break;

    case 85:
      {
        switch (method.methodId) {
          case 10:
            writer.writeSync(enc.encodeFields([
              { type: "bit", value: method.payload.nowait }
            ]));
            break;
          case 11:
            writer.writeSync(enc.encodeFields([]));
            break;
        }
      }
      break;
  }
  return writer.bytes();
}

export function decodeMethod(r: Deno.SyncReader): Method {
  const classId = enc.decodeShortUint(r);
  const methodId = enc.decodeShortUint(r);
  switch (classId) {
    case 10: {
      switch (methodId) {
        case 10: {
          const fields = enc.decodeFields(
            r,
            ["octet", "octet", "table", "longstr", "longstr"]
          );
          const payload = {
            versionMajor: fields[0].value,
            versionMinor: fields[1].value,
            serverProperties: fields[2].value,
            mechanisms: fields[3].value,
            locales: fields[4].value
          };
          return { classId: 10, methodId: 10, payload };
        }
        case 11: {
          const fields = enc.decodeFields(
            r,
            ["table", "shortstr", "longstr", "shortstr"]
          );
          const payload = {
            clientProperties: fields[0].value,
            mechanism: fields[1].value,
            response: fields[2].value,
            locale: fields[3].value
          };
          return { classId: 10, methodId: 11, payload };
        }
        case 20: {
          const fields = enc.decodeFields(r, ["longstr"]);
          const payload = { challenge: fields[0].value };
          return { classId: 10, methodId: 20, payload };
        }
        case 21: {
          const fields = enc.decodeFields(r, ["longstr"]);
          const payload = { response: fields[0].value };
          return { classId: 10, methodId: 21, payload };
        }
        case 30: {
          const fields = enc.decodeFields(r, ["short", "long", "short"]);
          const payload = {
            channelMax: fields[0].value,
            frameMax: fields[1].value,
            heartbeat: fields[2].value
          };
          return { classId: 10, methodId: 30, payload };
        }
        case 31: {
          const fields = enc.decodeFields(r, ["short", "long", "short"]);
          const payload = {
            channelMax: fields[0].value,
            frameMax: fields[1].value,
            heartbeat: fields[2].value
          };
          return { classId: 10, methodId: 31, payload };
        }
        case 40: {
          const fields = enc.decodeFields(r, ["shortstr", "shortstr", "bit"]);
          const payload = {
            virtualHost: fields[0].value,
            capabilities: fields[1].value,
            insist: fields[2].value
          };
          return { classId: 10, methodId: 40, payload };
        }
        case 41: {
          const fields = enc.decodeFields(r, ["shortstr"]);
          const payload = { knownHosts: fields[0].value };
          return { classId: 10, methodId: 41, payload };
        }
        case 50: {
          const fields = enc.decodeFields(
            r,
            ["short", "shortstr", "short", "short"]
          );
          const payload = {
            replyCode: fields[0].value,
            replyText: fields[1].value,
            classId: fields[2].value,
            methodId: fields[3].value
          };
          return { classId: 10, methodId: 50, payload };
        }
        case 51: {
          const fields = enc.decodeFields(r, []);
          const payload = {};
          return { classId: 10, methodId: 51, payload };
        }
        case 60: {
          const fields = enc.decodeFields(r, ["shortstr"]);
          const payload = { reason: fields[0].value };
          return { classId: 10, methodId: 60, payload };
        }
        case 61: {
          const fields = enc.decodeFields(r, []);
          const payload = {};
          return { classId: 10, methodId: 61, payload };
        }
        case 70: {
          const fields = enc.decodeFields(r, ["longstr", "shortstr"]);
          const payload = {
            newSecret: fields[0].value,
            reason: fields[1].value
          };
          return { classId: 10, methodId: 70, payload };
        }
        case 71: {
          const fields = enc.decodeFields(r, []);
          const payload = {};
          return { classId: 10, methodId: 71, payload };
        }
      }
    }

    case 20: {
      switch (methodId) {
        case 10: {
          const fields = enc.decodeFields(r, ["shortstr"]);
          const payload = { outOfBand: fields[0].value };
          return { classId: 20, methodId: 10, payload };
        }
        case 11: {
          const fields = enc.decodeFields(r, ["longstr"]);
          const payload = { channelId: fields[0].value };
          return { classId: 20, methodId: 11, payload };
        }
        case 20: {
          const fields = enc.decodeFields(r, ["bit"]);
          const payload = { active: fields[0].value };
          return { classId: 20, methodId: 20, payload };
        }
        case 21: {
          const fields = enc.decodeFields(r, ["bit"]);
          const payload = { active: fields[0].value };
          return { classId: 20, methodId: 21, payload };
        }
        case 40: {
          const fields = enc.decodeFields(
            r,
            ["short", "shortstr", "short", "short"]
          );
          const payload = {
            replyCode: fields[0].value,
            replyText: fields[1].value,
            classId: fields[2].value,
            methodId: fields[3].value
          };
          return { classId: 20, methodId: 40, payload };
        }
        case 41: {
          const fields = enc.decodeFields(r, []);
          const payload = {};
          return { classId: 20, methodId: 41, payload };
        }
      }
    }

    case 30: {
      switch (methodId) {
        case 10: {
          const fields = enc.decodeFields(
            r,
            ["shortstr", "bit", "bit", "bit", "bit", "bit"]
          );
          const payload = {
            realm: fields[0].value,
            exclusive: fields[1].value,
            passive: fields[2].value,
            active: fields[3].value,
            write: fields[4].value,
            read: fields[5].value
          };
          return { classId: 30, methodId: 10, payload };
        }
        case 11: {
          const fields = enc.decodeFields(r, ["short"]);
          const payload = { ticket: fields[0].value };
          return { classId: 30, methodId: 11, payload };
        }
      }
    }

    case 40: {
      switch (methodId) {
        case 10: {
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
          const payload = {
            ticket: fields[0].value,
            exchange: fields[1].value,
            type: fields[2].value,
            passive: fields[3].value,
            durable: fields[4].value,
            autoDelete: fields[5].value,
            internal: fields[6].value,
            nowait: fields[7].value,
            arguments: fields[8].value
          };
          return { classId: 40, methodId: 10, payload };
        }
        case 11: {
          const fields = enc.decodeFields(r, []);
          const payload = {};
          return { classId: 40, methodId: 11, payload };
        }
        case 20: {
          const fields = enc.decodeFields(
            r,
            ["short", "shortstr", "bit", "bit"]
          );
          const payload = {
            ticket: fields[0].value,
            exchange: fields[1].value,
            ifUnused: fields[2].value,
            nowait: fields[3].value
          };
          return { classId: 40, methodId: 20, payload };
        }
        case 21: {
          const fields = enc.decodeFields(r, []);
          const payload = {};
          return { classId: 40, methodId: 21, payload };
        }
        case 30: {
          const fields = enc.decodeFields(
            r,
            ["short", "shortstr", "shortstr", "shortstr", "bit", "table"]
          );
          const payload = {
            ticket: fields[0].value,
            destination: fields[1].value,
            source: fields[2].value,
            routingKey: fields[3].value,
            nowait: fields[4].value,
            arguments: fields[5].value
          };
          return { classId: 40, methodId: 30, payload };
        }
        case 31: {
          const fields = enc.decodeFields(r, []);
          const payload = {};
          return { classId: 40, methodId: 31, payload };
        }
        case 40: {
          const fields = enc.decodeFields(
            r,
            ["short", "shortstr", "shortstr", "shortstr", "bit", "table"]
          );
          const payload = {
            ticket: fields[0].value,
            destination: fields[1].value,
            source: fields[2].value,
            routingKey: fields[3].value,
            nowait: fields[4].value,
            arguments: fields[5].value
          };
          return { classId: 40, methodId: 40, payload };
        }
        case 51: {
          const fields = enc.decodeFields(r, []);
          const payload = {};
          return { classId: 40, methodId: 51, payload };
        }
      }
    }

    case 50: {
      switch (methodId) {
        case 10: {
          const fields = enc.decodeFields(
            r,
            ["short", "shortstr", "bit", "bit", "bit", "bit", "bit", "table"]
          );
          const payload = {
            ticket: fields[0].value,
            queue: fields[1].value,
            passive: fields[2].value,
            durable: fields[3].value,
            exclusive: fields[4].value,
            autoDelete: fields[5].value,
            nowait: fields[6].value,
            arguments: fields[7].value
          };
          return { classId: 50, methodId: 10, payload };
        }
        case 11: {
          const fields = enc.decodeFields(r, ["shortstr", "long", "long"]);
          const payload = {
            queue: fields[0].value,
            messageCount: fields[1].value,
            consumerCount: fields[2].value
          };
          return { classId: 50, methodId: 11, payload };
        }
        case 20: {
          const fields = enc.decodeFields(
            r,
            ["short", "shortstr", "shortstr", "shortstr", "bit", "table"]
          );
          const payload = {
            ticket: fields[0].value,
            queue: fields[1].value,
            exchange: fields[2].value,
            routingKey: fields[3].value,
            nowait: fields[4].value,
            arguments: fields[5].value
          };
          return { classId: 50, methodId: 20, payload };
        }
        case 21: {
          const fields = enc.decodeFields(r, []);
          const payload = {};
          return { classId: 50, methodId: 21, payload };
        }
        case 30: {
          const fields = enc.decodeFields(r, ["short", "shortstr", "bit"]);
          const payload = {
            ticket: fields[0].value,
            queue: fields[1].value,
            nowait: fields[2].value
          };
          return { classId: 50, methodId: 30, payload };
        }
        case 31: {
          const fields = enc.decodeFields(r, ["long"]);
          const payload = { messageCount: fields[0].value };
          return { classId: 50, methodId: 31, payload };
        }
        case 40: {
          const fields = enc.decodeFields(
            r,
            ["short", "shortstr", "bit", "bit", "bit"]
          );
          const payload = {
            ticket: fields[0].value,
            queue: fields[1].value,
            ifUnused: fields[2].value,
            ifEmpty: fields[3].value,
            nowait: fields[4].value
          };
          return { classId: 50, methodId: 40, payload };
        }
        case 41: {
          const fields = enc.decodeFields(r, ["long"]);
          const payload = { messageCount: fields[0].value };
          return { classId: 50, methodId: 41, payload };
        }
        case 50: {
          const fields = enc.decodeFields(
            r,
            ["short", "shortstr", "shortstr", "shortstr", "table"]
          );
          const payload = {
            ticket: fields[0].value,
            queue: fields[1].value,
            exchange: fields[2].value,
            routingKey: fields[3].value,
            arguments: fields[4].value
          };
          return { classId: 50, methodId: 50, payload };
        }
        case 51: {
          const fields = enc.decodeFields(r, []);
          const payload = {};
          return { classId: 50, methodId: 51, payload };
        }
      }
    }

    case 60: {
      switch (methodId) {
        case 10: {
          const fields = enc.decodeFields(r, ["long", "short", "bit"]);
          const payload = {
            prefetchSize: fields[0].value,
            prefetchCount: fields[1].value,
            global: fields[2].value
          };
          return { classId: 60, methodId: 10, payload };
        }
        case 11: {
          const fields = enc.decodeFields(r, []);
          const payload = {};
          return { classId: 60, methodId: 11, payload };
        }
        case 20: {
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
              "table"
            ]
          );
          const payload = {
            ticket: fields[0].value,
            queue: fields[1].value,
            consumerTag: fields[2].value,
            noLocal: fields[3].value,
            noAck: fields[4].value,
            exclusive: fields[5].value,
            nowait: fields[6].value,
            arguments: fields[7].value
          };
          return { classId: 60, methodId: 20, payload };
        }
        case 21: {
          const fields = enc.decodeFields(r, ["shortstr"]);
          const payload = { consumerTag: fields[0].value };
          return { classId: 60, methodId: 21, payload };
        }
        case 30: {
          const fields = enc.decodeFields(r, ["shortstr", "bit"]);
          const payload = {
            consumerTag: fields[0].value,
            nowait: fields[1].value
          };
          return { classId: 60, methodId: 30, payload };
        }
        case 31: {
          const fields = enc.decodeFields(r, ["shortstr"]);
          const payload = { consumerTag: fields[0].value };
          return { classId: 60, methodId: 31, payload };
        }
        case 40: {
          const fields = enc.decodeFields(
            r,
            ["short", "shortstr", "shortstr", "bit", "bit"]
          );
          const payload = {
            ticket: fields[0].value,
            exchange: fields[1].value,
            routingKey: fields[2].value,
            mandatory: fields[3].value,
            immediate: fields[4].value
          };
          return { classId: 60, methodId: 40, payload };
        }
        case 50: {
          const fields = enc.decodeFields(
            r,
            ["short", "shortstr", "shortstr", "shortstr"]
          );
          const payload = {
            replyCode: fields[0].value,
            replyText: fields[1].value,
            exchange: fields[2].value,
            routingKey: fields[3].value
          };
          return { classId: 60, methodId: 50, payload };
        }
        case 60: {
          const fields = enc.decodeFields(
            r,
            ["shortstr", "longlong", "bit", "shortstr", "shortstr"]
          );
          const payload = {
            consumerTag: fields[0].value,
            deliveryTag: fields[1].value,
            redelivered: fields[2].value,
            exchange: fields[3].value,
            routingKey: fields[4].value
          };
          return { classId: 60, methodId: 60, payload };
        }
        case 70: {
          const fields = enc.decodeFields(r, ["short", "shortstr", "bit"]);
          const payload = {
            ticket: fields[0].value,
            queue: fields[1].value,
            noAck: fields[2].value
          };
          return { classId: 60, methodId: 70, payload };
        }
        case 71: {
          const fields = enc.decodeFields(
            r,
            ["longlong", "bit", "shortstr", "shortstr", "long"]
          );
          const payload = {
            deliveryTag: fields[0].value,
            redelivered: fields[1].value,
            exchange: fields[2].value,
            routingKey: fields[3].value,
            messageCount: fields[4].value
          };
          return { classId: 60, methodId: 71, payload };
        }
        case 72: {
          const fields = enc.decodeFields(r, ["shortstr"]);
          const payload = { clusterId: fields[0].value };
          return { classId: 60, methodId: 72, payload };
        }
        case 80: {
          const fields = enc.decodeFields(r, ["longlong", "bit"]);
          const payload = {
            deliveryTag: fields[0].value,
            multiple: fields[1].value
          };
          return { classId: 60, methodId: 80, payload };
        }
        case 90: {
          const fields = enc.decodeFields(r, ["longlong", "bit"]);
          const payload = {
            deliveryTag: fields[0].value,
            requeue: fields[1].value
          };
          return { classId: 60, methodId: 90, payload };
        }
        case 100: {
          const fields = enc.decodeFields(r, ["bit"]);
          const payload = { requeue: fields[0].value };
          return { classId: 60, methodId: 100, payload };
        }
        case 110: {
          const fields = enc.decodeFields(r, ["bit"]);
          const payload = { requeue: fields[0].value };
          return { classId: 60, methodId: 110, payload };
        }
        case 111: {
          const fields = enc.decodeFields(r, []);
          const payload = {};
          return { classId: 60, methodId: 111, payload };
        }
        case 120: {
          const fields = enc.decodeFields(r, ["longlong", "bit", "bit"]);
          const payload = {
            deliveryTag: fields[0].value,
            multiple: fields[1].value,
            requeue: fields[2].value
          };
          return { classId: 60, methodId: 120, payload };
        }
      }
    }

    case 90: {
      switch (methodId) {
        case 10: {
          const fields = enc.decodeFields(r, []);
          const payload = {};
          return { classId: 90, methodId: 10, payload };
        }
        case 11: {
          const fields = enc.decodeFields(r, []);
          const payload = {};
          return { classId: 90, methodId: 11, payload };
        }
        case 20: {
          const fields = enc.decodeFields(r, []);
          const payload = {};
          return { classId: 90, methodId: 20, payload };
        }
        case 21: {
          const fields = enc.decodeFields(r, []);
          const payload = {};
          return { classId: 90, methodId: 21, payload };
        }
        case 30: {
          const fields = enc.decodeFields(r, []);
          const payload = {};
          return { classId: 90, methodId: 30, payload };
        }
        case 31: {
          const fields = enc.decodeFields(r, []);
          const payload = {};
          return { classId: 90, methodId: 31, payload };
        }
      }
    }

    case 85: {
      switch (methodId) {
        case 10: {
          const fields = enc.decodeFields(r, ["bit"]);
          const payload = { nowait: fields[0].value };
          return { classId: 85, methodId: 10, payload };
        }
        case 11: {
          const fields = enc.decodeFields(r, []);
          const payload = {};
          return { classId: 85, methodId: 11, payload };
        }
      }
    }
  }

  throw new Error(`Unknown method ${classId} ${methodId}`);
}

export function encodeHeader(header: Header) {
  const writer = new Deno.Buffer();
  writer.writeSync(enc.encodeShortUint(header.classId));
  writer.writeSync(enc.encodeShortUint(header.weight)); // weight
  writer.writeSync(enc.encodeLongUint(0)); // high byte size
  writer.writeSync(enc.encodeLongUint(header.size));

  switch (header.classId) {
    case 10:
      {
        writer.writeSync(enc.encodeProperties([]));
      }
      break;
    case 20:
      {
        writer.writeSync(enc.encodeProperties([]));
      }
      break;
    case 30:
      {
        writer.writeSync(enc.encodeProperties([]));
      }
      break;
    case 40:
      {
        writer.writeSync(enc.encodeProperties([]));
      }
      break;
    case 50:
      {
        writer.writeSync(enc.encodeProperties([]));
      }
      break;
    case 60:
      {
        writer.writeSync(enc.encodeProperties([
          { type: "shortstr", value: header.props.contentType },
          { type: "shortstr", value: header.props.contentEncoding },
          { type: "table", value: header.props.headers },
          { type: "octet", value: header.props.deliveryMode },
          { type: "octet", value: header.props.priority },
          { type: "shortstr", value: header.props.correlationId },
          { type: "shortstr", value: header.props.replyTo },
          { type: "shortstr", value: header.props.expiration },
          { type: "shortstr", value: header.props.messageId },
          { type: "timestamp", value: header.props.timestamp },
          { type: "shortstr", value: header.props.type },
          { type: "shortstr", value: header.props.userId },
          { type: "shortstr", value: header.props.appId },
          { type: "shortstr", value: header.props.clusterId }
        ]));
      }
      break;
    case 90:
      {
        writer.writeSync(enc.encodeProperties([]));
      }
      break;
    case 85:
      {
        writer.writeSync(enc.encodeProperties([]));
      }
      break;
  }
  return writer.bytes();
}

export function decodeHeader(r: Deno.SyncReader): Header {
  const classId = enc.decodeShortUint(r);
  const weight = enc.decodeShortUint(r);
  enc.decodeLongUint(r); // size high bytes
  const size = enc.decodeLongUint(r);
  switch (classId) {
    case 10: {
      const fields = enc.decodeProperties(r, []);
      const props = {};

      return { weight, classId, props, size };
    }
    case 20: {
      const fields = enc.decodeProperties(r, []);
      const props = {};

      return { weight, classId, props, size };
    }
    case 30: {
      const fields = enc.decodeProperties(r, []);
      const props = {};

      return { weight, classId, props, size };
    }
    case 40: {
      const fields = enc.decodeProperties(r, []);
      const props = {};

      return { weight, classId, props, size };
    }
    case 50: {
      const fields = enc.decodeProperties(r, []);
      const props = {};

      return { weight, classId, props, size };
    }
    case 60: {
      const fields = enc.decodeProperties(
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
        contentType: fields[0].value,
        contentEncoding: fields[1].value,
        headers: fields[2].value,
        deliveryMode: fields[3].value,
        priority: fields[4].value,
        correlationId: fields[5].value,
        replyTo: fields[6].value,
        expiration: fields[7].value,
        messageId: fields[8].value,
        timestamp: fields[9].value,
        type: fields[10].value,
        userId: fields[11].value,
        appId: fields[12].value,
        clusterId: fields[13].value
      };

      return { weight, classId, props, size };
    }
    case 90: {
      const fields = enc.decodeProperties(r, []);
      const props = {};

      return { weight, classId, props, size };
    }
    case 85: {
      const fields = enc.decodeProperties(r, []);
      const props = {};

      return { weight, classId, props, size };
    }
  }

  throw new Error(`Unknown class ${classId}`);
}

export function hasContent(m: Method) {
  switch (m.classId) {
    case 10:
      switch (m.methodId) {
      }
      break;

    case 20:
      switch (m.methodId) {
      }
      break;

    case 30:
      switch (m.methodId) {
      }
      break;

    case 40:
      switch (m.methodId) {
      }
      break;

    case 50:
      switch (m.methodId) {
      }
      break;

    case 60:
      switch (m.methodId) {
        case 40:
          return true;
        case 50:
          return true;
        case 60:
          return true;

        case 71:
          return true;
      }
      break;

    case 90:
      switch (m.methodId) {
      }
      break;

    case 85:
      switch (m.methodId) {
      }
      break;
  }

  return false;
}
