import { AmqpReaderWriter } from "./types.ts";
import { AmqpHeartbeatMiddleware } from "./amqp_heartbeat_middleware.ts";
import { AmqpFramingMiddleware } from "./amqp_framing_middleware.ts";
import { AmqpLoggingMiddleware } from "./amqp_logging_middleware.ts";

export interface AmqpSocket extends AmqpReaderWriter {
  start(): Promise<void>;
  tuneHeartbeat(interval: number): void;
  close(): void;
}

export interface SocketOptions {
  loglevel: "debug" | "none";
}

export function createSocket(
  conn: Deno.ReadWriteCloser,
  options: SocketOptions = { loglevel: "none" },
): AmqpSocket {
  const framingMiddleware = new AmqpFramingMiddleware(conn);
  const loggingMiddleware = new AmqpLoggingMiddleware(
    framingMiddleware,
    { loglevel: options.loglevel },
  );
  const socket = new AmqpHeartbeatMiddleware(loggingMiddleware);

  async function start() {
    await conn.write(new TextEncoder().encode("AMQP"));
    await conn.write(new Uint8Array([0, 0, 9, 1]));
  }

  return {
    start,
    close: () => conn.close(),
    write: socket.write.bind(socket),
    read: socket.read.bind(socket),
    tuneHeartbeat: socket.setHeartbeatInterval.bind(socket),
  };
}
