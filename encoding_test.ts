import { test } from "https://deno.land/std/testing/mod.ts";
import {
  assertEquals,
  assertThrows
} from "https://deno.land/std/testing/asserts.ts";
import * as e from "./encoding.ts";

test(function encodeOctet() {
  assertEquals(e.encodeOctet(0), new Uint8Array([0]));
  assertEquals(e.encodeOctet(137), new Uint8Array([137]));
  assertEquals(e.encodeOctet(255), new Uint8Array([255]));
});

test(function encodeOctetInvalid() {
  assertThrows(() => e.encodeOctet(-1));
  assertThrows(() => e.encodeOctet(256));
});

test(function encodeShortUint() {
  assertEquals(e.encodeShortUint(0), new Uint8Array([0, 0]));
  assertEquals(e.encodeShortUint(137), new Uint8Array([0, 137]));
  assertEquals(e.encodeShortUint(65535), new Uint8Array([255, 255]));
});

test(function encodeShortUintInvalid() {
  assertThrows(() => e.encodeShortUint(-1));
  assertThrows(() => e.encodeShortUint(65536));
});

test(function encodeLongUint() {
  assertEquals(e.encodeLongUint(0), new Uint8Array([0, 0, 0, 0]));
  assertEquals(e.encodeLongUint(137), new Uint8Array([0, 0, 0, 137]));
  assertEquals(e.encodeLongUint(65535), new Uint8Array([0, 0, 255, 255]));
  assertEquals(
    e.encodeLongUint(4294967295),
    new Uint8Array([255, 255, 255, 255])
  );
});

test(function encodeLongUintInvalid() {
  assertThrows(() => e.encodeLongUint(-1));
  assertThrows(() => e.encodeLongUint(4294967296));
});

test(function encodeShortString() {
  assertEquals(e.encodeShortString("abc"), new Uint8Array([3, 97, 98, 99]));
  assertEquals(e.encodeShortString("ö"), new Uint8Array([2, 195, 182]));
  assertEquals(e.encodeShortString(""), new Uint8Array([0]));
});

test(function encodeShortStringInvalid() {
  const value = Array.from({ length: 256 })
    .fill("a")
    .join("");
  assertThrows(() => e.encodeShortString(value));
});

test(function encodeLongString() {
  assertEquals(
    e.encodeLongString("abc"),
    new Uint8Array([0, 0, 0, 3, 97, 98, 99])
  );
  assertEquals(e.encodeLongString("ö"), new Uint8Array([0, 0, 0, 2, 195, 182]));
  assertEquals(e.encodeLongString(""), new Uint8Array([0, 0, 0, 0]));
});
