import * as incoming from "./framing/method_encoder.ts";
import * as outgoing from "./framing/method_decoder.ts";
import { AmqpSocket } from "./framing/socket.ts";

export interface ConnectionMethods {
  start(
    args: incoming.ConnectionStartArgs
  ): Promise<outgoing.ConnectionStartOkArgs>;
  secure(
    args: incoming.ConnectionSecureArgs
  ): Promise<outgoing.ConnectionSecureOkArgs>;
  tune(
    args: incoming.ConnectionTuneArgs
  ): Promise<outgoing.ConnectionTuneOkArgs>;
  open(
    args: incoming.ConnectionOpenArgs
  ): Promise<outgoing.ConnectionOpenOkArgs>;
  close(
    args: incoming.ConnectionCloseArgs
  ): Promise<outgoing.ConnectionCloseOkArgs>;
  updateSecret(
    args: incoming.ConnectionUpdateSecretArgs
  ): Promise<outgoing.ConnectionUpdateSecretOkArgs>;
}

export function initConnection(
  channel: number,
  socket: AmqpSocket
): ConnectionMethods {
  return {
    async start(args: incoming.ConnectionStartArgs) {
      await socket.send(channel, {
        classId: 10,
        methodId: 10,
        args
      });

      return socket.receive(channel, {
        classId: 10,
        methodId: 11
      });
    },
    async secure(args: incoming.ConnectionSecureArgs) {
      await socket.send(channel, {
        classId: 10,
        methodId: 20,
        args
      });

      return socket.receive(channel, {
        classId: 10,
        methodId: 21
      });
    },
    async tune(args: incoming.ConnectionTuneArgs) {
      await socket.send(channel, {
        classId: 10,
        methodId: 30,
        args
      });

      return socket.receive(channel, {
        classId: 10,
        methodId: 31
      });
    },
    async open(args: incoming.ConnectionOpenArgs) {
      await socket.send(channel, {
        classId: 10,
        methodId: 40,
        args
      });

      return socket.receive(channel, {
        classId: 10,
        methodId: 41
      });
    },
    async close(args: incoming.ConnectionCloseArgs) {
      await socket.send(channel, {
        classId: 10,
        methodId: 50,
        args
      });

      return socket.receive(channel, {
        classId: 10,
        methodId: 51
      });
    },
    async updateSecret(args: incoming.ConnectionUpdateSecretArgs) {
      await socket.send(channel, {
        classId: 10,
        methodId: 70,
        args
      });

      return socket.receive(channel, {
        classId: 10,
        methodId: 71
      });
    }
  };
}
export interface ChannelMethods {
  open(args: incoming.ChannelOpenArgs): Promise<outgoing.ChannelOpenOkArgs>;
  flow(args: incoming.ChannelFlowArgs): Promise<outgoing.ChannelFlowOkArgs>;
  close(args: incoming.ChannelCloseArgs): Promise<outgoing.ChannelCloseOkArgs>;
}

export function initChannel(
  channel: number,
  socket: AmqpSocket
): ChannelMethods {
  return {
    async open(args: incoming.ChannelOpenArgs) {
      await socket.send(channel, {
        classId: 20,
        methodId: 10,
        args
      });

      return socket.receive(channel, {
        classId: 20,
        methodId: 11
      });
    },
    async flow(args: incoming.ChannelFlowArgs) {
      await socket.send(channel, {
        classId: 20,
        methodId: 20,
        args
      });

      return socket.receive(channel, {
        classId: 20,
        methodId: 21
      });
    },
    async close(args: incoming.ChannelCloseArgs) {
      await socket.send(channel, {
        classId: 20,
        methodId: 40,
        args
      });

      return socket.receive(channel, {
        classId: 20,
        methodId: 41
      });
    }
  };
}
export interface AccessMethods {
  request(
    args: incoming.AccessRequestArgs
  ): Promise<outgoing.AccessRequestOkArgs>;
}

export function initAccess(channel: number, socket: AmqpSocket): AccessMethods {
  return {
    async request(args: incoming.AccessRequestArgs) {
      await socket.send(channel, {
        classId: 30,
        methodId: 10,
        args
      });

      return socket.receive(channel, {
        classId: 30,
        methodId: 11
      });
    }
  };
}
export interface ExchangeMethods {
  declare(
    args: incoming.ExchangeDeclareArgs
  ): Promise<outgoing.ExchangeDeclareOkArgs>;
  delete(
    args: incoming.ExchangeDeleteArgs
  ): Promise<outgoing.ExchangeDeleteOkArgs>;
  bind(args: incoming.ExchangeBindArgs): Promise<outgoing.ExchangeBindOkArgs>;
  unbind(
    args: incoming.ExchangeUnbindArgs
  ): Promise<outgoing.ExchangeUnbindOkArgs>;
}

export function initExchange(
  channel: number,
  socket: AmqpSocket
): ExchangeMethods {
  return {
    async declare(args: incoming.ExchangeDeclareArgs) {
      await socket.send(channel, {
        classId: 40,
        methodId: 10,
        args
      });

      return socket.receive(channel, {
        classId: 40,
        methodId: 11
      });
    },
    async delete(args: incoming.ExchangeDeleteArgs) {
      await socket.send(channel, {
        classId: 40,
        methodId: 20,
        args
      });

      return socket.receive(channel, {
        classId: 40,
        methodId: 21
      });
    },
    async bind(args: incoming.ExchangeBindArgs) {
      await socket.send(channel, {
        classId: 40,
        methodId: 30,
        args
      });

      return socket.receive(channel, {
        classId: 40,
        methodId: 31
      });
    },
    async unbind(args: incoming.ExchangeUnbindArgs) {
      await socket.send(channel, {
        classId: 40,
        methodId: 40,
        args
      });

      return socket.receive(channel, {
        classId: 40,
        methodId: 41
      });
    }
  };
}
export interface QueueMethods {
  declare(
    args: incoming.QueueDeclareArgs
  ): Promise<outgoing.QueueDeclareOkArgs>;
  bind(args: incoming.QueueBindArgs): Promise<outgoing.QueueBindOkArgs>;
  purge(args: incoming.QueuePurgeArgs): Promise<outgoing.QueuePurgeOkArgs>;
  delete(args: incoming.QueueDeleteArgs): Promise<outgoing.QueueDeleteOkArgs>;
  unbind(args: incoming.QueueUnbindArgs): Promise<outgoing.QueueUnbindOkArgs>;
}

