import * as enc from "./encoder.ts";

export function encodeArgs(
  classId: number,
  methodId: number,
  args: any
): Uint8Array {
  switch (classId) {
    case 10:
      {
        switch (methodId) {
          case 10:
            return enc.encodeFields([
              {
                type: "octet",
                value: args["versionMajor"] !== undefined
                  ? args["versionMajor"]
                  : 0
              },
              {
                type: "octet",
                value: args["versionMinor"] !== undefined
                  ? args["versionMinor"]
                  : 9
              },
              { type: "table", value: args["serverProperties"] },
              {
                type: "longstr",
                value: args["mechanisms"] !== undefined
                  ? args["mechanisms"]
                  : "PLAIN"
              },
              {
                type: "longstr",
                value: args["locales"] !== undefined
                  ? args["locales"]
                  : "en_US"
              }
            ]);
            break;
          case 11:
            return enc.encodeFields([
              { type: "table", value: args["clientProperties"] },
              {
                type: "shortstr",
                value: args["mechanism"] !== undefined
                  ? args["mechanism"]
                  : "PLAIN"
              },
              { type: "longstr", value: args["response"] },
              {
                type: "shortstr",
                value: args["locale"] !== undefined ? args["locale"] : "en_US"
              }
            ]);
            break;
          case 20:
            return enc.encodeFields([
              { type: "longstr", value: args["challenge"] }
            ]);
            break;
          case 21:
            return enc.encodeFields([
              { type: "longstr", value: args["response"] }
            ]);
            break;
          case 30:
            return enc.encodeFields([
              {
                type: "short",
                value: args["channelMax"] !== undefined
                  ? args["channelMax"]
                  : 0
              },
              {
                type: "long",
                value: args["frameMax"] !== undefined ? args["frameMax"] : 0
              },
              {
                type: "short",
                value: args["heartbeat"] !== undefined ? args["heartbeat"] : 0
              }
            ]);
            break;
          case 31:
            return enc.encodeFields([
              {
                type: "short",
                value: args["channelMax"] !== undefined
                  ? args["channelMax"]
                  : 0
              },
              {
                type: "long",
                value: args["frameMax"] !== undefined ? args["frameMax"] : 0
              },
              {
                type: "short",
                value: args["heartbeat"] !== undefined ? args["heartbeat"] : 0
              }
            ]);
            break;
          case 40:
            return enc.encodeFields([
              {
                type: "shortstr",
                value: args["virtualHost"] !== undefined
                  ? args["virtualHost"]
                  : "/"
              },
              {
                type: "shortstr",
                value: args["capabilities"] !== undefined
                  ? args["capabilities"]
                  : ""
              },
              {
                type: "bit",
                value: args["insist"] !== undefined ? args["insist"] : false
              }
            ]);
            break;
          case 41:
            return enc.encodeFields([
              {
                type: "shortstr",
                value: args["knownHosts"] !== undefined
                  ? args["knownHosts"]
                  : ""
              }
            ]);
            break;
          case 50:
            return enc.encodeFields([
              { type: "short", value: args["replyCode"] },
              {
                type: "shortstr",
                value: args["replyText"] !== undefined ? args["replyText"] : ""
              },
              { type: "short", value: args["classId"] },
              { type: "short", value: args["methodId"] }
            ]);
            break;
          case 51:
            return enc.encodeFields([]);
            break;
          case 60:
            return enc.encodeFields([
              {
                type: "shortstr",
                value: args["reason"] !== undefined ? args["reason"] : ""
              }
            ]);
            break;
          case 61:
            return enc.encodeFields([]);
            break;
          case 70:
            return enc.encodeFields([
              { type: "longstr", value: args["newSecret"] },
              { type: "shortstr", value: args["reason"] }
            ]);
            break;
          case 71:
            return enc.encodeFields([]);
            break;
        }
      }
      break;

    case 20:
      {
        switch (methodId) {
          case 10:
            return enc.encodeFields([
              {
                type: "shortstr",
                value: args["outOfBand"] !== undefined ? args["outOfBand"] : ""
              }
            ]);
            break;
          case 11:
            return enc.encodeFields([
              {
                type: "longstr",
                value: args["channelId"] !== undefined ? args["channelId"] : ""
              }
            ]);
            break;
          case 20:
            return enc.encodeFields([
              { type: "bit", value: args["active"] }
            ]);
            break;
          case 21:
            return enc.encodeFields([
              { type: "bit", value: args["active"] }
            ]);
            break;
          case 40:
            return enc.encodeFields([
              { type: "short", value: args["replyCode"] },
              {
                type: "shortstr",
                value: args["replyText"] !== undefined ? args["replyText"] : ""
              },
              { type: "short", value: args["classId"] },
              { type: "short", value: args["methodId"] }
            ]);
            break;
          case 41:
            return enc.encodeFields([]);
            break;
        }
      }
      break;

    case 30:
      {
        switch (methodId) {
          case 10:
            return enc.encodeFields([
              {
                type: "shortstr",
                value: args["realm"] !== undefined ? args["realm"] : "/data"
              },
              {
                type: "bit",
                value: args["exclusive"] !== undefined
                  ? args["exclusive"]
                  : false
              },
              {
                type: "bit",
                value: args["passive"] !== undefined ? args["passive"] : true
              },
              {
                type: "bit",
                value: args["active"] !== undefined ? args["active"] : true
              },
              {
                type: "bit",
                value: args["write"] !== undefined ? args["write"] : true
              },
              {
                type: "bit",
                value: args["read"] !== undefined ? args["read"] : true
              }
            ]);
            break;
          case 11:
            return enc.encodeFields([
              {
                type: "short",
                value: args["ticket"] !== undefined ? args["ticket"] : 1
              }
            ]);
            break;
        }
      }
      break;

    case 40:
      {
        switch (methodId) {
          case 10:
            return enc.encodeFields([
              {
                type: "short",
                value: args["ticket"] !== undefined ? args["ticket"] : 0
              },
              { type: "shortstr", value: args["exchange"] },
              {
                type: "shortstr",
                value: args["type"] !== undefined ? args["type"] : "direct"
              },
              {
                type: "bit",
                value: args["passive"] !== undefined ? args["passive"] : false
              },
              {
                type: "bit",
                value: args["durable"] !== undefined ? args["durable"] : false
              },
              {
                type: "bit",
                value: args["autoDelete"] !== undefined
                  ? args["autoDelete"]
                  : false
              },
              {
                type: "bit",
                value: args["internal"] !== undefined
                  ? args["internal"]
                  : false
              },
              {
                type: "bit",
                value: args["nowait"] !== undefined ? args["nowait"] : false
              },
              {
                type: "table",
                value: args["arguments"] !== undefined ? args["arguments"] : {}
              }
            ]);
            break;
          case 11:
            return enc.encodeFields([]);
            break;
          case 20:
            return enc.encodeFields([
              {
                type: "short",
                value: args["ticket"] !== undefined ? args["ticket"] : 0
              },
              { type: "shortstr", value: args["exchange"] },
              {
                type: "bit",
                value: args["ifUnused"] !== undefined
                  ? args["ifUnused"]
                  : false
              },
              {
                type: "bit",
                value: args["nowait"] !== undefined ? args["nowait"] : false
              }
            ]);
            break;
          case 21:
            return enc.encodeFields([]);
            break;
          case 30:
            return enc.encodeFields([
              {
                type: "short",
                value: args["ticket"] !== undefined ? args["ticket"] : 0
              },
              { type: "shortstr", value: args["destination"] },
              { type: "shortstr", value: args["source"] },
              {
                type: "shortstr",
                value: args["routingKey"] !== undefined
                  ? args["routingKey"]
                  : ""
              },
              {
                type: "bit",
                value: args["nowait"] !== undefined ? args["nowait"] : false
              },
              {
                type: "table",
                value: args["arguments"] !== undefined ? args["arguments"] : {}
              }
            ]);
            break;
          case 31:
            return enc.encodeFields([]);
            break;
          case 40:
            return enc.encodeFields([
              {
                type: "short",
                value: args["ticket"] !== undefined ? args["ticket"] : 0
              },
              { type: "shortstr", value: args["destination"] },
              { type: "shortstr", value: args["source"] },
              {
                type: "shortstr",
                value: args["routingKey"] !== undefined
                  ? args["routingKey"]
                  : ""
              },
              {
                type: "bit",
                value: args["nowait"] !== undefined ? args["nowait"] : false
              },
              {
                type: "table",
                value: args["arguments"] !== undefined ? args["arguments"] : {}
              }
            ]);
            break;
          case 51:
            return enc.encodeFields([]);
            break;
        }
      }
      break;

    case 50:
      {
        switch (methodId) {
          case 10:
            return enc.encodeFields([
              {
                type: "short",
                value: args["ticket"] !== undefined ? args["ticket"] : 0
              },
              {
                type: "shortstr",
                value: args["queue"] !== undefined ? args["queue"] : ""
              },
              {
                type: "bit",
                value: args["passive"] !== undefined ? args["passive"] : false
              },
              {
                type: "bit",
                value: args["durable"] !== undefined ? args["durable"] : false
              },
              {
                type: "bit",
                value: args["exclusive"] !== undefined
                  ? args["exclusive"]
                  : false
              },
              {
                type: "bit",
                value: args["autoDelete"] !== undefined
                  ? args["autoDelete"]
                  : false
              },
              {
                type: "bit",
                value: args["nowait"] !== undefined ? args["nowait"] : false
              },
              {
                type: "table",
                value: args["arguments"] !== undefined ? args["arguments"] : {}
              }
            ]);
            break;
          case 11:
            return enc.encodeFields([
              { type: "shortstr", value: args["queue"] },
              { type: "long", value: args["messageCount"] },
              { type: "long", value: args["consumerCount"] }
            ]);
            break;
          case 20:
            return enc.encodeFields([
              {
                type: "short",
                value: args["ticket"] !== undefined ? args["ticket"] : 0
              },
              {
                type: "shortstr",
                value: args["queue"] !== undefined ? args["queue"] : ""
              },
              { type: "shortstr", value: args["exchange"] },
              {
                type: "shortstr",
                value: args["routingKey"] !== undefined
                  ? args["routingKey"]
                  : ""
              },
              {
                type: "bit",
                value: args["nowait"] !== undefined ? args["nowait"] : false
              },
              {
                type: "table",
                value: args["arguments"] !== undefined ? args["arguments"] : {}
              }
            ]);
            break;
          case 21:
            return enc.encodeFields([]);
            break;
          case 30:
            return enc.encodeFields([
              {
                type: "short",
                value: args["ticket"] !== undefined ? args["ticket"] : 0
              },
              {
                type: "shortstr",
                value: args["queue"] !== undefined ? args["queue"] : ""
              },
              {
                type: "bit",
                value: args["nowait"] !== undefined ? args["nowait"] : false
              }
            ]);
            break;
          case 31:
            return enc.encodeFields([
              { type: "long", value: args["messageCount"] }
            ]);
            break;
          case 40:
            return enc.encodeFields([
              {
                type: "short",
                value: args["ticket"] !== undefined ? args["ticket"] : 0
              },
              {
                type: "shortstr",
                value: args["queue"] !== undefined ? args["queue"] : ""
              },
              {
                type: "bit",
                value: args["ifUnused"] !== undefined
                  ? args["ifUnused"]
                  : false
              },
              {
                type: "bit",
                value: args["ifEmpty"] !== undefined ? args["ifEmpty"] : false
              },
              {
                type: "bit",
                value: args["nowait"] !== undefined ? args["nowait"] : false
              }
            ]);
            break;
          case 41:
            return enc.encodeFields([
              { type: "long", value: args["messageCount"] }
            ]);
            break;
          case 50:
            return enc.encodeFields([
              {
                type: "short",
                value: args["ticket"] !== undefined ? args["ticket"] : 0
              },
              {
                type: "shortstr",
                value: args["queue"] !== undefined ? args["queue"] : ""
              },
              { type: "shortstr", value: args["exchange"] },
              {
                type: "shortstr",
                value: args["routingKey"] !== undefined
                  ? args["routingKey"]
                  : ""
              },
              {
                type: "table",
                value: args["arguments"] !== undefined ? args["arguments"] : {}
              }
            ]);
            break;
          case 51:
            return enc.encodeFields([]);
            break;
        }
      }
      break;

    case 60:
      {
        switch (methodId) {
          case 10:
            return enc.encodeFields([
              {
                type: "long",
                value: args["prefetchSize"] !== undefined
                  ? args["prefetchSize"]
                  : 0
              },
              {
                type: "short",
                value: args["prefetchCount"] !== undefined
                  ? args["prefetchCount"]
                  : 0
              },
              {
                type: "bit",
                value: args["global"] !== undefined ? args["global"] : false
              }
            ]);
            break;
          case 11:
            return enc.encodeFields([]);
            break;
          case 20:
            return enc.encodeFields([
              {
                type: "short",
                value: args["ticket"] !== undefined ? args["ticket"] : 0
              },
              {
                type: "shortstr",
                value: args["queue"] !== undefined ? args["queue"] : ""
              },
              {
                type: "shortstr",
                value: args["consumerTag"] !== undefined
                  ? args["consumerTag"]
                  : ""
              },
              {
                type: "bit",
                value: args["noLocal"] !== undefined ? args["noLocal"] : false
              },
              {
                type: "bit",
                value: args["noAck"] !== undefined ? args["noAck"] : false
              },
              {
                type: "bit",
                value: args["exclusive"] !== undefined
                  ? args["exclusive"]
                  : false
              },
              {
                type: "bit",
                value: args["nowait"] !== undefined ? args["nowait"] : false
              },
              {
                type: "table",
                value: args["arguments"] !== undefined ? args["arguments"] : {}
              }
            ]);
            break;
          case 21:
            return enc.encodeFields([
              { type: "shortstr", value: args["consumerTag"] }
            ]);
            break;
          case 30:
            return enc.encodeFields([
              { type: "shortstr", value: args["consumerTag"] },
              {
                type: "bit",
                value: args["nowait"] !== undefined ? args["nowait"] : false
              }
            ]);
            break;
          case 31:
            return enc.encodeFields([
              { type: "shortstr", value: args["consumerTag"] }
            ]);
            break;
          case 40:
            return enc.encodeFields([
              {
                type: "short",
                value: args["ticket"] !== undefined ? args["ticket"] : 0
              },
              {
                type: "shortstr",
                value: args["exchange"] !== undefined ? args["exchange"] : ""
              },
              {
                type: "shortstr",
                value: args["routingKey"] !== undefined
                  ? args["routingKey"]
                  : ""
              },
              {
                type: "bit",
                value: args["mandatory"] !== undefined
                  ? args["mandatory"]
                  : false
              },
              {
                type: "bit",
                value: args["immediate"] !== undefined
                  ? args["immediate"]
                  : false
              }
            ]);
            break;
          case 50:
            return enc.encodeFields([
              { type: "short", value: args["replyCode"] },
              {
                type: "shortstr",
                value: args["replyText"] !== undefined ? args["replyText"] : ""
              },
              { type: "shortstr", value: args["exchange"] },
              { type: "shortstr", value: args["routingKey"] }
            ]);
            break;
          case 60:
            return enc.encodeFields([
              { type: "shortstr", value: args["consumerTag"] },
              { type: "longlong", value: args["deliveryTag"] },
              {
                type: "bit",
                value: args["redelivered"] !== undefined
                  ? args["redelivered"]
                  : false
              },
              { type: "shortstr", value: args["exchange"] },
              { type: "shortstr", value: args["routingKey"] }
            ]);
            break;
          case 70:
            return enc.encodeFields([
              {
                type: "short",
                value: args["ticket"] !== undefined ? args["ticket"] : 0
              },
              {
                type: "shortstr",
                value: args["queue"] !== undefined ? args["queue"] : ""
              },
              {
                type: "bit",
                value: args["noAck"] !== undefined ? args["noAck"] : false
              }
            ]);
            break;
          case 71:
            return enc.encodeFields([
              { type: "longlong", value: args["deliveryTag"] },
              {
                type: "bit",
                value: args["redelivered"] !== undefined
                  ? args["redelivered"]
                  : false
              },
              { type: "shortstr", value: args["exchange"] },
              { type: "shortstr", value: args["routingKey"] },
              { type: "long", value: args["messageCount"] }
            ]);
            break;
          case 72:
            return enc.encodeFields([
              {
                type: "shortstr",
                value: args["clusterId"] !== undefined ? args["clusterId"] : ""
              }
            ]);
            break;
          case 80:
            return enc.encodeFields([
              {
                type: "longlong",
                value: args["deliveryTag"] !== undefined
                  ? args["deliveryTag"]
                  : 0
              },
              {
                type: "bit",
                value: args["multiple"] !== undefined
                  ? args["multiple"]
                  : false
              }
            ]);
            break;
          case 90:
            return enc.encodeFields([
              { type: "longlong", value: args["deliveryTag"] },
              {
                type: "bit",
                value: args["requeue"] !== undefined ? args["requeue"] : true
              }
            ]);
            break;
          case 100:
            return enc.encodeFields([
              {
                type: "bit",
                value: args["requeue"] !== undefined ? args["requeue"] : false
              }
            ]);
            break;
          case 110:
            return enc.encodeFields([
              {
                type: "bit",
                value: args["requeue"] !== undefined ? args["requeue"] : false
              }
            ]);
            break;
          case 111:
            return enc.encodeFields([]);
            break;
          case 120:
            return enc.encodeFields([
              {
                type: "longlong",
                value: args["deliveryTag"] !== undefined
                  ? args["deliveryTag"]
                  : 0
              },
              {
                type: "bit",
                value: args["multiple"] !== undefined
                  ? args["multiple"]
                  : false
              },
              {
                type: "bit",
                value: args["requeue"] !== undefined ? args["requeue"] : true
              }
            ]);
            break;
        }
      }
      break;

    case 90:
      {
        switch (methodId) {
          case 10:
            return enc.encodeFields([]);
            break;
          case 11:
            return enc.encodeFields([]);
            break;
          case 20:
            return enc.encodeFields([]);
            break;
          case 21:
            return enc.encodeFields([]);
            break;
          case 30:
            return enc.encodeFields([]);
            break;
          case 31:
            return enc.encodeFields([]);
            break;
        }
      }
      break;

    case 85:
      {
        switch (methodId) {
          case 10:
            return enc.encodeFields([
              {
                type: "bit",
                value: args["nowait"] !== undefined ? args["nowait"] : false
              }
            ]);
            break;
          case 11:
            return enc.encodeFields([]);
            break;
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
): any {
  switch (classId) {
    case 10: {
      switch (methodId) {
        case 10: {
          const fields = enc.decodeFields(
            r,
            ["octet", "octet", "table", "longstr", "longstr"]
          );
          const args = {
            versionMajor: fields[0].value,
            versionMinor: fields[1].value,
            serverProperties: fields[2].value,
            mechanisms: fields[3].value,
            locales: fields[4].value
          };
          return args;
        }
        case 11: {
          const fields = enc.decodeFields(
            r,
            ["table", "shortstr", "longstr", "shortstr"]
          );
          const args = {
            clientProperties: fields[0].value,
            mechanism: fields[1].value,
            response: fields[2].value,
            locale: fields[3].value
          };
          return args;
        }
        case 20: {
          const fields = enc.decodeFields(r, ["longstr"]);
          const args = { challenge: fields[0].value };
          return args;
        }
        case 21: {
          const fields = enc.decodeFields(r, ["longstr"]);
          const args = { response: fields[0].value };
          return args;
        }
        case 30: {
          const fields = enc.decodeFields(r, ["short", "long", "short"]);
          const args = {
            channelMax: fields[0].value,
            frameMax: fields[1].value,
            heartbeat: fields[2].value
          };
          return args;
        }
        case 31: {
          const fields = enc.decodeFields(r, ["short", "long", "short"]);
          const args = {
            channelMax: fields[0].value,
            frameMax: fields[1].value,
            heartbeat: fields[2].value
          };
          return args;
        }
        case 40: {
          const fields = enc.decodeFields(r, ["shortstr", "shortstr", "bit"]);
          const args = {
            virtualHost: fields[0].value,
            capabilities: fields[1].value,
            insist: fields[2].value
          };
          return args;
        }
        case 41: {
          const fields = enc.decodeFields(r, ["shortstr"]);
          const args = { knownHosts: fields[0].value };
          return args;
        }
        case 50: {
          const fields = enc.decodeFields(
            r,
            ["short", "shortstr", "short", "short"]
          );
          const args = {
            replyCode: fields[0].value,
            replyText: fields[1].value,
            classId: fields[2].value,
            methodId: fields[3].value
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
          const args = { reason: fields[0].value };
          return args;
        }
        case 61: {
          const fields = enc.decodeFields(r, []);
          const args = {};
          return args;
        }
        case 70: {
          const fields = enc.decodeFields(r, ["longstr", "shortstr"]);
          const args = { newSecret: fields[0].value, reason: fields[1].value };
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
          const args = { outOfBand: fields[0].value };
          return args;
        }
        case 11: {
          const fields = enc.decodeFields(r, ["longstr"]);
          const args = { channelId: fields[0].value };
          return args;
        }
        case 20: {
          const fields = enc.decodeFields(r, ["bit"]);
          const args = { active: fields[0].value };
          return args;
        }
        case 21: {
          const fields = enc.decodeFields(r, ["bit"]);
          const args = { active: fields[0].value };
          return args;
        }
        case 40: {
          const fields = enc.decodeFields(
            r,
            ["short", "shortstr", "short", "short"]
          );
          const args = {
            replyCode: fields[0].value,
            replyText: fields[1].value,
            classId: fields[2].value,
            methodId: fields[3].value
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
            realm: fields[0].value,
            exclusive: fields[1].value,
            passive: fields[2].value,
            active: fields[3].value,
            write: fields[4].value,
            read: fields[5].value
          };
          return args;
        }
        case 11: {
          const fields = enc.decodeFields(r, ["short"]);
          const args = { ticket: fields[0].value };
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
            ticket: fields[0].value,
            exchange: fields[1].value,
            ifUnused: fields[2].value,
            nowait: fields[3].value
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
            ticket: fields[0].value,
            destination: fields[1].value,
            source: fields[2].value,
            routingKey: fields[3].value,
            nowait: fields[4].value,
            arguments: fields[5].value
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
            ticket: fields[0].value,
            destination: fields[1].value,
            source: fields[2].value,
            routingKey: fields[3].value,
            nowait: fields[4].value,
            arguments: fields[5].value
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
            ticket: fields[0].value,
            queue: fields[1].value,
            passive: fields[2].value,
            durable: fields[3].value,
            exclusive: fields[4].value,
            autoDelete: fields[5].value,
            nowait: fields[6].value,
            arguments: fields[7].value
          };
          return args;
        }
        case 11: {
          const fields = enc.decodeFields(r, ["shortstr", "long", "long"]);
          const args = {
            queue: fields[0].value,
            messageCount: fields[1].value,
            consumerCount: fields[2].value
          };
          return args;
        }
        case 20: {
          const fields = enc.decodeFields(
            r,
            ["short", "shortstr", "shortstr", "shortstr", "bit", "table"]
          );
          const args = {
            ticket: fields[0].value,
            queue: fields[1].value,
            exchange: fields[2].value,
            routingKey: fields[3].value,
            nowait: fields[4].value,
            arguments: fields[5].value
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
            ticket: fields[0].value,
            queue: fields[1].value,
            nowait: fields[2].value
          };
          return args;
        }
        case 31: {
          const fields = enc.decodeFields(r, ["long"]);
          const args = { messageCount: fields[0].value };
          return args;
        }
        case 40: {
          const fields = enc.decodeFields(
            r,
            ["short", "shortstr", "bit", "bit", "bit"]
          );
          const args = {
            ticket: fields[0].value,
            queue: fields[1].value,
            ifUnused: fields[2].value,
            ifEmpty: fields[3].value,
            nowait: fields[4].value
          };
          return args;
        }
        case 41: {
          const fields = enc.decodeFields(r, ["long"]);
          const args = { messageCount: fields[0].value };
          return args;
        }
        case 50: {
          const fields = enc.decodeFields(
            r,
            ["short", "shortstr", "shortstr", "shortstr", "table"]
          );
          const args = {
            ticket: fields[0].value,
            queue: fields[1].value,
            exchange: fields[2].value,
            routingKey: fields[3].value,
            arguments: fields[4].value
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
            prefetchSize: fields[0].value,
            prefetchCount: fields[1].value,
            global: fields[2].value
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
            ticket: fields[0].value,
            queue: fields[1].value,
            consumerTag: fields[2].value,
            noLocal: fields[3].value,
            noAck: fields[4].value,
            exclusive: fields[5].value,
            nowait: fields[6].value,
            arguments: fields[7].value
          };
          return args;
        }
        case 21: {
          const fields = enc.decodeFields(r, ["shortstr"]);
          const args = { consumerTag: fields[0].value };
          return args;
        }
        case 30: {
          const fields = enc.decodeFields(r, ["shortstr", "bit"]);
          const args = {
            consumerTag: fields[0].value,
            nowait: fields[1].value
          };
          return args;
        }
        case 31: {
          const fields = enc.decodeFields(r, ["shortstr"]);
          const args = { consumerTag: fields[0].value };
          return args;
        }
        case 40: {
          const fields = enc.decodeFields(
            r,
            ["short", "shortstr", "shortstr", "bit", "bit"]
          );
          const args = {
            ticket: fields[0].value,
            exchange: fields[1].value,
            routingKey: fields[2].value,
            mandatory: fields[3].value,
            immediate: fields[4].value
          };
          return args;
        }
        case 50: {
          const fields = enc.decodeFields(
            r,
            ["short", "shortstr", "shortstr", "shortstr"]
          );
          const args = {
            replyCode: fields[0].value,
            replyText: fields[1].value,
            exchange: fields[2].value,
            routingKey: fields[3].value
          };
          return args;
        }
        case 60: {
          const fields = enc.decodeFields(
            r,
            ["shortstr", "longlong", "bit", "shortstr", "shortstr"]
          );
          const args = {
            consumerTag: fields[0].value,
            deliveryTag: fields[1].value,
            redelivered: fields[2].value,
            exchange: fields[3].value,
            routingKey: fields[4].value
          };
          return args;
        }
        case 70: {
          const fields = enc.decodeFields(r, ["short", "shortstr", "bit"]);
          const args = {
            ticket: fields[0].value,
            queue: fields[1].value,
            noAck: fields[2].value
          };
          return args;
        }
        case 71: {
          const fields = enc.decodeFields(
            r,
            ["longlong", "bit", "shortstr", "shortstr", "long"]
          );
          const args = {
            deliveryTag: fields[0].value,
            redelivered: fields[1].value,
            exchange: fields[2].value,
            routingKey: fields[3].value,
            messageCount: fields[4].value
          };
          return args;
        }
        case 72: {
          const fields = enc.decodeFields(r, ["shortstr"]);
          const args = { clusterId: fields[0].value };
          return args;
        }
        case 80: {
          const fields = enc.decodeFields(r, ["longlong", "bit"]);
          const args = {
            deliveryTag: fields[0].value,
            multiple: fields[1].value
          };
          return args;
        }
        case 90: {
          const fields = enc.decodeFields(r, ["longlong", "bit"]);
          const args = {
            deliveryTag: fields[0].value,
            requeue: fields[1].value
          };
          return args;
        }
        case 100: {
          const fields = enc.decodeFields(r, ["bit"]);
          const args = { requeue: fields[0].value };
          return args;
        }
        case 110: {
          const fields = enc.decodeFields(r, ["bit"]);
          const args = { requeue: fields[0].value };
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
            deliveryTag: fields[0].value,
            multiple: fields[1].value,
            requeue: fields[2].value
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
          const args = { nowait: fields[0].value };
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

export function encodeProps(classId: number, props: any): Uint8Array {
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
        { type: "shortstr", value: props["contentType"] },
        { type: "shortstr", value: props["contentEncoding"] },
        { type: "table", value: props["headers"] },
        { type: "octet", value: props["deliveryMode"] },
        { type: "octet", value: props["priority"] },
        { type: "shortstr", value: props["correlationId"] },
        { type: "shortstr", value: props["replyTo"] },
        { type: "shortstr", value: props["expiration"] },
        { type: "shortstr", value: props["messageId"] },
        { type: "timestamp", value: props["timestamp"] },
        { type: "shortstr", value: props["type"] },
        { type: "shortstr", value: props["userId"] },
        { type: "shortstr", value: props["appId"] },
        { type: "shortstr", value: props["clusterId"] }
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

export function decodeProps(r: Deno.SyncReader, classId: number): any {
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
