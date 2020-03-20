import {
  encodeFrame,
  readFrame,
  encodeShortUint,
  encodeLongUint,
  decodeShortUint,
  decodeLongUint,
  Frame as RawFrame
} from "./encoder.ts";
import {
  encodeArgs,
  encodeProps,
  decodeArgs,
  decodeProps
} from "./method_encoder.ts";
import {
  FRAME_HEADER,
  FRAME_HEARTBEAT,
  FRAME_BODY,
  FRAME_METHOD
} from "../amqp_constants.ts";

export interface Method {
  classId: number;
  methodId: number;
  args: object;
}

export interface Header {
  classId: number;
  weight: number;
  size: number;
  props: object;
}

export interface HeaderFrame {
  type: "header";
  payload: Header;
}

export interface MethodFrame {
  type: "method";
  payload: Method;
}

export interface HeartbeatFrame {
  type: "heartbeat";
}

export interface ContentFrame {
  type: "content";
  payload: Uint8Array;
}

export type Frame = HeaderFrame | MethodFrame | HeartbeatFrame | ContentFrame;

export type FrameHandler = (frame: Frame) => void;
export type ErrorHandler = (error: Error) => void;

export interface FrameSubscriber {
  channel: number;
  handler: FrameHandler;
  error: ErrorHandler;
}

export interface AmqpReader {
  subscribe(
    channel: number,
    handler: FrameHandler,
    onError?: ErrorHandler
  ): void;
  read(channel: number): Promise<Frame>;
}

export interface AmqpWriter {
  write(channel: number, frame: Frame): Promise<void>;
}

export interface AmqpReaderWriter extends AmqpReader, AmqpWriter {}

export interface AmqpSocket extends AmqpReaderWriter {
  start(): Promise<void>;
  close(): void;
}

function encodeMethod(method: Method): Uint8Array {
  const buffer = new Deno.Buffer();
  buffer.writeSync(encodeShortUint(method.classId));
  buffer.writeSync(encodeShortUint(method.methodId));
  buffer.writeSync(
    encodeArgs(
      method.classId,
      method.methodId,
      method.args
    )
  );
  return buffer.bytes();
}

function decodeMethod(payload: Uint8Array): Method {
  const r = new Deno.Buffer(payload);
  const classId = decodeShortUint(r);
  const methodId = decodeShortUint(r);
  const args = decodeArgs(r, classId, methodId);
  return { classId, methodId, args };
}

function encodeHeader(header: Header): Uint8Array {
  const buffer = new Deno.Buffer();
  buffer.writeSync(encodeShortUint(header.classId));
  buffer.writeSync(encodeShortUint(header.weight));
  buffer.writeSync(encodeLongUint(0));
  buffer.writeSync(encodeLongUint(header.size));
  buffer.writeSync(
    encodeProps(header.classId, header.props)
  );
  return buffer.bytes();
}

function decodeHeader(payload: Uint8Array): Header {
  const r = new Deno.Buffer(payload);
  const classId = decodeShortUint(r);
  const weight = decodeShortUint(r);
  decodeLongUint(r); // size high bytes
  const size = decodeLongUint(r);
  const props = decodeProps(r, classId);
  return { classId, weight, size, props };
}

export function createSocket(conn: Deno.Conn): AmqpSocket {
  const subscribers: FrameSubscriber[] = [];

  function cancel(subscriber: FrameSubscriber) {
    const index = subscribers.indexOf(subscriber);
    if (index !== -1) {
      subscribers.splice(index, index + 1);
    }
  }

  function subscribe(
    channel: number,
    handler: FrameHandler,
    onError: ErrorHandler = () => {}
  ) {
    const subscriber = { channel, handler, error: onError };
    subscribers.push(subscriber);
    return () => cancel(subscriber);
  }

  function read(
    channel: number
  ): Promise<Frame> {
    return new Promise<Frame>((resolve, reject) => {
      const stop = subscribe(channel, frame => {
        stop();
        resolve(frame);
      }, error => reject(error));
    });
  }

  async function start() {
    await conn.write(new TextEncoder().encode("AMQP"));
    await conn.write(new Uint8Array([0, 0, 9, 1]));
    listen();
  }

  function close() {
    conn.closeWrite();
  }

  async function write(channel: number, frame: Frame) {
    if (frame.type === "header") {
      await conn.write(encodeFrame({
        type: FRAME_HEADER,
        channel,
        payload: encodeHeader(frame.payload)
      }));
      return;
    }

    if (frame.type === "content") {
      await conn.write(encodeFrame({
        type: FRAME_BODY,
        channel,
        payload: frame.payload
      }));
      return;
    }

    if (frame.type === "heartbeat") {
      await conn.write(encodeFrame({
        type: FRAME_HEARTBEAT,
        channel: channel,
        payload: new Uint8Array([])
      }));
      return;
    }

    if (frame.type === "method") {
      await conn.write(encodeFrame({
        type: FRAME_METHOD,
        channel: channel,
        payload: encodeMethod(frame.payload)
      }));
      return;
    }

    throw new Error(`Unknown frame type '${frame!.type}'`);
  }

  function emit(channel: number, frame: Frame) {
    subscribers.forEach(sub => {
      if (sub.channel === channel) {
        sub.handler(frame);
      }
    });
  }

  function handleFrame(frame: RawFrame) {
    if (frame.type === FRAME_METHOD) {
      return emit(frame.channel, {
        type: "method",
        payload: decodeMethod(frame.payload)
      });
    }

    if (frame.type === FRAME_HEADER) {
      return emit(frame.channel, {
        type: "header",
        payload: decodeHeader(frame.payload)
      });
    }

    if (frame.type === FRAME_BODY) {
      return emit(frame.channel, {
        type: "content",
        payload: frame.payload
      });
    }

    if (frame.type === FRAME_HEARTBEAT) {
      return emit(frame.channel, { type: "heartbeat" });
    }
  }

  async function listen(): Promise<void> {
    while (true) {
      const frame = await readFrame(conn);
      if (!frame) {
        const error = new Error("Connection closed by server");
        subscribers.forEach(sub => sub.error(error));
        return;
      } else {
        handleFrame(frame);
      }
    }
  }

  return {
    start,
    close,
    read,
    subscribe,
    write
  };
}
