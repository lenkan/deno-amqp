import {
  decodeShortUint,
  encodeShortUint
} from "../encoding/number_encoding.ts";
import { decodeFields, encodeFields } from "../encoding/fields_encoding.ts";
import { SendMethod, ReceiveMethod } from "../amqp_types.ts";

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

export function encodeConnectionStart(args: ConnectionStartArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(encodeShortUint(10));
  w.writeSync(encodeShortUint(10));
  w.writeSync(encodeFields([
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
  w.writeSync(encodeShortUint(10));
  w.writeSync(encodeShortUint(11));
  w.writeSync(encodeFields([
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
  w.writeSync(encodeShortUint(10));
  w.writeSync(encodeShortUint(20));
  w.writeSync(encodeFields([
    { type: "longstr" as const, value: args.challenge }
  ]));
  return w.bytes();
}

export function encodeConnectionSecureOk(
  args: ConnectionSecureOkArgs
): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(encodeShortUint(10));
  w.writeSync(encodeShortUint(21));
  w.writeSync(encodeFields([
    { type: "longstr" as const, value: args.response }
  ]));
  return w.bytes();
}

export function encodeConnectionTune(args: ConnectionTuneArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(encodeShortUint(10));
  w.writeSync(encodeShortUint(30));
  w.writeSync(encodeFields([
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
  w.writeSync(encodeShortUint(10));
  w.writeSync(encodeShortUint(31));
  w.writeSync(encodeFields([
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
  w.writeSync(encodeShortUint(10));
  w.writeSync(encodeShortUint(40));
  w.writeSync(encodeFields([
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
  w.writeSync(encodeShortUint(10));
  w.writeSync(encodeShortUint(41));
  w.writeSync(encodeFields([
    {
      type: "shortstr" as const,
      value: args.knownHosts !== undefined ? args.knownHosts : ""
    }
  ]));
  return w.bytes();
}

export function encodeConnectionClose(args: ConnectionCloseArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(encodeShortUint(10));
  w.writeSync(encodeShortUint(50));
  w.writeSync(encodeFields([
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
  w.writeSync(encodeShortUint(10));
  w.writeSync(encodeShortUint(51));
  w.writeSync(encodeFields([]));
  return w.bytes();
}

export function encodeConnectionBlocked(
  args: ConnectionBlockedArgs
): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(encodeShortUint(10));
  w.writeSync(encodeShortUint(60));
  w.writeSync(encodeFields([
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
  w.writeSync(encodeShortUint(10));
  w.writeSync(encodeShortUint(61));
  w.writeSync(encodeFields([]));
  return w.bytes();
}

export function encodeConnectionUpdateSecret(
  args: ConnectionUpdateSecretArgs
): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(encodeShortUint(10));
  w.writeSync(encodeShortUint(70));
  w.writeSync(encodeFields([
    { type: "longstr" as const, value: args.newSecret },
    { type: "shortstr" as const, value: args.reason }
  ]));
  return w.bytes();
}

export function encodeConnectionUpdateSecretOk(
  args: ConnectionUpdateSecretOkArgs
): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(encodeShortUint(10));
  w.writeSync(encodeShortUint(71));
  w.writeSync(encodeFields([]));
  return w.bytes();
}

export function encodeChannelOpen(args: ChannelOpenArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(encodeShortUint(20));
  w.writeSync(encodeShortUint(10));
  w.writeSync(encodeFields([
    {
      type: "shortstr" as const,
      value: args.outOfBand !== undefined ? args.outOfBand : ""
    }
  ]));
  return w.bytes();
}

export function encodeChannelOpenOk(args: ChannelOpenOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(encodeShortUint(20));
  w.writeSync(encodeShortUint(11));
  w.writeSync(encodeFields([
    {
      type: "longstr" as const,
      value: args.channelId !== undefined ? args.channelId : ""
    }
  ]));
  return w.bytes();
}

export function encodeChannelFlow(args: ChannelFlowArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(encodeShortUint(20));
  w.writeSync(encodeShortUint(20));
  w.writeSync(encodeFields([
    { type: "bit" as const, value: args.active }
  ]));
  return w.bytes();
}

export function encodeChannelFlowOk(args: ChannelFlowOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(encodeShortUint(20));
  w.writeSync(encodeShortUint(21));
  w.writeSync(encodeFields([
    { type: "bit" as const, value: args.active }
  ]));
  return w.bytes();
}

export function encodeChannelClose(args: ChannelCloseArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(encodeShortUint(20));
  w.writeSync(encodeShortUint(40));
  w.writeSync(encodeFields([
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
  w.writeSync(encodeShortUint(20));
  w.writeSync(encodeShortUint(41));
  w.writeSync(encodeFields([]));
  return w.bytes();
}

export function encodeAccessRequest(args: AccessRequestArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(encodeShortUint(30));
  w.writeSync(encodeShortUint(10));
  w.writeSync(encodeFields([
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
  w.writeSync(encodeShortUint(30));
  w.writeSync(encodeShortUint(11));
  w.writeSync(encodeFields([
    {
      type: "short" as const,
      value: args.ticket !== undefined ? args.ticket : 1
    }
  ]));
  return w.bytes();
}

export function encodeExchangeDeclare(args: ExchangeDeclareArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(encodeShortUint(40));
  w.writeSync(encodeShortUint(10));
  w.writeSync(encodeFields([
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
  w.writeSync(encodeShortUint(40));
  w.writeSync(encodeShortUint(11));
  w.writeSync(encodeFields([]));
  return w.bytes();
}

export function encodeExchangeDelete(args: ExchangeDeleteArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(encodeShortUint(40));
  w.writeSync(encodeShortUint(20));
  w.writeSync(encodeFields([
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
  w.writeSync(encodeShortUint(40));
  w.writeSync(encodeShortUint(21));
  w.writeSync(encodeFields([]));
  return w.bytes();
}

export function encodeExchangeBind(args: ExchangeBindArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(encodeShortUint(40));
  w.writeSync(encodeShortUint(30));
  w.writeSync(encodeFields([
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
  w.writeSync(encodeShortUint(40));
  w.writeSync(encodeShortUint(31));
  w.writeSync(encodeFields([]));
  return w.bytes();
}

export function encodeExchangeUnbind(args: ExchangeUnbindArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(encodeShortUint(40));
  w.writeSync(encodeShortUint(40));
  w.writeSync(encodeFields([
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
  w.writeSync(encodeShortUint(40));
  w.writeSync(encodeShortUint(51));
  w.writeSync(encodeFields([]));
  return w.bytes();
}

export function encodeQueueDeclare(args: QueueDeclareArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(encodeShortUint(50));
  w.writeSync(encodeShortUint(10));
  w.writeSync(encodeFields([
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
  w.writeSync(encodeShortUint(50));
  w.writeSync(encodeShortUint(11));
  w.writeSync(encodeFields([
    { type: "shortstr" as const, value: args.queue },
    { type: "long" as const, value: args.messageCount },
    { type: "long" as const, value: args.consumerCount }
  ]));
  return w.bytes();
}

export function encodeQueueBind(args: QueueBindArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(encodeShortUint(50));
  w.writeSync(encodeShortUint(20));
  w.writeSync(encodeFields([
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
  w.writeSync(encodeShortUint(50));
  w.writeSync(encodeShortUint(21));
  w.writeSync(encodeFields([]));
  return w.bytes();
}

export function encodeQueuePurge(args: QueuePurgeArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(encodeShortUint(50));
  w.writeSync(encodeShortUint(30));
  w.writeSync(encodeFields([
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
  w.writeSync(encodeShortUint(50));
  w.writeSync(encodeShortUint(31));
  w.writeSync(encodeFields([
    { type: "long" as const, value: args.messageCount }
  ]));
  return w.bytes();
}

export function encodeQueueDelete(args: QueueDeleteArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(encodeShortUint(50));
  w.writeSync(encodeShortUint(40));
  w.writeSync(encodeFields([
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
  w.writeSync(encodeShortUint(50));
  w.writeSync(encodeShortUint(41));
  w.writeSync(encodeFields([
    { type: "long" as const, value: args.messageCount }
  ]));
  return w.bytes();
}

export function encodeQueueUnbind(args: QueueUnbindArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(encodeShortUint(50));
  w.writeSync(encodeShortUint(50));
  w.writeSync(encodeFields([
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
  w.writeSync(encodeShortUint(50));
  w.writeSync(encodeShortUint(51));
  w.writeSync(encodeFields([]));
  return w.bytes();
}

export function encodeBasicQos(args: BasicQosArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(encodeShortUint(60));
  w.writeSync(encodeShortUint(10));
  w.writeSync(encodeFields([
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
  w.writeSync(encodeShortUint(60));
  w.writeSync(encodeShortUint(11));
  w.writeSync(encodeFields([]));
  return w.bytes();
}

export function encodeBasicConsume(args: BasicConsumeArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(encodeShortUint(60));
  w.writeSync(encodeShortUint(20));
  w.writeSync(encodeFields([
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
  w.writeSync(encodeShortUint(60));
  w.writeSync(encodeShortUint(21));
  w.writeSync(encodeFields([
    { type: "shortstr" as const, value: args.consumerTag }
  ]));
  return w.bytes();
}

export function encodeBasicCancel(args: BasicCancelArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(encodeShortUint(60));
  w.writeSync(encodeShortUint(30));
  w.writeSync(encodeFields([
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
  w.writeSync(encodeShortUint(60));
  w.writeSync(encodeShortUint(31));
  w.writeSync(encodeFields([
    { type: "shortstr" as const, value: args.consumerTag }
  ]));
  return w.bytes();
}

export function encodeBasicPublish(args: BasicPublishArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(encodeShortUint(60));
  w.writeSync(encodeShortUint(40));
  w.writeSync(encodeFields([
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
  w.writeSync(encodeShortUint(60));
  w.writeSync(encodeShortUint(50));
  w.writeSync(encodeFields([
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
  w.writeSync(encodeShortUint(60));
  w.writeSync(encodeShortUint(60));
  w.writeSync(encodeFields([
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
  w.writeSync(encodeShortUint(60));
  w.writeSync(encodeShortUint(70));
  w.writeSync(encodeFields([
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
  w.writeSync(encodeShortUint(60));
  w.writeSync(encodeShortUint(71));
  w.writeSync(encodeFields([
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
  w.writeSync(encodeShortUint(60));
  w.writeSync(encodeShortUint(72));
  w.writeSync(encodeFields([
    {
      type: "shortstr" as const,
      value: args.clusterId !== undefined ? args.clusterId : ""
    }
  ]));
  return w.bytes();
}

export function encodeBasicAck(args: BasicAckArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(encodeShortUint(60));
  w.writeSync(encodeShortUint(80));
  w.writeSync(encodeFields([
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
  w.writeSync(encodeShortUint(60));
  w.writeSync(encodeShortUint(90));
  w.writeSync(encodeFields([
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
  w.writeSync(encodeShortUint(60));
  w.writeSync(encodeShortUint(100));
  w.writeSync(encodeFields([
    {
      type: "bit" as const,
      value: args.requeue !== undefined ? args.requeue : false
    }
  ]));
  return w.bytes();
}

export function encodeBasicRecover(args: BasicRecoverArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(encodeShortUint(60));
  w.writeSync(encodeShortUint(110));
  w.writeSync(encodeFields([
    {
      type: "bit" as const,
      value: args.requeue !== undefined ? args.requeue : false
    }
  ]));
  return w.bytes();
}

export function encodeBasicRecoverOk(args: BasicRecoverOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(encodeShortUint(60));
  w.writeSync(encodeShortUint(111));
  w.writeSync(encodeFields([]));
  return w.bytes();
}

export function encodeBasicNack(args: BasicNackArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(encodeShortUint(60));
  w.writeSync(encodeShortUint(120));
  w.writeSync(encodeFields([
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
  w.writeSync(encodeShortUint(90));
  w.writeSync(encodeShortUint(10));
  w.writeSync(encodeFields([]));
  return w.bytes();
}

export function encodeTxSelectOk(args: TxSelectOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(encodeShortUint(90));
  w.writeSync(encodeShortUint(11));
  w.writeSync(encodeFields([]));
  return w.bytes();
}

export function encodeTxCommit(args: TxCommitArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(encodeShortUint(90));
  w.writeSync(encodeShortUint(20));
  w.writeSync(encodeFields([]));
  return w.bytes();
}

export function encodeTxCommitOk(args: TxCommitOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(encodeShortUint(90));
  w.writeSync(encodeShortUint(21));
  w.writeSync(encodeFields([]));
  return w.bytes();
}

export function encodeTxRollback(args: TxRollbackArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(encodeShortUint(90));
  w.writeSync(encodeShortUint(30));
  w.writeSync(encodeFields([]));
  return w.bytes();
}

export function encodeTxRollbackOk(args: TxRollbackOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(encodeShortUint(90));
  w.writeSync(encodeShortUint(31));
  w.writeSync(encodeFields([]));
  return w.bytes();
}

export function encodeConfirmSelect(args: ConfirmSelectArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(encodeShortUint(85));
  w.writeSync(encodeShortUint(10));
  w.writeSync(encodeFields([
    {
      type: "bit" as const,
      value: args.nowait !== undefined ? args.nowait : false
    }
  ]));
  return w.bytes();
}

export function encodeConfirmSelectOk(args: ConfirmSelectOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(encodeShortUint(85));
  w.writeSync(encodeShortUint(11));
  w.writeSync(encodeFields([]));
  return w.bytes();
}

function decodeConnectionStart(r: Deno.SyncReader): ConnectionStart {
  const fields = decodeFields(
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
  const fields = decodeFields(r, ["table", "shortstr", "longstr", "shortstr"]);
  const args = {
    clientProperties: fields[0] as Record<string, unknown>,
    mechanism: fields[1] as string,
    response: fields[2] as string,
    locale: fields[3] as string
  };
  return args;
}

function decodeConnectionSecure(r: Deno.SyncReader): ConnectionSecure {
  const fields = decodeFields(r, ["longstr"]);
  const args = { challenge: fields[0] as string };
  return args;
}

function decodeConnectionSecureOk(r: Deno.SyncReader): ConnectionSecureOk {
  const fields = decodeFields(r, ["longstr"]);
  const args = { response: fields[0] as string };
  return args;
}

function decodeConnectionTune(r: Deno.SyncReader): ConnectionTune {
  const fields = decodeFields(r, ["short", "long", "short"]);
  const args = {
    channelMax: fields[0] as number,
    frameMax: fields[1] as number,
    heartbeat: fields[2] as number
  };
  return args;
}

function decodeConnectionTuneOk(r: Deno.SyncReader): ConnectionTuneOk {
  const fields = decodeFields(r, ["short", "long", "short"]);
  const args = {
    channelMax: fields[0] as number,
    frameMax: fields[1] as number,
    heartbeat: fields[2] as number
  };
  return args;
}

function decodeConnectionOpen(r: Deno.SyncReader): ConnectionOpen {
  const fields = decodeFields(r, ["shortstr", "shortstr", "bit"]);
  const args = {
    virtualHost: fields[0] as string,
    capabilities: fields[1] as string,
    insist: fields[2] as boolean
  };
  return args;
}

function decodeConnectionOpenOk(r: Deno.SyncReader): ConnectionOpenOk {
  const fields = decodeFields(r, ["shortstr"]);
  const args = { knownHosts: fields[0] as string };
  return args;
}

function decodeConnectionClose(r: Deno.SyncReader): ConnectionClose {
  const fields = decodeFields(r, ["short", "shortstr", "short", "short"]);
  const args = {
    replyCode: fields[0] as number,
    replyText: fields[1] as string,
    classId: fields[2] as number,
    methodId: fields[3] as number
  };
  return args;
}

function decodeConnectionCloseOk(r: Deno.SyncReader): ConnectionCloseOk {
  const fields = decodeFields(r, []);
  const args = {};
  return args;
}

function decodeConnectionBlocked(r: Deno.SyncReader): ConnectionBlocked {
  const fields = decodeFields(r, ["shortstr"]);
  const args = { reason: fields[0] as string };
  return args;
}

function decodeConnectionUnblocked(r: Deno.SyncReader): ConnectionUnblocked {
  const fields = decodeFields(r, []);
  const args = {};
  return args;
}

function decodeConnectionUpdateSecret(
  r: Deno.SyncReader
): ConnectionUpdateSecret {
  const fields = decodeFields(r, ["longstr", "shortstr"]);
  const args = { newSecret: fields[0] as string, reason: fields[1] as string };
  return args;
}

function decodeConnectionUpdateSecretOk(
  r: Deno.SyncReader
): ConnectionUpdateSecretOk {
  const fields = decodeFields(r, []);
  const args = {};
  return args;
}

function decodeChannelOpen(r: Deno.SyncReader): ChannelOpen {
  const fields = decodeFields(r, ["shortstr"]);
  const args = { outOfBand: fields[0] as string };
  return args;
}

function decodeChannelOpenOk(r: Deno.SyncReader): ChannelOpenOk {
  const fields = decodeFields(r, ["longstr"]);
  const args = { channelId: fields[0] as string };
  return args;
}

function decodeChannelFlow(r: Deno.SyncReader): ChannelFlow {
  const fields = decodeFields(r, ["bit"]);
  const args = { active: fields[0] as boolean };
  return args;
}

function decodeChannelFlowOk(r: Deno.SyncReader): ChannelFlowOk {
  const fields = decodeFields(r, ["bit"]);
  const args = { active: fields[0] as boolean };
  return args;
}

function decodeChannelClose(r: Deno.SyncReader): ChannelClose {
  const fields = decodeFields(r, ["short", "shortstr", "short", "short"]);
  const args = {
    replyCode: fields[0] as number,
    replyText: fields[1] as string,
    classId: fields[2] as number,
    methodId: fields[3] as number
  };
  return args;
}

function decodeChannelCloseOk(r: Deno.SyncReader): ChannelCloseOk {
  const fields = decodeFields(r, []);
  const args = {};
  return args;
}

function decodeAccessRequest(r: Deno.SyncReader): AccessRequest {
  const fields = decodeFields(
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
  const fields = decodeFields(r, ["short"]);
  const args = { ticket: fields[0] as number };
  return args;
}

function decodeExchangeDeclare(r: Deno.SyncReader): ExchangeDeclare {
  const fields = decodeFields(
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
  const fields = decodeFields(r, []);
  const args = {};
  return args;
}

function decodeExchangeDelete(r: Deno.SyncReader): ExchangeDelete {
  const fields = decodeFields(r, ["short", "shortstr", "bit", "bit"]);
  const args = {
    ticket: fields[0] as number,
    exchange: fields[1] as string,
    ifUnused: fields[2] as boolean,
    nowait: fields[3] as boolean
  };
  return args;
}

function decodeExchangeDeleteOk(r: Deno.SyncReader): ExchangeDeleteOk {
  const fields = decodeFields(r, []);
  const args = {};
  return args;
}

function decodeExchangeBind(r: Deno.SyncReader): ExchangeBind {
  const fields = decodeFields(
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
  const fields = decodeFields(r, []);
  const args = {};
  return args;
}

function decodeExchangeUnbind(r: Deno.SyncReader): ExchangeUnbind {
  const fields = decodeFields(
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
  const fields = decodeFields(r, []);
  const args = {};
  return args;
}

function decodeQueueDeclare(r: Deno.SyncReader): QueueDeclare {
  const fields = decodeFields(
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
  const fields = decodeFields(r, ["shortstr", "long", "long"]);
  const args = {
    queue: fields[0] as string,
    messageCount: fields[1] as number,
    consumerCount: fields[2] as number
  };
  return args;
}

function decodeQueueBind(r: Deno.SyncReader): QueueBind {
  const fields = decodeFields(
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
  const fields = decodeFields(r, []);
  const args = {};
  return args;
}

function decodeQueuePurge(r: Deno.SyncReader): QueuePurge {
  const fields = decodeFields(r, ["short", "shortstr", "bit"]);
  const args = {
    ticket: fields[0] as number,
    queue: fields[1] as string,
    nowait: fields[2] as boolean
  };
  return args;
}

function decodeQueuePurgeOk(r: Deno.SyncReader): QueuePurgeOk {
  const fields = decodeFields(r, ["long"]);
  const args = { messageCount: fields[0] as number };
  return args;
}

function decodeQueueDelete(r: Deno.SyncReader): QueueDelete {
  const fields = decodeFields(r, ["short", "shortstr", "bit", "bit", "bit"]);
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
  const fields = decodeFields(r, ["long"]);
  const args = { messageCount: fields[0] as number };
  return args;
}

function decodeQueueUnbind(r: Deno.SyncReader): QueueUnbind {
  const fields = decodeFields(
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
  const fields = decodeFields(r, []);
  const args = {};
  return args;
}

function decodeBasicQos(r: Deno.SyncReader): BasicQos {
  const fields = decodeFields(r, ["long", "short", "bit"]);
  const args = {
    prefetchSize: fields[0] as number,
    prefetchCount: fields[1] as number,
    global: fields[2] as boolean
  };
  return args;
}

function decodeBasicQosOk(r: Deno.SyncReader): BasicQosOk {
  const fields = decodeFields(r, []);
  const args = {};
  return args;
}

function decodeBasicConsume(r: Deno.SyncReader): BasicConsume {
  const fields = decodeFields(
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
  const fields = decodeFields(r, ["shortstr"]);
  const args = { consumerTag: fields[0] as string };
  return args;
}

function decodeBasicCancel(r: Deno.SyncReader): BasicCancel {
  const fields = decodeFields(r, ["shortstr", "bit"]);
  const args = {
    consumerTag: fields[0] as string,
    nowait: fields[1] as boolean
  };
  return args;
}

function decodeBasicCancelOk(r: Deno.SyncReader): BasicCancelOk {
  const fields = decodeFields(r, ["shortstr"]);
  const args = { consumerTag: fields[0] as string };
  return args;
}

function decodeBasicPublish(r: Deno.SyncReader): BasicPublish {
  const fields = decodeFields(
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
  const fields = decodeFields(
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
  const fields = decodeFields(
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
  const fields = decodeFields(r, ["short", "shortstr", "bit"]);
  const args = {
    ticket: fields[0] as number,
    queue: fields[1] as string,
    noAck: fields[2] as boolean
  };
  return args;
}

function decodeBasicGetOk(r: Deno.SyncReader): BasicGetOk {
  const fields = decodeFields(
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
  const fields = decodeFields(r, ["shortstr"]);
  const args = { clusterId: fields[0] as string };
  return args;
}

function decodeBasicAck(r: Deno.SyncReader): BasicAck {
  const fields = decodeFields(r, ["longlong", "bit"]);
  const args = {
    deliveryTag: fields[0] as bigint,
    multiple: fields[1] as boolean
  };
  return args;
}

function decodeBasicReject(r: Deno.SyncReader): BasicReject {
  const fields = decodeFields(r, ["longlong", "bit"]);
  const args = {
    deliveryTag: fields[0] as bigint,
    requeue: fields[1] as boolean
  };
  return args;
}

function decodeBasicRecoverAsync(r: Deno.SyncReader): BasicRecoverAsync {
  const fields = decodeFields(r, ["bit"]);
  const args = { requeue: fields[0] as boolean };
  return args;
}

function decodeBasicRecover(r: Deno.SyncReader): BasicRecover {
  const fields = decodeFields(r, ["bit"]);
  const args = { requeue: fields[0] as boolean };
  return args;
}

function decodeBasicRecoverOk(r: Deno.SyncReader): BasicRecoverOk {
  const fields = decodeFields(r, []);
  const args = {};
  return args;
}

function decodeBasicNack(r: Deno.SyncReader): BasicNack {
  const fields = decodeFields(r, ["longlong", "bit", "bit"]);
  const args = {
    deliveryTag: fields[0] as bigint,
    multiple: fields[1] as boolean,
    requeue: fields[2] as boolean
  };
  return args;
}

function decodeTxSelect(r: Deno.SyncReader): TxSelect {
  const fields = decodeFields(r, []);
  const args = {};
  return args;
}

function decodeTxSelectOk(r: Deno.SyncReader): TxSelectOk {
  const fields = decodeFields(r, []);
  const args = {};
  return args;
}

function decodeTxCommit(r: Deno.SyncReader): TxCommit {
  const fields = decodeFields(r, []);
  const args = {};
  return args;
}

function decodeTxCommitOk(r: Deno.SyncReader): TxCommitOk {
  const fields = decodeFields(r, []);
  const args = {};
  return args;
}

function decodeTxRollback(r: Deno.SyncReader): TxRollback {
  const fields = decodeFields(r, []);
  const args = {};
  return args;
}

function decodeTxRollbackOk(r: Deno.SyncReader): TxRollbackOk {
  const fields = decodeFields(r, []);
  const args = {};
  return args;
}

function decodeConfirmSelect(r: Deno.SyncReader): ConfirmSelect {
  const fields = decodeFields(r, ["bit"]);
  const args = { nowait: fields[0] as boolean };
  return args;
}

function decodeConfirmSelectOk(r: Deno.SyncReader): ConfirmSelectOk {
  const fields = decodeFields(r, []);
  const args = {};
  return args;
}

export function encodeMethod(method: SendMethod): Uint8Array {
  switch (method.classId) {
    case 10: {
      switch (method.methodId) {
        case 10:
          return encodeConnectionStart(method.args);
        case 11:
          return encodeConnectionStartOk(method.args);
        case 20:
          return encodeConnectionSecure(method.args);
        case 21:
          return encodeConnectionSecureOk(method.args);
        case 30:
          return encodeConnectionTune(method.args);
        case 31:
          return encodeConnectionTuneOk(method.args);
        case 40:
          return encodeConnectionOpen(method.args);
        case 41:
          return encodeConnectionOpenOk(method.args);
        case 50:
          return encodeConnectionClose(method.args);
        case 51:
          return encodeConnectionCloseOk(method.args);
        case 60:
          return encodeConnectionBlocked(method.args);
        case 61:
          return encodeConnectionUnblocked(method.args);
        case 70:
          return encodeConnectionUpdateSecret(method.args);
        case 71:
          return encodeConnectionUpdateSecretOk(method.args);
        default:
          throw new Error(
            "Unknown method " + method!.methodId + " for class 'connection'"
          );
      }
    }

    case 20: {
      switch (method.methodId) {
        case 10:
          return encodeChannelOpen(method.args);
        case 11:
          return encodeChannelOpenOk(method.args);
        case 20:
          return encodeChannelFlow(method.args);
        case 21:
          return encodeChannelFlowOk(method.args);
        case 40:
          return encodeChannelClose(method.args);
        case 41:
          return encodeChannelCloseOk(method.args);
        default:
          throw new Error(
            "Unknown method " + method!.methodId + " for class 'channel'"
          );
      }
    }

    case 30: {
      switch (method.methodId) {
        case 10:
          return encodeAccessRequest(method.args);
        case 11:
          return encodeAccessRequestOk(method.args);
        default:
          throw new Error(
            "Unknown method " + method!.methodId + " for class 'access'"
          );
      }
    }

    case 40: {
      switch (method.methodId) {
        case 10:
          return encodeExchangeDeclare(method.args);
        case 11:
          return encodeExchangeDeclareOk(method.args);
        case 20:
          return encodeExchangeDelete(method.args);
        case 21:
          return encodeExchangeDeleteOk(method.args);
        case 30:
          return encodeExchangeBind(method.args);
        case 31:
          return encodeExchangeBindOk(method.args);
        case 40:
          return encodeExchangeUnbind(method.args);
        case 51:
          return encodeExchangeUnbindOk(method.args);
        default:
          throw new Error(
            "Unknown method " + method!.methodId + " for class 'exchange'"
          );
      }
    }

    case 50: {
      switch (method.methodId) {
        case 10:
          return encodeQueueDeclare(method.args);
        case 11:
          return encodeQueueDeclareOk(method.args);
        case 20:
          return encodeQueueBind(method.args);
        case 21:
          return encodeQueueBindOk(method.args);
        case 30:
          return encodeQueuePurge(method.args);
        case 31:
          return encodeQueuePurgeOk(method.args);
        case 40:
          return encodeQueueDelete(method.args);
        case 41:
          return encodeQueueDeleteOk(method.args);
        case 50:
          return encodeQueueUnbind(method.args);
        case 51:
          return encodeQueueUnbindOk(method.args);
        default:
          throw new Error(
            "Unknown method " + method!.methodId + " for class 'queue'"
          );
      }
    }

    case 60: {
      switch (method.methodId) {
        case 10:
          return encodeBasicQos(method.args);
        case 11:
          return encodeBasicQosOk(method.args);
        case 20:
          return encodeBasicConsume(method.args);
        case 21:
          return encodeBasicConsumeOk(method.args);
        case 30:
          return encodeBasicCancel(method.args);
        case 31:
          return encodeBasicCancelOk(method.args);
        case 40:
          return encodeBasicPublish(method.args);
        case 50:
          return encodeBasicReturn(method.args);
        case 60:
          return encodeBasicDeliver(method.args);
        case 70:
          return encodeBasicGet(method.args);
        case 71:
          return encodeBasicGetOk(method.args);
        case 72:
          return encodeBasicGetEmpty(method.args);
        case 80:
          return encodeBasicAck(method.args);
        case 90:
          return encodeBasicReject(method.args);
        case 100:
          return encodeBasicRecoverAsync(method.args);
        case 110:
          return encodeBasicRecover(method.args);
        case 111:
          return encodeBasicRecoverOk(method.args);
        case 120:
          return encodeBasicNack(method.args);
        default:
          throw new Error(
            "Unknown method " + method!.methodId + " for class 'basic'"
          );
      }
    }

    case 90: {
      switch (method.methodId) {
        case 10:
          return encodeTxSelect(method.args);
        case 11:
          return encodeTxSelectOk(method.args);
        case 20:
          return encodeTxCommit(method.args);
        case 21:
          return encodeTxCommitOk(method.args);
        case 30:
          return encodeTxRollback(method.args);
        case 31:
          return encodeTxRollbackOk(method.args);
        default:
          throw new Error(
            "Unknown method " + method!.methodId + " for class 'tx'"
          );
      }
    }

    case 85: {
      switch (method.methodId) {
        case 10:
          return encodeConfirmSelect(method.args);
        case 11:
          return encodeConfirmSelectOk(method.args);
        default:
          throw new Error(
            "Unknown method " + method!.methodId + " for class 'confirm'"
          );
      }
    }

    default:
      throw new Error("Unknown class " + method!.classId);
  }
}

export function decodeMethod(data: Uint8Array): ReceiveMethod {
  const r = new Deno.Buffer(data);
  const classId = decodeShortUint(r);
  const methodId = decodeShortUint(r);
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
