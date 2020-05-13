export interface AmqpNumberField {
  type:
    | "uint8"
    | "uint16"
    | "uint32"
    | "uint64"
    | "timestamp"
    | "int8"
    | "int16"
    | "int32"
    | "int64"
    | "float32"
    | "float64";
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

export interface AmqpFlagsField {
  type: "flags";
  value: boolean[];
}

export interface AmqpTableField {
  type: "table";
  value: Record<string, unknown>;
}

export type AmqpField =
  | AmqpNumberField
  | AmqpStringField
  | AmqpBitField
  | AmqpFlagsField
  | AmqpTableField;

export type AmqpFieldType = AmqpField["type"];
export type AmqpFieldValue = AmqpField["value"];

export function charCode(type: string) {
  return type.charCodeAt(0);
}

export function fromCharCode(code: number) {
  return new TextDecoder().decode(new Uint8Array([code]));
}

/**
 * https://www.rabbitmq.com/amqp-0-9-1-errata.html#section_3
 */
export enum TableFieldType {
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
