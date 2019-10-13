import { FieldType } from "./field-types.ts";

const textEncoder = new TextEncoder();

export function createEncoder() {
  const buffer = new Deno.Buffer();
  let bitField = 0;
  let bitPointer = -1;

  function write(data: Uint8Array) {
    flushBitField();
    buffer.writeSync(data);
  }

  function encodeOctet(value: number) {
    if (value < 0 || value > 0xff) {
      throw new Error("Invalid value for octet");
    }

    write(new Uint8Array([value]));
  }

  function encodeShortUint(value: number) {
    if (value < 0 || value > 0xffff) {
      throw new Error("Invalid value for short-uint");
    }

    write(new Uint8Array([value >>> 8, value]));
  }

  function encodeLongUint(value: number) {
    if (value < 0 || value > 0xffffffff) {
      throw new Error("Invalid value for long-uint");
    }

    write(new Uint8Array([value >>> 24, value >>> 16, value >>> 8, value]));
  }

  function encodeLongLongUint(value: number) {
    throw new Error("Not implemented");
  }

  function encodeShortString(value: string) {
    const encoded = textEncoder.encode(value);

    if (encoded.length > 255) {
      throw new Error("Value is too long for short string");
    }

    write(new Uint8Array([encoded.length, ...encoded]));
  }

  function encodeBit(value: boolean) {
    if (bitPointer === -1) {
      bitField = 0;
      bitPointer = 0;
    }

    if(bitPointer === 8) {
      flushBitField();
      bitField = 0;
      bitPointer = 0;
    }

    const comparator = (value ? 1 : 0) << bitPointer++;
    bitField = bitField | comparator;
  }

  function encodeLongString(value: string) {
    const encoded = textEncoder.encode(value);

    if (encoded.length > 0xffffffff) {
      throw new Error("Value is too long for long string");
    }

    encodeLongUint(encoded.length);
    write(encoded);
  }

  function encodeTable(table: Record<string, unknown>) {
    const encoder = createEncoder();
    for (const fieldName of Object.keys(table)) {
      const value = table[fieldName];

      if (typeof value === "number") {
        encoder.encodeShortString(fieldName);
        encoder.encodeOctet(FieldType.LongUInt);
        encoder.encodeLongUint(value);
        continue;
      }

      if (typeof value === "string") {
        encoder.encodeShortString(fieldName);
        const encodedString = textEncoder.encode(value);
        if (encodedString.length <= 255) {
          encoder.encodeOctet(FieldType.ShortStr);
          encoder.encodeOctet(encodedString.length);
          encoder.write(encodedString);
        } else {
          encoder.encodeOctet(FieldType.LongStr);
          encoder.encodeLongUint(encodedString.length);
          encoder.write(encodedString);
        }
        continue;
      }

      if (Array.isArray(value)) {
        throw new Error("Don't know how to encode array fields yet");
      }

      if (typeof value === "object") {
        encoder.encodeShortString(fieldName);
        encoder.encodeOctet(FieldType.FieldTable);
        encoder.encodeTable(value as Record<string, unknown>);
        break;
      }

      throw new Error(
        `Don't know how to encode field of type ${typeof value} yet`
      );
    }

    const result = encoder.bytes();
    encodeLongUint(result.length);
    write(result);
  }

  function flushBitField() {
    if (bitPointer >= 0) {
      buffer.writeSync(new Uint8Array([bitField]));
      bitPointer = -1;
      bitField = 0;
    }
  }

  function getBytes() {
    flushBitField();
    return buffer.bytes();
  }

  return {
    encodeTable,
    encodeOctet,
    encodeShortUint,
    encodeLongUint,
    encodeLongLongUint,
    encodeLongString,
    encodeShortString,
    encodeBit,
    write,
    bytes: getBytes
  };
}
