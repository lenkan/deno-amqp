import { createEncoder } from "./encoder.ts";

export type MethodArgs = {
  ["connection.start"]: {
    /** default: 0 */ ["version-major"]?: number;
    /** default: 9 */ ["version-minor"]?: number;
    /**  */ ["server-properties"]: Record<string, any>;
    /** default: "PLAIN" */ ["mechanisms"]?: string;
    /** default: "en_US" */ ["locales"]?: string;
  };
  ["connection.start-ok"]: {
    /**  */ ["client-properties"]: Record<string, any>;
    /** default: "PLAIN" */ ["mechanism"]?: string;
    /**  */ ["response"]: string;
    /** default: "en_US" */ ["locale"]?: string;
  };
  ["connection.secure"]: { /**  */ ["challenge"]: string };
  ["connection.secure-ok"]: { /**  */ ["response"]: string };
  ["connection.tune"]: {
    /** default: 0 */ ["channel-max"]?: number;
    /** default: 0 */ ["frame-max"]?: number;
    /** default: 0 */ ["heartbeat"]?: number;
  };
  ["connection.tune-ok"]: {
    /** default: 0 */ ["channel-max"]?: number;
    /** default: 0 */ ["frame-max"]?: number;
    /** default: 0 */ ["heartbeat"]?: number;
  };
  ["connection.open"]: {
    /** default: "/" */ ["virtual-host"]?: string;
    /** default: "" */ ["capabilities"]?: string;
    /** default: false */ ["insist"]?: boolean;
  };
  ["connection.open-ok"]: { /** default: "" */ ["known-hosts"]?: string };
  ["connection.close"]: {
    /**  */ ["reply-code"]: number;
    /** default: "" */ ["reply-text"]?: string;
    /**  */ ["class-id"]: number;
    /**  */ ["method-id"]: number;
  };
  ["connection.close-ok"]: {};
  ["connection.blocked"]: { /** default: "" */ ["reason"]?: string };
  ["connection.unblocked"]: {};
  ["connection.update-secret"]: {
    /**  */ ["new-secret"]: string;
    /**  */ ["reason"]: string;
  };
  ["connection.update-secret-ok"]: {};
  ["channel.open"]: { /** default: "" */ ["out-of-band"]?: string };
  ["channel.open-ok"]: { /** default: "" */ ["channel-id"]?: string };
  ["channel.flow"]: { /**  */ ["active"]: boolean };
  ["channel.flow-ok"]: { /**  */ ["active"]: boolean };
  ["channel.close"]: {
    /**  */ ["reply-code"]: number;
    /** default: "" */ ["reply-text"]?: string;
    /**  */ ["class-id"]: number;
    /**  */ ["method-id"]: number;
  };
  ["channel.close-ok"]: {};
  ["access.request"]: {
    /** default: "/data" */ ["realm"]?: string;
    /** default: false */ ["exclusive"]?: boolean;
    /** default: true */ ["passive"]?: boolean;
    /** default: true */ ["active"]?: boolean;
    /** default: true */ ["write"]?: boolean;
    /** default: true */ ["read"]?: boolean;
  };
  ["access.request-ok"]: { /** default: 1 */ ["ticket"]?: number };
  ["exchange.declare"]: {
    /** default: 0 */ ["ticket"]?: number;
    /**  */ ["exchange"]: string;
    /** default: "direct" */ ["type"]?: string;
    /** default: false */ ["passive"]?: boolean;
    /** default: false */ ["durable"]?: boolean;
    /** default: false */ ["auto-delete"]?: boolean;
    /** default: false */ ["internal"]?: boolean;
    /** default: false */ ["nowait"]?: boolean;
    /** default: {} */ ["arguments"]?: Record<string, any>;
  };
  ["exchange.declare-ok"]: {};
  ["exchange.delete"]: {
    /** default: 0 */ ["ticket"]?: number;
    /**  */ ["exchange"]: string;
    /** default: false */ ["if-unused"]?: boolean;
    /** default: false */ ["nowait"]?: boolean;
  };
  ["exchange.delete-ok"]: {};
  ["exchange.bind"]: {
    /** default: 0 */ ["ticket"]?: number;
    /**  */ ["destination"]: string;
    /**  */ ["source"]: string;
    /** default: "" */ ["routing-key"]?: string;
    /** default: false */ ["nowait"]?: boolean;
    /** default: {} */ ["arguments"]?: Record<string, any>;
  };
  ["exchange.bind-ok"]: {};
  ["exchange.unbind"]: {
    /** default: 0 */ ["ticket"]?: number;
    /**  */ ["destination"]: string;
    /**  */ ["source"]: string;
    /** default: "" */ ["routing-key"]?: string;
    /** default: false */ ["nowait"]?: boolean;
    /** default: {} */ ["arguments"]?: Record<string, any>;
  };
  ["exchange.unbind-ok"]: {};
  ["queue.declare"]: {
    /** default: 0 */ ["ticket"]?: number;
    /** default: "" */ ["queue"]?: string;
    /** default: false */ ["passive"]?: boolean;
    /** default: false */ ["durable"]?: boolean;
    /** default: false */ ["exclusive"]?: boolean;
    /** default: false */ ["auto-delete"]?: boolean;
    /** default: false */ ["nowait"]?: boolean;
    /** default: {} */ ["arguments"]?: Record<string, any>;
  };
  ["queue.declare-ok"]: {
    /**  */ ["queue"]: string;
    /**  */ ["message-count"]: number;
    /**  */ ["consumer-count"]: number;
  };
  ["queue.bind"]: {
    /** default: 0 */ ["ticket"]?: number;
    /** default: "" */ ["queue"]?: string;
    /**  */ ["exchange"]: string;
    /** default: "" */ ["routing-key"]?: string;
    /** default: false */ ["nowait"]?: boolean;
    /** default: {} */ ["arguments"]?: Record<string, any>;
  };
  ["queue.bind-ok"]: {};
  ["queue.purge"]: {
    /** default: 0 */ ["ticket"]?: number;
    /** default: "" */ ["queue"]?: string;
    /** default: false */ ["nowait"]?: boolean;
  };
  ["queue.purge-ok"]: { /**  */ ["message-count"]: number };
  ["queue.delete"]: {
    /** default: 0 */ ["ticket"]?: number;
    /** default: "" */ ["queue"]?: string;
    /** default: false */ ["if-unused"]?: boolean;
    /** default: false */ ["if-empty"]?: boolean;
    /** default: false */ ["nowait"]?: boolean;
  };
  ["queue.delete-ok"]: { /**  */ ["message-count"]: number };
  ["queue.unbind"]: {
    /** default: 0 */ ["ticket"]?: number;
    /** default: "" */ ["queue"]?: string;
    /**  */ ["exchange"]: string;
    /** default: "" */ ["routing-key"]?: string;
    /** default: {} */ ["arguments"]?: Record<string, any>;
  };
  ["queue.unbind-ok"]: {};
  ["basic.qos"]: {
    /** default: 0 */ ["prefetch-size"]?: number;
    /** default: 0 */ ["prefetch-count"]?: number;
    /** default: false */ ["global"]?: boolean;
  };
  ["basic.qos-ok"]: {};
  ["basic.consume"]: {
    /** default: 0 */ ["ticket"]?: number;
    /** default: "" */ ["queue"]?: string;
    /** default: "" */ ["consumer-tag"]?: string;
    /** default: false */ ["no-local"]?: boolean;
    /** default: false */ ["no-ack"]?: boolean;
    /** default: false */ ["exclusive"]?: boolean;
    /** default: false */ ["nowait"]?: boolean;
    /** default: {} */ ["arguments"]?: Record<string, any>;
  };
  ["basic.consume-ok"]: { /**  */ ["consumer-tag"]: string };
  ["basic.cancel"]: {
    /**  */ ["consumer-tag"]: string;
    /** default: false */ ["nowait"]?: boolean;
  };
  ["basic.cancel-ok"]: { /**  */ ["consumer-tag"]: string };
  ["basic.publish"]: {
    /** default: 0 */ ["ticket"]?: number;
    /** default: "" */ ["exchange"]?: string;
    /** default: "" */ ["routing-key"]?: string;
    /** default: false */ ["mandatory"]?: boolean;
    /** default: false */ ["immediate"]?: boolean;
  };
  ["basic.return"]: {
    /**  */ ["reply-code"]: number;
    /** default: "" */ ["reply-text"]?: string;
    /**  */ ["exchange"]: string;
    /**  */ ["routing-key"]: string;
  };
  ["basic.deliver"]: {
    /**  */ ["consumer-tag"]: string;
    /**  */ ["delivery-tag"]: Uint8Array;
    /** default: false */ ["redelivered"]?: boolean;
    /**  */ ["exchange"]: string;
    /**  */ ["routing-key"]: string;
  };
  ["basic.get"]: {
    /** default: 0 */ ["ticket"]?: number;
    /** default: "" */ ["queue"]?: string;
    /** default: false */ ["no-ack"]?: boolean;
  };
  ["basic.get-ok"]: {
    /**  */ ["delivery-tag"]: Uint8Array;
    /** default: false */ ["redelivered"]?: boolean;
    /**  */ ["exchange"]: string;
    /**  */ ["routing-key"]: string;
    /**  */ ["message-count"]: number;
  };
  ["basic.get-empty"]: { /** default: "" */ ["cluster-id"]?: string };
  ["basic.ack"]: {
    /** default: 0 */ ["delivery-tag"]?: Uint8Array;
    /** default: false */ ["multiple"]?: boolean;
  };
  ["basic.reject"]: {
    /**  */ ["delivery-tag"]: Uint8Array;
    /** default: true */ ["requeue"]?: boolean;
  };
  ["basic.recover-async"]: { /** default: false */ ["requeue"]?: boolean };
  ["basic.recover"]: { /** default: false */ ["requeue"]?: boolean };
  ["basic.recover-ok"]: {};
  ["basic.nack"]: {
    /** default: 0 */ ["delivery-tag"]?: Uint8Array;
    /** default: false */ ["multiple"]?: boolean;
    /** default: true */ ["requeue"]?: boolean;
  };
  ["tx.select"]: {};
  ["tx.select-ok"]: {};
  ["tx.commit"]: {};
  ["tx.commit-ok"]: {};
  ["tx.rollback"]: {};
  ["tx.rollback-ok"]: {};
  ["confirm.select"]: { /** default: false */ ["nowait"]?: boolean };
  ["confirm.select-ok"]: {};
};

