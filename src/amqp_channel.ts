import type {
  BasicAckArgs,
  BasicCancelArgs,
  BasicCancelOk,
  BasicConsumeArgs,
  BasicConsumeOk,
  BasicDeliver,
  BasicNackArgs,
  BasicProperties,
  BasicPublishArgs,
  BasicQosArgs,
  BasicQosOk,
  BasicRejectArgs,
  BasicReturn,
  ChannelClose,
  ExchangeBindArgs,
  ExchangeBindOk,
  ExchangeDeclareArgs,
  ExchangeDeclareOk,
  ExchangeDeleteArgs,
  ExchangeDeleteOk,
  ExchangeUnbindArgs,
  ExchangeUnbindOk,
  QueueBindArgs,
  QueueBindOk,
  QueueDeclareArgs,
  QueueDeclareOk,
  QueueDeleteArgs,
  QueueDeleteOk,
  QueuePurgeArgs,
  QueuePurgeOk,
  QueueUnbindArgs,
  QueueUnbindOk,
} from "./amqp_types.ts";
import {
  BASIC,
  BASIC_ACK,
  BASIC_CANCEL,
  BASIC_CANCEL_OK,
  BASIC_CONSUME,
  BASIC_CONSUME_OK,
  BASIC_DELIVER,
  BASIC_NACK,
  BASIC_PUBLISH,
  BASIC_QOS,
  BASIC_QOS_OK,
  BASIC_REJECT,
  BASIC_RETURN,
  CHANNEL,
  CHANNEL_CLOSE,
  CHANNEL_CLOSE_OK,
  CONNECTION,
  CONNECTION_CLOSE,
  EXCHANGE,
  EXCHANGE_BIND,
  EXCHANGE_BIND_OK,
  EXCHANGE_DECLARE,
  EXCHANGE_DECLARE_OK,
  EXCHANGE_DELETE,
  EXCHANGE_DELETE_OK,
  EXCHANGE_UNBIND,
  EXCHANGE_UNBIND_OK,
  HARD_ERROR_CONNECTION_FORCED,
  QUEUE,
  QUEUE_BIND,
  QUEUE_BIND_OK,
  QUEUE_DECLARE,
  QUEUE_DECLARE_OK,
  QUEUE_DELETE,
  QUEUE_DELETE_OK,
  QUEUE_PURGE,
  QUEUE_PURGE_OK,
  QUEUE_UNBIND,
  QUEUE_UNBIND_OK,
} from "./amqp_constants.ts";
import { createResolvable, ResolvablePromise } from "./resolvable.ts";
import {
  serializeChannelError,
  serializeConnectionError,
} from "./error_handling.ts";
import {
  AmqpSource,
  ExtractMethod,
  ExtractMethodArgs,
  ExtractProps,
} from "./amqp_multiplexer.ts";
import { OutgoingFrame } from "./amqp_frame.ts";
import { AmqpSocketWriter } from "./amqp_socket.ts";
import { SendMethod } from "./amqp_codec.ts";

export interface BasicDeliverHandler {
  (args: BasicDeliver, props: BasicProperties, data: Uint8Array): void;
}

export interface BasicReturnHandler {
  (args: BasicReturn, props: BasicProperties, data: Uint8Array): void;
}

interface BasicReturnSubscriber {
  type: "return";
  handler: BasicReturnHandler;
}

interface BasicDeliverSubscriber {
  type: "deliver";
  tag?: string;
  handler: BasicDeliverHandler;
}

type Subscriber = BasicReturnSubscriber | BasicDeliverSubscriber;

function splitArray(arr: Uint8Array, size: number): Uint8Array[] {
  const chunks: Uint8Array[] = [];
  let index = 0;

  while (index < arr.length) {
    chunks.push(arr.slice(index, size + index));
    index += size;
  }

  return chunks;
}

export interface AmqpChannelDeps {
  channelNumber: number;
  writer: AmqpSocketWriter;
  mux: AmqpSource;
  frameMax: number;
}

export class AmqpChannel {
  #cancelDeliverSubscription: () => void;
  #cancelReturnSubscription: () => void;
  #subscribers: Subscriber[] = [];
  #channelNumber: number;
  #closedPromise: ResolvablePromise<void> = createResolvable();
  #isOpen = true;
  #mux: AmqpSource;
  #pending: OutgoingFrame[] = [];
  #writing = false;

  #write = async (...frames: OutgoingFrame[]) => {
    this.#pending.push(...frames);

    if (!this.#writing) {
      this.#writing = true;
    }

    let frame = this.#pending.shift();

    while (frame) {
      await this.deps.writer.write(frame);
      frame = this.#pending.shift();
    }

