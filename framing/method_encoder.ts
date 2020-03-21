import * as enc from "./encoder.ts";
function field(
  type: enc.AmqpFieldType,
  value?: enc.AmqpFieldValue,
  defaultValue?: enc.AmqpFieldValue
): enc.AmqpField {
  return {
    type,
    value: value !== undefined ? value : defaultValue
  } as enc.AmqpField;
}

export function encodeArgs(
  classId: number,
  methodId: number,
  args: Record<string, enc.AmqpOptionalFieldValue>
): Uint8Array {
  switch (classId) {
    case 10:
      {
        switch (methodId) {
          case 10:
            return enc.encodeFields([
              field("octet", args["versionMajor"], 0),
              field("octet", args["versionMinor"], 9),
              field("table", args["serverProperties"], undefined),
              field("longstr", args["mechanisms"], "PLAIN"),
              field("longstr", args["locales"], "en_US")
            ]);
          case 11:
            return enc.encodeFields([
              field("table", args["clientProperties"], undefined),
              field("shortstr", args["mechanism"], "PLAIN"),
              field("longstr", args["response"], undefined),
              field("shortstr", args["locale"], "en_US")
            ]);
          case 20:
            return enc.encodeFields([
              field("longstr", args["challenge"], undefined)
            ]);
          case 21:
            return enc.encodeFields([
              field("longstr", args["response"], undefined)
            ]);
          case 30:
            return enc.encodeFields([
              field("short", args["channelMax"], 0),
              field("long", args["frameMax"], 0),
              field("short", args["heartbeat"], 0)
            ]);
          case 31:
            return enc.encodeFields([
              field("short", args["channelMax"], 0),
              field("long", args["frameMax"], 0),
              field("short", args["heartbeat"], 0)
            ]);
          case 40:
            return enc.encodeFields([
              field("shortstr", args["virtualHost"], "/"),
              field("shortstr", args["capabilities"], ""),
              field("bit", args["insist"], false)
            ]);
          case 41:
            return enc.encodeFields([
              field("shortstr", args["knownHosts"], "")
            ]);
          case 50:
            return enc.encodeFields([
              field("short", args["replyCode"], undefined),
              field("shortstr", args["replyText"], ""),
              field("short", args["classId"], undefined),
              field("short", args["methodId"], undefined)
            ]);
          case 51:
            return enc.encodeFields([]);
          case 60:
            return enc.encodeFields([
              field("shortstr", args["reason"], "")
            ]);
          case 61:
            return enc.encodeFields([]);
          case 70:
            return enc.encodeFields([
              field("longstr", args["newSecret"], undefined),
              field("shortstr", args["reason"], undefined)
            ]);
          case 71:
            return enc.encodeFields([]);
        }
      }
      break;

    case 20:
      {
        switch (methodId) {
          case 10:
            return enc.encodeFields([
              field("shortstr", args["outOfBand"], "")
            ]);
          case 11:
            return enc.encodeFields([
              field("longstr", args["channelId"], "")
            ]);
          case 20:
            return enc.encodeFields([
              field("bit", args["active"], undefined)
            ]);
          case 21:
            return enc.encodeFields([
              field("bit", args["active"], undefined)
            ]);
          case 40:
            return enc.encodeFields([
              field("short", args["replyCode"], undefined),
              field("shortstr", args["replyText"], ""),
              field("short", args["classId"], undefined),
              field("short", args["methodId"], undefined)
            ]);
          case 41:
            return enc.encodeFields([]);
        }
      }
      break;

    case 30:
      {
        switch (methodId) {
          case 10:
            return enc.encodeFields([
              field("shortstr", args["realm"], "/data"),
              field("bit", args["exclusive"], false),
              field("bit", args["passive"], true),
              field("bit", args["active"], true),
              field("bit", args["write"], true),
              field("bit", args["read"], true)
            ]);
          case 11:
            return enc.encodeFields([
              field("short", args["ticket"], 1)
            ]);
        }
      }
      break;

    case 40:
      {
        switch (methodId) {
          case 10:
            return enc.encodeFields([
              field("short", args["ticket"], 0),
              field("shortstr", args["exchange"], undefined),
              field("shortstr", args["type"], "direct"),
              field("bit", args["passive"], false),
              field("bit", args["durable"], false),
              field("bit", args["autoDelete"], false),
              field("bit", args["internal"], false),
              field("bit", args["nowait"], false),
              field("table", args["arguments"], {})
            ]);
          case 11:
            return enc.encodeFields([]);
          case 20:
            return enc.encodeFields([
              field("short", args["ticket"], 0),
              field("shortstr", args["exchange"], undefined),
              field("bit", args["ifUnused"], false),
              field("bit", args["nowait"], false)
            ]);
          case 21:
            return enc.encodeFields([]);
          case 30:
            return enc.encodeFields([
              field("short", args["ticket"], 0),
              field("shortstr", args["destination"], undefined),
              field("shortstr", args["source"], undefined),
              field("shortstr", args["routingKey"], ""),
              field("bit", args["nowait"], false),
              field("table", args["arguments"], {})
            ]);
          case 31:
            return enc.encodeFields([]);
          case 40:
            return enc.encodeFields([
              field("short", args["ticket"], 0),
              field("shortstr", args["destination"], undefined),
              field("shortstr", args["source"], undefined),
              field("shortstr", args["routingKey"], ""),
              field("bit", args["nowait"], false),
              field("table", args["arguments"], {})
            ]);
          case 51:
            return enc.encodeFields([]);
        }
      }
      break;

    case 50:
      {
        switch (methodId) {
          case 10:
            return enc.encodeFields([
              field("short", args["ticket"], 0),
              field("shortstr", args["queue"], ""),
              field("bit", args["passive"], false),
              field("bit", args["durable"], false),
              field("bit", args["exclusive"], false),
              field("bit", args["autoDelete"], false),
              field("bit", args["nowait"], false),
              field("table", args["arguments"], {})
            ]);
          case 11:
            return enc.encodeFields([
              field("shortstr", args["queue"], undefined),
              field("long", args["messageCount"], undefined),
              field("long", args["consumerCount"], undefined)
            ]);
          case 20:
            return enc.encodeFields([
              field("short", args["ticket"], 0),
              field("shortstr", args["queue"], ""),
              field("shortstr", args["exchange"], undefined),
              field("shortstr", args["routingKey"], ""),
              field("bit", args["nowait"], false),
              field("table", args["arguments"], {})
            ]);
          case 21:
            return enc.encodeFields([]);
          case 30:
            return enc.encodeFields([
              field("short", args["ticket"], 0),
              field("shortstr", args["queue"], ""),
              field("bit", args["nowait"], false)
            ]);
          case 31:
            return enc.encodeFields([
              field("long", args["messageCount"], undefined)
            ]);
          case 40:
            return enc.encodeFields([
              field("short", args["ticket"], 0),
              field("shortstr", args["queue"], ""),
              field("bit", args["ifUnused"], false),
              field("bit", args["ifEmpty"], false),
              field("bit", args["nowait"], false)
            ]);
          case 41:
            return enc.encodeFields([
              field("long", args["messageCount"], undefined)
            ]);
          case 50:
            return enc.encodeFields([
              field("short", args["ticket"], 0),
              field("shortstr", args["queue"], ""),
              field("shortstr", args["exchange"], undefined),
              field("shortstr", args["routingKey"], ""),
              field("table", args["arguments"], {})
            ]);
          case 51:
            return enc.encodeFields([]);
        }
      }
      break;

    case 60:
      {
        switch (methodId) {
          case 10:
            return enc.encodeFields([
              field("long", args["prefetchSize"], 0),
              field("short", args["prefetchCount"], 0),
              field("bit", args["global"], false)
            ]);
          case 11:
            return enc.encodeFields([]);
          case 20:
            return enc.encodeFields([
              field("short", args["ticket"], 0),
              field("shortstr", args["queue"], ""),
              field("shortstr", args["consumerTag"], ""),
              field("bit", args["noLocal"], false),
              field("bit", args["noAck"], false),
              field("bit", args["exclusive"], false),
              field("bit", args["nowait"], false),
              field("table", args["arguments"], {})
            ]);
          case 21:
            return enc.encodeFields([
              field("shortstr", args["consumerTag"], undefined)
            ]);
          case 30:
            return enc.encodeFields([
              field("shortstr", args["consumerTag"], undefined),
              field("bit", args["nowait"], false)
            ]);
          case 31:
            return enc.encodeFields([
              field("shortstr", args["consumerTag"], undefined)
            ]);
          case 40:
            return enc.encodeFields([
              field("short", args["ticket"], 0),
              field("shortstr", args["exchange"], ""),
              field("shortstr", args["routingKey"], ""),
              field("bit", args["mandatory"], false),
              field("bit", args["immediate"], false)
            ]);
          case 50:
            return enc.encodeFields([
              field("short", args["replyCode"], undefined),
              field("shortstr", args["replyText"], ""),
              field("shortstr", args["exchange"], undefined),
              field("shortstr", args["routingKey"], undefined)
            ]);
          case 60:
            return enc.encodeFields([
              field("shortstr", args["consumerTag"], undefined),
              field("longlong", args["deliveryTag"], undefined),
              field("bit", args["redelivered"], false),
              field("shortstr", args["exchange"], undefined),
              field("shortstr", args["routingKey"], undefined)
            ]);
          case 70:
            return enc.encodeFields([
              field("short", args["ticket"], 0),
              field("shortstr", args["queue"], ""),
              field("bit", args["noAck"], false)
            ]);
          case 71:
            return enc.encodeFields([
              field("longlong", args["deliveryTag"], undefined),
              field("bit", args["redelivered"], false),
              field("shortstr", args["exchange"], undefined),
              field("shortstr", args["routingKey"], undefined),
              field("long", args["messageCount"], undefined)
            ]);
          case 72:
            return enc.encodeFields([
              field("shortstr", args["clusterId"], "")
            ]);
          case 80:
            return enc.encodeFields([
              field("longlong", args["deliveryTag"], 0),
              field("bit", args["multiple"], false)
            ]);
          case 90:
            return enc.encodeFields([
              field("longlong", args["deliveryTag"], undefined),
              field("bit", args["requeue"], true)
            ]);
          case 100:
            return enc.encodeFields([
              field("bit", args["requeue"], false)
            ]);
          case 110:
            return enc.encodeFields([
              field("bit", args["requeue"], false)
            ]);
          case 111:
            return enc.encodeFields([]);
          case 120:
            return enc.encodeFields([
              field("longlong", args["deliveryTag"], 0),
              field("bit", args["multiple"], false),
              field("bit", args["requeue"], true)
            ]);
        }
      }
      break;

    case 90:
      {
        switch (methodId) {
          case 10:
            return enc.encodeFields([]);
          case 11:
            return enc.encodeFields([]);
          case 20:
            return enc.encodeFields([]);
          case 21:
            return enc.encodeFields([]);
          case 30:
            return enc.encodeFields([]);
          case 31:
            return enc.encodeFields([]);
        }
      }
      break;

    case 85:
      {
        switch (methodId) {
          case 10:
            return enc.encodeFields([
              field("bit", args["nowait"], false)
            ]);
          case 11:
            return enc.encodeFields([]);
        }
      }
      break;
  }

  throw new Error(`Unknown method ${classId} ${methodId}`);
}

