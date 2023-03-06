import type { Header, ReceiveMethod, SendMethod } from "./amqp_codec.ts";
import type { AmqpSocketReader, AmqpSocketWriter } from "./amqp_socket.ts";
import type { IncomingFrame } from "./amqp_frame.ts";

import {
  CHANNEL,
  CHANNEL_CLOSE,
  CONNECTION,
  CONNECTION_CLOSE,
} from "./amqp_constants.ts";
import {
  serializeChannelError,
  serializeConnectionError,
} from "./error_handling.ts";
import { Buffer } from "../deps.ts";

type ExtractReceiveMethod<T extends number, U extends number> = Extract<
  ReceiveMethod,
  { classId: T; methodId: U }
>;

type ExtractSendMethod<T extends number, U extends number> = Extract<
  SendMethod,
  { classId: T; methodId: U }
>;
export type ExtractMethod<T extends number, U extends number> =
  ExtractReceiveMethod<
    T,
    U
  >["args"];

export type ExtractMethodArgs<T extends number, U extends number> =
  ExtractSendMethod<
    T,
    U
  >["args"];

export type ExtractProps<T extends number> = Extract<
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

  function receive(
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

  function receiveHeader(
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

    const buffer = new Buffer();
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

export function createAmqpMux(
  socket: AmqpSocketReader & AmqpSocketWriter,
): AmqpSource {
  const subscribers: FrameSubscriber[] = [];
  const demux = createSocketDemux(socket, subscribers);
  return demux;
}
