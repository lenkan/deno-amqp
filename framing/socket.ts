import { encodeFrame, readFrame } from "../framing/encoder.ts";
import {
  decodeMethod,
  encodeMethod,
  encodeHeader,
  decodeHeader,
  Header,
  Method
} from "./methods.ts";

const FRAME_METHOD = 1;
const FRAME_HEADER = 2;
const FRAME_BODY = 3;
const FRAME_HEARTBEAT = 8;

export interface HeaderFrame {
  channel: number;
  type: "header";
  header: Header;
}

export interface MethodFrame {
  channel: number;
  type: "method";
  method: Method;
}

export interface HeartbeatFrame {
  channel: number;
  type: "heartbeat";
}

export interface ContentFrame {
  channel: number;
  type: "content";
  payload: Uint8Array;
}

export type Frame = HeaderFrame | MethodFrame | HeartbeatFrame | ContentFrame;

export interface AmqpReader {
  read(): Promise<Frame | null>;
}

export interface AmqpWriter {
  write(frame: Frame): Promise<void>;
}

export interface AmqpSocket extends AmqpReader, AmqpWriter {
  start(): Promise<void>;
  close(): void;
}

export function createSocket(conn: Deno.Conn): AmqpSocket {
  async function start() {
    await conn.write(new TextEncoder().encode("AMQP"));
    await conn.write(new Uint8Array([0, 0, 9, 1]));
  }

  function close() {
    conn.closeWrite();
  }

  async function write(frame: Frame) {
    if (frame.type === "header") {
      await conn.write(
        encodeFrame(
          {
            type: FRAME_HEADER,
            channel: frame.channel,
            payload: encodeHeader(frame.header)
          }
        )
      );
      return;
    }

    if (frame.type === "content") {
      await conn.write(
        encodeFrame(
          { type: FRAME_BODY, channel: frame.channel, payload: frame.payload }
        )
      );
      return;
    }

    if (frame.type === "heartbeat") {
      await conn.write(
        encodeFrame(
          {
            type: FRAME_HEARTBEAT,
            channel: frame.channel,
            payload: new Uint8Array([])
          }
        )
      );
      return;
    }

    if (frame.type === "method") {
      await conn.write(encodeFrame({
        type: FRAME_METHOD,
        channel: frame.channel,
        payload: encodeMethod(frame.method)
      }));
      return;
    }

    throw new Error(`Unknown frame type '${frame!.type}'`);
  }

  async function read(): Promise<Frame | null> {
    const frame = await readFrame(conn);
    if (!frame) {
      return null;
    }

    if (frame.type === FRAME_METHOD) {
      const r = new Deno.Buffer(frame.payload);
      const method = decodeMethod(r);
      return {
        channel: frame.channel,
        type: "method",
        method
      };
    }

    if (frame.type === FRAME_HEADER) {
      const r = new Deno.Buffer(frame.payload);
      const header = decodeHeader(r);
      return {
        channel: frame.channel,
        type: "header",
        header
      };
    }

    if (frame.type === FRAME_BODY) {
      return {
        channel: frame.channel,
        type: "content",
        payload: frame.payload
      };
    }

    if (frame.type === FRAME_HEARTBEAT) {
      return { channel: frame.channel, type: "heartbeat" };
    }

    // TODO(lenkan): Close connection with error
    throw new Error(`Unknown frame type ${frame.type}`);
  }

  return {
    start,
    close,
    read,
    write
  };
}
