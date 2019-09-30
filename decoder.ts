const textDecoder = new TextDecoder();

enum FieldType {
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
    decodeTable
  };
}
