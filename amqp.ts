import { AmqpConnection } from "./amqp_connection.ts";
import { AmqpChannel } from "./amqp_channel.ts";
import { createSocket } from "./framing/socket.ts";

export interface AmqpOptions {
  hostname?: string;
  port?: number;
  username?: string;
  password?: string;
  heartbeatInterval?: number;
  loglevel?: "debug" | "none";
}

export interface AmqpClient {
  channel(): Promise<AmqpChannel>;
  close(): Promise<void>;
}

export async function connect(options: AmqpOptions = {}): Promise<AmqpClient> {
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
  const connection = new AmqpConnection(
    socket,
    { username, password, heartbeatInterval }
  );
  await connection.open();

  async function openChannel(): Promise<AmqpChannel> {
    const channel = connection.createChannel();
    await channel.open({});
    return channel;
  }

  async function close() {
    await connection.close();
  }

  return { channel: openChannel, close };
}