export function initQueue(channel: number, socket: AmqpSocket): QueueMethods {
  return {
    async declare(args: incoming.QueueDeclareArgs) {
      await socket.send(channel, {
        classId: 50,
        methodId: 10,
        args
      });

      return socket.receive(channel, {
        classId: 50,
        methodId: 11
      });
    },
    async bind(args: incoming.QueueBindArgs) {
      await socket.send(channel, {
        classId: 50,
        methodId: 20,
        args
      });

      return socket.receive(channel, {
        classId: 50,
        methodId: 21
      });
    },
    async purge(args: incoming.QueuePurgeArgs) {
      await socket.send(channel, {
        classId: 50,
        methodId: 30,
        args
      });

      return socket.receive(channel, {
        classId: 50,
        methodId: 31
      });
    },
    async delete(args: incoming.QueueDeleteArgs) {
      await socket.send(channel, {
        classId: 50,
        methodId: 40,
        args
      });

      return socket.receive(channel, {
        classId: 50,
        methodId: 41
      });
    },
    async unbind(args: incoming.QueueUnbindArgs) {
      await socket.send(channel, {
        classId: 50,
        methodId: 50,
        args
      });

      return socket.receive(channel, {
        classId: 50,
        methodId: 51
      });
    }
  };
}
export interface BasicMethods {
  qos(args: incoming.BasicQosArgs): Promise<outgoing.BasicQosOkArgs>;
  consume(
    args: incoming.BasicConsumeArgs
  ): Promise<outgoing.BasicConsumeOkArgs>;
  cancel(args: incoming.BasicCancelArgs): Promise<outgoing.BasicCancelOkArgs>;
  get(args: incoming.BasicGetArgs): Promise<outgoing.BasicGetOkArgs>;
  recover(
    args: incoming.BasicRecoverArgs
  ): Promise<outgoing.BasicRecoverOkArgs>;
}

export function initBasic(channel: number, socket: AmqpSocket): BasicMethods {
  return {
    async qos(args: incoming.BasicQosArgs) {
      await socket.send(channel, {
        classId: 60,
        methodId: 10,
        args
      });

      return socket.receive(channel, {
        classId: 60,
        methodId: 11
      });
    },
    async consume(args: incoming.BasicConsumeArgs) {
      await socket.send(channel, {
        classId: 60,
        methodId: 20,
        args
      });

      return socket.receive(channel, {
        classId: 60,
        methodId: 21
      });
    },
    async cancel(args: incoming.BasicCancelArgs) {
      await socket.send(channel, {
        classId: 60,
        methodId: 30,
        args
      });

      return socket.receive(channel, {
        classId: 60,
        methodId: 31
      });
    },
    async get(args: incoming.BasicGetArgs) {
      await socket.send(channel, {
        classId: 60,
        methodId: 70,
        args
      });

      return socket.receive(channel, {
        classId: 60,
        methodId: 71
      });
    },
    async recover(args: incoming.BasicRecoverArgs) {
      await socket.send(channel, {
        classId: 60,
        methodId: 110,
        args
      });

      return socket.receive(channel, {
        classId: 60,
        methodId: 111
      });
    }
  };
}
export interface TxMethods {
  select(args: incoming.TxSelectArgs): Promise<outgoing.TxSelectOkArgs>;
  commit(args: incoming.TxCommitArgs): Promise<outgoing.TxCommitOkArgs>;
  rollback(args: incoming.TxRollbackArgs): Promise<outgoing.TxRollbackOkArgs>;
}

export function initTx(channel: number, socket: AmqpSocket): TxMethods {
  return {
    async select(args: incoming.TxSelectArgs) {
      await socket.send(channel, {
        classId: 90,
        methodId: 10,
        args
      });

      return socket.receive(channel, {
        classId: 90,
        methodId: 11
      });
    },
    async commit(args: incoming.TxCommitArgs) {
      await socket.send(channel, {
        classId: 90,
        methodId: 20,
        args
      });

      return socket.receive(channel, {
        classId: 90,
        methodId: 21
      });
    },
    async rollback(args: incoming.TxRollbackArgs) {
      await socket.send(channel, {
        classId: 90,
        methodId: 30,
        args
      });

      return socket.receive(channel, {
        classId: 90,
        methodId: 31
      });
    }
  };
}
export interface ConfirmMethods {
  select(
    args: incoming.ConfirmSelectArgs
  ): Promise<outgoing.ConfirmSelectOkArgs>;
}

export function initConfirm(
  channel: number,
  socket: AmqpSocket
): ConfirmMethods {
  return {
    async select(args: incoming.ConfirmSelectArgs) {
      await socket.send(channel, {
        classId: 85,
        methodId: 10,
        args
      });

      return socket.receive(channel, {
        classId: 85,
        methodId: 11
      });
    }
  };
}
