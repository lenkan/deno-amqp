import { AmqpConnection, openConnection } from "./amqp_connection.ts";
import { createSocket } from "./framing/socket.ts";

export interface AmqpOptions {
  hostname?: string;
  port?: number;
  username?: string;
  password?: string;
  heartbeatInterval?: number;
  loglevel?: "debug" | "none";
}

export async function connect(options: AmqpOptions = {}): Promise<
  AmqpConnection
> {
  const {
    hostname = "localhost",
    port = 5672,
    username = "guest",
    password = "guest",
    heartbeatInterval,
    loglevel = "none"
  } = options;

  const conn = await Deno.connect({ port, hostname });
  const socket = createSocket(conn, { loglevel });
  const connection = await openConnection(
    socket,
    { username, password, heartbeatInterval }
  );

  return connection;
}
