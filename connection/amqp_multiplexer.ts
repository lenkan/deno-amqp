import {
  Header,
  ReceiveMethod,
  ConnectionClose,
  ChannelClose,
  SendMethod
} from "../amqp_types.ts";
import { AmqpSocket } from "./amqp_socket.ts";
import {
  CONNECTION_CLOSE,
  CONNECTION,
  CHANNEL,
  CHANNEL_CLOSE
} from "../amqp_constants.ts";

type ExtractReceiveMethod<T extends number, U extends number> = Extract<
  ReceiveMethod,
  { classId: T; methodId: U }
>;

type ExtractSendMethod<T extends number, U extends number> = Extract<
  SendMethod,
  { classId: T; methodId: U }
>;
type ExtractMethod<T extends number, U extends number> = ExtractReceiveMethod<
  T,
  U
>["args"];

type ExtractMethodArgs<T extends number, U extends number> = ExtractSendMethod<
  T,
  U
>["args"];

type ExtractProps<T extends number> = Extract<
  Header,
  { classId: T }
>["props"];

export interface AmqpSource {
  subscribe<T extends number, U extends number>(
    channel: number,
    classId: T,
    methodId: U,
    handler: (args: ExtractMethod<T, U>) => void,
  ): () => void;
  receive<T extends number, U extends number>(
    channel: number,
    classId: T,
    methodId: U,
  ): Promise<
    ExtractMethod<T, U>
  >;
  receiveContent<T extends number>(
    channel: number,
    classId: T,
  ): Promise<[ExtractProps<T>, Uint8Array]>;
}

export interface AmqpSink {
  send<T extends number, U extends number>(
    channel: number,
    classId: T,
    methodId: U,
    args: ExtractMethodArgs<T, U>,
  ): Promise<void>;
  sendContent<T extends number>(
    channel: number,
    classId: T,
    props: ExtractProps<T>,
    data: Uint8Array,
  ): Promise<void>;
}

interface MethodReceiver<T extends number, U extends number> {
  channel: number;
  classId: T;
  methodId: U;
  resolve: (m: ExtractMethod<T, U>) => void;
  reject: (e: Error) => void;
}

interface HeaderReceiver<T extends number> {
  channel: number;
  classId: T;
  resolve: (h: Extract<Header, { classId: T }>) => void;
  reject: (e: Error) => void;
}

interface ContentReceiver {
  channel: number;
  resolve: (data: Uint8Array) => void;
  reject: (e: Error) => void;
}

function serializeChannelError(channel: number, args: ChannelClose) {
  return `Channel ${channel} closed by server - ${args.replyCode} ${args
    .replyText || ""}`;
}

function serializeConnectionError(args: ConnectionClose) {
  return `Connection closed by server - ${args.replyCode} ${args
    .replyText || ""}`;
}

export interface AmqpMultiplexer extends AmqpSource, AmqpSink {}

class AmqpSocketMultiplexer implements AmqpSource, AmqpSink {
  private methodReceivers: MethodReceiver<any, any>[] = [];
  private headerReceivers: HeaderReceiver<any>[] = [];
  private contentReceivers: ContentReceiver[] = [];

  constructor(private socket: AmqpSocket) {}

  public start() {
    this.listen().catch((error) => {
      this.handleError(error);
    });
  }

  private async listen() {
    while (true) {
      const frame = await this.socket.read();
      if (frame.type === "method") {
        this.emitMethod(frame.channel, frame.payload);
      } else if (frame.type === "header") {
        this.emitHeader(frame.channel, frame.payload);
      } else if (frame.type === "content") {
        this.emitContent(frame.channel, frame.payload);
      }
    }
  }

  private handleError(error: Error) {
    for (const receiver of [...this.contentReceivers]) {
      this.removeContentReceiver(receiver);
      receiver.reject(error);
    }
    for (const receiver of [...this.methodReceivers]) {
      this.removeMethodReceiver(receiver);
      receiver.reject(error);
    }

    for (const receiver of [...this.headerReceivers]) {
      this.removeHeaderReceiver(receiver);
      receiver.reject(error);
    }
  }

  private removeHeaderReceiver(receiver: HeaderReceiver<any>) {
    const index = this.headerReceivers.indexOf(receiver);
    if (index !== -1) {
      this.headerReceivers.splice(index, index + 1);
    }
  }

