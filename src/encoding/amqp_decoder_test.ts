import {
  assertEquals,
  assertThrows,
  arrayOf,
} from "../testing.ts";
import { AmqpDecoder } from "./amqp_decoder.ts";
import { AmqpFieldType, AmqpFieldValue } from "./amqp_field_types.ts";
import { padArray, charCode } from "./utils.ts";

function testDecodeBits(
  data: Uint8Array,
  expected: boolean[],
): [string, () => void] {
  return [
    `decode bits - ${data} -> ${expected}`,
    () => {
      const decoder = new AmqpDecoder(data);
      const bits = expected.map(() => {
        return decoder.read("bit");
      });

      assertEquals(bits, expected);
    },
  ];
}

function tableOf(data: Uint8Array) {
  const length = data.length;
  return new Uint8Array([
    ...[0, 0, 0, length],
    ...data,
  ]);
}

function test(
  type: AmqpFieldType,
  data: Uint8Array,
  value: AmqpFieldValue,
): [string, () => void] {
  return [
    `decode ${type} - ${data} -> ${JSON.stringify(value)}`,
    () => {
      const decoder = new AmqpDecoder(data);
      assertEquals(decoder.read(type), value);
    },
  ];
}

function testError(
  type: AmqpFieldType,
  data: Uint8Array,
  message?: string,
): [string, () => void] {
  return [
    `decode ${type} - ${data} -> ${message}`,
    () => {
      const decoder = new AmqpDecoder(data);
      assertThrows(() => decoder.read(type), Error, message);
    },
  ];
}

Deno.test(...test("uint8", arrayOf(0), 0));
Deno.test(...test("uint8", arrayOf(123), 123));
Deno.test(...test("uint8", arrayOf(255), 255));
Deno.test(...testError("uint8", arrayOf(), "Not enough data"));

Deno.test(...test("uint16", arrayOf(0, 0), 0));
Deno.test(...test("uint16", arrayOf(0, 137), 137));
Deno.test(...test("uint16", arrayOf(255, 255), 65535));
Deno.test(...test("uint16", arrayOf(0xEB, 0xCD), 0xEBCD));
Deno.test(...testError("uint16", arrayOf(), "Not enough data"));
Deno.test(...testError("uint16", arrayOf(0), "Not enough data"));

Deno.test(...test("uint32", arrayOf(0, 0, 0, 0), 0));
Deno.test(...test("uint32", arrayOf(0, 0, 0, 137), 137));
Deno.test(...test("uint32", arrayOf(0, 0, 1, 201), 457));

Deno.test(
  ...test(
    "uint64",
    arrayOf(0x00, 0x00, 0x00, 0x00, 0x0F, 0xFF, 0xFF, 0xFF),
    0xfffffff,
  ),
);

Deno.test(
  ...test(
    "uint64",
    arrayOf(0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xFF),
    255,
  ),
);

Deno.test(
  ...test(
    "uint64",
    arrayOf(0x00, 0x1f, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff),
    0x001fffffffffffff,
  ),
);

Deno.test(...testDecodeBits(
  arrayOf(0b11101001),
  [
    true,
    true,
    true,
    false,
    true,
    false,
    false,
    true,
  ],
));

Deno.test(...testDecodeBits(
  arrayOf(0b10010111, 0b01001000),
  [
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
  ],
));

Deno.test(...test(
  "table",
  arrayOf(
    ...[0, 0, 0, 22],
    ...[1, 97],
    ...[65, 0, 0, 0, 15],
    ...[105, 0, 0, 0, 123],
    ...[116, 1],
    ...[83, 0, 0, 0, 3, 97, 98, 99],
  ),
  {
    a: [123, true, "abc"],
  },
));

Deno.test(...test(
  "table",
  arrayOf(...[
    0,
    0,
    0,
    11,
    1,
    110,
    100,
    64,
    94,
    221,
    47,
    26,
    159,
    190,
    119,
  ]),
  { n: 123.456 },
));

