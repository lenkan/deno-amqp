import { test } from "https://deno.land/std/testing/mod.ts";
import {
  assertEquals,
  assertThrows
} from "https://deno.land/std/testing/asserts.ts";
import { createDecoder } from "./decoder.ts";

function decoderOf(arr: Iterable<number>) {
  return createDecoder(new Uint8Array(arr));
}

test(function decodeOctet() {
  assertEquals(decoderOf([0]).decodeOctet(), 0);
  assertEquals(decoderOf([137]).decodeOctet(), 137);
  assertEquals(decoderOf([255]).decodeOctet(), 255);
});

test(function decodeOctetInvalid() {
  assertThrows(() => decoderOf([]).decodeOctet());
});

test(function decodeShortUint() {
  assertEquals(decoderOf([0, 0]).decodeShortUint(), 0);
  assertEquals(decoderOf([0, 137]).decodeShortUint(), 137);
  assertEquals(decoderOf([255, 255]).decodeShortUint(), 65535);
});

test(function decodeShortUintInvalid() {
  assertThrows(() => decoderOf([]).decodeShortUint());
  assertThrows(() => decoderOf([0]).decodeShortUint());
});

test(function decodeLongUint() {
  assertEquals(decoderOf([0, 0, 0, 0]).decodeLongUint(), 0);
  assertEquals(decoderOf([0, 0, 0, 137]).decodeLongUint(), 137);
  assertEquals(decoderOf([0, 0, 1, 201]).decodeLongUint(), 457);
});

test(function decodeShortString() {
  assertEquals(decoderOf([3, 97, 98, 99]).decodeShortString(), "abc");
  assertEquals(decoderOf([2, 195, 182]).decodeShortString(), "ö");
  assertEquals(decoderOf([0]).decodeShortString(), "");
});

test(function decodeShortStringInvalid() {
  assertThrows(() => decoderOf([]).decodeShortString());
  assertThrows(() => {
    const d = decoderOf([0]);
    d.decodeShortString();
    d.decodeShortString();
  });
});

test(function decodeLongtring() {
  assertEquals(decoderOf([0, 0, 0, 3, 97, 98, 99]).decodeLongString(), "abc");
  assertEquals(decoderOf([0, 0, 0, 2, 195, 182]).decodeLongString(), "ö");
  assertEquals(decoderOf([0, 0, 0, 0]).decodeLongString(), "");
});

test(function decodeLongStringInvalid() {
  assertThrows(() => decoderOf([]).decodeLongString());
  assertThrows(() => decoderOf([0, 0, 0]).decodeLongString());
  assertThrows(() => decoderOf([0, 0, 0, 3, 97, 98]).decodeLongString());
});

test(function decodeTrueBit() {
  assertEquals(decoderOf([0x01]).decodeBit(), true);
});

test(function decodeFalseBit() {
  assertEquals(decoderOf([0x10]).decodeBit(), false);
});

test(function decodeSingleOctetBitField() {
  const decoder = decoderOf([0b01001001]);

  const result = [
    decoder.decodeBit(),
    decoder.decodeBit(),
    decoder.decodeBit(),
    decoder.decodeBit(),
    decoder.decodeBit(),
    decoder.decodeBit(),
    decoder.decodeBit(),
    decoder.decodeBit()
  ];

  assertEquals(result, [true, false, false, true, false, false, true, false]);
});

test(function decodeDoubleOctetBitField() {
  const decoder = decoderOf([0b01001001, 0b00000001]);

  const result = [
    decoder.decodeBit(),
    decoder.decodeBit(),
    decoder.decodeBit(),
    decoder.decodeBit(),
    decoder.decodeBit(),
    decoder.decodeBit(),
    decoder.decodeBit(),
    decoder.decodeBit(),
    decoder.decodeBit()
  ];

  assertEquals(result, [
    true,
    false,
    false,
    true,
    false,
    false,
    true,
    false,
    true
  ]);
});

test(function decodeBitsBetweenOctets() {
  const decoder = decoderOf([0xff, 0b00000101, 0xff, 0b00000001]);

  const result = [
    decoder.decodeOctet(),
    decoder.decodeBit(),
    decoder.decodeBit(),
    decoder.decodeBit(),
    decoder.decodeOctet(),
    decoder.decodeBit()
  ];

  assertEquals(result, [0xff, true, false, true, 0xff, true]);
});

test(function decodeLongLongUint() {
  const data = [0xff, 0xff, 0xff, 0xfe, 0xdf, 0x1f, 0xff, 0xff];
  const decoder = decoderOf(data);

  const result = decoder.decodeLongLongUint();
  assertEquals(data, result);
});
