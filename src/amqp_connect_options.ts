import { AmqpConnection } from "./amqp_connection.ts";
import { AmqpSocket } from "./amqp_socket.ts";

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
   * AMQP virtual host. Defaults to "/"
   */
  vhost?: string;

  /**
   * Interval in seconds for the AMQP heartbeat frames. If not provided, the suggested heartbeat interval from
   * the AMQP broker will be used (usually 60s).
   *
   * If explicitly set to 0, heartbeat frames will be disabled.
   */
  heartbeatInterval?: number;

  /**
   * Sets the maximum frame size in number of bytes.
   *
   * This is negotiated with the broker during the connection handshake.
   */
  frameMax?: number;

  /**
   * **UNSTABLE**
   * Controls the log level. Currently setting it to 'debug' will print received and sent frames on byte level.
   *
   * This should eventually be able to turn logging on and off on different levels such as framing/methods/connection.
   */
  loglevel?: "debug" | "none";
}

export interface AmqpConnectParameters {
  hostname: string;
  port: number;
  username: string;
  password: string;
  vhost: string;
  heartbeatInterval?: number;
  frameMax?: number;
  loglevel: "debug" | "none";
}

function parseUrl(value: string): AmqpConnectOptions {
  if (!value.startsWith("amqp:")) {
    throw new Error("Unsupported protocol");
  }

  const url = new URL(value.replace("amqp:", "http:"));

  const heartbeatParam = url.searchParams.get("heartbeat");
  const heartbeat = heartbeatParam ? parseInt(heartbeatParam) : undefined;
  if (heartbeat !== undefined && isNaN(heartbeat)) {
    throw new Error(`Invalid heartbeat parameter ${heartbeatParam}`);
  }

  const frameMaxParam = url.searchParams.get("frame_max");
  const frameMax = frameMaxParam ? parseInt(frameMaxParam) : undefined;
  if (frameMax !== undefined && isNaN(frameMax)) {
    throw new Error(`Invalid frame_max parameter ${frameMaxParam}`);
  }

  return {
    hostname: url.hostname,
    port: parseInt(url.port || "5672"),
    username: url.username || "guest",
    password: url.password || "guest",
    vhost: url.pathname,
    heartbeatInterval: heartbeat,
    frameMax: frameMax,
  };
}

export function parseOptions(
  optionsOrString: string | AmqpConnectOptions = {},
): AmqpConnectParameters {
  const {
    hostname = "localhost",
    port = 5672,
    username = "guest",
    password = "guest",
    heartbeatInterval,
    loglevel = "none",
    vhost = "/",
    frameMax,
  } = typeof optionsOrString === "string"
    ? parseUrl(optionsOrString)
    : optionsOrString;

  return {
    hostname,
    port,
    username,
    password,
    heartbeatInterval,
    loglevel,
    vhost,
    frameMax,
  };
}
