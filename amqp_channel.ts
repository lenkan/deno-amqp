import {
  AmqpReaderWriter,
  Frame
} from "./framing/socket.ts";
import {
  SendMethod,
  ReceiveMethod,
  ChannelOpenArgs,
  ChannelCloseArgs,
  ConnectionStartArgs,
  Header
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
  encodeMethod,
  decodeMethod,
  decodeHeader,
  encodeHeader
} from "./framing/method_encoder.ts";

type ExtractReceiveMethod<T extends number, U extends number> = Extract<
  ReceiveMethod,
  { classId: T; methodId: U }
>;
type ExtractSendMethod<T extends number, U extends number> = Extract<
  SendMethod,
  { classId: T; methodId: U }
>;

type ExtractHeader<T extends number> = Extract<
  Header,
  { classId: T }
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
  private method: ReceiveMethod | null = null;
  private header: Header | null = null;
  private args: Record<string, unknown> | null = null;
  private props: Record<string, unknown> | null = null;
  private buffer: Deno.Buffer | null = null;

  constructor(public channel: number, private socket: AmqpReaderWriter) {
    this.subscribe = this.subscribe.bind(this);
    this.receiveMethod = this.receiveMethod.bind(this);
    this.sendMethod = this.sendMethod.bind(this);

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

  private handleMethod(method: ReceiveMethod) {
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

  async sendMethod(method: SendMethod) {
    await this.socket.write(
      this.channel,
      { type: "method", payload: encodeMethod(method) }
    );
  }

  async sendHeader(header: Header) {
    await this.socket.write(
      this.channel,
      { type: "header", payload: encodeHeader(header) }
    );
  }

  async sendContent(payload: Uint8Array) {
    await this.socket.write(
      this.channel,
      { type: "content", payload }
    );
  }

  async open(args: ChannelOpenArgs) {
    await this.sendMethod({ classId: CHANNEL, methodId: CHANNEL_OPEN, args });
    return this.receiveMethod(CHANNEL, CHANNEL_OPEN_OK);
  }

  async close(args: ChannelCloseArgs) {
    await this.sendMethod({ classId: CHANNEL, methodId: CHANNEL_CLOSE, args });
    return this.receiveMethod(CHANNEL, CHANNEL_CLOSE_OK);
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

  async receiveMethod<T extends number, U extends number>(
    classId: T,
    methodId: U
  ): Promise<Extract<ReceiveMethod, { classId: T; methodId: U }>["args"]> {
    const frame = await this.socket.read(this.channel);
    if (frame.type !== "method") {
      throw new Error("Expected method, got " + frame.type);
    }

    const method = decodeMethod(frame.payload);
    if (method.classId !== classId || method.methodId !== methodId) {
      throw new Error(
        `Expected ${classId}-${methodId}, got ${method.classId}-${method.methodId}`
      );
    }

    return method.args as any;
  }

  async receiveContent<T extends number>(
    classId: T
  ): Promise<Extract<Header, { classId: T }>["props"]> {
    const frame = await this.socket.read(this.channel);
    if (frame.type !== "header") {
      throw new Error("Expected method, got " + frame.type);
    }

    const header = decodeHeader(frame.payload);
    if (header.classId !== classId) {
      throw new Error(
        `Expected ${classId}, got ${header.classId}`
      );
    }

    const buffer = new Deno.Buffer();
  }

  private unsubscribe(subscriber: Subscriber) {
    const index = this.subscribers.indexOf(subscriber);
    if (index !== -1) {
      this.subscribers.splice(index, index + 1);
    }
  }
}
