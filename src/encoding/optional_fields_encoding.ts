import { splitArray, padArray } from "./utils.ts";
import { decodeShortUint, encodeShortUint } from "./number_encoding.ts";
import {
  encodeFields,
  decodeField,
  AmqpField,
  AmqpFieldType,
  AmqpNumberField,
  AmqpStringField,
} from "./fields_encoding.ts";

function writeBitField(bits: boolean[]): number {
  if (bits.length > 16) {
    throw new Error(`Too many bits to fit in one byte`);
  }

  const field = (bits[0] ? 0b1000000000000000 : 0) |
    (bits[1] ? 0b0100000000000000 : 0) |
    (bits[2] ? 0b0010000000000000 : 0) |
    (bits[3] ? 0b0001000000000000 : 0) |
    (bits[4] ? 0b0000100000000000 : 0) |
    (bits[5] ? 0b0000010000000000 : 0) |
    (bits[6] ? 0b0000001000000000 : 0) |
    (bits[7] ? 0b0000000100000000 : 0) |
    (bits[8] ? 0b0000000010000000 : 0) |
    (bits[9] ? 0b0000000001000000 : 0) |
    (bits[10] ? 0b0000000000100000 : 0) |
    (bits[11] ? 0b0000000000010000 : 0) |
    (bits[12] ? 0b0000000000001000 : 0) |
    (bits[13] ? 0b0000000000000100 : 0) |
    (bits[14] ? 0b0000000000000010 : 0) |
    (bits[15] ? 0b0000000000000001 : 0);

  return field;
}

function readBitField(num: number) {
  const bits: boolean[] = [];

  bits.push((0b1000000000000000 & num) !== 0);
  bits.push((0b0100000000000000 & num) !== 0);
  bits.push((0b0010000000000000 & num) !== 0);
  bits.push((0b0001000000000000 & num) !== 0);
  bits.push((0b0000100000000000 & num) !== 0);
  bits.push((0b0000010000000000 & num) !== 0);
  bits.push((0b0000001000000000 & num) !== 0);
  bits.push((0b0000000100000000 & num) !== 0);
  bits.push((0b0000000010000000 & num) !== 0);
  bits.push((0b0000000001000000 & num) !== 0);
  bits.push((0b0000000000100000 & num) !== 0);
  bits.push((0b0000000000010000 & num) !== 0);
  bits.push((0b0000000000001000 & num) !== 0);
  bits.push((0b0000000000000100 & num) !== 0);
  bits.push((0b0000000000000010 & num) !== 0);
  bits.push((0b0000000000000001 & num) !== 0);

  return bits;
}

export interface AmqpOptionalNumberField {
  type: AmqpNumberField["type"];
  value: number | undefined;
}

export interface AmqpOptionalStringField {
  type: AmqpStringField["type"];
  value: string | undefined;
}

export interface AmqpOptionalBitField {
  type: "bit";
  value: boolean | undefined;
}

export interface AmqpOptionalTableField {
  type: "table";
  value: Record<string, unknown> | undefined;
}

export type AmqpOptionalField =
  | AmqpOptionalNumberField
  | AmqpOptionalStringField
  | AmqpOptionalBitField
  | AmqpOptionalTableField;

export type AmqpOptionalFieldValue = AmqpOptionalField["value"];

export function encodeFlags(flags: boolean[]) {
  const buffer = new Deno.Buffer();
  const chunks = splitArray(flags, 15);
  chunks.forEach((chunk, index) => {
    const bits = padArray(chunk, 15, false);
    bits.push(index < chunks.length - 1);
    buffer.writeSync(encodeShortUint(writeBitField(bits)));
  });
  return buffer.bytes();
}

export function decodeFlags(r: Deno.ReaderSync) {
  let bits = readBitField(decodeShortUint(r));

  const flags = bits.slice(0, 15);
  while (bits[bits.length - 1]) {
    bits = readBitField(decodeShortUint(r));
    flags.push(...bits.slice(0, 15));
  }

  return flags;
}

function isDefinedField(field: AmqpOptionalField): field is AmqpField {
  return field.value !== undefined;
}

export function encodeOptionalFields(fields: AmqpOptionalField[]): Uint8Array {
  const payload = new Deno.Buffer();

  const flags = fields.map((field) =>
    field.type === "bit" ? !!field.value : field.value !== undefined
  );

  const definedFields = fields.filter(isDefinedField).filter((f) =>
    f.type !== "bit"
  );

  payload.writeSync(encodeFlags(flags));
  payload.writeSync(encodeFields(definedFields));

  return payload.bytes();
}

export function decodeOptionalFields(
  r: Deno.ReaderSync,
  types: AmqpFieldType[],
): AmqpOptionalFieldValue[] {
  const fields: AmqpOptionalFieldValue[] = [];
  const flags = decodeFlags(r);

  for (let i = 0; i < types.length; ++i) {
    const type = types[i];
    const flag = flags[i];
    if (type === "bit") {
      fields.push(flag);
    } else if (flag) {
      fields.push(decodeField(r, type));
    } else {
      fields.push(undefined);
    }
  }

  return fields;
}
