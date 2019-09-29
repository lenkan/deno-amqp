const textDecoder = new TextDecoder();

export function createDecoder(data: Uint8Array) {
  let offset: number = 0;
  let rest = data;

  function advance(numBytes: number) {
    offset += numBytes;
    rest = data.slice(offset);
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

    const value =
      (rest[offset] << 24) +
      (rest[offset + 1] << 16) +
      (rest[offset + 2] << 8) +
      rest[offset + 3];

    advance(4);
    return value;
  }

  function decodeShortString(): string {
    if (rest.length < 1) {
      throw new Error("Not enough data in array");
    }

    const size = rest[0];

    if (rest.length < size + 1) {
      throw new Error("Not enough data in array");
    }

    const value = textDecoder.decode(rest.slice(1, size + 1));
    advance(1 + size);
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

    console.log(offset);

    const value = textDecoder.decode(rest.slice(0, size + 1));
    advance(size);
    return value;
  }

  function decodeTable(data: Uint8Array): Record<string, unknown> {
    return {};
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
