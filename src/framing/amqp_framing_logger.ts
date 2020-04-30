import { Frame } from "./amqp_framing.ts";

export interface AmqpLoggingOptions {
  loglevel: "debug" | "none";
}

export function createLoggingReader(
  reader: () => Promise<Frame>,
  options: AmqpLoggingOptions,
) {
  return async () => {
    const frame = await reader();
    if (options.loglevel === "debug") {
      const prefix = `RECV(${frame.channel}) ${frame.type} ${
        frame.payload
          .slice(0, 8)
      }`;
      console.log(prefix);
    }
    return frame;
  };
}

export function createLoggingWriter(
  writer: (frame: Frame) => Promise<void>,
  options: AmqpLoggingOptions,
) {
  return async (frame: Frame) => {
    if (options.loglevel === "debug") {
      const prefix = `SEND(${frame.channel}) ${frame.type} ${
        frame.payload
          .slice(0, 8)
      }`;
      console.log(prefix);
    }
    return writer(frame);
  };
}
