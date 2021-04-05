import { arrayOf, assertEquals, assertThrows } from "../testing.ts";
import { AmqpEncoder } from "./amqp_encoder.ts";
import { AmqpFieldType, AmqpFieldValue } from "./amqp_field_types.ts";
import { charCode } from "./utils.ts";

function tableOf(data: Uint8Array) {
  const length = data.length;
  return new Uint8Array([
    ...[0, 0, 0, length],
    ...data,
  ]);
}

function test(
  type: AmqpFieldType,
  value: AmqpFieldValue,
  expected: Uint8Array,
): [string, () => void] {
  const valueString = JSON.stringify(value);
  return [
    `encode ${type} - ${valueString} -> ${expected}`,
    () => {
      const encoder = new AmqpEncoder();
      // deno-lint-ignore no-explicit-any
      encoder.write(type as any, value as any);
      assertEquals(encoder.result(), expected);
    },
  ];
}

function testerError(
  type: AmqpFieldType,
  value: AmqpFieldValue,
  message?: string,
): [string, () => void] {
  const valueString = JSON.stringify(value);
  return [
    `encode ${type} - ${valueString} -> throws '${message}'`,
    () => {
      const encoder = new AmqpEncoder();
      assertThrows(
        // deno-lint-ignore no-explicit-any
        () => encoder.write(type as any, value as any),
        Error,
        message,
      );
    },
  ];
}

function testEncodeBits(
  arr: boolean[],
  expected: Uint8Array,
): [string, () => void] {
  return [
    `encode bits - ${arr} -> ${expected}`,
    () => {
      const encoder = new AmqpEncoder();
      for (const value of arr) {
        encoder.write("bit", value);
      }
      assertEquals(encoder.result(), expected);
    },
  ];
}

Deno.test(...test("uint8", 0, arrayOf(0)));
Deno.test(...test("uint8", 137, arrayOf(137)));
Deno.test(...test("uint8", 255, arrayOf(255)));
Deno.test(...testerError("uint8", -1, "value '-1' is out of range"));
Deno.test(...testerError("uint8", 256, "value '256' is out of range"));

Deno.test(...test("uint16", 0, arrayOf(0, 0)));
Deno.test(...test("uint16", 137, arrayOf(0, 137)));
Deno.test(...test("uint16", 65535, arrayOf(255, 255)));
Deno.test(...test("uint16", 0xEBCD, arrayOf(0xEB, 0xCD)));

Deno.test(...testerError("uint16", -1, "value '-1' is out of range"));
Deno.test(...testerError("uint16", 65536, "value '65536' is out of range"));

Deno.test(...test("uint32", 0, arrayOf(0, 0, 0, 0)));
Deno.test(...test("uint32", 137, arrayOf(0, 0, 0, 137)));
Deno.test(...test("uint32", 65535, arrayOf(0, 0, 255, 255)));
Deno.test(...test("uint32", 4294967295, arrayOf(255, 255, 255, 255)));
Deno.test(...testerError("uint32", 4294967296, ""));

Deno.test(
  ...test(
    "uint64",
    0x00000000fbcdef00,
    arrayOf(0x00, 0x00, 0x00, 0x00, 0xfb, 0xcd, 0xef, 0x00),
  ),
);

Deno.test(
  ...testerError("uint64", 0xFFFFFFFFfbcdef00, ""),
);

Deno.test(...test("shortstr", "abc", arrayOf(3, 97, 98, 99)));
Deno.test(...test("shortstr", "ö", arrayOf(2, 195, 182)));
Deno.test(...test("shortstr", "", arrayOf(0)));
Deno.test(...testerError(
  "shortstr",
  Array.from({ length: 256 })
    .fill("a")
    .join(""),
  "",
));

Deno.test(...test("longstr", "abc", arrayOf(0, 0, 0, 3, 97, 98, 99)));
Deno.test(...test("longstr", "ö", arrayOf(0, 0, 0, 2, 195, 182)));
Deno.test(...test("longstr", "", arrayOf(0, 0, 0, 0)));

Deno.test(...testEncodeBits([true], arrayOf(0b00000001)));
Deno.test(...testEncodeBits([
  true,
  false,
  false,
  true,
  false,
  true,
  true,
  true,
], arrayOf(0b11101001)));

Deno.test(...testEncodeBits([
  true,
  false,
  false,
  true,
  false,
  true,
  true,
], arrayOf(0b01101001)));

Deno.test(...testEncodeBits([
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
], arrayOf(0b11101001, 0b00000010)));

