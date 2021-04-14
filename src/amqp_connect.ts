import { AmqpConnection } from "./amqp_connection.ts";
import { AmqpSocket } from "./amqp_socket.ts";
import { AmqpConnectOptions, parseOptions } from "./amqp_connect_options.ts";

export type { AmqpConnectOptions };

export async function connect(): Promise<AmqpConnection>;
export async function connect(
  options: AmqpConnectOptions,
): Promise<AmqpConnection>;
export async function connect(uri: string): Promise<AmqpConnection>;
export async function connect(
  optionsOrUrl?: AmqpConnectOptions | string,
): Promise<AmqpConnection> {
  const {
    hostname,
    port,
    username,
    password,
    heartbeatInterval,
    loglevel,
    vhost,
    frameMax,
    secure,
  } = parseOptions(optionsOrUrl);

  const connect = secure
    ? Deno.connectTls.bind(Deno, {
        port,
        hostname,
        certFile: typeof secure === "string" ? secure : undefined,
    })
    : Deno.connect.bind(Deno, { port, hostname });

  const conn = await connect();
  const socket = new AmqpSocket(conn);

  const connection = new AmqpConnection(socket, {
    username,
    password,
    heartbeatInterval,
    frameMax,
    loglevel,
    vhost,
  });

  await connection.open();

  return connection;
}
