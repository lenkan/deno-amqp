import {
  assertEquals,
  bufferOf,
  arrayOf,
  test
} from "../testing.ts";
import * as enc from "./bit_field_encoding.ts";

test("encode bit field - full byte", () => {
  const result = enc.encodeBits([
    true,
    false,
    false,
    true,
    false,
    true,
    true,
    true
  ]);
  assertEquals(result, arrayOf(0b10010111));
});

test("encode bit field - less than byte", () => {
  const result = enc.encodeBits([true, false, false, true, false, true, true]);
  assertEquals(result, arrayOf(0b10010110));
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
    true
  ]);

  assertEquals(result, arrayOf(0b10010111, 0b01000000));
});

test("decode bit field - full byte", () => {
  const data = bufferOf(0b10010111);
  const expected = [
    true,
    false,
    false,
    true,
    false,
    true,
    true,
    true
  ];
  assertEquals(enc.decodeBits(data, 8), expected);
});

test("decode bit field - more than a byte", () => {
  const data = bufferOf(0b10010111, 0b01001000);
  const expected = [
    true,
    false,
    false,
    true,
    false,
    true,
    true,
    true,
    // Second byte
    false,
    true,
    false,
    false,
    true
  ];
  assertEquals(enc.decodeBits(data, 13), expected);
});