    this.#writing = false;
  };

  #send = <T extends number, U extends number>(
    classId: T,
    methodId: U,
    args: ExtractMethodArgs<T, U>,
  ): Promise<void> => {
    return this.#write({
      type: "method",
      channel: this.#channelNumber,
      payload: {
        classId,
        methodId,
        args,
      } as SendMethod,
    });
  };

  #receive = <T extends number, U extends number>(
    classId: T,
    methodId: U,
  ): Promise<ExtractMethod<T, U>> => {
    return this.#mux.receive(this.#channelNumber, classId, methodId);
  };

  receiveContent = <T extends number>(
    classId: T,
  ): Promise<[ExtractProps<T>, Uint8Array]> => {
    return this.#mux.receiveContent(this.#channelNumber, classId);
  };

  constructor(private deps: AmqpChannelDeps) {
    this.#mux = deps.mux;
    this.#channelNumber = deps.channelNumber;

    this.#cancelDeliverSubscription = deps.mux.subscribe(
      deps.channelNumber,
      BASIC,
      BASIC_DELIVER,
      async (args) => {
        const [props, content] = await deps.mux.receiveContent(
          deps.channelNumber,
          BASIC,
        );
        return this.#handleDeliver(args, props, content);
      },
    );

    this.#cancelReturnSubscription = deps.mux.subscribe(
      deps.channelNumber,
      BASIC,
      BASIC_RETURN,
      async (args) => {
        const [props, content] = await deps.mux.receiveContent(
          deps.channelNumber,
          BASIC,
        );
        return this.#handleReturn(args, props, content);
      },
    );

    this.#receive(CHANNEL, CHANNEL_CLOSE)
      .then(this.#handleClose)
      .catch(this.#handleCloseError)
      .finally(() => {
        this.#isOpen = false;
      });

    deps.mux.receive(0, CONNECTION, CONNECTION_CLOSE)
      .then(this.#handleConnectionClose)
      .catch(this.#handleCloseError)
      .finally(() => {
        this.#isOpen = false;
      });
  }

  #handleCloseError = (error: Error) => {
    this.#cleanup();
    this.#closedPromise.reject(error);
  };

  #handleClose = async (args: ChannelClose) => {
    if (this.#isOpen) {
      await this.#send(CHANNEL, CHANNEL_CLOSE_OK, {});
      this.#cleanup();
      this.#closedPromise.reject(
        new Error(serializeChannelError(this.#channelNumber, args)),
      );
    }
  };

  #handleConnectionClose = (args: ChannelClose) => {
    if (this.#isOpen) {
      this.#cleanup();
      this.#closedPromise.reject(
        new Error(serializeConnectionError(args)),
      );
    }
  };

  #handleDeliver = (
    args: BasicDeliver,
    props: BasicProperties,
    data: Uint8Array,
  ) => {
    this.#subscribers.forEach((subscriber) => {
      if (
        subscriber.type === "deliver" && subscriber.tag === args.consumerTag
      ) {
        subscriber.handler(args, props, data);
      }
    });
  };

  #handleReturn = (
    args: BasicReturn,
    props: BasicProperties,
    data: Uint8Array,
  ) => {
    this.#subscribers.forEach((subscriber) => {
      if (subscriber.type === "return") {
        subscriber.handler(args, props, data);
      }
    });
  };

  #cleanup = () => {
    this.#cancelDeliverSubscription();
    this.#cancelReturnSubscription();
    this.#subscribers.splice(0, this.#subscribers.length);
  };

  async closed() {
    return await this.#closedPromise;
  }

  async close() {
    await this.#send(
      CHANNEL,
      CHANNEL_CLOSE,
      {
        classId: 0,
        methodId: 0,
        replyCode: HARD_ERROR_CONNECTION_FORCED,
        replyText: "Channel closed by client",
      },
    );
    await this.#receive(CHANNEL, CHANNEL_CLOSE_OK);
    this.#cleanup();
    this.#closedPromise.resolve();
    this.#isOpen = false;
  }

  async qos(args: BasicQosArgs): Promise<BasicQosOk> {
    await this.#send(BASIC, BASIC_QOS, args);
    return this.#receive(BASIC, BASIC_QOS_OK);
  }

  async ack(args: BasicAckArgs) {
    await this.#send(BASIC, BASIC_ACK, args);
  }

  async nack(args: BasicNackArgs) {
    await this.#send(BASIC, BASIC_NACK, args);
  }

  async reject(args: BasicRejectArgs) {
    await this.#send(BASIC, BASIC_REJECT, args);
  }

  async consume(
    args: BasicConsumeArgs,
    handler: BasicDeliverHandler,
  ): Promise<BasicConsumeOk> {
    await this.#send(BASIC, BASIC_CONSUME, {
      ...args,
      nowait: false,
    });

    const response = await this.#receive(
      BASIC,
      BASIC_CONSUME_OK,
    );

    this.#subscribers.push(
      { type: "deliver", tag: response.consumerTag, handler },
    );

    return response;
  }

  async cancel(args: BasicCancelArgs): Promise<BasicCancelOk> {
    await this.#send(BASIC, BASIC_CANCEL, { ...args, nowait: false });
    const response = await this.#receive(BASIC, BASIC_CANCEL_OK);

    const index = this.#subscribers.findIndex((sub) =>
      sub.type === "deliver" && sub.tag === args.consumerTag
    );
    if (index !== -1) {
      this.#subscribers.splice(index, index + 1);
    }

    return response;
  }

  async publish(
    args: BasicPublishArgs,
    props: BasicProperties,
    data: Uint8Array,
  ): Promise<void> {
    const frames: Array<OutgoingFrame> = [
      {
        type: "method",
        channel: this.#channelNumber,
        payload: {
          classId: BASIC,
          methodId: BASIC_PUBLISH,
          args,
        },
      },
      {
        type: "header",
        channel: this.#channelNumber,
        payload: {
          classId: BASIC,
          props,
          size: data.byteLength,
        },
      },
    ];

    if (data.byteLength > 0) {
      const chunks = splitArray(data, this.deps.frameMax - 8);
      for (const chunk of chunks) {
        frames.push({
          type: "content",
          channel: this.#channelNumber,
          payload: chunk,
        });
      }
    }

    await this.#write(...frames);
  }

  async declareQueue(args: QueueDeclareArgs): Promise<QueueDeclareOk> {
    await this.#send(QUEUE, QUEUE_DECLARE, { ...args, nowait: false });
    return this.#receive(QUEUE, QUEUE_DECLARE_OK);
  }

  async deleteQueue(args: QueueDeleteArgs): Promise<QueueDeleteOk> {
    await this.#send(QUEUE, QUEUE_DELETE, { ...args, nowait: false });
    return this.#receive(QUEUE, QUEUE_DELETE_OK);
  }

  async bindQueue(args: QueueBindArgs): Promise<QueueBindOk> {
    await this.#send(QUEUE, QUEUE_BIND, { ...args, nowait: false });
    return this.#receive(QUEUE, QUEUE_BIND_OK);
  }

  async unbindQueue(args: QueueUnbindArgs): Promise<QueueUnbindOk> {
    await this.#send(QUEUE, QUEUE_UNBIND, args);
    return this.#receive(QUEUE, QUEUE_UNBIND_OK);
  }

  async purgeQueue(args: QueuePurgeArgs): Promise<QueuePurgeOk> {
    await this.#send(QUEUE, QUEUE_PURGE, { ...args, nowait: false });
    return this.#receive(QUEUE, QUEUE_PURGE_OK);
  }

  async deleteExchange(
    args: ExchangeDeleteArgs,
  ): Promise<ExchangeDeleteOk> {
    await this.#send(EXCHANGE, EXCHANGE_DELETE, { ...args, nowait: false });
    return this.#receive(EXCHANGE, EXCHANGE_DELETE_OK);
  }

  async declareExchange(
    args: ExchangeDeclareArgs,
  ): Promise<ExchangeDeclareOk> {
    await this.#send(EXCHANGE, EXCHANGE_DECLARE, { ...args, nowait: false });
    return this.#receive(EXCHANGE, EXCHANGE_DECLARE_OK);
  }

  async bindExchange(args: ExchangeBindArgs): Promise<ExchangeBindOk> {
    await this.#send(EXCHANGE, EXCHANGE_BIND, { ...args, nowait: false });
    return this.#receive(EXCHANGE, EXCHANGE_BIND_OK);
  }

  async unbindExchange(args: ExchangeUnbindArgs): Promise<ExchangeUnbindOk> {
    await this.#send(EXCHANGE, EXCHANGE_UNBIND, { ...args, nowait: false });
    return this.#receive(EXCHANGE, EXCHANGE_UNBIND_OK);
  }

  on(event: "deliver", handler: BasicDeliverHandler): void;
  on(event: "return", handler: BasicReturnHandler): void;
  on(
    event: "return" | "deliver",
    handler: BasicReturnHandler | BasicDeliverHandler,
  ): void {
    switch (event) {
      case "return":
        this.#subscribers.push(
          { type: "return", handler: handler as BasicReturnHandler },
        );
        break;
      case "deliver":
        this.#subscribers.push(
          { type: "deliver", handler: handler as BasicDeliverHandler },
        );
        break;
      default:
        throw new Error(`Unknown event '${event}'`);
    }
  }

  off(event: "deliver", handler: BasicDeliverHandler): void;
  off(event: "return", handler: BasicReturnHandler): void;
  off(
    event: "deliver" | "return",
    handler: BasicDeliverHandler | BasicReturnHandler,
  ): void {
    const index = this.#subscribers.findIndex((sub) =>
      sub.type === event && sub.handler === handler
    );
    if (index !== -1) {
      this.#subscribers.splice(index, index + 1);
    }
  }
}
