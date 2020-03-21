import {
  assertEquals,
  assertThrows
} from "https://deno.land/std/testing/asserts.ts";
import * as enc from "./encoder.ts";
import { padArray } from "./utils.ts";

const { test } = Deno;

function arrayOf(...a: number[]) {
  return new Uint8Array(a);
}

function bufferOf(...a: number[]) {
  return new Deno.Buffer(arrayOf(...a));
}

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

test("encode long uint - invalid throws", () => {
  assertThrows(() => enc.encodeLongUint(-1));
  assertThrows(() => enc.encodeLongUint(4294967296));
});

test("encode long long uint", () => {
  assertEquals(
    enc.encodeLongLongUint("00000000fbcdef00"),
    arrayOf(0x00, 0x00, 0x00, 0x00, 0xfb, 0xcd, 0xef, 0x00)
  );
});

test("decode long long uint - leading zeroes", () => {
  const data = bufferOf(0x00, 0x00, 0x00, 0x00, 0x0F, 0xFF, 0xFF, 0xFF);
  assertEquals(enc.decodeLongLongUint(data), "000000000fffffff");
});

test("decode long long uint - 255", () => {
  const data = bufferOf(0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xFF);
  assertEquals(enc.decodeLongLongUint(data), "00000000000000ff");
});

test("decode long long uint - max-safe", () => {
  const data = bufferOf(0x00, 0x1f, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff);
  assertEquals(enc.decodeLongLongUint(data), "001fffffffffffff");
});

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

test("encode table - with array", () => {
  const table = {
    a: [123, true, "abc"]
  };

  const encoded = enc.encodeTable(table);
  assertEquals(encoded, arrayOf(
    ...[0, 0, 0, 19],
    ...[1, 97],
    ...[65, 0, 0, 0, 12],
    ...[105, 0, 0, 0, 123],
    ...[116, 1],
    ...[115, 3, 97, 98, 99]
  ));
});

test("decode table - with array", () => {
  const table = {
    a: [123, true, "abc"]
  };
  const data = bufferOf(
    ...[0, 0, 0, 19],
    ...[1, 97],
    ...[65, 0, 0, 0, 12],
    ...[105, 0, 0, 0, 123],
    ...[116, 1],
    ...[115, 3, 97, 98, 99]
  );

  const encoded = enc.decodeTable(data);
  assertEquals(encoded, table);
});

test("encode decode table", () => {
  const table = {
    shortString: "abc",
    numberValue: 123,
    nestedTable: {
      nestedValue: 123
    },
    booleanTrueValue: true,
    booleanFalseValue: true,
    arrayField: [
      123,
      true,
      "abc"
    ]
  };

  const encoded = enc.encodeTable(table);
  const decoded = enc.decodeTable(new Deno.Buffer(encoded));
  assertEquals(decoded, table);
});

test("encode fields", () => {
  const fields: enc.AmqpField[] = [
    { type: "octet", value: 123 },
    { type: "shortstr", value: "abc" },
    { type: "bit", value: true },
    { type: "bit", value: false },
    { type: "bit", value: true }
  ];
  assertEquals(
    enc.encodeFields(fields),
    arrayOf(123, 3, 97, 98, 99, 0b10100000)
  );
});

test("encode fields - large bit array at end", () => {
  const fields: enc.AmqpField[] = [
    { type: "octet", value: 123 },
    { type: "bit", value: true },
    { type: "bit", value: false },
    { type: "bit", value: true },
    { type: "bit", value: true },
    { type: "bit", value: false },
    { type: "bit", value: true },
    { type: "bit", value: true },
    { type: "bit", value: false },
    { type: "bit", value: true },
    { type: "bit", value: false }
  ];

  assertEquals(
    enc.encodeFields(fields),
    arrayOf(123, 0b10110110, 0b10000000)
  );
});

test("encode fields - large bit array at start", () => {
  const fields: enc.AmqpField[] = [
    { type: "bit", value: true },
    { type: "bit", value: false },
    { type: "bit", value: true },
    { type: "bit", value: true },
    { type: "bit", value: false },
    { type: "bit", value: true },
    { type: "bit", value: true },
    { type: "bit", value: false },
    { type: "bit", value: true },
    { type: "bit", value: false },
    { type: "octet", value: 123 }
  ];

  assertEquals(
    enc.encodeFields(fields),
    arrayOf(0b10110110, 0b10000000, 123)
  );
});

test("decode fields", () => {
  const data = bufferOf(123, 3, 97, 98, 99, 0b10100000);
  const types: enc.AmqpFieldType[] = [
    "octet",
    "shortstr",
    "bit",
    "bit",
    "bit"
  ];

  const expected: enc.AmqpFieldValue[] = [123, "abc", true, false, true];

  assertEquals(enc.decodeFields(data, types), expected);
});

