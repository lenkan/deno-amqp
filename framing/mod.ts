import { encodeFrame, Frame as OutgoingFrame } from "./frame_encoder.ts";
import {
  decodeFrame,
  Frame as IncomingFrame,
  decodeHeader
} from "./frame_decoder.ts";
import {
  CHANNEL,
  CHANNEL_CLOSE,
  CONNECTION,
  CONNECTION_CLOSE,
  FRAME_METHOD
} from "../framing/constants.ts";
import { MethodPayload as IncomingMethod } from "./method_decoder.ts";
import { MethodPayload as OutgoingMethod } from "./method_encoder.ts";
import { initializeMethods, AmqpMethods } from "./methods.ts";

export { OutgoingFrame, IncomingFrame };

interface AmqpFraming {
  /**
   * Initiates the AMQP Connection
   */
  start(): Promise<void>;

  /**
   * Writes the specified frame to the socket
   */
  write(frame: OutgoingFrame): Promise<void>;

  /**
   * Register a frame listener
   */
  listen(listener: Listener): () => void;
}

export interface Listener {
  (frame: IncomingFrame): void;
}

interface FramingLogger {
  logIncoming(frame: IncomingFrame): void;
  logOutgoing(frame: OutgoingFrame): void;
}

class ConsoleFramingLogger implements FramingLogger {
  constructor(private conn: Deno.Conn) {}

  logIncoming(frame: IncomingFrame): void {
    if (frame.type === FRAME_METHOD) {
      console.log(
        `${this.conn.localAddr}: RECV ${frame.channel} ${frame.classId}-${frame.methodId}`
      );
    }
  }

  logOutgoing(frame: OutgoingFrame): void {
    if (frame.type === FRAME_METHOD) {
      console.log(
        `${this.conn.localAddr}: SEND ${frame.channel} ${frame.classId}-${frame.methodId}`
      );
    }
  }
}

/**
 * Creates the AMQP framing layer on top of a Deno.Conn socket
 * @param conn
 */
export function initializeFraming(
  conn: Deno.Conn,
  logger: FramingLogger = new ConsoleFramingLogger(conn)
): AmqpFraming {
  let open = true;

  const listeners: Listener[] = [];

  function removeListener(l: Listener) {
    const index = listeners.indexOf(l);
    if (index !== -1) {
      listeners.splice(index, 1);
    }
  }

  async function readBytes(length: number): Promise<Uint8Array | null> {
    if (!open) {
      return null;
    }

    const chunk = new Uint8Array(length);
    const n: number | null = await conn.read(chunk).catch(error => {
      // Detecting if the socket is closed, in that case, this error is expected.
      // TODO(lenkan): Should be able to detect this before initiating the read
      if (!open) {
        return null;
      }

      throw error;
    });

    if (n === null) {
      return null;
    }

    if (n === length) {
      return chunk;
    }

    // TODO: Handle this
    throw new Error(
      `Unable to read desired length from connection ${JSON.stringify({
        n,
        length
      })}`
    );
  }

  async function read(): Promise<IncomingFrame | null> {
    const prefix = await readBytes(7);
    if (prefix === null) {
      return null;
    }
    const header = decodeHeader(prefix);
    const payload = await readBytes(header.size + 1); // size + frame end
    const frame = decodeFrame(header, payload.slice(0, header.size));
    logger.logIncoming(frame);
    return frame;
  }

  async function write(frame: OutgoingFrame) {
    if (!conn) {
      throw new Error(`Connection closed. Cannot write frame ${frame.type}`);
    }

    logger.logOutgoing(frame);

    const data = encodeFrame(frame);
    await conn.write(data);
  }

  async function start() {
    await conn.write(new Uint8Array([65, 77, 81, 80, 0, 0, 9, 1]));
    startReceiving();
  }

  async function startReceiving() {
    while (true) {
      const frame = await read();
      if (frame === null) {
        return;
      }

      for (const listener of [...listeners]) {
        listener(frame);
      }
    }
  }

  function listen(listener: Listener): () => void {
    listeners.push(listener);
    return () => removeListener(listener);
  }

  return {
    start,
    write,
    listen
  };
}

interface MethodPromise {
  channel: number;
  classId: number;
  methodId: number;
  resolve: (args: any) => void;
  reject: (err?: any) => void;
}

export interface AmqpProtocol extends AmqpMethods {
  listen(listener: Listener): () => void;
  send(frame: OutgoingFrame): Promise<void>;
  initialize(): Promise<void>;
  receive<T extends Pick<IncomingMethod, "classId" | "methodId">>(
    channel: number,
    args: T
  ): Promise<Extract<IncomingMethod, T>["args"]>;
}

export function createProtocol(conn: Deno.Conn): AmqpProtocol {
  const framing = initializeFraming(conn);
  const promises: MethodPromise[] = [];

  function removePromise(p: MethodPromise) {
    const index = promises.indexOf(p);
    if (index !== -1) {
      promises.splice(index, 1);
    }
  }

  async function receiveMethod<
    T extends Pick<IncomingMethod, "classId" | "methodId">
  >(channel: number, args: T): Promise<Extract<IncomingMethod, T>["args"]> {
    const promise = new Promise<Extract<IncomingMethod, T>["args"]>(
      (resolve, reject) => {
        const p: MethodPromise = {
          channel,
          classId: args.classId,
          methodId: args.methodId,
          resolve: (args: any) => {
            removePromise(p);
            resolve(args);
          },
          reject: (err?: any) => {
            removePromise(p);
            reject(err);
          }
        };

        promises.push(p);
      }
    );

    return promise;
  }

  const methods = initializeMethods(framing.write, args => {
    if (args.classId && args.methodId) {
      return receiveMethod(args.channel, {
        classId: args.classId,
        methodId: args.methodId
      } as any);
    }
  });

  framing.listen(frame => {
    if (frame.type === FRAME_METHOD) {
      if (frame.classId === CONNECTION && frame.methodId === CONNECTION_CLOSE) {
        const error = new Error(
          `${frame.args.replyCode}: ${frame.args.replyText}`
        );
        for (const promise of [...promises]) {
          promise.reject(error);
        }
      }

      if (frame.classId === CHANNEL && frame.methodId === CHANNEL_CLOSE) {
        const error = new Error(
          `${frame.args.replyCode}: ${frame.args.replyText}`
        );

        for (const promise of [
          ...promises.filter(p => p.channel === frame.channel)
        ]) {
          promise.reject(error);
        }
      }

      for (const promise of [
        ...promises.filter(
          a =>
            a.channel === frame.channel &&
            a.classId === frame.classId &&
            a.methodId === frame.methodId
        )
      ]) {
        promise.resolve(frame.args);
      }
    }
  });

  return {
    ...methods,
    receive: receiveMethod,
    initialize: framing.start,
    listen: framing.listen,
    send: framing.write
  };
}
