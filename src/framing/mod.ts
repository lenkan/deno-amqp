export {
  AmqpFrameReader,
  AmqpFrameWriter,
  AmqpFraming,
  Frame,
} from "./amqp_framing.ts";
import { createFrameReader, createFrameWriter } from "./amqp_framing.ts";
import {
  AmqpLoggingOptions,
  createLoggingReader,
  createLoggingWriter,
} from "./amqp_framing_logger.ts";

export function createFraming(
  conn: Deno.Reader & Deno.Writer,
  options: AmqpLoggingOptions,
) {
  return {
    read: createLoggingReader(createFrameReader(conn), options),
    write: createLoggingWriter(createFrameWriter(conn), options),
  };
}