export type MethodPayload =
  | { name: "connection.start"; args: MethodArgs["connection.start"] }
  | { name: "connection.start-ok"; args: MethodArgs["connection.start-ok"] }
  | { name: "connection.secure"; args: MethodArgs["connection.secure"] }
  | { name: "connection.secure-ok"; args: MethodArgs["connection.secure-ok"] }
  | { name: "connection.tune"; args: MethodArgs["connection.tune"] }
  | { name: "connection.tune-ok"; args: MethodArgs["connection.tune-ok"] }
  | { name: "connection.open"; args: MethodArgs["connection.open"] }
  | { name: "connection.open-ok"; args: MethodArgs["connection.open-ok"] }
  | { name: "connection.close"; args: MethodArgs["connection.close"] }
  | { name: "connection.close-ok"; args: MethodArgs["connection.close-ok"] }
  | { name: "connection.blocked"; args: MethodArgs["connection.blocked"] }
  | { name: "connection.unblocked"; args: MethodArgs["connection.unblocked"] }
  | {
      name: "connection.update-secret";
      args: MethodArgs["connection.update-secret"];
    }
  | {
      name: "connection.update-secret-ok";
      args: MethodArgs["connection.update-secret-ok"];
    }
  | { name: "channel.open"; args: MethodArgs["channel.open"] }
  | { name: "channel.open-ok"; args: MethodArgs["channel.open-ok"] }
  | { name: "channel.flow"; args: MethodArgs["channel.flow"] }
  | { name: "channel.flow-ok"; args: MethodArgs["channel.flow-ok"] }
  | { name: "channel.close"; args: MethodArgs["channel.close"] }
  | { name: "channel.close-ok"; args: MethodArgs["channel.close-ok"] }
  | { name: "access.request"; args: MethodArgs["access.request"] }
  | { name: "access.request-ok"; args: MethodArgs["access.request-ok"] }
  | { name: "exchange.declare"; args: MethodArgs["exchange.declare"] }
  | { name: "exchange.declare-ok"; args: MethodArgs["exchange.declare-ok"] }
  | { name: "exchange.delete"; args: MethodArgs["exchange.delete"] }
  | { name: "exchange.delete-ok"; args: MethodArgs["exchange.delete-ok"] }
  | { name: "exchange.bind"; args: MethodArgs["exchange.bind"] }
  | { name: "exchange.bind-ok"; args: MethodArgs["exchange.bind-ok"] }
  | { name: "exchange.unbind"; args: MethodArgs["exchange.unbind"] }
  | { name: "exchange.unbind-ok"; args: MethodArgs["exchange.unbind-ok"] }
  | { name: "queue.declare"; args: MethodArgs["queue.declare"] }
  | { name: "queue.declare-ok"; args: MethodArgs["queue.declare-ok"] }
  | { name: "queue.bind"; args: MethodArgs["queue.bind"] }
  | { name: "queue.bind-ok"; args: MethodArgs["queue.bind-ok"] }
  | { name: "queue.purge"; args: MethodArgs["queue.purge"] }
  | { name: "queue.purge-ok"; args: MethodArgs["queue.purge-ok"] }
  | { name: "queue.delete"; args: MethodArgs["queue.delete"] }
  | { name: "queue.delete-ok"; args: MethodArgs["queue.delete-ok"] }
  | { name: "queue.unbind"; args: MethodArgs["queue.unbind"] }
  | { name: "queue.unbind-ok"; args: MethodArgs["queue.unbind-ok"] }
  | { name: "basic.qos"; args: MethodArgs["basic.qos"] }
  | { name: "basic.qos-ok"; args: MethodArgs["basic.qos-ok"] }
  | { name: "basic.consume"; args: MethodArgs["basic.consume"] }
  | { name: "basic.consume-ok"; args: MethodArgs["basic.consume-ok"] }
  | { name: "basic.cancel"; args: MethodArgs["basic.cancel"] }
  | { name: "basic.cancel-ok"; args: MethodArgs["basic.cancel-ok"] }
  | { name: "basic.publish"; args: MethodArgs["basic.publish"] }
  | { name: "basic.return"; args: MethodArgs["basic.return"] }
  | { name: "basic.deliver"; args: MethodArgs["basic.deliver"] }
  | { name: "basic.get"; args: MethodArgs["basic.get"] }
  | { name: "basic.get-ok"; args: MethodArgs["basic.get-ok"] }
  | { name: "basic.get-empty"; args: MethodArgs["basic.get-empty"] }
  | { name: "basic.ack"; args: MethodArgs["basic.ack"] }
  | { name: "basic.reject"; args: MethodArgs["basic.reject"] }
  | { name: "basic.recover-async"; args: MethodArgs["basic.recover-async"] }
  | { name: "basic.recover"; args: MethodArgs["basic.recover"] }
  | { name: "basic.recover-ok"; args: MethodArgs["basic.recover-ok"] }
  | { name: "basic.nack"; args: MethodArgs["basic.nack"] }
  | { name: "tx.select"; args: MethodArgs["tx.select"] }
  | { name: "tx.select-ok"; args: MethodArgs["tx.select-ok"] }
  | { name: "tx.commit"; args: MethodArgs["tx.commit"] }
  | { name: "tx.commit-ok"; args: MethodArgs["tx.commit-ok"] }
  | { name: "tx.rollback"; args: MethodArgs["tx.rollback"] }
  | { name: "tx.rollback-ok"; args: MethodArgs["tx.rollback-ok"] }
  | { name: "confirm.select"; args: MethodArgs["confirm.select"] }
  | { name: "confirm.select-ok"; args: MethodArgs["confirm.select-ok"] };

