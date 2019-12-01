import { AmqpProtocol, IncomingFrame } from "./framing/mod.ts";
import {
  QueueDeclareArgs,
  ExchangeDeclareArgs
} from "./framing/method_encoder.ts";
import {
  QueueDeclareOkArgs,
  ExchangeDeclareOkArgs,
  BasicDeliverArgs
} from "./framing/method_decoder.ts";
import { BASIC, BASIC_DELIVER, BASIC_PUBLISH, FRAME_METHOD, FRAME_HEADER, FRAME_BODY } from "./framing/constants.ts";
import { HeaderFrame, ContentFrame } from "./framing/frame_decoder.ts";

export interface AmqpChannelOptions {
  channelNumber: number;
}

export interface AmqpChannel {
  declareQueue(args: QueueDeclareArgs): Promise<QueueDeclareOkArgs>;
  declareExchange(args: ExchangeDeclareArgs): Promise<ExchangeDeclareOkArgs>;
  consume(queue: string, handler: (message: Message) => void): Promise<void>;
  publish(exchange: string, routingKey: string): Promise<void>;
}

export interface Message {
  exchange: string;
  redelivered: boolean;
  routingKey: string;
  payload: Uint8Array;
}

function toHexString(byteArray: Uint8Array) {
  return Array.from(byteArray, byte => {
    return ("0" + (byte & 0xff).toString(16)).slice(-2);
  }).join("");
}

class Consumer {
  constructor(
    public tag: string,
    private handler: (message: Message) => void
  ) {}

  handleHeader(frame: HeaderFrame) {}
  handleContent(frame: ContentFrame) {}
  handleDeliver(args: BasicDeliverArgs) {}
}

function createConsumer(
  channel: number,
  tag: string,
  handler: (msg: Message) => void
) {
  let args: BasicDeliverArgs | null = null;
  let header: HeaderFrame | null = null;

  return (frame: IncomingFrame) => {
    if (frame.channel !== channel) {
      return;
    }

    if (
      frame.type === FRAME_METHOD &&
      frame.classId === BASIC &&
      frame.methodId === BASIC_DELIVER &&
      frame.args.consumerTag === tag
    ) {
      args = frame.args;
      header = null;
    }

    if (frame.type === FRAME_HEADER && args !== null) {
      console.log("Receiving shizzle header");
      console.log(JSON.stringify(frame, null, 2));
      header = frame;
      if (header.size === 0) {
        handler({
          exchange: args.exchange,
          payload: new Uint8Array([]),
          redelivered: args.redelivered,
          routingKey: args.routingKey
        });

        header = null;
        args = null;
      }
    }

    if (frame.type === FRAME_BODY && args !== null && header !== null) {
      if (header.size === frame.payload.length) {
        handler({
          exchange: args.exchange,
          payload: frame.payload,
          redelivered: args.redelivered,
          routingKey: args.routingKey
        });

        header = null;
        args = null;
      } else {
        throw new Error(`Cannot handle split frames yet`);
      }
    }
  };
}

export function createChannel(
  channel: number,
  amqp: AmqpProtocol
): AmqpChannel {
  const consumers: ((frame: IncomingFrame) => void)[] = [];

  amqp.listen(frame => {
    if (frame.channel !== channel) {
      return;
    }

    consumers.forEach(consumer => consumer(frame));
  });

  async function consume(queue: string, handler: (message: Message) => void) {
    const { consumerTag } = await amqp.basic.consume(channel, {
      queue
    });

    const consumer = createConsumer(channel, consumerTag, handler);
    consumers.push(consumer);
  }

  async function publish(exchange: string, routingKey: string) {
    await amqp.basic.publish(
      channel,
      {
        exchange,
        routingKey
      },
      { "content-type": "application/json" },
      new Uint8Array([67])
    );
    // await amqp.send({
    //   type: "content",
    //   channel,
    //   payload
    // })
    // amqp.send({ channel, })
    // await amqp.basic.deliver(channel, {  })
  }

  return {
    declareQueue: args => amqp.queue.declare(channel, args),
    declareExchange: args => amqp.exchange.declare(channel, args),
    consume,
    publish
  };
}