  private removeMethodReceiver(receiver: MethodReceiver<any, any>) {
    const index = this.methodReceivers.indexOf(receiver);
    if (index !== -1) {
      this.methodReceivers.splice(index, index + 1);
    }
  }

  private removeContentReceiver(receiver: ContentReceiver) {
    const index = this.contentReceivers.indexOf(receiver);
    if (index !== -1) {
      this.contentReceivers.splice(index, index + 1);
    }
  }

  private emitMethod(channel: number, method: ReceiveMethod) {
    for (const receiver of [...this.methodReceivers]) {
      if (
        channel === receiver.channel && method.classId === receiver.classId &&
        method.methodId === receiver.methodId
      ) {
        this.removeMethodReceiver(receiver);
        receiver.resolve(method.args);
        continue;
      }

      if (
        method.classId === CONNECTION && method.methodId === CONNECTION_CLOSE
      ) {
        this.removeMethodReceiver(receiver);
        receiver.reject(new Error(serializeConnectionError(method.args)));
        continue;
      }

      if (
        channel === receiver.channel && method.classId === CHANNEL &&
        method.methodId === CHANNEL_CLOSE
      ) {
        this.removeMethodReceiver(receiver);
        receiver.reject(new Error(serializeChannelError(channel, method.args)));
        continue;
      }
    }
  }

  private emitHeader(channel: number, header: Header) {
    for (const receiver of [...this.headerReceivers]) {
      if (receiver.channel === channel && receiver.classId === header.classId) {
        this.removeHeaderReceiver(receiver);
        receiver.resolve(header);
      }
    }
  }

  private emitContent(channel: number, data: Uint8Array) {
    for (const receiver of [...this.contentReceivers]) {
      if (receiver.channel === channel) {
        this.removeContentReceiver(receiver);
        receiver.resolve(data);
      }
    }
  }

  async receive<T extends number, U extends number>(
    channel: number,
    classId: T,
    methodId: U,
  ): Promise<ExtractMethod<T, U>> {
    return new Promise<any>((resolve, reject) => {
      const receiver: MethodReceiver<T, U> = {
        channel,
        classId,
        methodId,
        resolve,
        reject,
      };
      this.methodReceivers.push(receiver);
    });
  }

  subscribe<T extends number, U extends number>(
    channel: number,
    classId: T,
    methodId: U,
    handler: (args: any) => void,
  ): () => void {
    const resolve = (args: any) => {
      handler(args);
      this.methodReceivers.push(receiver);
    };

    const receiver: MethodReceiver<T, U> = {
      channel,
      classId,
      methodId,
      resolve,
      reject: () => {},
    };

    this.methodReceivers.push(receiver);
    return () => this.removeMethodReceiver(receiver);
  }

  async receiveHeader<T extends number>(
    channel: number,
    classId: T,
  ): Promise<Extract<Header, { classId: T }>> {
    return new Promise<any>((resolve, reject) => {
      const receiver: HeaderReceiver<any> = {
        channel,
        classId,
        resolve,
        reject,
      };
      this.headerReceivers.push(receiver);
    });
  }

  async receiveContent(channel: number, classId: number) {
    const header = await this.receiveHeader(channel, classId);
    const buffer = new Deno.Buffer();
    return new Promise<any>((resolve, reject) => {
      const receiver: ContentReceiver = {
        channel,
        resolve: (data) => {
          buffer.writeSync(data);
          if (buffer.length < header.size) {
            this.contentReceivers.push(receiver);
          } else {
            resolve([header.props, buffer.bytes()]);
          }
        },
        reject,
      };
      this.contentReceivers.push(receiver);
    });
  }

  async send(
    channel: number,
    classId: number,
    methodId: number,
    args: object,
  ) {
    return this.socket.write(
      {
        type: "method",
        channel,
        payload: { classId, methodId, args } as SendMethod,
      },
    );
  }

  async sendContent(
    channel: number,
    classId: number,
    props: object,
    data: Uint8Array,
  ) {
    const size = data.length;
    await Promise.all([
      this.socket.write({
        type: "header",
        channel,
        payload: { classId, props, size } as Header,
      }),
      this.socket.write({
        type: "content",
        channel,
        payload: data,
      }),
    ]);
  }
}

export function createAmqpMux(socket: AmqpSocket): AmqpMultiplexer {
  const mux = new AmqpSocketMultiplexer(socket);
  mux.start();
  return mux;
}
