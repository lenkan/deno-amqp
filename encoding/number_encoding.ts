function readBytesSync(r: Deno.SyncReader, length: number): DataView {
  const data = new Uint8Array(length);
  const result = r.readSync(data);

  if (result !== length) {
    throw new Error("Not enough data in buffer");
  }

  return new DataView(data.buffer);
}

function createView(size: number): [DataView, Uint8Array] {
  const p = new Uint8Array(size);
  return [new DataView(p.buffer), p];
}

export function encodeOctet(value: number) {
  if (value < 0 || value > 0xff) {
    throw new Error("Invalid value for octet");
  }

  return new Uint8Array([value]);
}

export function decodeOctet(r: Deno.SyncReader) {
  return readBytesSync(r, 1).getUint8(0);
}

export function encodeShortUint(value: number) {
  if (value < 0 || value > 0xffff) {
    throw new Error("Invalid value for short-uint");
  }

  const p = new Uint8Array(2);
  const view = new DataView(p.buffer);
  view.setUint16(0, value);
  return p;
}

export function decodeShortUint(buf: Deno.SyncReader) {
  const view = new DataView(readBytesSync(buf, 2).buffer);
  return view.getUint16(0);
}

export function encodeLongUint(value: number) {
  const [view, p] = createView(4);
  view.setUint32(0, value);
  return p;
}

export function decodeLongUint(r: Deno.SyncReader) {
  return readBytesSync(r, 4).getUint32(0);
}

export function encodeLongLongUint(value: bigint) {
  const [view, p] = createView(8);
  view.setBigUint64(0, value);
  return p;
}

export function decodeLongLongUint(r: Deno.SyncReader): bigint {
  return readBytesSync(r, 8).getBigUint64(0);
}
