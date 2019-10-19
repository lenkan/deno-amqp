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
  | {
      className: "connection";
      methodName: "start";
      classId: 10;
      methodId: 10;
      name: "connection.start";
      args: MethodArgs["connection.start"];
    }
  | {
      className: "connection";
      methodName: "start-ok";
      classId: 10;
      methodId: 11;
      name: "connection.start-ok";
      args: MethodArgs["connection.start-ok"];
    }
  | {
      className: "connection";
      methodName: "secure";
      classId: 10;
      methodId: 20;
      name: "connection.secure";
      args: MethodArgs["connection.secure"];
    }
  | {
      className: "connection";
      methodName: "secure-ok";
      classId: 10;
      methodId: 21;
      name: "connection.secure-ok";
      args: MethodArgs["connection.secure-ok"];
    }
  | {
      className: "connection";
      methodName: "tune";
      classId: 10;
      methodId: 30;
      name: "connection.tune";
      args: MethodArgs["connection.tune"];
    }
  | {
      className: "connection";
      methodName: "tune-ok";
      classId: 10;
      methodId: 31;
      name: "connection.tune-ok";
      args: MethodArgs["connection.tune-ok"];
    }
  | {
      className: "connection";
      methodName: "open";
      classId: 10;
      methodId: 40;
      name: "connection.open";
      args: MethodArgs["connection.open"];
    }
  | {
      className: "connection";
      methodName: "open-ok";
      classId: 10;
      methodId: 41;
      name: "connection.open-ok";
      args: MethodArgs["connection.open-ok"];
    }
  | {
      className: "connection";
      methodName: "close";
      classId: 10;
      methodId: 50;
      name: "connection.close";
      args: MethodArgs["connection.close"];
    }
  | {
      className: "connection";
      methodName: "close-ok";
      classId: 10;
      methodId: 51;
      name: "connection.close-ok";
      args: MethodArgs["connection.close-ok"];
    }
  | {
      className: "connection";
      methodName: "blocked";
      classId: 10;
      methodId: 60;
      name: "connection.blocked";
      args: MethodArgs["connection.blocked"];
    }
  | {
      className: "connection";
      methodName: "unblocked";
      classId: 10;
      methodId: 61;
      name: "connection.unblocked";
      args: MethodArgs["connection.unblocked"];
    }
  | {
      className: "connection";
      methodName: "update-secret";
      classId: 10;
      methodId: 70;
      name: "connection.update-secret";
      args: MethodArgs["connection.update-secret"];
    }
  | {
      className: "connection";
      methodName: "update-secret-ok";
      classId: 10;
      methodId: 71;
      name: "connection.update-secret-ok";
      args: MethodArgs["connection.update-secret-ok"];
    }
  | {
      className: "channel";
      methodName: "open";
      classId: 20;
      methodId: 10;
      name: "channel.open";
      args: MethodArgs["channel.open"];
    }
  | {
      className: "channel";
      methodName: "open-ok";
      classId: 20;
      methodId: 11;
      name: "channel.open-ok";
      args: MethodArgs["channel.open-ok"];
    }
  | {
      className: "channel";
      methodName: "flow";
      classId: 20;
      methodId: 20;
      name: "channel.flow";
      args: MethodArgs["channel.flow"];
    }
  | {
      className: "channel";
      methodName: "flow-ok";
      classId: 20;
      methodId: 21;
      name: "channel.flow-ok";
      args: MethodArgs["channel.flow-ok"];
    }
  | {
      className: "channel";
      methodName: "close";
      classId: 20;
      methodId: 40;
      name: "channel.close";
      args: MethodArgs["channel.close"];
    }
  | {
      className: "channel";
      methodName: "close-ok";
      classId: 20;
      methodId: 41;
      name: "channel.close-ok";
      args: MethodArgs["channel.close-ok"];
    }
  | {
      className: "access";
      methodName: "request";
      classId: 30;
      methodId: 10;
      name: "access.request";
      args: MethodArgs["access.request"];
    }
  | {
      className: "access";
      methodName: "request-ok";
      classId: 30;
      methodId: 11;
      name: "access.request-ok";
      args: MethodArgs["access.request-ok"];
    }
  | {
      className: "exchange";
      methodName: "declare";
      classId: 40;
      methodId: 10;
      name: "exchange.declare";
      args: MethodArgs["exchange.declare"];
    }
  | {
      className: "exchange";
      methodName: "declare-ok";
      classId: 40;
      methodId: 11;
      name: "exchange.declare-ok";
      args: MethodArgs["exchange.declare-ok"];
    }
  | {
      className: "exchange";
      methodName: "delete";
      classId: 40;
      methodId: 20;
      name: "exchange.delete";
      args: MethodArgs["exchange.delete"];
    }
  | {
      className: "exchange";
      methodName: "delete-ok";
      classId: 40;
      methodId: 21;
      name: "exchange.delete-ok";
      args: MethodArgs["exchange.delete-ok"];
    }
  | {
      className: "exchange";
      methodName: "bind";
      classId: 40;
      methodId: 30;
      name: "exchange.bind";
      args: MethodArgs["exchange.bind"];
    }
  | {
      className: "exchange";
      methodName: "bind-ok";
      classId: 40;
      methodId: 31;
      name: "exchange.bind-ok";
      args: MethodArgs["exchange.bind-ok"];
    }
  | {
      className: "exchange";
      methodName: "unbind";
      classId: 40;
      methodId: 40;
      name: "exchange.unbind";
      args: MethodArgs["exchange.unbind"];
    }
  | {
      className: "exchange";
      methodName: "unbind-ok";
      classId: 40;
      methodId: 51;
      name: "exchange.unbind-ok";
      args: MethodArgs["exchange.unbind-ok"];
    }
  | {
      className: "queue";
      methodName: "declare";
      classId: 50;
      methodId: 10;
      name: "queue.declare";
      args: MethodArgs["queue.declare"];
    }
  | {
      className: "queue";
      methodName: "declare-ok";
      classId: 50;
      methodId: 11;
      name: "queue.declare-ok";
      args: MethodArgs["queue.declare-ok"];
    }
  | {
      className: "queue";
      methodName: "bind";
      classId: 50;
      methodId: 20;
      name: "queue.bind";
      args: MethodArgs["queue.bind"];
    }
  | {
      className: "queue";
      methodName: "bind-ok";
      classId: 50;
      methodId: 21;
      name: "queue.bind-ok";
      args: MethodArgs["queue.bind-ok"];
    }
  | {
      className: "queue";
      methodName: "purge";
      classId: 50;
      methodId: 30;
      name: "queue.purge";
      args: MethodArgs["queue.purge"];
    }
  | {
      className: "queue";
      methodName: "purge-ok";
      classId: 50;
      methodId: 31;
      name: "queue.purge-ok";
      args: MethodArgs["queue.purge-ok"];
    }
  | {
      className: "queue";
      methodName: "delete";
      classId: 50;
      methodId: 40;
      name: "queue.delete";
      args: MethodArgs["queue.delete"];
    }
  | {
      className: "queue";
      methodName: "delete-ok";
      classId: 50;
      methodId: 41;
      name: "queue.delete-ok";
      args: MethodArgs["queue.delete-ok"];
    }
  | {
      className: "queue";
      methodName: "unbind";
      classId: 50;
      methodId: 50;
      name: "queue.unbind";
      args: MethodArgs["queue.unbind"];
    }
  | {
      className: "queue";
      methodName: "unbind-ok";
      classId: 50;
      methodId: 51;
      name: "queue.unbind-ok";
      args: MethodArgs["queue.unbind-ok"];
    }
  | {
      className: "basic";
      methodName: "qos";
      classId: 60;
      methodId: 10;
      name: "basic.qos";
      args: MethodArgs["basic.qos"];
    }
  | {
      className: "basic";
      methodName: "qos-ok";
      classId: 60;
      methodId: 11;
      name: "basic.qos-ok";
      args: MethodArgs["basic.qos-ok"];
    }
  | {
      className: "basic";
      methodName: "consume";
      classId: 60;
      methodId: 20;
      name: "basic.consume";
      args: MethodArgs["basic.consume"];
    }
  | {
      className: "basic";
      methodName: "consume-ok";
      classId: 60;
      methodId: 21;
      name: "basic.consume-ok";
      args: MethodArgs["basic.consume-ok"];
    }
  | {
      className: "basic";
      methodName: "cancel";
      classId: 60;
      methodId: 30;
      name: "basic.cancel";
      args: MethodArgs["basic.cancel"];
    }
  | {
      className: "basic";
      methodName: "cancel-ok";
      classId: 60;
      methodId: 31;
      name: "basic.cancel-ok";
      args: MethodArgs["basic.cancel-ok"];
    }
  | {
      className: "basic";
      methodName: "publish";
      classId: 60;
      methodId: 40;
      name: "basic.publish";
      args: MethodArgs["basic.publish"];
    }
  | {
      className: "basic";
      methodName: "return";
      classId: 60;
      methodId: 50;
      name: "basic.return";
      args: MethodArgs["basic.return"];
    }
  | {
      className: "basic";
      methodName: "deliver";
      classId: 60;
      methodId: 60;
      name: "basic.deliver";
      args: MethodArgs["basic.deliver"];
    }
  | {
      className: "basic";
      methodName: "get";
      classId: 60;
      methodId: 70;
      name: "basic.get";
      args: MethodArgs["basic.get"];
    }
  | {
      className: "basic";
      methodName: "get-ok";
      classId: 60;
      methodId: 71;
      name: "basic.get-ok";
      args: MethodArgs["basic.get-ok"];
    }
  | {
      className: "basic";
      methodName: "get-empty";
      classId: 60;
      methodId: 72;
      name: "basic.get-empty";
      args: MethodArgs["basic.get-empty"];
    }
  | {
      className: "basic";
      methodName: "ack";
      classId: 60;
      methodId: 80;
      name: "basic.ack";
      args: MethodArgs["basic.ack"];
    }
  | {
      className: "basic";
      methodName: "reject";
      classId: 60;
      methodId: 90;
      name: "basic.reject";
      args: MethodArgs["basic.reject"];
    }
  | {
      className: "basic";
      methodName: "recover-async";
      classId: 60;
      methodId: 100;
      name: "basic.recover-async";
      args: MethodArgs["basic.recover-async"];
    }
  | {
      className: "basic";
      methodName: "recover";
      classId: 60;
      methodId: 110;
      name: "basic.recover";
      args: MethodArgs["basic.recover"];
    }
  | {
      className: "basic";
      methodName: "recover-ok";
      classId: 60;
      methodId: 111;
      name: "basic.recover-ok";
      args: MethodArgs["basic.recover-ok"];
    }
  | {
      className: "basic";
      methodName: "nack";
      classId: 60;
      methodId: 120;
      name: "basic.nack";
      args: MethodArgs["basic.nack"];
    }
  | {
      className: "tx";
      methodName: "select";
      classId: 90;
      methodId: 10;
      name: "tx.select";
      args: MethodArgs["tx.select"];
    }
  | {
      className: "tx";
      methodName: "select-ok";
      classId: 90;
      methodId: 11;
      name: "tx.select-ok";
      args: MethodArgs["tx.select-ok"];
    }
  | {
      className: "tx";
      methodName: "commit";
      classId: 90;
      methodId: 20;
      name: "tx.commit";
      args: MethodArgs["tx.commit"];
    }
  | {
      className: "tx";
      methodName: "commit-ok";
      classId: 90;
      methodId: 21;
      name: "tx.commit-ok";
      args: MethodArgs["tx.commit-ok"];
    }
  | {
      className: "tx";
      methodName: "rollback";
      classId: 90;
      methodId: 30;
      name: "tx.rollback";
      args: MethodArgs["tx.rollback"];
    }
  | {
      className: "tx";
      methodName: "rollback-ok";
      classId: 90;
      methodId: 31;
      name: "tx.rollback-ok";
      args: MethodArgs["tx.rollback-ok"];
    }
  | {
      className: "confirm";
      methodName: "select";
      classId: 85;
      methodId: 10;
      name: "confirm.select";
      args: MethodArgs["confirm.select"];
    }
  | {
      className: "confirm";
      methodName: "select-ok";
      classId: 85;
      methodId: 11;
      name: "confirm.select-ok";
      args: MethodArgs["confirm.select-ok"];
    };

