import {
  encodeFrame,
  readFrame,
  Frame as RawFrame
} from "../encoding/mod.ts";
import { withTimeout } from "./with_timeout.ts";

export interface FrameHandler {
  (
    error: Error | null,
    channel: number,
    type: number,
    payload: Uint8Array
  ): void;
}

export interface FrameSubscriber {
  handler: FrameHandler;
}

export interface AmqpListener {
  subscribe(
    handler: FrameHandler
  ): () => void;
}

export interface AmqpWriter {
  write(channel: number, type: number, payload: Uint8Array): Promise<void>;
}

export interface AmqpReaderWriter extends AmqpListener, AmqpWriter {}

export interface AmqpSocket extends AmqpReaderWriter {
  start(): Promise<void>;
  tuneHeartbeat(interval: number): void;
  close(): void;
}

export interface SocketOptions {
  loglevel: "debug" | "none";
}

export function createSocket(
  conn: Deno.ReadWriteCloser,
  options: SocketOptions = { loglevel: "none" }
): AmqpSocket {
  const subscribers: FrameSubscriber[] = [];
  let running = false;
  let sendTimer: number | null;
  let heartbeatTimeout: number = 0;

  function cancel(subscriber: FrameSubscriber) {
    const index = subscribers.indexOf(subscriber);
    if (index !== -1) {
      subscribers.splice(index, index + 1);
    }
  }

  function subscribe(
    handler: FrameHandler
  ) {
    const subscriber = { handler };
    subscribers.push(subscriber);
    return () => cancel(subscriber);
  }

  async function start() {
    await conn.write(new TextEncoder().encode("AMQP"));
    await conn.write(new Uint8Array([0, 0, 9, 1]));

    listen().catch(error => {
      subscribers.forEach(sub => sub.handler(error, 0, 0, new Uint8Array([])));
      close(error.message);
    });
  }

  function close(reason?: string) {
    console.log("Closing connection: " + reason || "");
    conn.close();
    subscribers.splice(0, subscribers.length);
    running = false;
  }

  function resetSendTimer() {
    if (sendTimer !== null) {
      clearTimeout(sendTimer);
    }

    if (heartbeatTimeout > 0) {
      setTimeout(() => {
        conn.write(
          encodeFrame(
            { type: 8, channel: 0, payload: new Uint8Array([]) }
          )
        );
      }, heartbeatTimeout * 1000);
    }
  }

  function logSend(channel: number, type: number, payload: Uint8Array) {
    // TODO(lenkan): Move to other module
    if (options.loglevel === "debug") {
      const prefix = `SEND(${channel}) ${type} ${payload.slice(0, 8)}`;
      console.log(prefix);
    }
  }

  function logRecv(channel: number, type: number, payload: Uint8Array) {
    // TODO(lenkan): Move to other module
    if (options.loglevel === "debug") {
      const prefix = `RECV(${channel}) ${type} ${payload.slice(0, 8)}`;
      console.log(prefix);
    }
  }

  async function write(channel: number, type: number, payload: Uint8Array) {
    resetSendTimer();
    logSend(channel, type, payload);

    await conn.write(encodeFrame({
      type,
      channel,
      payload
    }));
  }

  function emit(f: RawFrame) {
    logRecv(f.channel, f.type, f.payload);
    subscribers.forEach(sub => {
      sub.handler(null, f.channel, f.type, f.payload);
    });
  }

  async function nextFrame(): Promise<RawFrame> {
    const timeoutMessage =
      `missed heartbeat from server, timeout ${heartbeatTimeout}s`;

    return withTimeout(async () => {
      const frame = await readFrame(conn);

      if (!frame) {
        throw new Error("Connection closed by server");
      }

      return frame;
    }, heartbeatTimeout * 1000 * 2, timeoutMessage);
  }

  async function listen(): Promise<void> {
    running = true;
    while (running) {
      const frame = await nextFrame();
      if (frame.type !== 8) {
        emit(frame);
      }
    }
  }

  function tuneHeartbeat(interval: number) {
    heartbeatTimeout = interval;
    resetSendTimer();
  }

  return {
    start,
    close,
    subscribe,
    write,
    tuneHeartbeat
  };
}
