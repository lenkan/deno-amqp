import * as enc from "./encoding/mod.ts";
import * as t from "./amqp_types.ts";

function encodeConnectionStart(args: t.ConnectionStartArgs): Uint8Array {
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

function encodeConnectionStartOk(args: t.ConnectionStartOkArgs): Uint8Array {
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

function encodeConnectionSecure(args: t.ConnectionSecureArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(10));
  w.writeSync(enc.encodeShortUint(20));
  w.writeSync(enc.encodeFields([
    { type: "longstr" as const, value: args.challenge },
  ]));
  return w.bytes();
}

function encodeConnectionSecureOk(args: t.ConnectionSecureOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(10));
  w.writeSync(enc.encodeShortUint(21));
  w.writeSync(enc.encodeFields([
    { type: "longstr" as const, value: args.response },
  ]));
  return w.bytes();
}

function encodeConnectionTune(args: t.ConnectionTuneArgs): Uint8Array {
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

function encodeConnectionTuneOk(args: t.ConnectionTuneOkArgs): Uint8Array {
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

function encodeConnectionOpen(args: t.ConnectionOpenArgs): Uint8Array {
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

function encodeConnectionOpenOk(args: t.ConnectionOpenOkArgs): Uint8Array {
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

function encodeConnectionClose(args: t.ConnectionCloseArgs): Uint8Array {
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

function encodeConnectionCloseOk(args: t.ConnectionCloseOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(10));
  w.writeSync(enc.encodeShortUint(51));
  w.writeSync(enc.encodeFields([]));
  return w.bytes();
}

function encodeConnectionBlocked(args: t.ConnectionBlockedArgs): Uint8Array {
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

function encodeConnectionUnblocked(
  args: t.ConnectionUnblockedArgs,
): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(10));
  w.writeSync(enc.encodeShortUint(61));
  w.writeSync(enc.encodeFields([]));
  return w.bytes();
}

function encodeConnectionUpdateSecret(
  args: t.ConnectionUpdateSecretArgs,
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
  args: t.ConnectionUpdateSecretOkArgs,
): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(10));
  w.writeSync(enc.encodeShortUint(71));
  w.writeSync(enc.encodeFields([]));
  return w.bytes();
}

function encodeChannelOpen(args: t.ChannelOpenArgs): Uint8Array {
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

function encodeChannelOpenOk(args: t.ChannelOpenOkArgs): Uint8Array {
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

function encodeChannelFlow(args: t.ChannelFlowArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(20));
  w.writeSync(enc.encodeShortUint(20));
  w.writeSync(enc.encodeFields([
    { type: "bit" as const, value: args.active },
  ]));
  return w.bytes();
}

function encodeChannelFlowOk(args: t.ChannelFlowOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(20));
  w.writeSync(enc.encodeShortUint(21));
  w.writeSync(enc.encodeFields([
    { type: "bit" as const, value: args.active },
  ]));
  return w.bytes();
}

function encodeChannelClose(args: t.ChannelCloseArgs): Uint8Array {
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

function encodeChannelCloseOk(args: t.ChannelCloseOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(20));
  w.writeSync(enc.encodeShortUint(41));
  w.writeSync(enc.encodeFields([]));
  return w.bytes();
}

function encodeAccessRequest(args: t.AccessRequestArgs): Uint8Array {
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

function encodeAccessRequestOk(args: t.AccessRequestOkArgs): Uint8Array {
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

function encodeExchangeDeclare(args: t.ExchangeDeclareArgs): Uint8Array {
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

function encodeExchangeDeclareOk(args: t.ExchangeDeclareOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(40));
  w.writeSync(enc.encodeShortUint(11));
  w.writeSync(enc.encodeFields([]));
  return w.bytes();
}

function encodeExchangeDelete(args: t.ExchangeDeleteArgs): Uint8Array {
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

function encodeExchangeDeleteOk(args: t.ExchangeDeleteOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(40));
  w.writeSync(enc.encodeShortUint(21));
  w.writeSync(enc.encodeFields([]));
  return w.bytes();
}

function encodeExchangeBind(args: t.ExchangeBindArgs): Uint8Array {
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

function encodeExchangeBindOk(args: t.ExchangeBindOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(40));
  w.writeSync(enc.encodeShortUint(31));
  w.writeSync(enc.encodeFields([]));
  return w.bytes();
}

function encodeExchangeUnbind(args: t.ExchangeUnbindArgs): Uint8Array {
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

function encodeExchangeUnbindOk(args: t.ExchangeUnbindOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(40));
  w.writeSync(enc.encodeShortUint(51));
  w.writeSync(enc.encodeFields([]));
  return w.bytes();
}

function encodeQueueDeclare(args: t.QueueDeclareArgs): Uint8Array {
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

function encodeQueueDeclareOk(args: t.QueueDeclareOkArgs): Uint8Array {
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

function encodeQueueBind(args: t.QueueBindArgs): Uint8Array {
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

function encodeQueueBindOk(args: t.QueueBindOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(50));
  w.writeSync(enc.encodeShortUint(21));
  w.writeSync(enc.encodeFields([]));
  return w.bytes();
}

function encodeQueuePurge(args: t.QueuePurgeArgs): Uint8Array {
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

function encodeQueuePurgeOk(args: t.QueuePurgeOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(50));
  w.writeSync(enc.encodeShortUint(31));
  w.writeSync(enc.encodeFields([
    { type: "long" as const, value: args.messageCount },
  ]));
  return w.bytes();
}

function encodeQueueDelete(args: t.QueueDeleteArgs): Uint8Array {
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

function encodeQueueDeleteOk(args: t.QueueDeleteOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(50));
  w.writeSync(enc.encodeShortUint(41));
  w.writeSync(enc.encodeFields([
    { type: "long" as const, value: args.messageCount },
  ]));
  return w.bytes();
}

function encodeQueueUnbind(args: t.QueueUnbindArgs): Uint8Array {
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

function encodeQueueUnbindOk(args: t.QueueUnbindOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(50));
  w.writeSync(enc.encodeShortUint(51));
  w.writeSync(enc.encodeFields([]));
  return w.bytes();
}

function encodeBasicQos(args: t.BasicQosArgs): Uint8Array {
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

function encodeBasicQosOk(args: t.BasicQosOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(60));
  w.writeSync(enc.encodeShortUint(11));
  w.writeSync(enc.encodeFields([]));
  return w.bytes();
}

function encodeBasicConsume(args: t.BasicConsumeArgs): Uint8Array {
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

function encodeBasicConsumeOk(args: t.BasicConsumeOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(60));
  w.writeSync(enc.encodeShortUint(21));
  w.writeSync(enc.encodeFields([
    { type: "shortstr" as const, value: args.consumerTag },
  ]));
  return w.bytes();
}

function encodeBasicCancel(args: t.BasicCancelArgs): Uint8Array {
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

function encodeBasicCancelOk(args: t.BasicCancelOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(60));
  w.writeSync(enc.encodeShortUint(31));
  w.writeSync(enc.encodeFields([
    { type: "shortstr" as const, value: args.consumerTag },
  ]));
  return w.bytes();
}

function encodeBasicPublish(args: t.BasicPublishArgs): Uint8Array {
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

function encodeBasicReturn(args: t.BasicReturnArgs): Uint8Array {
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

function encodeBasicDeliver(args: t.BasicDeliverArgs): Uint8Array {
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

function encodeBasicGet(args: t.BasicGetArgs): Uint8Array {
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

function encodeBasicGetOk(args: t.BasicGetOkArgs): Uint8Array {
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

function encodeBasicGetEmpty(args: t.BasicGetEmptyArgs): Uint8Array {
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

function encodeBasicAck(args: t.BasicAckArgs): Uint8Array {
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

function encodeBasicReject(args: t.BasicRejectArgs): Uint8Array {
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

function encodeBasicRecoverAsync(args: t.BasicRecoverAsyncArgs): Uint8Array {
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

function encodeBasicRecover(args: t.BasicRecoverArgs): Uint8Array {
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

function encodeBasicRecoverOk(args: t.BasicRecoverOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(60));
  w.writeSync(enc.encodeShortUint(111));
  w.writeSync(enc.encodeFields([]));
  return w.bytes();
}

function encodeBasicNack(args: t.BasicNackArgs): Uint8Array {
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

function encodeTxSelect(args: t.TxSelectArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(90));
  w.writeSync(enc.encodeShortUint(10));
  w.writeSync(enc.encodeFields([]));
  return w.bytes();
}

function encodeTxSelectOk(args: t.TxSelectOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(90));
  w.writeSync(enc.encodeShortUint(11));
  w.writeSync(enc.encodeFields([]));
  return w.bytes();
}

function encodeTxCommit(args: t.TxCommitArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(90));
  w.writeSync(enc.encodeShortUint(20));
  w.writeSync(enc.encodeFields([]));
  return w.bytes();
}

function encodeTxCommitOk(args: t.TxCommitOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(90));
  w.writeSync(enc.encodeShortUint(21));
  w.writeSync(enc.encodeFields([]));
  return w.bytes();
}

function encodeTxRollback(args: t.TxRollbackArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(90));
  w.writeSync(enc.encodeShortUint(30));
  w.writeSync(enc.encodeFields([]));
  return w.bytes();
}

function encodeTxRollbackOk(args: t.TxRollbackOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(90));
  w.writeSync(enc.encodeShortUint(31));
  w.writeSync(enc.encodeFields([]));
  return w.bytes();
}

function encodeConfirmSelect(args: t.ConfirmSelectArgs): Uint8Array {
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

function encodeConfirmSelectOk(args: t.ConfirmSelectOkArgs): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(85));
  w.writeSync(enc.encodeShortUint(11));
  w.writeSync(enc.encodeFields([]));
  return w.bytes();
}

function decodeConnectionStart(r: Deno.SyncReader): t.ConnectionStart {
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

function decodeConnectionStartOk(r: Deno.SyncReader): t.ConnectionStartOk {
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

function decodeConnectionSecure(r: Deno.SyncReader): t.ConnectionSecure {
  const fields = enc.decodeFields(r, ["longstr"]);
  const args = { challenge: fields[0] as string };
  return args;
}

function decodeConnectionSecureOk(r: Deno.SyncReader): t.ConnectionSecureOk {
  const fields = enc.decodeFields(r, ["longstr"]);
  const args = { response: fields[0] as string };
  return args;
}

function decodeConnectionTune(r: Deno.SyncReader): t.ConnectionTune {
  const fields = enc.decodeFields(r, ["short", "long", "short"]);
  const args = {
    channelMax: fields[0] as number,
    frameMax: fields[1] as number,
    heartbeat: fields[2] as number,
  };
  return args;
}

function decodeConnectionTuneOk(r: Deno.SyncReader): t.ConnectionTuneOk {
  const fields = enc.decodeFields(r, ["short", "long", "short"]);
  const args = {
    channelMax: fields[0] as number,
    frameMax: fields[1] as number,
    heartbeat: fields[2] as number,
  };
  return args;
}

function decodeConnectionOpen(r: Deno.SyncReader): t.ConnectionOpen {
  const fields = enc.decodeFields(r, ["shortstr", "shortstr", "bit"]);
  const args = {
    virtualHost: fields[0] as string,
    capabilities: fields[1] as string,
    insist: fields[2] as boolean,
  };
  return args;
}

function decodeConnectionOpenOk(r: Deno.SyncReader): t.ConnectionOpenOk {
  const fields = enc.decodeFields(r, ["shortstr"]);
  const args = { knownHosts: fields[0] as string };
  return args;
}

function decodeConnectionClose(r: Deno.SyncReader): t.ConnectionClose {
  const fields = enc.decodeFields(r, ["short", "shortstr", "short", "short"]);
  const args = {
    replyCode: fields[0] as number,
    replyText: fields[1] as string,
    classId: fields[2] as number,
    methodId: fields[3] as number,
  };
  return args;
}

function decodeConnectionCloseOk(r: Deno.SyncReader): t.ConnectionCloseOk {
  const fields = enc.decodeFields(r, []);
  const args = {};
  return args;
}

function decodeConnectionBlocked(r: Deno.SyncReader): t.ConnectionBlocked {
  const fields = enc.decodeFields(r, ["shortstr"]);
  const args = { reason: fields[0] as string };
  return args;
}

function decodeConnectionUnblocked(r: Deno.SyncReader): t.ConnectionUnblocked {
  const fields = enc.decodeFields(r, []);
  const args = {};
  return args;
}

function decodeConnectionUpdateSecret(
  r: Deno.SyncReader,
): t.ConnectionUpdateSecret {
  const fields = enc.decodeFields(r, ["longstr", "shortstr"]);
  const args = { newSecret: fields[0] as string, reason: fields[1] as string };
  return args;
}

function decodeConnectionUpdateSecretOk(
  r: Deno.SyncReader,
): t.ConnectionUpdateSecretOk {
  const fields = enc.decodeFields(r, []);
  const args = {};
  return args;
}

function decodeChannelOpen(r: Deno.SyncReader): t.ChannelOpen {
  const fields = enc.decodeFields(r, ["shortstr"]);
  const args = { outOfBand: fields[0] as string };
  return args;
}

function decodeChannelOpenOk(r: Deno.SyncReader): t.ChannelOpenOk {
  const fields = enc.decodeFields(r, ["longstr"]);
  const args = { channelId: fields[0] as string };
  return args;
}

function decodeChannelFlow(r: Deno.SyncReader): t.ChannelFlow {
  const fields = enc.decodeFields(r, ["bit"]);
  const args = { active: fields[0] as boolean };
  return args;
}

function decodeChannelFlowOk(r: Deno.SyncReader): t.ChannelFlowOk {
  const fields = enc.decodeFields(r, ["bit"]);
  const args = { active: fields[0] as boolean };
  return args;
}

function decodeChannelClose(r: Deno.SyncReader): t.ChannelClose {
  const fields = enc.decodeFields(r, ["short", "shortstr", "short", "short"]);
  const args = {
    replyCode: fields[0] as number,
    replyText: fields[1] as string,
    classId: fields[2] as number,
    methodId: fields[3] as number,
  };
  return args;
}

function decodeChannelCloseOk(r: Deno.SyncReader): t.ChannelCloseOk {
  const fields = enc.decodeFields(r, []);
  const args = {};
  return args;
}

function decodeAccessRequest(r: Deno.SyncReader): t.AccessRequest {
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

function decodeAccessRequestOk(r: Deno.SyncReader): t.AccessRequestOk {
  const fields = enc.decodeFields(r, ["short"]);
  const args = { ticket: fields[0] as number };
  return args;
}

function decodeExchangeDeclare(r: Deno.SyncReader): t.ExchangeDeclare {
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

function decodeExchangeDeclareOk(r: Deno.SyncReader): t.ExchangeDeclareOk {
  const fields = enc.decodeFields(r, []);
  const args = {};
  return args;
}

function decodeExchangeDelete(r: Deno.SyncReader): t.ExchangeDelete {
  const fields = enc.decodeFields(r, ["short", "shortstr", "bit", "bit"]);
  const args = {
    ticket: fields[0] as number,
    exchange: fields[1] as string,
    ifUnused: fields[2] as boolean,
    nowait: fields[3] as boolean,
  };
  return args;
}

function decodeExchangeDeleteOk(r: Deno.SyncReader): t.ExchangeDeleteOk {
  const fields = enc.decodeFields(r, []);
  const args = {};
  return args;
}

function decodeExchangeBind(r: Deno.SyncReader): t.ExchangeBind {
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

function decodeExchangeBindOk(r: Deno.SyncReader): t.ExchangeBindOk {
  const fields = enc.decodeFields(r, []);
  const args = {};
  return args;
}

function decodeExchangeUnbind(r: Deno.SyncReader): t.ExchangeUnbind {
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

function decodeExchangeUnbindOk(r: Deno.SyncReader): t.ExchangeUnbindOk {
  const fields = enc.decodeFields(r, []);
  const args = {};
  return args;
}

function decodeQueueDeclare(r: Deno.SyncReader): t.QueueDeclare {
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

function decodeQueueDeclareOk(r: Deno.SyncReader): t.QueueDeclareOk {
  const fields = enc.decodeFields(r, ["shortstr", "long", "long"]);
  const args = {
    queue: fields[0] as string,
    messageCount: fields[1] as number,
    consumerCount: fields[2] as number,
  };
  return args;
}

function decodeQueueBind(r: Deno.SyncReader): t.QueueBind {
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

function decodeQueueBindOk(r: Deno.SyncReader): t.QueueBindOk {
  const fields = enc.decodeFields(r, []);
  const args = {};
  return args;
}

function decodeQueuePurge(r: Deno.SyncReader): t.QueuePurge {
  const fields = enc.decodeFields(r, ["short", "shortstr", "bit"]);
  const args = {
    ticket: fields[0] as number,
    queue: fields[1] as string,
    nowait: fields[2] as boolean,
  };
  return args;
}

function decodeQueuePurgeOk(r: Deno.SyncReader): t.QueuePurgeOk {
  const fields = enc.decodeFields(r, ["long"]);
  const args = { messageCount: fields[0] as number };
  return args;
}

function decodeQueueDelete(r: Deno.SyncReader): t.QueueDelete {
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

function decodeQueueDeleteOk(r: Deno.SyncReader): t.QueueDeleteOk {
  const fields = enc.decodeFields(r, ["long"]);
  const args = { messageCount: fields[0] as number };
  return args;
}

function decodeQueueUnbind(r: Deno.SyncReader): t.QueueUnbind {
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

function decodeQueueUnbindOk(r: Deno.SyncReader): t.QueueUnbindOk {
  const fields = enc.decodeFields(r, []);
  const args = {};
  return args;
}

function decodeBasicQos(r: Deno.SyncReader): t.BasicQos {
  const fields = enc.decodeFields(r, ["long", "short", "bit"]);
  const args = {
    prefetchSize: fields[0] as number,
    prefetchCount: fields[1] as number,
    global: fields[2] as boolean,
  };
  return args;
}

function decodeBasicQosOk(r: Deno.SyncReader): t.BasicQosOk {
  const fields = enc.decodeFields(r, []);
  const args = {};
  return args;
}

function decodeBasicConsume(r: Deno.SyncReader): t.BasicConsume {
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

function decodeBasicConsumeOk(r: Deno.SyncReader): t.BasicConsumeOk {
  const fields = enc.decodeFields(r, ["shortstr"]);
  const args = { consumerTag: fields[0] as string };
  return args;
}

function decodeBasicCancel(r: Deno.SyncReader): t.BasicCancel {
  const fields = enc.decodeFields(r, ["shortstr", "bit"]);
  const args = {
    consumerTag: fields[0] as string,
    nowait: fields[1] as boolean,
  };
  return args;
}

function decodeBasicCancelOk(r: Deno.SyncReader): t.BasicCancelOk {
  const fields = enc.decodeFields(r, ["shortstr"]);
  const args = { consumerTag: fields[0] as string };
  return args;
}

function decodeBasicPublish(r: Deno.SyncReader): t.BasicPublish {
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

function decodeBasicReturn(r: Deno.SyncReader): t.BasicReturn {
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

function decodeBasicDeliver(r: Deno.SyncReader): t.BasicDeliver {
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

function decodeBasicGet(r: Deno.SyncReader): t.BasicGet {
  const fields = enc.decodeFields(r, ["short", "shortstr", "bit"]);
  const args = {
    ticket: fields[0] as number,
    queue: fields[1] as string,
    noAck: fields[2] as boolean,
  };
  return args;
}

function decodeBasicGetOk(r: Deno.SyncReader): t.BasicGetOk {
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

function decodeBasicGetEmpty(r: Deno.SyncReader): t.BasicGetEmpty {
  const fields = enc.decodeFields(r, ["shortstr"]);
  const args = { clusterId: fields[0] as string };
  return args;
}

function decodeBasicAck(r: Deno.SyncReader): t.BasicAck {
  const fields = enc.decodeFields(r, ["longlong", "bit"]);
  const args = {
    deliveryTag: Number(fields[0]),
    multiple: fields[1] as boolean,
  };
  return args;
}

function decodeBasicReject(r: Deno.SyncReader): t.BasicReject {
  const fields = enc.decodeFields(r, ["longlong", "bit"]);
  const args = {
    deliveryTag: Number(fields[0]),
    requeue: fields[1] as boolean,
  };
  return args;
}

function decodeBasicRecoverAsync(r: Deno.SyncReader): t.BasicRecoverAsync {
  const fields = enc.decodeFields(r, ["bit"]);
  const args = { requeue: fields[0] as boolean };
  return args;
}

function decodeBasicRecover(r: Deno.SyncReader): t.BasicRecover {
  const fields = enc.decodeFields(r, ["bit"]);
  const args = { requeue: fields[0] as boolean };
  return args;
}

function decodeBasicRecoverOk(r: Deno.SyncReader): t.BasicRecoverOk {
  const fields = enc.decodeFields(r, []);
  const args = {};
  return args;
}

function decodeBasicNack(r: Deno.SyncReader): t.BasicNack {
  const fields = enc.decodeFields(r, ["longlong", "bit", "bit"]);
  const args = {
    deliveryTag: Number(fields[0]),
    multiple: fields[1] as boolean,
    requeue: fields[2] as boolean,
  };
  return args;
}

function decodeTxSelect(r: Deno.SyncReader): t.TxSelect {
  const fields = enc.decodeFields(r, []);
  const args = {};
  return args;
}

function decodeTxSelectOk(r: Deno.SyncReader): t.TxSelectOk {
  const fields = enc.decodeFields(r, []);
  const args = {};
  return args;
}

function decodeTxCommit(r: Deno.SyncReader): t.TxCommit {
  const fields = enc.decodeFields(r, []);
  const args = {};
  return args;
}

function decodeTxCommitOk(r: Deno.SyncReader): t.TxCommitOk {
  const fields = enc.decodeFields(r, []);
  const args = {};
  return args;
}

function decodeTxRollback(r: Deno.SyncReader): t.TxRollback {
  const fields = enc.decodeFields(r, []);
  const args = {};
  return args;
}

function decodeTxRollbackOk(r: Deno.SyncReader): t.TxRollbackOk {
  const fields = enc.decodeFields(r, []);
  const args = {};
  return args;
}

function decodeConfirmSelect(r: Deno.SyncReader): t.ConfirmSelect {
  const fields = enc.decodeFields(r, ["bit"]);
  const args = { nowait: fields[0] as boolean };
  return args;
}

function decodeConfirmSelectOk(r: Deno.SyncReader): t.ConfirmSelectOk {
  const fields = enc.decodeFields(r, []);
  const args = {};
  return args;
}

function encodeConnectionHeader(header: t.ConnectionHeader): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(10));
  w.writeSync(enc.encodeShortUint(0));
  w.writeSync(enc.encodeLongLongUint(BigInt(header.size)));
  w.writeSync(enc.encodeOptionalFields([]));
  return w.bytes();
}

function encodeChannelHeader(header: t.ChannelHeader): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(20));
  w.writeSync(enc.encodeShortUint(0));
  w.writeSync(enc.encodeLongLongUint(BigInt(header.size)));
  w.writeSync(enc.encodeOptionalFields([]));
  return w.bytes();
}

function encodeAccessHeader(header: t.AccessHeader): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(30));
  w.writeSync(enc.encodeShortUint(0));
  w.writeSync(enc.encodeLongLongUint(BigInt(header.size)));
  w.writeSync(enc.encodeOptionalFields([]));
  return w.bytes();
}

function encodeExchangeHeader(header: t.ExchangeHeader): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(40));
  w.writeSync(enc.encodeShortUint(0));
  w.writeSync(enc.encodeLongLongUint(BigInt(header.size)));
  w.writeSync(enc.encodeOptionalFields([]));
  return w.bytes();
}

function encodeQueueHeader(header: t.QueueHeader): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(50));
  w.writeSync(enc.encodeShortUint(0));
  w.writeSync(enc.encodeLongLongUint(BigInt(header.size)));
  w.writeSync(enc.encodeOptionalFields([]));
  return w.bytes();
}

function encodeBasicHeader(header: t.BasicHeader): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(60));
  w.writeSync(enc.encodeShortUint(0));
  w.writeSync(enc.encodeLongLongUint(BigInt(header.size)));
  w.writeSync(enc.encodeOptionalFields([
    { type: "shortstr", value: header.props.contentType },
    { type: "shortstr", value: header.props.contentEncoding },
    { type: "table", value: header.props.headers },
    { type: "octet", value: header.props.deliveryMode },
    { type: "octet", value: header.props.priority },
    { type: "shortstr", value: header.props.correlationId },
    { type: "shortstr", value: header.props.replyTo },
    { type: "shortstr", value: header.props.expiration },
    { type: "shortstr", value: header.props.messageId },
    {
      type: "timestamp",
      value: header.props.timestamp !== undefined
        ? BigInt(header.props.timestamp)
        : undefined,
    },
    { type: "shortstr", value: header.props.type },
    { type: "shortstr", value: header.props.userId },
    { type: "shortstr", value: header.props.appId },
    { type: "shortstr", value: header.props.clusterId },
  ]));
  return w.bytes();
}

function encodeTxHeader(header: t.TxHeader): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(90));
  w.writeSync(enc.encodeShortUint(0));
  w.writeSync(enc.encodeLongLongUint(BigInt(header.size)));
  w.writeSync(enc.encodeOptionalFields([]));
  return w.bytes();
}

function encodeConfirmHeader(header: t.ConfirmHeader): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(85));
  w.writeSync(enc.encodeShortUint(0));
  w.writeSync(enc.encodeLongLongUint(BigInt(header.size)));
  w.writeSync(enc.encodeOptionalFields([]));
  return w.bytes();
}

function decodeConnectionHeader(r: Deno.SyncReader): t.ConnectionHeader {
  const weight = enc.decodeShortUint(r);
  const size = Number(enc.decodeLongLongUint(r));
  const fields = enc.decodeOptionalFields(r, []);
  const props = {};

  return { classId: 10, size, props };
}

function decodeChannelHeader(r: Deno.SyncReader): t.ChannelHeader {
  const weight = enc.decodeShortUint(r);
  const size = Number(enc.decodeLongLongUint(r));
  const fields = enc.decodeOptionalFields(r, []);
  const props = {};

  return { classId: 20, size, props };
}

function decodeAccessHeader(r: Deno.SyncReader): t.AccessHeader {
  const weight = enc.decodeShortUint(r);
  const size = Number(enc.decodeLongLongUint(r));
  const fields = enc.decodeOptionalFields(r, []);
  const props = {};

  return { classId: 30, size, props };
}

function decodeExchangeHeader(r: Deno.SyncReader): t.ExchangeHeader {
  const weight = enc.decodeShortUint(r);
  const size = Number(enc.decodeLongLongUint(r));
  const fields = enc.decodeOptionalFields(r, []);
  const props = {};

  return { classId: 40, size, props };
}

function decodeQueueHeader(r: Deno.SyncReader): t.QueueHeader {
  const weight = enc.decodeShortUint(r);
  const size = Number(enc.decodeLongLongUint(r));
  const fields = enc.decodeOptionalFields(r, []);
  const props = {};

  return { classId: 50, size, props };
}

function decodeBasicHeader(r: Deno.SyncReader): t.BasicHeader {
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

function decodeTxHeader(r: Deno.SyncReader): t.TxHeader {
  const weight = enc.decodeShortUint(r);
  const size = Number(enc.decodeLongLongUint(r));
  const fields = enc.decodeOptionalFields(r, []);
  const props = {};

  return { classId: 90, size, props };
}

function decodeConfirmHeader(r: Deno.SyncReader): t.ConfirmHeader {
  const weight = enc.decodeShortUint(r);
  const size = Number(enc.decodeLongLongUint(r));
  const fields = enc.decodeOptionalFields(r, []);
  const props = {};

  return { classId: 85, size, props };
}

export function decodeMethod(data: Uint8Array): t.ReceiveMethod {
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

export function encodeMethod(method: t.SendMethod): Uint8Array {
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
            "Unknown method " + method!.methodId + " for class 'connection'",
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
            "Unknown method " + method!.methodId + " for class 'channel'",
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
            "Unknown method " + method!.methodId + " for class 'access'",
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
            "Unknown method " + method!.methodId + " for class 'exchange'",
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
            "Unknown method " + method!.methodId + " for class 'queue'",
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
            "Unknown method " + method!.methodId + " for class 'basic'",
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
            "Unknown method " + method!.methodId + " for class 'tx'",
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
            "Unknown method " + method!.methodId + " for class 'confirm'",
          );
      }
    }

    default:
      throw new Error("Unknown class " + method!.classId);
  }
}

export function decodeHeader(data: Uint8Array): t.Header {
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

export function encodeHeader(header: t.Header): Uint8Array {
  switch (header.classId) {
    case 10:
      return encodeConnectionHeader(header);
    case 20:
      return encodeChannelHeader(header);
    case 30:
      return encodeAccessHeader(header);
    case 40:
      return encodeExchangeHeader(header);
    case 50:
      return encodeQueueHeader(header);
    case 60:
      return encodeBasicHeader(header);
    case 90:
      return encodeTxHeader(header);
    case 85:
      return encodeConfirmHeader(header);
    default:
      throw new Error("Unknown class " + header!.classId);
  }
}
