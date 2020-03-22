import * as enc from "../encoding/mod.ts";
import { SendMethod, ReceiveMethod, Header } from "../amqp_types.ts";

export function encodeMethod(method: SendMethod): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(method.classId));
  w.writeSync(enc.encodeShortUint(method.methodId));
  switch (method.classId) {
    case 10:
      {
        switch (method.methodId) {
          case 10:
            w.writeSync(enc.encodeFields([
              {
                type: "octet" as const,
                value: method.args.versionMajor !== undefined
                  ? method.args.versionMajor
                  : 0
              },
              {
                type: "octet" as const,
                value: method.args.versionMinor !== undefined
                  ? method.args.versionMinor
                  : 9
              },
              { type: "table" as const, value: method.args.serverProperties },
              {
                type: "longstr" as const,
                value: method.args.mechanisms !== undefined
                  ? method.args.mechanisms
                  : "PLAIN"
              },
              {
                type: "longstr" as const,
                value: method.args.locales !== undefined
                  ? method.args.locales
                  : "en_US"
              }
            ]));
            return w.bytes();
          case 11:
            w.writeSync(enc.encodeFields([
              { type: "table" as const, value: method.args.clientProperties },
              {
                type: "shortstr" as const,
                value: method.args.mechanism !== undefined
                  ? method.args.mechanism
                  : "PLAIN"
              },
              { type: "longstr" as const, value: method.args.response },
              {
                type: "shortstr" as const,
                value: method.args.locale !== undefined
                  ? method.args.locale
                  : "en_US"
              }
            ]));
            return w.bytes();
          case 20:
            w.writeSync(enc.encodeFields([
              { type: "longstr" as const, value: method.args.challenge }
            ]));
            return w.bytes();
          case 21:
            w.writeSync(enc.encodeFields([
              { type: "longstr" as const, value: method.args.response }
            ]));
            return w.bytes();
          case 30:
            w.writeSync(enc.encodeFields([
              {
                type: "short" as const,
                value: method.args.channelMax !== undefined
                  ? method.args.channelMax
                  : 0
              },
              {
                type: "long" as const,
                value: method.args.frameMax !== undefined
                  ? method.args.frameMax
                  : 0
              },
              {
                type: "short" as const,
                value: method.args.heartbeat !== undefined
                  ? method.args.heartbeat
                  : 0
              }
            ]));
            return w.bytes();
          case 31:
            w.writeSync(enc.encodeFields([
              {
                type: "short" as const,
                value: method.args.channelMax !== undefined
                  ? method.args.channelMax
                  : 0
              },
              {
                type: "long" as const,
                value: method.args.frameMax !== undefined
                  ? method.args.frameMax
                  : 0
              },
              {
                type: "short" as const,
                value: method.args.heartbeat !== undefined
                  ? method.args.heartbeat
                  : 0
              }
            ]));
            return w.bytes();
          case 40:
            w.writeSync(enc.encodeFields([
              {
                type: "shortstr" as const,
                value: method.args.virtualHost !== undefined
                  ? method.args.virtualHost
                  : "/"
              },
              {
                type: "shortstr" as const,
                value: method.args.capabilities !== undefined
                  ? method.args.capabilities
                  : ""
              },
              {
                type: "bit" as const,
                value: method.args.insist !== undefined
                  ? method.args.insist
                  : false
              }
            ]));
            return w.bytes();
          case 41:
            w.writeSync(enc.encodeFields([
              {
                type: "shortstr" as const,
                value: method.args.knownHosts !== undefined
                  ? method.args.knownHosts
                  : ""
              }
            ]));
            return w.bytes();
          case 50:
            w.writeSync(enc.encodeFields([
              { type: "short" as const, value: method.args.replyCode },
              {
                type: "shortstr" as const,
                value: method.args.replyText !== undefined
                  ? method.args.replyText
                  : ""
              },
              { type: "short" as const, value: method.args.classId },
              { type: "short" as const, value: method.args.methodId }
            ]));
            return w.bytes();
          case 51:
            w.writeSync(enc.encodeFields([]));
            return w.bytes();
          case 60:
            w.writeSync(enc.encodeFields([
              {
                type: "shortstr" as const,
                value: method.args.reason !== undefined
                  ? method.args.reason
                  : ""
              }
            ]));
            return w.bytes();
          case 61:
            w.writeSync(enc.encodeFields([]));
            return w.bytes();
          case 70:
            w.writeSync(enc.encodeFields([
              { type: "longstr" as const, value: method.args.newSecret },
              { type: "shortstr" as const, value: method.args.reason }
            ]));
            return w.bytes();
          case 71:
            w.writeSync(enc.encodeFields([]));
            return w.bytes();
        }
      }
      break;

    case 20:
      {
        switch (method.methodId) {
          case 10:
            w.writeSync(enc.encodeFields([
              {
                type: "shortstr" as const,
                value: method.args.outOfBand !== undefined
                  ? method.args.outOfBand
                  : ""
              }
            ]));
            return w.bytes();
          case 11:
            w.writeSync(enc.encodeFields([
              {
                type: "longstr" as const,
                value: method.args.channelId !== undefined
                  ? method.args.channelId
                  : ""
              }
            ]));
            return w.bytes();
          case 20:
            w.writeSync(enc.encodeFields([
              { type: "bit" as const, value: method.args.active }
            ]));
            return w.bytes();
          case 21:
            w.writeSync(enc.encodeFields([
              { type: "bit" as const, value: method.args.active }
            ]));
            return w.bytes();
          case 40:
            w.writeSync(enc.encodeFields([
              { type: "short" as const, value: method.args.replyCode },
              {
                type: "shortstr" as const,
                value: method.args.replyText !== undefined
                  ? method.args.replyText
                  : ""
              },
              { type: "short" as const, value: method.args.classId },
              { type: "short" as const, value: method.args.methodId }
            ]));
            return w.bytes();
          case 41:
            w.writeSync(enc.encodeFields([]));
            return w.bytes();
        }
      }
      break;

    case 30:
      {
        switch (method.methodId) {
          case 10:
            w.writeSync(enc.encodeFields([
              {
                type: "shortstr" as const,
                value: method.args.realm !== undefined
                  ? method.args.realm
                  : "/data"
              },
              {
                type: "bit" as const,
                value: method.args.exclusive !== undefined
                  ? method.args.exclusive
                  : false
              },
              {
                type: "bit" as const,
                value: method.args.passive !== undefined
                  ? method.args.passive
                  : true
              },
              {
                type: "bit" as const,
                value: method.args.active !== undefined ? method.args.active
                  : true
              },
              {
                type: "bit" as const,
                value: method.args.write !== undefined ? method.args.write
                  : true
              },
              {
                type: "bit" as const,
                value: method.args.read !== undefined ? method.args.read : true
              }
            ]));
            return w.bytes();
          case 11:
            w.writeSync(enc.encodeFields([
              {
                type: "short" as const,
                value: method.args.ticket !== undefined
                  ? method.args.ticket
                  : 1
              }
            ]));
            return w.bytes();
        }
      }
      break;

    case 40:
      {
        switch (method.methodId) {
          case 10:
            w.writeSync(enc.encodeFields([
              {
                type: "short" as const,
                value: method.args.ticket !== undefined
                  ? method.args.ticket
                  : 0
              },
              { type: "shortstr" as const, value: method.args.exchange },
              {
                type: "shortstr" as const,
                value: method.args.type !== undefined ? method.args.type
                  : "direct"
              },
              {
                type: "bit" as const,
                value: method.args.passive !== undefined
                  ? method.args.passive
                  : false
              },
              {
                type: "bit" as const,
                value: method.args.durable !== undefined
                  ? method.args.durable
                  : false
              },
              {
                type: "bit" as const,
                value: method.args.autoDelete !== undefined
                  ? method.args.autoDelete
                  : false
              },
              {
                type: "bit" as const,
                value: method.args.internal !== undefined
                  ? method.args.internal
                  : false
              },
              {
                type: "bit" as const,
                value: method.args.nowait !== undefined ? method.args.nowait
                  : false
              },
              {
                type: "table" as const,
                value: method.args.arguments !== undefined
                  ? method.args.arguments
                  : {}
              }
            ]));
            return w.bytes();
          case 11:
            w.writeSync(enc.encodeFields([]));
            return w.bytes();
          case 20:
            w.writeSync(enc.encodeFields([
              {
                type: "short" as const,
                value: method.args.ticket !== undefined
                  ? method.args.ticket
                  : 0
              },
              { type: "shortstr" as const, value: method.args.exchange },
              {
                type: "bit" as const,
                value: method.args.ifUnused !== undefined
                  ? method.args.ifUnused
                  : false
              },
              {
                type: "bit" as const,
                value: method.args.nowait !== undefined ? method.args.nowait
                  : false
              }
            ]));
            return w.bytes();
          case 21:
            w.writeSync(enc.encodeFields([]));
            return w.bytes();
          case 30:
            w.writeSync(enc.encodeFields([
              {
                type: "short" as const,
                value: method.args.ticket !== undefined
                  ? method.args.ticket
                  : 0
              },
              { type: "shortstr" as const, value: method.args.destination },
              { type: "shortstr" as const, value: method.args.source },
              {
                type: "shortstr" as const,
                value: method.args.routingKey !== undefined
                  ? method.args.routingKey
                  : ""
              },
              {
                type: "bit" as const,
                value: method.args.nowait !== undefined ? method.args.nowait
                  : false
              },
              {
                type: "table" as const,
                value: method.args.arguments !== undefined
                  ? method.args.arguments
                  : {}
              }
            ]));
            return w.bytes();
          case 31:
            w.writeSync(enc.encodeFields([]));
            return w.bytes();
          case 40:
            w.writeSync(enc.encodeFields([
              {
                type: "short" as const,
                value: method.args.ticket !== undefined
                  ? method.args.ticket
                  : 0
              },
              { type: "shortstr" as const, value: method.args.destination },
              { type: "shortstr" as const, value: method.args.source },
              {
                type: "shortstr" as const,
                value: method.args.routingKey !== undefined
                  ? method.args.routingKey
                  : ""
              },
              {
                type: "bit" as const,
                value: method.args.nowait !== undefined ? method.args.nowait
                  : false
              },
              {
                type: "table" as const,
                value: method.args.arguments !== undefined
                  ? method.args.arguments
                  : {}
              }
            ]));
            return w.bytes();
          case 51:
            w.writeSync(enc.encodeFields([]));
            return w.bytes();
        }
      }
      break;

    case 50:
      {
        switch (method.methodId) {
          case 10:
            w.writeSync(enc.encodeFields([
              {
                type: "short" as const,
                value: method.args.ticket !== undefined
                  ? method.args.ticket
                  : 0
              },
              {
                type: "shortstr" as const,
                value: method.args.queue !== undefined ? method.args.queue : ""
              },
              {
                type: "bit" as const,
                value: method.args.passive !== undefined
                  ? method.args.passive
                  : false
              },
              {
                type: "bit" as const,
                value: method.args.durable !== undefined
                  ? method.args.durable
                  : false
              },
              {
                type: "bit" as const,
                value: method.args.exclusive !== undefined
                  ? method.args.exclusive
                  : false
              },
              {
                type: "bit" as const,
                value: method.args.autoDelete !== undefined
                  ? method.args.autoDelete
                  : false
              },
              {
                type: "bit" as const,
                value: method.args.nowait !== undefined ? method.args.nowait
                  : false
              },
              {
                type: "table" as const,
                value: method.args.arguments !== undefined
                  ? method.args.arguments
                  : {}
              }
            ]));
            return w.bytes();
          case 11:
            w.writeSync(enc.encodeFields([
              { type: "shortstr" as const, value: method.args.queue },
              { type: "long" as const, value: method.args.messageCount },
              { type: "long" as const, value: method.args.consumerCount }
            ]));
            return w.bytes();
          case 20:
            w.writeSync(enc.encodeFields([
              {
                type: "short" as const,
                value: method.args.ticket !== undefined
                  ? method.args.ticket
                  : 0
              },
              {
                type: "shortstr" as const,
                value: method.args.queue !== undefined ? method.args.queue : ""
              },
              { type: "shortstr" as const, value: method.args.exchange },
              {
                type: "shortstr" as const,
                value: method.args.routingKey !== undefined
                  ? method.args.routingKey
                  : ""
              },
              {
                type: "bit" as const,
                value: method.args.nowait !== undefined ? method.args.nowait
                  : false
              },
              {
                type: "table" as const,
                value: method.args.arguments !== undefined
                  ? method.args.arguments
                  : {}
              }
            ]));
            return w.bytes();
          case 21:
            w.writeSync(enc.encodeFields([]));
            return w.bytes();
          case 30:
            w.writeSync(enc.encodeFields([
              {
                type: "short" as const,
                value: method.args.ticket !== undefined
                  ? method.args.ticket
                  : 0
              },
              {
                type: "shortstr" as const,
                value: method.args.queue !== undefined ? method.args.queue : ""
              },
              {
                type: "bit" as const,
                value: method.args.nowait !== undefined ? method.args.nowait
                  : false
              }
            ]));
            return w.bytes();
          case 31:
            w.writeSync(enc.encodeFields([
              { type: "long" as const, value: method.args.messageCount }
            ]));
            return w.bytes();
          case 40:
            w.writeSync(enc.encodeFields([
              {
                type: "short" as const,
                value: method.args.ticket !== undefined
                  ? method.args.ticket
                  : 0
              },
              {
                type: "shortstr" as const,
                value: method.args.queue !== undefined ? method.args.queue : ""
              },
              {
                type: "bit" as const,
                value: method.args.ifUnused !== undefined
                  ? method.args.ifUnused
                  : false
              },
              {
                type: "bit" as const,
                value: method.args.ifEmpty !== undefined
                  ? method.args.ifEmpty
                  : false
              },
              {
                type: "bit" as const,
                value: method.args.nowait !== undefined ? method.args.nowait
                  : false
              }
            ]));
            return w.bytes();
          case 41:
            w.writeSync(enc.encodeFields([
              { type: "long" as const, value: method.args.messageCount }
            ]));
            return w.bytes();
          case 50:
            w.writeSync(enc.encodeFields([
              {
                type: "short" as const,
                value: method.args.ticket !== undefined
                  ? method.args.ticket
                  : 0
              },
              {
                type: "shortstr" as const,
                value: method.args.queue !== undefined ? method.args.queue : ""
              },
              { type: "shortstr" as const, value: method.args.exchange },
              {
                type: "shortstr" as const,
                value: method.args.routingKey !== undefined
                  ? method.args.routingKey
                  : ""
              },
              {
                type: "table" as const,
                value: method.args.arguments !== undefined
                  ? method.args.arguments
                  : {}
              }
            ]));
            return w.bytes();
          case 51:
            w.writeSync(enc.encodeFields([]));
            return w.bytes();
        }
      }
      break;

    case 60:
      {
        switch (method.methodId) {
          case 10:
            w.writeSync(enc.encodeFields([
              {
                type: "long" as const,
                value: method.args.prefetchSize !== undefined
                  ? method.args.prefetchSize
                  : 0
              },
              {
                type: "short" as const,
                value: method.args.prefetchCount !== undefined
                  ? method.args.prefetchCount
                  : 0
              },
              {
                type: "bit" as const,
                value: method.args.global !== undefined
                  ? method.args.global
                  : false
              }
            ]));
            return w.bytes();
          case 11:
            w.writeSync(enc.encodeFields([]));
            return w.bytes();
          case 20:
            w.writeSync(enc.encodeFields([
              {
                type: "short" as const,
                value: method.args.ticket !== undefined
                  ? method.args.ticket
                  : 0
              },
              {
                type: "shortstr" as const,
                value: method.args.queue !== undefined ? method.args.queue : ""
              },
              {
                type: "shortstr" as const,
                value: method.args.consumerTag !== undefined
                  ? method.args.consumerTag
                  : ""
              },
              {
                type: "bit" as const,
                value: method.args.noLocal !== undefined
                  ? method.args.noLocal
                  : false
              },
              {
                type: "bit" as const,
                value: method.args.noAck !== undefined ? method.args.noAck
                  : false
              },
              {
                type: "bit" as const,
                value: method.args.exclusive !== undefined
                  ? method.args.exclusive
                  : false
              },
              {
                type: "bit" as const,
                value: method.args.nowait !== undefined ? method.args.nowait
                  : false
              },
              {
                type: "table" as const,
                value: method.args.arguments !== undefined
                  ? method.args.arguments
                  : {}
              }
            ]));
            return w.bytes();
          case 21:
            w.writeSync(enc.encodeFields([
              { type: "shortstr" as const, value: method.args.consumerTag }
            ]));
            return w.bytes();
          case 30:
            w.writeSync(enc.encodeFields([
              { type: "shortstr" as const, value: method.args.consumerTag },
              {
                type: "bit" as const,
                value: method.args.nowait !== undefined
                  ? method.args.nowait
                  : false
              }
            ]));
            return w.bytes();
          case 31:
            w.writeSync(enc.encodeFields([
              { type: "shortstr" as const, value: method.args.consumerTag }
            ]));
            return w.bytes();
          case 40:
            w.writeSync(enc.encodeFields([
              {
                type: "short" as const,
                value: method.args.ticket !== undefined
                  ? method.args.ticket
                  : 0
              },
              {
                type: "shortstr" as const,
                value: method.args.exchange !== undefined
                  ? method.args.exchange
                  : ""
              },
              {
                type: "shortstr" as const,
                value: method.args.routingKey !== undefined
                  ? method.args.routingKey
                  : ""
              },
              {
                type: "bit" as const,
                value: method.args.mandatory !== undefined
                  ? method.args.mandatory
                  : false
              },
              {
                type: "bit" as const,
                value: method.args.immediate !== undefined
                  ? method.args.immediate
                  : false
              }
            ]));
            return w.bytes();
          case 50:
            w.writeSync(enc.encodeFields([
              { type: "short" as const, value: method.args.replyCode },
              {
                type: "shortstr" as const,
                value: method.args.replyText !== undefined
                  ? method.args.replyText
                  : ""
              },
              { type: "shortstr" as const, value: method.args.exchange },
              { type: "shortstr" as const, value: method.args.routingKey }
            ]));
            return w.bytes();
          case 60:
            w.writeSync(enc.encodeFields([
              { type: "shortstr" as const, value: method.args.consumerTag },
              { type: "longlong" as const, value: method.args.deliveryTag },
              {
                type: "bit" as const,
                value: method.args.redelivered !== undefined
                  ? method.args.redelivered
                  : false
              },
              { type: "shortstr" as const, value: method.args.exchange },
              { type: "shortstr" as const, value: method.args.routingKey }
            ]));
            return w.bytes();
          case 70:
            w.writeSync(enc.encodeFields([
              {
                type: "short" as const,
                value: method.args.ticket !== undefined
                  ? method.args.ticket
                  : 0
              },
              {
                type: "shortstr" as const,
                value: method.args.queue !== undefined ? method.args.queue : ""
              },
              {
                type: "bit" as const,
                value: method.args.noAck !== undefined ? method.args.noAck
                  : false
              }
            ]));
            return w.bytes();
          case 71:
            w.writeSync(enc.encodeFields([
              { type: "longlong" as const, value: method.args.deliveryTag },
              {
                type: "bit" as const,
                value: method.args.redelivered !== undefined
                  ? method.args.redelivered
                  : false
              },
              { type: "shortstr" as const, value: method.args.exchange },
              { type: "shortstr" as const, value: method.args.routingKey },
              { type: "long" as const, value: method.args.messageCount }
            ]));
            return w.bytes();
          case 72:
            w.writeSync(enc.encodeFields([
              {
                type: "shortstr" as const,
                value: method.args.clusterId !== undefined
                  ? method.args.clusterId
                  : ""
              }
            ]));
            return w.bytes();
          case 80:
            w.writeSync(enc.encodeFields([
              {
                type: "longlong" as const,
                value: method.args.deliveryTag !== undefined
                  ? method.args.deliveryTag
                  : BigInt(0)
              },
              {
                type: "bit" as const,
                value: method.args.multiple !== undefined
                  ? method.args.multiple
                  : false
              }
            ]));
            return w.bytes();
          case 90:
            w.writeSync(enc.encodeFields([
              { type: "longlong" as const, value: method.args.deliveryTag },
              {
                type: "bit" as const,
                value: method.args.requeue !== undefined
                  ? method.args.requeue
                  : true
              }
            ]));
            return w.bytes();
          case 100:
            w.writeSync(enc.encodeFields([
              {
                type: "bit" as const,
                value: method.args.requeue !== undefined
                  ? method.args.requeue
                  : false
              }
            ]));
            return w.bytes();
          case 110:
            w.writeSync(enc.encodeFields([
              {
                type: "bit" as const,
                value: method.args.requeue !== undefined
                  ? method.args.requeue
                  : false
              }
            ]));
            return w.bytes();
          case 111:
            w.writeSync(enc.encodeFields([]));
            return w.bytes();
          case 120:
            w.writeSync(enc.encodeFields([
              {
                type: "longlong" as const,
                value: method.args.deliveryTag !== undefined
                  ? method.args.deliveryTag
                  : BigInt(0)
              },
              {
                type: "bit" as const,
                value: method.args.multiple !== undefined
                  ? method.args.multiple
                  : false
              },
              {
                type: "bit" as const,
                value: method.args.requeue !== undefined
                  ? method.args.requeue
                  : true
              }
            ]));
            return w.bytes();
        }
      }
      break;

    case 90:
      {
        switch (method.methodId) {
          case 10:
            w.writeSync(enc.encodeFields([]));
            return w.bytes();
          case 11:
            w.writeSync(enc.encodeFields([]));
            return w.bytes();
          case 20:
            w.writeSync(enc.encodeFields([]));
            return w.bytes();
          case 21:
            w.writeSync(enc.encodeFields([]));
            return w.bytes();
          case 30:
            w.writeSync(enc.encodeFields([]));
            return w.bytes();
          case 31:
            w.writeSync(enc.encodeFields([]));
            return w.bytes();
        }
      }
      break;

    case 85:
      {
        switch (method.methodId) {
          case 10:
            w.writeSync(enc.encodeFields([
              {
                type: "bit" as const,
                value: method.args.nowait !== undefined
                  ? method.args.nowait
                  : false
              }
            ]));
            return w.bytes();
          case 11:
            w.writeSync(enc.encodeFields([]));
            return w.bytes();
        }
      }
      break;
  }
}

