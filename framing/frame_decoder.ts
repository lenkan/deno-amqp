import { createDecoder } from "./decoder.ts";
import { FRAME_METHOD, FRAME_HEARTBEAT } from "./constants.ts";
import { decodeMethodPayload, MethodPayload } from "./method_decoder.ts";

export type Heartbeat = { type: "heartbeat"; channel: number };
export type Method = {
  type: "method";
  channel: number;
} & MethodPayload;

export type Frame = Method | Heartbeat;
export type Header = { type: number; channel: number; size: number };

export function decodeHeader(data: Uint8Array): Header {
  const prefixDecoder = createDecoder(data);
  const type = prefixDecoder.decodeOctet();
  const channel = prefixDecoder.decodeShortUint();
  const size = prefixDecoder.decodeLongUint();
  return { type, channel, size };
}

export function decodeFrame(header: Header, payload: Uint8Array): Frame {
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
    default:
      throw new Error(`Unknown frame type ${type}`);
  }
}
