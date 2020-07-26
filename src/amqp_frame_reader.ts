import { BufReader } from "https://deno.land/std@v0.62.0/io/bufio.ts";
import { FrameError } from "./frame_error.ts";
import {
  decodeMethod,
  decodeHeader,
} from "./amqp_codec.ts";
import { IncomingFrame } from "./amqp_frame.ts";

export class AmqpFrameReader {
  #timer: null | number = null;
  #reader: BufReader;

  constructor(r: Deno.Reader) {
    this.#reader = BufReader.create(r);
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

  async abort() {
    if (this.#timer !== null) {
      clearTimeout(this.#timer);
    }
  }

  read(
    timeout: number,
  ): Promise<IncomingFrame> {
    this.abort();

    if (timeout <= 0) {
      return this.#readFrame();
    }

    const timeoutMessage = `server heartbeat timeout ${timeout}ms`;

    return new Promise<IncomingFrame>(async (resolve, reject) => {
      this.#timer = setTimeout(() => {
        reject(new Error(timeoutMessage));
      }, timeout);

      this.#readFrame()
        .then(resolve)
        .catch(reject)
        .finally(() => this.abort());
    });
  }
}
