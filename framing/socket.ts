import {
  encodeFrame,
  Frame as OutgoingFrame,
  Method as OutgoingMethod,
  MethodPayload as OutgoingMethodPayload
} from "./frame_encoder.ts";
import {
  decodeFrame,
  Frame as IncomingFrame,
  MethodFrame as IncomingMethod,
  decodeHeader
} from "./frame_decoder.ts";
import { CHANNEL, CHANNEL_CLOSE, CONNECTION, CONNECTION_CLOSE } from "./constants.ts";

const { dial } = Deno;

export { OutgoingFrame, IncomingFrame, IncomingMethod, OutgoingMethod };

export interface ConnectOptions {
  hostname: string;
  port: number;
}

export interface AmqpSocket {
  start(): Promise<void>;
  close(): void;
  write(frame: OutgoingFrame): Promise<void>;
  use(middleware: FrameMiddleware): () => void;
  receive<T extends Pick<IncomingMethod, "classId" | "methodId">>(
    channel: number,
    method: T
  ): Promise<Extract<IncomingMethod, T>["args"]>;
  send(channel: number, method: OutgoingMethodPayload): Promise<void>;
}

export interface FrameContext {
  frame: IncomingFrame;
  write(frame: OutgoingFrame): Promise<void>;
}

export interface Next {
  (): Promise<void> | void;
}

export type FrameMiddleware = (
  context: FrameContext,
  next?: Next
) => Promise<void> | void;

async function invokeMiddlewares(
  context: FrameContext,
  middlewares: FrameMiddleware[]
) {
  for (const middleware of middlewares) {
    await new Promise(resolve => middleware(context, resolve));
  }
}

export async function connect(options: ConnectOptions): Promise<AmqpSocket> {
  const middlewares: FrameMiddleware[] = [];

  let open = true;

  const conn = await dial({
    hostname: options.hostname,
    port: options.port,
    transport: "tcp"
  });

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

  async function* read(): AsyncIterableIterator<IncomingFrame> {
    while (true) {
      const prefix = await readBytes(7);
      if (prefix === null) {
        return null;
      }
      const header = decodeHeader(prefix);
      const payload = await readBytes(header.size + 1); // size + frame end
      yield decodeFrame(header, payload.slice(0, header.size));
    }
  }

  async function write(frame: OutgoingFrame) {
    if (!open) {
      throw new Error(
        `Tried to write ${JSON.stringify(frame)} on closed connection`
      );
    }
    const data = encodeFrame(frame);
    await conn.write(data);
  }

  function use(middleware: FrameMiddleware): () => void {
    middlewares.push(middleware);
    return () => {
      const index = middlewares.indexOf(middleware);
      if (index !== -1) {
        middlewares.splice(index, 1);
      }
    };
  }

  async function start() {
    await conn.write(new Uint8Array([65, 77, 81, 80, 0, 0, 9, 1]));
    startReceiving().catch(error => {
      console.error("Fatal error", error);
    });
  }

  async function receive<T extends Pick<IncomingMethod, "classId" | "methodId">>(
    channel: number,
    args: T
  ): Promise<Extract<IncomingMethod, T>["args"]> {
    return new Promise<any>((resolve, reject) => {
      const unregister = use((context, next) => {
        const { frame } = context;
        if (
          channel === frame.channel &&
          frame.type === "method" &&
          frame.classId === args.classId &&
          frame.methodId === args.methodId
        ) {
          unregister();
          resolve(frame.args as any);
        }

        if(
          channel === frame.channel &&
          frame.type === "method" &&
          frame.classId === CHANNEL &&
          frame.methodId === CHANNEL_CLOSE
        ) {
          unregister();
          reject(new Error(frame.args.replyText))
        }

        if(frame.type === "method" && frame.classId === CONNECTION && frame.methodId === CONNECTION_CLOSE) {
          unregister();
          reject(new Error(frame.args.replyText))
        }

        return next();
      });
    });
  }

  async function send<
    T extends OutgoingMethod["classId"],
    U extends OutgoingMethod["methodId"]
  >(channel: number, method: OutgoingMethod): Promise<void> {
    await write({
      type: "method",
      channel,
      ...method
    });
  }

  async function startReceiving() {
    for await (const frame of read()) {
      if (frame === null) {
        return;
      }
      const context: FrameContext = { frame, write };
      invokeMiddlewares(context, [...middlewares]);
    }
  }

  function close() {
    conn.close();
    open = false;
  }

  return {
    start,
    close,
    use,
    write,
    receive,
    send
  };
}