export function decodeMethod(data: Uint8Array): ReceiveMethod {
  const r = new Deno.Buffer(data);
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
          const args = {
            versionMajor: fields[0] as number,
            versionMinor: fields[1] as number,
            serverProperties: fields[2] as Record<string, unknown>,
            mechanisms: fields[3] as string,
            locales: fields[4] as string
          };
          return { classId, methodId, args };
        }
        case 11: {
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
          return { classId, methodId, args };
        }
        case 20: {
          const fields = enc.decodeFields(r, ["longstr"]);
          const args = { challenge: fields[0] as string };
          return { classId, methodId, args };
        }
        case 21: {
          const fields = enc.decodeFields(r, ["longstr"]);
          const args = { response: fields[0] as string };
          return { classId, methodId, args };
        }
        case 30: {
          const fields = enc.decodeFields(r, ["short", "long", "short"]);
          const args = {
            channelMax: fields[0] as number,
            frameMax: fields[1] as number,
            heartbeat: fields[2] as number
          };
          return { classId, methodId, args };
        }
        case 31: {
          const fields = enc.decodeFields(r, ["short", "long", "short"]);
          const args = {
            channelMax: fields[0] as number,
            frameMax: fields[1] as number,
            heartbeat: fields[2] as number
          };
          return { classId, methodId, args };
        }
        case 40: {
          const fields = enc.decodeFields(r, ["shortstr", "shortstr", "bit"]);
          const args = {
            virtualHost: fields[0] as string,
            capabilities: fields[1] as string,
            insist: fields[2] as boolean
          };
          return { classId, methodId, args };
        }
        case 41: {
          const fields = enc.decodeFields(r, ["shortstr"]);
          const args = { knownHosts: fields[0] as string };
          return { classId, methodId, args };
        }
        case 50: {
          const fields = enc.decodeFields(
            r,
            ["short", "shortstr", "short", "short"]
          );
          const args = {
            replyCode: fields[0] as number,
            replyText: fields[1] as string,
            classId: fields[2] as number,
            methodId: fields[3] as number
          };
          return { classId, methodId, args };
        }
        case 51: {
          const fields = enc.decodeFields(r, []);
          const args = {};
          return { classId, methodId, args };
        }
        case 60: {
          const fields = enc.decodeFields(r, ["shortstr"]);
          const args = { reason: fields[0] as string };
          return { classId, methodId, args };
        }
        case 61: {
          const fields = enc.decodeFields(r, []);
          const args = {};
          return { classId, methodId, args };
        }
        case 70: {
          const fields = enc.decodeFields(r, ["longstr", "shortstr"]);
          const args = {
            newSecret: fields[0] as string,
            reason: fields[1] as string
          };
          return { classId, methodId, args };
        }
        case 71: {
          const fields = enc.decodeFields(r, []);
          const args = {};
          return { classId, methodId, args };
        }
      }
      break;
    }

    case 20: {
      switch (methodId) {
        case 10: {
          const fields = enc.decodeFields(r, ["shortstr"]);
          const args = { outOfBand: fields[0] as string };
          return { classId, methodId, args };
        }
        case 11: {
          const fields = enc.decodeFields(r, ["longstr"]);
          const args = { channelId: fields[0] as string };
          return { classId, methodId, args };
        }
        case 20: {
          const fields = enc.decodeFields(r, ["bit"]);
          const args = { active: fields[0] as boolean };
          return { classId, methodId, args };
        }
        case 21: {
          const fields = enc.decodeFields(r, ["bit"]);
          const args = { active: fields[0] as boolean };
          return { classId, methodId, args };
        }
        case 40: {
          const fields = enc.decodeFields(
            r,
            ["short", "shortstr", "short", "short"]
          );
          const args = {
            replyCode: fields[0] as number,
            replyText: fields[1] as string,
            classId: fields[2] as number,
            methodId: fields[3] as number
          };
          return { classId, methodId, args };
        }
        case 41: {
          const fields = enc.decodeFields(r, []);
          const args = {};
          return { classId, methodId, args };
        }
      }
      break;
    }

    case 30: {
      switch (methodId) {
        case 10: {
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
          return { classId, methodId, args };
        }
        case 11: {
          const fields = enc.decodeFields(r, ["short"]);
          const args = { ticket: fields[0] as number };
          return { classId, methodId, args };
        }
      }
      break;
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
          return { classId, methodId, args };
        }
        case 11: {
          const fields = enc.decodeFields(r, []);
          const args = {};
          return { classId, methodId, args };
        }
        case 20: {
          const fields = enc.decodeFields(
            r,
            ["short", "shortstr", "bit", "bit"]
          );
          const args = {
            ticket: fields[0] as number,
            exchange: fields[1] as string,
            ifUnused: fields[2] as boolean,
            nowait: fields[3] as boolean
          };
          return { classId, methodId, args };
        }
        case 21: {
          const fields = enc.decodeFields(r, []);
          const args = {};
          return { classId, methodId, args };
        }
        case 30: {
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
          return { classId, methodId, args };
        }
        case 31: {
          const fields = enc.decodeFields(r, []);
          const args = {};
          return { classId, methodId, args };
        }
        case 40: {
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
          return { classId, methodId, args };
        }
        case 51: {
          const fields = enc.decodeFields(r, []);
          const args = {};
          return { classId, methodId, args };
        }
      }
      break;
    }

    case 50: {
      switch (methodId) {
        case 10: {
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
          return { classId, methodId, args };
        }
        case 11: {
          const fields = enc.decodeFields(r, ["shortstr", "long", "long"]);
          const args = {
            queue: fields[0] as string,
            messageCount: fields[1] as number,
            consumerCount: fields[2] as number
          };
          return { classId, methodId, args };
        }
        case 20: {
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
          return { classId, methodId, args };
        }
        case 21: {
          const fields = enc.decodeFields(r, []);
          const args = {};
          return { classId, methodId, args };
        }
        case 30: {
          const fields = enc.decodeFields(r, ["short", "shortstr", "bit"]);
          const args = {
            ticket: fields[0] as number,
            queue: fields[1] as string,
            nowait: fields[2] as boolean
          };
          return { classId, methodId, args };
        }
        case 31: {
          const fields = enc.decodeFields(r, ["long"]);
          const args = { messageCount: fields[0] as number };
          return { classId, methodId, args };
        }
        case 40: {
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
          return { classId, methodId, args };
        }
        case 41: {
          const fields = enc.decodeFields(r, ["long"]);
          const args = { messageCount: fields[0] as number };
          return { classId, methodId, args };
        }
        case 50: {
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
          return { classId, methodId, args };
        }
        case 51: {
          const fields = enc.decodeFields(r, []);
          const args = {};
          return { classId, methodId, args };
        }
      }
      break;
    }

    case 60: {
      switch (methodId) {
        case 10: {
          const fields = enc.decodeFields(r, ["long", "short", "bit"]);
          const args = {
            prefetchSize: fields[0] as number,
            prefetchCount: fields[1] as number,
            global: fields[2] as boolean
          };
          return { classId, methodId, args };
        }
        case 11: {
          const fields = enc.decodeFields(r, []);
          const args = {};
          return { classId, methodId, args };
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
          return { classId, methodId, args };
        }
        case 21: {
          const fields = enc.decodeFields(r, ["shortstr"]);
          const args = { consumerTag: fields[0] as string };
          return { classId, methodId, args };
        }
        case 30: {
          const fields = enc.decodeFields(r, ["shortstr", "bit"]);
          const args = {
            consumerTag: fields[0] as string,
            nowait: fields[1] as boolean
          };
          return { classId, methodId, args };
        }
        case 31: {
          const fields = enc.decodeFields(r, ["shortstr"]);
          const args = { consumerTag: fields[0] as string };
          return { classId, methodId, args };
        }
        case 40: {
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
          return { classId, methodId, args };
        }
        case 50: {
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
          return { classId, methodId, args };
        }
        case 60: {
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
          return { classId, methodId, args };
        }
        case 70: {
          const fields = enc.decodeFields(r, ["short", "shortstr", "bit"]);
          const args = {
            ticket: fields[0] as number,
            queue: fields[1] as string,
            noAck: fields[2] as boolean
          };
          return { classId, methodId, args };
        }
        case 71: {
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
          return { classId, methodId, args };
        }
        case 72: {
          const fields = enc.decodeFields(r, ["shortstr"]);
          const args = { clusterId: fields[0] as string };
          return { classId, methodId, args };
        }
        case 80: {
          const fields = enc.decodeFields(r, ["longlong", "bit"]);
          const args = {
            deliveryTag: fields[0] as bigint,
            multiple: fields[1] as boolean
          };
          return { classId, methodId, args };
        }
        case 90: {
          const fields = enc.decodeFields(r, ["longlong", "bit"]);
          const args = {
            deliveryTag: fields[0] as bigint,
            requeue: fields[1] as boolean
          };
          return { classId, methodId, args };
        }
        case 100: {
          const fields = enc.decodeFields(r, ["bit"]);
          const args = { requeue: fields[0] as boolean };
          return { classId, methodId, args };
        }
        case 110: {
          const fields = enc.decodeFields(r, ["bit"]);
          const args = { requeue: fields[0] as boolean };
          return { classId, methodId, args };
        }
        case 111: {
          const fields = enc.decodeFields(r, []);
          const args = {};
          return { classId, methodId, args };
        }
        case 120: {
          const fields = enc.decodeFields(r, ["longlong", "bit", "bit"]);
          const args = {
            deliveryTag: fields[0] as bigint,
            multiple: fields[1] as boolean,
            requeue: fields[2] as boolean
          };
          return { classId, methodId, args };
        }
      }
      break;
    }

    case 90: {
      switch (methodId) {
        case 10: {
          const fields = enc.decodeFields(r, []);
          const args = {};
          return { classId, methodId, args };
        }
        case 11: {
          const fields = enc.decodeFields(r, []);
          const args = {};
          return { classId, methodId, args };
        }
        case 20: {
          const fields = enc.decodeFields(r, []);
          const args = {};
          return { classId, methodId, args };
        }
        case 21: {
          const fields = enc.decodeFields(r, []);
          const args = {};
          return { classId, methodId, args };
        }
        case 30: {
          const fields = enc.decodeFields(r, []);
          const args = {};
          return { classId, methodId, args };
        }
        case 31: {
          const fields = enc.decodeFields(r, []);
          const args = {};
          return { classId, methodId, args };
        }
      }
      break;
    }

    case 85: {
      switch (methodId) {
        case 10: {
          const fields = enc.decodeFields(r, ["bit"]);
          const args = { nowait: fields[0] as boolean };
          return { classId, methodId, args };
        }
        case 11: {
          const fields = enc.decodeFields(r, []);
          const args = {};
          return { classId, methodId, args };
        }
      }
      break;
    }
  }

  throw new Error(`Unknown method ${classId} ${methodId}`);
}

