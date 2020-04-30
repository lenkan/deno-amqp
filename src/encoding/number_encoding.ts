function viewOf(r: Deno.ReaderSync, length: number): DataView {
  const data = new Uint8Array(length);
  const result = r.readSync(data);

  if (typeof result !== "number" || result !== length) {
    throw new Error(
      `Not enough data in buffer (expected: ${length}, got: ${result})`,
    );
  }

  return new DataView(data.buffer);
}

function createView(
  size: number,
  setter: (v: DataView) => void,
): Uint8Array {
  const p = new Uint8Array(size);
  const view = new DataView(p.buffer);
  setter(view);
  return p;
}

export function encodeOctet(value: number) {
  if (value < 0 || value > 0xff) {
    throw new Error("Invalid value for octet");
  }

  return new Uint8Array([value]);
}

export function decodeOctet(r: Deno.ReaderSync) {
  return viewOf(r, 1).getUint8(0);
}

export function encodeShortUint(value: number) {
  if (value < 0 || value > 0xffff) {
    throw new Error("Invalid value for short-uint");
  }

  return createView(2, (v) => v.setUint16(0, value));
}

export function decodeShortUint(buf: Deno.ReaderSync) {
  return viewOf(buf, 2).getUint16(0);
}

export function encodeLongUint(value: number) {
  return createView(4, (v) => v.setUint32(0, value));
}

export function decodeLongUint(r: Deno.ReaderSync) {
  return viewOf(r, 4).getUint32(0);
}

export function encodeLongLongUint(value: number) {
  if (!Number.isSafeInteger(value)) {
    throw new Error(`Tried to encode unsafe integer`);
  }

  return createView(8, (v) => v.setBigUint64(0, BigInt(value)));
}

export function decodeLongLongUint(r: Deno.ReaderSync): number {
  const view = viewOf(r, 8);
  const result = Number(view.getBigUint64(0));
  if (!Number.isSafeInteger(result)) {
    throw new Error(`Tried to decode unsafe integer`);
  }
  return result;
}
