import {
  encodeShortUint,
  encodeLongUint,
  encodeLongLongUint,
  encodeOctet,
  decodeShortUint,
  decodeLongUint,
  decodeLongLongUint,
  decodeOctet,
} from "./number_encoding.ts";
import { encodeTable, decodeTable } from "./field_table_encoding.ts";
import {
  encodeShortString,
  encodeLongString,
  decodeShortString,
  decodeLongString,
} from "./string_encoding.ts";
import { encodeBits } from "./bit_field_encoding.ts";

export interface AmqpNumberField {
  type: "octet" | "short" | "long" | "longlong" | "timestamp";
  value: number;
}

export interface AmqpStringField {
  type: "shortstr" | "longstr";
  value: string;
}

export interface AmqpBitField {
  type: "bit";
  value: boolean;
}

export interface AmqpTableField {
  type: "table";
  value: Record<string, unknown>;
}

export type AmqpField =
  | AmqpNumberField
  | AmqpStringField
  | AmqpBitField
  | AmqpTableField;

export type AmqpFieldType = AmqpField["type"];
export type AmqpFieldValue = AmqpField["value"];

function assertUnreachable(_x: never): never {
  throw new Error(`Unreachable code executed`);
}

function encodeField(
  field: Exclude<AmqpField, Extract<AmqpField, { type: "bit" }>>,
) {
  switch (field.type) {
    case "short":
      return encodeShortUint(field.value);
    case "long":
      return encodeLongUint(field.value);
    case "longlong":
      return encodeLongLongUint(field.value);
    case "table":
      return encodeTable(field.value);
    case "octet":
      return encodeOctet(field.value);
    case "shortstr":
      return encodeShortString(field.value);
    case "longstr":
      return encodeLongString(field.value);
    case "timestamp":
      return encodeLongLongUint(field.value);
    default:
      assertUnreachable(field);
  }
}

export function encodeFields(fields: AmqpField[]): Uint8Array {
  let bits: boolean[] = [];
  const buffer = new Deno.Buffer();

  for (const field of fields) {
    if (field.type === "bit") {
      bits.push(field.value);
    } else {
      if (bits.length) {
        buffer.writeSync(encodeBits(bits));
        bits.splice(0, bits.length);
      }

      buffer.writeSync(encodeField(field));
    }
  }

  if (bits.length) {
    buffer.writeSync(encodeBits(bits));
  }

  return buffer.bytes();
}

export function decodeField(
  r: Deno.ReaderSync,
  type: Exclude<AmqpFieldType, "bit">,
) {
  switch (type) {
    case "short":
      return decodeShortUint(r);
    case "long":
      return decodeLongUint(r);
    case "longlong":
    case "timestamp":
      return decodeLongLongUint(r);
    case "table":
      return decodeTable(r);
    case "octet":
      return decodeOctet(r);
    case "shortstr":
      return decodeShortString(r);
    case "longstr":
      return decodeLongString(r);
    default:
      assertUnreachable(type);
  }
}

export function decodeFields(
  reader: Deno.ReaderSync,
  types: AmqpFieldType[],
): AmqpFieldValue[] {
  const values: AmqpFieldValue[] = [];
  let bitField: number | null = null;
  let bitPointer = 7;
  for (const type of types) {
    if (type === "bit") {
      if (bitField === null || bitPointer < 0) {
        bitField = decodeOctet(reader);
        bitPointer = 7;
      }

      const value = !!(bitField & (1 << bitPointer--));
      values.push(value);
      continue;
    }

    values.push(decodeField(reader, type));
  }

  return values;
}
