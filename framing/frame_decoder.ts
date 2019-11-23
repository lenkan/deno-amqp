import { createDecoder } from "./decoder.ts";
import {
  FRAME_METHOD,
  FRAME_HEARTBEAT,
  FRAME_HEADER,
  FRAME_BODY
} from "./constants.ts";
import { decodeMethodPayload, MethodPayload } from "./method_decoder.ts";

export type HeartbeatFrame = {
  type: "heartbeat";
  channel: number;
};

export type HeaderFrame = {
  type: "header";
  channel: number;
  class: number;
  weight: number;
  size: Uint8Array;
  flags: number;
  payload: Uint8Array;
};

export type ContentFrame = {
  type: "content";
  channel: number;
  payload: Uint8Array;
};

export type MethodFrame = {
  type: "method";
  channel: number;
} & MethodPayload;

export type Frame = MethodFrame | HeartbeatFrame  | HeaderFrame | ContentFrame;
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
        type: "method",
        ...result
      };
    case FRAME_HEARTBEAT:
      return {
        type: "heartbeat",
        channel
      };
    case FRAME_HEADER:
      return {
        type: "header",
        channel,
        class: decoder.decodeShortUint(),
        weight: decoder.decodeShortUint(),
        size: decoder.decodeLongLongUint(),
        flags: decoder.decodeShortUint(),
        payload: decoder.bytes()
      };
    case FRAME_BODY:
      return {
        type: "content",
        channel,
        payload: decoder.bytes()
      };
    default:
      throw new Error(`Unknown frame type ${type}`);
  }
}
