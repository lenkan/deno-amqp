export {
  AmqpFrameReader,
  AmqpFrameWriter,
  AmqpFraming,
  Frame,
} from "./amqp_framing.ts";
import {
  createFraming as create,
} from "./amqp_framing.ts";
import {
  AmqpLoggingOptions,
  createFramingLogger,
} from "./amqp_framing_logger.ts";

export function createFraming(
  conn: Deno.Reader & Deno.Writer,
  options: AmqpLoggingOptions,
) {
  const framing = create(conn);
  return createFramingLogger(framing, options);
}
