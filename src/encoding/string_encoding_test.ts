import {
  assertEquals,
  assertThrows,
  bufferOf,
  arrayOf,
  test,
} from "../testing.ts";
import * as enc from "./string_encoding.ts";

test("encode short string", () => {
  assertEquals(enc.encodeShortString("abc"), arrayOf(3, 97, 98, 99));
  assertEquals(enc.encodeShortString("ö"), arrayOf(2, 195, 182));
  assertEquals(enc.encodeShortString(""), arrayOf(0));
});

test("decode short string", () => {
  assertEquals(enc.decodeShortString(bufferOf(3, 97, 98, 99)), "abc");
  assertEquals(enc.decodeShortString(bufferOf(2, 195, 182)), "ö");
  assertEquals(enc.decodeShortString(bufferOf(0)), "");
});

test("encode short string - too long throws", () => {
  const value = Array.from({ length: 256 })
    .fill("a")
    .join("");
  assertThrows(() => enc.encodeShortString(value));
});

test("encode long string", () => {
  assertEquals(enc.encodeLongString("abc"), arrayOf(0, 0, 0, 3, 97, 98, 99));
  assertEquals(enc.encodeLongString("ö"), arrayOf(0, 0, 0, 2, 195, 182));
  assertEquals(enc.encodeLongString(""), arrayOf(0, 0, 0, 0));
});

test("decode long string", () => {
  assertEquals(enc.decodeLongString(bufferOf(0, 0, 0, 3, 97, 98, 99)), "abc");
  assertEquals(enc.decodeLongString(bufferOf(0, 0, 0, 2, 195, 182)), "ö");
  assertEquals(enc.decodeLongString(bufferOf(0, 0, 0, 0)), "");
});

test("decode long string - invalid throws", () => {
  assertThrows(() => enc.decodeLongString(bufferOf()));
  assertThrows(() => enc.decodeLongString(bufferOf(0, 0, 0)));
  assertThrows(() => enc.decodeLongString(bufferOf(0, 0, 0, 3, 97, 98)));
});
