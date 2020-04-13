import {
  test,
  assertEquals,
  arrayOf,
  assertThrowsAsync,
  assertStrContains,
} from "../testing.ts";
import { mock } from "../mock.ts";
import {
  createHeartbeatSocket,
} from "./amqp_heartbeat_socket.ts";
import {
  AmqpSocket,
  IncomingFrame,
  AmqpSocketReader,
  AmqpSocketCloser,
  AmqpSocketWriter,
} from "./amqp_socket.ts";
import { CONNECTION, CONNECTION_CLOSE_OK } from "../amqp_constants.ts";

function createConn() {
  return {
    read: mock.fn(),
    write: mock.fn(() => {}),
    close: mock.fn(() => {}),
  };
}

function createSocket(conn: AmqpSocket): AmqpSocketReader & AmqpSocketWriter {
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
    socket: AmqpSocketReader & AmqpSocketWriter,
  ) => Promise<void>,
): () => Promise<void> {
  return () => {
    const conn = createConn();
    const socket = createSocket(conn);
    return handler(conn, socket).finally(async () => {
      await socket.write(
        {
          type: "method",
          channel: 0,
          payload: {
            classId: CONNECTION,
            methodId: CONNECTION_CLOSE_OK,
            args: { classId: 0, methodId: 0, replyCode: 503 },
          },
        },
      );
    });
  };
}

test("does not return heartbeat frames", withHeartbeat(async (conn, socket) => {
  conn.read.mock.setImplementation(createMockReader([
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

    conn.read.mock.setImplementation(async () => {
      await sleeper;
      const frame = { type: "content", channel: 0, payload: arrayOf() };
      return frame;
    });

    const error = await assertThrowsAsync(async () => {
      await socket.read();
    });

    assertStrContains(error.message, "timeout");
    assertEquals(conn.close.mock.calls.length, 1);

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
  conn.write.mock.reset();

  await sleep(100);
  assertEquals(conn.write.mock.calls.length, 1);
  assertEquals(conn.write.mock.calls[0][0], {
    type: "heartbeat",
    channel: 0,
    payload: arrayOf(),
  });

  await sleep(200);
  assertEquals(conn.write.mock.calls.length, 2);
  assertEquals(conn.write.mock.calls[1][0], {
    type: "heartbeat",
    channel: 0,
    payload: arrayOf(),
  });
}));
