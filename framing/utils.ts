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

export function readBytesSync(r: Deno.SyncReader, length: number): Uint8Array {
  const data = new Uint8Array(length);
  const result = r.readSync(data);

  if (result !== length) {
    throw new Error("Not enough data in buffer");
  }

  return data;
}
