import {
  Header,
  Method,
  AmqpReaderWriter,
  Frame
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
import {
  encodeArgs,
  encodeProps,
  decodeArgs,
  decodeProps
} from "./framing/method_encoder.ts";

type ExtractReceiveMethod<T extends number, U extends number> = Extract<
  ReceiveMethod,
  { classId: T; methodId: U }
>;
type ExtractSendMethod<T extends number, U extends number> = Extract<
  SendMethod,
  { classId: T; methodId: U }
>;

export type Handler<T extends ReceiveMethod> = (
  args: T["args"],
  props: T extends { props: any } ? T["props"] : never,
  data: T extends { data: Uint8Array } ? T["data"] : never
) => void;

export type ErrorHandler = (error: Error) => void;

interface Subscriber {
  classId: number;
  methodId: number;
  handler: Handler<any>;
  error: ErrorHandler;
}

export interface Subscription {
  (): void;
}

type ContentArgs = { props: any; data: Uint8Array };

type SendArgs<T extends SendMethod> = T extends ContentArgs
  ? [T["args"], T["props"], Uint8Array]
  : [T["args"]];

function noop() {
  // do nothing
}

export class AmqpChannel {
  private subscribers: Subscriber[] = [];
  private method: Method | null = null;
  private header: Header | null = null;
  private args: Record<string, unknown> | null = null;
  private props: Record<string, unknown> | null = null;
  private buffer: Deno.Buffer | null = null;

  constructor(public channel: number, private socket: AmqpReaderWriter) {
    this.subscribe = this.subscribe.bind(this);
    this.receive = this.receive.bind(this);
    this.send = this.send.bind(this);

    socket.subscribe(channel, frame => this.handleFrame(frame));
  }

  private handleFrame(frame: Frame) {
    switch (frame.type) {
      case "header":
        return this.handleHeader(frame.payload);
      case "content":
        return this.handleContent(frame.payload);
      case "method":
        return this.handleMethod(frame.payload);
    }
  }

  private handleMethod(method: Method) {
    const args = decodeArgs(
      new Deno.Buffer(method.args),
      method.classId,
      method.methodId
    );
    if (hasContent(method.classId, method.methodId)) {
      this.method = method;
      this.args = args;
    } else {
      this.subscribers.forEach(sub => {
        if (
          sub.classId === method.classId &&
          sub.methodId === method.methodId
        ) {
          sub.handler(
            args,
            {},
            new Uint8Array([])
          );
        }
      });
    }
  }

  private handleHeader(header: Header) {
    this.header = header;
    this.props = decodeProps(new Deno.Buffer(header.props), header.classId);
    this.buffer = new Deno.Buffer();
  }

  private handleContent(content: Uint8Array) {
    if (
      this.method && this.header &&
      this.buffer
    ) {
      this.buffer.writeSync(content);

      if (this.buffer.length === this.header!.size) {
        this.subscribers.forEach(sub => {
          if (
            this.buffer && sub.classId === this.header!.classId &&
            sub.methodId === this.method!.methodId
          ) {
            const args = this.args;
            const props = this.props;
            const data = this.buffer.bytes();
            this.method = null;
            this.args = null;
            this.header = null;
            this.buffer = null;
            this.props = null;

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

  async send<T extends number, U extends number>(
    classId: T,
    methodId: U,
    ...args: SendArgs<ExtractSendMethod<T, U>>
  ) {
    await this.socket.write(this.channel, {
      type: "method",
      payload: {
        classId,
        methodId,
        args: encodeArgs(
          classId,
          methodId,
          args[0] as any
        )
      }
    });

    if (args.length === 3) {
      const props = args[1] as any;
      const data = args[2];
      await this.socket.write(this.channel, {
        type: "header",
        payload: {
          classId,
          props: encodeProps(classId, props),
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

  subscribe<T extends number, U extends number>(
    classId: T,
    methodId: U,
    handler: Handler<ExtractReceiveMethod<T, U>>,
    onError?: ErrorHandler
  ) {
    const subscriber: Subscriber = {
      classId,
      methodId,
      handler,
      error: onError || noop
    };

    this.subscribers.push(subscriber);

    return () => this.unsubscribe(subscriber);
  }

  async receive<T extends number, U extends number>(
    classId: T,
    methodId: U
  ): Promise<Extract<ReceiveMethod, { classId: T; methodId: U }>["args"]> {
    const frame = await this.socket.read(this.channel);
    if (frame.type !== "method") {
      throw new Error("Expected method, got " + frame.type);
    }

    const method = frame.payload;
    if (method.classId !== classId || method.methodId !== methodId) {
      throw new Error(
        `Expected ${classId}-${methodId}, got ${method.classId}-${method.methodId}`
      );
    }

    const reader = new Deno.Buffer(method.args);
    return decodeArgs(reader, classId, methodId) as any;
  }

  private unsubscribe(subscriber: Subscriber) {
    const index = this.subscribers.indexOf(subscriber);
    if (index !== -1) {
      this.subscribers.splice(index, index + 1);
    }
  }
}