export function decodeMethodPayload(
  classId: number,
  methodId: number,
  data: Uint8Array
): MethodPayload {
  if (classId === 10 && methodId === 10) {
    const decoder = createDecoder(data);
    return {
      className: "connection",
      methodName: "start",
      methodId: 10,
      classId: 10,
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
      className: "connection",
      methodName: "start-ok",
      methodId: 11,
      classId: 10,
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
      className: "connection",
      methodName: "secure",
      methodId: 20,
      classId: 10,
      name: "connection.secure",
      args: {
        ["challenge"]: decoder.decodeLongString()
      }
    };
  }

  if (classId === 10 && methodId === 21) {
    const decoder = createDecoder(data);
    return {
      className: "connection",
      methodName: "secure-ok",
      methodId: 21,
      classId: 10,
      name: "connection.secure-ok",
      args: {
        ["response"]: decoder.decodeLongString()
      }
    };
  }

  if (classId === 10 && methodId === 30) {
    const decoder = createDecoder(data);
    return {
      className: "connection",
      methodName: "tune",
      methodId: 30,
      classId: 10,
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
      className: "connection",
      methodName: "tune-ok",
      methodId: 31,
      classId: 10,
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
      className: "connection",
      methodName: "open",
      methodId: 40,
      classId: 10,
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
      className: "connection",
      methodName: "open-ok",
      methodId: 41,
      classId: 10,
      name: "connection.open-ok",
      args: {
        ["known-hosts"]: decoder.decodeShortString()
      }
    };
  }

  if (classId === 10 && methodId === 50) {
    const decoder = createDecoder(data);
    return {
      className: "connection",
      methodName: "close",
      methodId: 50,
      classId: 10,
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
      className: "connection",
      methodName: "close-ok",
      methodId: 51,
      classId: 10,
      name: "connection.close-ok",
      args: {}
    };
  }

  if (classId === 10 && methodId === 60) {
    const decoder = createDecoder(data);
    return {
      className: "connection",
      methodName: "blocked",
      methodId: 60,
      classId: 10,
      name: "connection.blocked",
      args: {
        ["reason"]: decoder.decodeShortString()
      }
    };
  }

  if (classId === 10 && methodId === 61) {
    const decoder = createDecoder(data);
    return {
      className: "connection",
      methodName: "unblocked",
      methodId: 61,
      classId: 10,
      name: "connection.unblocked",
      args: {}
    };
  }

  if (classId === 10 && methodId === 70) {
    const decoder = createDecoder(data);
    return {
      className: "connection",
      methodName: "update-secret",
      methodId: 70,
      classId: 10,
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
      className: "connection",
      methodName: "update-secret-ok",
      methodId: 71,
      classId: 10,
      name: "connection.update-secret-ok",
      args: {}
    };
  }

  if (classId === 20 && methodId === 10) {
    const decoder = createDecoder(data);
    return {
      className: "channel",
      methodName: "open",
      methodId: 10,
      classId: 20,
      name: "channel.open",
      args: {
        ["out-of-band"]: decoder.decodeShortString()
      }
    };
  }

  if (classId === 20 && methodId === 11) {
    const decoder = createDecoder(data);
    return {
      className: "channel",
      methodName: "open-ok",
      methodId: 11,
      classId: 20,
      name: "channel.open-ok",
      args: {
        ["channel-id"]: decoder.decodeLongString()
      }
    };
  }

  if (classId === 20 && methodId === 20) {
    const decoder = createDecoder(data);
    return {
      className: "channel",
      methodName: "flow",
      methodId: 20,
      classId: 20,
      name: "channel.flow",
      args: {
        ["active"]: decoder.decodeBit()
      }
    };
  }

  if (classId === 20 && methodId === 21) {
    const decoder = createDecoder(data);
    return {
      className: "channel",
      methodName: "flow-ok",
      methodId: 21,
      classId: 20,
      name: "channel.flow-ok",
      args: {
        ["active"]: decoder.decodeBit()
      }
    };
  }

  if (classId === 20 && methodId === 40) {
    const decoder = createDecoder(data);
    return {
      className: "channel",
      methodName: "close",
      methodId: 40,
      classId: 20,
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
      className: "channel",
      methodName: "close-ok",
      methodId: 41,
      classId: 20,
      name: "channel.close-ok",
      args: {}
    };
  }

  if (classId === 30 && methodId === 10) {
    const decoder = createDecoder(data);
    return {
      className: "access",
      methodName: "request",
      methodId: 10,
      classId: 30,
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
      className: "access",
      methodName: "request-ok",
      methodId: 11,
      classId: 30,
      name: "access.request-ok",
      args: {
        ["ticket"]: decoder.decodeShortUint()
      }
    };
  }

  if (classId === 40 && methodId === 10) {
    const decoder = createDecoder(data);
    return {
      className: "exchange",
      methodName: "declare",
      methodId: 10,
      classId: 40,
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
      className: "exchange",
      methodName: "declare-ok",
      methodId: 11,
      classId: 40,
      name: "exchange.declare-ok",
      args: {}
    };
  }

  if (classId === 40 && methodId === 20) {
    const decoder = createDecoder(data);
    return {
      className: "exchange",
      methodName: "delete",
      methodId: 20,
      classId: 40,
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
      className: "exchange",
      methodName: "delete-ok",
      methodId: 21,
      classId: 40,
      name: "exchange.delete-ok",
      args: {}
    };
  }

  if (classId === 40 && methodId === 30) {
    const decoder = createDecoder(data);
    return {
      className: "exchange",
      methodName: "bind",
      methodId: 30,
      classId: 40,
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
      className: "exchange",
      methodName: "bind-ok",
      methodId: 31,
      classId: 40,
      name: "exchange.bind-ok",
      args: {}
    };
  }

  if (classId === 40 && methodId === 40) {
    const decoder = createDecoder(data);
    return {
      className: "exchange",
      methodName: "unbind",
      methodId: 40,
      classId: 40,
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
      className: "exchange",
      methodName: "unbind-ok",
      methodId: 51,
      classId: 40,
      name: "exchange.unbind-ok",
      args: {}
    };
  }

  if (classId === 50 && methodId === 10) {
    const decoder = createDecoder(data);
    return {
      className: "queue",
      methodName: "declare",
      methodId: 10,
      classId: 50,
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
      className: "queue",
      methodName: "declare-ok",
      methodId: 11,
      classId: 50,
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
      className: "queue",
      methodName: "bind",
      methodId: 20,
      classId: 50,
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
      className: "queue",
      methodName: "bind-ok",
      methodId: 21,
      classId: 50,
      name: "queue.bind-ok",
      args: {}
    };
  }

  if (classId === 50 && methodId === 30) {
    const decoder = createDecoder(data);
    return {
      className: "queue",
      methodName: "purge",
      methodId: 30,
      classId: 50,
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
      className: "queue",
      methodName: "purge-ok",
      methodId: 31,
      classId: 50,
      name: "queue.purge-ok",
      args: {
        ["message-count"]: decoder.decodeLongUint()
      }
    };
  }

  if (classId === 50 && methodId === 40) {
    const decoder = createDecoder(data);
    return {
      className: "queue",
      methodName: "delete",
      methodId: 40,
      classId: 50,
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
      className: "queue",
      methodName: "delete-ok",
      methodId: 41,
      classId: 50,
      name: "queue.delete-ok",
      args: {
        ["message-count"]: decoder.decodeLongUint()
      }
    };
  }

  if (classId === 50 && methodId === 50) {
    const decoder = createDecoder(data);
    return {
      className: "queue",
      methodName: "unbind",
      methodId: 50,
      classId: 50,
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
      className: "queue",
      methodName: "unbind-ok",
      methodId: 51,
      classId: 50,
      name: "queue.unbind-ok",
      args: {}
    };
  }

  if (classId === 60 && methodId === 10) {
    const decoder = createDecoder(data);
    return {
      className: "basic",
      methodName: "qos",
      methodId: 10,
      classId: 60,
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
      className: "basic",
      methodName: "qos-ok",
      methodId: 11,
      classId: 60,
      name: "basic.qos-ok",
      args: {}
    };
  }

  if (classId === 60 && methodId === 20) {
    const decoder = createDecoder(data);
    return {
      className: "basic",
      methodName: "consume",
      methodId: 20,
      classId: 60,
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
      className: "basic",
      methodName: "consume-ok",
      methodId: 21,
      classId: 60,
      name: "basic.consume-ok",
      args: {
        ["consumer-tag"]: decoder.decodeShortString()
      }
    };
  }

  if (classId === 60 && methodId === 30) {
    const decoder = createDecoder(data);
    return {
      className: "basic",
      methodName: "cancel",
      methodId: 30,
      classId: 60,
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
      className: "basic",
      methodName: "cancel-ok",
      methodId: 31,
      classId: 60,
      name: "basic.cancel-ok",
      args: {
        ["consumer-tag"]: decoder.decodeShortString()
      }
    };
  }

  if (classId === 60 && methodId === 40) {
    const decoder = createDecoder(data);
    return {
      className: "basic",
      methodName: "publish",
      methodId: 40,
      classId: 60,
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
      className: "basic",
      methodName: "return",
      methodId: 50,
      classId: 60,
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
      className: "basic",
      methodName: "deliver",
      methodId: 60,
      classId: 60,
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
      className: "basic",
      methodName: "get",
      methodId: 70,
      classId: 60,
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
      className: "basic",
      methodName: "get-ok",
      methodId: 71,
      classId: 60,
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
      className: "basic",
      methodName: "get-empty",
      methodId: 72,
      classId: 60,
      name: "basic.get-empty",
      args: {
        ["cluster-id"]: decoder.decodeShortString()
      }
    };
  }

  if (classId === 60 && methodId === 80) {
    const decoder = createDecoder(data);
    return {
      className: "basic",
      methodName: "ack",
      methodId: 80,
      classId: 60,
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
      className: "basic",
      methodName: "reject",
      methodId: 90,
      classId: 60,
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
      className: "basic",
      methodName: "recover-async",
      methodId: 100,
      classId: 60,
      name: "basic.recover-async",
      args: {
        ["requeue"]: decoder.decodeBit()
      }
    };
  }

  if (classId === 60 && methodId === 110) {
    const decoder = createDecoder(data);
    return {
      className: "basic",
      methodName: "recover",
      methodId: 110,
      classId: 60,
      name: "basic.recover",
      args: {
        ["requeue"]: decoder.decodeBit()
      }
    };
  }

  if (classId === 60 && methodId === 111) {
    const decoder = createDecoder(data);
    return {
      className: "basic",
      methodName: "recover-ok",
      methodId: 111,
      classId: 60,
      name: "basic.recover-ok",
      args: {}
    };
  }

  if (classId === 60 && methodId === 120) {
    const decoder = createDecoder(data);
    return {
      className: "basic",
      methodName: "nack",
      methodId: 120,
      classId: 60,
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
      className: "tx",
      methodName: "select",
      methodId: 10,
      classId: 90,
      name: "tx.select",
      args: {}
    };
  }

  if (classId === 90 && methodId === 11) {
    const decoder = createDecoder(data);
    return {
      className: "tx",
      methodName: "select-ok",
      methodId: 11,
      classId: 90,
      name: "tx.select-ok",
      args: {}
    };
  }

  if (classId === 90 && methodId === 20) {
    const decoder = createDecoder(data);
    return {
      className: "tx",
      methodName: "commit",
      methodId: 20,
      classId: 90,
      name: "tx.commit",
      args: {}
    };
  }

  if (classId === 90 && methodId === 21) {
    const decoder = createDecoder(data);
    return {
      className: "tx",
      methodName: "commit-ok",
      methodId: 21,
      classId: 90,
      name: "tx.commit-ok",
      args: {}
    };
  }

  if (classId === 90 && methodId === 30) {
    const decoder = createDecoder(data);
    return {
      className: "tx",
      methodName: "rollback",
      methodId: 30,
      classId: 90,
      name: "tx.rollback",
      args: {}
    };
  }

  if (classId === 90 && methodId === 31) {
    const decoder = createDecoder(data);
    return {
      className: "tx",
      methodName: "rollback-ok",
      methodId: 31,
      classId: 90,
      name: "tx.rollback-ok",
      args: {}
    };
  }

  if (classId === 85 && methodId === 10) {
    const decoder = createDecoder(data);
    return {
      className: "confirm",
      methodName: "select",
      methodId: 10,
      classId: 85,
      name: "confirm.select",
      args: {
        ["nowait"]: decoder.decodeBit()
      }
    };
  }

  if (classId === 85 && methodId === 11) {
    const decoder = createDecoder(data);
    return {
      className: "confirm",
      methodName: "select-ok",
      methodId: 11,
      classId: 85,
      name: "confirm.select-ok",
      args: {}
    };
  }

  throw new Error(
    "No match for class: " + classId + " and method: " + methodId
  );
}
