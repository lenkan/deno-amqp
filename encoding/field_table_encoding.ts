import {
  encodeOctet,
  encodeLongUint,
  decodeLongUint,
  decodeOctet,
  decodeLongLongUint,
} from "./number_encoding.ts";
import {
  encodeShortString,
  decodeLongString,
  decodeShortString,
} from "./string_encoding.ts";
import { readBytesSync } from "./utils.ts";

enum TableFieldType {
  Boolean = 116, // t
  ShortShortInt = 98, // b
  ShortShortUInt = 66, // B
  ShortInt = 115, // s
  ShortUInt = 117, // u
  LongInt = 73, // I
  LongUInt = 105, // i
  LongLongInt = 108, // l
  Float = 102, // f
  Double = 100, // d
  Decimal = 68, // D
  ShortStr = 115, // s
  LongStr = 83, // S
  FieldArray = 65, // A
  Timestamp = 84, // T
  FieldTable = 70, // F
  ByteArray = 120, // x
  NoValue = 86, // V
}

const { Buffer } = Deno;
const textEncoder = new TextEncoder();

function encodeTableField(value: unknown): Uint8Array {
  if (typeof value === "number") {
    return new Uint8Array([
      TableFieldType.LongUInt,
      ...encodeLongUint(value),
    ]);
  }

  if (typeof value === "string") {
    const encodedString = textEncoder.encode(value);
    if (encodedString.length <= 255) {
      return new Uint8Array([
        TableFieldType.ShortStr,
        ...encodeOctet(encodedString.length),
        ...encodedString,
      ]);
    } else {
      return new Uint8Array([
        TableFieldType.LongStr,
        ...encodeLongUint(encodedString.length),
        ...encodedString,
      ]);
    }
  }

  if (Array.isArray(value)) {
    const buf = new Deno.Buffer();
    value.forEach((v) => buf.writeSync(encodeTableField(v)));

    return new Uint8Array([
      TableFieldType.FieldArray,
      ...encodeLongUint(buf.length),
      ...buf.bytes(),
    ]);
  }

  if (typeof value === "object") {
    return new Uint8Array([
      TableFieldType.FieldTable,
      ...encodeTable(value as Record<string, unknown>),
    ]);
  }

  if (typeof value === "boolean") {
    return new Uint8Array([
      TableFieldType.Boolean,
      ...encodeOctet(1),
    ]);
  }

  throw new Error(
    `Don't know how to encode field of type ${typeof value} yet`,
  );
}

export function encodeTable(table: Record<string, unknown>) {
  const buffer = new Buffer();
  for (const fieldName of Object.keys(table)) {
    const value = table[fieldName];
    buffer.writeSync(encodeShortString(fieldName));
    buffer.writeSync(encodeTableField(value));
  }

  const result = buffer.bytes();
  return new Uint8Array([...encodeLongUint(result.length), ...result]);
}

function decodeTableFieldArray(r: Deno.SyncReader): unknown[] {
  const length = decodeLongUint(r);
  const buffer = new Deno.Buffer(readBytesSync(r, length));

  const array: unknown[] = [];

  while (!buffer.empty()) {
    const value = decodeTableField(buffer);
    array.push(value);
  }

  return array;
}

function decodeTableField(r: Deno.Buffer): unknown {
  const type = decodeOctet(r);
  switch (type) {
    case TableFieldType.Boolean:
      return decodeOctet(r) > 0;
    case TableFieldType.LongUInt:
      return decodeLongUint(r);
    case TableFieldType.LongLongInt:
      // TODO(lenkan): Decode numbers
      return decodeLongLongUint(r);
    case TableFieldType.LongStr:
      return decodeLongString(r);
    case TableFieldType.ShortStr:
      return decodeShortString(r);
    case TableFieldType.FieldTable:
      return decodeTable(r);
    case TableFieldType.FieldArray:
      return decodeTableFieldArray(r);
    default:
      throw new Error(`Unknown field type '${type}'`);
  }
}

export function decodeTable(r: Deno.SyncReader): Record<string, unknown> {
  const size = decodeLongUint(r);
  const result: Record<string, unknown> = {};
  const data = new Buffer(readBytesSync(r, size));

  while (!data.empty()) {
    const fieldName = decodeShortString(data);
    const fieldValue = decodeTableField(data);
    result[fieldName] = fieldValue;
  }

  return result;
}
