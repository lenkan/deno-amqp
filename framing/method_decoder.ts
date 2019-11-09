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
      classId: 10;
      methodId: 10;
      args: ConnectionStartArgs;
    }
  | {
      classId: 10;
      methodId: 11;
      args: ConnectionStartOkArgs;
    }
  | {
      classId: 10;
      methodId: 20;
      args: ConnectionSecureArgs;
    }
  | {
      classId: 10;
      methodId: 21;
      args: ConnectionSecureOkArgs;
    }
  | {
      classId: 10;
      methodId: 30;
      args: ConnectionTuneArgs;
    }
  | {
      classId: 10;
      methodId: 31;
      args: ConnectionTuneOkArgs;
    }
  | {
      classId: 10;
      methodId: 40;
      args: ConnectionOpenArgs;
    }
  | {
      classId: 10;
      methodId: 41;
      args: ConnectionOpenOkArgs;
    }
  | {
      classId: 10;
      methodId: 50;
      args: ConnectionCloseArgs;
    }
  | {
      classId: 10;
      methodId: 51;
      args: ConnectionCloseOkArgs;
    }
  | {
      classId: 10;
      methodId: 60;
      args: ConnectionBlockedArgs;
    }
  | {
      classId: 10;
      methodId: 61;
      args: ConnectionUnblockedArgs;
    }
  | {
      classId: 10;
      methodId: 70;
      args: ConnectionUpdateSecretArgs;
    }
  | {
      classId: 10;
      methodId: 71;
      args: ConnectionUpdateSecretOkArgs;
    }
  | {
      classId: 20;
      methodId: 10;
      args: ChannelOpenArgs;
    }
  | {
      classId: 20;
      methodId: 11;
      args: ChannelOpenOkArgs;
    }
  | {
      classId: 20;
      methodId: 20;
      args: ChannelFlowArgs;
    }
  | {
      classId: 20;
      methodId: 21;
      args: ChannelFlowOkArgs;
    }
  | {
      classId: 20;
      methodId: 40;
      args: ChannelCloseArgs;
    }
  | {
      classId: 20;
      methodId: 41;
      args: ChannelCloseOkArgs;
    }
  | {
      classId: 30;
      methodId: 10;
      args: AccessRequestArgs;
    }
  | {
      classId: 30;
      methodId: 11;
      args: AccessRequestOkArgs;
    }
  | {
      classId: 40;
      methodId: 10;
      args: ExchangeDeclareArgs;
    }
  | {
      classId: 40;
      methodId: 11;
      args: ExchangeDeclareOkArgs;
    }
  | {
      classId: 40;
      methodId: 20;
      args: ExchangeDeleteArgs;
    }
  | {
      classId: 40;
      methodId: 21;
      args: ExchangeDeleteOkArgs;
    }
  | {
      classId: 40;
      methodId: 30;
      args: ExchangeBindArgs;
    }
  | {
      classId: 40;
      methodId: 31;
      args: ExchangeBindOkArgs;
    }
  | {
      classId: 40;
      methodId: 40;
      args: ExchangeUnbindArgs;
    }
  | {
      classId: 40;
      methodId: 51;
      args: ExchangeUnbindOkArgs;
    }
  | {
      classId: 50;
      methodId: 10;
      args: QueueDeclareArgs;
    }
  | {
      classId: 50;
      methodId: 11;
      args: QueueDeclareOkArgs;
    }
  | {
      classId: 50;
      methodId: 20;
      args: QueueBindArgs;
    }
  | {
      classId: 50;
      methodId: 21;
      args: QueueBindOkArgs;
    }
  | {
      classId: 50;
      methodId: 30;
      args: QueuePurgeArgs;
    }
  | {
      classId: 50;
      methodId: 31;
      args: QueuePurgeOkArgs;
    }
  | {
      classId: 50;
      methodId: 40;
      args: QueueDeleteArgs;
    }
  | {
      classId: 50;
      methodId: 41;
      args: QueueDeleteOkArgs;
    }
  | {
      classId: 50;
      methodId: 50;
      args: QueueUnbindArgs;
    }
  | {
      classId: 50;
      methodId: 51;
      args: QueueUnbindOkArgs;
    }
  | {
      classId: 60;
      methodId: 10;
      args: BasicQosArgs;
    }
  | {
      classId: 60;
      methodId: 11;
      args: BasicQosOkArgs;
    }
  | {
      classId: 60;
      methodId: 20;
      args: BasicConsumeArgs;
    }
  | {
      classId: 60;
      methodId: 21;
      args: BasicConsumeOkArgs;
    }
  | {
      classId: 60;
      methodId: 30;
      args: BasicCancelArgs;
    }
  | {
      classId: 60;
      methodId: 31;
      args: BasicCancelOkArgs;
    }
  | {
      classId: 60;
      methodId: 40;
      args: BasicPublishArgs;
    }
  | {
      classId: 60;
      methodId: 50;
      args: BasicReturnArgs;
    }
  | {
      classId: 60;
      methodId: 60;
      args: BasicDeliverArgs;
    }
  | {
      classId: 60;
      methodId: 70;
      args: BasicGetArgs;
    }
  | {
      classId: 60;
      methodId: 71;
      args: BasicGetOkArgs;
    }
  | {
      classId: 60;
      methodId: 72;
      args: BasicGetEmptyArgs;
    }
  | {
      classId: 60;
      methodId: 80;
      args: BasicAckArgs;
    }
  | {
      classId: 60;
      methodId: 90;
      args: BasicRejectArgs;
    }
  | {
      classId: 60;
      methodId: 100;
      args: BasicRecoverAsyncArgs;
    }
  | {
      classId: 60;
      methodId: 110;
      args: BasicRecoverArgs;
    }
  | {
      classId: 60;
      methodId: 111;
      args: BasicRecoverOkArgs;
    }
  | {
      classId: 60;
      methodId: 120;
      args: BasicNackArgs;
    }
  | {
      classId: 90;
      methodId: 10;
      args: TxSelectArgs;
    }
  | {
      classId: 90;
      methodId: 11;
      args: TxSelectOkArgs;
    }
  | {
      classId: 90;
      methodId: 20;
      args: TxCommitArgs;
    }
  | {
      classId: 90;
      methodId: 21;
      args: TxCommitOkArgs;
    }
  | {
      classId: 90;
      methodId: 30;
      args: TxRollbackArgs;
    }
  | {
      classId: 90;
      methodId: 31;
      args: TxRollbackOkArgs;
    }
  | {
      classId: 85;
      methodId: 10;
      args: ConfirmSelectArgs;
    }
  | {
      classId: 85;
      methodId: 11;
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
      methodId: 10,
      classId: 10,
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
      methodId: 11,
      classId: 10,
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
      methodId: 20,
      classId: 10,
      args: {
        ["challenge"]: decoder.decodeLongString()
      }
    };
  }

  if (classId === 10 && methodId === 21) {
    const decoder = createDecoder(data);
    return {
      methodId: 21,
      classId: 10,
      args: {
        ["response"]: decoder.decodeLongString()
      }
    };
  }

  if (classId === 10 && methodId === 30) {
    const decoder = createDecoder(data);
    return {
      methodId: 30,
      classId: 10,
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
      methodId: 31,
      classId: 10,
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
      methodId: 40,
      classId: 10,
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
      methodId: 41,
      classId: 10,
      args: {
        ["knownHosts"]: decoder.decodeShortString()
      }
    };
  }

  if (classId === 10 && methodId === 50) {
    const decoder = createDecoder(data);
    return {
      methodId: 50,
      classId: 10,
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
      methodId: 51,
      classId: 10,
      args: {}
    };
  }

  if (classId === 10 && methodId === 60) {
    const decoder = createDecoder(data);
    return {
      methodId: 60,
      classId: 10,
      args: {
        ["reason"]: decoder.decodeShortString()
      }
    };
  }

  if (classId === 10 && methodId === 61) {
    const decoder = createDecoder(data);
    return {
      methodId: 61,
      classId: 10,
      args: {}
    };
  }

  if (classId === 10 && methodId === 70) {
    const decoder = createDecoder(data);
    return {
      methodId: 70,
      classId: 10,
      args: {
        ["newSecret"]: decoder.decodeLongString(),
        ["reason"]: decoder.decodeShortString()
      }
    };
  }

  if (classId === 10 && methodId === 71) {
    const decoder = createDecoder(data);
    return {
      methodId: 71,
      classId: 10,
      args: {}
    };
  }

  if (classId === 20 && methodId === 10) {
    const decoder = createDecoder(data);
    return {
      methodId: 10,
      classId: 20,
      args: {
        ["outOfBand"]: decoder.decodeShortString()
      }
    };
  }

  if (classId === 20 && methodId === 11) {
    const decoder = createDecoder(data);
    return {
      methodId: 11,
      classId: 20,
      args: {
        ["channelId"]: decoder.decodeLongString()
      }
    };
  }

  if (classId === 20 && methodId === 20) {
    const decoder = createDecoder(data);
    return {
      methodId: 20,
      classId: 20,
      args: {
        ["active"]: decoder.decodeBit()
      }
    };
  }

  if (classId === 20 && methodId === 21) {
    const decoder = createDecoder(data);
    return {
      methodId: 21,
      classId: 20,
      args: {
        ["active"]: decoder.decodeBit()
      }
    };
  }

  if (classId === 20 && methodId === 40) {
    const decoder = createDecoder(data);
    return {
      methodId: 40,
      classId: 20,
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
      methodId: 41,
      classId: 20,
      args: {}
    };
  }

  if (classId === 30 && methodId === 10) {
    const decoder = createDecoder(data);
    return {
      methodId: 10,
      classId: 30,
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
      methodId: 11,
      classId: 30,
      args: {
        ["ticket"]: decoder.decodeShortUint()
      }
    };
  }

  if (classId === 40 && methodId === 10) {
    const decoder = createDecoder(data);
    return {
      methodId: 10,
      classId: 40,
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
      methodId: 11,
      classId: 40,
      args: {}
    };
  }

  if (classId === 40 && methodId === 20) {
    const decoder = createDecoder(data);
    return {
      methodId: 20,
      classId: 40,
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
      methodId: 21,
      classId: 40,
      args: {}
    };
  }

  if (classId === 40 && methodId === 30) {
    const decoder = createDecoder(data);
    return {
      methodId: 30,
      classId: 40,
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
      methodId: 31,
      classId: 40,
      args: {}
    };
  }

  if (classId === 40 && methodId === 40) {
    const decoder = createDecoder(data);
    return {
      methodId: 40,
      classId: 40,
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
      methodId: 51,
      classId: 40,
      args: {}
    };
  }

  if (classId === 50 && methodId === 10) {
    const decoder = createDecoder(data);
    return {
      methodId: 10,
      classId: 50,
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
      methodId: 11,
      classId: 50,
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
      methodId: 20,
      classId: 50,
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
      methodId: 21,
      classId: 50,
      args: {}
    };
  }

  if (classId === 50 && methodId === 30) {
    const decoder = createDecoder(data);
    return {
      methodId: 30,
      classId: 50,
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
      methodId: 31,
      classId: 50,
      args: {
        ["messageCount"]: decoder.decodeLongUint()
      }
    };
  }

  if (classId === 50 && methodId === 40) {
    const decoder = createDecoder(data);
    return {
      methodId: 40,
      classId: 50,
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
      methodId: 41,
      classId: 50,
      args: {
        ["messageCount"]: decoder.decodeLongUint()
      }
    };
  }

  if (classId === 50 && methodId === 50) {
    const decoder = createDecoder(data);
    return {
      methodId: 50,
      classId: 50,
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
      methodId: 51,
      classId: 50,
      args: {}
    };
  }

  if (classId === 60 && methodId === 10) {
    const decoder = createDecoder(data);
    return {
      methodId: 10,
      classId: 60,
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
      methodId: 11,
      classId: 60,
      args: {}
    };
  }

  if (classId === 60 && methodId === 20) {
    const decoder = createDecoder(data);
    return {
      methodId: 20,
      classId: 60,
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
      methodId: 21,
      classId: 60,
      args: {
        ["consumerTag"]: decoder.decodeShortString()
      }
    };
  }

  if (classId === 60 && methodId === 30) {
    const decoder = createDecoder(data);
    return {
      methodId: 30,
      classId: 60,
      args: {
        ["consumerTag"]: decoder.decodeShortString(),
        ["nowait"]: decoder.decodeBit()
      }
    };
  }

  if (classId === 60 && methodId === 31) {
    const decoder = createDecoder(data);
    return {
      methodId: 31,
      classId: 60,
      args: {
        ["consumerTag"]: decoder.decodeShortString()
      }
    };
  }

  if (classId === 60 && methodId === 40) {
    const decoder = createDecoder(data);
    return {
      methodId: 40,
      classId: 60,
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
      methodId: 50,
      classId: 60,
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
      methodId: 60,
      classId: 60,
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
      methodId: 70,
      classId: 60,
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
      methodId: 71,
      classId: 60,
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
      methodId: 72,
      classId: 60,
      args: {
        ["clusterId"]: decoder.decodeShortString()
      }
    };
  }

  if (classId === 60 && methodId === 80) {
    const decoder = createDecoder(data);
    return {
      methodId: 80,
      classId: 60,
      args: {
        ["deliveryTag"]: decoder.decodeLongLongUint(),
        ["multiple"]: decoder.decodeBit()
      }
    };
  }

  if (classId === 60 && methodId === 90) {
    const decoder = createDecoder(data);
    return {
      methodId: 90,
      classId: 60,
      args: {
        ["deliveryTag"]: decoder.decodeLongLongUint(),
        ["requeue"]: decoder.decodeBit()
      }
    };
  }

  if (classId === 60 && methodId === 100) {
    const decoder = createDecoder(data);
    return {
      methodId: 100,
      classId: 60,
      args: {
        ["requeue"]: decoder.decodeBit()
      }
    };
  }

  if (classId === 60 && methodId === 110) {
    const decoder = createDecoder(data);
    return {
      methodId: 110,
      classId: 60,
      args: {
        ["requeue"]: decoder.decodeBit()
      }
    };
  }

  if (classId === 60 && methodId === 111) {
    const decoder = createDecoder(data);
    return {
      methodId: 111,
      classId: 60,
      args: {}
    };
  }

  if (classId === 60 && methodId === 120) {
    const decoder = createDecoder(data);
    return {
      methodId: 120,
      classId: 60,
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
      methodId: 10,
      classId: 90,
      args: {}
    };
  }

  if (classId === 90 && methodId === 11) {
    const decoder = createDecoder(data);
    return {
      methodId: 11,
      classId: 90,
      args: {}
    };
  }

  if (classId === 90 && methodId === 20) {
    const decoder = createDecoder(data);
    return {
      methodId: 20,
      classId: 90,
      args: {}
    };
  }

  if (classId === 90 && methodId === 21) {
    const decoder = createDecoder(data);
    return {
      methodId: 21,
      classId: 90,
      args: {}
    };
  }

  if (classId === 90 && methodId === 30) {
    const decoder = createDecoder(data);
    return {
      methodId: 30,
      classId: 90,
      args: {}
    };
  }

  if (classId === 90 && methodId === 31) {
    const decoder = createDecoder(data);
    return {
      methodId: 31,
      classId: 90,
      args: {}
    };
  }

  if (classId === 85 && methodId === 10) {
    const decoder = createDecoder(data);
    return {
      methodId: 10,
      classId: 85,
      args: {
        ["nowait"]: decoder.decodeBit()
      }
    };
  }

  if (classId === 85 && methodId === 11) {
    const decoder = createDecoder(data);
    return {
      methodId: 11,
      classId: 85,
      args: {}
    };
  }

  throw new Error(
    "No match for class: " + classId + " and method: " + methodId
  );
} 
