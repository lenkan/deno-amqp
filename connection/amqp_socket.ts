import {
  decodeMethod,
  decodeHeader,
  encodeMethod,
  encodeHeader,
} from "../amqp_codec.ts";
import {
  ReceiveMethod,
  SendMethod,
  Header,
} from "../amqp_types.ts";
import {
  AmqpFrameReader,
  AmqpFrameWriter,
  AmqpFraming,
} from "../framing/mod.ts";

export interface HeaderFrame {
  type: "header";
  channel: number;
  payload: Header;
}

export interface IncomingMethodFrame {
  type: "method";
  channel: number;
  payload: ReceiveMethod;
}

export interface OutgoingMethodFrame {
  type: "method";
  channel: number;
  payload: SendMethod;
}

export interface ContentFrame {
  type: "content";
  channel: number;
  payload: Uint8Array;
}

export interface HeartbeatFrame {
  type: "heartbeat";
  channel: number;
  payload: Uint8Array;
}

export type IncomingFrame =
  | HeaderFrame
  | HeartbeatFrame
  | IncomingMethodFrame
  | ContentFrame;

export type OutgoingFrame =
  | HeaderFrame
  | HeartbeatFrame
  | OutgoingMethodFrame
  | ContentFrame;

export interface AmqpDecodeReader {
  read(): Promise<IncomingFrame>;
}

export interface AmqpEncodeWriter {
  write(frame: OutgoingFrame): Promise<void>;
}

export interface AmqpSocket extends AmqpDecodeReader, AmqpEncodeWriter {}

function createDecoder(reader: AmqpFrameReader) {
  return async (): Promise<IncomingFrame> => {
    const frame = await reader.read();
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

function createEncoder(writer: AmqpFrameWriter) {
  return async (frame: OutgoingFrame) => {
    switch (frame.type) {
      case "method":
        return writer.write(
          {
            type: 1,
            channel: frame.channel,
            payload: encodeMethod(frame.payload),
          },
        );
      case "header":
        return writer.write(
          {
            type: 2,
            channel: frame.channel,
            payload: encodeHeader(frame.payload),
          },
        );
      case "content":
        return writer.write(
          { type: 3, channel: frame.channel, payload: frame.payload },
        );
      case "heartbeat":
        return writer.write(
          { type: 8, channel: frame.channel, payload: frame.payload },
        );
      default:
        throw new Error(`Cannot encode frame type '${frame!.type}'`);
    }
  };
}

export function createAmqpSocket(framing: AmqpFraming): AmqpSocket {
  const read = createDecoder(framing);
  const write = createEncoder(framing);
  return { read, write };
}
