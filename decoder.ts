import { FieldType } from "./field-types.ts";

const textDecoder = new TextDecoder();

export function createDecoder(data: Uint8Array) {
  let offset: number = 0;
  let rest = data;

  function advance(numBytes: number) {
    offset += numBytes;
    rest = data.slice(offset, data.length);
  }

  function decodeOctet() {
    if (rest.length < 1) {
      throw new Error("Not enough data in array");
    }

    const value = rest[0];
    advance(1);
    return value;
  }

  function decodeShortUint() {
    if (rest.length < 2) {
      throw new Error("Not enough data in array");
    }

    const value = (rest[0] << 8) + rest[1];
    advance(2);
    return value;
  }

  function decodeLongUint() {
    if (rest.length < 4) {
      throw new Error("Not enough data in array");
    }

    const value = (rest[0] << 24) + (rest[1] << 16) + (rest[2] << 8) + rest[3];

    advance(4);
    return value;
  }

  function decodeShortString(): string {
    if (rest.length < 1) {
      throw new Error("Not enough data in array");
    }

    const size = decodeOctet();
    if (rest.length < size) {
      throw new Error("Not enough data in array");
    }

    const value = textDecoder.decode(rest.slice(0, size));
    advance(size);
    return value;
  }

  function decodeLongString(): string {
    if (rest.length < 4) {
      throw new Error("Not enough data in array");
    }

    const size = decodeLongUint();

    if (rest.length < size) {
      throw new Error("Not enough data in array");
    }

    const value = textDecoder.decode(rest.slice(0, size));
    advance(size);
    return value;
  }

  function decodeTable(): Record<string, unknown> {
    const size = decodeLongUint();
    if (rest.length < size) {
      throw new Error("Not enough data in array");
    }

    const result: Record<string, unknown> = {};
    const endOfTable = offset + size;
    while (offset < endOfTable) {
      const fieldName = decodeShortString();
      const fieldType = decodeOctet();

      switch (fieldType) {
        case FieldType.Boolean:
          result[fieldName] = decodeOctet() > 0;
          break;
        case FieldType.LongUInt:
          result[fieldName] = decodeLongUint();
          break;
        case FieldType.LongStr:
          result[fieldName] = decodeLongString();
          break;
        case FieldType.ShortStr:
          result[fieldName] = decodeShortString();
          break;
        case FieldType.FieldTable:
          result[fieldName] = decodeTable();
          break;
        default:
          throw new Error(`Unknown field type '${fieldType}'`);
      }
    }

    return result;
  }

  return {
    decodeOctet,
    decodeShortUint,
    decodeLongUint,
    decodeLongString,
    decodeShortString,
    decodeTable,
    bytes: () => rest
  };
}