Deno.test(...testerError("table", { _foo: 123 }, "Invalid field name"));
Deno.test(...testerError("table", { "1foo": 123 }, "Invalid field name"));
Deno.test(...testerError("table", { " foo": 123 }, "Invalid field name"));
Deno.test(...test(
  "table",
  { "a": 1 },
  arrayOf(
    ...[0, 0, 0, 4],
    ...[1, 97],
    ...[98, 1],
  ),
));

Deno.test(...test(
  "table",
  { "a-b": 1 },
  arrayOf(
    ...[0, 0, 0, 6],
    ...[3, 97, 45, 98],
    ...[98, 1],
  ),
));

Deno.test(...test(
  "table",
  { a: [123, true, "abc"] },
  arrayOf(
    ...[0, 0, 0, 19],
    ...[1, 97],
    ...[65, 0, 0, 0, 12],
    ...[98, 123],
    ...[116, 1],
    ...[83, 0, 0, 0, 3, 97, 98, 99],
  ),
));

Deno.test(...test(
  "table",
  { n: 123.456 },
  tableOf(arrayOf(1, 110, 100, 64, 94, 221, 47, 26, 159, 190, 119)),
));

Deno.test(...test(
  "table",
  { n: -123.456 },
  tableOf(arrayOf(1, 110, 100, 192, 94, 221, 47, 26, 159, 190, 119)),
));

Deno.test(...test(
  "table",
  { n: 123 },
  tableOf(arrayOf(1, 110, 98, 123)),
));

Deno.test(...test(
  "table",
  { n: -123 },
  tableOf(arrayOf(1, 110, 98, 0x85)),
));

Deno.test(...test(
  "table",
  { n: 1233 },
  tableOf(arrayOf(1, 110, 115, 4, 209)),
));

Deno.test(...test(
  "table",
  { n: -1203 },
  tableOf(arrayOf(1, 110, 115, 251, 77)),
));

Deno.test(...test(
  "table",
  { n: null },
  tableOf(arrayOf(1, charCode("n"), charCode("V"))),
));

Deno.test(...test(
  "table",
  { n: undefined },
  tableOf(arrayOf()),
));

Deno.test(...test(
  "table",
  { n: arrayOf(1, 2, 3) },
  tableOf(
    arrayOf(1, charCode("n"), charCode("x"), 0, 0, 0, 3, 1, 2, 3),
  ),
));

Deno.test("encode fields", () => {
  const encoder = new AmqpEncoder();
  encoder.write("uint8", 123);
  encoder.write("shortstr", "abc");
  encoder.write("bit", true);
  encoder.write("bit", false);
  encoder.write("bit", true);

  assertEquals(
    encoder.result(),
    arrayOf(123, 3, 97, 98, 99, 0b00000101),
  );
});

Deno.test("encode fields - large bit array at end", () => {
  const encoder = new AmqpEncoder();
  encoder.write("uint8", 123);
  encoder.write("bit", true);
  encoder.write("bit", false);
  encoder.write("bit", true);
  encoder.write("bit", true);
  encoder.write("bit", false);
  encoder.write("bit", true);
  encoder.write("bit", true);
  encoder.write("bit", false);
  //
  encoder.write("bit", true);
  encoder.write("bit", false);

  assertEquals(
    encoder.result(),
    arrayOf(123, 0b01101101, 0b00000001),
  );
});

Deno.test("encode fields - large bit array at start", () => {
  const encoder = new AmqpEncoder();
  encoder.write("bit", true);
  encoder.write("bit", false);
  encoder.write("bit", true);
  encoder.write("bit", true);
  encoder.write("bit", false);
  encoder.write("bit", true);
  encoder.write("bit", true);
  encoder.write("bit", false);
  //
  encoder.write("bit", true);
  encoder.write("bit", false);
  encoder.write("uint8", 123);

  assertEquals(
    encoder.result(),
    arrayOf(0b01101101, 0b00000001, 123),
  );
});

Deno.test(...test(
  "flags",
  [true, false, true],
  arrayOf(
    0b10100000,
    0b00000000,
  ),
));

Deno.test(...test(
  "flags",
  [
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
  ],
  arrayOf(
    0b10110110,
    0b10000000,
  ),
));

Deno.test(...test(
  "flags",
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
  arrayOf(
    0b10110110,
    0b10110111, // The last bit is set to indicate additional flags
    0b01000000,
    0b00000000,
  ),
));
