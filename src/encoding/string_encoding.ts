import {
  decodeOctet,
  encodeLongUint,
  decodeLongUint,
} from "./number_encoding.ts";
import { readBytesSync } from "./utils.ts";

const Buffer = Deno.Buffer;
const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

export function encodeShortString(value: string) {
  const encoded = textEncoder.encode(value);

  if (encoded.length > 255) {
    throw new Error("Value is too long for short string");
  }

  return new Uint8Array([encoded.length, ...encoded]);
}

export function decodeShortString(r: Deno.ReaderSync): string {
  const size = decodeOctet(r);
  const data = readBytesSync(r, size);
  const value = textDecoder.decode(data);
  return value;
}

export function encodeLongString(value: string) {
  const encoded = textEncoder.encode(value);

  if (encoded.length > 0xffffffff) {
    throw new Error("Value is too long for long string");
  }

  const buffer = new Buffer();
  buffer.writeSync(encodeLongUint(encoded.length));
  buffer.writeSync(encoded);
  return buffer.bytes();
}

export function decodeLongString(r: Deno.ReaderSync): string {
  const size = decodeLongUint(r);
  const data = readBytesSync(r, size);
  return textDecoder.decode(data);
}
