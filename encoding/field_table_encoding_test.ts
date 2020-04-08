import {
  assertEquals,
  bufferOf,
  arrayOf,
  test,
} from "../testing.ts";
import * as enc from "./field_table_encoding.ts";

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
