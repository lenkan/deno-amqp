import { createFraming } from "./amqp_framing.ts";
import {
  test,
  assertEquals,
  createMock,
  arrayOf,
  assertThrowsAsync
} from "../testing.ts";

function createConn() {
  return {
    read: createMock(),
    write: createMock(() => {}),
  };
}

function createMiddleware(conn: Deno.Reader & Deno.Writer) {
  return createFraming(conn);
}

function createMockReader(data: Uint8Array) {
  let offset: number = 0;

  return function mockRead(p: Uint8Array) {
    const slice = data.slice(offset, p.length + offset);
    offset += slice.length;
    p.set(slice, 0);
    return slice.length;
  };
}

test("write method frame", async () => {
  const conn = createConn();
  const middleware = createMiddleware(conn);

  conn.write.mockReset();

  middleware.write(
    {
      type: 1,
      channel: 0,
      payload: arrayOf(0, 10, 0, 11, 123),
    },
  );

  assertEquals(conn.write.mockCalls.length, 1);
  assertEquals(conn.write.mockCalls[0][0], arrayOf(
    ...[1],
    ...[0, 0],
    ...[0, 0, 0, 5],
    ...[0, 10],
    ...[0, 11],
    ...[123],
    ...[206],
  ));
});

test("read method frame", async () => {
  const conn = createConn();
  const middleware = createMiddleware(conn);

  const data = arrayOf(
    ...[1],
    ...[0, 0],
    ...[0, 0, 0, 5],
    ...[0, 10],
    ...[0, 11],
    ...[123],
    ...[206],
  );
  conn.read.mockImplementation(createMockReader(data));

  const frame = await middleware.read();
  assertEquals(frame, {
    type: 1,
    channel: 0,
    payload: arrayOf(0, 10, 0, 11, 123),
  });
});

test("read heartbeat frame", async () => {
  const conn = createConn();
  const middleware = createMiddleware(conn);

  const data = arrayOf(
    ...[8],
    ...[0, 0],
    ...[0, 0, 0, 0],
    ...[206],
  );
  conn.read.mockImplementation(createMockReader(data));

  const frame = await middleware.read();
  assertEquals(frame, {
    type: 8,
    channel: 0,
    payload: arrayOf(),
  });
});

test("throws on unknown frame type", async () => {
  const conn = createConn();
  const middleware = createMiddleware(conn);

  const data = arrayOf(
    ...[4],
    ...[0, 0],
    ...[0, 0, 0, 5],
    ...[0, 10],
    ...[0, 11],
    ...[123],
    ...[206],
  );

  conn.read.mockImplementation(createMockReader(data));

  await assertThrowsAsync(async () => {
    await middleware.read();
  });
});
