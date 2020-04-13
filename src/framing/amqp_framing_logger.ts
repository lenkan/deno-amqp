import {
  AmqpFraming,
  Frame,
  AmqpFrameReader,
  AmqpFrameWriter,
} from "./amqp_framing.ts";

export interface AmqpLoggingOptions {
  loglevel: "debug" | "none";
}

export function createLoggingReader(
  reader: AmqpFrameReader,
  options: AmqpLoggingOptions,
) {
  return async () => {
    const frame = await reader.read();
    if (options.loglevel === "debug") {
      const prefix = `RECV(${frame.channel}) ${frame.type} ${frame.payload
        .slice(0, 8)}`;
      console.log(prefix);
    }
    return frame;
  };
}

export function createLoggingWriter(
  writer: AmqpFrameWriter,
  options: AmqpLoggingOptions,
) {
  return async (frame: Frame) => {
    if (options.loglevel === "debug") {
      const prefix = `SEND(${frame.channel}) ${frame.type} ${frame.payload
        .slice(0, 8)}`;
      console.log(prefix);
    }
    return writer.write(frame);
  };
}
