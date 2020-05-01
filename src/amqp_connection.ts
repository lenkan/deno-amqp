import { AmqpChannel, openChannel } from "./amqp_channel.ts";
import { HARD_ERROR_CONNECTION_FORCED } from "./amqp_constants.ts";
import { createSocket } from "./framing/mod.ts";
import { createMux } from "./connection/mod.ts";
import { AmqpProtocol } from "./amqp_protocol.ts";
import { serializeConnectionError } from "./connection/error_handling.ts";
import { createResolvable } from "./resolvable.ts";

export interface AmqpConnectionOptions {
  username: string;
  password: string;
  vhost?: string;
  heartbeatInterval?: number;
  loglevel: "debug" | "none";
}

const NULL_CHAR = String.fromCharCode(0);
function credentials(username: string, password: string) {
  return `${NULL_CHAR}${username}${NULL_CHAR}${password}`;
}

const clientProperties = Object.freeze({
  product: "deno-amqp",
  platform: `Deno ${Deno.version.deno} https://deno.land`,
  version: "0",
  information: "https://deno.land/x/amqp/",
});

/**
 * Represents a live AMQP connection
 */
export interface AmqpConnection {
  /**
   * Closes the AMQP connection.
   */
  close(): Promise<void>;

  /**
   * Returns a promise that is settled when the connection is closed.
   *
   * If the connection is unexpectedly closed by the server, it will reject with an error.
   * If the connection is successfully closed by the this client, it will resolve once the close handshake
   * has completed successfully.
   *
   * This can be useful to detect if the server has crashed or otherwise encountered an irrecoverable exception.
   */
  closed(): Promise<void>;

  /**
   * Opens up a new AMQP channel for operations.
   */
  openChannel(): Promise<AmqpChannel>;
}

export async function openConnection(
  conn: Deno.Conn,
  options: AmqpConnectionOptions,
): Promise<AmqpConnection> {
  const { username, password, loglevel } = options;
  const channelNumbers: number[] = [];
  let channelMax: number = -1;
  let frameMax: number = -1;
  let isOpen: boolean = false;

  const socket = createSocket(conn, { loglevel });
  const mux = createMux(socket);

  const protocol = new AmqpProtocol(mux);

  const closedPromise = createResolvable<void>();

  protocol.receiveConnectionClose(0).then(async (args) => {
    isOpen = false;
    await protocol.sendConnectionCloseOk(0, {});
    closedPromise.reject(new Error(serializeConnectionError(args)));
    conn.close();
  }).catch(closedPromise.reject).finally(() => {
    isOpen = false;
  });

  async function init() {
    await conn.write(
      new Uint8Array([...new TextEncoder().encode("AMQP"), 0, 0, 9, 1]),
    );
  }

  async function open() {
    await init();

    await protocol.receiveConnectionStart(0);
    await protocol.sendConnectionStartOk(0, {
      clientProperties,
      response: credentials(username, password),
    });

    await protocol.receiveConnectionTune(0).then(
      async (args) => {
        const interval = options.heartbeatInterval !== undefined
          ? options.heartbeatInterval
          : args.heartbeat;

        channelMax = args.channelMax;
        frameMax = args.frameMax;

        await protocol.sendConnectionTuneOk(0, {
          heartbeat: interval,
          channelMax: channelMax,
          frameMax: frameMax,
        });
      },
    );

    await protocol.sendConnectionOpen(0, {
      virtualHost: options.vhost || "/",
    });
    isOpen = true;
  }

  async function close() {
    if (isOpen) {
      await protocol.sendConnectionClose(0, {
        classId: 0,
        methodId: 0,
        replyCode: HARD_ERROR_CONNECTION_FORCED,
      });
      conn.close();
    }
    isOpen = false;
    closedPromise.resolve();
  }

  async function closed() {
    return await closedPromise;
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

  await open();

  return { close, closed, openChannel: createChannel };
}
