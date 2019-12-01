import { createDecoder } from "./decoder.ts";
import {
  FRAME_METHOD,
  FRAME_HEARTBEAT,
  FRAME_HEADER,
  FRAME_BODY
} from "./constants.ts";
import { decodeMethodPayload, MethodPayload } from "./method_decoder.ts";

export type HeartbeatFrame = {
  type: typeof FRAME_HEARTBEAT;
  channel: number;
};

export type HeaderFrame = {
  type: typeof FRAME_HEADER;
  channel: number;
  class: number;
  weight: number;
  size: number;
  flags: number;
  properties: Record<string, any>;
};

export type ContentFrame = {
  type: typeof FRAME_BODY;
  channel: number;
  payload: Uint8Array;
};

export type MethodFrame = {
  type: typeof FRAME_METHOD;
  channel: number;
} & MethodPayload;

export type Frame = MethodFrame | HeartbeatFrame | HeaderFrame | ContentFrame;
export type FramePrefix = { type: number; channel: number; size: number };

export function decodeHeader(data: Uint8Array): FramePrefix {
  const prefixDecoder = createDecoder(data);
  const type = prefixDecoder.decodeOctet();
  const channel = prefixDecoder.decodeShortUint();
  const size = prefixDecoder.decodeLongUint();
  return { type, channel, size };
}

export function decodeFrame(header: FramePrefix, payload: Uint8Array): Frame {
  const { type, channel } = header;
  const decoder = createDecoder(payload);

  switch (type) {
    case FRAME_METHOD:
      const classId = decoder.decodeShortUint();
      const methodId = decoder.decodeShortUint();
      const result = decodeMethodPayload(classId, methodId, decoder.bytes());
      return {
        channel,
        type: FRAME_METHOD,
        ...result
      };
    case FRAME_HEARTBEAT:
      return {
        type: FRAME_HEARTBEAT,
        channel
      };
    case FRAME_HEADER: {
      const clazz = decoder.decodeShortUint();
      const weight = decoder.decodeShortUint();
      // TODO(lenkan): Handle longlong size
      if (decoder.decodeLongUint()) {
        throw new Error(`Too big content size`);
      }
      const size = decoder.decodeLongUint();
      const flags = decoder.decodeShortUint();
      const properties = decoder.decodeTable();

      return {
        type: FRAME_HEADER,
        channel,
        class: clazz,
        weight,
        size,
        flags,
        properties
      };
    }
    case FRAME_BODY:
      return {
        type: FRAME_BODY,
        channel,
        payload: decoder.bytes()
      };
    default:
      throw new Error(`Unknown frame type ${type}`);
  }
}
