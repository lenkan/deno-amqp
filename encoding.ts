const textEncoder = new TextEncoder();
const Buffer = Deno.Buffer;

export function encodeOctet(value: number) {
  if (value < 0 || value > 0xff) {
    throw new Error("Invalid value for octet");
  }

  return new Uint8Array([value]);
}

export function encodeShortUint(value: number) {
  if (value < 0 || value > 0xffff) {
    throw new Error("Invalid value for short-uint");
  }

  return new Uint8Array([value >>> 8, value]);
}

export function encodeLongUint(value: number) {
  if (value < 0 || value > 0xffffffff) {
    throw new Error("Invalid value for long-uint");
  }

  return new Uint8Array([value >>> 24, value >>> 16, value >>> 8, value]);
}

export function encodeLongLongUint(value: number) {
  throw new Error("Not implemented");
}

export function encodeShortString(value: string) {
  const encoded = textEncoder.encode(value);

  if (encoded.length > 255) {
    throw new Error("Value is too long for short string");
  }

  return new Uint8Array([encoded.length, ...encoded]);
}

export function encodeLongString(value: string) {
  const encoded = textEncoder.encode(value);

  if (encoded.length > 0xffffffff) {
    throw new Error("Value is too long for long string");
  }

  const length = encodeLongUint(encoded.length);
  return new Uint8Array([...length, ...encoded]);
}

enum FieldType {
  Boolean = "t",
  ShortShortInt = "b",
  ShortShortUInt = "B",
  ShortInt = "s",
  ShortUInt = "u",
  LongInt = "I",
  LongUInt = "i",
  LongLongInt = "l",
  Float = "f",
  Double = "d",
  Decimal = "D",
  ShortStr = "s",
  LongStr = "S",
  FieldArray = "A",
  Timestamp = "T",
  FieldTable = "F",
  ByteArray = "x",
  NoValue = "V"
}

export function encodeTable(table: Record<string, unknown>) {
  const buffer = new Buffer();
  for (const fieldName of Object.keys(table)) {
    const value = table[fieldName];

    if (typeof value === "number") {
      buffer.write(encodeShortString(fieldName));
      buffer.write(textEncoder.encode(FieldType.LongUInt));
    }

    if (typeof value === "bigint") {
      buffer.write(textEncoder.encode("l"));
    }
  }

  const size = encodeLongUint(buffer.length);
  return new Uint8Array([...size, ...buffer.bytes()]);
}
