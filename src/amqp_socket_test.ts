import { createFrameReader, write } from "./amqp_socket.ts";
import {
  test,
  assertEquals,
  arrayOf,
  assertThrowsAsync,
} from "./testing.ts";
import { mock } from "./mock.ts";
import { FrameError } from "./frame_error.ts";

function createConn() {
  return mock.obj<Deno.Reader>({
    read: mock.fn(),
  });
}

function createMockReader(data: Uint8Array) {
  let offset: number = 0;

  return async function mockRead(p: Uint8Array): Promise<number> {
    const slice = data.slice(offset, p.length + offset);
    offset += slice.length;
    p.set(slice, 0);
    return slice.length;
  };
}

function createEofReader() {
  return function mockRead(p: Uint8Array) {
    return Promise.resolve(null);
  };
}

test("write - method frame", async () => {
  const result = write(
    {
      type: "method",
      channel: 0,
      payload: { classId: 10, methodId: 10, args: { serverProperties: {} } },
    },
  );

  assertEquals(
    result,
    arrayOf(
      ...[1],
      ...[0, 0],
      ...[0, 0, 0, 28],
      ...[0, 10],
      ...[0, 10],
      ...[
        0,
        9,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        5,
        80,
        76,
        65,
        73,
        78,
        0,
        0,
        0,
        5,
        101,
        110,
        95,
        85,
        83,
      ],
      ...[206],
    ),
  );
});

test("read - method frame", async () => {
  const conn = createConn();
  const read = createFrameReader(conn);

  const payload = [
    ...[0, 10],
    ...[0, 10],
    ...[
      0,
      9,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      5,
      80,
      76,
      65,
      73,
      78,
      0,
      0,
      0,
      5,
      101,
      110,
      95,
      85,
      83,
    ],
  ];
  const data = arrayOf(
    ...[1],
    ...[0, 0],
    ...[0, 0, 0, payload.length],
    ...payload,
    206,
  );

  conn.read.mock.setImplementation(createMockReader(data));

  const frame = await read();
  assertEquals(frame, {
    type: "method",
    channel: 0,
    payload: {
      classId: 10,
      methodId: 10,
      args: {
        locales: "en_US",
        mechanisms: "PLAIN",
        serverProperties: {},
        versionMajor: 0,
        versionMinor: 9,
      },
    },
  });
});

test("read - heartbeat frame", async () => {
  const conn = createConn();
  const read = createFrameReader(conn);

  const data = arrayOf(
    ...[8],
    ...[0, 0],
    ...[0, 0, 0, 0],
    ...[206],
  );
  conn.read.mock.setImplementation(createMockReader(data));

  const frame = await read();
  assertEquals(frame, {
    type: "heartbeat",
    channel: 0,
    payload: arrayOf(),
  });
});

test("read - throws on unknown frame type", async () => {
  const conn = createConn();
  const read = createFrameReader(conn);

  const data = arrayOf(
    ...[4],
    ...[0, 0],
    ...[0, 0, 0, 5],
    ...[0, 10],
    ...[0, 11],
    ...[123],
    ...[206],
  );

  conn.read.mock.setImplementation(createMockReader(data));

  await assertThrowsAsync(
    async () => {
      await read();
    },
    FrameError,
    "BAD_FRAME",
  );
});

test("read - throws on bad frame end", async () => {
  const conn = createConn();
  const read = createFrameReader(conn);

  const data = arrayOf(
    ...[8],
    ...[0, 0],
    ...[0, 0, 0, 0],
    ...[207], // BAD frame-end
  );

  conn.read.mock.setImplementation(createMockReader(data));

  await assertThrowsAsync(
    async () => {
      await read();
    },
    FrameError,
    "BAD_FRAME",
  );
});

test("read - throws on EOF", async () => {
  const conn = createConn();

  const read = createFrameReader(conn);

  conn.read.mock.setImplementation(createEofReader());

  await assertThrowsAsync(
    async () => {
      await read();
    },
    FrameError,
    "EOF",
  );
});

test("read - throws on broken reader", async () => {
  const conn = createConn();

  const read = createFrameReader(conn);

  conn.read.mock.setImplementation(() => {
    throw new Error("Damn");
  });

  await assertThrowsAsync(
    async () => {
      await read();
    },
    Error,
    "Damn",
  );
});