export function decodeArgs(
  r: Deno.SyncReader,
  classId: number,
  methodId: number
): Record<string, enc.AmqpFieldValue> {
  switch (classId) {
    case 10: {
      switch (methodId) {
        case 10: {
          const fields = enc.decodeFields(
            r,
            ["octet", "octet", "table", "longstr", "longstr"]
          );
          const args = {
            versionMajor: fields[0],
            versionMinor: fields[1],
            serverProperties: fields[2],
            mechanisms: fields[3],
            locales: fields[4]
          };
          return args;
        }
        case 11: {
          const fields = enc.decodeFields(
            r,
            ["table", "shortstr", "longstr", "shortstr"]
          );
          const args = {
            clientProperties: fields[0],
            mechanism: fields[1],
            response: fields[2],
            locale: fields[3]
          };
          return args;
        }
        case 20: {
          const fields = enc.decodeFields(r, ["longstr"]);
          const args = { challenge: fields[0] };
          return args;
        }
        case 21: {
          const fields = enc.decodeFields(r, ["longstr"]);
          const args = { response: fields[0] };
          return args;
        }
        case 30: {
          const fields = enc.decodeFields(r, ["short", "long", "short"]);
          const args = {
            channelMax: fields[0],
            frameMax: fields[1],
            heartbeat: fields[2]
          };
          return args;
        }
        case 31: {
          const fields = enc.decodeFields(r, ["short", "long", "short"]);
          const args = {
            channelMax: fields[0],
            frameMax: fields[1],
            heartbeat: fields[2]
          };
          return args;
        }
        case 40: {
          const fields = enc.decodeFields(r, ["shortstr", "shortstr", "bit"]);
          const args = {
            virtualHost: fields[0],
            capabilities: fields[1],
            insist: fields[2]
          };
          return args;
        }
        case 41: {
          const fields = enc.decodeFields(r, ["shortstr"]);
          const args = { knownHosts: fields[0] };
          return args;
        }
        case 50: {
          const fields = enc.decodeFields(
            r,
            ["short", "shortstr", "short", "short"]
          );
          const args = {
            replyCode: fields[0],
            replyText: fields[1],
            classId: fields[2],
            methodId: fields[3]
          };
          return args;
        }
        case 51: {
          const fields = enc.decodeFields(r, []);
          const args = {};
          return args;
        }
        case 60: {
          const fields = enc.decodeFields(r, ["shortstr"]);
          const args = { reason: fields[0] };
          return args;
        }
        case 61: {
          const fields = enc.decodeFields(r, []);
          const args = {};
          return args;
        }
        case 70: {
          const fields = enc.decodeFields(r, ["longstr", "shortstr"]);
          const args = { newSecret: fields[0], reason: fields[1] };
          return args;
        }
        case 71: {
          const fields = enc.decodeFields(r, []);
          const args = {};
          return args;
        }
      }
    }

    case 20: {
      switch (methodId) {
        case 10: {
          const fields = enc.decodeFields(r, ["shortstr"]);
          const args = { outOfBand: fields[0] };
          return args;
        }
        case 11: {
          const fields = enc.decodeFields(r, ["longstr"]);
          const args = { channelId: fields[0] };
          return args;
        }
        case 20: {
          const fields = enc.decodeFields(r, ["bit"]);
          const args = { active: fields[0] };
          return args;
        }
        case 21: {
          const fields = enc.decodeFields(r, ["bit"]);
          const args = { active: fields[0] };
          return args;
        }
        case 40: {
          const fields = enc.decodeFields(
            r,
            ["short", "shortstr", "short", "short"]
          );
          const args = {
            replyCode: fields[0],
            replyText: fields[1],
            classId: fields[2],
            methodId: fields[3]
          };
          return args;
        }
        case 41: {
          const fields = enc.decodeFields(r, []);
          const args = {};
          return args;
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
          const args = {
            realm: fields[0],
            exclusive: fields[1],
            passive: fields[2],
            active: fields[3],
            write: fields[4],
            read: fields[5]
          };
          return args;
        }
        case 11: {
          const fields = enc.decodeFields(r, ["short"]);
          const args = { ticket: fields[0] };
          return args;
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
          const args = {
            ticket: fields[0],
            exchange: fields[1],
            type: fields[2],
            passive: fields[3],
            durable: fields[4],
            autoDelete: fields[5],
            internal: fields[6],
            nowait: fields[7],
            arguments: fields[8]
          };
          return args;
        }
        case 11: {
          const fields = enc.decodeFields(r, []);
          const args = {};
          return args;
        }
        case 20: {
          const fields = enc.decodeFields(
            r,
            ["short", "shortstr", "bit", "bit"]
          );
          const args = {
            ticket: fields[0],
            exchange: fields[1],
            ifUnused: fields[2],
            nowait: fields[3]
          };
          return args;
        }
        case 21: {
          const fields = enc.decodeFields(r, []);
          const args = {};
          return args;
        }
        case 30: {
          const fields = enc.decodeFields(
            r,
            ["short", "shortstr", "shortstr", "shortstr", "bit", "table"]
          );
          const args = {
            ticket: fields[0],
            destination: fields[1],
            source: fields[2],
            routingKey: fields[3],
            nowait: fields[4],
            arguments: fields[5]
          };
          return args;
        }
        case 31: {
          const fields = enc.decodeFields(r, []);
          const args = {};
          return args;
        }
        case 40: {
          const fields = enc.decodeFields(
            r,
            ["short", "shortstr", "shortstr", "shortstr", "bit", "table"]
          );
          const args = {
            ticket: fields[0],
            destination: fields[1],
            source: fields[2],
            routingKey: fields[3],
            nowait: fields[4],
            arguments: fields[5]
          };
          return args;
        }
        case 51: {
          const fields = enc.decodeFields(r, []);
          const args = {};
          return args;
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
          const args = {
            ticket: fields[0],
            queue: fields[1],
            passive: fields[2],
            durable: fields[3],
            exclusive: fields[4],
            autoDelete: fields[5],
            nowait: fields[6],
            arguments: fields[7]
          };
          return args;
        }
        case 11: {
          const fields = enc.decodeFields(r, ["shortstr", "long", "long"]);
          const args = {
            queue: fields[0],
            messageCount: fields[1],
            consumerCount: fields[2]
          };
          return args;
        }
        case 20: {
          const fields = enc.decodeFields(
            r,
            ["short", "shortstr", "shortstr", "shortstr", "bit", "table"]
          );
          const args = {
            ticket: fields[0],
            queue: fields[1],
            exchange: fields[2],
            routingKey: fields[3],
            nowait: fields[4],
            arguments: fields[5]
          };
          return args;
        }
        case 21: {
          const fields = enc.decodeFields(r, []);
          const args = {};
          return args;
        }
        case 30: {
          const fields = enc.decodeFields(r, ["short", "shortstr", "bit"]);
          const args = {
            ticket: fields[0],
            queue: fields[1],
            nowait: fields[2]
          };
          return args;
        }
        case 31: {
          const fields = enc.decodeFields(r, ["long"]);
          const args = { messageCount: fields[0] };
          return args;
        }
        case 40: {
          const fields = enc.decodeFields(
            r,
            ["short", "shortstr", "bit", "bit", "bit"]
          );
          const args = {
            ticket: fields[0],
            queue: fields[1],
            ifUnused: fields[2],
            ifEmpty: fields[3],
            nowait: fields[4]
          };
          return args;
        }
        case 41: {
          const fields = enc.decodeFields(r, ["long"]);
          const args = { messageCount: fields[0] };
          return args;
        }
        case 50: {
          const fields = enc.decodeFields(
            r,
            ["short", "shortstr", "shortstr", "shortstr", "table"]
          );
          const args = {
            ticket: fields[0],
            queue: fields[1],
            exchange: fields[2],
            routingKey: fields[3],
            arguments: fields[4]
          };
          return args;
        }
        case 51: {
          const fields = enc.decodeFields(r, []);
          const args = {};
          return args;
        }
      }
    }

    case 60: {
      switch (methodId) {
        case 10: {
          const fields = enc.decodeFields(r, ["long", "short", "bit"]);
          const args = {
            prefetchSize: fields[0],
            prefetchCount: fields[1],
            global: fields[2]
          };
          return args;
        }
        case 11: {
          const fields = enc.decodeFields(r, []);
          const args = {};
          return args;
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
            ticket: fields[0],
            queue: fields[1],
            consumerTag: fields[2],
            noLocal: fields[3],
            noAck: fields[4],
            exclusive: fields[5],
            nowait: fields[6],
            arguments: fields[7]
          };
          return args;
        }
        case 21: {
          const fields = enc.decodeFields(r, ["shortstr"]);
          const args = { consumerTag: fields[0] };
          return args;
        }
        case 30: {
          const fields = enc.decodeFields(r, ["shortstr", "bit"]);
          const args = { consumerTag: fields[0], nowait: fields[1] };
          return args;
        }
        case 31: {
          const fields = enc.decodeFields(r, ["shortstr"]);
          const args = { consumerTag: fields[0] };
          return args;
        }
        case 40: {
          const fields = enc.decodeFields(
            r,
            ["short", "shortstr", "shortstr", "bit", "bit"]
          );
          const args = {
            ticket: fields[0],
            exchange: fields[1],
            routingKey: fields[2],
            mandatory: fields[3],
            immediate: fields[4]
          };
          return args;
        }
        case 50: {
          const fields = enc.decodeFields(
            r,
            ["short", "shortstr", "shortstr", "shortstr"]
          );
          const args = {
            replyCode: fields[0],
            replyText: fields[1],
            exchange: fields[2],
            routingKey: fields[3]
          };
          return args;
        }
        case 60: {
          const fields = enc.decodeFields(
            r,
            ["shortstr", "longlong", "bit", "shortstr", "shortstr"]
          );
          const args = {
            consumerTag: fields[0],
            deliveryTag: fields[1],
            redelivered: fields[2],
            exchange: fields[3],
            routingKey: fields[4]
          };
          return args;
        }
        case 70: {
          const fields = enc.decodeFields(r, ["short", "shortstr", "bit"]);
          const args = {
            ticket: fields[0],
            queue: fields[1],
            noAck: fields[2]
          };
          return args;
        }
        case 71: {
          const fields = enc.decodeFields(
            r,
            ["longlong", "bit", "shortstr", "shortstr", "long"]
          );
          const args = {
            deliveryTag: fields[0],
            redelivered: fields[1],
            exchange: fields[2],
            routingKey: fields[3],
            messageCount: fields[4]
          };
          return args;
        }
        case 72: {
          const fields = enc.decodeFields(r, ["shortstr"]);
          const args = { clusterId: fields[0] };
          return args;
        }
        case 80: {
          const fields = enc.decodeFields(r, ["longlong", "bit"]);
          const args = { deliveryTag: fields[0], multiple: fields[1] };
          return args;
        }
        case 90: {
          const fields = enc.decodeFields(r, ["longlong", "bit"]);
          const args = { deliveryTag: fields[0], requeue: fields[1] };
          return args;
        }
        case 100: {
          const fields = enc.decodeFields(r, ["bit"]);
          const args = { requeue: fields[0] };
          return args;
        }
        case 110: {
          const fields = enc.decodeFields(r, ["bit"]);
          const args = { requeue: fields[0] };
          return args;
        }
        case 111: {
          const fields = enc.decodeFields(r, []);
          const args = {};
          return args;
        }
        case 120: {
          const fields = enc.decodeFields(r, ["longlong", "bit", "bit"]);
          const args = {
            deliveryTag: fields[0],
            multiple: fields[1],
            requeue: fields[2]
          };
          return args;
        }
      }
    }

    case 90: {
      switch (methodId) {
        case 10: {
          const fields = enc.decodeFields(r, []);
          const args = {};
          return args;
        }
        case 11: {
          const fields = enc.decodeFields(r, []);
          const args = {};
          return args;
        }
        case 20: {
          const fields = enc.decodeFields(r, []);
          const args = {};
          return args;
        }
        case 21: {
          const fields = enc.decodeFields(r, []);
          const args = {};
          return args;
        }
        case 30: {
          const fields = enc.decodeFields(r, []);
          const args = {};
          return args;
        }
        case 31: {
          const fields = enc.decodeFields(r, []);
          const args = {};
          return args;
        }
      }
    }

    case 85: {
      switch (methodId) {
        case 10: {
          const fields = enc.decodeFields(r, ["bit"]);
          const args = { nowait: fields[0] };
          return args;
        }
        case 11: {
          const fields = enc.decodeFields(r, []);
          const args = {};
          return args;
        }
      }
    }
  }

  throw new Error(`Unknown method ${classId} ${methodId}`);
}

