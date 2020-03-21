import {
  FRAME_BODY,
  FRAME_END,
  FRAME_HEARTBEAT,
  FRAME_HEADER,
  FRAME_METHOD
} from "../amqp_constants.ts";
import { splitArray, padArray, readBytesSync, readBytes } from "./utils.ts";
import { hex } from "../dependencies.ts";
const Buffer = Deno.Buffer;
const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

export interface AmqpOptionalNumberField {
  type: "octet" | "short" | "long";
  value: number | undefined;
}

export interface AmqpOptionalStringField {
  type: "shortstr" | "longstr" | "longlong" | "timestamp";
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

export interface AmqpNumberField extends AmqpOptionalNumberField {
  value: number;
}

export interface AmqpStringField extends AmqpOptionalStringField {
  value: string;
}

export interface AmqpBitField extends AmqpOptionalBitField {
  value: boolean;
}

export interface AmqpTableField extends AmqpOptionalTableField {
  value: Record<string, unknown>;
}

export type AmqpField = AmqpNumberField | AmqpStringField | AmqpBitField
  | AmqpTableField;
export type AmqpOptionalField = AmqpOptionalNumberField
  | AmqpOptionalStringField
  | AmqpOptionalBitField
  | AmqpOptionalTableField;

export type AmqpFieldType = AmqpField["type"];
export type AmqpFieldValue = AmqpField["value"];
export type AmqpOptionalFieldValue = AmqpOptionalField["value"];

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
  NoValue = 86 // V
}

function assertUnreachable(_x: never): never {
  throw new Error(`Unreachable code executed`);
}

function writeBitField(bits: boolean[]): number {
  if (bits.length > 8) {
    throw new Error(`Too many bits to fit in one byte`);
  }

  const field = (bits[0] ? 0b10000000 : 0) |
    (bits[1] ? 0b01000000 : 0) |
    (bits[2] ? 0b00100000 : 0) |
    (bits[3] ? 0b00010000 : 0) |
    (bits[4] ? 0b00001000 : 0) |
    (bits[5] ? 0b00000100 : 0) |
    (bits[6] ? 0b00000010 : 0) |
    (bits[7] ? 0b00000001 : 0);

  return field;
}

export function encodeBits(
  bits: boolean[]
): Uint8Array {
  const bytes = splitArray(bits, 8)
    .map(s => padArray(s, 8, false))
    .flatMap(writeBitField);

  return new Uint8Array(bytes);
}

export function decodeBits(r: Deno.SyncReader, length: number) {
  const bytes = Math.ceil(length / 8);
  const data = readBytesSync(r, bytes);
  const bits: boolean[] = [];

  for (const byte of data) {
    bits.push((0b10000000 & byte) !== 0);
    bits.push((0b01000000 & byte) !== 0);
    bits.push((0b00100000 & byte) !== 0);
    bits.push((0b00010000 & byte) !== 0);
    bits.push((0b00001000 & byte) !== 0);
    bits.push((0b00000100 & byte) !== 0);
    bits.push((0b00000010 & byte) !== 0);
    bits.push((0b00000001 & byte) !== 0);
  }

  return bits.slice(0, length);
}

export function encodeOctet(value: number) {
  if (value < 0 || value > 0xff) {
    throw new Error("Invalid value for octet");
  }

  return new Uint8Array([value]);
}

export function decodeOctet(r: Deno.SyncReader) {
  return readBytesSync(r, 1)[0];
}

export function encodeShortUint(value: number) {
  if (value < 0 || value > 0xffff) {
    throw new Error("Invalid value for short-uint");
  }

  return new Uint8Array([value >>> 8, value]);
}

export function decodeShortUint(buf: Deno.SyncReader) {
  const data = readBytesSync(buf, 2);
  return (data[0] << 8) + data[1];
}

export function encodeLongUint(value: number) {
  if (value < 0 || value > 0xffffffff) {
    throw new Error("Invalid value for long-uint");
  }

  return new Uint8Array([value >>> 24, value >>> 16, value >>> 8, value]);
}

export function decodeLongUint(r: Deno.SyncReader) {
  const data = readBytesSync(r, 4);
  const value = (data[0] << 24) + (data[1] << 16) + (data[2] << 8) + data[3];
  return value;
}

export function encodeLongLongUint(value: string) {
  if (value.length !== 16) {
    throw new Error("longlong uint must be 16 characters");
  }
  return hex.decodeString(value);
}

export function decodeLongLongUint(r: Deno.SyncReader): string {
  const bytes = readBytesSync(r, 8);
  return hex.encodeToString(bytes);
}

export function encodeShortString(value: string) {
  const encoded = textEncoder.encode(value);

  if (encoded.length > 255) {
    throw new Error("Value is too long for short string");
  }

  return new Uint8Array([encoded.length, ...encoded]);
}

