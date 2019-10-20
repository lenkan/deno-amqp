import { createDecoder } from "./decoder.ts";

export interface ConnectionStartArgs {
  versionMajor: number;
  versionMinor: number;
  serverProperties: Record<string, any>;
  mechanisms: string;
  locales: string;
}
export interface ConnectionStartOkArgs {
  clientProperties: Record<string, any>;
  mechanism: string;
  response: string;
  locale: string;
}
export interface ConnectionSecureArgs {
  challenge: string;
}
export interface ConnectionSecureOkArgs {
  response: string;
}
export interface ConnectionTuneArgs {
  channelMax: number;
  frameMax: number;
  heartbeat: number;
}
export interface ConnectionTuneOkArgs {
  channelMax: number;
  frameMax: number;
  heartbeat: number;
}
export interface ConnectionOpenArgs {
  virtualHost: string;
  capabilities: string;
  insist: boolean;
}
export interface ConnectionOpenOkArgs {
  knownHosts: string;
}
export interface ConnectionCloseArgs {
  replyCode: number;
  replyText: string;
  classId: number;
  methodId: number;
}
export interface ConnectionCloseOkArgs {}
export interface ConnectionBlockedArgs {
  reason: string;
}
export interface ConnectionUnblockedArgs {}
export interface ConnectionUpdateSecretArgs {
  newSecret: string;
  reason: string;
}
export interface ConnectionUpdateSecretOkArgs {}
export interface ChannelOpenArgs {
  outOfBand: string;
}
export interface ChannelOpenOkArgs {
  channelId: string;
}
export interface ChannelFlowArgs {
  active: boolean;
}
export interface ChannelFlowOkArgs {
  active: boolean;
}
export interface ChannelCloseArgs {
  replyCode: number;
  replyText: string;
  classId: number;
  methodId: number;
}
export interface ChannelCloseOkArgs {}
export interface AccessRequestArgs {
  realm: string;
  exclusive: boolean;
  passive: boolean;
  active: boolean;
  write: boolean;
  read: boolean;
}
export interface AccessRequestOkArgs {
  ticket: number;
}
export interface ExchangeDeclareArgs {
  ticket: number;
  exchange: string;
  type: string;
  passive: boolean;
  durable: boolean;
  autoDelete: boolean;
  internal: boolean;
  nowait: boolean;
  arguments: Record<string, any>;
}
export interface ExchangeDeclareOkArgs {}
export interface ExchangeDeleteArgs {
  ticket: number;
  exchange: string;
  ifUnused: boolean;
  nowait: boolean;
}
export interface ExchangeDeleteOkArgs {}
export interface ExchangeBindArgs {
  ticket: number;
  destination: string;
  source: string;
  routingKey: string;
  nowait: boolean;
  arguments: Record<string, any>;
}
export interface ExchangeBindOkArgs {}
export interface ExchangeUnbindArgs {
  ticket: number;
  destination: string;
  source: string;
  routingKey: string;
  nowait: boolean;
  arguments: Record<string, any>;
}
export interface ExchangeUnbindOkArgs {}
export interface QueueDeclareArgs {
  ticket: number;
  queue: string;
  passive: boolean;
  durable: boolean;
  exclusive: boolean;
  autoDelete: boolean;
  nowait: boolean;
  arguments: Record<string, any>;
}
export interface QueueDeclareOkArgs {
  queue: string;
  messageCount: number;
  consumerCount: number;
}
export interface QueueBindArgs {
  ticket: number;
  queue: string;
  exchange: string;
  routingKey: string;
  nowait: boolean;
  arguments: Record<string, any>;
}
export interface QueueBindOkArgs {}
export interface QueuePurgeArgs {
  ticket: number;
  queue: string;
  nowait: boolean;
}
export interface QueuePurgeOkArgs {
  messageCount: number;
}
export interface QueueDeleteArgs {
  ticket: number;
  queue: string;
  ifUnused: boolean;
  ifEmpty: boolean;
  nowait: boolean;
}
export interface QueueDeleteOkArgs {
  messageCount: number;
}
export interface QueueUnbindArgs {
  ticket: number;
  queue: string;
  exchange: string;
  routingKey: string;
  arguments: Record<string, any>;
}
export interface QueueUnbindOkArgs {}
export interface BasicQosArgs {
  prefetchSize: number;
  prefetchCount: number;
  global: boolean;
}
export interface BasicQosOkArgs {}
export interface BasicConsumeArgs {
  ticket: number;
  queue: string;
  consumerTag: string;
  noLocal: boolean;
  noAck: boolean;
  exclusive: boolean;
  nowait: boolean;
  arguments: Record<string, any>;
}
export interface BasicConsumeOkArgs {
  consumerTag: string;
}
export interface BasicCancelArgs {
  consumerTag: string;
  nowait: boolean;
}
export interface BasicCancelOkArgs {
  consumerTag: string;
}
export interface BasicPublishArgs {
  ticket: number;
  exchange: string;
  routingKey: string;
  mandatory: boolean;
  immediate: boolean;
}
export interface BasicReturnArgs {
  replyCode: number;
  replyText: string;
  exchange: string;
  routingKey: string;
}
export interface BasicDeliverArgs {
  consumerTag: string;
  deliveryTag: Uint8Array;
  redelivered: boolean;
  exchange: string;
  routingKey: string;
}
export interface BasicGetArgs {
  ticket: number;
  queue: string;
  noAck: boolean;
}
export interface BasicGetOkArgs {
  deliveryTag: Uint8Array;
  redelivered: boolean;
  exchange: string;
  routingKey: string;
  messageCount: number;
}
export interface BasicGetEmptyArgs {
  clusterId: string;
}
export interface BasicAckArgs {
  deliveryTag: Uint8Array;
  multiple: boolean;
}
export interface BasicRejectArgs {
  deliveryTag: Uint8Array;
  requeue: boolean;
}
export interface BasicRecoverAsyncArgs {
  requeue: boolean;
}
export interface BasicRecoverArgs {
  requeue: boolean;
}
export interface BasicRecoverOkArgs {}
export interface BasicNackArgs {
  deliveryTag: Uint8Array;
  multiple: boolean;
  requeue: boolean;
}
export interface TxSelectArgs {}
export interface TxSelectOkArgs {}
export interface TxCommitArgs {}
export interface TxCommitOkArgs {}
export interface TxRollbackArgs {}
export interface TxRollbackOkArgs {}
export interface ConfirmSelectArgs {
  nowait: boolean;
}
export interface ConfirmSelectOkArgs {}

