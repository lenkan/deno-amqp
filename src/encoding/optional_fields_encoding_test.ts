import {
  assertEquals,
  bufferOf,
  arrayOf,
  test,
} from "../testing.ts";
import * as enc from "./optional_fields_encoding.ts";
import { padArray } from "./utils.ts";

test("encode flags - less than one byte", () => {
  assertEquals(
    enc.encodeFlags([true, false, true]),
    arrayOf(
      0b10100000,
      0b00000000,
    ),
  );
});

test("encode flags - more than one byte", () => {
  assertEquals(
    enc.encodeFlags([
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
      true,
    ]),
    arrayOf(
      0b10110110,
      0b10000000,
    ),
  );
});

test("encode flags - more than 15 flags", () => {
  assertEquals(
    enc.encodeFlags([
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
      true, // flag 17
    ]),
    arrayOf(
      0b10110110,
      0b10110111, // The last bit is set to indicate additional flags
      0b01000000,
      0b00000000,
    ),
  );
});

test("decode flags - less than one byte", () => {
  const data = bufferOf(
    0b10100000,
    0b00000000,
  );

  const expected = padArray([true, false, true, false], 15, false);
  assertEquals(enc.decodeFlags(data), expected);
});

test("decode flags - more than two bytes", () => {
  const data = bufferOf(
    0b10110110,
    0b10110111, // The last bit is set to indicate additional flags
    0b01000000,
    0b00000000,
  );

  const expected = padArray(
    [
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
      true, // flag 17
    ],
    30,
    false,
  );

  assertEquals(enc.decodeFlags(data), expected);
});

test("encode header props - without properties", () => {
  assertEquals(enc.encodeOptionalFields([]), arrayOf());
});

test("encode header props - with all properties defined", () => {
  const fields: enc.AmqpOptionalField[] = [
    { type: "octet", value: 13 },
    { type: "short", value: 19 },
  ];
  assertEquals(
    enc.encodeOptionalFields(fields),
    arrayOf(0b11000000, 0b000000, 13, 0, 19),
  );
});

test("encode header props - with missing property", () => {
  const fields: enc.AmqpOptionalField[] = [
    { type: "octet", value: 13 },
    { type: "short", value: undefined },
    { type: "short", value: 19 },
  ];

  assertEquals(
    enc.encodeOptionalFields(fields),
    arrayOf(0b10100000, 0b000000, 13, 0, 19),
  );
});

test("encode header props - with bit property", () => {
  const fields: enc.AmqpOptionalField[] = [
    { type: "octet", value: 13 },
    { type: "bit", value: true },
    { type: "short", value: 19 },
  ];

  assertEquals(
    enc.encodeOptionalFields(fields),
    arrayOf(0b11100000, 0b000000, 13, 0, 19),
  );
});

// test("decode header props - with all properties defined", () => {
//   const data = bufferOf(0b11000000, 0b000000, 13, 0, 19);
//   const expected: enc.AmqpOptionalFieldValue[] = [13, 19];

//   assertEquals(
//     enc.decodeOptionalFields(data, ["octet", "short"]),
//     expected
//   );
// });

// test("decode header props - with missing property", () => {
//   const data = bufferOf(0b10100000, 0b000000, 13, 0, 19);
//   const expected: enc.AmqpOptionalFieldValue[] = [13, undefined, 19];

//   assertEquals(
//     enc.decodeOptionalFields(data, ["octet", "short", "short"]),
//     expected
//   );
// });
