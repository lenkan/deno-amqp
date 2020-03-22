import { createSocket } from "./socket.ts";
import { test, assertEquals, createMock, arrayOf } from "../testing.ts";
import { FRAME_HEARTBEAT } from "../amqp_constants.ts";

function createConn() {
  return {
    close: createMock(() => {}),
    read: createMock(() => {
      return Promise.resolve({ type: FRAME_HEARTBEAT, channel: 0 });
    }),
    write: createMock(() => {})
  };
}

test("sends start bytes then starts listening", async () => {
  const conn = createConn();
  const socket = createSocket(conn);

  await socket.start();

  assertEquals(conn.write.mockCalls.length, 2);
  assertEquals(conn.write.mockCalls[0][0], arrayOf(65, 77, 81, 80)); // ["A", "M", "Q", "P"]
  assertEquals(conn.write.mockCalls[1][0], arrayOf(0, 0, 9, 1));
  assertEquals(conn.read.mockCalls.length, 1);
});

test("write method frame", async () => {
  const conn = createConn();
  const socket = createSocket(conn);

  await socket.start();
  conn.write.mockReset();

  socket.write(
    0,
    {
      type: "method",
      payload: { methodId: 11, classId: 10, args: new Uint8Array([123]) }
    }
  );

  assertEquals(conn.write.mockCalls.length, 1);
  assertEquals(conn.write.mockCalls[0][0], arrayOf(
    ...[1],
    ...[0, 0],
    ...[0, 0, 0, 5],
    ...[0, 10],
    ...[0, 11],
    ...[123],
    ...[206]
  ));
});

test("write header frame", async () => {
  const conn = createConn();
  const socket = createSocket(conn);

  await socket.start();
  conn.write.mockReset();

  socket.write(
    0,
    {
      type: "header",
      payload: {
        classId: 10,
        size: 131,
        weight: 1,
        props: new Uint8Array([123])
      }
    }
  );

  assertEquals(conn.write.mockCalls.length, 1);
  assertEquals(conn.write.mockCalls[0][0], arrayOf(
    ...[2],
    ...[0, 0],
    ...[0, 0, 0, 13],
    ...[0, 10],
    ...[0, 1],
    ...[0, 0, 0, 0, 0, 0, 0, 131],
    ...[123],
    ...[206]
  ));
});

test("write content frame", async () => {
  const conn = createConn();
  const socket = createSocket(conn);

  await socket.start();
  conn.write.mockReset();

  socket.write(0, { type: "content", payload: new Uint8Array([]) });

  assertEquals(conn.write.mockCalls.length, 1);
  assertEquals(conn.write.mockCalls[0][0], arrayOf(
    ...[3],
    ...[0, 0],
    ...[0, 0, 0, 0],
    ...[206]
  ));
});
