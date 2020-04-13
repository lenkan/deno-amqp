export {
  AmqpFrameReader,
  AmqpFrameWriter,
  AmqpFraming,
  Frame,
} from "./amqp_framing.ts";
import {
  createFrameReader,
  createFrameWriter,
  AmqpFraming,
} from "./amqp_framing.ts";
import {
  AmqpLoggingOptions,
  createLoggingReader,
  createLoggingWriter,
} from "./amqp_framing_logger.ts";

export function createReader(r: Deno.Reader, options: AmqpLoggingOptions) {
  return createLoggingReader(createFrameReader(r), options);
}

export function createWriter(w: Deno.Writer, options: AmqpLoggingOptions) {
  return createLoggingWriter(createFrameWriter(w), options);
}

export function createFraming(
  conn: Deno.Reader & Deno.Writer,
  options: AmqpLoggingOptions,
): AmqpFraming {
  return {
    write: createLoggingWriter(createFrameWriter(conn), options),
    read: createLoggingReader(createFrameReader(conn), options),
  };
}
