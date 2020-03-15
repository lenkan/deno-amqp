import {
  Method,
  Header,
  hasContent
} from "../framing/methods.ts";
import {
  MethodFrame,
  ContentFrame,
  HeaderFrame,
  AmqpWriter
} from "../framing/socket.ts";

export type Handler<T extends Method = Method, U extends Header = Header> = (
  args: T["payload"],
  props: U["props"],
  data: Uint8Array
) => void;

export type OnceHandler<
  X,
  T extends Method = Method,
  U extends Header = Header
> = (
  args: T["payload"],
  props: U["props"],
  data?: Uint8Array
) => X;

interface Subscriber<T extends Method = Method> {
  classId: number;
  methodId: number;
  handler: Handler<T>;
}

export interface Subscription {
  (): void;
}

export class ChannelManager {
  private subscribers: Subscriber[] = [];
  private method: Method | null = null;
  private header: Header | null = null;
  private buffer: Deno.Buffer | null = null;

  constructor(public id: number, private socket: AmqpWriter) {
    this.on = this.on.bind(this);
    this.once = this.once.bind(this);
  }

  push(frame: MethodFrame | ContentFrame | HeaderFrame): void {
    if (frame.channel !== this.id) {
      return;
    }

    if (frame.type === "method") {
      if (hasContent(frame.method)) {
        this.method = frame.method;
      } else {
        this.subscribers.forEach(sub => {
          if (sub.classId === frame.method.classId &&
            sub.methodId === frame.method.methodId)
          {
            sub.handler(frame.method.payload, {}, new Uint8Array([]));
          }
        });
      }
    }

    if (frame.type === "header") {
      this.header = frame.header;
      this.buffer = new Deno.Buffer();
    }

    if (frame.type === "content" && this.method && this.header &&
      this.buffer)
    {
      this.buffer.writeSync(frame.payload);

      if (this.buffer.length === this.header!.size) {
        this.subscribers.forEach(sub => {
          if (this.buffer && sub.classId === this.header!.classId &&
            sub.methodId === this.method!.methodId)
          {
            const args = this.method!.payload;
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

  async send<
    T extends Method["classId"],
    U extends Method["methodId"],
    M extends Extract<Method, { classId: T; methodId: U }>,
    H extends Extract<Header, { classId: T }>
  >(
    method: M,
    props?: H["props"],
    data?: Uint8Array
  ) {
    await this.socket.write({ type: "method", channel: this.id, method });

    if (hasContent(method)) {
      if (!props || !data) {
        throw new Error(
          `Method ${method.classId}/${method.methodId} requires content`
        );
      }

      await this.socket.write(
        {
          type: "header",
          channel: this.id,
          header: {
            props,
            classId: method.classId,
            weight: 0,
            size: data.length
          }
        }
      );

      await this.socket.write(
        { type: "content", channel: this.id, payload: data }
      );
    }
  }

  on<
    T extends Method["classId"],
    U extends Method["methodId"],
    M extends Extract<Method, { classId: T; methodId: U }>,
    H extends Extract<Header, { classId: T }>
  >(
    classId: T,
    methodId: U,
    handler: Handler<M, H>
  ) {
    const subscriber = {
      classId,
      methodId,
      handler: handler as Handler
    };

    this.subscribers.push(subscriber);

    const cancel = () => this.unsubscribe(subscriber);
    return cancel;
  }

  once<
    T extends Method["classId"],
    U extends Method["methodId"],
    M extends Extract<Method, { classId: T; methodId: U }>,
    H extends Extract<Header, { classId: T }>,
    R
  >(
    classId: T,
    methodId: U,
    handler: OnceHandler<R, M, H>
  ): Promise<R> {
    return new Promise<R>((resolve, reject) => {
      const cancel = this.on<T, U, M, H>(classId, methodId, (...args) => {
        cancel();
        resolve(handler(...args));
      });
    });
  }

  private unsubscribe(subscriber: Subscriber) {
    const index = this.subscribers.indexOf(subscriber);
    if (index !== -1) {
      this.subscribers.splice(index, index + 1);
    }
  }
}
