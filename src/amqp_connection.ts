import { AmqpChannel } from "./amqp_channel.ts";
import { HARD_ERROR_CONNECTION_FORCED } from "./amqp_constants.ts";
import { createSocket, AmqpSocket } from "./framing/mod.ts";
import { createMux, AmqpMultiplexer } from "./connection/mod.ts";
import { AmqpProtocol } from "./amqp_protocol.ts";
import { serializeConnectionError } from "./connection/error_handling.ts";
import { createResolvable, ResolvablePromise } from "./resolvable.ts";
import { ConnectionClose } from "./amqp_types.ts";

export interface AmqpConnectionOptions {
  username: string;
  password: string;
  vhost?: string;
  heartbeatInterval?: number;
  frameMax?: number;
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

export class AmqpConnection implements AmqpConnection {
  #channelMax: number = -1;
  #frameMax: number = -1;
  #isOpen: boolean = false;
  #protocol: AmqpProtocol;
  #mux: AmqpMultiplexer;
  #channelNumbers: number[] = [];
  #username: string;
  #password: string;
  #vhost: string;
  #heartbeatInterval?: number;
  #closedPromise: ResolvablePromise<void>;
  #conn: Deno.Conn;
  #socket: AmqpSocket;

  constructor(conn: Deno.Conn, options: AmqpConnectionOptions) {
    this.#conn = conn;
    this.#socket = createSocket(this.#conn, { loglevel: options.loglevel });
    this.#mux = createMux(this.#socket);
    this.#protocol = new AmqpProtocol(this.#mux);
    this.#username = options.username;
    this.#password = options.password;
    this.#frameMax = options.frameMax !== undefined ? options.frameMax : -1;
    this.#vhost = options.vhost || "/";
    this.#closedPromise = createResolvable<void>();

    this.#protocol.receiveConnectionClose(0)
      .then(this.#handleClose)
      .catch(this.#closedPromise.reject)
      .finally(() => {
        this.#isOpen = false;
      });
  }

  #handleClose = async (args: ConnectionClose) => {
    this.#isOpen = false;
    await this.#protocol.sendConnectionCloseOk(0, {});
    this.#closedPromise.reject(new Error(serializeConnectionError(args)));
    this.#conn.close();
  };

  /**
   * Open this connection.
   */
  async open() {
    await this.#conn.write(
      new Uint8Array([...new TextEncoder().encode("AMQP"), 0, 0, 9, 1]),
    );

    await this.#protocol.receiveConnectionStart(0);
    await this.#protocol.sendConnectionStartOk(0, {
      clientProperties,
      response: credentials(this.#username, this.#password),
    });

    await this.#protocol.receiveConnectionTune(0).then(
      async (args) => {
        const interval = this.#heartbeatInterval !== undefined
          ? this.#heartbeatInterval
          : args.heartbeat;

        this.#channelMax = args.channelMax;
        this.#frameMax = this.#frameMax < 0 ? args.frameMax : this.#frameMax;

        await this.#protocol.sendConnectionTuneOk(0, {
          heartbeat: interval,
          channelMax: this.#channelMax,
          frameMax: this.#frameMax,
        });
      },
    );

    await this.#protocol.sendConnectionOpen(0, {
      virtualHost: this.#vhost,
    });
    this.#isOpen = true;
  }

  /**
   * Creates and opens a new channel
   */
  async openChannel(): Promise<AmqpChannel> {
    for (
      let channelNumber = 1;
      channelNumber < this.#channelMax;
      ++channelNumber
    ) {
      if (!this.#channelNumbers.find((num) => num === channelNumber)) {
        this.#channelNumbers.push(channelNumber);

        await this.#protocol.sendChannelOpen(channelNumber, {});
        const channel = new AmqpChannel(channelNumber, this.#protocol);

        return channel;
      }
    }

    throw new Error(`Maximum channels ${this.#channelMax} reached`);
  }

  /**
   * Gracefully close this connection.
   */
  async close() {
    if (this.#isOpen) {
      await this.#protocol.sendConnectionClose(0, {
        classId: 0,
        methodId: 0,
        replyCode: HARD_ERROR_CONNECTION_FORCED,
      });
      this.#conn.close();
    }
    this.#isOpen = false;
    this.#closedPromise.resolve();
  }

  /**
   * Returns a promise that is settled when this connection is closed.
   * 
   * If the connection is gracefully closed, the promise will _resolve_.
   * 
   * If the connection is unexpectedly closed by the server or from an error, the promise
   * will _reject_ with the reason.
   */
  async closed() {
    return await this.#closedPromise;
  }
}
