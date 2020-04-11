import { AmqpConnection, openConnection } from "./amqp_connection.ts";

/**
 * Options for the connection to an AMQP broker.
 */
export interface AmqpConnectOptions {
  /**
   * Hostname or literal IP-address to the AMQP broker. Defaults to 'localhost'.
   */
  hostname?: string;

  /**
   * TCP port of the AMQP broker. Defaults to 5672.
   */
  port?: number;

  /**
   * Username for authenticating towards the AMQP broker. Defaults to 'guest'.
   */
  username?: string;

  /**
   * Password for authenticating towards the AMQP broker. Defaults to 'guest'.
   */
  password?: string;

  /**
   * Interval in seconds for the AMQP heartbeat frames. If not provided, the suggested heartbeat interval from
   * the AMQP broker will be used (usually 60s).
   *
   * If explicitly set to 0, heartbeat frames will be disabled.
   */
  heartbeatInterval?: number;

  /**
   * **UNSTABLE**
   * Controls the log level. Currently setting it to 'debug' will print received and sent frames on byte level.
   *
   * This should eventually be able to turn logging on and off on different levels such as framing/methods/connection.
   */
  loglevel?: "debug" | "none";
}

/**
 * Connects to an AMQP broker specified by the options.
 * @param options Connect options
 */
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
