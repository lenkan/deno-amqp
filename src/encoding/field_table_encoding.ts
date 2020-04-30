import {
  encodeOctet,
  encodeLongUint,
  decodeLongUint,
  decodeOctet,
} from "./number_encoding.ts";
import {
  encodeShortString,
  decodeLongString,
  decodeShortString,
  encodeLongString,
} from "./string_encoding.ts";

const { Buffer } = Deno;

function charCode(type: string) {
  return type.charCodeAt(0);
}

function fromCharCode(code: number) {
  return new TextDecoder().decode(new Uint8Array([code]));
}

function viewOf(r: Deno.ReaderSync, length: number): DataView {
  const data = new Uint8Array(length);
  const result = r.readSync(data);

  if (typeof result !== "number" || result !== length) {
    throw new Error(
      `Not enough data in buffer (expected: ${length}, got: ${result})`,
    );
  }

  return new DataView(data.buffer);
}

function createView(
  size: number,
  setter: (v: DataView) => void,
): Uint8Array {
  const p = new Uint8Array(size);
  const view = new DataView(p.buffer);
  setter(view);
  return p;
}

const CHARCODE_A = charCode("A");
const CHARCODE_Z = charCode("Z");
const CHARCODE_a = charCode("a");
const CHARCODE_z = charCode("z");
const CHARCODE_underscore = charCode("_");
const CHARCODE_dollar = charCode("$");
const CHARCODE_hash = charCode("#");
const validChars = [CHARCODE_dollar, CHARCODE_hash, CHARCODE_underscore];

function isAlpha(code: number) {
  return (code >= CHARCODE_A && code <= CHARCODE_Z) ||
    (code >= CHARCODE_a && code <= CHARCODE_z);
}

function isNumeric(code: number) {
  return (code >= 47 && code <= 58);
}

function isAllowedCharatacter(code: number) {
  return isAlpha(code) || isNumeric(code) || validChars.includes(code);
}

function assertValidFieldName(name: string) {
  if (!isAlpha(name.charCodeAt(0))) {
    throw new Error(`Invalid field name '${name}'`);
  }

  for (let i = 1; i < name.length; i++) {
    if (!isAllowedCharatacter(name.charCodeAt(i))) {
      throw new Error(`Invalid field name '${name}'`);
    }
  }
}

/**
 * https://www.rabbitmq.com/amqp-0-9-1-errata.html#section_3
 */
enum TableFieldType {
  Boolean = charCode("t"), // 116
  ShortShortInt = charCode("b"), // 98
  ShortShortUInt = charCode("B"), // 66
  ShortInt = charCode("s"), // 115
  ShortUInt = charCode("u"), // 117
  LongInt = charCode("I"), // 73
  LongUInt = charCode("i"), // 105
  LongLongInt = charCode("l"), // 108
  Float = charCode("f"), // 102
  Double = charCode("d"), // 100
  Decimal = charCode("D"), // 68
  LongStr = charCode("S"), // 83
  FieldArray = charCode("A"), // 65
  Timestamp = charCode("T"), // 84
  FieldTable = charCode("F"), // 70
  NoValue = charCode("V"), // 86
  ByteArray = charCode("x"), // 120
}

function encodeNumber(value: number) {
  if (Math.round(value) !== value || !Number.isSafeInteger(value)) {
    return createView(9, (v) => {
      v.setUint8(0, TableFieldType.Double);
      v.setFloat64(1, value);
    });
  }

  if (value >= -0x80 && value < 0x80) {
    return createView(2, (v) => {
      v.setUint8(0, TableFieldType.ShortShortInt);
      v.setInt8(1, value);
    });
  }

  if (value >= -0x8000 && value < 0x8000) {
    return createView(3, (v) => {
      v.setUint8(0, TableFieldType.ShortInt);
      v.setInt16(1, value);
    });
  }

  if (value >= -0x80000000 && value < 0x80000000) {
    return createView(5, (v) => {
      v.setUint8(0, TableFieldType.LongInt);
      v.setInt32(1, value);
    });
  }

  return createView(5, (v) => {
    v.setUint8(0, TableFieldType.LongInt);
    v.setBigInt64(1, BigInt(value));
  });
}

