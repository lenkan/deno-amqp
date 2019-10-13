import { createEncoder } from "./encoder.ts";
import { createDecoder } from "./decoder.ts";
import { encodeMethodPayload, Method, decodeMethodPayload } from "./methods.ts";

const FRAME_METHOD = 1;
const FRAME_HEADER = 2;
const FRAME_BODY = 3;
const FRAME_HEARTBEAT = 8;
const FRAME_END = 0xce;
const { dial } = Deno;

export type Heartbeat = { type: "heartbeat"; channel: number };
export type Frame = Method | Heartbeat;

export interface ConnectOptions {
  hostname: string;
  port: number;
}

export interface AmqpConnection {
  start(): Promise<void>;
  read(): Promise<Frame>;
  write(frame: Frame): Promise<void>;
}

export async function connect(
  options: ConnectOptions
): Promise<AmqpConnection> {
  const conn = await dial({
    hostname: options.hostname,
    port: options.port,
    transport: "tcp"
  });

  async function readBytes(length: number) {
    const chunk = new Uint8Array(length);
    const n = await conn.read(chunk);
    if (n === length) {
      return chunk;
    }

    // TODO: Handle this
    throw new Error(`Unable to read desired length from connection`);
  }

  async function readHeader() {
    const prefix = await readBytes(7);
    const prefixDecoder = createDecoder(prefix);
    const type = prefixDecoder.decodeOctet();
    const channel = prefixDecoder.decodeShortUint();
    const size = prefixDecoder.decodeLongUint();
    return { type, channel, size };
  }

  async function read(): Promise<Frame> {
    const { type, channel, size } = await readHeader();

    const payload = await readBytes(size + 1); // size + frame end
    const decoder = createDecoder(payload.slice(0, size));

    if (type === FRAME_METHOD) {
      const classId = decoder.decodeShortUint();
      const methodId = decoder.decodeShortUint();
      return decodeMethodPayload(channel, classId, methodId, decoder.bytes());
    }

    if (type === FRAME_HEARTBEAT) {
      return {
        type: "heartbeat",
        channel
      };
    }

    if (type === FRAME_HEADER) {
      throw new Error(`Cannot handle header frames yet`);
    }

    if (type === FRAME_BODY) {
      throw new Error(`Cannot handle body frames yet`);
    }

    throw new Error(`Unknown frame type ${type}`);
  }

  function encodeFrame(frame: Frame) {
    if (frame.type === "method") {
      const encoder = createEncoder();
      const payload = encodeMethodPayload(frame);
      encoder.encodeOctet(FRAME_METHOD);
      encoder.encodeShortUint(frame.channel);
      encoder.encodeLongUint(payload.length);
      encoder.write(payload);
      encoder.encodeOctet(FRAME_END);
      return encoder.bytes();
    }

    if (frame.type === "heartbeat") {
      const encoder = createEncoder();
      encoder.encodeOctet(FRAME_HEARTBEAT);
      encoder.encodeShortUint(frame.channel);
      encoder.encodeLongUint(0);
      encoder.encodeOctet(FRAME_END);
      return encoder.bytes();
    }

    throw new Error(`Cannot encode frame type ${frame}`)
  }

  async function write(frame: Frame) {
    const data = encodeFrame(frame);
    await conn.write(data);
  }

  async function start() {
    await conn.write(new Uint8Array([65, 77, 81, 80, 0, 0, 9, 1]));
  }

  return { start, read, write };
}
