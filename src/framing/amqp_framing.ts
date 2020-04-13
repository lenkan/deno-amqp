import {
  encodeOctet,
  encodeShortUint,
  encodeLongUint,
  decodeOctet,
  decodeShortUint,
  decodeLongUint,
} from "../encoding/mod.ts";

export interface Frame {
  channel: number;
  type: number;
  payload: Uint8Array;
}

export interface AmqpFrameReader {
  read(): Promise<Frame>;
}

export interface AmqpFrameWriter {
  write(frame: Frame): Promise<void>;
}

export interface AmqpFraming extends AmqpFrameReader, AmqpFrameWriter {}

function verifyFrame(type: number) {
  if (![1, 2, 3, 8].includes(type)) {
    throw new Error(`Unknown frame type '${type}'`);
  }
}

export function createFrameReader(r: Deno.Reader): AmqpFrameReader {
  async function readBytes(length: number): Promise<Uint8Array> {
    const data = new Uint8Array(length);
    const n = await r.read(data);

    if (n === 0) {
      return readBytes(length);
    }

    if (n !== length) {
      throw new Error(`Expected ${length} bytes from reader, got ${r}`);
    }

    return data;
  }

  async function read(): Promise<Frame> {
    const prefix = await readBytes(7);

    const prefixReader = new Deno.Buffer(prefix);
    const type = decodeOctet(prefixReader);
    const channel = decodeShortUint(prefixReader);
    const length = decodeLongUint(prefixReader);

    const rest = await readBytes(length + 1);

    if (rest[rest.length - 1] !== 206) {
      throw new Error(`Unexpected end token ${rest[rest.length - 1]}`);
    }

    verifyFrame(type);

    return {
      type: type,
      channel: channel,
      payload: rest.slice(0, rest.length - 1),
    };
  }

  return { read };
}

export function createFrameWriter(w: Deno.Writer): AmqpFrameWriter {
  async function write(frame: Frame): Promise<void> {
    const buffer = new Deno.Buffer();
    buffer.writeSync(encodeOctet(frame.type));
    buffer.writeSync(encodeShortUint(frame.channel));
    buffer.writeSync(encodeLongUint(frame.payload.length));
    buffer.writeSync(frame.payload);
    buffer.writeSync(encodeOctet(206));
    await w.write(buffer.bytes());
  }
  return { write };
}
