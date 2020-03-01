import { createSocket } from "./framing/socket.ts";
import { AmqpConnection } from "./amqp_connection.ts";
import { connectionStartOk, connectionTune, connectionTuneOk, connectionOpen,
  connectionOpenOk, connectionClose, connectionCloseOk, connectionStart,
  ConnectionStart } from "./amqp_definitions.ts";

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

const NULL_CHAR = String.fromCharCode(0);
function credentials(username: string, password: string) {
  return `${NULL_CHAR}${username}${NULL_CHAR}${password}`;
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

  const conn = await Deno.connect({ hostname, port });
  const socket = createSocket(conn);

  socket.start().catch(e => console.error(e));
  await socket.receiveMethod(0, connectionStart).then(handleStart);

  async function handleStart(start: ConnectionStart) {
    console.dir(start);
    await socket.sendMethod(
      0,
      connectionStartOk,
      {
        clientProperties: {},
        response: credentials(username, password)
      }
    );
    console.log("Sent startOk");

    await socket.receiveMethod(0, connectionTune).then(tune => {
      console.log("Received tune");
      return socket.sendMethod(
        0,
        connectionTuneOk,
        { ...tune, heartbeat: 0 }
      );
    });

    await socket.sendMethod(
      0,
      connectionOpen,
      {}
    );

    await socket.receiveMethod(0, connectionOpenOk);

    socket.subscribeMethod(0, connectionClose, _ => {
      socket.sendMethod(0, connectionCloseOk, {});
    });
  }

  const connection = new AmqpConnection(socket);
  return connection;
}
