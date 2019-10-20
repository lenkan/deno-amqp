import { createEncoder } from "./encoder.ts";
import { createDecoder } from "./decoder.ts";
import {
  encodeMethodPayload,
  MethodPayload as OutgoingMethodPayload
} from "./method_encoder.ts";
import {
  decodeMethodPayload,
  MethodPayload as IncomingMethodPayload
} from "./method_decoder.ts";

const FRAME_METHOD = 1;
const FRAME_HEADER = 2;
const FRAME_BODY = 3;
const FRAME_HEARTBEAT = 8;
const FRAME_END = 0xce;
const { dial } = Deno;

export type Heartbeat = { type: "heartbeat"; channel: number };
export type IncomingMethod = {
  type: "method";
  channel: number;
} & IncomingMethodPayload;
export type OutgoingMethod = {
  type: "method";
  channel: number;
} & OutgoingMethodPayload;

export type IncomingFrame = IncomingMethod | Heartbeat;
export type OutgoingFrame = OutgoingMethod | Heartbeat;

export interface ConnectOptions {
  hostname: string;
  port: number;
}

export interface AmqpSocket {
  start(): Promise<void>;
  close(): void;
  listen(handler: FrameHandler): () => void;
  listenOnce(handler: FrameHandler): () => void;
  write(frame: OutgoingFrame): Promise<void>;
}

export type FrameHandler = (frame: IncomingFrame, next?: () => void) => void;

export async function connect(options: ConnectOptions): Promise<AmqpSocket> {
  const listeners: FrameHandler[] = [];
  let open = true;

  const conn = await dial({
    hostname: options.hostname,
    port: options.port,
    transport: "tcp"
  });

  async function readBytes(length: number): Promise<Uint8Array | null> {
    if (!open) {
      return null;
    }

    const chunk = new Uint8Array(length);
    const n: number | null = await conn.read(chunk).catch(error => {
      // Detecting if the socket is closed, in that case, this error is expected.
      // TODO(lenkan): Should be able to detect this before initiating the read
      if (!open) {
        return null;
      }

      throw error;
    });

    if (n === null) {
      return null;
    }

    if (n === length) {
      return chunk;
    }

    // TODO: Handle this
    throw new Error(
      `Unable to read desired length from connection ${JSON.stringify({
        n,
        length
      })}`
    );
  }

  async function readHeader(): Promise<{
    type: number;
    channel: number;
    size: number;
  } | null> {
    const prefix = await readBytes(7);
    if (prefix === null) {
      return null;
    }

    const prefixDecoder = createDecoder(prefix);
    const type = prefixDecoder.decodeOctet();
    const channel = prefixDecoder.decodeShortUint();
    const size = prefixDecoder.decodeLongUint();
    return { type, channel, size };
  }

  async function* read(): AsyncIterableIterator<IncomingFrame> {
    while (true) {
      const header = await readHeader();
      if (header === null) {
        return null;
      }

      const { type, channel, size } = header;

      const payload = await readBytes(size + 1); // size + frame end
      const decoder = createDecoder(payload.slice(0, size));

      switch (type) {
        case FRAME_METHOD:
          const classId = decoder.decodeShortUint();
          const methodId = decoder.decodeShortUint();
          const result = decodeMethodPayload(
            classId,
            methodId,
            decoder.bytes()
          );
          yield {
            channel,
            type: "method",
            ...result
          };
          break;
        case FRAME_HEARTBEAT:
          yield {
            type: "heartbeat",
            channel
          };
          break;
        default:
          throw new Error(`Unknown frame type ${type}`);
      }
    }
  }

  function encodeFrame(frame: OutgoingFrame) {
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

    throw new Error(`Cannot encode frame type ${frame}`);
  }

  function listen(listener: FrameHandler): () => void {
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      if (index !== -1) {
        listeners.splice(index, 1);
      }
    };
  }

  function listenOnce(listener: FrameHandler): () => void {
    const unsubscribe = listen(frame => {
      unsubscribe();
      listener(frame);
    });
    return unsubscribe;
  }

  async function write(frame: OutgoingFrame) {
    if (!open) {
      throw new Error(
        `Tried to write ${JSON.stringify(frame)} on closed connection`
      );
    }
    const data = encodeFrame(frame);
    await conn.write(data);
  }

  async function start() {
    await conn.write(new Uint8Array([65, 77, 81, 80, 0, 0, 9, 1]));
    startReceiving().catch(error => {
      console.error("Fatal error", error);
    });
  }

  async function startReceiving() {
    for await (const frame of read()) {
      if (frame === null) {
        clear();
        return;
      }

      listeners.forEach(listener => listener(frame));
    }
  }

  function clear() {
    listeners.splice(0, listeners.length);
  }

  function close() {
    clear();
    conn.close();
    open = false;
  }

  return { start, close, listen, listenOnce, write };
}
