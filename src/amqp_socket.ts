import { encodeHeader, encodeMethod } from "./amqp_codec.ts";
import { AmqpFrameReader } from "./amqp_frame_reader.ts";
import type { IncomingFrame, OutgoingFrame } from "./amqp_frame.ts";
import { writeAll } from "../deps.ts";

export interface AmqpSocketWriter {
  write(frames: Array<OutgoingFrame>): Promise<void>;
}

export interface AmqpSocketReader {
  read(): Promise<IncomingFrame>;
}

export interface AmqpSocketCloser {
  close(): void;
}

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
  #reader: AmqpFrameReader;
  #sendTimer: number | null = null;
  #sendTimeout = 0;
  #readTimeout = 0;
  #frameMax = -1;
  #guard: Promise<void>;

  constructor(conn: Deno.Reader & Deno.Writer & Deno.Closer) {
    this.#conn = conn;
    this.#reader = new AmqpFrameReader(conn);
    this.#guard = Promise.resolve();
  }

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

  async write(frames: Array<OutgoingFrame>): Promise<void> {
    this.#resetSendTimer();
    for (const frame of frames) {
      if (frame.type === "content") {
        const chunks =
          this.#frameMax > 8 && frame.payload.length > this.#frameMax - 8
            ? splitArray(
              frame.payload,
              this.#frameMax - 8,
            ).map((chunk) =>
              encodeFrame({
                type: "content",
                channel: frame.channel,
                payload: chunk,
              })
            )
            : [encodeFrame(frame)];
        for (const chunk of chunks) {
          this.#guard = this.#guard.then(() => writeAll(this.#conn, chunk));
        }
      } else {
        this.#guard = this.#guard.then(() =>
          writeAll(this.#conn, encodeFrame(frame))
        );
      }
    }

    await this.#guard;
  }

  #clear = () => {
    this.#readTimeout = 0;
    this.#sendTimeout = 0;
    this.#reader.abort();
    this.#resetSendTimer();
  };

  async read(): Promise<IncomingFrame> {
    try {
      return await this.#reader.read(this.#readTimeout);
    } catch (error) {
      this.close();
      throw error;
    }
  }

  close(): void {
    this.#clear();
    this.#conn.close();
  }
}
