import {
  assertEquals,
  bufferOf,
  arrayOf,
  test,
} from "../testing.ts";
import * as enc from "./field_table_encoding.ts";
import { assertArrayContains } from "https://deno.land/std@v0.40.0/testing/asserts.ts";
test("encode table - with array", () => {
  const table = {
    a: [123, true, "abc"],
  };

  const encoded = enc.encodeTable(table);
  assertEquals(encoded, arrayOf(
    ...[0, 0, 0, 19],
    ...[1, 97],
    ...[65, 0, 0, 0, 12],
    ...[105, 0, 0, 0, 123],
    ...[116, 1],
    ...[115, 3, 97, 98, 99],
  ));
});

test("decode table - with array", () => {
  const table = {
    a: [123, true, "abc"],
  };
  const data = bufferOf(
    ...[0, 0, 0, 19],
    ...[1, 97],
    ...[65, 0, 0, 0, 12],
    ...[105, 0, 0, 0, 123],
    ...[116, 1],
    ...[115, 3, 97, 98, 99],
  );

  const encoded = enc.decodeTable(data);
  assertEquals(encoded, table);
});

test("encode decode table", () => {
  const table = {
    shortString: "abc",
    numberValue: 123,
    nestedTable: {
      nestedValue: 123,
    },
    booleanTrueValue: true,
    booleanFalseValue: true,
    arrayField: [
      123,
      true,
      "abc",
    ],
  };

  const encoded = enc.encodeTable(table);
  const decoded = enc.decodeTable(new Deno.Buffer(encoded));
  assertEquals(decoded, table);
});

test("encode decode table with floating point value", () => {
  const table = {
    numberValue: 123.456,
  };

  const encoded = enc.encodeTable(table);
  const decoded = enc.decodeTable(new Deno.Buffer(encoded));
  assertEquals(decoded, table);
});

test("decode table with double precision floating point value", () => {
  const data = bufferOf(...[
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
  ]);
  const decoded = enc.decodeTable(data);
  assertEquals(decoded, { n: 123.456 });
});

test("decode table with single precision floating point value", () => {
  const data = bufferOf(...[
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
  ]);
  const decoded = enc.decodeTable(data);
  assertEquals(decoded, { n: 3.4822499752044678 });
});

test("encode table with double precision floating point value", () => {
  const table = {
    n: 123.456,
  };

  const encoded = enc.encodeTable(table);
  assertArrayContains(
    Array.from(encoded.values()),
    [1, 110, 100, 64, 94, 221, 47, 26, 159, 190, 119],
  );
});

test("encode table with negative double precision floating point value", () => {
  const table = {
    n: -123.456,
  };

  const encoded = enc.encodeTable(table);
  assertArrayContains(
    Array.from(encoded.values()),
    [1, 110, 100, 192, 94, 221, 47, 26, 159, 190, 119],
  );
});

test("encode table with integer point value", () => {
  const table = {
    n: 123,
  };

  const encoded = enc.encodeTable(table);
  assertArrayContains(
    Array.from(encoded.values()),
    [1, 110, 105, 0, 0, 0, 123],
  );
});
