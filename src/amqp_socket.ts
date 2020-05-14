import { BufReader } from "https://deno.land/std@v0.51.0/io/bufio.ts";
import { FrameError } from "./frame_error.ts";
import {
  encodeMethod,
  encodeHeader,
  decodeMethod,
  decodeHeader,
  Header,
  ReceiveMethod,
  SendMethod,
} from "./amqp_codec.ts";

export interface AmqpSocketWriter {
  write(frame: OutgoingFrame): Promise<void>;
}

export interface AmqpSocketReader {
  read(): Promise<IncomingFrame>;
}

export interface AmqpSocketCloser {
  close(): void;
}

export interface HeaderFrame {
  type: "header";
  channel: number;
  payload: Header;
}

export interface IncomingMethodFrame {
  type: "method";
  channel: number;
  payload: ReceiveMethod;
}

export interface OutgoingMethodFrame {
  type: "method";
  channel: number;
  payload: SendMethod;
}

export interface ContentFrame {
  type: "content";
  channel: number;
  payload: Uint8Array;
}

export interface HeartbeatFrame {
  type: "heartbeat";
  channel: number;
  payload: Uint8Array;
}

export type IncomingFrame =
  | HeaderFrame
  | HeartbeatFrame
  | IncomingMethodFrame
  | ContentFrame;

export type OutgoingFrame =
  | HeaderFrame
  | HeartbeatFrame
  | OutgoingMethodFrame
  | ContentFrame;

const TYPES = {
  method: 1,
  header: 2,
  content: 3,
  heartbeat: 8,
};

function encodeFrame(frame: OutgoingFrame): Uint8Array {
  let payload: Uint8Array;
  switch (frame.type) {
    case "method":
      payload = encodeMethod(frame.payload);
      break;
    case "header":
      payload = encodeHeader(frame.payload);
      break;
    default:
      payload = frame.payload;
      break;
  }

  const data = new Uint8Array(7 + payload.length + 1);
  const view = new DataView(data.buffer);
  const type = TYPES[frame.type];

  view.setUint8(0, type);
  view.setUint16(1, frame.channel);

  view.setUint32(3, payload.length);
  data.set(payload, 7);
  view.setUint8(7 + payload.length, 206);
  return data;
}

const HEARTBEAT_FRAME = new Uint8Array([
  8,
  0,
  0,
  0,
  0,
  0,
  0,
  206,
]);

function splitArray(arr: Uint8Array, size: number): Uint8Array[] {
  const chunks: Uint8Array[] = [];
  let index = 0;

  while (index < arr.length) {
    chunks.push(arr.slice(index, size + index));
    index += size;
  }

  return chunks;
}

interface AmqpSocketOptions {
  readTimeout?: number;
  sendTimeout?: number;
  frameMax?: number;
}

export class AmqpSocket
  implements AmqpSocketWriter, AmqpSocketReader, AmqpSocketCloser {
  #conn: Deno.Reader & Deno.Writer & Deno.Closer;
  #reader: BufReader;
  #readTimer: number | null = null;
  #sendTimer: number | null = null;
  #sendTimeout: number = 0;
  #readTimeout: number = 0;
  #frameMax: number = -1;

  constructor(conn: Deno.Reader & Deno.Writer & Deno.Closer) {
    this.#conn = conn;
    this.#reader = BufReader.create(conn);
  }

  #resetReadTimer = () => {
    if (this.#readTimer !== null) {
      clearTimeout(this.#readTimer);
      this.#readTimer = null;
    }
  };

  #resetSendTimer = () => {
    if (this.#sendTimer !== null) {
      clearTimeout(this.#sendTimer);
      this.#sendTimer = null;
    }

    if (this.#sendTimeout > 0) {
      this.#sendTimer = setTimeout(() => {
        this.#conn.write(HEARTBEAT_FRAME);
        this.#resetSendTimer();
      }, this.#sendTimeout);
    }
  };

  #readWithTimeout = async (): Promise<IncomingFrame> => {
    this.#resetReadTimer();

    if (this.#readTimeout <= 0) {
      return this.#readFrame();
    }

    const timeoutMessage = `server heartbeat timeout ${this.#readTimeout}ms`;

    const promise = new Promise<IncomingFrame>(async (resolve, reject) => {
      this.#readTimer = setTimeout(() => {
        reject(new Error(timeoutMessage));
        this.close();
      }, this.#readTimeout);

      this.#readFrame()
        .then(resolve)
        .catch(reject)
        .finally(this.#resetReadTimer);
    });

    return promise;
  };

  tune(options: AmqpSocketOptions) {
    this.#readTimeout = options.readTimeout !== undefined
      ? options.readTimeout
      : this.#readTimeout;
    this.#sendTimeout = options.sendTimeout !== undefined
      ? options.sendTimeout
      : this.#sendTimeout;
    this.#frameMax = options.frameMax !== undefined
      ? options.frameMax
      : this.#frameMax;
    this.#resetSendTimer();
  }

  async start() {
    await this.#conn.write(
      new Uint8Array([...new TextEncoder().encode("AMQP"), 0, 0, 9, 1]),
    );
  }

  async write(frame: OutgoingFrame): Promise<void> {
    this.#resetSendTimer();
    if (
      frame.type === "content" &&
      this.#frameMax > 8 &&
      frame.payload.length > this.#frameMax - 8
    ) {
      await Promise.all(
        splitArray(frame.payload, this.#frameMax - 8).map((chunk) => {
          this.#conn.write(encodeFrame({
            type: "content",
            channel: frame.channel,
            payload: chunk,
          }));
        }),
      );

      return;
    }

    await this.#conn.write(encodeFrame(frame));
  }

  #readBytes = async (length: number): Promise<Uint8Array> => {
    const n = await this.#reader.readFull(new Uint8Array(length));

    if (n === null) {
      throw new FrameError("EOF");
    }

    return n;
  };

  #readFrame = async (): Promise<IncomingFrame> => {
    const prefix = await this.#readBytes(7);
    const prefixView = new DataView(prefix.buffer);
    const type = prefixView.getUint8(0);
    const channel = prefixView.getUint16(1);
    const length = prefixView.getUint32(3);

    const rest = await this.#readBytes(length + 1);
    const endByte = rest[rest.length - 1];

    if (endByte !== 206) {
      throw new FrameError("BAD_FRAME", `unexpected FRAME_END '${endByte}'`);
    }

    const payload = rest.slice(0, rest.length - 1);

    if (type === 1) {
      return {
        type: "method",
        channel: channel,
        payload: decodeMethod(payload),
      };
    }

    if (type === 2) {
      return {
        type: "header",
        channel,
        payload: decodeHeader(payload),
      };
    }

    if (type === 3) {
      return {
        type: "content",
        channel,
        payload,
      };
    }

    if (type === 8) {
      return {
        type: "heartbeat",
        channel,
        payload,
      };
    }

    throw new FrameError("BAD_FRAME", `unexpected frame type '${type}'`);
  };

  #clear = () => {
    this.#readTimeout = 0;
    this.#sendTimeout = 0;
    this.#resetReadTimer();
    this.#resetSendTimer();
  };

  async read(): Promise<IncomingFrame> {
    while (true) {
      const frame = await this.#readWithTimeout();

      if (
        frame.type === "method" && frame.payload.classId === 10 &&
        frame.payload.methodId === 51
      ) {
        this.#clear();
      }

      if (
        frame.type === "method" && frame.payload.classId === 10 &&
        frame.payload.methodId === 50
      ) {
        this.#clear();
      }

      return frame;
    }
  }

  close(): void {
    this.#clear();
    this.#conn.close();
  }
}
