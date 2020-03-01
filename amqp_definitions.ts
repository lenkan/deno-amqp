import { MethodDefinition, ClassDefinition } from "./framing/socket.ts";

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

export interface ConnectionStart {
  versionMajor: number;
  versionMinor: number;
  serverProperties: Record<string, unknown>;
  mechanisms: string;
  locales: string;
}

export interface ConnectionStartOk {
  clientProperties: Record<string, unknown>;
  mechanism: string;
  response: string;
  locale: string;
}

export interface ConnectionSecure {
  challenge: string;
}

export interface ConnectionSecureOk {
  response: string;
}

export interface ConnectionTune {
  channelMax: number;
  frameMax: number;
  heartbeat: number;
}

export interface ConnectionTuneOk {
  channelMax: number;
  frameMax: number;
  heartbeat: number;
}

export interface ConnectionOpen {
  virtualHost: string;
  capabilities: string;
  insist: boolean;
}

export interface ConnectionOpenOk {
  knownHosts: string;
}

export interface ConnectionClose {
  replyCode: number;
  replyText: string;
  classId: number;
  methodId: number;
}

export interface ConnectionCloseOk {
}

export interface ConnectionBlocked {
  reason: string;
}

export interface ConnectionUnblocked {
}

export interface ConnectionUpdateSecret {
  newSecret: string;
  reason: string;
}

export interface ConnectionUpdateSecretOk {
}

export interface ChannelOpen {
  outOfBand: string;
}

export interface ChannelOpenOk {
  channelId: string;
}

export interface ChannelFlow {
  active: boolean;
}

export interface ChannelFlowOk {
  active: boolean;
}

export interface ChannelClose {
  replyCode: number;
  replyText: string;
  classId: number;
  methodId: number;
}

export interface ChannelCloseOk {
}

export interface AccessRequest {
  realm: string;
  exclusive: boolean;
  passive: boolean;
  active: boolean;
  write: boolean;
  read: boolean;
}

export interface AccessRequestOk {
  ticket: number;
}

