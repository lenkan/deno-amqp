export function splitArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  let index = 0;

  while (index < arr.length) {
    chunks.push(arr.slice(index, size + index));
    index += size;
  }

  return chunks;
}

export function padArray<T>(array: T[], size: number, value: T) {
  const padding = Array.from<T>({ length: size - array.length }).fill(value);
  return array.concat(...padding);
}

export function assertLength(arr: Uint8Array, length: number) {
  if (arr.length < length) {
    throw new Error(`Not enough data in array`);
  }
}

export async function readBytes(
  r: Deno.Reader,
  length: number,
): Promise<Uint8Array | null> {
  const data = new Uint8Array(length);
  const n = await r.read(data);

  if (n === 0) {
    return readBytes(r, length);
  }

  if (n !== length) {
    return null;
  }

  return data;
}

export function readBytesSync(r: Deno.ReaderSync, length: number): Uint8Array {
  const data = new Uint8Array(length);
  const result = r.readSync(data);

  if (result !== length) {
    throw new Error("Not enough data in buffer");
  }

  return data;
}
