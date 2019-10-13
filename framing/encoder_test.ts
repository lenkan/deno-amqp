import { test } from "https://deno.land/std/testing/mod.ts";
import {
  assertEquals,
  assertThrows
} from "https://deno.land/std/testing/asserts.ts";
import { createEncoder } from "./encoder.ts";

const { Buffer } = Deno;

function arrayOf(a: number[]) {
  return new Uint8Array(a);
}

function octet(n: number) {
  const e = createEncoder();
  e.encodeOctet(n);
  return e.bytes();
}

function shortUint(n: number) {
  const e = createEncoder();
  e.encodeShortUint(n);
  return e.bytes();
}

function longUint(n: number) {
  const buffer = createEncoder();
  buffer.encodeLongUint(n);
  return buffer.bytes();
}

function longlongUint(n: number) {
  const buffer = createEncoder();
  buffer.encodeLongLongUint(n);
  return buffer.bytes();
}

function shortString(s: string) {
  const buffer = createEncoder();
  buffer.encodeShortString(s);
  return buffer.bytes();
}

function longString(s: string) {
  const buffer = createEncoder();
  buffer.encodeLongString(s);
  return buffer.bytes();
}

function bits(values: boolean[]) {
  const buffer = createEncoder();
  for (const val of values) {
    buffer.encodeBit(val);
  }
  return buffer.bytes();
}

test(function encodeOctet() {
  assertEquals(octet(0), arrayOf([0]));
  assertEquals(octet(137), arrayOf([137]));
  assertEquals(octet(255), arrayOf([255]));
});

test(function encodeOctetInvalid() {
  assertThrows(() => octet(-1));
  assertThrows(() => octet(256));
});

test(function encodeShortUint() {
  assertEquals(shortUint(0), arrayOf([0, 0]));
  assertEquals(shortUint(137), arrayOf([0, 137]));
  assertEquals(shortUint(65535), arrayOf([255, 255]));
});

test(function encodeShortUintInvalid() {
  assertThrows(() => shortUint(-1));
  assertThrows(() => shortUint(65536));
});

test(function encodeLongUint() {
  assertEquals(longUint(0), arrayOf([0, 0, 0, 0]));
  assertEquals(longUint(137), arrayOf([0, 0, 0, 137]));
  assertEquals(longUint(65535), arrayOf([0, 0, 255, 255]));
  assertEquals(longUint(4294967295), arrayOf([255, 255, 255, 255]));
});

test(function encodeLongUintInvalid() {
  assertThrows(() => longUint(-1));
  assertThrows(() => longUint(4294967296));
});

test(function encodeShortString() {
  assertEquals(shortString("abc"), arrayOf([3, 97, 98, 99]));
  assertEquals(shortString("ö"), arrayOf([2, 195, 182]));
  assertEquals(shortString(""), arrayOf([0]));
});

test(function encodeShortStringInvalid() {
  const value = Array.from({ length: 256 })
    .fill("a")
    .join("");
  assertThrows(() => shortString(value));
});

test(function encodeLongString() {
  assertEquals(longString("abc"), arrayOf([0, 0, 0, 3, 97, 98, 99]));
  assertEquals(longString("ö"), arrayOf([0, 0, 0, 2, 195, 182]));
  assertEquals(longString(""), arrayOf([0, 0, 0, 0]));
});

test(function encodeBit() {
  assertEquals(bits([true]), arrayOf([0b00000001]));
  assertEquals(bits([true, false, true]), arrayOf([0b00000101]));
  assertEquals(
    bits([true, false, true, false, false, false, false, false, true]),
    arrayOf([0b00000101, 0x01])
  );
});

test(function encodeBitsAndOctet() {
  const encoder = createEncoder();
  encoder.encodeBit(true);
  encoder.encodeBit(false);
  encoder.encodeBit(true);
  encoder.encodeOctet(0xde);
  const result = encoder.bytes();
  assertEquals(result, [0b00000101, 0xde]);
});