export function encodeProps(
  classId: number,
  props: Record<string, enc.AmqpOptionalFieldValue>
): Uint8Array {
  switch (classId) {
    case 10: {
      return enc.encodeProperties([]);
    }
    case 20: {
      return enc.encodeProperties([]);
    }
    case 30: {
      return enc.encodeProperties([]);
    }
    case 40: {
      return enc.encodeProperties([]);
    }
    case 50: {
      return enc.encodeProperties([]);
    }
    case 60: {
      return enc.encodeProperties([
        field("shortstr", props["contentType"]),
        field("shortstr", props["contentEncoding"]),
        field("table", props["headers"]),
        field("octet", props["deliveryMode"]),
        field("octet", props["priority"]),
        field("shortstr", props["correlationId"]),
        field("shortstr", props["replyTo"]),
        field("shortstr", props["expiration"]),
        field("shortstr", props["messageId"]),
        field("timestamp", props["timestamp"]),
        field("shortstr", props["type"]),
        field("shortstr", props["userId"]),
        field("shortstr", props["appId"]),
        field("shortstr", props["clusterId"])
      ]);
    }
    case 90: {
      return enc.encodeProperties([]);
    }
    case 85: {
      return enc.encodeProperties([]);
    }
  }

  throw new Error(`Unknown class ${classId}`);
}

