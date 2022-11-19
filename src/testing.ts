import { Buffer } from "../deps.ts";

export {
  assert,
  assertEquals,
  assertMatch,
  assertRejects,
  assertThrows,
} from "../deps_dev.ts";
export const { test } = Deno;

export function arrayOf(...a: number[]) {
  return new Uint8Array(a);
}

export function bufferOf(...a: number[]) {
  return new Buffer(arrayOf(...a));
}
