import { AmqpChannel } from "./amqp_channel.ts";
import { HARD_ERROR_CONNECTION_FORCED } from "./amqp_constants.ts";
import { AmqpSocket } from "./amqp_socket.ts";
import { createAmqpMux } from "./amqp_multiplexer.ts";
import { AmqpProtocol } from "./amqp_protocol.ts";
import { serializeConnectionError } from "./error_handling.ts";
import { createResolvable, ResolvablePromise } from "./resolvable.ts";
import {
  ConnectionClose,
  ConnectionStart,
  ConnectionTune,
} from "./amqp_types.ts";

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

function splitArray(arr: Uint8Array, size: number): Uint8Array[] {
  const chunks: Uint8Array[] = [];
  let index = 0;

  while (index < arr.length) {
    chunks.push(arr.slice(index, size + index));
    index += size;
  }

  return chunks;
}

function tune(ours: number | undefined, theirs: number) {
  if (ours === undefined) {
    return theirs;
  }

  if (ours === 0) {
    return Math.max(ours, theirs);
  }

  return Math.min(ours, theirs);
}

export class AmqpConnection implements AmqpConnection {
  #channelMax: number = -1;
  #isOpen: boolean = false;
  #protocol: AmqpProtocol;
  #channelNumbers: number[] = [];
  #username: string;
  #password: string;
  #vhost: string;
  #closedPromise: ResolvablePromise<void>;
  #options: AmqpConnectionOptions;
  #socket: AmqpSocket;

  constructor(conn: Deno.Conn, options: AmqpConnectionOptions) {
    this.#options = options;
    this.#socket = new AmqpSocket(conn);
    this.#protocol = new AmqpProtocol(createAmqpMux(this.#socket));
    this.#username = options.username;
    this.#password = options.password;
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
    this.#socket.close();
  };

  #handleStart = async (args: ConnectionStart) => {
    await this.#protocol.sendConnectionStartOk(0, {
      clientProperties,
      response: credentials(this.#username, this.#password),
    });
  };

  #handleTune = async (args: ConnectionTune) => {
    const heartbeatInterval = tune(
      this.#options.heartbeatInterval,
      args.heartbeat,
    );

    this.#channelMax = tune(undefined, args.channelMax);
    const frameMax = tune(this.#options.frameMax, args.frameMax);

    await this.#protocol.sendConnectionTuneOk(0, {
      heartbeat: heartbeatInterval,
      channelMax: this.#channelMax,
      frameMax,
    });

    this.#socket.tune({
      frameMax,
      sendTimeout: heartbeatInterval * 1000,
      readTimeout: heartbeatInterval * 1000 * 2,
    });

    await this.#protocol.sendConnectionOpen(0, {
      virtualHost: this.#vhost,
    });
  };

  /**
   * Open this connection.
   */
  async open() {
    await this.#socket.start();

    await this.#protocol.receiveConnectionStart(0).then(this.#handleStart);
    await this.#protocol.receiveConnectionTune(0).then(this.#handleTune);

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
      this.#socket.close();
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
