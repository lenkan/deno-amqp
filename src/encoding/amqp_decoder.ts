import {
  AmqpBitField,
  AmqpFieldType,
  AmqpFieldValue,
  AmqpFlagsField,
  AmqpNumberField,
  AmqpStringField,
  AmqpTableField,
  fromCharCode,
  TableFieldType,
} from "./amqp_field_types.ts";
import { assertUnreachable } from "./utils.ts";

export class AmqpDecoder {
  #data: Uint8Array;
  #offset = 0;
  #view: DataView;
  #textDecoder: TextDecoder;
  #bitField: number | null = null;
  #bitPointer = 7;

  constructor(data: Uint8Array) {
    this.#data = data;
    this.#view = new DataView(data.buffer);
    this.#textDecoder = new TextDecoder();
  }

  #forward = (n: number) => {
    const current = this.#offset;
    this.#offset += n;

    if (this.#offset > this.#data.length) {
      throw new Error("Not enough data in decoder");
    }

    return current;
  };

  #uint8 = () => this.#view.getUint8(this.#forward(1));

  #uint16 = () => this.#view.getUint16(this.#forward(2));

  #uint32 = () => this.#view.getUint32(this.#forward(4));

  #uint64 = () => {
    const result = Number(this.#view.getBigUint64(this.#forward(8)));
    if (!Number.isSafeInteger(result)) {
      throw new Error(`Tried to decode unsafe integer`);
    }

    return result;
  };

  #int8 = () => this.#view.getInt8(this.#forward(1));

  #int16 = () => this.#view.getInt16(this.#forward(2));

  #int32 = () => this.#view.getInt32(this.#forward(4));

  #int64 = () => {
    const num = Number(this.#view.getBigInt64(this.#forward(8)));
    if (!Number.isSafeInteger(num)) {
      throw new Error(`Received unsafe integer`);
    }

    return num;
  };

  #float32 = () => {
    return this.#view.getFloat32(this.#forward(4));
  };

  #float64 = () => {
    return this.#view.getFloat64(this.#forward(8));
  };

  #bytes = (length: number) => {
    const start = this.#forward(length);
    return this.#data.slice(start, this.#offset);
  };

  #text = (length: number) => {
    return this.#textDecoder.decode(this.#bytes(length));
  };

  #shortstr = () => {
    const size = this.#uint8();
    return this.#text(size);
  };

  #longstr = () => {
    const size = this.#uint32();
    return this.#text(size);
  };

  #bit = () => {
    if (this.#bitField === null || this.#bitPointer < 0) {
      this.#bitField = this.#uint8();
      this.#bitPointer = 7;
    }

    const value = !!(this.#bitField & (1 << this.#bitPointer--));
    return value;
  };

  #table = () => {
    const length = this.#uint32();
    const target = this.#offset + length;
    const result: Record<string, unknown> = {};

    while (this.#offset < target) {
      const fieldName = this.#shortstr();
      const fieldValue = this.#tableField();
      result[fieldName] = fieldValue;
    }

    return result;
  };

  #tableField = () => {
    const type: TableFieldType = this.#uint8();
    switch (type) {
      case TableFieldType.Boolean:
        return this.#uint8() > 0;
      case TableFieldType.ShortShortUInt:
        return this.#uint8();
      case TableFieldType.ShortShortInt:
        return this.#int8();
      case TableFieldType.ShortUInt:
        return this.#uint16();
      case TableFieldType.ShortInt:
        return this.#int16();
      case TableFieldType.LongUInt:
        return this.#uint32();
      case TableFieldType.LongInt:
        return this.#int32();
      case TableFieldType.LongLongInt:
        return this.#int64();
      case TableFieldType.Float:
        return this.#float32();
      case TableFieldType.Double:
        return this.#float64();
      case TableFieldType.Decimal:
        // TODO: decode decimal
        throw new Error("Cant decode decimal");
      case TableFieldType.LongStr:
        return this.#longstr();
      case TableFieldType.FieldArray:
        return this.#tableArray();
      case TableFieldType.Timestamp:
        return this.#uint64();
      case TableFieldType.FieldTable:
        return this.#table();
      case TableFieldType.NoValue:
        return null;
      case TableFieldType.ByteArray:
        return this.#tableBytes();
      default:
        throw new Error(`Unknown table field type ${fromCharCode(type)}`);
    }
  };

  #tableArray = () => {
    const length = this.#uint32();
    const target = this.#offset + length;

    const array: unknown[] = [];

    while (this.#offset < target) {
      const value = this.#tableField();
      array.push(value);
    }

    return array;
  };

  #tableBytes = () => {
    const length = this.#uint32();
    return this.#bytes(length);
  };

  #flags = () => {
    const flags: boolean[] = [];
    let bits: boolean[] = [];

    while (!flags.length || bits[bits.length - 1]) {
      const field = this.#uint16();
      bits = [];

      for (let i = 15; i >= 0; --i) {
        bits.push(!!(field & (1 << i)));
      }

      flags.push(...bits.slice(0, 15));
    }

    return flags;
  };

  read(type: AmqpNumberField["type"]): number;
  read(type: AmqpStringField["type"]): string;
  read(type: AmqpBitField["type"]): boolean;
  read(type: AmqpFlagsField["type"]): boolean[];
  read(type: AmqpTableField["type"]): Record<string, unknown>;
  read(type: AmqpFieldType): AmqpFieldValue;
  read(type: AmqpFieldType): AmqpFieldValue {
    switch (type) {
      case "uint8":
        return this.#uint8();
      case "uint16":
        return this.#uint16();
      case "uint32":
        return this.#uint32();
      case "uint64":
      case "timestamp":
        return this.#uint64();
      case "int8":
        return this.#int8();
      case "int16":
        return this.#int16();
      case "int32":
        return this.#int32();
      case "int64":
        return this.#int64();
      case "float32":
        return this.#float32();
      case "float64":
        return this.#float64();
      case "bit":
        return this.#bit();
      case "flags":
        return this.#flags();
      case "table":
        return this.#table();
      case "shortstr":
        return this.#shortstr();
      case "longstr":
        return this.#longstr();
      default:
        assertUnreachable(type);
    }
  }
}
