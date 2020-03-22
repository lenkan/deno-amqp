import { splitArray, padArray } from "./utils.ts";
import {
  encodeFields,
  decodeField,
  AmqpField,
  AmqpFieldType,
  AmqpNumberField,
  AmqpBigintField,
  AmqpStringField
} from "./fields_encoding.ts";
import { decodeBits, encodeBits } from "./bit_field_encoding.ts";

export interface AmqpOptionalNumberField {
  type: AmqpNumberField["type"];
  value: number | undefined;
}

export interface AmqpOptionalBigintField {
  type: AmqpBigintField["type"];
  value: bigint | undefined;
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

export type AmqpOptionalField = AmqpOptionalNumberField
  | AmqpOptionalBigintField
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
    buffer.writeSync(encodeBits(bits));
  });
  return buffer.bytes();
}

export function decodeFlags(r: Deno.SyncReader) {
  let bits = decodeBits(r, 16);

  const flags = bits.slice(0, 15);
  while (bits[bits.length - 1]) {
    bits = decodeBits(r, 16);
    flags.push(...bits.slice(0, 15));
  }

  return flags;
}

export function encodeOptionalFields(fields: AmqpOptionalField[]): Uint8Array {
  const payload = new Deno.Buffer();

  const flags = fields.map(field =>
    field.type === "bit" ? !!field.value : field.value !== undefined
  );

  const definedFields = fields.filter((
    field: AmqpOptionalField
  ): field is AmqpField => field.type !== "bit" && field.value !== undefined
  );

  payload.writeSync(encodeFlags(flags));
  payload.writeSync(encodeFields(definedFields));

  return payload.bytes();
}

export function decodeOptionalFields(
  r: Deno.SyncReader,
  types: AmqpFieldType[]
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
