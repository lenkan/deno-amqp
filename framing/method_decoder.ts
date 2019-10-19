import { createDecoder } from "./decoder.ts";

export type MethodArgs = {
  ["connection.start"]: {
    ["version-major"]: number;
    ["version-minor"]: number;
    ["server-properties"]: Record<string, any>;
    ["mechanisms"]: string;
    ["locales"]: string;
  };
  ["connection.start-ok"]: {
    ["client-properties"]: Record<string, any>;
    ["mechanism"]: string;
    ["response"]: string;
    ["locale"]: string;
  };
  ["connection.secure"]: { ["challenge"]: string };
  ["connection.secure-ok"]: { ["response"]: string };
  ["connection.tune"]: {
    ["channel-max"]: number;
    ["frame-max"]: number;
    ["heartbeat"]: number;
  };
  ["connection.tune-ok"]: {
    ["channel-max"]: number;
    ["frame-max"]: number;
    ["heartbeat"]: number;
  };
  ["connection.open"]: {
    ["virtual-host"]: string;
    ["capabilities"]: string;
    ["insist"]: boolean;
  };
  ["connection.open-ok"]: { ["known-hosts"]: string };
  ["connection.close"]: {
    ["reply-code"]: number;
    ["reply-text"]: string;
    ["class-id"]: number;
    ["method-id"]: number;
  };
  ["connection.close-ok"]: {};
  ["connection.blocked"]: { ["reason"]: string };
  ["connection.unblocked"]: {};
  ["connection.update-secret"]: { ["new-secret"]: string; ["reason"]: string };
  ["connection.update-secret-ok"]: {};
  ["channel.open"]: { ["out-of-band"]: string };
  ["channel.open-ok"]: { ["channel-id"]: string };
  ["channel.flow"]: { ["active"]: boolean };
  ["channel.flow-ok"]: { ["active"]: boolean };
  ["channel.close"]: {
    ["reply-code"]: number;
    ["reply-text"]: string;
    ["class-id"]: number;
    ["method-id"]: number;
  };
  ["channel.close-ok"]: {};
  ["access.request"]: {
    ["realm"]: string;
    ["exclusive"]: boolean;
    ["passive"]: boolean;
    ["active"]: boolean;
    ["write"]: boolean;
    ["read"]: boolean;
  };
  ["access.request-ok"]: { ["ticket"]: number };
  ["exchange.declare"]: {
    ["ticket"]: number;
    ["exchange"]: string;
    ["type"]: string;
    ["passive"]: boolean;
    ["durable"]: boolean;
    ["auto-delete"]: boolean;
    ["internal"]: boolean;
    ["nowait"]: boolean;
    ["arguments"]: Record<string, any>;
  };
  ["exchange.declare-ok"]: {};
  ["exchange.delete"]: {
    ["ticket"]: number;
    ["exchange"]: string;
    ["if-unused"]: boolean;
    ["nowait"]: boolean;
  };
  ["exchange.delete-ok"]: {};
  ["exchange.bind"]: {
    ["ticket"]: number;
    ["destination"]: string;
    ["source"]: string;
    ["routing-key"]: string;
    ["nowait"]: boolean;
    ["arguments"]: Record<string, any>;
  };
  ["exchange.bind-ok"]: {};
  ["exchange.unbind"]: {
    ["ticket"]: number;
    ["destination"]: string;
    ["source"]: string;
    ["routing-key"]: string;
    ["nowait"]: boolean;
    ["arguments"]: Record<string, any>;
  };
  ["exchange.unbind-ok"]: {};
  ["queue.declare"]: {
    ["ticket"]: number;
    ["queue"]: string;
    ["passive"]: boolean;
    ["durable"]: boolean;
    ["exclusive"]: boolean;
    ["auto-delete"]: boolean;
    ["nowait"]: boolean;
    ["arguments"]: Record<string, any>;
  };
  ["queue.declare-ok"]: {
    ["queue"]: string;
    ["message-count"]: number;
    ["consumer-count"]: number;
  };
  ["queue.bind"]: {
    ["ticket"]: number;
    ["queue"]: string;
    ["exchange"]: string;
    ["routing-key"]: string;
    ["nowait"]: boolean;
    ["arguments"]: Record<string, any>;
  };
  ["queue.bind-ok"]: {};
  ["queue.purge"]: {
    ["ticket"]: number;
    ["queue"]: string;
    ["nowait"]: boolean;
  };
  ["queue.purge-ok"]: { ["message-count"]: number };
  ["queue.delete"]: {
    ["ticket"]: number;
    ["queue"]: string;
    ["if-unused"]: boolean;
    ["if-empty"]: boolean;
    ["nowait"]: boolean;
  };
  ["queue.delete-ok"]: { ["message-count"]: number };
  ["queue.unbind"]: {
    ["ticket"]: number;
    ["queue"]: string;
    ["exchange"]: string;
    ["routing-key"]: string;
    ["arguments"]: Record<string, any>;
  };
  ["queue.unbind-ok"]: {};
  ["basic.qos"]: {
    ["prefetch-size"]: number;
    ["prefetch-count"]: number;
    ["global"]: boolean;
  };
  ["basic.qos-ok"]: {};
  ["basic.consume"]: {
    ["ticket"]: number;
    ["queue"]: string;
    ["consumer-tag"]: string;
    ["no-local"]: boolean;
    ["no-ack"]: boolean;
    ["exclusive"]: boolean;
    ["nowait"]: boolean;
    ["arguments"]: Record<string, any>;
  };
  ["basic.consume-ok"]: { ["consumer-tag"]: string };
  ["basic.cancel"]: { ["consumer-tag"]: string; ["nowait"]: boolean };
  ["basic.cancel-ok"]: { ["consumer-tag"]: string };
  ["basic.publish"]: {
    ["ticket"]: number;
    ["exchange"]: string;
    ["routing-key"]: string;
    ["mandatory"]: boolean;
    ["immediate"]: boolean;
  };
  ["basic.return"]: {
    ["reply-code"]: number;
    ["reply-text"]: string;
    ["exchange"]: string;
    ["routing-key"]: string;
  };
  ["basic.deliver"]: {
    ["consumer-tag"]: string;
    ["delivery-tag"]: Uint8Array;
    ["redelivered"]: boolean;
    ["exchange"]: string;
    ["routing-key"]: string;
  };
  ["basic.get"]: { ["ticket"]: number; ["queue"]: string; ["no-ack"]: boolean };
  ["basic.get-ok"]: {
    ["delivery-tag"]: Uint8Array;
    ["redelivered"]: boolean;
    ["exchange"]: string;
    ["routing-key"]: string;
    ["message-count"]: number;
  };
  ["basic.get-empty"]: { ["cluster-id"]: string };
  ["basic.ack"]: { ["delivery-tag"]: Uint8Array; ["multiple"]: boolean };
  ["basic.reject"]: { ["delivery-tag"]: Uint8Array; ["requeue"]: boolean };
  ["basic.recover-async"]: { ["requeue"]: boolean };
  ["basic.recover"]: { ["requeue"]: boolean };
  ["basic.recover-ok"]: {};
  ["basic.nack"]: {
    ["delivery-tag"]: Uint8Array;
    ["multiple"]: boolean;
    ["requeue"]: boolean;
  };
  ["tx.select"]: {};
  ["tx.select-ok"]: {};
  ["tx.commit"]: {};
  ["tx.commit-ok"]: {};
  ["tx.rollback"]: {};
  ["tx.rollback-ok"]: {};
  ["confirm.select"]: { ["nowait"]: boolean };
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

export function decodeMethodPayload(
  classId: number,
  methodId: number,
  data: Uint8Array
): MethodPayload {
  if (classId === 10 && methodId === 10) {
    const decoder = createDecoder(data);
    return {
      name: "connection.start",
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
      name: "connection.start-ok",
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
      name: "connection.secure",
      args: {
        ["challenge"]: decoder.decodeLongString()
      }
    };
  }

  if (classId === 10 && methodId === 21) {
    const decoder = createDecoder(data);
    return {
      name: "connection.secure-ok",
      args: {
        ["response"]: decoder.decodeLongString()
      }
    };
  }

  if (classId === 10 && methodId === 30) {
    const decoder = createDecoder(data);
    return {
      name: "connection.tune",
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
      name: "connection.tune-ok",
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
      name: "connection.open",
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
      name: "connection.open-ok",
      args: {
        ["known-hosts"]: decoder.decodeShortString()
      }
    };
  }

  if (classId === 10 && methodId === 50) {
    const decoder = createDecoder(data);
    return {
      name: "connection.close",
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
      name: "connection.close-ok",
      args: {}
    };
  }

  if (classId === 10 && methodId === 60) {
    const decoder = createDecoder(data);
    return {
      name: "connection.blocked",
      args: {
        ["reason"]: decoder.decodeShortString()
      }
    };
  }

  if (classId === 10 && methodId === 61) {
    const decoder = createDecoder(data);
    return {
      name: "connection.unblocked",
      args: {}
    };
  }

  if (classId === 10 && methodId === 70) {
    const decoder = createDecoder(data);
    return {
      name: "connection.update-secret",
      args: {
        ["new-secret"]: decoder.decodeLongString(),
        ["reason"]: decoder.decodeShortString()
      }
    };
  }

  if (classId === 10 && methodId === 71) {
    const decoder = createDecoder(data);
    return {
      name: "connection.update-secret-ok",
      args: {}
    };
  }

  if (classId === 20 && methodId === 10) {
    const decoder = createDecoder(data);
    return {
      name: "channel.open",
      args: {
        ["out-of-band"]: decoder.decodeShortString()
      }
    };
  }

  if (classId === 20 && methodId === 11) {
    const decoder = createDecoder(data);
    return {
      name: "channel.open-ok",
      args: {
        ["channel-id"]: decoder.decodeLongString()
      }
    };
  }

  if (classId === 20 && methodId === 20) {
    const decoder = createDecoder(data);
    return {
      name: "channel.flow",
      args: {
        ["active"]: decoder.decodeBit()
      }
    };
  }

  if (classId === 20 && methodId === 21) {
    const decoder = createDecoder(data);
    return {
      name: "channel.flow-ok",
      args: {
        ["active"]: decoder.decodeBit()
      }
    };
  }

  if (classId === 20 && methodId === 40) {
    const decoder = createDecoder(data);
    return {
      name: "channel.close",
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
      name: "channel.close-ok",
      args: {}
    };
  }

  if (classId === 30 && methodId === 10) {
    const decoder = createDecoder(data);
    return {
      name: "access.request",
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
      name: "access.request-ok",
      args: {
        ["ticket"]: decoder.decodeShortUint()
      }
    };
  }

  if (classId === 40 && methodId === 10) {
    const decoder = createDecoder(data);
    return {
      name: "exchange.declare",
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
      name: "exchange.declare-ok",
      args: {}
    };
  }

  if (classId === 40 && methodId === 20) {
    const decoder = createDecoder(data);
    return {
      name: "exchange.delete",
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
      name: "exchange.delete-ok",
      args: {}
    };
  }

  if (classId === 40 && methodId === 30) {
    const decoder = createDecoder(data);
    return {
      name: "exchange.bind",
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
      name: "exchange.bind-ok",
      args: {}
    };
  }

  if (classId === 40 && methodId === 40) {
    const decoder = createDecoder(data);
    return {
      name: "exchange.unbind",
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
      name: "exchange.unbind-ok",
      args: {}
    };
  }

  if (classId === 50 && methodId === 10) {
    const decoder = createDecoder(data);
    return {
      name: "queue.declare",
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
      name: "queue.declare-ok",
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
      name: "queue.bind",
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
      name: "queue.bind-ok",
      args: {}
    };
  }

  if (classId === 50 && methodId === 30) {
    const decoder = createDecoder(data);
    return {
      name: "queue.purge",
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
      name: "queue.purge-ok",
      args: {
        ["message-count"]: decoder.decodeLongUint()
      }
    };
  }

  if (classId === 50 && methodId === 40) {
    const decoder = createDecoder(data);
    return {
      name: "queue.delete",
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
      name: "queue.delete-ok",
      args: {
        ["message-count"]: decoder.decodeLongUint()
      }
    };
  }

  if (classId === 50 && methodId === 50) {
    const decoder = createDecoder(data);
    return {
      name: "queue.unbind",
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
      name: "queue.unbind-ok",
      args: {}
    };
  }

  if (classId === 60 && methodId === 10) {
    const decoder = createDecoder(data);
    return {
      name: "basic.qos",
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
      name: "basic.qos-ok",
      args: {}
    };
  }

  if (classId === 60 && methodId === 20) {
    const decoder = createDecoder(data);
    return {
      name: "basic.consume",
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
      name: "basic.consume-ok",
      args: {
        ["consumer-tag"]: decoder.decodeShortString()
      }
    };
  }

  if (classId === 60 && methodId === 30) {
    const decoder = createDecoder(data);
    return {
      name: "basic.cancel",
      args: {
        ["consumer-tag"]: decoder.decodeShortString(),
        ["nowait"]: decoder.decodeBit()
      }
    };
  }

  if (classId === 60 && methodId === 31) {
    const decoder = createDecoder(data);
    return {
      name: "basic.cancel-ok",
      args: {
        ["consumer-tag"]: decoder.decodeShortString()
      }
    };
  }

  if (classId === 60 && methodId === 40) {
    const decoder = createDecoder(data);
    return {
      name: "basic.publish",
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
      name: "basic.return",
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
      name: "basic.deliver",
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
      name: "basic.get",
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
      name: "basic.get-ok",
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
      name: "basic.get-empty",
      args: {
        ["cluster-id"]: decoder.decodeShortString()
      }
    };
  }

  if (classId === 60 && methodId === 80) {
    const decoder = createDecoder(data);
    return {
      name: "basic.ack",
      args: {
        ["delivery-tag"]: decoder.decodeLongLongUint(),
        ["multiple"]: decoder.decodeBit()
      }
    };
  }

  if (classId === 60 && methodId === 90) {
    const decoder = createDecoder(data);
    return {
      name: "basic.reject",
      args: {
        ["delivery-tag"]: decoder.decodeLongLongUint(),
        ["requeue"]: decoder.decodeBit()
      }
    };
  }

  if (classId === 60 && methodId === 100) {
    const decoder = createDecoder(data);
    return {
      name: "basic.recover-async",
      args: {
        ["requeue"]: decoder.decodeBit()
      }
    };
  }

  if (classId === 60 && methodId === 110) {
    const decoder = createDecoder(data);
    return {
      name: "basic.recover",
      args: {
        ["requeue"]: decoder.decodeBit()
      }
    };
  }

  if (classId === 60 && methodId === 111) {
    const decoder = createDecoder(data);
    return {
      name: "basic.recover-ok",
      args: {}
    };
  }

  if (classId === 60 && methodId === 120) {
    const decoder = createDecoder(data);
    return {
      name: "basic.nack",
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
      name: "tx.select",
      args: {}
    };
  }

  if (classId === 90 && methodId === 11) {
    const decoder = createDecoder(data);
    return {
      name: "tx.select-ok",
      args: {}
    };
  }

  if (classId === 90 && methodId === 20) {
    const decoder = createDecoder(data);
    return {
      name: "tx.commit",
      args: {}
    };
  }

  if (classId === 90 && methodId === 21) {
    const decoder = createDecoder(data);
    return {
      name: "tx.commit-ok",
      args: {}
    };
  }

  if (classId === 90 && methodId === 30) {
    const decoder = createDecoder(data);
    return {
      name: "tx.rollback",
      args: {}
    };
  }

  if (classId === 90 && methodId === 31) {
    const decoder = createDecoder(data);
    return {
      name: "tx.rollback-ok",
      args: {}
    };
  }

  if (classId === 85 && methodId === 10) {
    const decoder = createDecoder(data);
    return {
      name: "confirm.select",
      args: {
        ["nowait"]: decoder.decodeBit()
      }
    };
  }

  if (classId === 85 && methodId === 11) {
    const decoder = createDecoder(data);
    return {
      name: "confirm.select-ok",
      args: {}
    };
  }
}
