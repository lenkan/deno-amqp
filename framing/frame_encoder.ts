import { createEncoder } from "./encoder.ts";
import { encodeMethodPayload, MethodPayload } from "./method_encoder.ts";
import {
  FRAME_METHOD,
  FRAME_END,
  FRAME_HEARTBEAT,
  FRAME_HEADER,
  FRAME_BODY
} from "./constants.ts";

export type MethodFrame = {
  type: typeof FRAME_METHOD;
  channel: number;
} & MethodPayload;

export type HeartbeatFrame = { type: typeof FRAME_HEARTBEAT; channel: number };

export type ContentFrame = {
  type: typeof FRAME_BODY;
  channel: number;
  payload: Uint8Array;
};

export type HeaderFrame = {
  type: typeof FRAME_HEADER;
  channel: number;
  class: number;
  weight: number;
  size: number;
  flags: boolean[];
  properties: Record<string, any>;
};

export type Frame = MethodFrame | HeartbeatFrame | ContentFrame | HeaderFrame;

export function encodeFrame(frame: Frame) {
  if (frame.type === FRAME_METHOD) {
    const encoder = createEncoder();
    const payload = encodeMethodPayload(frame);
    encoder.encodeOctet(FRAME_METHOD);
    encoder.encodeShortUint(frame.channel);
    encoder.encodeLongUint(payload.length);
    encoder.write(payload);
    encoder.encodeOctet(FRAME_END);
    return encoder.bytes();
  }

  if (frame.type === FRAME_HEARTBEAT) {
    const encoder = createEncoder();
    encoder.encodeOctet(FRAME_HEARTBEAT);
    encoder.encodeShortUint(frame.channel);
    encoder.encodeLongUint(0);
    encoder.encodeOctet(FRAME_END);
    return encoder.bytes();
  }

  if (frame.type === FRAME_HEADER) {
    const encoder = createEncoder();
    encoder.encodeOctet(FRAME_HEADER);
    encoder.encodeShortUint(frame.channel);

    const payloadEncoder = createEncoder();
    payloadEncoder.encodeShortUint(frame.class);
    payloadEncoder.encodeShortUint(frame.weight);
    payloadEncoder.encodeLongLongUint(frame.size);

    frame.flags.forEach(payloadEncoder.encodeBit)
    payloadEncoder.encodeTable(frame.properties);
    const payload = payloadEncoder.bytes();

    encoder.encodeLongUint(payload.byteLength);
    encoder.write(payload);
    encoder.encodeOctet(FRAME_END);
    console.log(encoder.bytes());
    return encoder.bytes();
  }

  if (frame.type === FRAME_BODY) {
    const encoder = createEncoder();
    encoder.encodeOctet(FRAME_BODY);
    encoder.encodeShortUint(frame.channel);

    encoder.encodeLongUint(frame.payload.byteLength);
    encoder.write(frame.payload);
    encoder.encodeOctet(FRAME_END);
    console.log(encoder.bytes());
    return encoder.bytes();
  }

  assertUnreachable(frame);
}

function assertUnreachable(x: never) {
  throw new Error(`Cannot encode frame type '${JSON.stringify(x)}'`);
}
