import {
  MethodFrame,
  ContentFrame,
  HeaderFrame,
  AmqpSocket,
  Header,
  Method
} from "./framing/socket.ts";
import {
  SendMethod,
  ReceiveMethod,
  ChannelOpenArgs,
  ChannelCloseArgs
} from "./amqp_types.ts";
import { hasContent } from "./amqp_helpers.ts";
import {
  CHANNEL,
  CHANNEL_CLOSE,
  CHANNEL_CLOSE_OK,
  CHANNEL_OPEN,
  CHANNEL_OPEN_OK
} from "./amqp_constants.ts";

export type Handler<T extends ReceiveMethod> = (
  args: T["args"],
  props: T extends { props: any } ? T["props"] : never,
  data: T extends { data: Uint8Array } ? T["data"] : never
) => void;

interface Subscriber {
  classId: number;
  methodId: number;
  handler: Handler<any>;
}

export interface Subscription {
  (): void;
}

type ContentArgs = { props: any; data: Uint8Array };

type SendArgs<T extends SendMethod> = T extends ContentArgs
  ? [T["args"], T["props"], Uint8Array]
  : [T["args"]];

export class AmqpChannel {
  private subscribers: Subscriber[] = [];
  private method: MethodFrame["payload"] | null = null;
  private header: HeaderFrame["payload"] | null = null;
  private buffer: Deno.Buffer | null = null;

  constructor(public channel: number, private socket: AmqpSocket) {
    this.on = this.on.bind(this);
    this.receive = this.receive.bind(this);
    this.send = this.send.bind(this);

    socket.on(channel, frame => {
      switch (frame.type) {
        case "header":
          return this.handleHeader(frame.payload);
        case "content":
          return this.handleContent(frame.payload);
        case "method":
          return this.handleMethod(frame.payload);
      }
    });
  }

  private handleMethod(method: Method) {
    if (hasContent(method.classId, method.methodId)) {
      this.method = method;
    } else {
      this.subscribers.forEach(sub => {
        if (sub.classId === method.classId &&
          sub.methodId === method.methodId)
        {
          sub.handler(method.args, {}, new Uint8Array([]));
        }
      });
    }
  }

  private handleHeader(header: Header) {
    this.header = header;
    this.buffer = new Deno.Buffer();
  }

  private handleContent(content: Uint8Array) {
    if (this.method && this.header &&
      this.buffer)
    {
      this.buffer.writeSync(content);

      if (this.buffer.length === this.header!.size) {
        this.subscribers.forEach(sub => {
          if (this.buffer && sub.classId === this.header!.classId &&
            sub.methodId === this.method!.methodId)
          {
            const args = this.method!.args;
            const props = this.header!.props;
            const data = this.buffer.bytes();
            this.method = null;
            this.header = null;
            this.buffer = null;

            sub.handler(args, props, data);
          }
        });
      }
    }
  }

  async open(args: ChannelOpenArgs) {
    await this.send(CHANNEL, CHANNEL_OPEN, args);
    return this.receive(CHANNEL, CHANNEL_OPEN_OK);
  }

  async close(args: ChannelCloseArgs) {
    await this.send(CHANNEL, CHANNEL_CLOSE, args);
    return this.receive(CHANNEL, CHANNEL_CLOSE_OK);
  }

  push(frame: MethodFrame | ContentFrame | HeaderFrame): void {
    if (frame.type === "method") {
      if (hasContent(frame.payload.classId, frame.payload.methodId)) {
        this.method = frame.payload;
      } else {
        this.subscribers.forEach(sub => {
          if (sub.classId === frame.payload.classId &&
            sub.methodId === frame.payload.methodId)
          {
            sub.handler(frame.payload.args, {}, new Uint8Array([]));
          }
        });
      }
    }

    if (frame.type === "header") {
    }
  }

  async send<T extends number, U extends number>(
    classId: T,
    methodId: U,
    ...args: SendArgs<Extract<SendMethod, { classId: T; methodId: U }>>
  ) {
    await this.socket.write(this.channel, {
      type: "method",
      payload: { classId, methodId, args: args[0] }
    });

    if (args.length === 3) {
      const [_, props, data] = args;
      await this.socket.write(this.channel, {
        type: "header",
        payload: {
          classId,
          props,
          weight: 0,
          size: data.length
        }
      });

      await this.socket.write(
        this.channel,
        { type: "content", payload: data }
      );
    }
  }

  on<T extends number, U extends number>(
    classId: T,
    methodId: U,
    handler: Handler<Extract<ReceiveMethod, { classId: T; methodId: U }>>
  ) {
    const subscriber = {
      classId,
      methodId,
      handler
    };

    this.subscribers.push(subscriber);

    const cancel = () => this.unsubscribe(subscriber);
    return cancel;
  }

  async receive<T extends number, U extends number>(
    classId: T,
    methodId: U
  ): Promise<Extract<ReceiveMethod, { classId: T; methodId: U }>["args"]> {
      const frame = await this.socket.read(this.channel);
      if(frame.type !== "method") {
        throw new Error("Expected method, got " + frame.type)
      }
      if(frame.payload.classId !== classId || frame.payload.methodId !== methodId) {
        throw new Error(`Expected ${classId}-${methodId}, got ${frame.payload.classId}-${frame.payload.methodId}`);
      }

      return frame.payload.args as any;
  }

  private unsubscribe(subscriber: Subscriber) {
    const index = this.subscribers.indexOf(subscriber);
    if (index !== -1) {
      this.subscribers.splice(index, index + 1);
    }
  }
}
