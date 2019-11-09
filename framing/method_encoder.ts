import { createEncoder } from "./encoder.ts";

export interface ConnectionStartArgs {
  /** default: 0 */ versionMajor?: number;
  /** default: 9 */ versionMinor?: number;
  /**  */ serverProperties: Record<string, any>;
  /** default: "PLAIN" */ mechanisms?: string;
  /** default: "en_US" */ locales?: string;
}
export interface ConnectionStartOkArgs {
  /**  */ clientProperties: Record<string, any>;
  /** default: "PLAIN" */ mechanism?: string;
  /**  */ response: string;
  /** default: "en_US" */ locale?: string;
}
export interface ConnectionSecureArgs {
  /**  */ challenge: string;
}
export interface ConnectionSecureOkArgs {
  /**  */ response: string;
}
export interface ConnectionTuneArgs {
  /** default: 0 */ channelMax?: number;
  /** default: 0 */ frameMax?: number;
  /** default: 0 */ heartbeat?: number;
}
export interface ConnectionTuneOkArgs {
  /** default: 0 */ channelMax?: number;
  /** default: 0 */ frameMax?: number;
  /** default: 0 */ heartbeat?: number;
}
export interface ConnectionOpenArgs {
  /** default: "/" */ virtualHost?: string;
  /** default: "" */ capabilities?: string;
  /** default: false */ insist?: boolean;
}
export interface ConnectionOpenOkArgs {
  /** default: "" */ knownHosts?: string;
}
export interface ConnectionCloseArgs {
  /**  */ replyCode: number;
  /** default: "" */ replyText?: string;
  /**  */ classId: number;
  /**  */ methodId: number;
}
export interface ConnectionCloseOkArgs {}
export interface ConnectionBlockedArgs {
  /** default: "" */ reason?: string;
}
export interface ConnectionUnblockedArgs {}
export interface ConnectionUpdateSecretArgs {
  /**  */ newSecret: string;
  /**  */ reason: string;
}
export interface ConnectionUpdateSecretOkArgs {}
export interface ChannelOpenArgs {
  /** default: "" */ outOfBand?: string;
}
export interface ChannelOpenOkArgs {
  /** default: "" */ channelId?: string;
}
export interface ChannelFlowArgs {
  /**  */ active: boolean;
}
export interface ChannelFlowOkArgs {
  /**  */ active: boolean;
}
export interface ChannelCloseArgs {
  /**  */ replyCode: number;
  /** default: "" */ replyText?: string;
  /**  */ classId: number;
  /**  */ methodId: number;
}
export interface ChannelCloseOkArgs {}
export interface AccessRequestArgs {
  /** default: "/data" */ realm?: string;
  /** default: false */ exclusive?: boolean;
  /** default: true */ passive?: boolean;
  /** default: true */ active?: boolean;
  /** default: true */ write?: boolean;
  /** default: true */ read?: boolean;
}
export interface AccessRequestOkArgs {
  /** default: 1 */ ticket?: number;
}
export interface ExchangeDeclareArgs {
  /** default: 0 */ ticket?: number;
  /**  */ exchange: string;
  /** default: "direct" */ type?: string;
  /** default: false */ passive?: boolean;
  /** default: false */ durable?: boolean;
  /** default: false */ autoDelete?: boolean;
  /** default: false */ internal?: boolean;
  /** default: false */ nowait?: boolean;
  /** default: {} */ arguments?: Record<string, any>;
}
export interface ExchangeDeclareOkArgs {}
export interface ExchangeDeleteArgs {
  /** default: 0 */ ticket?: number;
  /**  */ exchange: string;
  /** default: false */ ifUnused?: boolean;
  /** default: false */ nowait?: boolean;
}
export interface ExchangeDeleteOkArgs {}
export interface ExchangeBindArgs {
  /** default: 0 */ ticket?: number;
  /**  */ destination: string;
  /**  */ source: string;
  /** default: "" */ routingKey?: string;
  /** default: false */ nowait?: boolean;
  /** default: {} */ arguments?: Record<string, any>;
}
export interface ExchangeBindOkArgs {}
export interface ExchangeUnbindArgs {
  /** default: 0 */ ticket?: number;
  /**  */ destination: string;
  /**  */ source: string;
  /** default: "" */ routingKey?: string;
  /** default: false */ nowait?: boolean;
  /** default: {} */ arguments?: Record<string, any>;
}
export interface ExchangeUnbindOkArgs {}
export interface QueueDeclareArgs {
  /** default: 0 */ ticket?: number;
  /** default: "" */ queue?: string;
  /** default: false */ passive?: boolean;
  /** default: false */ durable?: boolean;
  /** default: false */ exclusive?: boolean;
  /** default: false */ autoDelete?: boolean;
  /** default: false */ nowait?: boolean;
  /** default: {} */ arguments?: Record<string, any>;
}
export interface QueueDeclareOkArgs {
  /**  */ queue: string;
  /**  */ messageCount: number;
  /**  */ consumerCount: number;
}
export interface QueueBindArgs {
  /** default: 0 */ ticket?: number;
  /** default: "" */ queue?: string;
  /**  */ exchange: string;
  /** default: "" */ routingKey?: string;
  /** default: false */ nowait?: boolean;
  /** default: {} */ arguments?: Record<string, any>;
}
export interface QueueBindOkArgs {}
export interface QueuePurgeArgs {
  /** default: 0 */ ticket?: number;
  /** default: "" */ queue?: string;
  /** default: false */ nowait?: boolean;
}
export interface QueuePurgeOkArgs {
  /**  */ messageCount: number;
}
export interface QueueDeleteArgs {
  /** default: 0 */ ticket?: number;
  /** default: "" */ queue?: string;
  /** default: false */ ifUnused?: boolean;
  /** default: false */ ifEmpty?: boolean;
  /** default: false */ nowait?: boolean;
}
export interface QueueDeleteOkArgs {
  /**  */ messageCount: number;
}
export interface QueueUnbindArgs {
  /** default: 0 */ ticket?: number;
  /** default: "" */ queue?: string;
  /**  */ exchange: string;
  /** default: "" */ routingKey?: string;
  /** default: {} */ arguments?: Record<string, any>;
}
export interface QueueUnbindOkArgs {}
export interface BasicQosArgs {
  /** default: 0 */ prefetchSize?: number;
  /** default: 0 */ prefetchCount?: number;
  /** default: false */ global?: boolean;
}
export interface BasicQosOkArgs {}
export interface BasicConsumeArgs {
  /** default: 0 */ ticket?: number;
  /** default: "" */ queue?: string;
  /** default: "" */ consumerTag?: string;
  /** default: false */ noLocal?: boolean;
  /** default: false */ noAck?: boolean;
  /** default: false */ exclusive?: boolean;
  /** default: false */ nowait?: boolean;
  /** default: {} */ arguments?: Record<string, any>;
}
export interface BasicConsumeOkArgs {
  /**  */ consumerTag: string;
}
export interface BasicCancelArgs {
  /**  */ consumerTag: string;
  /** default: false */ nowait?: boolean;
}
export interface BasicCancelOkArgs {
  /**  */ consumerTag: string;
}
export interface BasicPublishArgs {
  /** default: 0 */ ticket?: number;
  /** default: "" */ exchange?: string;
  /** default: "" */ routingKey?: string;
  /** default: false */ mandatory?: boolean;
  /** default: false */ immediate?: boolean;
}
export interface BasicReturnArgs {
  /**  */ replyCode: number;
  /** default: "" */ replyText?: string;
  /**  */ exchange: string;
  /**  */ routingKey: string;
}
export interface BasicDeliverArgs {
  /**  */ consumerTag: string;
  /**  */ deliveryTag: Uint8Array;
  /** default: false */ redelivered?: boolean;
  /**  */ exchange: string;
  /**  */ routingKey: string;
}
export interface BasicGetArgs {
  /** default: 0 */ ticket?: number;
  /** default: "" */ queue?: string;
  /** default: false */ noAck?: boolean;
}
export interface BasicGetOkArgs {
  /**  */ deliveryTag: Uint8Array;
  /** default: false */ redelivered?: boolean;
  /**  */ exchange: string;
  /**  */ routingKey: string;
  /**  */ messageCount: number;
}
export interface BasicGetEmptyArgs {
  /** default: "" */ clusterId?: string;
}
export interface BasicAckArgs {
  /** default: 0 */ deliveryTag?: Uint8Array;
  /** default: false */ multiple?: boolean;
}
export interface BasicRejectArgs {
  /**  */ deliveryTag: Uint8Array;
  /** default: true */ requeue?: boolean;
}
export interface BasicRecoverAsyncArgs {
  /** default: false */ requeue?: boolean;
}
export interface BasicRecoverArgs {
  /** default: false */ requeue?: boolean;
}
export interface BasicRecoverOkArgs {}
export interface BasicNackArgs {
  /** default: 0 */ deliveryTag?: Uint8Array;
  /** default: false */ multiple?: boolean;
  /** default: true */ requeue?: boolean;
}
export interface TxSelectArgs {}
export interface TxSelectOkArgs {}
export interface TxCommitArgs {}
export interface TxCommitOkArgs {}
export interface TxRollbackArgs {}
export interface TxRollbackOkArgs {}
export interface ConfirmSelectArgs {
  /** default: false */ nowait?: boolean;
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

export function encodeMethodPayload(payload: MethodPayload): Uint8Array {
  if (payload.classId === 10 && payload.methodId === 10) {
    const encoder = createEncoder();
    encoder.encodeShortUint(10);
    encoder.encodeShortUint(10);
    encoder.encodeOctet(
      payload.args.versionMajor !== undefined ? payload.args.versionMajor : 0
    );
    encoder.encodeOctet(
      payload.args.versionMinor !== undefined ? payload.args.versionMinor : 9
    );
    encoder.encodeTable(payload.args.serverProperties);
    encoder.encodeLongString(
      payload.args.mechanisms !== undefined ? payload.args.mechanisms : "PLAIN"
    );
    encoder.encodeLongString(
      payload.args.locales !== undefined ? payload.args.locales : "en_US"
    );
    return encoder.bytes();
  }

  if (payload.classId === 10 && payload.methodId === 11) {
    const encoder = createEncoder();
    encoder.encodeShortUint(10);
    encoder.encodeShortUint(11);
    encoder.encodeTable(payload.args.clientProperties);
    encoder.encodeShortString(
      payload.args.mechanism !== undefined ? payload.args.mechanism : "PLAIN"
    );
    encoder.encodeLongString(payload.args.response);
    encoder.encodeShortString(
      payload.args.locale !== undefined ? payload.args.locale : "en_US"
    );
    return encoder.bytes();
  }

  if (payload.classId === 10 && payload.methodId === 20) {
    const encoder = createEncoder();
    encoder.encodeShortUint(10);
    encoder.encodeShortUint(20);
    encoder.encodeLongString(payload.args.challenge);
    return encoder.bytes();
  }

  if (payload.classId === 10 && payload.methodId === 21) {
    const encoder = createEncoder();
    encoder.encodeShortUint(10);
    encoder.encodeShortUint(21);
    encoder.encodeLongString(payload.args.response);
    return encoder.bytes();
  }

  if (payload.classId === 10 && payload.methodId === 30) {
    const encoder = createEncoder();
    encoder.encodeShortUint(10);
    encoder.encodeShortUint(30);
    encoder.encodeShortUint(
      payload.args.channelMax !== undefined ? payload.args.channelMax : 0
    );
    encoder.encodeLongUint(
      payload.args.frameMax !== undefined ? payload.args.frameMax : 0
    );
    encoder.encodeShortUint(
      payload.args.heartbeat !== undefined ? payload.args.heartbeat : 0
    );
    return encoder.bytes();
  }

  if (payload.classId === 10 && payload.methodId === 31) {
    const encoder = createEncoder();
    encoder.encodeShortUint(10);
    encoder.encodeShortUint(31);
    encoder.encodeShortUint(
      payload.args.channelMax !== undefined ? payload.args.channelMax : 0
    );
    encoder.encodeLongUint(
      payload.args.frameMax !== undefined ? payload.args.frameMax : 0
    );
    encoder.encodeShortUint(
      payload.args.heartbeat !== undefined ? payload.args.heartbeat : 0
    );
    return encoder.bytes();
  }

  if (payload.classId === 10 && payload.methodId === 40) {
    const encoder = createEncoder();
    encoder.encodeShortUint(10);
    encoder.encodeShortUint(40);
    encoder.encodeShortString(
      payload.args.virtualHost !== undefined ? payload.args.virtualHost : "/"
    );
    encoder.encodeShortString(
      payload.args.capabilities !== undefined ? payload.args.capabilities : ""
    );
    encoder.encodeBit(
      payload.args.insist !== undefined ? payload.args.insist : false
    );
    return encoder.bytes();
  }

  if (payload.classId === 10 && payload.methodId === 41) {
    const encoder = createEncoder();
    encoder.encodeShortUint(10);
    encoder.encodeShortUint(41);
    encoder.encodeShortString(
      payload.args.knownHosts !== undefined ? payload.args.knownHosts : ""
    );
    return encoder.bytes();
  }

  if (payload.classId === 10 && payload.methodId === 50) {
    const encoder = createEncoder();
    encoder.encodeShortUint(10);
    encoder.encodeShortUint(50);
    encoder.encodeShortUint(payload.args.replyCode);
    encoder.encodeShortString(
      payload.args.replyText !== undefined ? payload.args.replyText : ""
    );
    encoder.encodeShortUint(payload.args.classId);
    encoder.encodeShortUint(payload.args.methodId);
    return encoder.bytes();
  }

  if (payload.classId === 10 && payload.methodId === 51) {
    const encoder = createEncoder();
    encoder.encodeShortUint(10);
    encoder.encodeShortUint(51);

    return encoder.bytes();
  }

  if (payload.classId === 10 && payload.methodId === 60) {
    const encoder = createEncoder();
    encoder.encodeShortUint(10);
    encoder.encodeShortUint(60);
    encoder.encodeShortString(
      payload.args.reason !== undefined ? payload.args.reason : ""
    );
    return encoder.bytes();
  }

  if (payload.classId === 10 && payload.methodId === 61) {
    const encoder = createEncoder();
    encoder.encodeShortUint(10);
    encoder.encodeShortUint(61);

    return encoder.bytes();
  }

  if (payload.classId === 10 && payload.methodId === 70) {
    const encoder = createEncoder();
    encoder.encodeShortUint(10);
    encoder.encodeShortUint(70);
    encoder.encodeLongString(payload.args.newSecret);
    encoder.encodeShortString(payload.args.reason);
    return encoder.bytes();
  }

  if (payload.classId === 10 && payload.methodId === 71) {
    const encoder = createEncoder();
    encoder.encodeShortUint(10);
    encoder.encodeShortUint(71);

    return encoder.bytes();
  }

  if (payload.classId === 20 && payload.methodId === 10) {
    const encoder = createEncoder();
    encoder.encodeShortUint(20);
    encoder.encodeShortUint(10);
    encoder.encodeShortString(
      payload.args.outOfBand !== undefined ? payload.args.outOfBand : ""
    );
    return encoder.bytes();
  }

  if (payload.classId === 20 && payload.methodId === 11) {
    const encoder = createEncoder();
    encoder.encodeShortUint(20);
    encoder.encodeShortUint(11);
    encoder.encodeLongString(
      payload.args.channelId !== undefined ? payload.args.channelId : ""
    );
    return encoder.bytes();
  }

  if (payload.classId === 20 && payload.methodId === 20) {
    const encoder = createEncoder();
    encoder.encodeShortUint(20);
    encoder.encodeShortUint(20);
    encoder.encodeBit(payload.args.active);
    return encoder.bytes();
  }

  if (payload.classId === 20 && payload.methodId === 21) {
    const encoder = createEncoder();
    encoder.encodeShortUint(20);
    encoder.encodeShortUint(21);
    encoder.encodeBit(payload.args.active);
    return encoder.bytes();
  }

  if (payload.classId === 20 && payload.methodId === 40) {
    const encoder = createEncoder();
    encoder.encodeShortUint(20);
    encoder.encodeShortUint(40);
    encoder.encodeShortUint(payload.args.replyCode);
    encoder.encodeShortString(
      payload.args.replyText !== undefined ? payload.args.replyText : ""
    );
    encoder.encodeShortUint(payload.args.classId);
    encoder.encodeShortUint(payload.args.methodId);
    return encoder.bytes();
  }

  if (payload.classId === 20 && payload.methodId === 41) {
    const encoder = createEncoder();
    encoder.encodeShortUint(20);
    encoder.encodeShortUint(41);

    return encoder.bytes();
  }

  if (payload.classId === 30 && payload.methodId === 10) {
    const encoder = createEncoder();
    encoder.encodeShortUint(30);
    encoder.encodeShortUint(10);
    encoder.encodeShortString(
      payload.args.realm !== undefined ? payload.args.realm : "/data"
    );
    encoder.encodeBit(
      payload.args.exclusive !== undefined ? payload.args.exclusive : false
    );
    encoder.encodeBit(
      payload.args.passive !== undefined ? payload.args.passive : true
    );
    encoder.encodeBit(
      payload.args.active !== undefined ? payload.args.active : true
    );
    encoder.encodeBit(
      payload.args.write !== undefined ? payload.args.write : true
    );
    encoder.encodeBit(
      payload.args.read !== undefined ? payload.args.read : true
    );
    return encoder.bytes();
  }

  if (payload.classId === 30 && payload.methodId === 11) {
    const encoder = createEncoder();
    encoder.encodeShortUint(30);
    encoder.encodeShortUint(11);
    encoder.encodeShortUint(
      payload.args.ticket !== undefined ? payload.args.ticket : 1
    );
    return encoder.bytes();
  }

  if (payload.classId === 40 && payload.methodId === 10) {
    const encoder = createEncoder();
    encoder.encodeShortUint(40);
    encoder.encodeShortUint(10);
    encoder.encodeShortUint(
      payload.args.ticket !== undefined ? payload.args.ticket : 0
    );
    encoder.encodeShortString(payload.args.exchange);
    encoder.encodeShortString(
      payload.args.type !== undefined ? payload.args.type : "direct"
    );
    encoder.encodeBit(
      payload.args.passive !== undefined ? payload.args.passive : false
    );
    encoder.encodeBit(
      payload.args.durable !== undefined ? payload.args.durable : false
    );
    encoder.encodeBit(
      payload.args.autoDelete !== undefined ? payload.args.autoDelete : false
    );
    encoder.encodeBit(
      payload.args.internal !== undefined ? payload.args.internal : false
    );
    encoder.encodeBit(
      payload.args.nowait !== undefined ? payload.args.nowait : false
    );
    encoder.encodeTable(
      payload.args.arguments !== undefined ? payload.args.arguments : {}
    );
    return encoder.bytes();
  }

  if (payload.classId === 40 && payload.methodId === 11) {
    const encoder = createEncoder();
    encoder.encodeShortUint(40);
    encoder.encodeShortUint(11);

    return encoder.bytes();
  }

  if (payload.classId === 40 && payload.methodId === 20) {
    const encoder = createEncoder();
    encoder.encodeShortUint(40);
    encoder.encodeShortUint(20);
    encoder.encodeShortUint(
      payload.args.ticket !== undefined ? payload.args.ticket : 0
    );
    encoder.encodeShortString(payload.args.exchange);
    encoder.encodeBit(
      payload.args.ifUnused !== undefined ? payload.args.ifUnused : false
    );
    encoder.encodeBit(
      payload.args.nowait !== undefined ? payload.args.nowait : false
    );
    return encoder.bytes();
  }

  if (payload.classId === 40 && payload.methodId === 21) {
    const encoder = createEncoder();
    encoder.encodeShortUint(40);
    encoder.encodeShortUint(21);

    return encoder.bytes();
  }

  if (payload.classId === 40 && payload.methodId === 30) {
    const encoder = createEncoder();
    encoder.encodeShortUint(40);
    encoder.encodeShortUint(30);
    encoder.encodeShortUint(
      payload.args.ticket !== undefined ? payload.args.ticket : 0
    );
    encoder.encodeShortString(payload.args.destination);
    encoder.encodeShortString(payload.args.source);
    encoder.encodeShortString(
      payload.args.routingKey !== undefined ? payload.args.routingKey : ""
    );
    encoder.encodeBit(
      payload.args.nowait !== undefined ? payload.args.nowait : false
    );
    encoder.encodeTable(
      payload.args.arguments !== undefined ? payload.args.arguments : {}
    );
    return encoder.bytes();
  }

  if (payload.classId === 40 && payload.methodId === 31) {
    const encoder = createEncoder();
    encoder.encodeShortUint(40);
    encoder.encodeShortUint(31);

    return encoder.bytes();
  }

  if (payload.classId === 40 && payload.methodId === 40) {
    const encoder = createEncoder();
    encoder.encodeShortUint(40);
    encoder.encodeShortUint(40);
    encoder.encodeShortUint(
      payload.args.ticket !== undefined ? payload.args.ticket : 0
    );
    encoder.encodeShortString(payload.args.destination);
    encoder.encodeShortString(payload.args.source);
    encoder.encodeShortString(
      payload.args.routingKey !== undefined ? payload.args.routingKey : ""
    );
    encoder.encodeBit(
      payload.args.nowait !== undefined ? payload.args.nowait : false
    );
    encoder.encodeTable(
      payload.args.arguments !== undefined ? payload.args.arguments : {}
    );
    return encoder.bytes();
  }

  if (payload.classId === 40 && payload.methodId === 51) {
    const encoder = createEncoder();
    encoder.encodeShortUint(40);
    encoder.encodeShortUint(51);

    return encoder.bytes();
  }

  if (payload.classId === 50 && payload.methodId === 10) {
    const encoder = createEncoder();
    encoder.encodeShortUint(50);
    encoder.encodeShortUint(10);
    encoder.encodeShortUint(
      payload.args.ticket !== undefined ? payload.args.ticket : 0
    );
    encoder.encodeShortString(
      payload.args.queue !== undefined ? payload.args.queue : ""
    );
    encoder.encodeBit(
      payload.args.passive !== undefined ? payload.args.passive : false
    );
    encoder.encodeBit(
      payload.args.durable !== undefined ? payload.args.durable : false
    );
    encoder.encodeBit(
      payload.args.exclusive !== undefined ? payload.args.exclusive : false
    );
    encoder.encodeBit(
      payload.args.autoDelete !== undefined ? payload.args.autoDelete : false
    );
    encoder.encodeBit(
      payload.args.nowait !== undefined ? payload.args.nowait : false
    );
    encoder.encodeTable(
      payload.args.arguments !== undefined ? payload.args.arguments : {}
    );
    return encoder.bytes();
  }

  if (payload.classId === 50 && payload.methodId === 11) {
    const encoder = createEncoder();
    encoder.encodeShortUint(50);
    encoder.encodeShortUint(11);
    encoder.encodeShortString(payload.args.queue);
    encoder.encodeLongUint(payload.args.messageCount);
    encoder.encodeLongUint(payload.args.consumerCount);
    return encoder.bytes();
  }

  if (payload.classId === 50 && payload.methodId === 20) {
    const encoder = createEncoder();
    encoder.encodeShortUint(50);
    encoder.encodeShortUint(20);
    encoder.encodeShortUint(
      payload.args.ticket !== undefined ? payload.args.ticket : 0
    );
    encoder.encodeShortString(
      payload.args.queue !== undefined ? payload.args.queue : ""
    );
    encoder.encodeShortString(payload.args.exchange);
    encoder.encodeShortString(
      payload.args.routingKey !== undefined ? payload.args.routingKey : ""
    );
    encoder.encodeBit(
      payload.args.nowait !== undefined ? payload.args.nowait : false
    );
    encoder.encodeTable(
      payload.args.arguments !== undefined ? payload.args.arguments : {}
    );
    return encoder.bytes();
  }

  if (payload.classId === 50 && payload.methodId === 21) {
    const encoder = createEncoder();
    encoder.encodeShortUint(50);
    encoder.encodeShortUint(21);

    return encoder.bytes();
  }

  if (payload.classId === 50 && payload.methodId === 30) {
    const encoder = createEncoder();
    encoder.encodeShortUint(50);
    encoder.encodeShortUint(30);
    encoder.encodeShortUint(
      payload.args.ticket !== undefined ? payload.args.ticket : 0
    );
    encoder.encodeShortString(
      payload.args.queue !== undefined ? payload.args.queue : ""
    );
    encoder.encodeBit(
      payload.args.nowait !== undefined ? payload.args.nowait : false
    );
    return encoder.bytes();
  }

  if (payload.classId === 50 && payload.methodId === 31) {
    const encoder = createEncoder();
    encoder.encodeShortUint(50);
    encoder.encodeShortUint(31);
    encoder.encodeLongUint(payload.args.messageCount);
    return encoder.bytes();
  }

  if (payload.classId === 50 && payload.methodId === 40) {
    const encoder = createEncoder();
    encoder.encodeShortUint(50);
    encoder.encodeShortUint(40);
    encoder.encodeShortUint(
      payload.args.ticket !== undefined ? payload.args.ticket : 0
    );
    encoder.encodeShortString(
      payload.args.queue !== undefined ? payload.args.queue : ""
    );
    encoder.encodeBit(
      payload.args.ifUnused !== undefined ? payload.args.ifUnused : false
    );
    encoder.encodeBit(
      payload.args.ifEmpty !== undefined ? payload.args.ifEmpty : false
    );
    encoder.encodeBit(
      payload.args.nowait !== undefined ? payload.args.nowait : false
    );
    return encoder.bytes();
  }

  if (payload.classId === 50 && payload.methodId === 41) {
    const encoder = createEncoder();
    encoder.encodeShortUint(50);
    encoder.encodeShortUint(41);
    encoder.encodeLongUint(payload.args.messageCount);
    return encoder.bytes();
  }

  if (payload.classId === 50 && payload.methodId === 50) {
    const encoder = createEncoder();
    encoder.encodeShortUint(50);
    encoder.encodeShortUint(50);
    encoder.encodeShortUint(
      payload.args.ticket !== undefined ? payload.args.ticket : 0
    );
    encoder.encodeShortString(
      payload.args.queue !== undefined ? payload.args.queue : ""
    );
    encoder.encodeShortString(payload.args.exchange);
    encoder.encodeShortString(
      payload.args.routingKey !== undefined ? payload.args.routingKey : ""
    );
    encoder.encodeTable(
      payload.args.arguments !== undefined ? payload.args.arguments : {}
    );
    return encoder.bytes();
  }

  if (payload.classId === 50 && payload.methodId === 51) {
    const encoder = createEncoder();
    encoder.encodeShortUint(50);
    encoder.encodeShortUint(51);

    return encoder.bytes();
  }

  if (payload.classId === 60 && payload.methodId === 10) {
    const encoder = createEncoder();
    encoder.encodeShortUint(60);
    encoder.encodeShortUint(10);
    encoder.encodeLongUint(
      payload.args.prefetchSize !== undefined ? payload.args.prefetchSize : 0
    );
    encoder.encodeShortUint(
      payload.args.prefetchCount !== undefined ? payload.args.prefetchCount : 0
    );
    encoder.encodeBit(
      payload.args.global !== undefined ? payload.args.global : false
    );
    return encoder.bytes();
  }

  if (payload.classId === 60 && payload.methodId === 11) {
    const encoder = createEncoder();
    encoder.encodeShortUint(60);
    encoder.encodeShortUint(11);

    return encoder.bytes();
  }

  if (payload.classId === 60 && payload.methodId === 20) {
    const encoder = createEncoder();
    encoder.encodeShortUint(60);
    encoder.encodeShortUint(20);
    encoder.encodeShortUint(
      payload.args.ticket !== undefined ? payload.args.ticket : 0
    );
    encoder.encodeShortString(
      payload.args.queue !== undefined ? payload.args.queue : ""
    );
    encoder.encodeShortString(
      payload.args.consumerTag !== undefined ? payload.args.consumerTag : ""
    );
    encoder.encodeBit(
      payload.args.noLocal !== undefined ? payload.args.noLocal : false
    );
    encoder.encodeBit(
      payload.args.noAck !== undefined ? payload.args.noAck : false
    );
    encoder.encodeBit(
      payload.args.exclusive !== undefined ? payload.args.exclusive : false
    );
    encoder.encodeBit(
      payload.args.nowait !== undefined ? payload.args.nowait : false
    );
    encoder.encodeTable(
      payload.args.arguments !== undefined ? payload.args.arguments : {}
    );
    return encoder.bytes();
  }

  if (payload.classId === 60 && payload.methodId === 21) {
    const encoder = createEncoder();
    encoder.encodeShortUint(60);
    encoder.encodeShortUint(21);
    encoder.encodeShortString(payload.args.consumerTag);
    return encoder.bytes();
  }

  if (payload.classId === 60 && payload.methodId === 30) {
    const encoder = createEncoder();
    encoder.encodeShortUint(60);
    encoder.encodeShortUint(30);
    encoder.encodeShortString(payload.args.consumerTag);
    encoder.encodeBit(
      payload.args.nowait !== undefined ? payload.args.nowait : false
    );
    return encoder.bytes();
  }

  if (payload.classId === 60 && payload.methodId === 31) {
    const encoder = createEncoder();
    encoder.encodeShortUint(60);
    encoder.encodeShortUint(31);
    encoder.encodeShortString(payload.args.consumerTag);
    return encoder.bytes();
  }

  if (payload.classId === 60 && payload.methodId === 40) {
    const encoder = createEncoder();
    encoder.encodeShortUint(60);
    encoder.encodeShortUint(40);
    encoder.encodeShortUint(
      payload.args.ticket !== undefined ? payload.args.ticket : 0
    );
    encoder.encodeShortString(
      payload.args.exchange !== undefined ? payload.args.exchange : ""
    );
    encoder.encodeShortString(
      payload.args.routingKey !== undefined ? payload.args.routingKey : ""
    );
    encoder.encodeBit(
      payload.args.mandatory !== undefined ? payload.args.mandatory : false
    );
    encoder.encodeBit(
      payload.args.immediate !== undefined ? payload.args.immediate : false
    );
    return encoder.bytes();
  }

  if (payload.classId === 60 && payload.methodId === 50) {
    const encoder = createEncoder();
    encoder.encodeShortUint(60);
    encoder.encodeShortUint(50);
    encoder.encodeShortUint(payload.args.replyCode);
    encoder.encodeShortString(
      payload.args.replyText !== undefined ? payload.args.replyText : ""
    );
    encoder.encodeShortString(payload.args.exchange);
    encoder.encodeShortString(payload.args.routingKey);
    return encoder.bytes();
  }

  if (payload.classId === 60 && payload.methodId === 60) {
    const encoder = createEncoder();
    encoder.encodeShortUint(60);
    encoder.encodeShortUint(60);
    encoder.encodeShortString(payload.args.consumerTag);
    encoder.encodeLongLongUint(payload.args.deliveryTag);
    encoder.encodeBit(
      payload.args.redelivered !== undefined ? payload.args.redelivered : false
    );
    encoder.encodeShortString(payload.args.exchange);
    encoder.encodeShortString(payload.args.routingKey);
    return encoder.bytes();
  }

  if (payload.classId === 60 && payload.methodId === 70) {
    const encoder = createEncoder();
    encoder.encodeShortUint(60);
    encoder.encodeShortUint(70);
    encoder.encodeShortUint(
      payload.args.ticket !== undefined ? payload.args.ticket : 0
    );
    encoder.encodeShortString(
      payload.args.queue !== undefined ? payload.args.queue : ""
    );
    encoder.encodeBit(
      payload.args.noAck !== undefined ? payload.args.noAck : false
    );
    return encoder.bytes();
  }

  if (payload.classId === 60 && payload.methodId === 71) {
    const encoder = createEncoder();
    encoder.encodeShortUint(60);
    encoder.encodeShortUint(71);
    encoder.encodeLongLongUint(payload.args.deliveryTag);
    encoder.encodeBit(
      payload.args.redelivered !== undefined ? payload.args.redelivered : false
    );
    encoder.encodeShortString(payload.args.exchange);
    encoder.encodeShortString(payload.args.routingKey);
    encoder.encodeLongUint(payload.args.messageCount);
    return encoder.bytes();
  }

  if (payload.classId === 60 && payload.methodId === 72) {
    const encoder = createEncoder();
    encoder.encodeShortUint(60);
    encoder.encodeShortUint(72);
    encoder.encodeShortString(
      payload.args.clusterId !== undefined ? payload.args.clusterId : ""
    );
    return encoder.bytes();
  }

  if (payload.classId === 60 && payload.methodId === 80) {
    const encoder = createEncoder();
    encoder.encodeShortUint(60);
    encoder.encodeShortUint(80);
    encoder.encodeLongLongUint(
      payload.args.deliveryTag !== undefined ? payload.args.deliveryTag : 0
    );
    encoder.encodeBit(
      payload.args.multiple !== undefined ? payload.args.multiple : false
    );
    return encoder.bytes();
  }

  if (payload.classId === 60 && payload.methodId === 90) {
    const encoder = createEncoder();
    encoder.encodeShortUint(60);
    encoder.encodeShortUint(90);
    encoder.encodeLongLongUint(payload.args.deliveryTag);
    encoder.encodeBit(
      payload.args.requeue !== undefined ? payload.args.requeue : true
    );
    return encoder.bytes();
  }

  if (payload.classId === 60 && payload.methodId === 100) {
    const encoder = createEncoder();
    encoder.encodeShortUint(60);
    encoder.encodeShortUint(100);
    encoder.encodeBit(
      payload.args.requeue !== undefined ? payload.args.requeue : false
    );
    return encoder.bytes();
  }

  if (payload.classId === 60 && payload.methodId === 110) {
    const encoder = createEncoder();
    encoder.encodeShortUint(60);
    encoder.encodeShortUint(110);
    encoder.encodeBit(
      payload.args.requeue !== undefined ? payload.args.requeue : false
    );
    return encoder.bytes();
  }

  if (payload.classId === 60 && payload.methodId === 111) {
    const encoder = createEncoder();
    encoder.encodeShortUint(60);
    encoder.encodeShortUint(111);

    return encoder.bytes();
  }

  if (payload.classId === 60 && payload.methodId === 120) {
    const encoder = createEncoder();
    encoder.encodeShortUint(60);
    encoder.encodeShortUint(120);
    encoder.encodeLongLongUint(
      payload.args.deliveryTag !== undefined ? payload.args.deliveryTag : 0
    );
    encoder.encodeBit(
      payload.args.multiple !== undefined ? payload.args.multiple : false
    );
    encoder.encodeBit(
      payload.args.requeue !== undefined ? payload.args.requeue : true
    );
    return encoder.bytes();
  }

  if (payload.classId === 90 && payload.methodId === 10) {
    const encoder = createEncoder();
    encoder.encodeShortUint(90);
    encoder.encodeShortUint(10);

    return encoder.bytes();
  }

  if (payload.classId === 90 && payload.methodId === 11) {
    const encoder = createEncoder();
    encoder.encodeShortUint(90);
    encoder.encodeShortUint(11);

    return encoder.bytes();
  }

  if (payload.classId === 90 && payload.methodId === 20) {
    const encoder = createEncoder();
    encoder.encodeShortUint(90);
    encoder.encodeShortUint(20);

    return encoder.bytes();
  }

  if (payload.classId === 90 && payload.methodId === 21) {
    const encoder = createEncoder();
    encoder.encodeShortUint(90);
    encoder.encodeShortUint(21);

    return encoder.bytes();
  }

  if (payload.classId === 90 && payload.methodId === 30) {
    const encoder = createEncoder();
    encoder.encodeShortUint(90);
    encoder.encodeShortUint(30);

    return encoder.bytes();
  }

  if (payload.classId === 90 && payload.methodId === 31) {
    const encoder = createEncoder();
    encoder.encodeShortUint(90);
    encoder.encodeShortUint(31);

    return encoder.bytes();
  }

  if (payload.classId === 85 && payload.methodId === 10) {
    const encoder = createEncoder();
    encoder.encodeShortUint(85);
    encoder.encodeShortUint(10);
    encoder.encodeBit(
      payload.args.nowait !== undefined ? payload.args.nowait : false
    );
    return encoder.bytes();
  }

  if (payload.classId === 85 && payload.methodId === 11) {
    const encoder = createEncoder();
    encoder.encodeShortUint(85);
    encoder.encodeShortUint(11);

    return encoder.bytes();
  }
} 
