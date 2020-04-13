import {
  decodeMethod,
  decodeHeader,
  encodeMethod,
  encodeHeader,
} from "../amqp_codec.ts";
import { IncomingFrame, OutgoingFrame } from "./amqp_socket.ts";
import { Frame } from "./amqp_framing.ts";

export interface AmqpDecoder {
  (): Promise<IncomingFrame>;
}

export interface AmqpEncoder {
  (frame: OutgoingFrame): Promise<void>;
}

export function createAmqpDecoder(read: () => Promise<Frame>): AmqpDecoder {
  return async (): Promise<IncomingFrame> => {
    const frame = await read();
    switch (frame.type) {
      case 1:
        return {
          type: "method",
          channel: frame.channel,
          payload: decodeMethod(frame.payload),
        };
      case 2:
        return {
          type: "header",
          channel: frame.channel,
          payload: decodeHeader(frame.payload),
        };
      case 3:
        return {
          type: "content",
          channel: frame.channel,
          payload: frame.payload,
        };

      case 8:
        return {
          type: "heartbeat",
          channel: frame.channel,
          payload: frame.payload,
        };
      default:
        throw new Error(`Cannot decode frame type '${frame.type}'`);
    }
  };
}

export function createAmqpEncoder(write: (frame: Frame) => void): AmqpEncoder {
  return async (frame: OutgoingFrame) => {
    switch (frame.type) {
      case "method":
        return write(
          {
            type: 1,
            channel: frame.channel,
            payload: encodeMethod(frame.payload),
          },
        );
      case "header":
        return write(
          {
            type: 2,
            channel: frame.channel,
            payload: encodeHeader(frame.payload),
          },
        );
      case "content":
        return write(
          { type: 3, channel: frame.channel, payload: frame.payload },
        );
      case "heartbeat":
        return write(
          { type: 8, channel: frame.channel, payload: frame.payload },
        );
      default:
        throw new Error(`Cannot encode frame type '${frame!.type}'`);
    }
  };
}
