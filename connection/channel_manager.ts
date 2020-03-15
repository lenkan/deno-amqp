import {
  MethodFrame,
  ContentFrame,
  HeaderFrame,
  AmqpWriter
} from "../framing/socket.ts";
import { SendMethod, ReceiveMethod } from "../amqp_types.ts";
import { hasContent } from "../amqp_helpers.ts";

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

export class ChannelManager {
  private subscribers: Subscriber[] = [];
  private method: MethodFrame["payload"] | null = null;
  private header: HeaderFrame["payload"] | null = null;
  private buffer: Deno.Buffer | null = null;

  constructor(public id: number, private socket: AmqpWriter) {
    this.on = this.on.bind(this);
    this.receive = this.receive.bind(this);
    this.send = this.send.bind(this);
  }

  push(frame: MethodFrame | ContentFrame | HeaderFrame): void {
    if (frame.channel !== this.id) {
      return;
    }

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
      this.header = frame.payload;
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

  async send<T extends number, U extends number>(
    classId: T,
    methodId: U,
    ...args: SendArgs<Extract<SendMethod, { classId: T; methodId: U }>>
  ) {
    await this.socket.write(
      {
        type: "method",
        channel: this.id,
        payload: { classId, methodId, args: args[0] }
      }
    );

    if (args.length === 3) {
      const [_, props, data] = args;
      await this.socket.write(
        {
          type: "header",
          channel: this.id,
          payload: {
            classId,
            props,
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

  receive<T extends number, U extends number>(
    classId: T,
    methodId: U
  ): Promise<Extract<ReceiveMethod, { classId: T; methodId: U }>["args"]> {
    return new Promise((resolve, reject) => {
      const cancel = this.on(classId, methodId, (args: object) => {
        cancel();
        resolve(args as any);
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
