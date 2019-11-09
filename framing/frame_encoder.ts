import { createEncoder } from "./encoder.ts";
import { encodeMethodPayload, MethodPayload } from "./method_encoder.ts";
import { FRAME_METHOD, FRAME_END, FRAME_HEARTBEAT } from "./constants.ts";

export type Method = {
  type: "method";
  channel: number;
} & MethodPayload;

export { MethodPayload }

export type Heartbeat = { type: "heartbeat"; channel: number };

export type Frame = Method | Heartbeat;

export function encodeFrame(frame: Frame) {
  if (frame.type === "method") {
    const encoder = createEncoder();
    const payload = encodeMethodPayload(frame);
    encoder.encodeOctet(FRAME_METHOD);
    encoder.encodeShortUint(frame.channel);
    encoder.encodeLongUint(payload.length);
    encoder.write(payload);
    encoder.encodeOctet(FRAME_END);
    return encoder.bytes();
  }

  if (frame.type === "heartbeat") {
    const encoder = createEncoder();
    encoder.encodeOctet(FRAME_HEARTBEAT);
    encoder.encodeShortUint(frame.channel);
    encoder.encodeLongUint(0);
    encoder.encodeOctet(FRAME_END);
    return encoder.bytes();
  }

  throw new Error(`Cannot encode frame type ${frame}`);
}