export interface ExchangeDeclare {
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

export interface ExchangeDeclareOk {
}

export interface ExchangeDelete {
  ticket: number;
  exchange: string;
  ifUnused: boolean;
  nowait: boolean;
}

export interface ExchangeDeleteOk {
}

export interface ExchangeBind {
  ticket: number;
  destination: string;
  source: string;
  routingKey: string;
  nowait: boolean;
  arguments: Record<string, unknown>;
}

export interface ExchangeBindOk {
}

export interface ExchangeUnbind {
  ticket: number;
  destination: string;
  source: string;
  routingKey: string;
  nowait: boolean;
  arguments: Record<string, unknown>;
}

export interface ExchangeUnbindOk {
}

export interface QueueDeclare {
  ticket: number;
  queue: string;
  passive: boolean;
  durable: boolean;
  exclusive: boolean;
  autoDelete: boolean;
  nowait: boolean;
  arguments: Record<string, unknown>;
}

export interface QueueDeclareOk {
  queue: string;
  messageCount: number;
  consumerCount: number;
}

export interface QueueBind {
  ticket: number;
  queue: string;
  exchange: string;
  routingKey: string;
  nowait: boolean;
  arguments: Record<string, unknown>;
}

export interface QueueBindOk {
}

export interface QueuePurge {
  ticket: number;
  queue: string;
  nowait: boolean;
}

export interface QueuePurgeOk {
  messageCount: number;
}

export interface QueueDelete {
  ticket: number;
  queue: string;
  ifUnused: boolean;
  ifEmpty: boolean;
  nowait: boolean;
}

export interface QueueDeleteOk {
  messageCount: number;
}

export interface QueueUnbind {
  ticket: number;
  queue: string;
  exchange: string;
  routingKey: string;
  arguments: Record<string, unknown>;
}

export interface QueueUnbindOk {
}

export interface BasicQos {
  prefetchSize: number;
  prefetchCount: number;
  global: boolean;
}

export interface BasicQosOk {
}

export interface BasicConsume {
  ticket: number;
  queue: string;
  consumerTag: string;
  noLocal: boolean;
  noAck: boolean;
  exclusive: boolean;
  nowait: boolean;
  arguments: Record<string, unknown>;
}

export interface BasicConsumeOk {
  consumerTag: string;
}

export interface BasicCancel {
  consumerTag: string;
  nowait: boolean;
}

export interface BasicCancelOk {
  consumerTag: string;
}

export interface BasicPublish {
  ticket: number;
  exchange: string;
  routingKey: string;
  mandatory: boolean;
  immediate: boolean;
}

export interface BasicReturn {
  replyCode: number;
  replyText: string;
  exchange: string;
  routingKey: string;
}

export interface BasicDeliver {
  consumerTag: string;
  deliveryTag: number;
  redelivered: boolean;
  exchange: string;
  routingKey: string;
}

export interface BasicGet {
  ticket: number;
  queue: string;
  noAck: boolean;
}

export interface BasicGetOk {
  deliveryTag: number;
  redelivered: boolean;
  exchange: string;
  routingKey: string;
  messageCount: number;
}

export interface BasicGetEmpty {
  clusterId: string;
}

export interface BasicAck {
  deliveryTag: number;
  multiple: boolean;
}

export interface BasicReject {
  deliveryTag: number;
  requeue: boolean;
}

export interface BasicRecoverAsync {
  requeue: boolean;
}

export interface BasicRecover {
  requeue: boolean;
}

export interface BasicRecoverOk {
}

export interface BasicNack {
  deliveryTag: number;
  multiple: boolean;
  requeue: boolean;
}

export interface TxSelect {
}

export interface TxSelectOk {
}

export interface TxCommit {
}

export interface TxCommitOk {
}

export interface TxRollback {
}

export interface TxRollbackOk {
}

export interface ConfirmSelect {
  nowait: boolean;
}

export interface ConfirmSelectOk {
}

export const connection: ClassDefinition<ConnectionProperties> = {
  classId: 10,
  props: []
};

export const channel: ClassDefinition<ChannelProperties> = {
  classId: 20,
  props: []
};

export const access: ClassDefinition<AccessProperties> = {
  classId: 30,
  props: []
};

export const exchange: ClassDefinition<ExchangeProperties> = {
  classId: 40,
  props: []
};

export const queue: ClassDefinition<QueueProperties> = {
  classId: 50,
  props: []
};

export const basic: ClassDefinition<BasicProperties> = {
  classId: 60,
  props: [
    { type: "shortstr", name: "contentType" },
    { type: "shortstr", name: "contentEncoding" },
    { type: "table", name: "headers" },
    { type: "octet", name: "deliveryMode" },
    { type: "octet", name: "priority" },
    { type: "shortstr", name: "correlationId" },
    { type: "shortstr", name: "replyTo" },
    { type: "shortstr", name: "expiration" },
    { type: "shortstr", name: "messageId" },
    { type: "timestamp", name: "timestamp" },
    { type: "shortstr", name: "type" },
    { type: "shortstr", name: "userId" },
    { type: "shortstr", name: "appId" },
    { type: "shortstr", name: "clusterId" }
  ]
};

export const tx: ClassDefinition<TxProperties> = {
  classId: 90,
  props: []
};

export const confirm: ClassDefinition<ConfirmProperties> = {
  classId: 85,
  props: []
};

export const connectionStart: MethodDefinition<ConnectionStart,
  ConnectionStartArgs> = {
  classId: 10,
  methodId: 10,
  args: [
    { type: "octet", name: "versionMajor", defaultValue: 0 },
    { type: "octet", name: "versionMinor", defaultValue: 9 },
    { type: "table", name: "serverProperties" },
    { type: "longstr", name: "mechanisms", defaultValue: "PLAIN" },
    { type: "longstr", name: "locales", defaultValue: "en_US" }
  ],
  synchronous: true,
  content: false
};

export const connectionStartOk: MethodDefinition<ConnectionStartOk,
  ConnectionStartOkArgs> = {
  classId: 10,
  methodId: 11,
  args: [
    { type: "table", name: "clientProperties" },
    { type: "shortstr", name: "mechanism", defaultValue: "PLAIN" },
    { type: "longstr", name: "response" },
    { type: "shortstr", name: "locale", defaultValue: "en_US" }
  ],
  synchronous: false,
  content: false
};

export const connectionSecure: MethodDefinition<ConnectionSecure,
  ConnectionSecureArgs> = {
  classId: 10,
  methodId: 20,
  args: [{ type: "longstr", name: "challenge" }],
  synchronous: true,
  content: false
};

export const connectionSecureOk: MethodDefinition<ConnectionSecureOk,
  ConnectionSecureOkArgs> = {
  classId: 10,
  methodId: 21,
  args: [{ type: "longstr", name: "response" }],
  synchronous: false,
  content: false
};

export const connectionTune: MethodDefinition<ConnectionTune,
  ConnectionTuneArgs> = {
  classId: 10,
  methodId: 30,
  args: [
    { type: "short", name: "channelMax", defaultValue: 0 },
    { type: "long", name: "frameMax", defaultValue: 0 },
    { type: "short", name: "heartbeat", defaultValue: 0 }
  ],
  synchronous: true,
  content: false
};

export const connectionTuneOk: MethodDefinition<ConnectionTuneOk,
  ConnectionTuneOkArgs> = {
  classId: 10,
  methodId: 31,
  args: [
    { type: "short", name: "channelMax", defaultValue: 0 },
    { type: "long", name: "frameMax", defaultValue: 0 },
    { type: "short", name: "heartbeat", defaultValue: 0 }
  ],
  synchronous: false,
  content: false
};

export const connectionOpen: MethodDefinition<ConnectionOpen,
  ConnectionOpenArgs> = {
  classId: 10,
  methodId: 40,
  args: [
    { type: "shortstr", name: "virtualHost", defaultValue: "/" },
    { type: "shortstr", name: "capabilities", defaultValue: "" },
    { type: "bit", name: "insist", defaultValue: false }
  ],
  synchronous: true,
  content: false
};

export const connectionOpenOk: MethodDefinition<ConnectionOpenOk,
  ConnectionOpenOkArgs> = {
  classId: 10,
  methodId: 41,
  args: [{ type: "shortstr", name: "knownHosts", defaultValue: "" }],
  synchronous: false,
  content: false
};

export const connectionClose: MethodDefinition<ConnectionClose,
  ConnectionCloseArgs> = {
  classId: 10,
  methodId: 50,
  args: [
    { type: "short", name: "replyCode" },
    { type: "shortstr", name: "replyText", defaultValue: "" },
    { type: "short", name: "classId" },
    { type: "short", name: "methodId" }
  ],
  synchronous: true,
  content: false
};

export const connectionCloseOk: MethodDefinition<ConnectionCloseOk,
  ConnectionCloseOkArgs> = {
  classId: 10,
  methodId: 51,
  args: [],
  synchronous: false,
  content: false
};

export const connectionBlocked: MethodDefinition<ConnectionBlocked,
  ConnectionBlockedArgs> = {
  classId: 10,
  methodId: 60,
  args: [{ type: "shortstr", name: "reason", defaultValue: "" }],
  synchronous: false,
  content: false
};

export const connectionUnblocked: MethodDefinition<ConnectionUnblocked,
  ConnectionUnblockedArgs> = {
  classId: 10,
  methodId: 61,
  args: [],
  synchronous: false,
  content: false
};

export const connectionUpdateSecret: MethodDefinition<ConnectionUpdateSecret,
  ConnectionUpdateSecretArgs> = {
  classId: 10,
  methodId: 70,
  args: [
    { type: "longstr", name: "newSecret" },
    { type: "shortstr", name: "reason" }
  ],
  synchronous: true,
  content: false
};

export const connectionUpdateSecretOk:
  MethodDefinition<ConnectionUpdateSecretOk, ConnectionUpdateSecretOkArgs> = {
  classId: 10,
  methodId: 71,
  args: [],
  synchronous: false,
  content: false
};

export const channelOpen: MethodDefinition<ChannelOpen, ChannelOpenArgs> = {
  classId: 20,
  methodId: 10,
  args: [{ type: "shortstr", name: "outOfBand", defaultValue: "" }],
  synchronous: true,
  content: false
};

export const channelOpenOk: MethodDefinition<ChannelOpenOk,
  ChannelOpenOkArgs> = {
  classId: 20,
  methodId: 11,
  args: [{ type: "longstr", name: "channelId", defaultValue: "" }],
  synchronous: false,
  content: false
};

export const channelFlow: MethodDefinition<ChannelFlow, ChannelFlowArgs> = {
  classId: 20,
  methodId: 20,
  args: [{ type: "bit", name: "active" }],
  synchronous: true,
  content: false
};

export const channelFlowOk: MethodDefinition<ChannelFlowOk,
  ChannelFlowOkArgs> = {
  classId: 20,
  methodId: 21,
  args: [{ type: "bit", name: "active" }],
  synchronous: false,
  content: false
};

export const channelClose: MethodDefinition<ChannelClose, ChannelCloseArgs> = {
  classId: 20,
  methodId: 40,
  args: [
    { type: "short", name: "replyCode" },
    { type: "shortstr", name: "replyText", defaultValue: "" },
    { type: "short", name: "classId" },
    { type: "short", name: "methodId" }
  ],
  synchronous: true,
  content: false
};

export const channelCloseOk: MethodDefinition<ChannelCloseOk,
  ChannelCloseOkArgs> = {
  classId: 20,
  methodId: 41,
  args: [],
  synchronous: false,
  content: false
};

export const accessRequest: MethodDefinition<AccessRequest,
  AccessRequestArgs> = {
  classId: 30,
  methodId: 10,
  args: [
    { type: "shortstr", name: "realm", defaultValue: "/data" },
    { type: "bit", name: "exclusive", defaultValue: false },
    { type: "bit", name: "passive", defaultValue: true },
    { type: "bit", name: "active", defaultValue: true },
    { type: "bit", name: "write", defaultValue: true },
    { type: "bit", name: "read", defaultValue: true }
  ],
  synchronous: true,
  content: false
};

export const accessRequestOk: MethodDefinition<AccessRequestOk,
  AccessRequestOkArgs> = {
  classId: 30,
  methodId: 11,
  args: [{ type: "short", name: "ticket", defaultValue: 1 }],
  synchronous: false,
  content: false
};

export const exchangeDeclare: MethodDefinition<ExchangeDeclare,
  ExchangeDeclareArgs> = {
  classId: 40,
  methodId: 10,
  args: [
    { type: "short", name: "ticket", defaultValue: 0 },
    { type: "shortstr", name: "exchange" },
    { type: "shortstr", name: "type", defaultValue: "direct" },
    { type: "bit", name: "passive", defaultValue: false },
    { type: "bit", name: "durable", defaultValue: false },
    { type: "bit", name: "autoDelete", defaultValue: false },
    { type: "bit", name: "internal", defaultValue: false },
    { type: "bit", name: "nowait", defaultValue: false },
    { type: "table", name: "arguments", defaultValue: {} }
  ],
  synchronous: true,
  content: false
};

export const exchangeDeclareOk: MethodDefinition<ExchangeDeclareOk,
  ExchangeDeclareOkArgs> = {
  classId: 40,
  methodId: 11,
  args: [],
  synchronous: false,
  content: false
};

export const exchangeDelete: MethodDefinition<ExchangeDelete,
  ExchangeDeleteArgs> = {
  classId: 40,
  methodId: 20,
  args: [
    { type: "short", name: "ticket", defaultValue: 0 },
    { type: "shortstr", name: "exchange" },
    { type: "bit", name: "ifUnused", defaultValue: false },
    { type: "bit", name: "nowait", defaultValue: false }
  ],
  synchronous: true,
  content: false
};

export const exchangeDeleteOk: MethodDefinition<ExchangeDeleteOk,
  ExchangeDeleteOkArgs> = {
  classId: 40,
  methodId: 21,
  args: [],
  synchronous: false,
  content: false
};

export const exchangeBind: MethodDefinition<ExchangeBind, ExchangeBindArgs> = {
  classId: 40,
  methodId: 30,
  args: [
    { type: "short", name: "ticket", defaultValue: 0 },
    { type: "shortstr", name: "destination" },
    { type: "shortstr", name: "source" },
    { type: "shortstr", name: "routingKey", defaultValue: "" },
    { type: "bit", name: "nowait", defaultValue: false },
    { type: "table", name: "arguments", defaultValue: {} }
  ],
  synchronous: true,
  content: false
};

export const exchangeBindOk: MethodDefinition<ExchangeBindOk,
  ExchangeBindOkArgs> = {
  classId: 40,
  methodId: 31,
  args: [],
  synchronous: false,
  content: false
};

export const exchangeUnbind: MethodDefinition<ExchangeUnbind,
  ExchangeUnbindArgs> = {
  classId: 40,
  methodId: 40,
  args: [
    { type: "short", name: "ticket", defaultValue: 0 },
    { type: "shortstr", name: "destination" },
    { type: "shortstr", name: "source" },
    { type: "shortstr", name: "routingKey", defaultValue: "" },
    { type: "bit", name: "nowait", defaultValue: false },
    { type: "table", name: "arguments", defaultValue: {} }
  ],
  synchronous: true,
  content: false
};

export const exchangeUnbindOk: MethodDefinition<ExchangeUnbindOk,
  ExchangeUnbindOkArgs> = {
  classId: 40,
  methodId: 51,
  args: [],
  synchronous: false,
  content: false
};

export const queueDeclare: MethodDefinition<QueueDeclare, QueueDeclareArgs> = {
  classId: 50,
  methodId: 10,
  args: [
    { type: "short", name: "ticket", defaultValue: 0 },
    { type: "shortstr", name: "queue", defaultValue: "" },
    { type: "bit", name: "passive", defaultValue: false },
    { type: "bit", name: "durable", defaultValue: false },
    { type: "bit", name: "exclusive", defaultValue: false },
    { type: "bit", name: "autoDelete", defaultValue: false },
    { type: "bit", name: "nowait", defaultValue: false },
    { type: "table", name: "arguments", defaultValue: {} }
  ],
  synchronous: true,
  content: false
};

export const queueDeclareOk: MethodDefinition<QueueDeclareOk,
  QueueDeclareOkArgs> = {
  classId: 50,
  methodId: 11,
  args: [
    { type: "shortstr", name: "queue" },
    { type: "long", name: "messageCount" },
    { type: "long", name: "consumerCount" }
  ],
  synchronous: false,
  content: false
};

export const queueBind: MethodDefinition<QueueBind, QueueBindArgs> = {
  classId: 50,
  methodId: 20,
  args: [
    { type: "short", name: "ticket", defaultValue: 0 },
    { type: "shortstr", name: "queue", defaultValue: "" },
    { type: "shortstr", name: "exchange" },
    { type: "shortstr", name: "routingKey", defaultValue: "" },
    { type: "bit", name: "nowait", defaultValue: false },
    { type: "table", name: "arguments", defaultValue: {} }
  ],
  synchronous: true,
  content: false
};

export const queueBindOk: MethodDefinition<QueueBindOk, QueueBindOkArgs> = {
  classId: 50,
  methodId: 21,
  args: [],
  synchronous: false,
  content: false
};

export const queuePurge: MethodDefinition<QueuePurge, QueuePurgeArgs> = {
  classId: 50,
  methodId: 30,
  args: [
    { type: "short", name: "ticket", defaultValue: 0 },
    { type: "shortstr", name: "queue", defaultValue: "" },
    { type: "bit", name: "nowait", defaultValue: false }
  ],
  synchronous: true,
  content: false
};

export const queuePurgeOk: MethodDefinition<QueuePurgeOk, QueuePurgeOkArgs> = {
  classId: 50,
  methodId: 31,
  args: [{ type: "long", name: "messageCount" }],
  synchronous: false,
  content: false
};

export const queueDelete: MethodDefinition<QueueDelete, QueueDeleteArgs> = {
  classId: 50,
  methodId: 40,
  args: [
    { type: "short", name: "ticket", defaultValue: 0 },
    { type: "shortstr", name: "queue", defaultValue: "" },
    { type: "bit", name: "ifUnused", defaultValue: false },
    { type: "bit", name: "ifEmpty", defaultValue: false },
    { type: "bit", name: "nowait", defaultValue: false }
  ],
  synchronous: true,
  content: false
};

export const queueDeleteOk: MethodDefinition<QueueDeleteOk,
  QueueDeleteOkArgs> = {
  classId: 50,
  methodId: 41,
  args: [{ type: "long", name: "messageCount" }],
  synchronous: false,
  content: false
};

export const queueUnbind: MethodDefinition<QueueUnbind, QueueUnbindArgs> = {
  classId: 50,
  methodId: 50,
  args: [
    { type: "short", name: "ticket", defaultValue: 0 },
    { type: "shortstr", name: "queue", defaultValue: "" },
    { type: "shortstr", name: "exchange" },
    { type: "shortstr", name: "routingKey", defaultValue: "" },
    { type: "table", name: "arguments", defaultValue: {} }
  ],
  synchronous: true,
  content: false
};

export const queueUnbindOk: MethodDefinition<QueueUnbindOk,
  QueueUnbindOkArgs> = {
  classId: 50,
  methodId: 51,
  args: [],
  synchronous: false,
  content: false
};

export const basicQos: MethodDefinition<BasicQos, BasicQosArgs> = {
  classId: 60,
  methodId: 10,
  args: [
    { type: "long", name: "prefetchSize", defaultValue: 0 },
    { type: "short", name: "prefetchCount", defaultValue: 0 },
    { type: "bit", name: "global", defaultValue: false }
  ],
  synchronous: true,
  content: false
};

export const basicQosOk: MethodDefinition<BasicQosOk, BasicQosOkArgs> = {
  classId: 60,
  methodId: 11,
  args: [],
  synchronous: false,
  content: false
};

export const basicConsume: MethodDefinition<BasicConsume, BasicConsumeArgs> = {
  classId: 60,
  methodId: 20,
  args: [
    { type: "short", name: "ticket", defaultValue: 0 },
    { type: "shortstr", name: "queue", defaultValue: "" },
    { type: "shortstr", name: "consumerTag", defaultValue: "" },
    { type: "bit", name: "noLocal", defaultValue: false },
    { type: "bit", name: "noAck", defaultValue: false },
    { type: "bit", name: "exclusive", defaultValue: false },
    { type: "bit", name: "nowait", defaultValue: false },
    { type: "table", name: "arguments", defaultValue: {} }
  ],
  synchronous: true,
  content: false
};

export const basicConsumeOk: MethodDefinition<BasicConsumeOk,
  BasicConsumeOkArgs> = {
  classId: 60,
  methodId: 21,
  args: [{ type: "shortstr", name: "consumerTag" }],
  synchronous: false,
  content: false
};

export const basicCancel: MethodDefinition<BasicCancel, BasicCancelArgs> = {
  classId: 60,
  methodId: 30,
  args: [
    { type: "shortstr", name: "consumerTag" },
    { type: "bit", name: "nowait", defaultValue: false }
  ],
  synchronous: true,
  content: false
};

export const basicCancelOk: MethodDefinition<BasicCancelOk,
  BasicCancelOkArgs> = {
  classId: 60,
  methodId: 31,
  args: [{ type: "shortstr", name: "consumerTag" }],
  synchronous: false,
  content: false
};

export const basicPublish: MethodDefinition<BasicPublish, BasicPublishArgs> = {
  classId: 60,
  methodId: 40,
  args: [
    { type: "short", name: "ticket", defaultValue: 0 },
    { type: "shortstr", name: "exchange", defaultValue: "" },
    { type: "shortstr", name: "routingKey", defaultValue: "" },
    { type: "bit", name: "mandatory", defaultValue: false },
    { type: "bit", name: "immediate", defaultValue: false }
  ],
  synchronous: false,
  content: true
};

export const basicReturn: MethodDefinition<BasicReturn, BasicReturnArgs> = {
  classId: 60,
  methodId: 50,
  args: [
    { type: "short", name: "replyCode" },
    { type: "shortstr", name: "replyText", defaultValue: "" },
    { type: "shortstr", name: "exchange" },
    { type: "shortstr", name: "routingKey" }
  ],
  synchronous: false,
  content: true
};

export const basicDeliver: MethodDefinition<BasicDeliver, BasicDeliverArgs> = {
  classId: 60,
  methodId: 60,
  args: [
    { type: "shortstr", name: "consumerTag" },
    { type: "longlong", name: "deliveryTag" },
    { type: "bit", name: "redelivered", defaultValue: false },
    { type: "shortstr", name: "exchange" },
    { type: "shortstr", name: "routingKey" }
  ],
  synchronous: false,
  content: true
};

export const basicGet: MethodDefinition<BasicGet, BasicGetArgs> = {
  classId: 60,
  methodId: 70,
  args: [
    { type: "short", name: "ticket", defaultValue: 0 },
    { type: "shortstr", name: "queue", defaultValue: "" },
    { type: "bit", name: "noAck", defaultValue: false }
  ],
  synchronous: true,
  content: false
};

export const basicGetOk: MethodDefinition<BasicGetOk, BasicGetOkArgs> = {
  classId: 60,
  methodId: 71,
  args: [
    { type: "longlong", name: "deliveryTag" },
    { type: "bit", name: "redelivered", defaultValue: false },
    { type: "shortstr", name: "exchange" },
    { type: "shortstr", name: "routingKey" },
    { type: "long", name: "messageCount" }
  ],
  synchronous: false,
  content: true
};

export const basicGetEmpty: MethodDefinition<BasicGetEmpty,
  BasicGetEmptyArgs> = {
  classId: 60,
  methodId: 72,
  args: [{ type: "shortstr", name: "clusterId", defaultValue: "" }],
  synchronous: false,
  content: false
};

export const basicAck: MethodDefinition<BasicAck, BasicAckArgs> = {
  classId: 60,
  methodId: 80,
  args: [
    { type: "longlong", name: "deliveryTag", defaultValue: 0 },
    { type: "bit", name: "multiple", defaultValue: false }
  ],
  synchronous: false,
  content: false
};

export const basicReject: MethodDefinition<BasicReject, BasicRejectArgs> = {
  classId: 60,
  methodId: 90,
  args: [
    { type: "longlong", name: "deliveryTag" },
    { type: "bit", name: "requeue", defaultValue: true }
  ],
  synchronous: false,
  content: false
};

export const basicRecoverAsync: MethodDefinition<BasicRecoverAsync,
  BasicRecoverAsyncArgs> = {
  classId: 60,
  methodId: 100,
  args: [{ type: "bit", name: "requeue", defaultValue: false }],
  synchronous: false,
  content: false
};

export const basicRecover: MethodDefinition<BasicRecover, BasicRecoverArgs> = {
  classId: 60,
  methodId: 110,
  args: [{ type: "bit", name: "requeue", defaultValue: false }],
  synchronous: true,
  content: false
};

export const basicRecoverOk: MethodDefinition<BasicRecoverOk,
  BasicRecoverOkArgs> = {
  classId: 60,
  methodId: 111,
  args: [],
  synchronous: false,
  content: false
};

export const basicNack: MethodDefinition<BasicNack, BasicNackArgs> = {
  classId: 60,
  methodId: 120,
  args: [
    { type: "longlong", name: "deliveryTag", defaultValue: 0 },
    { type: "bit", name: "multiple", defaultValue: false },
    { type: "bit", name: "requeue", defaultValue: true }
  ],
  synchronous: false,
  content: false
};

export const txSelect: MethodDefinition<TxSelect, TxSelectArgs> = {
  classId: 90,
  methodId: 10,
  args: [],
  synchronous: true,
  content: false
};

export const txSelectOk: MethodDefinition<TxSelectOk, TxSelectOkArgs> = {
  classId: 90,
  methodId: 11,
  args: [],
  synchronous: false,
  content: false
};

export const txCommit: MethodDefinition<TxCommit, TxCommitArgs> = {
  classId: 90,
  methodId: 20,
  args: [],
  synchronous: true,
  content: false
};

export const txCommitOk: MethodDefinition<TxCommitOk, TxCommitOkArgs> = {
  classId: 90,
  methodId: 21,
  args: [],
  synchronous: false,
  content: false
};

export const txRollback: MethodDefinition<TxRollback, TxRollbackArgs> = {
  classId: 90,
  methodId: 30,
  args: [],
  synchronous: true,
  content: false
};

export const txRollbackOk: MethodDefinition<TxRollbackOk, TxRollbackOkArgs> = {
  classId: 90,
  methodId: 31,
  args: [],
  synchronous: false,
  content: false
};

export const confirmSelect: MethodDefinition<ConfirmSelect,
  ConfirmSelectArgs> = {
  classId: 85,
  methodId: 10,
  args: [{ type: "bit", name: "nowait", defaultValue: false }],
  synchronous: true,
  content: false
};

export const confirmSelectOk: MethodDefinition<ConfirmSelectOk,
  ConfirmSelectOkArgs> = {
  classId: 85,
  methodId: 11,
  args: [],
  synchronous: false,
  content: false
};
