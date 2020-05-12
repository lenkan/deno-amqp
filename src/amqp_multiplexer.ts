import {
  Header,
  ReceiveMethod,
  SendMethod,
} from "./amqp_codec.ts";
import {
  CONNECTION_CLOSE,
  CONNECTION,
  CHANNEL,
  CHANNEL_CLOSE,
} from "./amqp_constants.ts";
import {
  serializeConnectionError,
  serializeChannelError,
} from "./error_handling.ts";
import {
  IncomingFrame,
  AmqpSocketReader,
  AmqpSocketWriter,
} from "./amqp_socket.ts";

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
  ): Promise<ExtractMethod<T, U>>;
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

export interface AmqpMultiplexer extends AmqpSource, AmqpSink {}

interface FrameSubscriber {
  handle(frame: IncomingFrame): boolean;
  error(error: Error): void;
}

function createSubscriber(
  handle: (frame: IncomingFrame) => boolean,
  onError: (e: Error) => void,
): FrameSubscriber {
  return { handle, error: onError };
}

function assertNotClosed(channel: number, frame: IncomingFrame): void {
  if (frame.type === "method") {
    if (
      frame.channel === channel && frame.payload.classId === CHANNEL &&
      frame.payload.methodId === CHANNEL_CLOSE
    ) {
      throw new Error(serializeChannelError(channel, frame.payload.args));
    }

    if (
      frame.payload.classId === CONNECTION &&
      frame.payload.methodId === CONNECTION_CLOSE
    ) {
      throw new Error(serializeConnectionError(frame.payload.args));
    }
  }
}

function createSocketDemux(
  reader: AmqpSocketReader,
  subscribers: FrameSubscriber[],
): AmqpSource {
  listen();

  async function listen() {
    try {
      while (true) {
        const frame = await reader.read();
        emit(frame);
      }
    } catch (error) {
      handleError(error);
    }
  }

  function removeSubscriber(subscriber: FrameSubscriber) {
    const index = subscribers.indexOf(subscriber);
    if (index !== -1) {
      subscribers.splice(index, 1);
    }
  }

  function handleError(error: Error) {
    for (const subscriber of [...subscribers]) {
      subscriber.error(error);
      removeSubscriber(subscriber);
    }
  }

  function emit(frame: IncomingFrame) {
    for (const subscriber of [...subscribers]) {
      try {
        if (subscriber.handle(frame)) {
          removeSubscriber(subscriber);
        }
      } catch (error) {
        subscriber.error(error);
        removeSubscriber(subscriber);
      }
    }
  }

  function addSubscriber(subscriber: FrameSubscriber) {
    subscribers.push(subscriber);
  }

  async function receive(
    channel: number,
    classId: number,
    methodId: number,
  ): Promise<ReceiveMethod["args"]> {
    return new Promise<ReceiveMethod["args"]>((resolve, reject) => {
      addSubscriber(createSubscriber((frame) => {
        if (frame.type === "method") {
          if (
            frame.channel === channel &&
            frame.payload.classId === classId &&
            frame.payload.methodId === methodId
          ) {
            resolve(frame.payload.args);
            return true;
          }
        }

        assertNotClosed(channel, frame);
        return false;
      }, reject));
    });
  }

  function subscribe(
    channel: number,
    classId: number,
    methodId: number,
    handler: (args: ReceiveMethod["args"]) => void,
  ): () => void {
    const subscriber: FrameSubscriber = createSubscriber((frame) => {
      if (frame.type === "method") {
        if (
          frame.channel === channel &&
          frame.payload.classId === classId &&
          frame.payload.methodId === methodId
        ) {
          handler(frame.payload.args);
        }
      }

      return false;
    }, () => {});

    addSubscriber(subscriber);
    return () => removeSubscriber(subscriber);
  }

  async function receiveHeader(
    channel: number,
    classId: number,
  ): Promise<Header> {
    return new Promise<Header>((resolve, reject) => {
      addSubscriber(createSubscriber((frame) => {
        if (
          frame.channel === channel &&
          frame.type === "header" &&
          frame.payload.classId === classId
        ) {
          resolve(frame.payload);
          return true;
        }
        assertNotClosed(channel, frame);
        return false;
      }, reject));
    });
  }

  async function receiveContent(channel: number, classId: number) {
    const header = await receiveHeader(channel, classId);
    if (header.size === 0) {
      return [header.props, new Uint8Array(0)];
    }

    const buffer = new Deno.Buffer();
    return new Promise<[Header["props"], Uint8Array]>((resolve, reject) => {
      addSubscriber(createSubscriber((frame) => {
        if (frame.channel === channel && frame.type === "content") {
          buffer.writeSync(frame.payload);
          if (buffer.length >= header.size) {
            resolve([header.props, buffer.bytes()]);
            return true;
          }
        } else if (frame.channel === channel && frame.type !== "content") {
          resolve([header.props, buffer.bytes()]);
          return true;
        }

        assertNotClosed(channel, frame);
        return false;
      }, reject));
    });
  }

  return {
    receive: receive as AmqpSource["receive"],
    receiveContent: receiveContent as AmqpSource["receiveContent"],
    subscribe: subscribe as AmqpSource["subscribe"],
  };
}

function createSocketMux(writer: AmqpSocketWriter): AmqpSink {
  async function send(
    channel: number,
    classId: number,
    methodId: number,
    args: object,
  ) {
    return writer.write(
      {
        type: "method",
        channel,
        payload: { classId, methodId, args } as SendMethod,
      },
    );
  }

  async function sendContent(
    channel: number,
    classId: number,
    props: object,
    data: Uint8Array,
  ) {
    const size = data.length;

    if (size === 0) {
      await writer.write({
        type: "header",
        channel,
        payload: { classId, props, size } as Header,
      });
    } else {
      await Promise.all([
        writer.write({
          type: "header",
          channel,
          payload: { classId, props, size } as Header,
        }),
        writer.write({
          type: "content",
          channel,
          payload: data,
        }),
      ]);
    }
  }

  return { send, sendContent };
}

export function createAmqpMux(
  socket: AmqpSocketReader & AmqpSocketWriter,
): AmqpMultiplexer {
  const subscribers: FrameSubscriber[] = [];
  const demux = createSocketDemux(socket, subscribers);
  const mux = createSocketMux(socket);
  return { ...demux, ...mux };
}
