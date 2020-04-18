import { BufReader } from "https://deno.land/std@v0.41.0/io/bufio.ts";
import {
  encodeOctet,
  encodeShortUint,
  encodeLongUint,
} from "../encoding/mod.ts";
import { FrameError } from "./frame_error.ts";

export interface Frame {
  channel: number;
  type: number;
  payload: Uint8Array;
}

export function createFrameReader(r: Deno.Reader): () => Promise<Frame> {
  const reader = new BufReader(r);

  async function readBytes(length: number): Promise<Uint8Array> {
    const n = await reader.readFull(new Uint8Array(length));

    if (n === Deno.EOF) {
      throw new FrameError("EOF");
    }

    return n;
  }

  async function read(): Promise<Frame> {
    const prefix = await readBytes(7);
    const prefixView = new DataView(prefix.buffer);
    const type = prefixView.getUint8(0);
    const channel = prefixView.getUint16(1);
    const length = prefixView.getUint32(3);

    const rest = await readBytes(length + 1);
    const endByte = rest[rest.length - 1];

    if (endByte !== 206) {
      throw new FrameError("BAD_FRAME", `unexpected FRAME_END '${endByte}'`);
    }

    if (![1, 2, 3, 8].includes(type)) {
      throw new FrameError("BAD_FRAME", `unexpected frame type '${type}'`);
    }

    return {
      type: type,
      channel: channel,
      payload: rest.slice(0, rest.length - 1),
    };
  }

  return read;
}

export function createFrameWriter(
  w: Deno.Writer,
): (frame: Frame) => Promise<void> {
  async function write(frame: Frame): Promise<void> {
    const buffer = new Deno.Buffer();
    buffer.writeSync(encodeOctet(frame.type));
    buffer.writeSync(encodeShortUint(frame.channel));
    buffer.writeSync(encodeLongUint(frame.payload.length));
    buffer.writeSync(frame.payload);
    buffer.writeSync(encodeOctet(206));
    await w.write(buffer.bytes());
  }
  return write;
}