export function encodeMethodPayload(payload: MethodPayload): Uint8Array {
  const { name, args } = payload;

  if (name === "connection.start") {
    const encoder = createEncoder();
    encoder.encodeShortUint(10);
    encoder.encodeShortUint(10);
    encoder.encodeOctet(
      args["version-major"] !== undefined ? args["version-major"] : 0
    );
    encoder.encodeOctet(
      args["version-minor"] !== undefined ? args["version-minor"] : 9
    );
    encoder.encodeTable(args["server-properties"]);
    encoder.encodeLongString(
      args["mechanisms"] !== undefined ? args["mechanisms"] : "PLAIN"
    );
    encoder.encodeLongString(
      args["locales"] !== undefined ? args["locales"] : "en_US"
    );
    return encoder.bytes();
  }

  if (name === "connection.start-ok") {
    const encoder = createEncoder();
    encoder.encodeShortUint(10);
    encoder.encodeShortUint(11);
    encoder.encodeTable(args["client-properties"]);
    encoder.encodeShortString(
      args["mechanism"] !== undefined ? args["mechanism"] : "PLAIN"
    );
    encoder.encodeLongString(args["response"]);
    encoder.encodeShortString(
      args["locale"] !== undefined ? args["locale"] : "en_US"
    );
    return encoder.bytes();
  }

  if (name === "connection.secure") {
    const encoder = createEncoder();
    encoder.encodeShortUint(10);
    encoder.encodeShortUint(20);
    encoder.encodeLongString(args["challenge"]);
    return encoder.bytes();
  }

  if (name === "connection.secure-ok") {
    const encoder = createEncoder();
    encoder.encodeShortUint(10);
    encoder.encodeShortUint(21);
    encoder.encodeLongString(args["response"]);
    return encoder.bytes();
  }

  if (name === "connection.tune") {
    const encoder = createEncoder();
    encoder.encodeShortUint(10);
    encoder.encodeShortUint(30);
    encoder.encodeShortUint(
      args["channel-max"] !== undefined ? args["channel-max"] : 0
    );
    encoder.encodeLongUint(
      args["frame-max"] !== undefined ? args["frame-max"] : 0
    );
    encoder.encodeShortUint(
      args["heartbeat"] !== undefined ? args["heartbeat"] : 0
    );
    return encoder.bytes();
  }

  if (name === "connection.tune-ok") {
    const encoder = createEncoder();
    encoder.encodeShortUint(10);
    encoder.encodeShortUint(31);
    encoder.encodeShortUint(
      args["channel-max"] !== undefined ? args["channel-max"] : 0
    );
    encoder.encodeLongUint(
      args["frame-max"] !== undefined ? args["frame-max"] : 0
    );
    encoder.encodeShortUint(
      args["heartbeat"] !== undefined ? args["heartbeat"] : 0
    );
    return encoder.bytes();
  }

  if (name === "connection.open") {
    const encoder = createEncoder();
    encoder.encodeShortUint(10);
    encoder.encodeShortUint(40);
    encoder.encodeShortString(
      args["virtual-host"] !== undefined ? args["virtual-host"] : "/"
    );
    encoder.encodeShortString(
      args["capabilities"] !== undefined ? args["capabilities"] : ""
    );
    encoder.encodeBit(args["insist"] !== undefined ? args["insist"] : false);
    return encoder.bytes();
  }

  if (name === "connection.open-ok") {
    const encoder = createEncoder();
    encoder.encodeShortUint(10);
    encoder.encodeShortUint(41);
    encoder.encodeShortString(
      args["known-hosts"] !== undefined ? args["known-hosts"] : ""
    );
    return encoder.bytes();
  }

  if (name === "connection.close") {
    const encoder = createEncoder();
    encoder.encodeShortUint(10);
    encoder.encodeShortUint(50);
    encoder.encodeShortUint(args["reply-code"]);
    encoder.encodeShortString(
      args["reply-text"] !== undefined ? args["reply-text"] : ""
    );
    encoder.encodeShortUint(args["class-id"]);
    encoder.encodeShortUint(args["method-id"]);
    return encoder.bytes();
  }

  if (name === "connection.close-ok") {
    const encoder = createEncoder();
    encoder.encodeShortUint(10);
    encoder.encodeShortUint(51);

    return encoder.bytes();
  }

  if (name === "connection.blocked") {
    const encoder = createEncoder();
    encoder.encodeShortUint(10);
    encoder.encodeShortUint(60);
    encoder.encodeShortString(
      args["reason"] !== undefined ? args["reason"] : ""
    );
    return encoder.bytes();
  }

  if (name === "connection.unblocked") {
    const encoder = createEncoder();
    encoder.encodeShortUint(10);
    encoder.encodeShortUint(61);

    return encoder.bytes();
  }

  if (name === "connection.update-secret") {
    const encoder = createEncoder();
    encoder.encodeShortUint(10);
    encoder.encodeShortUint(70);
    encoder.encodeLongString(args["new-secret"]);
    encoder.encodeShortString(args["reason"]);
    return encoder.bytes();
  }

  if (name === "connection.update-secret-ok") {
    const encoder = createEncoder();
    encoder.encodeShortUint(10);
    encoder.encodeShortUint(71);

    return encoder.bytes();
  }

  if (name === "channel.open") {
    const encoder = createEncoder();
    encoder.encodeShortUint(20);
    encoder.encodeShortUint(10);
    encoder.encodeShortString(
      args["out-of-band"] !== undefined ? args["out-of-band"] : ""
    );
    return encoder.bytes();
  }

  if (name === "channel.open-ok") {
    const encoder = createEncoder();
    encoder.encodeShortUint(20);
    encoder.encodeShortUint(11);
    encoder.encodeLongString(
      args["channel-id"] !== undefined ? args["channel-id"] : ""
    );
    return encoder.bytes();
  }

  if (name === "channel.flow") {
    const encoder = createEncoder();
    encoder.encodeShortUint(20);
    encoder.encodeShortUint(20);
    encoder.encodeBit(args["active"]);
    return encoder.bytes();
  }

  if (name === "channel.flow-ok") {
    const encoder = createEncoder();
    encoder.encodeShortUint(20);
    encoder.encodeShortUint(21);
    encoder.encodeBit(args["active"]);
    return encoder.bytes();
  }

  if (name === "channel.close") {
    const encoder = createEncoder();
    encoder.encodeShortUint(20);
    encoder.encodeShortUint(40);
    encoder.encodeShortUint(args["reply-code"]);
    encoder.encodeShortString(
      args["reply-text"] !== undefined ? args["reply-text"] : ""
    );
    encoder.encodeShortUint(args["class-id"]);
    encoder.encodeShortUint(args["method-id"]);
    return encoder.bytes();
  }

  if (name === "channel.close-ok") {
    const encoder = createEncoder();
    encoder.encodeShortUint(20);
    encoder.encodeShortUint(41);

    return encoder.bytes();
  }

  if (name === "access.request") {
    const encoder = createEncoder();
    encoder.encodeShortUint(30);
    encoder.encodeShortUint(10);
    encoder.encodeShortString(
      args["realm"] !== undefined ? args["realm"] : "/data"
    );
    encoder.encodeBit(
      args["exclusive"] !== undefined ? args["exclusive"] : false
    );
    encoder.encodeBit(args["passive"] !== undefined ? args["passive"] : true);
    encoder.encodeBit(args["active"] !== undefined ? args["active"] : true);
    encoder.encodeBit(args["write"] !== undefined ? args["write"] : true);
    encoder.encodeBit(args["read"] !== undefined ? args["read"] : true);
    return encoder.bytes();
  }

  if (name === "access.request-ok") {
    const encoder = createEncoder();
    encoder.encodeShortUint(30);
    encoder.encodeShortUint(11);
    encoder.encodeShortUint(args["ticket"] !== undefined ? args["ticket"] : 1);
    return encoder.bytes();
  }

  if (name === "exchange.declare") {
    const encoder = createEncoder();
    encoder.encodeShortUint(40);
    encoder.encodeShortUint(10);
    encoder.encodeShortUint(args["ticket"] !== undefined ? args["ticket"] : 0);
    encoder.encodeShortString(args["exchange"]);
    encoder.encodeShortString(
      args["type"] !== undefined ? args["type"] : "direct"
    );
    encoder.encodeBit(args["passive"] !== undefined ? args["passive"] : false);
    encoder.encodeBit(args["durable"] !== undefined ? args["durable"] : false);
    encoder.encodeBit(
      args["auto-delete"] !== undefined ? args["auto-delete"] : false
    );
    encoder.encodeBit(
      args["internal"] !== undefined ? args["internal"] : false
    );
    encoder.encodeBit(args["nowait"] !== undefined ? args["nowait"] : false);
    encoder.encodeTable(
      args["arguments"] !== undefined ? args["arguments"] : {}
    );
    return encoder.bytes();
  }

  if (name === "exchange.declare-ok") {
    const encoder = createEncoder();
    encoder.encodeShortUint(40);
    encoder.encodeShortUint(11);

    return encoder.bytes();
  }

  if (name === "exchange.delete") {
    const encoder = createEncoder();
    encoder.encodeShortUint(40);
    encoder.encodeShortUint(20);
    encoder.encodeShortUint(args["ticket"] !== undefined ? args["ticket"] : 0);
    encoder.encodeShortString(args["exchange"]);
    encoder.encodeBit(
      args["if-unused"] !== undefined ? args["if-unused"] : false
    );
    encoder.encodeBit(args["nowait"] !== undefined ? args["nowait"] : false);
    return encoder.bytes();
  }

  if (name === "exchange.delete-ok") {
    const encoder = createEncoder();
    encoder.encodeShortUint(40);
    encoder.encodeShortUint(21);

    return encoder.bytes();
  }

  if (name === "exchange.bind") {
    const encoder = createEncoder();
    encoder.encodeShortUint(40);
    encoder.encodeShortUint(30);
    encoder.encodeShortUint(args["ticket"] !== undefined ? args["ticket"] : 0);
    encoder.encodeShortString(args["destination"]);
    encoder.encodeShortString(args["source"]);
    encoder.encodeShortString(
      args["routing-key"] !== undefined ? args["routing-key"] : ""
    );
    encoder.encodeBit(args["nowait"] !== undefined ? args["nowait"] : false);
    encoder.encodeTable(
      args["arguments"] !== undefined ? args["arguments"] : {}
    );
    return encoder.bytes();
  }

  if (name === "exchange.bind-ok") {
    const encoder = createEncoder();
    encoder.encodeShortUint(40);
    encoder.encodeShortUint(31);

    return encoder.bytes();
  }

  if (name === "exchange.unbind") {
    const encoder = createEncoder();
    encoder.encodeShortUint(40);
    encoder.encodeShortUint(40);
    encoder.encodeShortUint(args["ticket"] !== undefined ? args["ticket"] : 0);
    encoder.encodeShortString(args["destination"]);
    encoder.encodeShortString(args["source"]);
    encoder.encodeShortString(
      args["routing-key"] !== undefined ? args["routing-key"] : ""
    );
    encoder.encodeBit(args["nowait"] !== undefined ? args["nowait"] : false);
    encoder.encodeTable(
      args["arguments"] !== undefined ? args["arguments"] : {}
    );
    return encoder.bytes();
  }

  if (name === "exchange.unbind-ok") {
    const encoder = createEncoder();
    encoder.encodeShortUint(40);
    encoder.encodeShortUint(51);

    return encoder.bytes();
  }

  if (name === "queue.declare") {
    const encoder = createEncoder();
    encoder.encodeShortUint(50);
    encoder.encodeShortUint(10);
    encoder.encodeShortUint(args["ticket"] !== undefined ? args["ticket"] : 0);
    encoder.encodeShortString(args["queue"] !== undefined ? args["queue"] : "");
    encoder.encodeBit(args["passive"] !== undefined ? args["passive"] : false);
    encoder.encodeBit(args["durable"] !== undefined ? args["durable"] : false);
    encoder.encodeBit(
      args["exclusive"] !== undefined ? args["exclusive"] : false
    );
    encoder.encodeBit(
      args["auto-delete"] !== undefined ? args["auto-delete"] : false
    );
    encoder.encodeBit(args["nowait"] !== undefined ? args["nowait"] : false);
    encoder.encodeTable(
      args["arguments"] !== undefined ? args["arguments"] : {}
    );
    return encoder.bytes();
  }

  if (name === "queue.declare-ok") {
    const encoder = createEncoder();
    encoder.encodeShortUint(50);
    encoder.encodeShortUint(11);
    encoder.encodeShortString(args["queue"]);
    encoder.encodeLongUint(args["message-count"]);
    encoder.encodeLongUint(args["consumer-count"]);
    return encoder.bytes();
  }

  if (name === "queue.bind") {
    const encoder = createEncoder();
    encoder.encodeShortUint(50);
    encoder.encodeShortUint(20);
    encoder.encodeShortUint(args["ticket"] !== undefined ? args["ticket"] : 0);
    encoder.encodeShortString(args["queue"] !== undefined ? args["queue"] : "");
    encoder.encodeShortString(args["exchange"]);
    encoder.encodeShortString(
      args["routing-key"] !== undefined ? args["routing-key"] : ""
    );
    encoder.encodeBit(args["nowait"] !== undefined ? args["nowait"] : false);
    encoder.encodeTable(
      args["arguments"] !== undefined ? args["arguments"] : {}
    );
    return encoder.bytes();
  }

  if (name === "queue.bind-ok") {
    const encoder = createEncoder();
    encoder.encodeShortUint(50);
    encoder.encodeShortUint(21);

    return encoder.bytes();
  }

  if (name === "queue.purge") {
    const encoder = createEncoder();
    encoder.encodeShortUint(50);
    encoder.encodeShortUint(30);
    encoder.encodeShortUint(args["ticket"] !== undefined ? args["ticket"] : 0);
    encoder.encodeShortString(args["queue"] !== undefined ? args["queue"] : "");
    encoder.encodeBit(args["nowait"] !== undefined ? args["nowait"] : false);
    return encoder.bytes();
  }

  if (name === "queue.purge-ok") {
    const encoder = createEncoder();
    encoder.encodeShortUint(50);
    encoder.encodeShortUint(31);
    encoder.encodeLongUint(args["message-count"]);
    return encoder.bytes();
  }

  if (name === "queue.delete") {
    const encoder = createEncoder();
    encoder.encodeShortUint(50);
    encoder.encodeShortUint(40);
    encoder.encodeShortUint(args["ticket"] !== undefined ? args["ticket"] : 0);
    encoder.encodeShortString(args["queue"] !== undefined ? args["queue"] : "");
    encoder.encodeBit(
      args["if-unused"] !== undefined ? args["if-unused"] : false
    );
    encoder.encodeBit(
      args["if-empty"] !== undefined ? args["if-empty"] : false
    );
    encoder.encodeBit(args["nowait"] !== undefined ? args["nowait"] : false);
    return encoder.bytes();
  }

  if (name === "queue.delete-ok") {
    const encoder = createEncoder();
    encoder.encodeShortUint(50);
    encoder.encodeShortUint(41);
    encoder.encodeLongUint(args["message-count"]);
    return encoder.bytes();
  }

  if (name === "queue.unbind") {
    const encoder = createEncoder();
    encoder.encodeShortUint(50);
    encoder.encodeShortUint(50);
    encoder.encodeShortUint(args["ticket"] !== undefined ? args["ticket"] : 0);
    encoder.encodeShortString(args["queue"] !== undefined ? args["queue"] : "");
    encoder.encodeShortString(args["exchange"]);
    encoder.encodeShortString(
      args["routing-key"] !== undefined ? args["routing-key"] : ""
    );
    encoder.encodeTable(
      args["arguments"] !== undefined ? args["arguments"] : {}
    );
    return encoder.bytes();
  }

  if (name === "queue.unbind-ok") {
    const encoder = createEncoder();
    encoder.encodeShortUint(50);
    encoder.encodeShortUint(51);

    return encoder.bytes();
  }

  if (name === "basic.qos") {
    const encoder = createEncoder();
    encoder.encodeShortUint(60);
    encoder.encodeShortUint(10);
    encoder.encodeLongUint(
      args["prefetch-size"] !== undefined ? args["prefetch-size"] : 0
    );
    encoder.encodeShortUint(
      args["prefetch-count"] !== undefined ? args["prefetch-count"] : 0
    );
    encoder.encodeBit(args["global"] !== undefined ? args["global"] : false);
    return encoder.bytes();
  }

  if (name === "basic.qos-ok") {
    const encoder = createEncoder();
    encoder.encodeShortUint(60);
    encoder.encodeShortUint(11);

    return encoder.bytes();
  }

  if (name === "basic.consume") {
    const encoder = createEncoder();
    encoder.encodeShortUint(60);
    encoder.encodeShortUint(20);
    encoder.encodeShortUint(args["ticket"] !== undefined ? args["ticket"] : 0);
    encoder.encodeShortString(args["queue"] !== undefined ? args["queue"] : "");
    encoder.encodeShortString(
      args["consumer-tag"] !== undefined ? args["consumer-tag"] : ""
    );
    encoder.encodeBit(
      args["no-local"] !== undefined ? args["no-local"] : false
    );
    encoder.encodeBit(args["no-ack"] !== undefined ? args["no-ack"] : false);
    encoder.encodeBit(
      args["exclusive"] !== undefined ? args["exclusive"] : false
    );
    encoder.encodeBit(args["nowait"] !== undefined ? args["nowait"] : false);
    encoder.encodeTable(
      args["arguments"] !== undefined ? args["arguments"] : {}
    );
    return encoder.bytes();
  }

  if (name === "basic.consume-ok") {
    const encoder = createEncoder();
    encoder.encodeShortUint(60);
    encoder.encodeShortUint(21);
    encoder.encodeShortString(args["consumer-tag"]);
    return encoder.bytes();
  }

  if (name === "basic.cancel") {
    const encoder = createEncoder();
    encoder.encodeShortUint(60);
    encoder.encodeShortUint(30);
    encoder.encodeShortString(args["consumer-tag"]);
    encoder.encodeBit(args["nowait"] !== undefined ? args["nowait"] : false);
    return encoder.bytes();
  }

  if (name === "basic.cancel-ok") {
    const encoder = createEncoder();
    encoder.encodeShortUint(60);
    encoder.encodeShortUint(31);
    encoder.encodeShortString(args["consumer-tag"]);
    return encoder.bytes();
  }

  if (name === "basic.publish") {
    const encoder = createEncoder();
    encoder.encodeShortUint(60);
    encoder.encodeShortUint(40);
    encoder.encodeShortUint(args["ticket"] !== undefined ? args["ticket"] : 0);
    encoder.encodeShortString(
      args["exchange"] !== undefined ? args["exchange"] : ""
    );
    encoder.encodeShortString(
      args["routing-key"] !== undefined ? args["routing-key"] : ""
    );
    encoder.encodeBit(
      args["mandatory"] !== undefined ? args["mandatory"] : false
    );
    encoder.encodeBit(
      args["immediate"] !== undefined ? args["immediate"] : false
    );
    return encoder.bytes();
  }

  if (name === "basic.return") {
    const encoder = createEncoder();
    encoder.encodeShortUint(60);
    encoder.encodeShortUint(50);
    encoder.encodeShortUint(args["reply-code"]);
    encoder.encodeShortString(
      args["reply-text"] !== undefined ? args["reply-text"] : ""
    );
    encoder.encodeShortString(args["exchange"]);
    encoder.encodeShortString(args["routing-key"]);
    return encoder.bytes();
  }

  if (name === "basic.deliver") {
    const encoder = createEncoder();
    encoder.encodeShortUint(60);
    encoder.encodeShortUint(60);
    encoder.encodeShortString(args["consumer-tag"]);
    encoder.encodeLongLongUint(args["delivery-tag"]);
    encoder.encodeBit(
      args["redelivered"] !== undefined ? args["redelivered"] : false
    );
    encoder.encodeShortString(args["exchange"]);
    encoder.encodeShortString(args["routing-key"]);
    return encoder.bytes();
  }

  if (name === "basic.get") {
    const encoder = createEncoder();
    encoder.encodeShortUint(60);
    encoder.encodeShortUint(70);
    encoder.encodeShortUint(args["ticket"] !== undefined ? args["ticket"] : 0);
    encoder.encodeShortString(args["queue"] !== undefined ? args["queue"] : "");
    encoder.encodeBit(args["no-ack"] !== undefined ? args["no-ack"] : false);
    return encoder.bytes();
  }

  if (name === "basic.get-ok") {
    const encoder = createEncoder();
    encoder.encodeShortUint(60);
    encoder.encodeShortUint(71);
    encoder.encodeLongLongUint(args["delivery-tag"]);
    encoder.encodeBit(
      args["redelivered"] !== undefined ? args["redelivered"] : false
    );
    encoder.encodeShortString(args["exchange"]);
    encoder.encodeShortString(args["routing-key"]);
    encoder.encodeLongUint(args["message-count"]);
    return encoder.bytes();
  }

  if (name === "basic.get-empty") {
    const encoder = createEncoder();
    encoder.encodeShortUint(60);
    encoder.encodeShortUint(72);
    encoder.encodeShortString(
      args["cluster-id"] !== undefined ? args["cluster-id"] : ""
    );
    return encoder.bytes();
  }

  if (name === "basic.ack") {
    const encoder = createEncoder();
    encoder.encodeShortUint(60);
    encoder.encodeShortUint(80);
    encoder.encodeLongLongUint(
      args["delivery-tag"] !== undefined ? args["delivery-tag"] : 0
    );
    encoder.encodeBit(
      args["multiple"] !== undefined ? args["multiple"] : false
    );
    return encoder.bytes();
  }

  if (name === "basic.reject") {
    const encoder = createEncoder();
    encoder.encodeShortUint(60);
    encoder.encodeShortUint(90);
    encoder.encodeLongLongUint(args["delivery-tag"]);
    encoder.encodeBit(args["requeue"] !== undefined ? args["requeue"] : true);
    return encoder.bytes();
  }

  if (name === "basic.recover-async") {
    const encoder = createEncoder();
    encoder.encodeShortUint(60);
    encoder.encodeShortUint(100);
    encoder.encodeBit(args["requeue"] !== undefined ? args["requeue"] : false);
    return encoder.bytes();
  }

  if (name === "basic.recover") {
    const encoder = createEncoder();
    encoder.encodeShortUint(60);
    encoder.encodeShortUint(110);
    encoder.encodeBit(args["requeue"] !== undefined ? args["requeue"] : false);
    return encoder.bytes();
  }

  if (name === "basic.recover-ok") {
    const encoder = createEncoder();
    encoder.encodeShortUint(60);
    encoder.encodeShortUint(111);

    return encoder.bytes();
  }

  if (name === "basic.nack") {
    const encoder = createEncoder();
    encoder.encodeShortUint(60);
    encoder.encodeShortUint(120);
    encoder.encodeLongLongUint(
      args["delivery-tag"] !== undefined ? args["delivery-tag"] : 0
    );
    encoder.encodeBit(
      args["multiple"] !== undefined ? args["multiple"] : false
    );
    encoder.encodeBit(args["requeue"] !== undefined ? args["requeue"] : true);
    return encoder.bytes();
  }

  if (name === "tx.select") {
    const encoder = createEncoder();
    encoder.encodeShortUint(90);
    encoder.encodeShortUint(10);

    return encoder.bytes();
  }

  if (name === "tx.select-ok") {
    const encoder = createEncoder();
    encoder.encodeShortUint(90);
    encoder.encodeShortUint(11);

    return encoder.bytes();
  }

  if (name === "tx.commit") {
    const encoder = createEncoder();
    encoder.encodeShortUint(90);
    encoder.encodeShortUint(20);

    return encoder.bytes();
  }

  if (name === "tx.commit-ok") {
    const encoder = createEncoder();
    encoder.encodeShortUint(90);
    encoder.encodeShortUint(21);

    return encoder.bytes();
  }

  if (name === "tx.rollback") {
    const encoder = createEncoder();
    encoder.encodeShortUint(90);
    encoder.encodeShortUint(30);

    return encoder.bytes();
  }

  if (name === "tx.rollback-ok") {
    const encoder = createEncoder();
    encoder.encodeShortUint(90);
    encoder.encodeShortUint(31);

    return encoder.bytes();
  }

  if (name === "confirm.select") {
    const encoder = createEncoder();
    encoder.encodeShortUint(85);
    encoder.encodeShortUint(10);
    encoder.encodeBit(args["nowait"] !== undefined ? args["nowait"] : false);
    return encoder.bytes();
  }

  if (name === "confirm.select-ok") {
    const encoder = createEncoder();
    encoder.encodeShortUint(85);
    encoder.encodeShortUint(11);

    return encoder.bytes();
  }
} 
