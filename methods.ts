import { createEncoder } from "./encoder.ts";
import { createDecoder } from "./decoder.ts";

export interface MethodFrame {
  type: 1;
  channel: number;
  classId: number;
  methodId: number;
  payload: Uint8Array;
}

export interface StartMethod {
  channel: number;
  classId: 10;
  methodId: 10;
  versionMajor: number;
  versionMinor: number;
  serverProperties: Record<string, unknown>;
  mechanisms: string;
  locales: string;
}

export interface StartOkMethod {
  channel: number;
  classId: 10;
  methodId: 11;
  clientProperties: Record<string, unknown>;
  response: string;
  mechanism: string;
  locale: string;
}

export type Method = StartMethod | StartOkMethod;

export function decodeMethod(frame: MethodFrame): Method {
  const decoder = createDecoder(frame.payload);
  if (frame.classId === 10 && frame.methodId === 10) {
    const versionMajor = decoder.decodeOctet();
    const versionMinor = decoder.decodeOctet();
    const serverProperties = decoder.decodeTable();
    const mechanisms = decoder.decodeLongString();
    const locales = decoder.decodeLongString();

    return {
      channel: frame.channel,
      classId: frame.classId,
      methodId: frame.methodId,
      versionMajor,
      versionMinor,
      serverProperties,
      locales,
      mechanisms
    };
  }

  throw new Error(`Can't handle method ${frame.classId}/${frame.methodId}`)
}

export function encodeMethod(method: Method): MethodFrame {
  if (method.classId === 10 && method.methodId === 11) {
    const encoder = createEncoder();
    encoder.encodeTable(method.clientProperties || {});
    encoder.encodeShortString(method.mechanism || "PLAIN");
    encoder.encodeLongString(method.response);
    encoder.encodeShortString(method.locale || "en_US");
    const payload = encoder.bytes();
    return {
      type: 1,
      channel: method.channel,
      classId: method.classId,
      methodId: method.methodId,
      payload
    };
  }

  throw new Error(`Can't handle method ${method.classId}/${method.methodId}`)
}