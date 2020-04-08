import { AmqpConnection, openConnection } from "./amqp_connection.ts";

export interface AmqpConnectOptions {
  hostname?: string;
  port?: number;
  username?: string;
  password?: string;
  heartbeatInterval?: number;
  loglevel?: "debug" | "none";
}

export async function connect(options: AmqpConnectOptions = {}): Promise<
  AmqpConnection
> {
  const {
    hostname = "localhost",
    port = 5672,
    username = "guest",
    password = "guest",
    heartbeatInterval,
    loglevel = "none",
  } = options;

  const conn = await Deno.connect({ port, hostname });

  const connection = await openConnection(
    conn,
    { username, password, heartbeatInterval, loglevel },
  );

  return connection;
}
