import {
  assertEquals,
  bufferOf,
  arrayOf,
  test,
} from "../testing.ts";
import * as enc from "./bit_field_encoding.ts";

test("encode bit field - single bit", () => {
  const result = enc.encodeBits([true]);
  assertEquals(result, arrayOf(0b00000001));
});

test("encode bit field - full byte", () => {
  const result = enc.encodeBits([
    true,
    false,
    false,
    true,
    false,
    true,
    true,
    true,
  ]);
  assertEquals(result, arrayOf(0b11101001));
});

test("encode bit field - less than byte", () => {
  const result = enc.encodeBits([true, false, false, true, false, true, true]);
  assertEquals(result, arrayOf(0b01101001));
});

test("encode bit field - longer than one byte", () => {
  const result = enc.encodeBits([
    true,
    false,
    false,
    true,
    false,
    true,
    true,
    true,
    false,
    true,
  ]);

  assertEquals(result, arrayOf(0b11101001, 0b00000010));
});

test("decode bit field - full byte", () => {
  const data = bufferOf(0b10010111);
  const expected = [
    true,
    true,
    true,
    false,
    true,
    false,
    false,
    true,
  ];
  assertEquals(enc.decodeBits(data, 8), expected);
});

test("decode bit field - more than a byte", () => {
  const data = bufferOf(0b11101001, 0b00010010);
  const expected = [
    true,
    false,
    false,
    true,
    false,
    true,
    true,
    true,
    //
    false,
    true,
    false,
    false,
    true,
  ];
  assertEquals(enc.decodeBits(data, 13), expected);
});
