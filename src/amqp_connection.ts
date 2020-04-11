import { AmqpChannel, openChannel } from "./amqp_channel.ts";
import { HARD_ERROR_CONNECTION_FORCED } from "./amqp_constants.ts";
import { createFraming } from "./framing/mod.ts";
import { createMux } from "./connection/mod.ts";
import { AmqpProtocol } from "./amqp_protocol.ts";
import { serializeConnectionError } from "./connection/error_handling.ts";
import { createResolvable } from "./utils.ts";

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

const clientProperties = Object.freeze({
  product: "deno-amqp",
  platform: `Deno ${Deno.version.deno} https://deno.land`,
  version: "0",
  information: "https://deno.land/x/amqp/",
});

export interface AmqpConnection {
  close(): Promise<void>;

  /**
   * Returns a promise that is settled when the connection is closed
   */
  closed(): Promise<void>;
  openChannel(): Promise<AmqpChannel>;
}

export function openConnection(
  conn: Deno.Conn,
  options: AmqpConnectionOptions,
): Promise<AmqpConnection> {
  const { username, password, loglevel } = options;
  const channelNumbers: number[] = [];
  let channelMax: number = -1;
  let frameMax: number = -1;
  let isOpen: boolean = false;

  const framing = createFraming(conn, { loglevel });
  const mux = createMux(framing);
  const protocol = new AmqpProtocol(mux);

  const closedPromise = createResolvable<void>();

  protocol.subscribeConnectionClose(0, async (args) => {
    isOpen = false;
    await protocol.sendConnectionCloseOk(0, {});
    conn.close();
    closedPromise.reject(new Error(serializeConnectionError(args)));
  });

  async function open() {
    await conn.write(new TextEncoder().encode("AMQP"));
    await conn.write(new Uint8Array([0, 0, 9, 1]));

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

    await protocol.sendConnectionOpen(0, {});
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

  const connection: AmqpConnection = {
    close,
    closed,
    openChannel: createChannel,
  };

  return new Promise<AmqpConnection>(async (resolve) => {
    await open();
    return resolve(connection);
  });
}
