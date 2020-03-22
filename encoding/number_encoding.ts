import { hex } from "../dependencies.ts";

function readBytesSync(r: Deno.SyncReader, length: number): Uint8Array {
  const data = new Uint8Array(length);
  const result = r.readSync(data);

  if (result !== length) {
    throw new Error("Not enough data in buffer");
  }

  return data;
}

export function encodeOctet(value: number) {
  if (value < 0 || value > 0xff) {
    throw new Error("Invalid value for octet");
  }

  return new Uint8Array([value]);
}

export function decodeOctet(r: Deno.SyncReader) {
  return readBytesSync(r, 1)[0];
}

export function encodeShortUint(value: number) {
  if (value < 0 || value > 0xffff) {
    throw new Error("Invalid value for short-uint");
  }

  return new Uint8Array([value >>> 8, value]);
}

export function decodeShortUint(buf: Deno.SyncReader) {
  const data = readBytesSync(buf, 2);
  return (data[0] << 8) + data[1];
}

export function encodeLongUint(value: number) {
  if (value < 0 || value > 0xffffffff) {
    throw new Error("Invalid value for long-uint");
  }

  return new Uint8Array([value >>> 24, value >>> 16, value >>> 8, value]);
}

export function decodeLongUint(r: Deno.SyncReader) {
  const data = readBytesSync(r, 4);
  const value = (data[0] << 24) + (data[1] << 16) + (data[2] << 8) + data[3];
  return value;
}

export function encodeLongLongUint(value: string) {
  if (value.length !== 16) {
    throw new Error("longlong uint must be 16 characters");
  }
  return hex.decodeString(value);
}

export function decodeLongLongUint(r: Deno.SyncReader): string {
  const bytes = readBytesSync(r, 8);
  return hex.encodeToString(bytes);
}
