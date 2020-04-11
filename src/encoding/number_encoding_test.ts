import {
  assertEquals,
  assertThrows,
  bufferOf,
  arrayOf,
  test,
} from "../testing.ts";
import * as enc from "./number_encoding.ts";

test("encode octet", () => {
  assertEquals(enc.encodeOctet(0), arrayOf(0));
  assertEquals(enc.encodeOctet(137), arrayOf(137));
  assertEquals(enc.encodeOctet(255), arrayOf(255));
});

test("encode octet - invalid throws", () => {
  assertThrows(() => enc.encodeOctet(-1));
  assertThrows(() => enc.encodeOctet(256));
});

test("decode octet", () => {
  assertEquals(enc.decodeOctet(bufferOf(0)), 0);
  assertEquals(enc.decodeOctet(bufferOf(123)), 123);
  assertEquals(enc.decodeOctet(bufferOf(255)), 255);
});

test("decode octet - not enough data throws", () => {
  assertThrows(() => enc.decodeOctet(bufferOf()));
});

test("encode short uint", () => {
  assertEquals(enc.encodeShortUint(0), arrayOf(0, 0));
  assertEquals(enc.encodeShortUint(137), arrayOf(0, 137));
  assertEquals(enc.encodeShortUint(65535), arrayOf(255, 255));
  assertEquals(enc.encodeShortUint(0xEBCD), arrayOf(0xEB, 0xCD));
});

test("decode short uint", () => {
  assertEquals(enc.decodeShortUint(bufferOf(0, 0)), 0);
  assertEquals(enc.decodeShortUint(bufferOf(0, 137)), 137);
  assertEquals(enc.decodeShortUint(bufferOf(255, 255)), 65535);
  assertEquals(enc.decodeShortUint(bufferOf(0xEB, 0xCD)), 0xEBCD);
});

test("encode short uint - invalid throws", () => {
  assertThrows(() => enc.encodeShortUint(-1));
  assertThrows(() => enc.encodeShortUint(65536));
});

test("decode short uint - not enough data throws", () => {
  assertThrows(() => enc.decodeShortUint(bufferOf(0)));
});

test("encode long uint", () => {
  assertEquals(enc.encodeLongUint(0), arrayOf(0, 0, 0, 0));
  assertEquals(enc.encodeLongUint(137), arrayOf(0, 0, 0, 137));
  assertEquals(enc.encodeLongUint(65535), arrayOf(0, 0, 255, 255));
  assertEquals(enc.encodeLongUint(4294967295), arrayOf(255, 255, 255, 255));
});

test("decode long uint", () => {
  assertEquals(enc.decodeLongUint(bufferOf(0, 0, 0, 0)), 0);
  assertEquals(enc.decodeLongUint(bufferOf(0, 0, 0, 137)), 137);
  assertEquals(enc.decodeLongUint(bufferOf(0, 0, 1, 201)), 457);
});

test("encode long long uint", () => {
  assertEquals(
    enc.encodeLongLongUint(0x00000000fbcdef00),
    arrayOf(0x00, 0x00, 0x00, 0x00, 0xfb, 0xcd, 0xef, 0x00),
  );
});

test("decode long long uint - leading zeroes", () => {
  const data = bufferOf(0x00, 0x00, 0x00, 0x00, 0x0F, 0xFF, 0xFF, 0xFF);
  assertEquals(enc.decodeLongLongUint(data), 0x000000000fffffff);
});

test("decode long long uint - 255", () => {
  const data = bufferOf(0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xFF);
  assertEquals(enc.decodeLongLongUint(data), 0x00000000000000ff);
});

test("decode long long uint - max-safe", () => {
  const data = bufferOf(0x00, 0x1f, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff);
  assertEquals(enc.decodeLongLongUint(data), 0x001fffffffffffff);
});
