import {
  assertEquals,
  assertThrowsAsync
} from "https://deno.land/std/testing/asserts.ts";
import { connect } from "./connection_manager.ts";
import { AmqpSocket, Frame } from "../framing/socket.ts";
import {
  CONNECTION,
  CONNECTION_START_OK,
  methods,
  CONNECTION_OPEN,
  CONNECTION_CLOSE
} from "../framing/methods.ts";

interface MockSocket {
  received: Frame[];
  frames: Frame[];
  closed: boolean;
  mockFrameOnce(frame: Frame): void;
}

function createMockSocket(handler: (frame: Frame) => void): AmqpSocket
  & MockSocket
{
  const received: Frame[] = [];
  const frames: Frame[] = [];
  let closed = false;

  async function write(frame: Frame) {
    handler(frame);
    received.push(frame);
  }

  return {
    start() {
      return Promise.resolve();
    },
    close() {
      frames.splice(0, frames.length - 1);
      closed = true;
    },
    async read(): Promise<Frame | null> {
      const frame = frames.shift();
      if (!frame) {
        return null;
      }

      return Promise.resolve(frame);
    },
    write,
    received,
    mockFrameOnce(frame: Frame) {
      frames.push(frame);
    },
    get closed() {
      return closed;
    },
    frames
  };
}

const { test } = Deno;

test("successful connection", async () => {
  const socket = createMockSocket(incoming => {
    if (incoming.type === "method") {
      switch (incoming.method.classId) {
        case CONNECTION:
          switch (incoming.method.methodId) {
            case CONNECTION_START_OK: {
              socket.mockFrameOnce(
                {
                  type: "method",
                  channel: 0,
                  method: methods.connection.tune({})
                }
              );
              break;
            }
            case CONNECTION_OPEN: {
              socket.mockFrameOnce(
                {
                  type: "method",
                  channel: 0,
                  method: methods.connection.openOk({})
                }
              );
              break;
            }
            case CONNECTION_CLOSE: {
              socket.mockFrameOnce({
                type: "method",
                channel: 0,
                method: methods.connection.closeOk({})
              });
            }
          }
      }
    }
  });

  socket.mockFrameOnce({
    type: "method",
    channel: 0,
    method: methods.connection.start({
      serverProperties: {}
    })
  });

  const connection = await connect(socket, { password: "", username: "" });
  await connection.close();

  assertEquals(socket.closed, true);
});

test("throws when socket is not sending start method", async () => {
  const socket = createMockSocket(incoming => {});

  assertThrowsAsync(async () => {
    await connect(socket, { password: "", username: "" });
  });
});

test("throws when socket is not sending tune method", async () => {
  const socket = createMockSocket(_incoming => {});

  socket.mockFrameOnce({
    type: "method",
    channel: 0,
    method: methods.connection.start({
      serverProperties: {}
    })
  });

  assertThrowsAsync(async () => {
    await connect(socket, { password: "", username: "" });
  });
});
