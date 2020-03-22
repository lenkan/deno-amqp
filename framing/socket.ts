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
  FRAME_HEADER,
  FRAME_HEARTBEAT,
  FRAME_BODY,
  FRAME_METHOD
} from "../amqp_constants.ts";
import { withTimeout } from "./with_timeout.ts";

export interface Method {
  classId: number;
  methodId: number;
  args: Uint8Array;
}

export interface Header {
  classId: number;
  weight: number;
  size: number;
  props: Uint8Array;
}

export interface HeaderFrame {
  type: "header";
  payload: Header;
}

export interface MethodFrame {
  type: "method";
  payload: Method;
}

export interface ContentFrame {
  type: "content";
  payload: Uint8Array;
}

export type Frame = HeaderFrame | MethodFrame | ContentFrame;

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
  tuneHeartbeat(interval: number): void;
  close(): void;
}

function encodeMethod(method: Method): Uint8Array {
  const buffer = new Deno.Buffer();
  buffer.writeSync(encodeShortUint(method.classId));
  buffer.writeSync(encodeShortUint(method.methodId));
  buffer.writeSync(method.args);
  return buffer.bytes();
}

function decodeMethod(payload: Uint8Array): Method {
  const r = new Deno.Buffer(payload);
  const classId = decodeShortUint(r);
  const methodId = decodeShortUint(r);
  return { classId, methodId, args: r.bytes() };
}

function encodeHeader(header: Header): Uint8Array {
  const buffer = new Deno.Buffer();
  buffer.writeSync(encodeShortUint(header.classId));
  buffer.writeSync(encodeShortUint(header.weight));
  buffer.writeSync(encodeLongUint(0));
  buffer.writeSync(encodeLongUint(header.size));
  buffer.writeSync(header.props);
  return buffer.bytes();
}

function decodeHeader(payload: Uint8Array): Header {
  const r = new Deno.Buffer(payload);
  const classId = decodeShortUint(r);
  const weight = decodeShortUint(r);
  decodeLongUint(r); // size high bytes
  const size = decodeLongUint(r);
  return { classId, weight, size, props: r.bytes() };
}

export interface SocketOptions {
  loglevel: "debug" | "none";
}

export function createSocket(
  conn: Deno.ReadWriteCloser,
  options: SocketOptions = { loglevel: "none" }
): AmqpSocket {
  const subscribers: FrameSubscriber[] = [];
  let running = false;
  let sendTimer: number | null;
  let heartbeatTimeout: number = 0;

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

    listen().catch(error => {
      subscribers.forEach(sub => sub.error(error));
      close();
    });
  }

  function close(reason?: string) {
    console.log("Closing connection: " + reason || "");
    conn.close();
    running = false;
  }

  function resetSendTimer() {
    if (sendTimer !== null) {
      clearTimeout(sendTimer);
    }

    if (heartbeatTimeout > 0) {
      setTimeout(() => {
        conn.write(
          encodeFrame(
            { type: FRAME_HEARTBEAT, channel: 0, payload: new Uint8Array([]) }
          )
        );
      }, heartbeatTimeout * 1000);
    }
  }

  function logSend(channel: number, frame: Frame) {
    // TODO(lenkan): Move to other module
    if (options.loglevel === "debug") {
      const prefix = `SEND(${channel}) `;
      if (frame.type === "header") {
        console.log(
          prefix +
            `header(${frame.payload.classId}) size(${frame.payload.size})`
        );
      }
      if (frame.type === "content") {
        console.log(prefix + `payload(${frame.payload.toString()})`);
      }

      if (frame.type === "method") {
        console.log(
          prefix + `method(${frame.payload.classId}/${frame.payload.methodId})`
        );
      }
    }
  }

  function logRecv(channel: number, frame: Frame) {
    // TODO(lenkan): Move to other module
    if (options.loglevel === "debug") {
      const prefix = `SEND(${channel}) `;
      if (frame.type === "header") {
        console.log(
          prefix +
            `header(${frame.payload.classId}) size(${frame.payload.size})`
        );
      }
      if (frame.type === "content") {
        console.log(prefix + `payload(${frame.payload.toString()})`);
      }

      if (frame.type === "method") {
        console.log(
          prefix + `method(${frame.payload.classId}/${frame.payload.methodId})`
        );
      }
    }
  }

  async function write(channel: number, frame: Frame) {
    resetSendTimer();
    logSend(channel, frame);

    if (frame.type === "header") {
      const payload = encodeHeader(frame.payload);
      await conn.write(encodeFrame({
        type: FRAME_HEADER,
        channel,
        payload
      }));
    }

    if (frame.type === "content") {
      await conn.write(encodeFrame({
        type: FRAME_BODY,
        channel,
        payload: frame.payload
      }));
    }

    if (frame.type === "method") {
      const payload = encodeMethod(frame.payload);
      await conn.write(encodeFrame({
        type: FRAME_METHOD,
        channel: channel,
        payload
      }));
    }
  }

  function emit(channel: number, frame: Frame) {
    logRecv(channel, frame);
    subscribers.forEach(sub => {
      if (sub.channel === channel) {
        sub.handler(frame);
      }
    });
  }

  function handleFrame(frame: RawFrame) {
    if (frame.type === FRAME_METHOD) {
      const payload = decodeMethod(frame.payload);

      return emit(frame.channel, {
        type: "method",
        payload
      });
    }

    if (frame.type === FRAME_HEADER) {
      const payload = decodeHeader(frame.payload);
      return emit(frame.channel, {
        type: "header",
        payload
      });
    }

    if (frame.type === FRAME_BODY) {
      return emit(frame.channel, {
        type: "content",
        payload: frame.payload
      });
    }
  }

  async function nextFrame(): Promise<RawFrame> {
    const timeoutMessage =
      `missed heartbeat from server, timeout ${heartbeatTimeout}s`;

    return withTimeout(async () => {
      const frame = await readFrame(conn);

      if (!frame) {
        throw new Error("Connection closed by server");
      }

      return frame;
    }, heartbeatTimeout * 1000 * 2, timeoutMessage);
  }

  async function listen(): Promise<void> {
    running = true;
    while (running) {
      handleFrame(await nextFrame());
    }
  }

  function tuneHeartbeat(interval: number) {
    heartbeatTimeout = interval;
    resetSendTimer();
  }

  return {
    start,
    close,
    read,
    subscribe,
    write,
    tuneHeartbeat
  };
}
