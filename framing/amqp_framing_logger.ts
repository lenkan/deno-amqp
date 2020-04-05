import { AmqpFraming, Frame } from "./amqp_framing.ts";

export interface AmqpLoggingOptions {
  loglevel: "debug" | "none";
}

class AmqpFramingLogger implements AmqpFraming {
  constructor(
    private socket: AmqpFraming,
    private options: AmqpLoggingOptions,
  ) {}

  async read(): Promise<Frame> {
    const frame = await this.socket.read();
    if (this.options.loglevel === "debug") {
      const prefix = `RECV(${frame.channel}) ${frame.type} ${frame.payload
        .slice(0, 8)}`;
      console.log(prefix);
    }
    return frame;
  }

  write(frame: Frame): Promise<void> {
    if (this.options.loglevel === "debug") {
      const prefix = `SEND(${frame.channel}) ${frame.type} ${frame.payload
        .slice(0, 8)}`;
      console.log(prefix);
    }
    return this.socket.write(frame);
  }
}

export function createFramingLogger(
  framing: AmqpFraming,
  options: AmqpLoggingOptions,
): AmqpFraming {
  return new AmqpFramingLogger(framing, options);
}