export function decodeShortString(r: Deno.SyncReader): string {
  const size = decodeOctet(r);
  const data = readBytesSync(r, size);
  const value = textDecoder.decode(data);
  return value;
}

export function encodeLongString(value: string) {
  const encoded = textEncoder.encode(value);

  if (encoded.length > 0xffffffff) {
    throw new Error("Value is too long for long string");
  }

  const buffer = new Buffer();
  buffer.writeSync(encodeLongUint(encoded.length));
  buffer.writeSync(encoded);
  return buffer.bytes();
}

export function decodeLongString(r: Deno.SyncReader): string {
  const size = decodeLongUint(r);
  const data = readBytesSync(r, size);
  return textDecoder.decode(data);
}

function encodeTableField(value: unknown): Uint8Array {
  if (typeof value === "number") {
    return new Uint8Array([
      TableFieldType.LongUInt,
      ...encodeLongUint(value)
    ]);
  }

  if (typeof value === "string") {
    const encodedString = textEncoder.encode(value);
    if (encodedString.length <= 255) {
      return new Uint8Array([
        TableFieldType.ShortStr,
        ...encodeOctet(encodedString.length),
        ...encodedString
      ]);
    } else {
      return new Uint8Array([
        TableFieldType.LongStr,
        ...encodeLongUint(encodedString.length),
        ...encodedString
      ]);
    }
  }

  if (Array.isArray(value)) {
    const buf = new Deno.Buffer();
    value.forEach(v => buf.writeSync(encodeTableField(v)));

    return new Uint8Array([
      TableFieldType.FieldArray,
      ...encodeLongUint(buf.length),
      ...buf.bytes()
    ]);
  }

  if (typeof value === "object") {
    return new Uint8Array([
      TableFieldType.FieldTable,
      ...encodeTable(value as Record<string, unknown>)
    ]);
  }

  if (typeof value === "boolean") {
    return new Uint8Array([
      TableFieldType.Boolean,
      ...encodeOctet(1)
    ]);
  }

  throw new Error(
    `Don't know how to encode field of type ${typeof value} yet`
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

function encodeField(
  field: Exclude<AmqpField, Extract<AmqpField, { type: "bit" }>>
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

function decodeField(r: Deno.SyncReader, type: Exclude<AmqpFieldType, "bit">) {
  switch (type) {
    case "short":
      return decodeShortUint(r);
    case "long":
      return decodeLongUint(r);
    case "longlong":
      return decodeLongLongUint(r);
    case "table":
      return decodeTable(r);
    case "octet":
      return decodeOctet(r);
    case "shortstr":
      return decodeShortString(r);
    case "longstr":
      return decodeLongString(r);
    case "timestamp":
      return decodeLongLongUint(r);
    default:
      assertUnreachable(type);
  }
}

export function decodeFields(
  reader: Deno.SyncReader,
  types: AmqpFieldType[]
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

export interface Heartbeat {
  channel: number;
}

export interface Frame {
  type: number;
  channel: number;
  payload: Uint8Array;
}

const frameTypes = [FRAME_BODY, FRAME_HEADER, FRAME_HEARTBEAT, FRAME_METHOD];

export type FrameType = typeof FRAME_BODY
  | typeof FRAME_HEADER
  | typeof FRAME_HEARTBEAT
  | typeof FRAME_METHOD;

function assertType(type: number): asserts type is FrameType {
  if (!frameTypes.includes(type)) {
    throw new Error(`Invalid frame type '${type}'`);
  }
}

export function encodeFrame(frame: Frame) {
  const buffer = new Deno.Buffer();
  buffer.writeSync(encodeOctet(frame.type));
  buffer.writeSync(encodeShortUint(frame.channel));
  buffer.writeSync(encodeLongUint(frame.payload.length));
  buffer.writeSync(frame.payload);
  buffer.writeSync(encodeOctet(FRAME_END));
  return buffer.bytes();
}

export async function readFrame(r: Deno.Reader): Promise<Frame | null> {
  const prefix = await readBytes(r, 7);
  if (!prefix) {
    return null;
  }

  const prefixReader = new Deno.Buffer(prefix);
  const type = decodeOctet(prefixReader);
  const channel = decodeShortUint(prefixReader);
  const length = decodeLongUint(prefixReader);

  const rest = await readBytes(r, length + 1);
  if (!rest) {
    throw new Error(`Not enough data in reader`);
  }

  if (rest[rest.length - 1] !== FRAME_END) {
    throw new Error(`Unexpected end token ${rest[rest.length - 1]}`);
  }

  assertType(type);

  return {
    type: type,
    channel: channel,
    payload: rest.slice(0, rest.length - 1)
  };
}

export function encodeProperties(fields: AmqpOptionalField[]): Uint8Array {
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

export function decodeProperties(
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
