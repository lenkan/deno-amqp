import {
  Frame,
  AmqpReaderWriter
} from "./types.ts";
import {
  encodeOctet,
  encodeShortUint,
  encodeLongUint,
  decodeOctet,
  decodeShortUint,
  decodeLongUint
} from "../encoding/mod.ts";

function verifyFrame(type: number) {
  if (![1, 2, 3, 8].includes(type)) {
    throw new Error(`Unknown frame type '${type}'`);
  }
}

export class AmqpFramingMiddleware implements AmqpReaderWriter {
  constructor(
    private socket: Deno.Reader & Deno.Writer,
  ) {}

  private async readBytes(length: number): Promise<Uint8Array> {
    const data = new Uint8Array(length);
    const n = await this.socket.read(data);

    if (n === 0) {
      return this.readBytes(length);
    }

    if (n !== length) {
      throw new Error(`Not enough data in reader`);
    }

    return data;
  }

  async read(): Promise<Frame> {
    const prefix = await this.readBytes(7);
    if (!prefix) {
      throw new Error(`EOF reached`);
    }

    const prefixReader = new Deno.Buffer(prefix);
    const type = decodeOctet(prefixReader);
    const channel = decodeShortUint(prefixReader);
    const length = decodeLongUint(prefixReader);

    const rest = await this.readBytes(length + 1);

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

  async write(frame: Frame): Promise<void> {
    const buffer = new Deno.Buffer();
    buffer.writeSync(encodeOctet(frame.type));
    buffer.writeSync(encodeShortUint(frame.channel));
    buffer.writeSync(encodeLongUint(frame.payload.length));
    buffer.writeSync(frame.payload);
    buffer.writeSync(encodeOctet(206));
    await this.socket.write(buffer.bytes());
  }
}