export function encodeHeader(header: Header): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(header.classId));
  w.writeSync(enc.encodeShortUint(0));
  w.writeSync(enc.encodeLongLongUint(BigInt(header.size)));
  switch (header.classId) {
    case 10:
      {
        w.writeSync(enc.encodeOptionalFields([]));
        return w.bytes();
      }
    case 20:
      {
        w.writeSync(enc.encodeOptionalFields([]));
        return w.bytes();
      }
    case 30:
      {
        w.writeSync(enc.encodeOptionalFields([]));
        return w.bytes();
      }
    case 40:
      {
        w.writeSync(enc.encodeOptionalFields([]));
        return w.bytes();
      }
    case 50:
      {
        w.writeSync(enc.encodeOptionalFields([]));
        return w.bytes();
      }
    case 60:
      {
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
          { type: "timestamp", value: header.props.timestamp },
          { type: "shortstr", value: header.props.type },
          { type: "shortstr", value: header.props.userId },
          { type: "shortstr", value: header.props.appId },
          { type: "shortstr", value: header.props.clusterId }
        ]));
        return w.bytes();
      }
    case 90:
      {
        w.writeSync(enc.encodeOptionalFields([]));
        return w.bytes();
      }
    case 85:
      {
        w.writeSync(enc.encodeOptionalFields([]));
        return w.bytes();
      }
  }
}