export type MethodPayload =
  | {
      className: "connection";
      methodName: "start";
      classId: 10;
      methodId: 10;
      name: "connection.start";
      args: ConnectionStartArgs;
    }
  | {
      className: "connection";
      methodName: "start-ok";
      classId: 10;
      methodId: 11;
      name: "connection.start-ok";
      args: ConnectionStartOkArgs;
    }
  | {
      className: "connection";
      methodName: "secure";
      classId: 10;
      methodId: 20;
      name: "connection.secure";
      args: ConnectionSecureArgs;
    }
  | {
      className: "connection";
      methodName: "secure-ok";
      classId: 10;
      methodId: 21;
      name: "connection.secure-ok";
      args: ConnectionSecureOkArgs;
    }
  | {
      className: "connection";
      methodName: "tune";
      classId: 10;
      methodId: 30;
      name: "connection.tune";
      args: ConnectionTuneArgs;
    }
  | {
      className: "connection";
      methodName: "tune-ok";
      classId: 10;
      methodId: 31;
      name: "connection.tune-ok";
      args: ConnectionTuneOkArgs;
    }
  | {
      className: "connection";
      methodName: "open";
      classId: 10;
      methodId: 40;
      name: "connection.open";
      args: ConnectionOpenArgs;
    }
  | {
      className: "connection";
      methodName: "open-ok";
      classId: 10;
      methodId: 41;
      name: "connection.open-ok";
      args: ConnectionOpenOkArgs;
    }
  | {
      className: "connection";
      methodName: "close";
      classId: 10;
      methodId: 50;
      name: "connection.close";
      args: ConnectionCloseArgs;
    }
  | {
      className: "connection";
      methodName: "close-ok";
      classId: 10;
      methodId: 51;
      name: "connection.close-ok";
      args: ConnectionCloseOkArgs;
    }
  | {
      className: "connection";
      methodName: "blocked";
      classId: 10;
      methodId: 60;
      name: "connection.blocked";
      args: ConnectionBlockedArgs;
    }
  | {
      className: "connection";
      methodName: "unblocked";
      classId: 10;
      methodId: 61;
      name: "connection.unblocked";
      args: ConnectionUnblockedArgs;
    }
  | {
      className: "connection";
      methodName: "update-secret";
      classId: 10;
      methodId: 70;
      name: "connection.update-secret";
      args: ConnectionUpdateSecretArgs;
    }
  | {
      className: "connection";
      methodName: "update-secret-ok";
      classId: 10;
      methodId: 71;
      name: "connection.update-secret-ok";
      args: ConnectionUpdateSecretOkArgs;
    }
  | {
      className: "channel";
      methodName: "open";
      classId: 20;
      methodId: 10;
      name: "channel.open";
      args: ChannelOpenArgs;
    }
  | {
      className: "channel";
      methodName: "open-ok";
      classId: 20;
      methodId: 11;
      name: "channel.open-ok";
      args: ChannelOpenOkArgs;
    }
  | {
      className: "channel";
      methodName: "flow";
      classId: 20;
      methodId: 20;
      name: "channel.flow";
      args: ChannelFlowArgs;
    }
  | {
      className: "channel";
      methodName: "flow-ok";
      classId: 20;
      methodId: 21;
      name: "channel.flow-ok";
      args: ChannelFlowOkArgs;
    }
  | {
      className: "channel";
      methodName: "close";
      classId: 20;
      methodId: 40;
      name: "channel.close";
      args: ChannelCloseArgs;
    }
  | {
      className: "channel";
      methodName: "close-ok";
      classId: 20;
      methodId: 41;
      name: "channel.close-ok";
      args: ChannelCloseOkArgs;
    }
  | {
      className: "access";
      methodName: "request";
      classId: 30;
      methodId: 10;
      name: "access.request";
      args: AccessRequestArgs;
    }
  | {
      className: "access";
      methodName: "request-ok";
      classId: 30;
      methodId: 11;
      name: "access.request-ok";
      args: AccessRequestOkArgs;
    }
  | {
      className: "exchange";
      methodName: "declare";
      classId: 40;
      methodId: 10;
      name: "exchange.declare";
      args: ExchangeDeclareArgs;
    }
  | {
      className: "exchange";
      methodName: "declare-ok";
      classId: 40;
      methodId: 11;
      name: "exchange.declare-ok";
      args: ExchangeDeclareOkArgs;
    }
  | {
      className: "exchange";
      methodName: "delete";
      classId: 40;
      methodId: 20;
      name: "exchange.delete";
      args: ExchangeDeleteArgs;
    }
  | {
      className: "exchange";
      methodName: "delete-ok";
      classId: 40;
      methodId: 21;
      name: "exchange.delete-ok";
      args: ExchangeDeleteOkArgs;
    }
  | {
      className: "exchange";
      methodName: "bind";
      classId: 40;
      methodId: 30;
      name: "exchange.bind";
      args: ExchangeBindArgs;
    }
  | {
      className: "exchange";
      methodName: "bind-ok";
      classId: 40;
      methodId: 31;
      name: "exchange.bind-ok";
      args: ExchangeBindOkArgs;
    }
  | {
      className: "exchange";
      methodName: "unbind";
      classId: 40;
      methodId: 40;
      name: "exchange.unbind";
      args: ExchangeUnbindArgs;
    }
  | {
      className: "exchange";
      methodName: "unbind-ok";
      classId: 40;
      methodId: 51;
      name: "exchange.unbind-ok";
      args: ExchangeUnbindOkArgs;
    }
  | {
      className: "queue";
      methodName: "declare";
      classId: 50;
      methodId: 10;
      name: "queue.declare";
      args: QueueDeclareArgs;
    }
  | {
      className: "queue";
      methodName: "declare-ok";
      classId: 50;
      methodId: 11;
      name: "queue.declare-ok";
      args: QueueDeclareOkArgs;
    }
  | {
      className: "queue";
      methodName: "bind";
      classId: 50;
      methodId: 20;
      name: "queue.bind";
      args: QueueBindArgs;
    }
  | {
      className: "queue";
      methodName: "bind-ok";
      classId: 50;
      methodId: 21;
      name: "queue.bind-ok";
      args: QueueBindOkArgs;
    }
  | {
      className: "queue";
      methodName: "purge";
      classId: 50;
      methodId: 30;
      name: "queue.purge";
      args: QueuePurgeArgs;
    }
  | {
      className: "queue";
      methodName: "purge-ok";
      classId: 50;
      methodId: 31;
      name: "queue.purge-ok";
      args: QueuePurgeOkArgs;
    }
  | {
      className: "queue";
      methodName: "delete";
      classId: 50;
      methodId: 40;
      name: "queue.delete";
      args: QueueDeleteArgs;
    }
  | {
      className: "queue";
      methodName: "delete-ok";
      classId: 50;
      methodId: 41;
      name: "queue.delete-ok";
      args: QueueDeleteOkArgs;
    }
  | {
      className: "queue";
      methodName: "unbind";
      classId: 50;
      methodId: 50;
      name: "queue.unbind";
      args: QueueUnbindArgs;
    }
  | {
      className: "queue";
      methodName: "unbind-ok";
      classId: 50;
      methodId: 51;
      name: "queue.unbind-ok";
      args: QueueUnbindOkArgs;
    }
  | {
      className: "basic";
      methodName: "qos";
      classId: 60;
      methodId: 10;
      name: "basic.qos";
      args: BasicQosArgs;
    }
  | {
      className: "basic";
      methodName: "qos-ok";
      classId: 60;
      methodId: 11;
      name: "basic.qos-ok";
      args: BasicQosOkArgs;
    }
  | {
      className: "basic";
      methodName: "consume";
      classId: 60;
      methodId: 20;
      name: "basic.consume";
      args: BasicConsumeArgs;
    }
  | {
      className: "basic";
      methodName: "consume-ok";
      classId: 60;
      methodId: 21;
      name: "basic.consume-ok";
      args: BasicConsumeOkArgs;
    }
  | {
      className: "basic";
      methodName: "cancel";
      classId: 60;
      methodId: 30;
      name: "basic.cancel";
      args: BasicCancelArgs;
    }
  | {
      className: "basic";
      methodName: "cancel-ok";
      classId: 60;
      methodId: 31;
      name: "basic.cancel-ok";
      args: BasicCancelOkArgs;
    }
  | {
      className: "basic";
      methodName: "publish";
      classId: 60;
      methodId: 40;
      name: "basic.publish";
      args: BasicPublishArgs;
    }
  | {
      className: "basic";
      methodName: "return";
      classId: 60;
      methodId: 50;
      name: "basic.return";
      args: BasicReturnArgs;
    }
  | {
      className: "basic";
      methodName: "deliver";
      classId: 60;
      methodId: 60;
      name: "basic.deliver";
      args: BasicDeliverArgs;
    }
  | {
      className: "basic";
      methodName: "get";
      classId: 60;
      methodId: 70;
      name: "basic.get";
      args: BasicGetArgs;
    }
  | {
      className: "basic";
      methodName: "get-ok";
      classId: 60;
      methodId: 71;
      name: "basic.get-ok";
      args: BasicGetOkArgs;
    }
  | {
      className: "basic";
      methodName: "get-empty";
      classId: 60;
      methodId: 72;
      name: "basic.get-empty";
      args: BasicGetEmptyArgs;
    }
  | {
      className: "basic";
      methodName: "ack";
      classId: 60;
      methodId: 80;
      name: "basic.ack";
      args: BasicAckArgs;
    }
  | {
      className: "basic";
      methodName: "reject";
      classId: 60;
      methodId: 90;
      name: "basic.reject";
      args: BasicRejectArgs;
    }
  | {
      className: "basic";
      methodName: "recover-async";
      classId: 60;
      methodId: 100;
      name: "basic.recover-async";
      args: BasicRecoverAsyncArgs;
    }
  | {
      className: "basic";
      methodName: "recover";
      classId: 60;
      methodId: 110;
      name: "basic.recover";
      args: BasicRecoverArgs;
    }
  | {
      className: "basic";
      methodName: "recover-ok";
      classId: 60;
      methodId: 111;
      name: "basic.recover-ok";
      args: BasicRecoverOkArgs;
    }
  | {
      className: "basic";
      methodName: "nack";
      classId: 60;
      methodId: 120;
      name: "basic.nack";
      args: BasicNackArgs;
    }
  | {
      className: "tx";
      methodName: "select";
      classId: 90;
      methodId: 10;
      name: "tx.select";
      args: TxSelectArgs;
    }
  | {
      className: "tx";
      methodName: "select-ok";
      classId: 90;
      methodId: 11;
      name: "tx.select-ok";
      args: TxSelectOkArgs;
    }
  | {
      className: "tx";
      methodName: "commit";
      classId: 90;
      methodId: 20;
      name: "tx.commit";
      args: TxCommitArgs;
    }
  | {
      className: "tx";
      methodName: "commit-ok";
      classId: 90;
      methodId: 21;
      name: "tx.commit-ok";
      args: TxCommitOkArgs;
    }
  | {
      className: "tx";
      methodName: "rollback";
      classId: 90;
      methodId: 30;
      name: "tx.rollback";
      args: TxRollbackArgs;
    }
  | {
      className: "tx";
      methodName: "rollback-ok";
      classId: 90;
      methodId: 31;
      name: "tx.rollback-ok";
      args: TxRollbackOkArgs;
    }
  | {
      className: "confirm";
      methodName: "select";
      classId: 85;
      methodId: 10;
      name: "confirm.select";
      args: ConfirmSelectArgs;
    }
  | {
      className: "confirm";
      methodName: "select-ok";
      classId: 85;
      methodId: 11;
      name: "confirm.select-ok";
      args: ConfirmSelectOkArgs;
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
        ["versionMajor"]: decoder.decodeOctet(),
        ["versionMinor"]: decoder.decodeOctet(),
        ["serverProperties"]: decoder.decodeTable(),
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
        ["clientProperties"]: decoder.decodeTable(),
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
        ["channelMax"]: decoder.decodeShortUint(),
        ["frameMax"]: decoder.decodeLongUint(),
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
        ["channelMax"]: decoder.decodeShortUint(),
        ["frameMax"]: decoder.decodeLongUint(),
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
        ["virtualHost"]: decoder.decodeShortString(),
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
        ["knownHosts"]: decoder.decodeShortString()
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
        ["replyCode"]: decoder.decodeShortUint(),
        ["replyText"]: decoder.decodeShortString(),
        ["classId"]: decoder.decodeShortUint(),
        ["methodId"]: decoder.decodeShortUint()
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
        ["newSecret"]: decoder.decodeLongString(),
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
        ["outOfBand"]: decoder.decodeShortString()
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
        ["channelId"]: decoder.decodeLongString()
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
        ["replyCode"]: decoder.decodeShortUint(),
        ["replyText"]: decoder.decodeShortString(),
        ["classId"]: decoder.decodeShortUint(),
        ["methodId"]: decoder.decodeShortUint()
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
        ["autoDelete"]: decoder.decodeBit(),
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
        ["ifUnused"]: decoder.decodeBit(),
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
        ["routingKey"]: decoder.decodeShortString(),
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
        ["routingKey"]: decoder.decodeShortString(),
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
        ["autoDelete"]: decoder.decodeBit(),
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
        ["messageCount"]: decoder.decodeLongUint(),
        ["consumerCount"]: decoder.decodeLongUint()
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
        ["routingKey"]: decoder.decodeShortString(),
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
        ["messageCount"]: decoder.decodeLongUint()
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
        ["ifUnused"]: decoder.decodeBit(),
        ["ifEmpty"]: decoder.decodeBit(),
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
        ["messageCount"]: decoder.decodeLongUint()
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
        ["routingKey"]: decoder.decodeShortString(),
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
        ["prefetchSize"]: decoder.decodeLongUint(),
        ["prefetchCount"]: decoder.decodeShortUint(),
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
        ["consumerTag"]: decoder.decodeShortString(),
        ["noLocal"]: decoder.decodeBit(),
        ["noAck"]: decoder.decodeBit(),
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
        ["consumerTag"]: decoder.decodeShortString()
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
        ["consumerTag"]: decoder.decodeShortString(),
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
        ["consumerTag"]: decoder.decodeShortString()
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
        ["routingKey"]: decoder.decodeShortString(),
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
        ["replyCode"]: decoder.decodeShortUint(),
        ["replyText"]: decoder.decodeShortString(),
        ["exchange"]: decoder.decodeShortString(),
        ["routingKey"]: decoder.decodeShortString()
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
        ["consumerTag"]: decoder.decodeShortString(),
        ["deliveryTag"]: decoder.decodeLongLongUint(),
        ["redelivered"]: decoder.decodeBit(),
        ["exchange"]: decoder.decodeShortString(),
        ["routingKey"]: decoder.decodeShortString()
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
        ["noAck"]: decoder.decodeBit()
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
        ["deliveryTag"]: decoder.decodeLongLongUint(),
        ["redelivered"]: decoder.decodeBit(),
        ["exchange"]: decoder.decodeShortString(),
        ["routingKey"]: decoder.decodeShortString(),
        ["messageCount"]: decoder.decodeLongUint()
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
        ["clusterId"]: decoder.decodeShortString()
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
        ["deliveryTag"]: decoder.decodeLongLongUint(),
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
        ["deliveryTag"]: decoder.decodeLongLongUint(),
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
        ["deliveryTag"]: decoder.decodeLongLongUint(),
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
