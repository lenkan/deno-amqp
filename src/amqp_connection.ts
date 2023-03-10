import { AmqpChannel } from "./amqp_channel.ts";
import type { AmqpSocket } from "./amqp_socket.ts";
import type { ConnectionClose, ConnectionStart, ConnectionTune } from "./amqp_types.ts";

import {
  CHANNEL,
  CHANNEL_OPEN,
  CHANNEL_OPEN_OK,
  CONNECTION,
  CONNECTION_CLOSE,
  CONNECTION_CLOSE_OK,
  CONNECTION_OPEN,
  CONNECTION_OPEN_OK,
  CONNECTION_START,
  CONNECTION_START_OK,
  CONNECTION_TUNE,
  CONNECTION_TUNE_OK,
  HARD_ERROR_CONNECTION_FORCED,
} from "./amqp_constants.ts";
import { AmqpMultiplexer, createAmqpMux } from "./amqp_multiplexer.ts";
import { serializeConnectionError } from "./error_handling.ts";
import { createResolvable, ResolvablePromise } from "./resolvable.ts";

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
  #channelMax = -1;
  #isOpen = false;
  #channelNumbers: number[] = [];
  #username: string;
  #password: string;
  #vhost: string;
  #closedPromise: ResolvablePromise<void>;
  #options: AmqpConnectionOptions;
  #socket: AmqpSocket;
  #mux: AmqpMultiplexer;

  constructor(socket: AmqpSocket, options: AmqpConnectionOptions) {
    this.#options = options;
    this.#socket = socket;
    this.#mux = createAmqpMux(this.#socket);
    this.#username = options.username;
    this.#password = options.password;
    this.#vhost = options.vhost || "/";
    this.#closedPromise = createResolvable<void>();

    this.#mux.receive(0, CONNECTION, CONNECTION_CLOSE)
      .then(this.#handleClose)
      .catch(this.#closedPromise.reject)
      .finally(() => {
        this.#isOpen = false;
      });
  }

  #handleClose = async (args: ConnectionClose) => {
    this.#isOpen = false;
    await this.#mux.send(0, CONNECTION, CONNECTION_CLOSE_OK, args);
    this.#closedPromise.reject(new Error(serializeConnectionError(args)));
    this.#socket.close();
  };

  #handleStart = async (_args: ConnectionStart) => {
    await this.#mux.send(0, CONNECTION, CONNECTION_START_OK, {
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

    await this.#mux.send(0, CONNECTION, CONNECTION_TUNE_OK, {
      heartbeat: heartbeatInterval,
      channelMax: this.#channelMax,
      frameMax,
    });

    this.#socket.tune({
      frameMax,
      sendTimeout: heartbeatInterval * 1000,
      readTimeout: heartbeatInterval * 1000 * 2,
    });

    await this.#mux.send(0, CONNECTION, CONNECTION_OPEN, {
      virtualHost: this.#vhost,
    });

    await this.#mux.receive(0, CONNECTION, CONNECTION_OPEN_OK);
  };

  /**
   * Open this connection.
   */
  async open() {
    await this.#socket.start();

    await this.#mux.receive(0, CONNECTION, CONNECTION_START).then(
      this.#handleStart,
    );
    await this.#mux.receive(0, CONNECTION, CONNECTION_TUNE).then(
      this.#handleTune,
    );

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

        await this.#mux.send(channelNumber, CHANNEL, CHANNEL_OPEN, {});
        await this.#mux.receive(channelNumber, CHANNEL, CHANNEL_OPEN_OK);
        const channel = new AmqpChannel(channelNumber, this.#mux);

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
      await this.#mux.send(0, CONNECTION, CONNECTION_CLOSE, {
        classId: 0,
        methodId: 0,
        replyCode: HARD_ERROR_CONNECTION_FORCED,
      });

      await this.#mux.receive(0, CONNECTION, CONNECTION_CLOSE_OK);

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
