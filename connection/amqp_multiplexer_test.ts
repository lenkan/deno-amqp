import {
  test,
  assertEquals,
  createMock,
  arrayOf,
  assertThrowsAsync,
  assertStrContains,
} from "../testing.ts";
import { createAmqpMux } from "./amqp_multiplexer.ts";
import { IncomingFrame } from "./amqp_socket.ts";
import { ConnectionStart } from "../amqp_types.ts";
import {
  BASIC,
  QUEUE,
  QUEUE_DECLARE_OK,
  CHANNEL,
  CHANNEL_CLOSE,
  SOFT_ERROR_ACCESS_REFUSED,
  QUEUE_DECLARE,
  CONNECTION,
  CONNECTION_CLOSE,
  HARD_ERROR_INTERNAL_ERROR,
} from "../amqp_constants.ts";

function createSocket() {
  return {
    read: createMock(),
    write: createMock(() => {}),
  };
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function createMockReader(frames: IncomingFrame[]) {
  return async function mockRead() {
    await sleep(0);
    const frame = frames.shift();
    if (!frame) {
      throw new Error(`EOF`);
    }
    return frame;
  };
}

test("receive content - header and single content frame", async () => {
  const conn = createSocket();
  conn.read.mockImplementation(createMockReader([
    {
      type: "header" as const,
      channel: 1,
      payload: {
        classId: 60,
        size: 2,
        props: {},
      },
    },
    {
      type: "content",
      channel: 1,
      payload: arrayOf(1, 2),
    },
  ]));

  const mux = createAmqpMux(conn);
  const [props, data] = await mux.receiveContent(1, 60);

  assertEquals(props, {});
  assertEquals(data, arrayOf(1, 2));
});

test("receive content - header and multiple content frames", async () => {
  const conn = createSocket();
  conn.read.mockImplementation(createMockReader([
    {
      type: "header" as const,
      channel: 1,
      payload: {
        classId: 60,
        size: 2,
        props: {},
      },
    },
    {
      type: "content",
      channel: 1,
      payload: arrayOf(1),
    },
    {
      type: "content",
      channel: 1,
      payload: arrayOf(2),
    },
  ]));

  const mux = createAmqpMux(conn);
  const [props, data] = await mux.receiveContent(1, 60);

  assertEquals(props, {});
  assertEquals(data, arrayOf(1, 2));
});

test("receive content - throws error if not enough content", async () => {
  const conn = createSocket();
  conn.read.mockImplementation(createMockReader([
    {
      type: "header" as const,
      channel: 1,
      payload: {
        classId: 60,
        size: 2,
        props: {},
      },
    },
    {
      type: "content",
      channel: 1,
      payload: arrayOf(1),
    },
  ]));

  const mux = createAmqpMux(conn);

  await assertThrowsAsync(async () => {
    await mux.receiveContent(1, 60);
  }, Error, "EOF");
});

test("receive content - throws error if no header", async () => {
  const conn = createSocket();
  conn.read.mockImplementation(createMockReader([
    {
      type: "content",
      channel: 1,
      payload: arrayOf(1),
    },
  ]));

  const mux = createAmqpMux(conn);

  await assertThrowsAsync(async () => {
    await mux.receiveContent(1, 60);
  }, Error, "EOF");
});

test("receive content - can receive content on multiple channels", async () => {
  const conn = createSocket();
  conn.read.mockImplementation(createMockReader([
    {
      type: "header" as const,
      channel: 1,
      payload: {
        classId: 60,
        size: 1,
        props: {
          correlationId: "1",
        },
      },
    },
    {
      type: "header" as const,
      channel: 2,
      payload: {
        classId: 60,
        size: 2,
        props: {
          correlationId: "2",
        },
      },
    },
    {
      type: "content",
      channel: 2,
      payload: arrayOf(1),
    },
    {
      type: "content",
      channel: 1,
      payload: arrayOf(2),
    },
    {
      type: "content",
      channel: 2,
      payload: arrayOf(3),
    },
  ]));

  const mux = createAmqpMux(conn);
  const [content1, content2] = await Promise.all([
    mux.receiveContent(1, 60),
    mux.receiveContent(2, 60),
  ]);

  assertEquals(content1[0], { correlationId: "1" });
  assertEquals(content1[1], arrayOf(2));
  assertEquals(content2[0], { correlationId: "2" });
  assertEquals(content2[1], arrayOf(1, 3));
});

test("receive - throws error if EOF", async () => {
  const conn = createSocket();
  conn.read.mockImplementation(createMockReader([]));

  const mux = createAmqpMux(conn);

  await assertThrowsAsync(async () => {
    await mux.receive(1, 10, 10);
  }, Error, "EOF");
});

test("receive - resolves with frame args", async () => {
  const conn = createSocket();
  conn.read.mockImplementation(createMockReader([
    {
      type: "method",
      channel: 1,
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
    },
  ]));

  const mux = createAmqpMux(conn);

  const args = await mux.receive(1, 10, 10);
  assertEquals(args, {
    locales: "en_US",
    mechanisms: "PLAIN",
    serverProperties: {},
    versionMajor: 0,
    versionMinor: 9,
  });
});

test("receive - rejects on channel close", async () => {
  const conn = createSocket();
  conn.read.mockImplementation(createMockReader([
    {
      type: "method" as const,
      channel: 1,
      payload: {
        classId: CHANNEL,
        methodId: CHANNEL_CLOSE,
        args: {
          replyCode: SOFT_ERROR_ACCESS_REFUSED,
          replyText: "Some reason",
          classId: QUEUE,
          methodId: QUEUE_DECLARE,
        },
      },
    },
  ]));

  const mux = createAmqpMux(conn);

  await assertThrowsAsync(async () => {
    await mux.receive(1, QUEUE, QUEUE_DECLARE_OK);
  }, Error, "Channel 1 closed by server - 403 Some reason");
});

test("receive - rejects on connection close", async () => {
  const conn = createSocket();
  conn.read.mockImplementation(createMockReader([
    {
      type: "method" as const,
      channel: 0,
      payload: {
        classId: CONNECTION,
        methodId: CONNECTION_CLOSE,
        args: {
          replyCode: HARD_ERROR_INTERNAL_ERROR,
          replyText: "Some reason",
          classId: 0,
          methodId: 0,
        },
      },
    },
  ]));

  const mux = createAmqpMux(conn);

  await assertThrowsAsync(async () => {
    await mux.receive(1, QUEUE, QUEUE_DECLARE_OK);
  }, Error, "Connection closed by server - 541 Some reason");
});

test("subscribe - invokes handler with frame args", async () => {
  const conn = createSocket();
  const frame: IncomingFrame = {
    type: "method",
    channel: 1,
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
  };

  conn.read.mockImplementation(createMockReader([frame, frame]));
  const mux = createAmqpMux(conn);

  const result = await new Promise<ConnectionStart[]>((resolve) => {
    const data: ConnectionStart[] = [];
    const cancel = mux.subscribe(1, 10, 10, (args) => {
      data.push(args);
      if (data.length === 2) {
        cancel();
        resolve(data);
      }
    });
  });

  assertEquals(result.length, 2);
  assertEquals(result[0], frame.payload.args);
  assertEquals(result[1], frame.payload.args);
});