export function decodeProps(r: Deno.SyncReader, classId: number): Record<
  string,
  enc.AmqpOptionalFieldValue
> {
  switch (classId) {
    case 10: {
      const fields = enc.decodeProperties(r, []);
      const props = {};

      return props;
    }
    case 20: {
      const fields = enc.decodeProperties(r, []);
      const props = {};

      return props;
    }
    case 30: {
      const fields = enc.decodeProperties(r, []);
      const props = {};

      return props;
    }
    case 40: {
      const fields = enc.decodeProperties(r, []);
      const props = {};

      return props;
    }
    case 50: {
      const fields = enc.decodeProperties(r, []);
      const props = {};

      return props;
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
        contentType: fields[0],
        contentEncoding: fields[1],
        headers: fields[2],
        deliveryMode: fields[3],
        priority: fields[4],
        correlationId: fields[5],
        replyTo: fields[6],
        expiration: fields[7],
        messageId: fields[8],
        timestamp: fields[9],
        type: fields[10],
        userId: fields[11],
        appId: fields[12],
        clusterId: fields[13]
      };

      return props;
    }
    case 90: {
      const fields = enc.decodeProperties(r, []);
      const props = {};

      return props;
    }
    case 85: {
      const fields = enc.decodeProperties(r, []);
      const props = {};

      return props;
    }
  }

  throw new Error(`Unknown class ${classId}`);
}
