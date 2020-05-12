import {
  BasicProperties,
  BasicQosArgs,
  BasicQosOk,
  BasicAckArgs,
  BasicNackArgs,
  BasicConsumeArgs,
  BasicConsumeOk,
  BasicCancelArgs,
  BasicCancelOk,
  BasicPublishArgs,
  ChannelCloseArgs,
  ChannelCloseOk,
  QueueDeclareArgs,
  QueueDeclareOk,
  ExchangeDeclareArgs,
  ExchangeDeclareOk,
  BasicDeliver,
  QueueDeleteArgs,
  QueueDeleteOk,
  ExchangeDeleteOk,
  ExchangeDeleteArgs,
  QueueBindArgs,
  QueueBindOk,
  QueueUnbindOk,
  QueueUnbindArgs,
  QueuePurgeArgs,
  QueuePurgeOk,
  ExchangeBindArgs,
  ExchangeBindOk,
  ExchangeUnbindArgs,
  ExchangeUnbindOk,
  ChannelClose,
  BasicReturn,
} from "./amqp_types.ts";
import { AmqpProtocol } from "./amqp_protocol.ts";
import { HARD_ERROR_CONNECTION_FORCED } from "./amqp_constants.ts";
import { ResolvablePromise, createResolvable } from "./resolvable.ts";
import {
  serializeChannelError,
  serializeConnectionError,
} from "./error_handling.ts";

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

export class AmqpChannel {
  #cancelDeliverSubscription: () => void;
  #cancelReturnSubscription: () => void;
  #subscribers: Subscriber[] = [];
  #channelNumber: number;
  #protocol: AmqpProtocol;
  #closedPromise: ResolvablePromise<void> = createResolvable();
  #isOpen: boolean = true;

  constructor(
    channelNumber: number,
    protocol: AmqpProtocol,
  ) {
    this.#protocol = protocol;
    this.#channelNumber = channelNumber;

    this.#cancelDeliverSubscription = protocol.subscribeBasicDeliver(
      channelNumber,
      this.#handleDeliver,
    );

    this.#cancelReturnSubscription = protocol.subscribeBasicReturn(
      channelNumber,
      this.#handleReturn,
    );

    protocol.receiveChannelClose(channelNumber)
      .then(this.#handleClose)
      .catch(this.#handleCloseError)
      .finally(() => {
        this.#isOpen = false;
      });

    protocol.receiveConnectionClose(0)
      .then(this.#handleConnectionClose)
      .catch(this.#handleCloseError)
      .finally(() => {
        this.#isOpen = false;
      });
  }

  #handleCloseError = async (error: Error) => {
    this.#cleanup();
    this.#closedPromise.reject(error);
  };

  #handleClose = async (args: ChannelClose) => {
    if (this.#isOpen) {
      await this.#protocol.sendChannelCloseOk(this.#channelNumber, {});
      this.#cleanup();
      this.#closedPromise.reject(
        new Error(serializeChannelError(this.#channelNumber, args)),
      );
    }
  };

  #handleConnectionClose = async (args: ChannelClose) => {
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
    await this.#protocol.sendChannelClose(
      this.#channelNumber,
      {
        classId: 0,
        methodId: 0,
        replyCode: HARD_ERROR_CONNECTION_FORCED,
        replyText: "Channel closed by client",
      },
    );
    this.#cleanup();
    this.#closedPromise.resolve();
    this.#isOpen = false;
  }

  async qos(args: BasicQosArgs): Promise<BasicQosOk> {
    return this.#protocol.sendBasicQos(this.#channelNumber, args);
  }

  async ack(args: BasicAckArgs) {
    await this.#protocol.sendBasicAck(this.#channelNumber, args);
  }

  async nack(args: BasicNackArgs) {
    await this.#protocol.sendBasicNack(this.#channelNumber, args);
  }

  async consume(
    args: BasicConsumeArgs,
    handler: BasicDeliverHandler,
  ): Promise<BasicConsumeOk> {
    const response = await this.#protocol.sendBasicConsume(
      this.#channelNumber,
      args,
    );

    this.#subscribers.push(
      { type: "deliver", tag: response.consumerTag, handler },
    );

    return response;
  }

  async cancel(args: BasicCancelArgs): Promise<BasicCancelOk> {
    const response = await this.#protocol.sendBasicCancel(
      this.#channelNumber,
      args,
    );

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
    await this.#protocol.sendBasicPublish(
      this.#channelNumber,
      args,
      props,
      data,
    );
  }

  async declareQueue(args: QueueDeclareArgs): Promise<QueueDeclareOk> {
    return this.#protocol.sendQueueDeclare(this.#channelNumber, args);
  }

  async deleteQueue(args: QueueDeleteArgs): Promise<QueueDeleteOk> {
    return this.#protocol.sendQueueDelete(this.#channelNumber, args);
  }

  async bindQueue(args: QueueBindArgs): Promise<QueueBindOk> {
    return this.#protocol.sendQueueBind(this.#channelNumber, args);
  }

  async unbindQueue(args: QueueUnbindArgs): Promise<QueueUnbindOk> {
    return this.#protocol.sendQueueUnbind(this.#channelNumber, args);
  }

  async purgeQueue(args: QueuePurgeArgs): Promise<QueuePurgeOk> {
    return this.#protocol.sendQueuePurge(this.#channelNumber, args);
  }

  async deleteExchange(
    args: ExchangeDeleteArgs,
  ): Promise<ExchangeDeleteOk> {
    return this.#protocol.sendExchangeDelete(this.#channelNumber, args);
  }

  async declareExchange(
    args: ExchangeDeclareArgs,
  ): Promise<ExchangeDeclareOk> {
    return this.#protocol.sendExchangeDeclare(this.#channelNumber, args);
  }

  async bindExchange(args: ExchangeBindArgs): Promise<ExchangeBindOk> {
    return this.#protocol.sendExchangeBind(this.#channelNumber, args);
  }

  async unbindExchange(args: ExchangeUnbindArgs): Promise<ExchangeUnbindOk> {
    return this.#protocol.sendExchangeUnbind(this.#channelNumber, args);
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
