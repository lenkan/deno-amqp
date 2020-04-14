import {
  test,
  assertEquals,
  arrayOf,
  assertThrowsAsync,
} from "../testing.ts";
import { mock } from "../mock.ts";
import {
  createHeartbeatSocket,
} from "./amqp_heartbeat_socket.ts";
import {
  AmqpSocket,
  IncomingFrame,
  AmqpSocketReader,
  AmqpSocketWriter,
} from "../framing/mod.ts";
import { CONNECTION, CONNECTION_CLOSE_OK } from "../amqp_constants.ts";
import { ConnectionTuneOkArgs, ConnectionOpenArgs } from "../amqp_types.ts";

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

function tuneOk(args: ConnectionTuneOkArgs) {
  return {
    type: "method" as const,
    channel: 0,
    payload: { classId: 10 as const, methodId: 31 as const, args },
  };
}

function open(args: ConnectionOpenArgs) {
  return {
    type: "method" as const,
    channel: 0,
    payload: { classId: 10 as const, methodId: 40 as const, args },
  };
}

function heartbeat() {
  return {
    type: "heartbeat" as const,
    channel: 0,
    payload: arrayOf(),
  };
}
function content(data: Uint8Array = new Uint8Array(0)) {
  return {
    type: "content" as const,
    channel: 0,
    payload: data,
  };
}

test("does not return heartbeat frames", withHeartbeat(async (conn, socket) => {
  conn.read.mock.setImplementation(createMockReader([
    heartbeat(),
    content(),
  ]));

  const frame = await socket.read();
  assertEquals(frame, content());
}));

test(
  "throws error if reading times out",
  withHeartbeat(async (conn, socket) => {
    const sleeper = sleep(300);

    socket.write(tuneOk({ channelMax: 0, heartbeat: 0.1 }));
    socket.write(open({}));

    conn.read.mock.setImplementation(() => sleeper.then(() => content()));

    await assertThrowsAsync(async () => {
      await socket.read();
    }, Error, "missed heartbeat from server, timeout 0.1s");

    await sleeper;
  }),
);

test(
  "closes connection if reading times out",
  withHeartbeat(async (conn, socket) => {
    const sleeper = sleep(300);

    socket.write(tuneOk({ heartbeat: 0.1 }));
    socket.write(open({}));

    conn.read.mock.setImplementation(() => sleeper.then(() => content()));

    await socket.read().catch(() => {});

    assertEquals(conn.close.mock.calls.length, 1);

    await sleeper;
  }),
);

test("sends heartbeat on interval", withHeartbeat(async (conn, socket) => {
  await socket.write(tuneOk({ heartbeat: 0.1 }));
  conn.write.mock.reset();

  await sleep(100);
  assertEquals(conn.write.mock.calls.length, 1);
  assertEquals(conn.write.mock.calls[0][0], heartbeat());

  await sleep(200);
  assertEquals(conn.write.mock.calls.length, 2);
  assertEquals(conn.write.mock.calls[1][0], heartbeat());
}));
