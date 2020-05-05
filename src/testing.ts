export {
  assertEquals,
  assertThrows,
  assertThrowsAsync,
  assertStrContains,
  assertArrayContains,
  assertMatch,
  assert,
} from "https://deno.land/std@v1.0.0-rc1/testing/asserts.ts";
export const { test } = Deno;

export function arrayOf(...a: number[]) {
  return new Uint8Array(a);
}

export function bufferOf(...a: number[]) {
  return new Deno.Buffer(arrayOf(...a));
}
