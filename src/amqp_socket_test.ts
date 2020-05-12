import { AmqpSocket } from "./amqp_socket.ts";
import {
  test,
  assertEquals,
  arrayOf,
  assertThrowsAsync,
} from "./testing.ts";
import { mock } from "./mock.ts";
import { FrameError } from "./frame_error.ts";
import { createResolvable } from "./resolvable.ts";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function createConn() {
  return mock.obj<Deno.Reader & Deno.Writer & Deno.Closer>({
    read: mock.fn(),
    write: mock.fn(async () => {}),
    close: mock.fn(() => {}),
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
  const conn = createConn();
  const socket = new AmqpSocket(conn);
  await socket.write(
    {
      type: "method",
      channel: 0,
      payload: { classId: 10, methodId: 10, args: { serverProperties: {} } },
    },
  );

  assertEquals(
    conn.write.mock.calls[0][0],
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

test("write - content frame", async () => {
  const conn = createConn();
  const socket = new AmqpSocket(conn);
  await socket.write(
    {
      type: "content",
      channel: 1,
      payload: new Uint8Array([1, 2, 3]),
    },
  );

  assertEquals(
    conn.write.mock.calls[0][0],
    arrayOf(
      ...[3],
      ...[0, 1],
      ...[0, 0, 0, 3],
      ...[1, 2, 3],
      ...[206],
    ),
  );
});

test("write - content frame - too big", async () => {
  const conn = createConn();
  const socket = new AmqpSocket(conn);
  socket.tune({
    frameMax: 8 + 2, // prefix(7) + payload(2) + end(1)
  });

  await socket.write(
    {
      type: "content",
      channel: 1,
      payload: new Uint8Array([1, 2, 3]),
    },
  );

  assertEquals(
    conn.write.mock.calls[0][0],
    arrayOf(
      ...[3],
      ...[0, 1],
      ...[0, 0, 0, 2],
      ...[1, 2],
      ...[206],
    ),
  );

  assertEquals(
    conn.write.mock.calls[1][0],
    arrayOf(
      ...[3],
      ...[0, 1],
      ...[0, 0, 0, 1],
      ...[3],
      ...[206],
    ),
  );
});

function wrap(type: number, channel: number, payload: Uint8Array) {
  return arrayOf(
    ...[type],
    ...[0, channel],
    ...[0, 0, 0, payload.length],
    ...payload,
    206,
  );
}

test("read - method frame", async () => {
  const conn = createConn();
  const socket = new AmqpSocket(conn);

  const payload = arrayOf(
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
  );

  const data = wrap(1, 0, payload);

  conn.read.mock.setImplementation(createMockReader(data));

  const frame = await socket.read();
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
  const socket = new AmqpSocket(conn);

  const data = arrayOf(
    ...[8],
    ...[0, 0],
    ...[0, 0, 0, 0],
    ...[206],
  );
  conn.read.mock.setImplementation(createMockReader(data));

  const frame = await socket.read();
  assertEquals(frame, {
    type: "heartbeat",
    channel: 0,
    payload: arrayOf(),
  });
});

test("read - throws on unknown frame type", async () => {
  const conn = createConn();
  const socket = new AmqpSocket(conn);

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
      await socket.read();
    },
    FrameError,
    "BAD_FRAME",
  );
});

test("read - throws on bad frame end", async () => {
  const conn = createConn();
  const socket = new AmqpSocket(conn);

  const data = arrayOf(
    ...[8],
    ...[0, 0],
    ...[0, 0, 0, 0],
    ...[207], // BAD frame-end
  );

  conn.read.mock.setImplementation(createMockReader(data));

  await assertThrowsAsync(
    async () => {
      await socket.read();
    },
    FrameError,
    "BAD_FRAME",
  );
});

test("read - throws on EOF", async () => {
  const conn = createConn();
  const socket = new AmqpSocket(conn);

  conn.read.mock.setImplementation(createEofReader());

  await assertThrowsAsync(
    async () => {
      await socket.read();
    },
    FrameError,
    "EOF",
  );
});

test("read - throws on broken reader", async () => {
  const conn = createConn();
  const socket = new AmqpSocket(conn);

  conn.read.mock.setImplementation(() => {
    throw new Error("Damn");
  });

  await assertThrowsAsync(
    async () => {
      await socket.read();
    },
    Error,
    "Damn",
  );
});

test("heartbeat - sends heartbeat on interval", async () => {
  const conn = createConn();
  const socket = new AmqpSocket(conn);

  socket.tune({ sendTimeout: 10 });

  await sleep(11);
  assertEquals(conn.write.mock.calls.length, 1);

  await sleep(11);
  assertEquals(conn.write.mock.calls.length, 2);

  socket.tune({ sendTimeout: 0 });
});

test("heartbeat - times out read after double", async () => {
  const conn = createConn();
  const socket = new AmqpSocket(conn);

  const resolvable = createResolvable<number | null>();
  conn.read.mock.setImplementation(
    async (...args: any): Promise<number | null> => {
      return await resolvable;
    },
  );

  socket.tune({ readTimeout: 10, frameMax: 0 });

  await assertThrowsAsync(
    async () => {
      await socket.read();
    },
    Error,
    "server heartbeat timeout 10ms",
  );
});

test("heartbeat - does not crash if reading throws _after_ timeout", async () => {
  const conn = createConn();
  const socket = new AmqpSocket(conn);

  const resolvable = createResolvable<number | null>();
  conn.read.mock.setImplementation(
    async (...args: any): Promise<number | null> => {
      return await resolvable;
    },
  );

  socket.tune({ readTimeout: 10, frameMax: 0 });

  await assertThrowsAsync(
    async () => {
      await socket.read();
    },
    Error,
    "server heartbeat timeout 10ms",
  );

  resolvable.reject(new Error("Damn"));
});

test("heartbeat - does not crash if reading throws _before_ timeout", async () => {
  const conn = createConn();
  const socket = new AmqpSocket(conn);

  const resolvable = createResolvable<number | null>();
  conn.read.mock.setImplementation(
    async (...args: any): Promise<number | null> => {
      throw new Error("Damn");
    },
  );

  socket.tune({ readTimeout: 0.01, frameMax: 0 });

  resolvable.reject(new Error("Damn"));

  await assertThrowsAsync(
    async () => {
      await socket.read();
    },
    Error,
    "Damn",
  );
});