test("decode fields - large bit array at end", () => {
  const data = bufferOf(123, 0b10110110, 0b10000000);
  const types: enc.AmqpFieldType[] = [
    "octet",
    "bit",
    "bit",
    "bit",
    "bit",
    "bit",
    "bit",
    "bit",
    "bit",
    "bit",
    "bit"
  ];

  const expected: enc.AmqpFieldValue[] = [
    123,
    true,
    false,
    true,
    true,
    false,
    true,
    true,
    false,
    true,
    false
  ];

  assertEquals(enc.decodeFields(data, types), expected);
});

test("decode fields - large bit array at start", () => {
  const data = bufferOf(0b10110110, 0b10000000, 123);
  const types: enc.AmqpFieldType[] = [
    "bit",
    "bit",
    "bit",
    "bit",
    "bit",
    "bit",
    "bit",
    "bit",
    "bit",
    "bit",
    "octet"
  ];

  const expected: enc.AmqpFieldValue[] = [
    true,
    false,
    true,
    true,
    false,
    true,
    true,
    false,
    true,
    false,
    123
  ];

  assertEquals(enc.decodeFields(data, types), expected);
});

test("encode flags - less than one byte", () => {
  assertEquals(enc.encodeFlags([true, false, true]), arrayOf(
    0b10100000,
    0b00000000
  ));
});

test("encode flags - more than one byte", () => {
  assertEquals(enc.encodeFlags([
    // First byte
    true,
    false,
    true,
    true,
    false,
    true,
    true,
    false,
    // Second byte
    true
  ]), arrayOf(
    0b10110110,
    0b10000000
  ));
});

test("encode flags - more than 15 flags", () => {
  assertEquals(enc.encodeFlags([
    true, // flag 0
    false,
    true,
    true,
    false,
    true,
    true,
    false, // flag 7
    true,
    false,
    true,
    true,
    false,
    true,
    true, // flag 15
    false, // flag 16
    true // flag 17
  ]), arrayOf(
    0b10110110,
    0b10110111, // The last bit is set to indicate additional flags
    0b01000000,
    0b00000000
  ));
});

test("decode flags - less than one byte", () => {
  const data = bufferOf(
    0b10100000,
    0b00000000
  );

  const expected = padArray([true, false, true, false], 15, false);
  assertEquals(enc.decodeFlags(data), expected);
});

test("decode flags - more than two bytes", () => {
  const data = bufferOf(
    0b10110110,
    0b10110111, // The last bit is set to indicate additional flags
    0b01000000,
    0b00000000
  );

  const expected = padArray([
    true, // flag 0
    false,
    true,
    true,
    false,
    true,
    true,
    false, // flag 7
    true,
    false,
    true,
    true,
    false,
    true,
    true, // flag 15
    false, // flag 16
    true // flag 17
  ], 30, false);

  assertEquals(enc.decodeFlags(data), expected);
});

test("encode header props - without properties", () => {
  assertEquals(enc.encodeProperties([]), arrayOf());
});

test("encode header props - with all properties defined", () => {
  const fields: enc.AmqpOptionalField[] = [
    { type: "octet", value: 13 },
    { type: "short", value: 19 }
  ];
  assertEquals(
    enc.encodeProperties(fields),
    arrayOf(0b11000000, 0b000000, 13, 0, 19)
  );
});

test("encode header props - with missing property", () => {
  const fields: enc.AmqpOptionalField[] = [
    { type: "octet", value: 13 },
    { type: "short", value: undefined },
    { type: "short", value: 19 }
  ];

  assertEquals(
    enc.encodeProperties(fields),
    arrayOf(0b10100000, 0b000000, 13, 0, 19)
  );
});

test("encode header props - with bit property", () => {
  const fields: enc.AmqpOptionalField[] = [
    { type: "octet", value: 13 },
    { type: "bit", value: true },
    { type: "short", value: 19 }
  ];

  assertEquals(
    enc.encodeProperties(fields),
    arrayOf(0b11100000, 0b000000, 13, 0, 19)
  );
});

test("decode header props - with all properties defined", () => {
  const data = bufferOf(0b11000000, 0b000000, 13, 0, 19);
  const expected: enc.AmqpFieldValue[] = [13, 19];

  assertEquals(
    enc.decodeProperties(data, ["octet", "short"]),
    expected
  );
});

test("decode header props - with missing property", () => {
  const data = bufferOf(0b10100000, 0b000000, 13, 0, 19);
  const expected: enc.AmqpOptionalFieldValue[] = [13, undefined, 19];

  assertEquals(
    enc.decodeProperties(data, ["octet", "short", "short"]),
    expected
  );
});
