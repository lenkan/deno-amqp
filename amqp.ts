import { connect as amqpConnect } from "./connection/connection_manager.ts";
import { createSocket } from "./framing/socket.ts";

export interface AmqpOptions {
  hostname?: string;
  port?: number;
  username?: string;
  password?: string;
  heartbeatInterval?: number;
}

export async function connect(options: AmqpOptions = {}) {
  const {
    hostname = "localhost",
    port = 5672,
    username = "guest",
    password = "guest",
    heartbeatInterval
  } = options;

  const conn = await Deno.connect({ port, hostname });
  const socket = createSocket(conn);
  return amqpConnect(socket, { password, username, heartbeatInterval });
}
