import { createConnection, AmqpConnection } from "./amqp_connection.ts";

const { dial } = Deno;

export { AmqpConnection } from "./amqp_connection.ts";
export { AmqpChannel } from "./amqp_channel.ts";

export interface AmqpOptions {
  /**
   * AMQP connection hostname.
   *
   * @default "localhost"
   */
  hostname?: string;

  /**
   * AMQP connection port.
   *
   * @default 5672
   */
  port?: number;

  /**
   * AMQP connection username.
   *
   * @default "guest"
   */
  username?: string;

  /**
   * AMQP connection password.
   *
   * @default "guest"
   */
  password?: string;
}

export async function connect(
  options: AmqpOptions = {}
): Promise<AmqpConnection> {
  const {
    hostname = "localhost",
    port = 5672,
    username = "guest",
    password = "guest"
  } = options;

  const socket = await dial({ hostname: hostname, port: port });
  const connection = createConnection(socket, {
    username: username,
    password: password
  });
  
  return connection;
}
