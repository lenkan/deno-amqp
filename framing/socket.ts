import {
  encodeFrame,
  readFrame,
  encodeShortUint,
  encodeLongUint,
  decodeShortUint,
  decodeLongUint
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
  channel: number;
  type: "header";
  payload: Header;
}

export interface MethodFrame {
  channel: number;
  type: "method";
  payload: Method;
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
            channel: frame.channel,
            payload: buffer.bytes()
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
        channel: frame.channel,
        payload: buffer.bytes()
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
      const classId = decodeShortUint(r);
      const methodId = decodeShortUint(r);
      const args = decodeArgs(r, classId, methodId);
      return {
        channel: frame.channel,
        type: "method",
        payload: { classId, methodId, args }
      };
    }

    if (frame.type === FRAME_HEADER) {
      const r = new Deno.Buffer(frame.payload);

      const classId = decodeShortUint(r);
      const weight = decodeShortUint(r);
      decodeLongUint(r); // size high bytes
      const size = decodeLongUint(r);
      const props = decodeProps(r, classId);
      return {
        channel: frame.channel,
        type: "header",
        payload: { classId, weight, size, props }
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
