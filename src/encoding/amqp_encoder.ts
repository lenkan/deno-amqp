import {
  AmqpBitField,
  AmqpField,
  AmqpFieldType,
  AmqpFieldValue,
  AmqpFlagsField,
  AmqpNumberField,
  AmqpStringField,
  AmqpTableField,
  TableFieldType,
} from "./amqp_field_types.ts";
import { assertUnreachable, charCode, padArray } from "./utils.ts";

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

function splitArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  let index = 0;

  while (index < arr.length) {
    chunks.push(arr.slice(index, size + index));
    index += size;
  }

  return chunks;
}

function writeBitField(bits: boolean[]): number {
  if (bits.length > 8) {
    throw new Error(`Too many bits to fit in one byte`);
  }

  const field = (bits[7] ? 0b10000000 : 0) |
    (bits[6] ? 0b01000000 : 0) |
    (bits[5] ? 0b00100000 : 0) |
    (bits[4] ? 0b00010000 : 0) |
    (bits[3] ? 0b00001000 : 0) |
    (bits[2] ? 0b00000100 : 0) |
    (bits[1] ? 0b00000010 : 0) |
    (bits[0] ? 0b00000001 : 0);

  return field;
}

function outOfRange(type: string, value: number) {
  return `value '${value}' is out of range for type '${type}'`;
}

export class AmqpEncoder {
  #buf: Uint8Array;
  #view: DataView;
  #offset = 0;
  #increment: number;
  #textEncoder: TextEncoder = new TextEncoder();
  #pendingBits: boolean[] = [];

  constructor(size: number = 4096) {
    this.#increment = size;
    this.#buf = new Uint8Array(size);
    this.#view = new DataView(this.#buf.buffer);
  }

  #forward = (size: number) => {
    const start = this.#offset;
    this.#offset = this.#offset + size;

    if (this.#buf.length < this.#offset) {
      const buf = new Uint8Array(this.#buf.length + this.#increment);
      buf.set(this.#buf, 0);
      this.#buf = buf;
    }

    return start;
  };

  #flushBits = () => {
    if (this.#pendingBits.length) {
      this.#bits(this.#pendingBits);
      this.#pendingBits.splice(0, this.#pendingBits.length);
    }
  };

  #uint8 = (value: number) => {
    if (value < 0 || value > 0xFF) {
      throw new Error(outOfRange("uint8", value));
    }

