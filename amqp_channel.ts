import { AmqpProtocol } from "./framing/mod.ts";
import {
  QueueDeclareArgs,
  ExchangeDeclareArgs
} from "./framing/method_encoder.ts";
import {
  QueueDeclareOkArgs,
  ExchangeDeclareOkArgs,
  BasicDeliverArgs
} from "./framing/method_decoder.ts";
import { BASIC, BASIC_DELIVER } from "./framing/constants.ts";
import { HeaderFrame, ContentFrame } from "./framing/frame_decoder.ts";

export interface AmqpChannelOptions {
  channelNumber: number;
}

export interface AmqpChannel {
  declareQueue(args: QueueDeclareArgs): Promise<QueueDeclareOkArgs>;
  declareExchange(args: ExchangeDeclareArgs): Promise<ExchangeDeclareOkArgs>;
  consume(queue: string, handler: (message: Message) => void): Promise<void>;
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

interface Consumer {
  tag: string;
  handler(message: Message): void;
  header(frame: HeaderFrame): void;
  content(frame: ContentFrame): void;
}

function createConsumer(
  tag: string,
  handler: (message: Message) => void
): Consumer {
  function onDeliver(args: BasicDeliverArgs) {}
  function onHeader(frame: HeaderFrame) {}

  function onContent(frame: ContentFrame) {}

  return {
    tag,
    handler,
    content: onContent,
    header: onHeader
  };
}

export function createChannel(
  channel: number,
  amqp: AmqpProtocol
): AmqpChannel {
  const consumers: Consumer[] = [];

  amqp.listen(frame => {
    if (frame.channel !== channel) {
      return;
    }

    if (
      frame.type === "method" &&
      frame.classId === BASIC &&
      frame.methodId === BASIC_DELIVER
    ) {
      frame.args.
      // consumers.filter(consumer => consumer.tag === frame.args.consumerTag).forEach(consumer => {
      //   consumer.he
      //  });
    }
  });

  return {
    declareQueue: args => amqp.queue.declare(channel, args),
    declareExchange: args => amqp.exchange.declare(channel, args),
    consume: async (queue, handler) => {
      const { consumerTag } = await amqp.basic.consume(channel, {
        queue
      });

      let buffer: Deno.Buffer = null;
      let args: BasicDeliverArgs;
      let header: HeaderFrame;

      const unsubscribe = amqp.listen(frame => {
        if (frame.channel !== channel) {
          return;
        }

        if (
          frame.type === "method" &&
          frame.classId === BASIC &&
          frame.methodId === BASIC_DELIVER &&
          frame.args.consumerTag === consumerTag
        ) {
          const deliveryTag = toHexString(frame.args.deliveryTag);
          args = frame.args;
          console.log("Received deliver", deliveryTag);
        }

        if (frame.type === "header") {
          console.log("Received header");
          console.log(
            JSON.stringify({
              ...frame
            })
          );
          buffer = new Deno.Buffer();
          header = frame;
        }

        if (frame.type === "content") {
          console.log("Received content");
          console.log(JSON.stringify({ ...frame }));
          buffer.writeSync(frame.payload);

          handler({
            exchange: args.exchange,
            routingKey: args.routingKey,
            redelivered: args.redelivered,
            // properties: header.payload,
            payload: buffer.bytes()
          });

          args = null;
          header = null;
          buffer = null;
        }
      });
    }
  };
}
