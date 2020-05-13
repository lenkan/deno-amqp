import { assertEquals } from "../testing.ts";
import { AmqpEncoder } from "./amqp_encoder.ts";
import { AmqpDecoder } from "./amqp_decoder.ts";

function encodeTable(value: Record<string, unknown>) {
  const encoder = new AmqpEncoder();
  encoder.write("table", value);
  return encoder.result();
}

function decodeTable(data: Uint8Array): Record<string, unknown> {
  const decoder = new AmqpDecoder(data);
  return decoder.read("table");
}

Deno.test("encode decode table", () => {
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

  const encoded = encodeTable(table);
  const decoded = decodeTable(encoded);
  assertEquals(decoded, table);
});

Deno.test("encode decode table with floating point value", () => {
  const table = {
    numberValue: 123.456,
  };

  const encoded = encodeTable(table);
  const decoded = decodeTable(encoded);
  assertEquals(decoded, table);
});