    this.#view.setUint8(this.#forward(1), value);
  };

  #uint16 = (value: number) => {
    if (value < 0 || value > 0xFFFF) {
      throw new Error(outOfRange("uint16", value));
    }

    this.#view.setUint16(this.#forward(2), value);
  };

  #uint32 = (value: number) => {
    if (value < 0 || value > 0xFFFFFFFF) {
      throw new Error(outOfRange("uint32", value));
    }

    this.#view.setUint32(this.#forward(4), value);
  };

  #uint64 = (value: number) => {
    if (value < 0 || value > Number.MAX_SAFE_INTEGER) {
      throw new Error(outOfRange("uint32", value));
    }

    this.#view.setBigUint64(this.#forward(8), BigInt(value));
  };

  #int8 = (value: number) => {
    this.#view.setInt8(this.#forward(1), value);
  };

  #int16 = (value: number) => {
    this.#view.setInt16(this.#forward(2), value);
  };

  #int32 = (value: number) => {
    this.#view.setInt32(this.#forward(4), value);
  };

  #int64 = (value: number) => {
    this.#view.setBigInt64(this.#forward(8), BigInt(value));
  };

  #float32 = (value: number) => {
    this.#view.setFloat32(this.#forward(4), value);
  };

  #float64 = (value: number) => {
    this.#view.setFloat64(this.#forward(8), value);
  };

  #bytes = (data: ArrayLike<number>) => {
    this.#buf.set(data, this.#forward(data.length));
  };

  #shortString = (txt: string) => {
    const data = this.#textEncoder.encode(txt);

    if (data.length > 0xFF) {
      throw new Error(`String too long for shortstring`);
    }

    this.#uint8(data.length);
    this.#bytes(data);
  };

  #longString = (txt: string) => {
    const data = this.#textEncoder.encode(txt);
    this.#uint32(data.length);
    this.#bytes(data);
  };

  #bits = (values: boolean[]) => {
    const bytes = splitArray(values, 8)
      .map((s) => padArray(s, 8, false))
      .flatMap(writeBitField);

    this.#bytes(bytes);
  };

  #bit = (value: boolean) => {
    this.#pendingBits.push(value);
  };

  #table = (table: Record<string, unknown>) => {
    const start = this.#forward(4);

    for (const fieldName of Object.keys(table)) {
      const value = table[fieldName];
      if (value !== undefined) {
        assertValidFieldName(fieldName);
        this.write("shortstr", fieldName);
        this.#typedField(value);
      }
    }

    this.#view.setUint32(start, this.#offset - start - 4);
  };

  #typedField = (value: unknown) => {
    if (value instanceof Uint8Array) {
      this.#uint8(TableFieldType.ByteArray);
      this.#uint32(value.length);
      this.#bytes(value);
      return;
    }

    if (value === null) {
      this.#uint8(TableFieldType.NoValue);
      return;
    }

    if (typeof value === "number") {
      if (Math.round(value) !== value || !Number.isSafeInteger(value)) {
        this.#uint8(TableFieldType.Double);
        this.#float64(value);
        return;
      }

      if (value >= -0x80 && value < 0x80) {
        this.#uint8(TableFieldType.ShortShortInt);
        this.#int8(value);
        return;
      }

      if (value >= -0x8000 && value < 0x8000) {
        this.#uint8(TableFieldType.ShortInt);
        this.#int16(value);
        return;
      }

      if (value >= -0x80000000 && value < 0x80000000) {
        this.#uint8(TableFieldType.LongInt);
        this.#int32(value);
        return;
      }

      this.#uint8(TableFieldType.LongInt);
      this.#int64(value);
      return;
    }

    if (typeof value === "string") {
      this.#uint8(TableFieldType.LongStr);
      this.#longString(value);
      return;
    }

    if (Array.isArray(value)) {
      this.#uint8(TableFieldType.FieldArray);
      const s = this.#forward(4);

      for (const v of value) {
        this.#typedField(v);
      }

      this.#view.setUint32(s, this.#offset - s - 4);
      return;
    }

    if (typeof value === "object") {
      this.#uint8(TableFieldType.FieldTable);
      this.#table(value as Record<string, unknown>);
      return;
    }

    if (typeof value === "boolean") {
      this.#uint8(TableFieldType.Boolean);
      this.#uint8(1);
      return;
    }

    throw new Error(
      `Don't know how to encode field of type ${typeof value} yet`,
    );
  };

  #flags = (flags: boolean[]) => {
    const chunks = splitArray(flags, 15);
    chunks.forEach((chunk, index) => {
      const bits = [...chunk, index < chunks.length - 1];
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
      this.#uint16(field);
    });
  };

  write(type: AmqpNumberField["type"], value: number): void;
  write(type: AmqpStringField["type"], value: string): void;
  write(type: AmqpBitField["type"], value: boolean): void;
  write(type: AmqpFlagsField["type"], value: boolean[]): void;
  write(type: AmqpTableField["type"], value: Record<string, unknown>): void;
  write(type: AmqpFieldType, value: AmqpFieldValue) {
    const field = { type, value } as AmqpField;
    if (field.type !== "bit") {
      this.#flushBits();
    }
    if (value === undefined) {
      return;
    }

    switch (field.type) {
      case "uint8":
        return this.#uint8(field.value);
      case "uint16":
        return this.#uint16(field.value);
      case "uint32":
        return this.#uint32(field.value);
      case "uint64":
      case "timestamp":
        return this.#uint64(field.value);
      case "int8":
        return this.#int8(field.value);
      case "int16":
        return this.#int16(field.value);
      case "int32":
        return this.#int32(field.value);
      case "int64":
        return this.#int64(field.value);
      case "float32":
        return this.#float32(field.value);
      case "float64":
        return this.#float64(field.value);
      case "bit":
        return this.#bit(field.value);
      case "flags":
        return this.#flags(field.value);
      case "table":
        return this.#table(field.value);
      case "shortstr":
        return this.#shortString(field.value);
      case "longstr":
        return this.#longString(field.value);
      default:
        assertUnreachable(field);
    }
  }

  result(): Uint8Array {
    this.#flushBits();
    return this.#buf.slice(0, this.#offset);
  }
}