function encodeTableField(value: unknown): Uint8Array {
  if (value instanceof Uint8Array) {
    return new Uint8Array([
      ...createView(5, (v) => {
        v.setUint8(0, TableFieldType.ByteArray);
        v.setUint32(1, value.length);
      }),
      ...value,
    ]);
  }

  if (value === null) {
    return new Uint8Array([TableFieldType.NoValue]);
  }

  if (typeof value === "number") {
    return encodeNumber(value);
  }

  if (typeof value === "string") {
    return new Uint8Array([
      TableFieldType.LongStr,
      ...encodeLongString(value),
    ]);
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

function decodeTableFieldArray(r: Deno.ReaderSync): unknown[] {
  const length = decodeLongUint(r);
  const data = new Uint8Array(length);
  const n = r.readSync(data);

  if (n !== length) {
    throw new Error(`Not enough data in reader for array`);
  }

  const buffer = new Deno.Buffer(data);
  const array: unknown[] = [];

  while (!buffer.empty()) {
    const value = decodeTableField(buffer);
    array.push(value);
  }

  return array;
}

function fromBigInt(value: bigint): number {
  const num = Number(value);
  if (!Number.isSafeInteger(num)) {
    throw new Error(`Received unsafe integer`);
  }

  return num;
}

function readByteArray(r: Deno.ReaderSync) {
  const length = viewOf(r, 4).getUint32(0);
  return readBytes(r, length);
}

function readBytes(r: Deno.ReaderSync, length: number) {
  const data = new Uint8Array(length);
  if (r.readSync(data) !== length) {
    throw new Error(`Not enough data in reader`);
  }
  return data;
}

function decodeTableField(r: Deno.Buffer): unknown {
  const type: TableFieldType = decodeOctet(r);
  switch (type) {
    case TableFieldType.Boolean:
      return viewOf(r, 1).getUint8(0) > 0;
    case TableFieldType.ShortShortUInt:
      return viewOf(r, 1).getUint8(0);
    case TableFieldType.ShortShortInt:
      return viewOf(r, 1).getInt8(0);
    case TableFieldType.ShortUInt:
      return viewOf(r, 2).getUint16(0);
    case TableFieldType.ShortInt:
      return viewOf(r, 2).getInt16(0);
    case TableFieldType.LongUInt:
      return viewOf(r, 4).getUint32(0);
    case TableFieldType.LongInt:
      return viewOf(r, 4).getInt32(0);
    case TableFieldType.LongLongInt:
      return fromBigInt(viewOf(r, 8).getBigInt64(0));
    case TableFieldType.Float:
      return viewOf(r, 4).getFloat32(0);
    case TableFieldType.Double:
      return viewOf(r, 8).getFloat64(0);
    case TableFieldType.Decimal:
      // TODO: decode decimal
      throw new Error("Cant decode decimal");
    case TableFieldType.LongStr:
      return decodeLongString(r);
    case TableFieldType.FieldArray:
      return decodeTableFieldArray(r);
    case TableFieldType.Timestamp:
      return fromBigInt(viewOf(r, 8).getBigUint64(0));
    case TableFieldType.FieldTable:
      return decodeTable(r);
    case TableFieldType.NoValue:
      return null;
    case TableFieldType.ByteArray:
      return readByteArray(r);
    default:
      throw new Error(`Unknown table field type ${fromCharCode(type)}`);
  }
}

export function encodeTable(table: Record<string, unknown>) {
  const buffer = new Buffer();
  for (const fieldName of Object.keys(table)) {
    const value = table[fieldName];
    if (value !== undefined) {
      assertValidFieldName(fieldName);
      buffer.writeSync(encodeShortString(fieldName));
      buffer.writeSync(encodeTableField(value));
    }
  }

  const result = buffer.bytes();
  return new Uint8Array([...encodeLongUint(result.length), ...result]);
}

export function decodeTable(r: Deno.ReaderSync): Record<string, unknown> {
  const length = decodeLongUint(r);
  const data = new Uint8Array(length);
  const n = r.readSync(data);

  if (n !== length) {
    throw new Error("Not enough data in reader");
  }

  const buffer = new Deno.Buffer(data);
  const result: Record<string, unknown> = {};

  while (!buffer.empty()) {
    const fieldName = decodeShortString(buffer);
    const fieldValue = decodeTableField(buffer);
    result[fieldName] = fieldValue;
  }

  return result;
}
