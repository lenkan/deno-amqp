import {
  assertEquals,
  bufferOf,
  arrayOf,
  test,
  assertThrows,
  assertArrayContains,
} from "../testing.ts";
import * as enc from "./field_table_encoding.ts";

function charCode(type: string) {
  return type.charCodeAt(0);
}

function tableOf(data: Uint8Array) {
  const length = data.length;
  return new Uint8Array([
    ...[0, 0, 0, length],
    ...data,
  ]);
}

test("encode table - throws on invalid field names", () => {
  const illegalNames = ["_foo", "1foo", " foo"];
  for (const illegalName of illegalNames) {
    assertThrows(
      () => enc.encodeTable({ [illegalName]: 123 }),
      Error,
      "Invalid field name",
      illegalName,
    );
  }
});

test("encode table - with array", () => {
  const table = {
    a: [123, true, "abc"],
  };

  const encoded = enc.encodeTable(table);
  assertEquals(
    encoded,
    arrayOf(
      ...[0, 0, 0, 19],
      ...[1, 97],
      ...[65, 0, 0, 0, 12],
      ...[98, 123],
      ...[116, 1],
      ...[83, 0, 0, 0, 3, 97, 98, 99],
    ),
  );
});

test("decode table - with array", () => {
  const table = {
    a: [123, true, "abc"],
  };

  const data = bufferOf(
    ...[0, 0, 0, 22],
    ...[1, 97],
    ...[65, 0, 0, 0, 15],
    ...[105, 0, 0, 0, 123],
    ...[116, 1],
    ...[83, 0, 0, 0, 3, 97, 98, 99],
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
  assertEquals(
    Array.from(encoded.values()).slice(4),
    [1, 110, 100, 64, 94, 221, 47, 26, 159, 190, 119],
  );
});

test("encode table with negative double precision floating point value", () => {
  const table = {
    n: -123.456,
  };

  const encoded = enc.encodeTable(table);
  assertEquals(
    Array.from(encoded.values()).slice(4),
    [1, 110, 100, 192, 94, 221, 47, 26, 159, 190, 119],
  );
});

test("encode table with shortshort integer value", () => {
  const table = {
    n: 123,
  };

  const encoded = enc.encodeTable(table);
  assertEquals(
    Array.from(encoded.values()).slice(4),
    [1, 110, 98, 123],
  );
});

test("encode table with shortshort negative integer value", () => {
  const table = {
    n: -123,
  };

  const encoded = enc.encodeTable(table);
  assertEquals(
    Array.from(encoded.values()).slice(4),
    [1, 110, 98, 0x85],
  );
});

test("encode table with short integer value", () => {
  const table = {
    n: 1233,
    p: -1203,
  };

  const encoded = enc.encodeTable(table);
  assertEquals(
    Array.from(encoded.values()).slice(4, 4 + 5),
    [1, 110, 115, 4, 209],
  );

  assertEquals(
    Array.from(encoded.values()).slice(9),
    [1, 112, 115, 251, 77],
  );
});

test("encode null value", () => {
  const table = {
    n: null,
  };

  const arr = tableOf(
    arrayOf(1, charCode("n"), charCode("V")),
  );

  const encoded = enc.encodeTable(table);
  assertEquals(encoded, arr);
});

test("decode null value", () => {
  const table = {
    n: null,
  };

  const arr = tableOf(
    arrayOf(1, charCode("n"), charCode("V")),
  );

  const decoded = enc.decodeTable(new Deno.Buffer(arr));
  assertEquals(decoded, table);
});

test("encode undefined value", () => {
  const table = {
    n: undefined,
  };

  const arr = tableOf(arrayOf());

  const encoded = enc.encodeTable(table);
  assertEquals(encoded, arr);
});

test("encode byte array", () => {
  const table = {
    n: arrayOf(1, 2, 3),
  };

  const arr = tableOf(
    arrayOf(1, charCode("n"), charCode("x"), 0, 0, 0, 3, ...table.n),
  );

  const encoded = enc.encodeTable(table);
  assertEquals(encoded, arr);
});

test("decode byte array", () => {
  const expected = {
    n: arrayOf(1, 2, 3),
  };

  const arr = tableOf(
    arrayOf(1, charCode("n"), charCode("x"), 0, 0, 0, 3, ...expected.n),
  );

  const reader = new Deno.Buffer(arr);
  const decoded = enc.decodeTable(reader);
  assertEquals(decoded, expected);
});
