import {
  assertEquals,
  bufferOf,
  arrayOf,
  test
} from "../testing.ts";
import * as enc from "./fields_encoding.ts";

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
