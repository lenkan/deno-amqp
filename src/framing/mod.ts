export { Frame } from "./amqp_framing.ts";
import { createFrameReader, createFrameWriter } from "./amqp_framing.ts";
import {
  AmqpLoggingOptions,
  createLoggingReader,
  createLoggingWriter,
} from "./amqp_framing_logger.ts";
import {
  AmqpSocket,
  AmqpSocketCloser,
  AmqpSocketReader,
  AmqpSocketWriter,
  IncomingFrame,
  OutgoingFrame,
  ContentFrame,
  HeaderFrame,
  HeartbeatFrame,
  IncomingMethodFrame,
  OutgoingMethodFrame,
} from "./amqp_socket.ts";
import { createAmqpEncoder, createAmqpDecoder } from "./amqp_encoding.ts";

export {
  AmqpSocket,
  AmqpSocketCloser,
  AmqpSocketReader,
  AmqpSocketWriter,
  IncomingFrame,
  OutgoingFrame,
  ContentFrame,
  HeaderFrame,
  HeartbeatFrame,
  IncomingMethodFrame,
  OutgoingMethodFrame,
};

export function createReader(r: Deno.Reader, options: AmqpLoggingOptions) {
  return createLoggingReader(createFrameReader(r), options);
}

export function createWriter(w: Deno.Writer, options: AmqpLoggingOptions) {
  return createLoggingWriter(createFrameWriter(w), options);
}

export function createSocket(
  conn: Deno.Reader & Deno.Writer & Deno.Closer,
  options: AmqpLoggingOptions,
): AmqpSocket {
  return {
    write: createAmqpEncoder(
      createLoggingWriter(createFrameWriter(conn), options),
    ),
    read: createAmqpDecoder(
      createLoggingReader(createFrameReader(conn), options),
    ),
    close: () => conn.close(),
  };
}
