export {
  assertEquals,
  assertThrows,
  assertThrowsAsync,
  assertStringContains,
  assertArrayContains,
  assertMatch,
  assert,
} from "https://deno.land/std@0.71.0/testing/asserts.ts";
export const { test } = Deno;

export function arrayOf(...a: number[]) {
  return new Uint8Array(a);
}

export function bufferOf(...a: number[]) {
  return new Deno.Buffer(arrayOf(...a));
}