Deno.test(...test(
  "table",
  arrayOf(...[
    0,
    0,
    0,
    7,
    1,
    110,
    102,
    64,
    94,
    221,
    47,
  ]),
  { n: 3.4822499752044678 },
));

Deno.test(...test(
  "table",
  tableOf(
    arrayOf(1, charCode("n"), charCode("V")),
  ),
  {
    n: null,
  },
));

Deno.test(...test(
  "table",
  tableOf(
    arrayOf(1, charCode("n"), charCode("x"), 0, 0, 0, 3, 1, 2, 3),
  ),
  {
    n: arrayOf(1, 2, 3),
  },
));

Deno.test("decode fields - some bits", () => {
  const data = arrayOf(123, 3, 97, 98, 99, 0b10110000);
  const decoder = new AmqpDecoder(data);

  const actual = [
    decoder.read("uint8"),
    decoder.read("shortstr"),
    decoder.read("bit"),
    decoder.read("bit"),
    decoder.read("bit"),
    decoder.read("bit"),
  ];

  const expected: AmqpFieldValue[] = [123, "abc", true, false, true, true];

  assertEquals(actual, expected);
});

Deno.test("decode fields - large bit array at end", () => {
  const data = arrayOf(123, 0b10110110, 0b10000000);
  const decoder = new AmqpDecoder(data);
  const actual = [
    decoder.read("uint8"),
    decoder.read("bit"),
    decoder.read("bit"),
    decoder.read("bit"),
    decoder.read("bit"),
    decoder.read("bit"),
    decoder.read("bit"),
    decoder.read("bit"),
    decoder.read("bit"),
    decoder.read("bit"),
    decoder.read("bit"),
  ];

  const expected: AmqpFieldValue[] = [
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
    false,
  ];

  console.log();
  console.log(JSON.stringify(actual));
  console.log(JSON.stringify(expected));
  assertEquals(actual, expected);
});

Deno.test("decode fields - large bit array at start", () => {
  const data = arrayOf(0b10110110, 0b10000000, 123);

  const decoder = new AmqpDecoder(data);
  const actual = [
    decoder.read("bit"),
    decoder.read("bit"),
    decoder.read("bit"),
    decoder.read("bit"),
    decoder.read("bit"),
    decoder.read("bit"),
    decoder.read("bit"),
    decoder.read("bit"),
    decoder.read("bit"),
    decoder.read("bit"),
    decoder.read("uint8"),
  ];
  const expected: AmqpFieldValue[] = [
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
    123,
  ];

  assertEquals(actual, expected);
});

Deno.test(...test("shortstr", arrayOf(3, 97, 98, 99), "abc"));
Deno.test(...test("shortstr", arrayOf(2, 195, 182), "ö"));
Deno.test(...test("shortstr", arrayOf(0), ""));

Deno.test(...test("longstr", arrayOf(0, 0, 0, 3, 97, 98, 99), "abc"));
Deno.test(...test("longstr", arrayOf(0, 0, 0, 2, 195, 182), "ö"));
Deno.test(...test("longstr", arrayOf(0, 0, 0, 0), ""));
Deno.test(...testError("longstr", arrayOf(0), "Not enough data"));
Deno.test(...testError("longstr", arrayOf(0, 0, 0), "Not enough data"));
Deno.test(
  ...testError("longstr", arrayOf(0, 0, 0, 3, 97, 98), "Not enough data"),
);

Deno.test(...test(
  "flags",
  arrayOf(
    0b10100000,
    0b00000000,
  ),
  padArray([true, false, true, false], 15, false),
));

Deno.test(...test(
  "flags",
  arrayOf(
    0b10110110,
    0b10110111, // The last bit is set to indicate additional flags
    0b01000000,
    0b00000000,
  ),
  padArray(
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
  ),
));
