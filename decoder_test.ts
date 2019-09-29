import { test } from "https://deno.land/std/testing/mod.ts";
import {
  assertEquals,
  assertThrows
} from "https://deno.land/std/testing/asserts.ts";
import { createDecoder } from "./decoder.ts";

test(function decodeOctet() {
  assertEquals(createDecoder(new Uint8Array([0])).decodeOctet(), 0);
  assertEquals(createDecoder(new Uint8Array([137])).decodeOctet(), 137);
  assertEquals(createDecoder(new Uint8Array([255])).decodeOctet(), 255);
});

test(function decodeOctetInvalid() {
  assertThrows(() => createDecoder(new Uint8Array([])).decodeOctet());
});

test(function decodeShortUint() {
  assertEquals(createDecoder(new Uint8Array([0, 0])).decodeShortUint(), 0);
  assertEquals(createDecoder(new Uint8Array([0, 137])).decodeShortUint(), 137);
  assertEquals(
    createDecoder(new Uint8Array([255, 255])).decodeShortUint(),
    65535
  );
});

test(function decodeShortUintInvalid() {
  assertThrows(() => createDecoder(new Uint8Array([])).decodeShortUint());
  assertThrows(() => createDecoder(new Uint8Array([0])).decodeShortUint());
});

test(function decodeShortString() {
  assertEquals(
    createDecoder(new Uint8Array([3, 97, 98, 99])).decodeShortString(),
    "abc"
  );
  assertEquals(
    createDecoder(new Uint8Array([2, 195, 182])).decodeShortString(),
    "ö"
  );
  assertEquals(createDecoder(new Uint8Array([0])).decodeShortString(), "");
});

test(function decodeShortStringInvalid() {
  assertThrows(() => createDecoder(new Uint8Array([])).decodeShortString());
  assertThrows(() => {
    const d = createDecoder(new Uint8Array([0]));
    d.decodeShortString();
    d.decodeShortString();
  });
});

test(function decodeLongtring() {
  assertEquals(
    createDecoder(new Uint8Array([0, 0, 0, 3, 97, 98, 99])).decodeLongString(),
    "abc"
  );
  assertEquals(
    createDecoder(new Uint8Array([0, 0, 0, 2, 195, 182])).decodeLongString(),
    "ö"
  );
  assertEquals(
    createDecoder(new Uint8Array([0, 0, 0, 0])).decodeLongString(),
    ""
  );
});

test(function decodeLongStringInvalid() {
  assertThrows(() => createDecoder(new Uint8Array([])).decodeLongString());
  assertThrows(() =>
    createDecoder(new Uint8Array([0, 0, 0])).decodeLongString()
  );
  assertThrows(() =>
    createDecoder(new Uint8Array([0, 0, 0, 3, 97, 98])).decodeLongString()
  );
});

test(function things() {
  const arr = new Uint8Array([0, 1, 2, 3]);
  // arr.subarray = 2;
});
