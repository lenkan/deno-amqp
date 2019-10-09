import { createEncoder } from "./encoder.ts";
import { createDecoder } from "./decoder.ts";
export type Method =
  | {
      type: 1;
      channel: number;
      name: "start";
      classId: 10;
      methodId: 10;
      args: {
        ["version-major"]: any;
        ["version-minor"]: any;
        ["server-properties"]: any;
        ["mechanisms"]: any;
        ["locales"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "start-ok";
      classId: 10;
      methodId: 11;
      args: {
        ["client-properties"]: any;
        ["mechanism"]: any;
        ["response"]: any;
        ["locale"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "secure";
      classId: 10;
      methodId: 20;
      args: {
        ["challenge"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "secure-ok";
      classId: 10;
      methodId: 21;
      args: {
        ["response"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "tune";
      classId: 10;
      methodId: 30;
      args: {
        ["channel-max"]: any;
        ["frame-max"]: any;
        ["heartbeat"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "tune-ok";
      classId: 10;
      methodId: 31;
      args: {
        ["channel-max"]: any;
        ["frame-max"]: any;
        ["heartbeat"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "open";
      classId: 10;
      methodId: 40;
      args: {
        ["virtual-host"]: any;
        ["capabilities"]: any;
        ["insist"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "open-ok";
      classId: 10;
      methodId: 41;
      args: {
        ["known-hosts"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "close";
      classId: 10;
      methodId: 50;
      args: {
        ["reply-code"]: any;
        ["reply-text"]: any;
        ["class-id"]: any;
        ["method-id"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "close-ok";
      classId: 10;
      methodId: 51;
      args: {};
    }
  | {
      type: 1;
      channel: number;
      name: "blocked";
      classId: 10;
      methodId: 60;
      args: {
        ["reason"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "unblocked";
      classId: 10;
      methodId: 61;
      args: {};
    }
  | {
      type: 1;
      channel: number;
      name: "update-secret";
      classId: 10;
      methodId: 70;
      args: {
        ["new-secret"]: any;
        ["reason"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "update-secret-ok";
      classId: 10;
      methodId: 71;
      args: {};
    }
  | {
      type: 1;
      channel: number;
      name: "open";
      classId: 20;
      methodId: 10;
      args: {
        ["out-of-band"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "open-ok";
      classId: 20;
      methodId: 11;
      args: {
        ["channel-id"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "flow";
      classId: 20;
      methodId: 20;
      args: {
        ["active"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "flow-ok";
      classId: 20;
      methodId: 21;
      args: {
        ["active"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "close";
      classId: 20;
      methodId: 40;
      args: {
        ["reply-code"]: any;
        ["reply-text"]: any;
        ["class-id"]: any;
        ["method-id"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "close-ok";
      classId: 20;
      methodId: 41;
      args: {};
    }
  | {
      type: 1;
      channel: number;
      name: "request";
      classId: 30;
      methodId: 10;
      args: {
        ["realm"]: any;
        ["exclusive"]: any;
        ["passive"]: any;
        ["active"]: any;
        ["write"]: any;
        ["read"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "request-ok";
      classId: 30;
      methodId: 11;
      args: {
        ["ticket"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "declare";
      classId: 40;
      methodId: 10;
      args: {
        ["ticket"]: any;
        ["exchange"]: any;
        ["type"]: any;
        ["passive"]: any;
        ["durable"]: any;
        ["auto-delete"]: any;
        ["internal"]: any;
        ["nowait"]: any;
        ["arguments"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "declare-ok";
      classId: 40;
      methodId: 11;
      args: {};
    }
  | {
      type: 1;
      channel: number;
      name: "delete";
      classId: 40;
      methodId: 20;
      args: {
        ["ticket"]: any;
        ["exchange"]: any;
        ["if-unused"]: any;
        ["nowait"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "delete-ok";
      classId: 40;
      methodId: 21;
      args: {};
    }
  | {
      type: 1;
      channel: number;
      name: "bind";
      classId: 40;
      methodId: 30;
      args: {
        ["ticket"]: any;
        ["destination"]: any;
        ["source"]: any;
        ["routing-key"]: any;
        ["nowait"]: any;
        ["arguments"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "bind-ok";
      classId: 40;
      methodId: 31;
      args: {};
    }
  | {
      type: 1;
      channel: number;
      name: "unbind";
      classId: 40;
      methodId: 40;
      args: {
        ["ticket"]: any;
        ["destination"]: any;
        ["source"]: any;
        ["routing-key"]: any;
        ["nowait"]: any;
        ["arguments"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "unbind-ok";
      classId: 40;
      methodId: 51;
      args: {};
    }
  | {
      type: 1;
      channel: number;
      name: "declare";
      classId: 50;
      methodId: 10;
      args: {
        ["ticket"]: any;
        ["queue"]: any;
        ["passive"]: any;
        ["durable"]: any;
        ["exclusive"]: any;
        ["auto-delete"]: any;
        ["nowait"]: any;
        ["arguments"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "declare-ok";
      classId: 50;
      methodId: 11;
      args: {
        ["queue"]: any;
        ["message-count"]: any;
        ["consumer-count"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "bind";
      classId: 50;
      methodId: 20;
      args: {
        ["ticket"]: any;
        ["queue"]: any;
        ["exchange"]: any;
        ["routing-key"]: any;
        ["nowait"]: any;
        ["arguments"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "bind-ok";
      classId: 50;
      methodId: 21;
      args: {};
    }
  | {
      type: 1;
      channel: number;
      name: "purge";
      classId: 50;
      methodId: 30;
      args: {
        ["ticket"]: any;
        ["queue"]: any;
        ["nowait"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "purge-ok";
      classId: 50;
      methodId: 31;
      args: {
        ["message-count"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "delete";
      classId: 50;
      methodId: 40;
      args: {
        ["ticket"]: any;
        ["queue"]: any;
        ["if-unused"]: any;
        ["if-empty"]: any;
        ["nowait"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "delete-ok";
      classId: 50;
      methodId: 41;
      args: {
        ["message-count"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "unbind";
      classId: 50;
      methodId: 50;
      args: {
        ["ticket"]: any;
        ["queue"]: any;
        ["exchange"]: any;
        ["routing-key"]: any;
        ["arguments"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "unbind-ok";
      classId: 50;
      methodId: 51;
      args: {};
    }
  | {
      type: 1;
      channel: number;
      name: "qos";
      classId: 60;
      methodId: 10;
      args: {
        ["prefetch-size"]: any;
        ["prefetch-count"]: any;
        ["global"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "qos-ok";
      classId: 60;
      methodId: 11;
      args: {};
    }
  | {
      type: 1;
      channel: number;
      name: "consume";
      classId: 60;
      methodId: 20;
      args: {
        ["ticket"]: any;
        ["queue"]: any;
        ["consumer-tag"]: any;
        ["no-local"]: any;
        ["no-ack"]: any;
        ["exclusive"]: any;
        ["nowait"]: any;
        ["arguments"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "consume-ok";
      classId: 60;
      methodId: 21;
      args: {
        ["consumer-tag"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "cancel";
      classId: 60;
      methodId: 30;
      args: {
        ["consumer-tag"]: any;
        ["nowait"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "cancel-ok";
      classId: 60;
      methodId: 31;
      args: {
        ["consumer-tag"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "publish";
      classId: 60;
      methodId: 40;
      args: {
        ["ticket"]: any;
        ["exchange"]: any;
        ["routing-key"]: any;
        ["mandatory"]: any;
        ["immediate"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "return";
      classId: 60;
      methodId: 50;
      args: {
        ["reply-code"]: any;
        ["reply-text"]: any;
        ["exchange"]: any;
        ["routing-key"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "deliver";
      classId: 60;
      methodId: 60;
      args: {
        ["consumer-tag"]: any;
        ["delivery-tag"]: any;
        ["redelivered"]: any;
        ["exchange"]: any;
        ["routing-key"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "get";
      classId: 60;
      methodId: 70;
      args: {
        ["ticket"]: any;
        ["queue"]: any;
        ["no-ack"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "get-ok";
      classId: 60;
      methodId: 71;
      args: {
        ["delivery-tag"]: any;
        ["redelivered"]: any;
        ["exchange"]: any;
        ["routing-key"]: any;
        ["message-count"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "get-empty";
      classId: 60;
      methodId: 72;
      args: {
        ["cluster-id"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "ack";
      classId: 60;
      methodId: 80;
      args: {
        ["delivery-tag"]: any;
        ["multiple"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "reject";
      classId: 60;
      methodId: 90;
      args: {
        ["delivery-tag"]: any;
        ["requeue"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "recover-async";
      classId: 60;
      methodId: 100;
      args: {
        ["requeue"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "recover";
      classId: 60;
      methodId: 110;
      args: {
        ["requeue"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "recover-ok";
      classId: 60;
      methodId: 111;
      args: {};
    }
  | {
      type: 1;
      channel: number;
      name: "nack";
      classId: 60;
      methodId: 120;
      args: {
        ["delivery-tag"]: any;
        ["multiple"]: any;
        ["requeue"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "select";
      classId: 90;
      methodId: 10;
      args: {};
    }
  | {
      type: 1;
      channel: number;
      name: "select-ok";
      classId: 90;
      methodId: 11;
      args: {};
    }
  | {
      type: 1;
      channel: number;
      name: "commit";
      classId: 90;
      methodId: 20;
      args: {};
    }
  | {
      type: 1;
      channel: number;
      name: "commit-ok";
      classId: 90;
      methodId: 21;
      args: {};
    }
  | {
      type: 1;
      channel: number;
      name: "rollback";
      classId: 90;
      methodId: 30;
      args: {};
    }
  | {
      type: 1;
      channel: number;
      name: "rollback-ok";
      classId: 90;
      methodId: 31;
      args: {};
    }
  | {
      type: 1;
      channel: number;
      name: "select";
      classId: 85;
      methodId: 10;
      args: {
        ["nowait"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "select-ok";
      classId: 85;
      methodId: 11;
      args: {};
    };

export function encodeMethodPayload(method: Method): Uint8Array {
  if (method.classId === 10) {
    if (method.methodId === 10) {
      const encoder = createEncoder();
      encoder.encodeOctet(
        method.args["version-major"] !== undefined
          ? method.args["version-major"]
          : 0
      );
      encoder.encodeOctet(
        method.args["version-minor"] !== undefined
          ? method.args["version-minor"]
          : 9
      );
      encoder.encodeTable(method.args["server-properties"]);
      encoder.encodeLongString(
        method.args["mechanisms"] !== undefined
          ? method.args["mechanisms"]
          : "PLAIN"
      );
      encoder.encodeLongString(
        method.args["locales"] !== undefined ? method.args["locales"] : "en_US"
      );
      return encoder.bytes();
    }

    if (method.methodId === 11) {
      const encoder = createEncoder();
      encoder.encodeTable(method.args["client-properties"]);
      encoder.encodeShortString(
        method.args["mechanism"] !== undefined
          ? method.args["mechanism"]
          : "PLAIN"
      );
      encoder.encodeLongString(method.args["response"]);
      encoder.encodeShortString(
        method.args["locale"] !== undefined ? method.args["locale"] : "en_US"
      );
      return encoder.bytes();
    }

    if (method.methodId === 20) {
      const encoder = createEncoder();
      encoder.encodeLongString(method.args["challenge"]);
      return encoder.bytes();
    }

    if (method.methodId === 21) {
      const encoder = createEncoder();
      encoder.encodeLongString(method.args["response"]);
      return encoder.bytes();
    }

    if (method.methodId === 30) {
      const encoder = createEncoder();
      encoder.encodeShortUint(
        method.args["channel-max"] !== undefined
          ? method.args["channel-max"]
          : 0
      );
      encoder.encodeLongUint(
        method.args["frame-max"] !== undefined ? method.args["frame-max"] : 0
      );
      encoder.encodeShortUint(
        method.args["heartbeat"] !== undefined ? method.args["heartbeat"] : 0
      );
      return encoder.bytes();
    }

    if (method.methodId === 31) {
      const encoder = createEncoder();
      encoder.encodeShortUint(
        method.args["channel-max"] !== undefined
          ? method.args["channel-max"]
          : 0
      );
      encoder.encodeLongUint(
        method.args["frame-max"] !== undefined ? method.args["frame-max"] : 0
      );
      encoder.encodeShortUint(
        method.args["heartbeat"] !== undefined ? method.args["heartbeat"] : 0
      );
      return encoder.bytes();
    }

    if (method.methodId === 40) {
      const encoder = createEncoder();
      encoder.encodeShortString(
        method.args["virtual-host"] !== undefined
          ? method.args["virtual-host"]
          : "/"
      );
      encoder.encodeShortString(
        method.args["capabilities"] !== undefined
          ? method.args["capabilities"]
          : ""
      );
      encoder.encodeBit(
        method.args["insist"] !== undefined ? method.args["insist"] : false
      );
      return encoder.bytes();
    }

    if (method.methodId === 41) {
      const encoder = createEncoder();
      encoder.encodeShortString(
        method.args["known-hosts"] !== undefined
          ? method.args["known-hosts"]
          : ""
      );
      return encoder.bytes();
    }

    if (method.methodId === 50) {
      const encoder = createEncoder();
      encoder.encodeShortUint(method.args["reply-code"]);
      encoder.encodeShortString(
        method.args["reply-text"] !== undefined ? method.args["reply-text"] : ""
      );
      encoder.encodeShortUint(method.args["class-id"]);
      encoder.encodeShortUint(method.args["method-id"]);
      return encoder.bytes();
    }

    if (method.methodId === 51) {
      const encoder = createEncoder();

      return encoder.bytes();
    }

    if (method.methodId === 60) {
      const encoder = createEncoder();
      encoder.encodeShortString(
        method.args["reason"] !== undefined ? method.args["reason"] : ""
      );
      return encoder.bytes();
    }

    if (method.methodId === 61) {
      const encoder = createEncoder();

      return encoder.bytes();
    }

    if (method.methodId === 70) {
      const encoder = createEncoder();
      encoder.encodeLongString(method.args["new-secret"]);
      encoder.encodeShortString(method.args["reason"]);
      return encoder.bytes();
    }

    if (method.methodId === 71) {
      const encoder = createEncoder();

      return encoder.bytes();
    }
  }

  if (method.classId === 20) {
    if (method.methodId === 10) {
      const encoder = createEncoder();
      encoder.encodeShortString(
        method.args["out-of-band"] !== undefined
          ? method.args["out-of-band"]
          : ""
      );
      return encoder.bytes();
    }

    if (method.methodId === 11) {
      const encoder = createEncoder();
      encoder.encodeLongString(
        method.args["channel-id"] !== undefined ? method.args["channel-id"] : ""
      );
      return encoder.bytes();
    }

    if (method.methodId === 20) {
      const encoder = createEncoder();
      encoder.encodeBit(method.args["active"]);
      return encoder.bytes();
    }

    if (method.methodId === 21) {
      const encoder = createEncoder();
      encoder.encodeBit(method.args["active"]);
      return encoder.bytes();
    }

    if (method.methodId === 40) {
      const encoder = createEncoder();
      encoder.encodeShortUint(method.args["reply-code"]);
      encoder.encodeShortString(
        method.args["reply-text"] !== undefined ? method.args["reply-text"] : ""
      );
      encoder.encodeShortUint(method.args["class-id"]);
      encoder.encodeShortUint(method.args["method-id"]);
      return encoder.bytes();
    }

    if (method.methodId === 41) {
      const encoder = createEncoder();

      return encoder.bytes();
    }
  }

  if (method.classId === 30) {
    if (method.methodId === 10) {
      const encoder = createEncoder();
      encoder.encodeShortString(
        method.args["realm"] !== undefined ? method.args["realm"] : "/data"
      );
      encoder.encodeBit(
        method.args["exclusive"] !== undefined
          ? method.args["exclusive"]
          : false
      );
      encoder.encodeBit(
        method.args["passive"] !== undefined ? method.args["passive"] : true
      );
      encoder.encodeBit(
        method.args["active"] !== undefined ? method.args["active"] : true
      );
      encoder.encodeBit(
        method.args["write"] !== undefined ? method.args["write"] : true
      );
      encoder.encodeBit(
        method.args["read"] !== undefined ? method.args["read"] : true
      );
      return encoder.bytes();
    }

    if (method.methodId === 11) {
      const encoder = createEncoder();
      encoder.encodeShortUint(
        method.args["ticket"] !== undefined ? method.args["ticket"] : 1
      );
      return encoder.bytes();
    }
  }

  if (method.classId === 40) {
    if (method.methodId === 10) {
      const encoder = createEncoder();
      encoder.encodeShortUint(
        method.args["ticket"] !== undefined ? method.args["ticket"] : 0
      );
      encoder.encodeShortString(method.args["exchange"]);
      encoder.encodeShortString(
        method.args["type"] !== undefined ? method.args["type"] : "direct"
      );
      encoder.encodeBit(
        method.args["passive"] !== undefined ? method.args["passive"] : false
      );
      encoder.encodeBit(
        method.args["durable"] !== undefined ? method.args["durable"] : false
      );
      encoder.encodeBit(
        method.args["auto-delete"] !== undefined
          ? method.args["auto-delete"]
          : false
      );
      encoder.encodeBit(
        method.args["internal"] !== undefined ? method.args["internal"] : false
      );
      encoder.encodeBit(
        method.args["nowait"] !== undefined ? method.args["nowait"] : false
      );
      encoder.encodeTable(
        method.args["arguments"] !== undefined ? method.args["arguments"] : {}
      );
      return encoder.bytes();
    }

    if (method.methodId === 11) {
      const encoder = createEncoder();

      return encoder.bytes();
    }

    if (method.methodId === 20) {
      const encoder = createEncoder();
      encoder.encodeShortUint(
        method.args["ticket"] !== undefined ? method.args["ticket"] : 0
      );
      encoder.encodeShortString(method.args["exchange"]);
      encoder.encodeBit(
        method.args["if-unused"] !== undefined
          ? method.args["if-unused"]
          : false
      );
      encoder.encodeBit(
        method.args["nowait"] !== undefined ? method.args["nowait"] : false
      );
      return encoder.bytes();
    }

    if (method.methodId === 21) {
      const encoder = createEncoder();

      return encoder.bytes();
    }

    if (method.methodId === 30) {
      const encoder = createEncoder();
      encoder.encodeShortUint(
        method.args["ticket"] !== undefined ? method.args["ticket"] : 0
      );
      encoder.encodeShortString(method.args["destination"]);
      encoder.encodeShortString(method.args["source"]);
      encoder.encodeShortString(
        method.args["routing-key"] !== undefined
          ? method.args["routing-key"]
          : ""
      );
      encoder.encodeBit(
        method.args["nowait"] !== undefined ? method.args["nowait"] : false
      );
      encoder.encodeTable(
        method.args["arguments"] !== undefined ? method.args["arguments"] : {}
      );
      return encoder.bytes();
    }

    if (method.methodId === 31) {
      const encoder = createEncoder();

      return encoder.bytes();
    }

    if (method.methodId === 40) {
      const encoder = createEncoder();
      encoder.encodeShortUint(
        method.args["ticket"] !== undefined ? method.args["ticket"] : 0
      );
      encoder.encodeShortString(method.args["destination"]);
      encoder.encodeShortString(method.args["source"]);
      encoder.encodeShortString(
        method.args["routing-key"] !== undefined
          ? method.args["routing-key"]
          : ""
      );
      encoder.encodeBit(
        method.args["nowait"] !== undefined ? method.args["nowait"] : false
      );
      encoder.encodeTable(
        method.args["arguments"] !== undefined ? method.args["arguments"] : {}
      );
      return encoder.bytes();
    }

    if (method.methodId === 51) {
      const encoder = createEncoder();

      return encoder.bytes();
    }
  }

  if (method.classId === 50) {
    if (method.methodId === 10) {
      const encoder = createEncoder();
      encoder.encodeShortUint(
        method.args["ticket"] !== undefined ? method.args["ticket"] : 0
      );
      encoder.encodeShortString(
        method.args["queue"] !== undefined ? method.args["queue"] : ""
      );
      encoder.encodeBit(
        method.args["passive"] !== undefined ? method.args["passive"] : false
      );
      encoder.encodeBit(
        method.args["durable"] !== undefined ? method.args["durable"] : false
      );
      encoder.encodeBit(
        method.args["exclusive"] !== undefined
          ? method.args["exclusive"]
          : false
      );
      encoder.encodeBit(
        method.args["auto-delete"] !== undefined
          ? method.args["auto-delete"]
          : false
      );
      encoder.encodeBit(
        method.args["nowait"] !== undefined ? method.args["nowait"] : false
      );
      encoder.encodeTable(
        method.args["arguments"] !== undefined ? method.args["arguments"] : {}
      );
      return encoder.bytes();
    }

    if (method.methodId === 11) {
      const encoder = createEncoder();
      encoder.encodeShortString(method.args["queue"]);
      encoder.encodeLongUint(method.args["message-count"]);
      encoder.encodeLongUint(method.args["consumer-count"]);
      return encoder.bytes();
    }

    if (method.methodId === 20) {
      const encoder = createEncoder();
      encoder.encodeShortUint(
        method.args["ticket"] !== undefined ? method.args["ticket"] : 0
      );
      encoder.encodeShortString(
        method.args["queue"] !== undefined ? method.args["queue"] : ""
      );
      encoder.encodeShortString(method.args["exchange"]);
      encoder.encodeShortString(
        method.args["routing-key"] !== undefined
          ? method.args["routing-key"]
          : ""
      );
      encoder.encodeBit(
        method.args["nowait"] !== undefined ? method.args["nowait"] : false
      );
      encoder.encodeTable(
        method.args["arguments"] !== undefined ? method.args["arguments"] : {}
      );
      return encoder.bytes();
    }

    if (method.methodId === 21) {
      const encoder = createEncoder();

      return encoder.bytes();
    }

    if (method.methodId === 30) {
      const encoder = createEncoder();
      encoder.encodeShortUint(
        method.args["ticket"] !== undefined ? method.args["ticket"] : 0
      );
      encoder.encodeShortString(
        method.args["queue"] !== undefined ? method.args["queue"] : ""
      );
      encoder.encodeBit(
        method.args["nowait"] !== undefined ? method.args["nowait"] : false
      );
      return encoder.bytes();
    }

    if (method.methodId === 31) {
      const encoder = createEncoder();
      encoder.encodeLongUint(method.args["message-count"]);
      return encoder.bytes();
    }

    if (method.methodId === 40) {
      const encoder = createEncoder();
      encoder.encodeShortUint(
        method.args["ticket"] !== undefined ? method.args["ticket"] : 0
      );
      encoder.encodeShortString(
        method.args["queue"] !== undefined ? method.args["queue"] : ""
      );
      encoder.encodeBit(
        method.args["if-unused"] !== undefined
          ? method.args["if-unused"]
          : false
      );
      encoder.encodeBit(
        method.args["if-empty"] !== undefined ? method.args["if-empty"] : false
      );
      encoder.encodeBit(
        method.args["nowait"] !== undefined ? method.args["nowait"] : false
      );
      return encoder.bytes();
    }

    if (method.methodId === 41) {
      const encoder = createEncoder();
      encoder.encodeLongUint(method.args["message-count"]);
      return encoder.bytes();
    }

    if (method.methodId === 50) {
      const encoder = createEncoder();
      encoder.encodeShortUint(
        method.args["ticket"] !== undefined ? method.args["ticket"] : 0
      );
      encoder.encodeShortString(
        method.args["queue"] !== undefined ? method.args["queue"] : ""
      );
      encoder.encodeShortString(method.args["exchange"]);
      encoder.encodeShortString(
        method.args["routing-key"] !== undefined
          ? method.args["routing-key"]
          : ""
      );
      encoder.encodeTable(
        method.args["arguments"] !== undefined ? method.args["arguments"] : {}
      );
      return encoder.bytes();
    }

    if (method.methodId === 51) {
      const encoder = createEncoder();

      return encoder.bytes();
    }
  }

  if (method.classId === 60) {
    if (method.methodId === 10) {
      const encoder = createEncoder();
      encoder.encodeLongUint(
        method.args["prefetch-size"] !== undefined
          ? method.args["prefetch-size"]
          : 0
      );
      encoder.encodeShortUint(
        method.args["prefetch-count"] !== undefined
          ? method.args["prefetch-count"]
          : 0
      );
      encoder.encodeBit(
        method.args["global"] !== undefined ? method.args["global"] : false
      );
      return encoder.bytes();
    }

    if (method.methodId === 11) {
      const encoder = createEncoder();

      return encoder.bytes();
    }

    if (method.methodId === 20) {
      const encoder = createEncoder();
      encoder.encodeShortUint(
        method.args["ticket"] !== undefined ? method.args["ticket"] : 0
      );
      encoder.encodeShortString(
        method.args["queue"] !== undefined ? method.args["queue"] : ""
      );
      encoder.encodeShortString(
        method.args["consumer-tag"] !== undefined
          ? method.args["consumer-tag"]
          : ""
      );
      encoder.encodeBit(
        method.args["no-local"] !== undefined ? method.args["no-local"] : false
      );
      encoder.encodeBit(
        method.args["no-ack"] !== undefined ? method.args["no-ack"] : false
      );
      encoder.encodeBit(
        method.args["exclusive"] !== undefined
          ? method.args["exclusive"]
          : false
      );
      encoder.encodeBit(
        method.args["nowait"] !== undefined ? method.args["nowait"] : false
      );
      encoder.encodeTable(
        method.args["arguments"] !== undefined ? method.args["arguments"] : {}
      );
      return encoder.bytes();
    }

    if (method.methodId === 21) {
      const encoder = createEncoder();
      encoder.encodeShortString(method.args["consumer-tag"]);
      return encoder.bytes();
    }

    if (method.methodId === 30) {
      const encoder = createEncoder();
      encoder.encodeShortString(method.args["consumer-tag"]);
      encoder.encodeBit(
        method.args["nowait"] !== undefined ? method.args["nowait"] : false
      );
      return encoder.bytes();
    }

    if (method.methodId === 31) {
      const encoder = createEncoder();
      encoder.encodeShortString(method.args["consumer-tag"]);
      return encoder.bytes();
    }

    if (method.methodId === 40) {
      const encoder = createEncoder();
      encoder.encodeShortUint(
        method.args["ticket"] !== undefined ? method.args["ticket"] : 0
      );
      encoder.encodeShortString(
        method.args["exchange"] !== undefined ? method.args["exchange"] : ""
      );
      encoder.encodeShortString(
        method.args["routing-key"] !== undefined
          ? method.args["routing-key"]
          : ""
      );
      encoder.encodeBit(
        method.args["mandatory"] !== undefined
          ? method.args["mandatory"]
          : false
      );
      encoder.encodeBit(
        method.args["immediate"] !== undefined
          ? method.args["immediate"]
          : false
      );
      return encoder.bytes();
    }

    if (method.methodId === 50) {
      const encoder = createEncoder();
      encoder.encodeShortUint(method.args["reply-code"]);
      encoder.encodeShortString(
        method.args["reply-text"] !== undefined ? method.args["reply-text"] : ""
      );
      encoder.encodeShortString(method.args["exchange"]);
      encoder.encodeShortString(method.args["routing-key"]);
      return encoder.bytes();
    }

    if (method.methodId === 60) {
      const encoder = createEncoder();
      encoder.encodeShortString(method.args["consumer-tag"]);
      encoder.encodeLongLongUint(method.args["delivery-tag"]);
      encoder.encodeBit(
        method.args["redelivered"] !== undefined
          ? method.args["redelivered"]
          : false
      );
      encoder.encodeShortString(method.args["exchange"]);
      encoder.encodeShortString(method.args["routing-key"]);
      return encoder.bytes();
    }

    if (method.methodId === 70) {
      const encoder = createEncoder();
      encoder.encodeShortUint(
        method.args["ticket"] !== undefined ? method.args["ticket"] : 0
      );
      encoder.encodeShortString(
        method.args["queue"] !== undefined ? method.args["queue"] : ""
      );
      encoder.encodeBit(
        method.args["no-ack"] !== undefined ? method.args["no-ack"] : false
      );
      return encoder.bytes();
    }

    if (method.methodId === 71) {
      const encoder = createEncoder();
      encoder.encodeLongLongUint(method.args["delivery-tag"]);
      encoder.encodeBit(
        method.args["redelivered"] !== undefined
          ? method.args["redelivered"]
          : false
      );
      encoder.encodeShortString(method.args["exchange"]);
      encoder.encodeShortString(method.args["routing-key"]);
      encoder.encodeLongUint(method.args["message-count"]);
      return encoder.bytes();
    }

    if (method.methodId === 72) {
      const encoder = createEncoder();
      encoder.encodeShortString(
        method.args["cluster-id"] !== undefined ? method.args["cluster-id"] : ""
      );
      return encoder.bytes();
    }

    if (method.methodId === 80) {
      const encoder = createEncoder();
      encoder.encodeLongLongUint(
        method.args["delivery-tag"] !== undefined
          ? method.args["delivery-tag"]
          : 0
      );
      encoder.encodeBit(
        method.args["multiple"] !== undefined ? method.args["multiple"] : false
      );
      return encoder.bytes();
    }

    if (method.methodId === 90) {
      const encoder = createEncoder();
      encoder.encodeLongLongUint(method.args["delivery-tag"]);
      encoder.encodeBit(
        method.args["requeue"] !== undefined ? method.args["requeue"] : true
      );
      return encoder.bytes();
    }

    if (method.methodId === 100) {
      const encoder = createEncoder();
      encoder.encodeBit(
        method.args["requeue"] !== undefined ? method.args["requeue"] : false
      );
      return encoder.bytes();
    }

    if (method.methodId === 110) {
      const encoder = createEncoder();
      encoder.encodeBit(
        method.args["requeue"] !== undefined ? method.args["requeue"] : false
      );
      return encoder.bytes();
    }

    if (method.methodId === 111) {
      const encoder = createEncoder();

      return encoder.bytes();
    }

    if (method.methodId === 120) {
      const encoder = createEncoder();
      encoder.encodeLongLongUint(
        method.args["delivery-tag"] !== undefined
          ? method.args["delivery-tag"]
          : 0
      );
      encoder.encodeBit(
        method.args["multiple"] !== undefined ? method.args["multiple"] : false
      );
      encoder.encodeBit(
        method.args["requeue"] !== undefined ? method.args["requeue"] : true
      );
      return encoder.bytes();
    }
  }

  if (method.classId === 90) {
    if (method.methodId === 10) {
      const encoder = createEncoder();

      return encoder.bytes();
    }

    if (method.methodId === 11) {
      const encoder = createEncoder();

      return encoder.bytes();
    }

    if (method.methodId === 20) {
      const encoder = createEncoder();

      return encoder.bytes();
    }

    if (method.methodId === 21) {
      const encoder = createEncoder();

      return encoder.bytes();
    }

    if (method.methodId === 30) {
      const encoder = createEncoder();

      return encoder.bytes();
    }

    if (method.methodId === 31) {
      const encoder = createEncoder();

      return encoder.bytes();
    }
  }

  if (method.classId === 85) {
    if (method.methodId === 10) {
      const encoder = createEncoder();
      encoder.encodeBit(
        method.args["nowait"] !== undefined ? method.args["nowait"] : false
      );
      return encoder.bytes();
    }

    if (method.methodId === 11) {
      const encoder = createEncoder();

      return encoder.bytes();
    }
  }
}

export function decodeMethodPayload(
  channel: number,
  classId: number,
  methodId: number,
  data: Uint8Array
): Method {
  if (classId === 10) {
    if (methodId === 10) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "start",
        classId,
        methodId,
        channel,
        args: {
          ["version-major"]: decoder.decodeOctet(),
          ["version-minor"]: decoder.decodeOctet(),
          ["server-properties"]: decoder.decodeTable(),
          ["mechanisms"]: decoder.decodeLongString(),
          ["locales"]: decoder.decodeLongString()
        }
      };
    }

    if (methodId === 11) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "start-ok",
        classId,
        methodId,
        channel,
        args: {
          ["client-properties"]: decoder.decodeTable(),
          ["mechanism"]: decoder.decodeShortString(),
          ["response"]: decoder.decodeLongString(),
          ["locale"]: decoder.decodeShortString()
        }
      };
    }

    if (methodId === 20) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "secure",
        classId,
        methodId,
        channel,
        args: {
          ["challenge"]: decoder.decodeLongString()
        }
      };
    }

    if (methodId === 21) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "secure-ok",
        classId,
        methodId,
        channel,
        args: {
          ["response"]: decoder.decodeLongString()
        }
      };
    }

    if (methodId === 30) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "tune",
        classId,
        methodId,
        channel,
        args: {
          ["channel-max"]: decoder.decodeShortUint(),
          ["frame-max"]: decoder.decodeLongUint(),
          ["heartbeat"]: decoder.decodeShortUint()
        }
      };
    }

    if (methodId === 31) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "tune-ok",
        classId,
        methodId,
        channel,
        args: {
          ["channel-max"]: decoder.decodeShortUint(),
          ["frame-max"]: decoder.decodeLongUint(),
          ["heartbeat"]: decoder.decodeShortUint()
        }
      };
    }

    if (methodId === 40) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "open",
        classId,
        methodId,
        channel,
        args: {
          ["virtual-host"]: decoder.decodeShortString(),
          ["capabilities"]: decoder.decodeShortString(),
          ["insist"]: decoder.decodeBit()
        }
      };
    }

    if (methodId === 41) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "open-ok",
        classId,
        methodId,
        channel,
        args: {
          ["known-hosts"]: decoder.decodeShortString()
        }
      };
    }

    if (methodId === 50) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "close",
        classId,
        methodId,
        channel,
        args: {
          ["reply-code"]: decoder.decodeShortUint(),
          ["reply-text"]: decoder.decodeShortString(),
          ["class-id"]: decoder.decodeShortUint(),
          ["method-id"]: decoder.decodeShortUint()
        }
      };
    }

    if (methodId === 51) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "close-ok",
        classId,
        methodId,
        channel,
        args: {}
      };
    }

    if (methodId === 60) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "blocked",
        classId,
        methodId,
        channel,
        args: {
          ["reason"]: decoder.decodeShortString()
        }
      };
    }

    if (methodId === 61) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "unblocked",
        classId,
        methodId,
        channel,
        args: {}
      };
    }

    if (methodId === 70) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "update-secret",
        classId,
        methodId,
        channel,
        args: {
          ["new-secret"]: decoder.decodeLongString(),
          ["reason"]: decoder.decodeShortString()
        }
      };
    }

    if (methodId === 71) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "update-secret-ok",
        classId,
        methodId,
        channel,
        args: {}
      };
    }
  }

  if (classId === 20) {
    if (methodId === 10) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "open",
        classId,
        methodId,
        channel,
        args: {
          ["out-of-band"]: decoder.decodeShortString()
        }
      };
    }

    if (methodId === 11) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "open-ok",
        classId,
        methodId,
        channel,
        args: {
          ["channel-id"]: decoder.decodeLongString()
        }
      };
    }

    if (methodId === 20) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "flow",
        classId,
        methodId,
        channel,
        args: {
          ["active"]: decoder.decodeBit()
        }
      };
    }

    if (methodId === 21) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "flow-ok",
        classId,
        methodId,
        channel,
        args: {
          ["active"]: decoder.decodeBit()
        }
      };
    }

    if (methodId === 40) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "close",
        classId,
        methodId,
        channel,
        args: {
          ["reply-code"]: decoder.decodeShortUint(),
          ["reply-text"]: decoder.decodeShortString(),
          ["class-id"]: decoder.decodeShortUint(),
          ["method-id"]: decoder.decodeShortUint()
        }
      };
    }

    if (methodId === 41) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "close-ok",
        classId,
        methodId,
        channel,
        args: {}
      };
    }
  }

  if (classId === 30) {
    if (methodId === 10) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "request",
        classId,
        methodId,
        channel,
        args: {
          ["realm"]: decoder.decodeShortString(),
          ["exclusive"]: decoder.decodeBit(),
          ["passive"]: decoder.decodeBit(),
          ["active"]: decoder.decodeBit(),
          ["write"]: decoder.decodeBit(),
          ["read"]: decoder.decodeBit()
        }
      };
    }

    if (methodId === 11) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "request-ok",
        classId,
        methodId,
        channel,
        args: {
          ["ticket"]: decoder.decodeShortUint()
        }
      };
    }
  }

  if (classId === 40) {
    if (methodId === 10) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "declare",
        classId,
        methodId,
        channel,
        args: {
          ["ticket"]: decoder.decodeShortUint(),
          ["exchange"]: decoder.decodeShortString(),
          ["type"]: decoder.decodeShortString(),
          ["passive"]: decoder.decodeBit(),
          ["durable"]: decoder.decodeBit(),
          ["auto-delete"]: decoder.decodeBit(),
          ["internal"]: decoder.decodeBit(),
          ["nowait"]: decoder.decodeBit(),
          ["arguments"]: decoder.decodeTable()
        }
      };
    }

    if (methodId === 11) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "declare-ok",
        classId,
        methodId,
        channel,
        args: {}
      };
    }

    if (methodId === 20) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "delete",
        classId,
        methodId,
        channel,
        args: {
          ["ticket"]: decoder.decodeShortUint(),
          ["exchange"]: decoder.decodeShortString(),
          ["if-unused"]: decoder.decodeBit(),
          ["nowait"]: decoder.decodeBit()
        }
      };
    }

    if (methodId === 21) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "delete-ok",
        classId,
        methodId,
        channel,
        args: {}
      };
    }

    if (methodId === 30) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "bind",
        classId,
        methodId,
        channel,
        args: {
          ["ticket"]: decoder.decodeShortUint(),
          ["destination"]: decoder.decodeShortString(),
          ["source"]: decoder.decodeShortString(),
          ["routing-key"]: decoder.decodeShortString(),
          ["nowait"]: decoder.decodeBit(),
          ["arguments"]: decoder.decodeTable()
        }
      };
    }

    if (methodId === 31) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "bind-ok",
        classId,
        methodId,
        channel,
        args: {}
      };
    }

    if (methodId === 40) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "unbind",
        classId,
        methodId,
        channel,
        args: {
          ["ticket"]: decoder.decodeShortUint(),
          ["destination"]: decoder.decodeShortString(),
          ["source"]: decoder.decodeShortString(),
          ["routing-key"]: decoder.decodeShortString(),
          ["nowait"]: decoder.decodeBit(),
          ["arguments"]: decoder.decodeTable()
        }
      };
    }

    if (methodId === 51) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "unbind-ok",
        classId,
        methodId,
        channel,
        args: {}
      };
    }
  }

  if (classId === 50) {
    if (methodId === 10) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "declare",
        classId,
        methodId,
        channel,
        args: {
          ["ticket"]: decoder.decodeShortUint(),
          ["queue"]: decoder.decodeShortString(),
          ["passive"]: decoder.decodeBit(),
          ["durable"]: decoder.decodeBit(),
          ["exclusive"]: decoder.decodeBit(),
          ["auto-delete"]: decoder.decodeBit(),
          ["nowait"]: decoder.decodeBit(),
          ["arguments"]: decoder.decodeTable()
        }
      };
    }

    if (methodId === 11) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "declare-ok",
        classId,
        methodId,
        channel,
        args: {
          ["queue"]: decoder.decodeShortString(),
          ["message-count"]: decoder.decodeLongUint(),
          ["consumer-count"]: decoder.decodeLongUint()
        }
      };
    }

    if (methodId === 20) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "bind",
        classId,
        methodId,
        channel,
        args: {
          ["ticket"]: decoder.decodeShortUint(),
          ["queue"]: decoder.decodeShortString(),
          ["exchange"]: decoder.decodeShortString(),
          ["routing-key"]: decoder.decodeShortString(),
          ["nowait"]: decoder.decodeBit(),
          ["arguments"]: decoder.decodeTable()
        }
      };
    }

    if (methodId === 21) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "bind-ok",
        classId,
        methodId,
        channel,
        args: {}
      };
    }

    if (methodId === 30) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "purge",
        classId,
        methodId,
        channel,
        args: {
          ["ticket"]: decoder.decodeShortUint(),
          ["queue"]: decoder.decodeShortString(),
          ["nowait"]: decoder.decodeBit()
        }
      };
    }

    if (methodId === 31) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "purge-ok",
        classId,
        methodId,
        channel,
        args: {
          ["message-count"]: decoder.decodeLongUint()
        }
      };
    }

    if (methodId === 40) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "delete",
        classId,
        methodId,
        channel,
        args: {
          ["ticket"]: decoder.decodeShortUint(),
          ["queue"]: decoder.decodeShortString(),
          ["if-unused"]: decoder.decodeBit(),
          ["if-empty"]: decoder.decodeBit(),
          ["nowait"]: decoder.decodeBit()
        }
      };
    }

    if (methodId === 41) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "delete-ok",
        classId,
        methodId,
        channel,
        args: {
          ["message-count"]: decoder.decodeLongUint()
        }
      };
    }

    if (methodId === 50) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "unbind",
        classId,
        methodId,
        channel,
        args: {
          ["ticket"]: decoder.decodeShortUint(),
          ["queue"]: decoder.decodeShortString(),
          ["exchange"]: decoder.decodeShortString(),
          ["routing-key"]: decoder.decodeShortString(),
          ["arguments"]: decoder.decodeTable()
        }
      };
    }

    if (methodId === 51) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "unbind-ok",
        classId,
        methodId,
        channel,
        args: {}
      };
    }
  }

  if (classId === 60) {
    if (methodId === 10) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "qos",
        classId,
        methodId,
        channel,
        args: {
          ["prefetch-size"]: decoder.decodeLongUint(),
          ["prefetch-count"]: decoder.decodeShortUint(),
          ["global"]: decoder.decodeBit()
        }
      };
    }

    if (methodId === 11) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "qos-ok",
        classId,
        methodId,
        channel,
        args: {}
      };
    }

    if (methodId === 20) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "consume",
        classId,
        methodId,
        channel,
        args: {
          ["ticket"]: decoder.decodeShortUint(),
          ["queue"]: decoder.decodeShortString(),
          ["consumer-tag"]: decoder.decodeShortString(),
          ["no-local"]: decoder.decodeBit(),
          ["no-ack"]: decoder.decodeBit(),
          ["exclusive"]: decoder.decodeBit(),
          ["nowait"]: decoder.decodeBit(),
          ["arguments"]: decoder.decodeTable()
        }
      };
    }

    if (methodId === 21) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "consume-ok",
        classId,
        methodId,
        channel,
        args: {
          ["consumer-tag"]: decoder.decodeShortString()
        }
      };
    }

    if (methodId === 30) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "cancel",
        classId,
        methodId,
        channel,
        args: {
          ["consumer-tag"]: decoder.decodeShortString(),
          ["nowait"]: decoder.decodeBit()
        }
      };
    }

    if (methodId === 31) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "cancel-ok",
        classId,
        methodId,
        channel,
        args: {
          ["consumer-tag"]: decoder.decodeShortString()
        }
      };
    }

    if (methodId === 40) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "publish",
        classId,
        methodId,
        channel,
        args: {
          ["ticket"]: decoder.decodeShortUint(),
          ["exchange"]: decoder.decodeShortString(),
          ["routing-key"]: decoder.decodeShortString(),
          ["mandatory"]: decoder.decodeBit(),
          ["immediate"]: decoder.decodeBit()
        }
      };
    }

    if (methodId === 50) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "return",
        classId,
        methodId,
        channel,
        args: {
          ["reply-code"]: decoder.decodeShortUint(),
          ["reply-text"]: decoder.decodeShortString(),
          ["exchange"]: decoder.decodeShortString(),
          ["routing-key"]: decoder.decodeShortString()
        }
      };
    }

    if (methodId === 60) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "deliver",
        classId,
        methodId,
        channel,
        args: {
          ["consumer-tag"]: decoder.decodeShortString(),
          ["delivery-tag"]: decoder.decodeLongLongUint(),
          ["redelivered"]: decoder.decodeBit(),
          ["exchange"]: decoder.decodeShortString(),
          ["routing-key"]: decoder.decodeShortString()
        }
      };
    }

    if (methodId === 70) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "get",
        classId,
        methodId,
        channel,
        args: {
          ["ticket"]: decoder.decodeShortUint(),
          ["queue"]: decoder.decodeShortString(),
          ["no-ack"]: decoder.decodeBit()
        }
      };
    }

    if (methodId === 71) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "get-ok",
        classId,
        methodId,
        channel,
        args: {
          ["delivery-tag"]: decoder.decodeLongLongUint(),
          ["redelivered"]: decoder.decodeBit(),
          ["exchange"]: decoder.decodeShortString(),
          ["routing-key"]: decoder.decodeShortString(),
          ["message-count"]: decoder.decodeLongUint()
        }
      };
    }

    if (methodId === 72) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "get-empty",
        classId,
        methodId,
        channel,
        args: {
          ["cluster-id"]: decoder.decodeShortString()
        }
      };
    }

    if (methodId === 80) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "ack",
        classId,
        methodId,
        channel,
        args: {
          ["delivery-tag"]: decoder.decodeLongLongUint(),
          ["multiple"]: decoder.decodeBit()
        }
      };
    }

    if (methodId === 90) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "reject",
        classId,
        methodId,
        channel,
        args: {
          ["delivery-tag"]: decoder.decodeLongLongUint(),
          ["requeue"]: decoder.decodeBit()
        }
      };
    }

    if (methodId === 100) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "recover-async",
        classId,
        methodId,
        channel,
        args: {
          ["requeue"]: decoder.decodeBit()
        }
      };
    }

    if (methodId === 110) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "recover",
        classId,
        methodId,
        channel,
        args: {
          ["requeue"]: decoder.decodeBit()
        }
      };
    }

    if (methodId === 111) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "recover-ok",
        classId,
        methodId,
        channel,
        args: {}
      };
    }

    if (methodId === 120) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "nack",
        classId,
        methodId,
        channel,
        args: {
          ["delivery-tag"]: decoder.decodeLongLongUint(),
          ["multiple"]: decoder.decodeBit(),
          ["requeue"]: decoder.decodeBit()
        }
      };
    }
  }

  if (classId === 90) {
    if (methodId === 10) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "select",
        classId,
        methodId,
        channel,
        args: {}
      };
    }

    if (methodId === 11) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "select-ok",
        classId,
        methodId,
        channel,
        args: {}
      };
    }

    if (methodId === 20) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "commit",
        classId,
        methodId,
        channel,
        args: {}
      };
    }

    if (methodId === 21) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "commit-ok",
        classId,
        methodId,
        channel,
        args: {}
      };
    }

    if (methodId === 30) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "rollback",
        classId,
        methodId,
        channel,
        args: {}
      };
    }

    if (methodId === 31) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "rollback-ok",
        classId,
        methodId,
        channel,
        args: {}
      };
    }
  }

  if (classId === 85) {
    if (methodId === 10) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "select",
        classId,
        methodId,
        channel,
        args: {
          ["nowait"]: decoder.decodeBit()
        }
      };
    }

    if (methodId === 11) {
      const decoder = createDecoder(data);
      return {
        type: 1,
        name: "select-ok",
        classId,
        methodId,
        channel,
        args: {}
      };
    }
  }
}
