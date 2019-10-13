import { test } from "https://deno.land/std/testing/mod.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { createDecoder } from "./decoder.ts";
import { createEncoder } from "./encoder.ts";

test(function encodeDecodeTable() {
  const encoder = createEncoder();
  const table = {
    foo: "bar",
    longString: Array.from<string>({ length: 350 })
      .fill("a")
      .join(""),
    bar: 123,
    nested: {
      foo: "bar"
    }
  };

  encoder.encodeTable(table);
  const decoder = createDecoder(encoder.bytes());

  const result = decoder.decodeTable();
  assertEquals(table, result);
});
