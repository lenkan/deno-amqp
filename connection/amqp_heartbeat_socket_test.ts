import {
  test,
  assertEquals,
  createMock,
  arrayOf,
  assertThrowsAsync,
  assertStrContains
} from "../testing.ts";
import {
  createHeartbeatSocket
} from "./amqp_heartbeat_socket.ts";
import { AmqpSocket, IncomingFrame } from "./amqp_socket.ts";

function createConn() {
  return {
    read: createMock(),
    write: createMock(() => {}),
  };
}

function createSocket(conn: AmqpSocket) {
  return createHeartbeatSocket(conn);
}

function createMockReader(frames: IncomingFrame[]) {
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
    socket: AmqpSocket,
  ) => Promise<void>,
): () => Promise<void> {
  return () => {
    const conn = createConn();
    const socket = createSocket(conn);
    return handler(conn, socket).finally(() =>
      socket.write(
        {
          type: "method",
          channel: 0,
          payload: {
            classId: 10,
            methodId: 50,
            args: { classId: 0, methodId: 0, replyCode: 503 },
          },
        },
      )
    );
  };
}

test("does not return heartbeat frames", withHeartbeat(async (conn, socket) => {
  conn.read.mockImplementation(createMockReader([
    {
      type: "heartbeat" as const,
      channel: 0,
      payload: arrayOf(),
    },
    {
      type: "content",
      channel: 0,
      payload: arrayOf(),
    },
  ]));

  const frame = await socket.read();
  assertEquals(frame, {
    type: "content",
    channel: 0,
    payload: arrayOf(),
  });
}));

test(
  "throws error if reading times out",
  withHeartbeat(async (conn, socket) => {
    const sleeper = sleep(300);

    // tune-ok
    socket.write(
      {
        type: "method",
        channel: 0,
        payload: { classId: 10, methodId: 31, args: { heartbeat: 0.1 } },
      },
    );

    // open
    socket.write(
      {
        type: "method",
        channel: 0,
        payload: { classId: 10, methodId: 40, args: {} },
      },
    );

    conn.read.mockImplementation(async () => {
      await sleeper;
      const frame = { type: "content", channel: 0, payload: arrayOf() };
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
  // tune-ok
  await socket.write(
    {
      type: "method",
      channel: 0,
      payload: { classId: 10, methodId: 31, args: { heartbeat: 0.1 } },
    },
  );
  conn.write.mockReset();

  await sleep(100);
  assertEquals(conn.write.mockCalls.length, 1);
  assertEquals(conn.write.mockCalls[0][0], {
    type: "heartbeat",
    channel: 0,
    payload: arrayOf(),
  });

  await sleep(200);
  assertEquals(conn.write.mockCalls.length, 2);
  assertEquals(conn.write.mockCalls[1][0], {
    type: "heartbeat",
    channel: 0,
    payload: arrayOf(),
  });
}));
