import { AmqpChannel } from "./amqp_channel.ts";
import { HARD_ERROR_CONNECTION_FORCED } from "./amqp_constants.ts";
import {
  createSocket,
  AmqpSocket,
  Frame,
  OutgoingFrame,
  IncomingFrame,
  AmqpSocketWriter,
  AmqpSocketReader,
} from "./framing/mod.ts";
import {
  createMux,
  AmqpMultiplexer,
  createHeartbeatSocket,
} from "./connection/mod.ts";
import { AmqpProtocol } from "./amqp_protocol.ts";
import { serializeConnectionError } from "./connection/error_handling.ts";
import { createResolvable, ResolvablePromise } from "./resolvable.ts";
import {
  ConnectionClose,
  ConnectionStart,
  ConnectionTune,
} from "./amqp_types.ts";

const HEARTBEAT_FRAME: OutgoingFrame = {
  type: "heartbeat",
  channel: 0,
  payload: new Uint8Array([]),
};

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
  #frameMax: number = -1;
  #heartbeatInterval: number = -1;
  #isOpen: boolean = false;
  #protocol: AmqpProtocol;
  #mux: AmqpMultiplexer;
  #channelNumbers: number[] = [];
  #username: string;
  #password: string;
  #vhost: string;
  #closedPromise: ResolvablePromise<void>;
  #conn: Deno.Conn;
  #socket: AmqpSocketReader & AmqpSocketWriter;
  #options: AmqpConnectionOptions;
  #sendTimer: number | null = null;

  constructor(conn: Deno.Conn, options: AmqpConnectionOptions) {
    this.#conn = conn;
    this.#options = options;
    this.#socket = createSocket(this.#conn, { loglevel: options.loglevel });
    this.#mux = createMux({
      read: this.#read,
      write: this.#write,
      close: () => this.#conn.close(),
    });

    this.#protocol = new AmqpProtocol(this.#mux);
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
    this.#conn.close();
  };

  #handleStart = async (args: ConnectionStart) => {
    await this.#protocol.sendConnectionStartOk(0, {
      clientProperties,
      response: credentials(this.#username, this.#password),
    });
  };

  #handleTune = async (args: ConnectionTune) => {
    this.#heartbeatInterval = tune(
      this.#options.heartbeatInterval,
      args.heartbeat,
    );
    this.#channelMax = tune(undefined, args.channelMax);
    this.#frameMax = tune(this.#options.frameMax, args.frameMax);

    await this.#protocol.sendConnectionTuneOk(0, {
      heartbeat: this.#heartbeatInterval,
      channelMax: this.#channelMax,
      frameMax: this.#frameMax,
    });

    await this.#protocol.sendConnectionOpen(0, {
      virtualHost: this.#vhost,
    });
  };

  #write = async (frame: OutgoingFrame) => {
    if (frame.type === "content") {
      for (const chunk of splitArray(frame.payload, this.#frameMax)) {
        this.#socket.write({
          type: "content",
          channel: frame.channel,
          payload: chunk,
        });
      }

      return;
    }

    this.#socket.write(frame);
  };

  #clearSendTimer = () => {
    if (this.#sendTimer !== null) {
      clearTimeout(this.#sendTimer);
      this.#sendTimer = null;
    }
  };

  #resetSendTimer = () => {
    this.#clearSendTimer();

    if (this.#heartbeatInterval > 0) {
      this.#sendTimer = setTimeout(() => {
        this.#socket.write(HEARTBEAT_FRAME);
        this.#resetSendTimer();
      }, this.#heartbeatInterval * 1000);
    }
  };

  #readTimeout = (timeout: number): Promise<IncomingFrame> => {
    if (timeout === 0) {
      return this.#socket.read();
    }

    const timeoutMessage =
      `server heartbeat timeout ${this.#heartbeatInterval}s`;

    return new Promise(async (resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error(timeoutMessage));
        this.#conn.close();
      }, timeout);

      this.#socket.read()
        .then(resolve)
        .catch(reject)
        .finally(() => clearInterval(timer));
    });
  };

  #read = async (): Promise<IncomingFrame> => {
    while (true) {
      const timeout = this.#isOpen ? this.#heartbeatInterval * 1000 * 2 : 0;
      const frame = await this.#readTimeout(timeout);
      if (frame.type === "heartbeat") {
        continue;
      }

      return frame;
    }
  };

  /**
   * Open this connection.
   */
  async open() {
    await this.#conn.write(
      new Uint8Array([...new TextEncoder().encode("AMQP"), 0, 0, 9, 1]),
    );

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
