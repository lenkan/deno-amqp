import { createEncoder } from "./encoder.ts";
import { createDecoder } from "./decoder.ts";
export type Method =
  | {
      type: 1;
      channel: number;
      name: "connection.start";
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
      name: "connection.start-ok";
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
      name: "connection.secure";
      args: {
        ["challenge"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "connection.secure-ok";
      args: {
        ["response"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "connection.tune";
      args: {
        ["channel-max"]: any;
        ["frame-max"]: any;
        ["heartbeat"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "connection.tune-ok";
      args: {
        ["channel-max"]: any;
        ["frame-max"]: any;
        ["heartbeat"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "connection.open";
      args: {
        ["virtual-host"]: any;
        ["capabilities"]: any;
        ["insist"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "connection.open-ok";
      args: {
        ["known-hosts"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "connection.close";
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
      name: "connection.close-ok";
      args: {};
    }
  | {
      type: 1;
      channel: number;
      name: "connection.blocked";
      args: {
        ["reason"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "connection.unblocked";
      args: {};
    }
  | {
      type: 1;
      channel: number;
      name: "connection.update-secret";
      args: {
        ["new-secret"]: any;
        ["reason"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "connection.update-secret-ok";
      args: {};
    }
  | {
      type: 1;
      channel: number;
      name: "channel.open";
      args: {
        ["out-of-band"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "channel.open-ok";
      args: {
        ["channel-id"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "channel.flow";
      args: {
        ["active"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "channel.flow-ok";
      args: {
        ["active"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "channel.close";
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
      name: "channel.close-ok";
      args: {};
    }
  | {
      type: 1;
      channel: number;
      name: "access.request";
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
      name: "access.request-ok";
      args: {
        ["ticket"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "exchange.declare";
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
      name: "exchange.declare-ok";
      args: {};
    }
  | {
      type: 1;
      channel: number;
      name: "exchange.delete";
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
      name: "exchange.delete-ok";
      args: {};
    }
  | {
      type: 1;
      channel: number;
      name: "exchange.bind";
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
      name: "exchange.bind-ok";
      args: {};
    }
  | {
      type: 1;
      channel: number;
      name: "exchange.unbind";
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
      name: "exchange.unbind-ok";
      args: {};
    }
  | {
      type: 1;
      channel: number;
      name: "queue.declare";
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
      name: "queue.declare-ok";
      args: {
        ["queue"]: any;
        ["message-count"]: any;
        ["consumer-count"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "queue.bind";
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
      name: "queue.bind-ok";
      args: {};
    }
  | {
      type: 1;
      channel: number;
      name: "queue.purge";
      args: {
        ["ticket"]: any;
        ["queue"]: any;
        ["nowait"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "queue.purge-ok";
      args: {
        ["message-count"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "queue.delete";
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
      name: "queue.delete-ok";
      args: {
        ["message-count"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "queue.unbind";
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
      name: "queue.unbind-ok";
      args: {};
    }
  | {
      type: 1;
      channel: number;
      name: "basic.qos";
      args: {
        ["prefetch-size"]: any;
        ["prefetch-count"]: any;
        ["global"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "basic.qos-ok";
      args: {};
    }
  | {
      type: 1;
      channel: number;
      name: "basic.consume";
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
      name: "basic.consume-ok";
      args: {
        ["consumer-tag"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "basic.cancel";
      args: {
        ["consumer-tag"]: any;
        ["nowait"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "basic.cancel-ok";
      args: {
        ["consumer-tag"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "basic.publish";
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
      name: "basic.return";
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
      name: "basic.deliver";
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
      name: "basic.get";
      args: {
        ["ticket"]: any;
        ["queue"]: any;
        ["no-ack"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "basic.get-ok";
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
      name: "basic.get-empty";
      args: {
        ["cluster-id"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "basic.ack";
      args: {
        ["delivery-tag"]: any;
        ["multiple"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "basic.reject";
      args: {
        ["delivery-tag"]: any;
        ["requeue"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "basic.recover-async";
      args: {
        ["requeue"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "basic.recover";
      args: {
        ["requeue"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "basic.recover-ok";
      args: {};
    }
  | {
      type: 1;
      channel: number;
      name: "basic.nack";
      args: {
        ["delivery-tag"]: any;
        ["multiple"]: any;
        ["requeue"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "tx.select";
      args: {};
    }
  | {
      type: 1;
      channel: number;
      name: "tx.select-ok";
      args: {};
    }
  | {
      type: 1;
      channel: number;
      name: "tx.commit";
      args: {};
    }
  | {
      type: 1;
      channel: number;
      name: "tx.commit-ok";
      args: {};
    }
  | {
      type: 1;
      channel: number;
      name: "tx.rollback";
      args: {};
    }
  | {
      type: 1;
      channel: number;
      name: "tx.rollback-ok";
      args: {};
    }
  | {
      type: 1;
      channel: number;
      name: "confirm.select";
      args: {
        ["nowait"]: any;
      };
    }
  | {
      type: 1;
      channel: number;
      name: "confirm.select-ok";
      args: {};
    };

export function encodeMethodPayload(method: Method): Uint8Array {
  if (method.name === "connection.start") {
    const encoder = createEncoder();
    encoder.encodeShortUint(10);
    encoder.encodeShortUint(10);
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

  if (method.name === "connection.start-ok") {
    const encoder = createEncoder();
    encoder.encodeShortUint(10);
    encoder.encodeShortUint(11);
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

  if (method.name === "connection.secure") {
    const encoder = createEncoder();
    encoder.encodeShortUint(10);
    encoder.encodeShortUint(20);
    encoder.encodeLongString(method.args["challenge"]);
    return encoder.bytes();
  }

  if (method.name === "connection.secure-ok") {
    const encoder = createEncoder();
    encoder.encodeShortUint(10);
    encoder.encodeShortUint(21);
    encoder.encodeLongString(method.args["response"]);
    return encoder.bytes();
  }

  if (method.name === "connection.tune") {
    const encoder = createEncoder();
    encoder.encodeShortUint(10);
    encoder.encodeShortUint(30);
    encoder.encodeShortUint(
      method.args["channel-max"] !== undefined ? method.args["channel-max"] : 0
    );
    encoder.encodeLongUint(
      method.args["frame-max"] !== undefined ? method.args["frame-max"] : 0
    );
    encoder.encodeShortUint(
      method.args["heartbeat"] !== undefined ? method.args["heartbeat"] : 0
    );
    return encoder.bytes();
  }

  if (method.name === "connection.tune-ok") {
    const encoder = createEncoder();
    encoder.encodeShortUint(10);
    encoder.encodeShortUint(31);
    encoder.encodeShortUint(
      method.args["channel-max"] !== undefined ? method.args["channel-max"] : 0
    );
    encoder.encodeLongUint(
      method.args["frame-max"] !== undefined ? method.args["frame-max"] : 0
    );
    encoder.encodeShortUint(
      method.args["heartbeat"] !== undefined ? method.args["heartbeat"] : 0
    );
    return encoder.bytes();
  }

  if (method.name === "connection.open") {
    const encoder = createEncoder();
    encoder.encodeShortUint(10);
    encoder.encodeShortUint(40);
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

  if (method.name === "connection.open-ok") {
    const encoder = createEncoder();
    encoder.encodeShortUint(10);
    encoder.encodeShortUint(41);
    encoder.encodeShortString(
      method.args["known-hosts"] !== undefined ? method.args["known-hosts"] : ""
    );
    return encoder.bytes();
  }

  if (method.name === "connection.close") {
    const encoder = createEncoder();
    encoder.encodeShortUint(10);
    encoder.encodeShortUint(50);
    encoder.encodeShortUint(method.args["reply-code"]);
    encoder.encodeShortString(
      method.args["reply-text"] !== undefined ? method.args["reply-text"] : ""
    );
    encoder.encodeShortUint(method.args["class-id"]);
    encoder.encodeShortUint(method.args["method-id"]);
    return encoder.bytes();
  }

  if (method.name === "connection.close-ok") {
    const encoder = createEncoder();
    encoder.encodeShortUint(10);
    encoder.encodeShortUint(51);

    return encoder.bytes();
  }

  if (method.name === "connection.blocked") {
    const encoder = createEncoder();
    encoder.encodeShortUint(10);
    encoder.encodeShortUint(60);
    encoder.encodeShortString(
      method.args["reason"] !== undefined ? method.args["reason"] : ""
    );
    return encoder.bytes();
  }

  if (method.name === "connection.unblocked") {
    const encoder = createEncoder();
    encoder.encodeShortUint(10);
    encoder.encodeShortUint(61);

    return encoder.bytes();
  }

  if (method.name === "connection.update-secret") {
    const encoder = createEncoder();
    encoder.encodeShortUint(10);
    encoder.encodeShortUint(70);
    encoder.encodeLongString(method.args["new-secret"]);
    encoder.encodeShortString(method.args["reason"]);
    return encoder.bytes();
  }

  if (method.name === "connection.update-secret-ok") {
    const encoder = createEncoder();
    encoder.encodeShortUint(10);
    encoder.encodeShortUint(71);

    return encoder.bytes();
  }

  if (method.name === "channel.open") {
    const encoder = createEncoder();
    encoder.encodeShortUint(20);
    encoder.encodeShortUint(10);
    encoder.encodeShortString(
      method.args["out-of-band"] !== undefined ? method.args["out-of-band"] : ""
    );
    return encoder.bytes();
  }

  if (method.name === "channel.open-ok") {
    const encoder = createEncoder();
    encoder.encodeShortUint(20);
    encoder.encodeShortUint(11);
    encoder.encodeLongString(
      method.args["channel-id"] !== undefined ? method.args["channel-id"] : ""
    );
    return encoder.bytes();
  }

  if (method.name === "channel.flow") {
    const encoder = createEncoder();
    encoder.encodeShortUint(20);
    encoder.encodeShortUint(20);
    encoder.encodeBit(method.args["active"]);
    return encoder.bytes();
  }

  if (method.name === "channel.flow-ok") {
    const encoder = createEncoder();
    encoder.encodeShortUint(20);
    encoder.encodeShortUint(21);
    encoder.encodeBit(method.args["active"]);
    return encoder.bytes();
  }

  if (method.name === "channel.close") {
    const encoder = createEncoder();
    encoder.encodeShortUint(20);
    encoder.encodeShortUint(40);
    encoder.encodeShortUint(method.args["reply-code"]);
    encoder.encodeShortString(
      method.args["reply-text"] !== undefined ? method.args["reply-text"] : ""
    );
    encoder.encodeShortUint(method.args["class-id"]);
    encoder.encodeShortUint(method.args["method-id"]);
    return encoder.bytes();
  }

  if (method.name === "channel.close-ok") {
    const encoder = createEncoder();
    encoder.encodeShortUint(20);
    encoder.encodeShortUint(41);

    return encoder.bytes();
  }

  if (method.name === "access.request") {
    const encoder = createEncoder();
    encoder.encodeShortUint(30);
    encoder.encodeShortUint(10);
    encoder.encodeShortString(
      method.args["realm"] !== undefined ? method.args["realm"] : "/data"
    );
    encoder.encodeBit(
      method.args["exclusive"] !== undefined ? method.args["exclusive"] : false
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

  if (method.name === "access.request-ok") {
    const encoder = createEncoder();
    encoder.encodeShortUint(30);
    encoder.encodeShortUint(11);
    encoder.encodeShortUint(
      method.args["ticket"] !== undefined ? method.args["ticket"] : 1
    );
    return encoder.bytes();
  }

  if (method.name === "exchange.declare") {
    const encoder = createEncoder();
    encoder.encodeShortUint(40);
    encoder.encodeShortUint(10);
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

  if (method.name === "exchange.declare-ok") {
    const encoder = createEncoder();
    encoder.encodeShortUint(40);
    encoder.encodeShortUint(11);

    return encoder.bytes();
  }

  if (method.name === "exchange.delete") {
    const encoder = createEncoder();
    encoder.encodeShortUint(40);
    encoder.encodeShortUint(20);
    encoder.encodeShortUint(
      method.args["ticket"] !== undefined ? method.args["ticket"] : 0
    );
    encoder.encodeShortString(method.args["exchange"]);
    encoder.encodeBit(
      method.args["if-unused"] !== undefined ? method.args["if-unused"] : false
    );
    encoder.encodeBit(
      method.args["nowait"] !== undefined ? method.args["nowait"] : false
    );
    return encoder.bytes();
  }

  if (method.name === "exchange.delete-ok") {
    const encoder = createEncoder();
    encoder.encodeShortUint(40);
    encoder.encodeShortUint(21);

    return encoder.bytes();
  }

  if (method.name === "exchange.bind") {
    const encoder = createEncoder();
    encoder.encodeShortUint(40);
    encoder.encodeShortUint(30);
    encoder.encodeShortUint(
      method.args["ticket"] !== undefined ? method.args["ticket"] : 0
    );
    encoder.encodeShortString(method.args["destination"]);
    encoder.encodeShortString(method.args["source"]);
    encoder.encodeShortString(
      method.args["routing-key"] !== undefined ? method.args["routing-key"] : ""
    );
    encoder.encodeBit(
      method.args["nowait"] !== undefined ? method.args["nowait"] : false
    );
    encoder.encodeTable(
      method.args["arguments"] !== undefined ? method.args["arguments"] : {}
    );
    return encoder.bytes();
  }

  if (method.name === "exchange.bind-ok") {
    const encoder = createEncoder();
    encoder.encodeShortUint(40);
    encoder.encodeShortUint(31);

    return encoder.bytes();
  }

  if (method.name === "exchange.unbind") {
    const encoder = createEncoder();
    encoder.encodeShortUint(40);
    encoder.encodeShortUint(40);
    encoder.encodeShortUint(
      method.args["ticket"] !== undefined ? method.args["ticket"] : 0
    );
    encoder.encodeShortString(method.args["destination"]);
    encoder.encodeShortString(method.args["source"]);
    encoder.encodeShortString(
      method.args["routing-key"] !== undefined ? method.args["routing-key"] : ""
    );
    encoder.encodeBit(
      method.args["nowait"] !== undefined ? method.args["nowait"] : false
    );
    encoder.encodeTable(
      method.args["arguments"] !== undefined ? method.args["arguments"] : {}
    );
    return encoder.bytes();
  }

  if (method.name === "exchange.unbind-ok") {
    const encoder = createEncoder();
    encoder.encodeShortUint(40);
    encoder.encodeShortUint(51);

    return encoder.bytes();
  }

  if (method.name === "queue.declare") {
    const encoder = createEncoder();
    encoder.encodeShortUint(50);
    encoder.encodeShortUint(10);
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
      method.args["exclusive"] !== undefined ? method.args["exclusive"] : false
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

  if (method.name === "queue.declare-ok") {
    const encoder = createEncoder();
    encoder.encodeShortUint(50);
    encoder.encodeShortUint(11);
    encoder.encodeShortString(method.args["queue"]);
    encoder.encodeLongUint(method.args["message-count"]);
    encoder.encodeLongUint(method.args["consumer-count"]);
    return encoder.bytes();
  }

  if (method.name === "queue.bind") {
    const encoder = createEncoder();
    encoder.encodeShortUint(50);
    encoder.encodeShortUint(20);
    encoder.encodeShortUint(
      method.args["ticket"] !== undefined ? method.args["ticket"] : 0
    );
    encoder.encodeShortString(
      method.args["queue"] !== undefined ? method.args["queue"] : ""
    );
    encoder.encodeShortString(method.args["exchange"]);
    encoder.encodeShortString(
      method.args["routing-key"] !== undefined ? method.args["routing-key"] : ""
    );
    encoder.encodeBit(
      method.args["nowait"] !== undefined ? method.args["nowait"] : false
    );
    encoder.encodeTable(
      method.args["arguments"] !== undefined ? method.args["arguments"] : {}
    );
    return encoder.bytes();
  }

  if (method.name === "queue.bind-ok") {
    const encoder = createEncoder();
    encoder.encodeShortUint(50);
    encoder.encodeShortUint(21);

    return encoder.bytes();
  }

  if (method.name === "queue.purge") {
    const encoder = createEncoder();
    encoder.encodeShortUint(50);
    encoder.encodeShortUint(30);
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

  if (method.name === "queue.purge-ok") {
    const encoder = createEncoder();
    encoder.encodeShortUint(50);
    encoder.encodeShortUint(31);
    encoder.encodeLongUint(method.args["message-count"]);
    return encoder.bytes();
  }

  if (method.name === "queue.delete") {
    const encoder = createEncoder();
    encoder.encodeShortUint(50);
    encoder.encodeShortUint(40);
    encoder.encodeShortUint(
      method.args["ticket"] !== undefined ? method.args["ticket"] : 0
    );
    encoder.encodeShortString(
      method.args["queue"] !== undefined ? method.args["queue"] : ""
    );
    encoder.encodeBit(
      method.args["if-unused"] !== undefined ? method.args["if-unused"] : false
    );
    encoder.encodeBit(
      method.args["if-empty"] !== undefined ? method.args["if-empty"] : false
    );
    encoder.encodeBit(
      method.args["nowait"] !== undefined ? method.args["nowait"] : false
    );
    return encoder.bytes();
  }

  if (method.name === "queue.delete-ok") {
    const encoder = createEncoder();
    encoder.encodeShortUint(50);
    encoder.encodeShortUint(41);
    encoder.encodeLongUint(method.args["message-count"]);
    return encoder.bytes();
  }

  if (method.name === "queue.unbind") {
    const encoder = createEncoder();
    encoder.encodeShortUint(50);
    encoder.encodeShortUint(50);
    encoder.encodeShortUint(
      method.args["ticket"] !== undefined ? method.args["ticket"] : 0
    );
    encoder.encodeShortString(
      method.args["queue"] !== undefined ? method.args["queue"] : ""
    );
    encoder.encodeShortString(method.args["exchange"]);
    encoder.encodeShortString(
      method.args["routing-key"] !== undefined ? method.args["routing-key"] : ""
    );
    encoder.encodeTable(
      method.args["arguments"] !== undefined ? method.args["arguments"] : {}
    );
    return encoder.bytes();
  }

  if (method.name === "queue.unbind-ok") {
    const encoder = createEncoder();
    encoder.encodeShortUint(50);
    encoder.encodeShortUint(51);

    return encoder.bytes();
  }

  if (method.name === "basic.qos") {
    const encoder = createEncoder();
    encoder.encodeShortUint(60);
    encoder.encodeShortUint(10);
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

  if (method.name === "basic.qos-ok") {
    const encoder = createEncoder();
    encoder.encodeShortUint(60);
    encoder.encodeShortUint(11);

    return encoder.bytes();
  }

  if (method.name === "basic.consume") {
    const encoder = createEncoder();
    encoder.encodeShortUint(60);
    encoder.encodeShortUint(20);
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
      method.args["exclusive"] !== undefined ? method.args["exclusive"] : false
    );
    encoder.encodeBit(
      method.args["nowait"] !== undefined ? method.args["nowait"] : false
    );
    encoder.encodeTable(
      method.args["arguments"] !== undefined ? method.args["arguments"] : {}
    );
    return encoder.bytes();
  }

  if (method.name === "basic.consume-ok") {
    const encoder = createEncoder();
    encoder.encodeShortUint(60);
    encoder.encodeShortUint(21);
    encoder.encodeShortString(method.args["consumer-tag"]);
    return encoder.bytes();
  }

  if (method.name === "basic.cancel") {
    const encoder = createEncoder();
    encoder.encodeShortUint(60);
    encoder.encodeShortUint(30);
    encoder.encodeShortString(method.args["consumer-tag"]);
    encoder.encodeBit(
      method.args["nowait"] !== undefined ? method.args["nowait"] : false
    );
    return encoder.bytes();
  }

  if (method.name === "basic.cancel-ok") {
    const encoder = createEncoder();
    encoder.encodeShortUint(60);
    encoder.encodeShortUint(31);
    encoder.encodeShortString(method.args["consumer-tag"]);
    return encoder.bytes();
  }

  if (method.name === "basic.publish") {
    const encoder = createEncoder();
    encoder.encodeShortUint(60);
    encoder.encodeShortUint(40);
    encoder.encodeShortUint(
      method.args["ticket"] !== undefined ? method.args["ticket"] : 0
    );
    encoder.encodeShortString(
      method.args["exchange"] !== undefined ? method.args["exchange"] : ""
    );
    encoder.encodeShortString(
      method.args["routing-key"] !== undefined ? method.args["routing-key"] : ""
    );
    encoder.encodeBit(
      method.args["mandatory"] !== undefined ? method.args["mandatory"] : false
    );
    encoder.encodeBit(
      method.args["immediate"] !== undefined ? method.args["immediate"] : false
    );
    return encoder.bytes();
  }

  if (method.name === "basic.return") {
    const encoder = createEncoder();
    encoder.encodeShortUint(60);
    encoder.encodeShortUint(50);
    encoder.encodeShortUint(method.args["reply-code"]);
    encoder.encodeShortString(
      method.args["reply-text"] !== undefined ? method.args["reply-text"] : ""
    );
    encoder.encodeShortString(method.args["exchange"]);
    encoder.encodeShortString(method.args["routing-key"]);
    return encoder.bytes();
  }

  if (method.name === "basic.deliver") {
    const encoder = createEncoder();
    encoder.encodeShortUint(60);
    encoder.encodeShortUint(60);
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

  if (method.name === "basic.get") {
    const encoder = createEncoder();
    encoder.encodeShortUint(60);
    encoder.encodeShortUint(70);
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

  if (method.name === "basic.get-ok") {
    const encoder = createEncoder();
    encoder.encodeShortUint(60);
    encoder.encodeShortUint(71);
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

  if (method.name === "basic.get-empty") {
    const encoder = createEncoder();
    encoder.encodeShortUint(60);
    encoder.encodeShortUint(72);
    encoder.encodeShortString(
      method.args["cluster-id"] !== undefined ? method.args["cluster-id"] : ""
    );
    return encoder.bytes();
  }

  if (method.name === "basic.ack") {
    const encoder = createEncoder();
    encoder.encodeShortUint(60);
    encoder.encodeShortUint(80);
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

  if (method.name === "basic.reject") {
    const encoder = createEncoder();
    encoder.encodeShortUint(60);
    encoder.encodeShortUint(90);
    encoder.encodeLongLongUint(method.args["delivery-tag"]);
    encoder.encodeBit(
      method.args["requeue"] !== undefined ? method.args["requeue"] : true
    );
    return encoder.bytes();
  }

  if (method.name === "basic.recover-async") {
    const encoder = createEncoder();
    encoder.encodeShortUint(60);
    encoder.encodeShortUint(100);
    encoder.encodeBit(
      method.args["requeue"] !== undefined ? method.args["requeue"] : false
    );
    return encoder.bytes();
  }

  if (method.name === "basic.recover") {
    const encoder = createEncoder();
    encoder.encodeShortUint(60);
    encoder.encodeShortUint(110);
    encoder.encodeBit(
      method.args["requeue"] !== undefined ? method.args["requeue"] : false
    );
    return encoder.bytes();
  }

  if (method.name === "basic.recover-ok") {
    const encoder = createEncoder();
    encoder.encodeShortUint(60);
    encoder.encodeShortUint(111);

    return encoder.bytes();
  }

  if (method.name === "basic.nack") {
    const encoder = createEncoder();
    encoder.encodeShortUint(60);
    encoder.encodeShortUint(120);
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

  if (method.name === "tx.select") {
    const encoder = createEncoder();
    encoder.encodeShortUint(90);
    encoder.encodeShortUint(10);

    return encoder.bytes();
  }

  if (method.name === "tx.select-ok") {
    const encoder = createEncoder();
    encoder.encodeShortUint(90);
    encoder.encodeShortUint(11);

    return encoder.bytes();
  }

  if (method.name === "tx.commit") {
    const encoder = createEncoder();
    encoder.encodeShortUint(90);
    encoder.encodeShortUint(20);

    return encoder.bytes();
  }

  if (method.name === "tx.commit-ok") {
    const encoder = createEncoder();
    encoder.encodeShortUint(90);
    encoder.encodeShortUint(21);

    return encoder.bytes();
  }

  if (method.name === "tx.rollback") {
    const encoder = createEncoder();
    encoder.encodeShortUint(90);
    encoder.encodeShortUint(30);

    return encoder.bytes();
  }

  if (method.name === "tx.rollback-ok") {
    const encoder = createEncoder();
    encoder.encodeShortUint(90);
    encoder.encodeShortUint(31);

    return encoder.bytes();
  }

  if (method.name === "confirm.select") {
    const encoder = createEncoder();
    encoder.encodeShortUint(85);
    encoder.encodeShortUint(10);
    encoder.encodeBit(
      method.args["nowait"] !== undefined ? method.args["nowait"] : false
    );
    return encoder.bytes();
  }

  if (method.name === "confirm.select-ok") {
    const encoder = createEncoder();
    encoder.encodeShortUint(85);
    encoder.encodeShortUint(11);

    return encoder.bytes();
  }
}

export function decodeMethodPayload(
  channel: number,
  classId: number,
  methodId: number,
  data: Uint8Array
): Method {
  if (classId === 10 && methodId === 10) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "connection.start",
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

  if (classId === 10 && methodId === 11) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "connection.start-ok",
      channel,
      args: {
        ["client-properties"]: decoder.decodeTable(),
        ["mechanism"]: decoder.decodeShortString(),
        ["response"]: decoder.decodeLongString(),
        ["locale"]: decoder.decodeShortString()
      }
    };
  }

  if (classId === 10 && methodId === 20) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "connection.secure",
      channel,
      args: {
        ["challenge"]: decoder.decodeLongString()
      }
    };
  }

  if (classId === 10 && methodId === 21) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "connection.secure-ok",
      channel,
      args: {
        ["response"]: decoder.decodeLongString()
      }
    };
  }

  if (classId === 10 && methodId === 30) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "connection.tune",
      channel,
      args: {
        ["channel-max"]: decoder.decodeShortUint(),
        ["frame-max"]: decoder.decodeLongUint(),
        ["heartbeat"]: decoder.decodeShortUint()
      }
    };
  }

  if (classId === 10 && methodId === 31) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "connection.tune-ok",
      channel,
      args: {
        ["channel-max"]: decoder.decodeShortUint(),
        ["frame-max"]: decoder.decodeLongUint(),
        ["heartbeat"]: decoder.decodeShortUint()
      }
    };
  }

  if (classId === 10 && methodId === 40) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "connection.open",
      channel,
      args: {
        ["virtual-host"]: decoder.decodeShortString(),
        ["capabilities"]: decoder.decodeShortString(),
        ["insist"]: decoder.decodeBit()
      }
    };
  }

  if (classId === 10 && methodId === 41) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "connection.open-ok",
      channel,
      args: {
        ["known-hosts"]: decoder.decodeShortString()
      }
    };
  }

  if (classId === 10 && methodId === 50) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "connection.close",
      channel,
      args: {
        ["reply-code"]: decoder.decodeShortUint(),
        ["reply-text"]: decoder.decodeShortString(),
        ["class-id"]: decoder.decodeShortUint(),
        ["method-id"]: decoder.decodeShortUint()
      }
    };
  }

  if (classId === 10 && methodId === 51) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "connection.close-ok",
      channel,
      args: {}
    };
  }

  if (classId === 10 && methodId === 60) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "connection.blocked",
      channel,
      args: {
        ["reason"]: decoder.decodeShortString()
      }
    };
  }

  if (classId === 10 && methodId === 61) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "connection.unblocked",
      channel,
      args: {}
    };
  }

  if (classId === 10 && methodId === 70) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "connection.update-secret",
      channel,
      args: {
        ["new-secret"]: decoder.decodeLongString(),
        ["reason"]: decoder.decodeShortString()
      }
    };
  }

  if (classId === 10 && methodId === 71) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "connection.update-secret-ok",
      channel,
      args: {}
    };
  }

  if (classId === 20 && methodId === 10) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "channel.open",
      channel,
      args: {
        ["out-of-band"]: decoder.decodeShortString()
      }
    };
  }

  if (classId === 20 && methodId === 11) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "channel.open-ok",
      channel,
      args: {
        ["channel-id"]: decoder.decodeLongString()
      }
    };
  }

  if (classId === 20 && methodId === 20) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "channel.flow",
      channel,
      args: {
        ["active"]: decoder.decodeBit()
      }
    };
  }

  if (classId === 20 && methodId === 21) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "channel.flow-ok",
      channel,
      args: {
        ["active"]: decoder.decodeBit()
      }
    };
  }

  if (classId === 20 && methodId === 40) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "channel.close",
      channel,
      args: {
        ["reply-code"]: decoder.decodeShortUint(),
        ["reply-text"]: decoder.decodeShortString(),
        ["class-id"]: decoder.decodeShortUint(),
        ["method-id"]: decoder.decodeShortUint()
      }
    };
  }

  if (classId === 20 && methodId === 41) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "channel.close-ok",
      channel,
      args: {}
    };
  }

  if (classId === 30 && methodId === 10) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "access.request",
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

  if (classId === 30 && methodId === 11) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "access.request-ok",
      channel,
      args: {
        ["ticket"]: decoder.decodeShortUint()
      }
    };
  }

  if (classId === 40 && methodId === 10) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "exchange.declare",
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

  if (classId === 40 && methodId === 11) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "exchange.declare-ok",
      channel,
      args: {}
    };
  }

  if (classId === 40 && methodId === 20) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "exchange.delete",
      channel,
      args: {
        ["ticket"]: decoder.decodeShortUint(),
        ["exchange"]: decoder.decodeShortString(),
        ["if-unused"]: decoder.decodeBit(),
        ["nowait"]: decoder.decodeBit()
      }
    };
  }

  if (classId === 40 && methodId === 21) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "exchange.delete-ok",
      channel,
      args: {}
    };
  }

  if (classId === 40 && methodId === 30) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "exchange.bind",
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

  if (classId === 40 && methodId === 31) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "exchange.bind-ok",
      channel,
      args: {}
    };
  }

  if (classId === 40 && methodId === 40) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "exchange.unbind",
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

  if (classId === 40 && methodId === 51) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "exchange.unbind-ok",
      channel,
      args: {}
    };
  }

  if (classId === 50 && methodId === 10) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "queue.declare",
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

  if (classId === 50 && methodId === 11) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "queue.declare-ok",
      channel,
      args: {
        ["queue"]: decoder.decodeShortString(),
        ["message-count"]: decoder.decodeLongUint(),
        ["consumer-count"]: decoder.decodeLongUint()
      }
    };
  }

  if (classId === 50 && methodId === 20) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "queue.bind",
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

  if (classId === 50 && methodId === 21) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "queue.bind-ok",
      channel,
      args: {}
    };
  }

  if (classId === 50 && methodId === 30) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "queue.purge",
      channel,
      args: {
        ["ticket"]: decoder.decodeShortUint(),
        ["queue"]: decoder.decodeShortString(),
        ["nowait"]: decoder.decodeBit()
      }
    };
  }

  if (classId === 50 && methodId === 31) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "queue.purge-ok",
      channel,
      args: {
        ["message-count"]: decoder.decodeLongUint()
      }
    };
  }

  if (classId === 50 && methodId === 40) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "queue.delete",
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

  if (classId === 50 && methodId === 41) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "queue.delete-ok",
      channel,
      args: {
        ["message-count"]: decoder.decodeLongUint()
      }
    };
  }

  if (classId === 50 && methodId === 50) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "queue.unbind",
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

  if (classId === 50 && methodId === 51) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "queue.unbind-ok",
      channel,
      args: {}
    };
  }

  if (classId === 60 && methodId === 10) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "basic.qos",
      channel,
      args: {
        ["prefetch-size"]: decoder.decodeLongUint(),
        ["prefetch-count"]: decoder.decodeShortUint(),
        ["global"]: decoder.decodeBit()
      }
    };
  }

  if (classId === 60 && methodId === 11) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "basic.qos-ok",
      channel,
      args: {}
    };
  }

  if (classId === 60 && methodId === 20) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "basic.consume",
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

  if (classId === 60 && methodId === 21) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "basic.consume-ok",
      channel,
      args: {
        ["consumer-tag"]: decoder.decodeShortString()
      }
    };
  }

  if (classId === 60 && methodId === 30) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "basic.cancel",
      channel,
      args: {
        ["consumer-tag"]: decoder.decodeShortString(),
        ["nowait"]: decoder.decodeBit()
      }
    };
  }

  if (classId === 60 && methodId === 31) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "basic.cancel-ok",
      channel,
      args: {
        ["consumer-tag"]: decoder.decodeShortString()
      }
    };
  }

  if (classId === 60 && methodId === 40) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "basic.publish",
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

  if (classId === 60 && methodId === 50) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "basic.return",
      channel,
      args: {
        ["reply-code"]: decoder.decodeShortUint(),
        ["reply-text"]: decoder.decodeShortString(),
        ["exchange"]: decoder.decodeShortString(),
        ["routing-key"]: decoder.decodeShortString()
      }
    };
  }

  if (classId === 60 && methodId === 60) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "basic.deliver",
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

  if (classId === 60 && methodId === 70) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "basic.get",
      channel,
      args: {
        ["ticket"]: decoder.decodeShortUint(),
        ["queue"]: decoder.decodeShortString(),
        ["no-ack"]: decoder.decodeBit()
      }
    };
  }

  if (classId === 60 && methodId === 71) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "basic.get-ok",
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

  if (classId === 60 && methodId === 72) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "basic.get-empty",
      channel,
      args: {
        ["cluster-id"]: decoder.decodeShortString()
      }
    };
  }

  if (classId === 60 && methodId === 80) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "basic.ack",
      channel,
      args: {
        ["delivery-tag"]: decoder.decodeLongLongUint(),
        ["multiple"]: decoder.decodeBit()
      }
    };
  }

  if (classId === 60 && methodId === 90) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "basic.reject",
      channel,
      args: {
        ["delivery-tag"]: decoder.decodeLongLongUint(),
        ["requeue"]: decoder.decodeBit()
      }
    };
  }

  if (classId === 60 && methodId === 100) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "basic.recover-async",
      channel,
      args: {
        ["requeue"]: decoder.decodeBit()
      }
    };
  }

  if (classId === 60 && methodId === 110) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "basic.recover",
      channel,
      args: {
        ["requeue"]: decoder.decodeBit()
      }
    };
  }

  if (classId === 60 && methodId === 111) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "basic.recover-ok",
      channel,
      args: {}
    };
  }

  if (classId === 60 && methodId === 120) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "basic.nack",
      channel,
      args: {
        ["delivery-tag"]: decoder.decodeLongLongUint(),
        ["multiple"]: decoder.decodeBit(),
        ["requeue"]: decoder.decodeBit()
      }
    };
  }

  if (classId === 90 && methodId === 10) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "tx.select",
      channel,
      args: {}
    };
  }

  if (classId === 90 && methodId === 11) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "tx.select-ok",
      channel,
      args: {}
    };
  }

  if (classId === 90 && methodId === 20) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "tx.commit",
      channel,
      args: {}
    };
  }

  if (classId === 90 && methodId === 21) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "tx.commit-ok",
      channel,
      args: {}
    };
  }

  if (classId === 90 && methodId === 30) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "tx.rollback",
      channel,
      args: {}
    };
  }

  if (classId === 90 && methodId === 31) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "tx.rollback-ok",
      channel,
      args: {}
    };
  }

  if (classId === 85 && methodId === 10) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "confirm.select",
      channel,
      args: {
        ["nowait"]: decoder.decodeBit()
      }
    };
  }

  if (classId === 85 && methodId === 11) {
    const decoder = createDecoder(data);
    return {
      type: 1,
      name: "confirm.select-ok",
      channel,
      args: {}
    };
  }
}
