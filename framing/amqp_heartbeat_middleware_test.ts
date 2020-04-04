import {
  test,
  assertEquals,
  createMock,
  arrayOf,
  assertThrowsAsync,
  assertStrContains
} from "../testing.ts";
import { Frame, AmqpReaderWriter } from "./types.ts";
import { AmqpHeartbeatMiddleware } from "./amqp_heartbeat_middleware.ts";
function createConn() {
  return {
    read: createMock(),
    write: createMock(() => {}),
  };
}

function createSocket(conn: AmqpReaderWriter) {
  return new AmqpHeartbeatMiddleware(conn);
}

function createMockReader(frames: Frame[]) {
  return function mockRead() {
    const frame = frames.shift();
    if (!frame) {
      throw new Error(`EOF`);
    }
    return frame;
  };
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function withHeartbeat(
  handler: (
    conn: ReturnType<typeof createConn>,
    socket: AmqpHeartbeatMiddleware,
  ) => Promise<void>,
): () => Promise<void> {
  return () => {
    const conn = createConn();
    const socket = createSocket(conn);
    return handler(conn, socket).finally(() => socket.setHeartbeatInterval(0));
  };
}

test("does not return heartbeat frames", withHeartbeat(async (conn, socket) => {
  conn.read.mockImplementation(createMockReader([
    {
      type: 8,
      channel: 0,
      payload: arrayOf(),
    },
    {
      type: 3,
      channel: 0,
      payload: arrayOf(),
    },
  ]));

  const frame = await socket.read();
  assertEquals(frame, {
    type: 3,
    channel: 0,
    payload: arrayOf(),
  });
}));

test(
  "throws error if reading times out",
  withHeartbeat(async (conn, socket) => {
    const sleeper = sleep(300);
    socket.setHeartbeatInterval(0.1);

    conn.read.mockImplementation(async () => {
      await sleeper;
      const frame = { type: 3, channel: 0, payload: arrayOf() };
      return frame;
    });

    const error = await assertThrowsAsync(async () => {
      await socket.read();
    });

    assertStrContains(error.message, "timeout");

    await sleeper;
  }),
);

test("sends heartbeat on interval", withHeartbeat(async (conn, socket) => {
  socket.setHeartbeatInterval(0.1);

  await sleep(100);
  assertEquals(conn.write.mockCalls.length, 1);
  assertEquals(conn.write.mockCalls[0][0], {
    type: 8,
    channel: 0,
    payload: arrayOf(),
  });

  await sleep(200);
  assertEquals(conn.write.mockCalls.length, 2);
  assertEquals(conn.write.mockCalls[1][0], {
    type: 8,
    channel: 0,
    payload: arrayOf(),
  });
}));
