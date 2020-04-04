import { AmqpSocket } from "./framing/socket.ts";
import { AmqpChannel, openChannel } from "./amqp_channel.ts";
import {
  AmqpProtocol,
  ConnectionCloseArgs,
  HARD_ERROR_CONNECTION_FORCED
} from "./amqp_protocol.ts";
import { AmqpFramingMiddleware } from "./framing/amqp_framing_middleware.ts";
import { AmqpLoggingMiddleware } from "./framing/amqp_logging_middleware.ts";
import { AmqpHeartbeatMiddleware } from "./framing/amqp_heartbeat_middleware.ts";

export interface AmqpConnectionOptions {
  username: string;
  password: string;
  heartbeatInterval?: number;
  loglevel: "debug" | "none";
}

const NULL_CHAR = String.fromCharCode(0);
function credentials(username: string, password: string) {
  return `${NULL_CHAR}${username}${NULL_CHAR}${password}`;
}

export interface AmqpConnection {
  close(): Promise<void>;
  openChannel(): Promise<AmqpChannel>;
}

export function openConnection(
  conn: Deno.Conn,
  options: AmqpConnectionOptions,
): Promise<AmqpConnection> {
  const { username, password, loglevel } = options;
  let heartbeatInterval: number | undefined = options.heartbeatInterval;
  const channelNumbers: number[] = [];
  let channelMax: number = -1;
  let frameMax: number = -1;

  const framingMiddleware = new AmqpFramingMiddleware(conn);
  const loggingMiddleware = new AmqpLoggingMiddleware(
    framingMiddleware,
    { loglevel },
  );
  const socket = new AmqpHeartbeatMiddleware(loggingMiddleware);

  const protocol: AmqpProtocol = new AmqpProtocol(socket);

  protocol.subscribeConnectionClose(0, async (args) => {
    await protocol.sendConnectionCloseOk(0, {});
    conn.close();
  });

  async function open() {
    await conn.write(new TextEncoder().encode("AMQP"));
    await conn.write(new Uint8Array([0, 0, 9, 1]));

    await protocol.receiveConnectionStart(0);
    await protocol.sendConnectionStartOk(0, {
      clientProperties: {},
      response: credentials(username, password),
    });

    await protocol.receiveConnectionTune(0).then(
      async (args) => {
        const interval = heartbeatInterval !== undefined
          ? heartbeatInterval
          : args.heartbeat;

        channelMax = args.channelMax;
        frameMax = args.frameMax;

        console.log(interval);
        await protocol.sendConnectionTuneOk(0, {
          heartbeat: interval,
          channelMax: channelMax,
          frameMax: frameMax,
        });

        socket.setHeartbeatInterval(interval);
      },
    );

    await protocol.sendConnectionOpen(0, {});
  }

  async function close(args?: Partial<ConnectionCloseArgs>) {
    await protocol.sendConnectionClose(0, {
      classId: args?.classId || 0,
      methodId: args?.methodId || 0,
      replyCode: args?.replyCode || HARD_ERROR_CONNECTION_FORCED,
      replyText: args?.replyText,
    });
    conn.close();
  }

  async function createChannel(): Promise<AmqpChannel> {
    for (let channelNumber = 1; channelNumber < channelMax; ++channelNumber) {
      if (!channelNumbers.find((num) => num === channelNumber)) {
        channelNumbers.push(channelNumber);

        const channel = await openChannel(channelNumber, protocol);

        return channel;
      }
    }

    throw new Error(`Maximum channels ${channelMax} reached`);
  }

  const connection: AmqpConnection = { close, openChannel: createChannel };

  return new Promise<AmqpConnection>(async (resolve) => {
    await open();
    return resolve(connection);
  });
}