export function decodeHeader(data: Uint8Array): Header {
  const r = new Deno.Buffer(data);
  const classId = enc.decodeShortUint(r);
  const weight = enc.decodeShortUint(r);
  const size = enc.decodeLongLongUint(r);
  switch (classId) {
    case 10:
      {
        const fields = enc.decodeOptionalFields(r, []);
        const props = {};

        return { classId, size, props };
      }
    case 20:
      {
        const fields = enc.decodeOptionalFields(r, []);
        const props = {};

        return { classId, size, props };
      }
    case 30:
      {
        const fields = enc.decodeOptionalFields(r, []);
        const props = {};

        return { classId, size, props };
      }
    case 40:
      {
        const fields = enc.decodeOptionalFields(r, []);
        const props = {};

        return { classId, size, props };
      }
    case 50:
      {
        const fields = enc.decodeOptionalFields(r, []);
        const props = {};

        return { classId, size, props };
      }
    case 60:
      {
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

        return { classId, size, props };
      }
    case 90:
      {
        const fields = enc.decodeOptionalFields(r, []);
        const props = {};

        return { classId, size, props };
      }
    case 85:
      {
        const fields = enc.decodeOptionalFields(r, []);
        const props = {};

        return { classId, size, props };
      }
  }

  throw new Error(`Unknown class ${classId}`);
}
