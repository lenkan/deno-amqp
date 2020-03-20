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
  on(
    channel: number,
    handler: FrameHandler,
    onError?: ErrorHandler
  ): void;
  read(channel: number): Promise<Frame>;
}

export interface AmqpWriter {
  write(channel: number, frame: Frame): Promise<void>;
}

export interface AmqpSocket extends AmqpReader, AmqpWriter {
  start(): Promise<void>;
  close(): void;
}

function createSubscriber(
  channel: number,
  handler: FrameHandler,
  error: ErrorHandler = e => {}
) {
  return ({ channel, handler, error });
}

export function createSocket(conn: Deno.Conn): AmqpSocket {
  const subscribers: FrameSubscriber[] = [];

  function cancel(subscriber: FrameSubscriber) {
    const index = subscribers.indexOf(subscriber);
    if (index !== -1) {
      subscribers.splice(index, index + 1);
    }
  }

  function on(
    channel: number,
    handler: FrameHandler,
    onError: ErrorHandler = () => {}
  ) {
    const subscriber = createSubscriber(channel, handler, onError);
    subscribers.push(subscriber);
    return () => cancel(subscriber);
  }

  function read(
    channel: number
  ): Promise<Frame> {
    return new Promise<Frame>((resolve, reject) => {
      const stop = on(channel, frame => {
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
      const buffer = new Deno.Buffer();
      buffer.writeSync(encodeShortUint(frame.payload.classId));
      buffer.writeSync(encodeShortUint(frame.payload.weight));
      buffer.writeSync(encodeLongUint(0));
      buffer.writeSync(encodeLongUint(frame.payload.size));
      buffer.writeSync(
        encodeProps(frame.payload.classId, frame.payload.props)
      );
      await conn.write(
        encodeFrame(
          {
            type: FRAME_HEADER,
            channel,
            payload: buffer.bytes()
          }
        )
      );
      return;
    }

    if (frame.type === "content") {
      await conn.write(
        encodeFrame(
          { type: FRAME_BODY, channel, payload: frame.payload }
        )
      );
      return;
    }

    if (frame.type === "heartbeat") {
      await conn.write(
        encodeFrame(
          {
            type: FRAME_HEARTBEAT,
            channel: channel,
            payload: new Uint8Array([])
          }
        )
      );
      return;
    }

    if (frame.type === "method") {
      const buffer = new Deno.Buffer();
      buffer.writeSync(encodeShortUint(frame.payload.classId));
      buffer.writeSync(encodeShortUint(frame.payload.methodId));
      buffer.writeSync(
        encodeArgs(
          frame.payload.classId,
          frame.payload.methodId,
          frame.payload.args
        )
      );
      await conn.write(encodeFrame({
        type: FRAME_METHOD,
        channel: channel,
        payload: buffer.bytes()
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
      const r = new Deno.Buffer(frame.payload);
      const classId = decodeShortUint(r);
      const methodId = decodeShortUint(r);
      const args = decodeArgs(r, classId, methodId);
      emit(
        frame.channel,
        { type: "method", payload: { classId, methodId, args } }
      );
      return;
    }

    if (frame.type === FRAME_HEADER) {
      const r = new Deno.Buffer(frame.payload);
      const classId = decodeShortUint(r);
      const weight = decodeShortUint(r);
      decodeLongUint(r); // size high bytes
      const size = decodeLongUint(r);
      const props = decodeProps(r, classId);
      emit(
        frame.channel,
        { type: "header", payload: { classId, weight, size, props } }
      );
      return;
    }

    if (frame.type === FRAME_BODY) {
      emit(frame.channel, { type: "content", payload: frame.payload });
      return;
    }

    if (frame.type === FRAME_HEARTBEAT) {
      emit(frame.channel, { type: "heartbeat" });
      return;
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
    on,
    write
  };
}
