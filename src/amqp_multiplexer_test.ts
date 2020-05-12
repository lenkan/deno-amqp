import {
  test,
  assertEquals,
  arrayOf,
  assertThrowsAsync,
} from "./testing.ts";
import { createAmqpMux } from "./amqp_multiplexer.ts";
import { IncomingFrame, HeaderFrame, ContentFrame } from "./amqp_socket.ts";
import {
  ConnectionStart,
  ChannelCloseArgs,
  ConnectionCloseArgs,
  BasicProperties,
} from "./amqp_types.ts";
import {
  QUEUE,
  QUEUE_DECLARE_OK,
  CHANNEL,
  CHANNEL_CLOSE,
  SOFT_ERROR_ACCESS_REFUSED,
  QUEUE_DECLARE,
  CONNECTION,
  CONNECTION_CLOSE,
  HARD_ERROR_INTERNAL_ERROR,
} from "./amqp_constants.ts";
import { mock } from "./mock.ts";

function createSocket() {
  return {
    read: mock.fn(),
    write: mock.fn(() => {}),
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

function connectionClose(
  channel: number,
  args: ConnectionCloseArgs,
): IncomingFrame {
  return {
    type: "method" as const,
    channel,
    payload: {
      classId: CONNECTION,
      methodId: CONNECTION_CLOSE,
      args: {
        replyCode: args.replyCode,
        replyText: args.replyText || "",
        classId: args.classId || 0,
        methodId: args.methodId || 0,
      },
    },
  };
}

function channelClose(
  channel: number,
  args: ChannelCloseArgs,
): IncomingFrame {
  return {
    type: "method" as const,
    channel,
    payload: {
      classId: CHANNEL,
      methodId: CHANNEL_CLOSE,
      args: {
        replyCode: args.replyCode,
        replyText: args.replyText || "",
        classId: args.classId || 0,
        methodId: args.methodId || 0,
      },
    },
  };
}

function basicHeader(
  channel: number,
  size: number,
  props: BasicProperties,
): HeaderFrame {
  return {
    type: "header" as const,
    channel,
    payload: {
      classId: 60,
      size,
      props: props,
    },
  };
}

function contentFrame(channel: number, data: number[]): ContentFrame {
  return {
    type: "content",
    channel,
    payload: arrayOf(...data),
  };
}

test("receive content - header and single content frame", async () => {
  const conn = createSocket();
  conn.read.mock.setImplementation(createMockReader([
    basicHeader(1, 2, {}),
    contentFrame(1, [1, 2]),
  ]));

  const mux = createAmqpMux(conn);
  const [props, data] = await mux.receiveContent(1, 60);

  assertEquals(props, {});
  assertEquals(data, arrayOf(1, 2));
});

test("receive content - header and no content frame", async () => {
  const conn = createSocket();
  conn.read.mock.setImplementation(createMockReader([
    basicHeader(1, 0, {}),
  ]));

  const mux = createAmqpMux(conn);
  const [props, data] = await mux.receiveContent(1, 60);

  assertEquals(props, {});
  assertEquals(data, arrayOf());
});

test("receive content - header and multiple content frames", async () => {
  const conn = createSocket();
  conn.read.mock.setImplementation(createMockReader([
    basicHeader(1, 2, {}),
    contentFrame(1, [1]),
    contentFrame(1, [2]),
  ]));

  const mux = createAmqpMux(conn);
  const [props, data] = await mux.receiveContent(1, 60);

  assertEquals(props, {});
  assertEquals(data, arrayOf(1, 2));
});

test("receive content - throws error if not enough content", async () => {
  const conn = createSocket();
  conn.read.mock.setImplementation(createMockReader([
    basicHeader(1, 2, {}),
    contentFrame(1, [1]),
  ]));

  const mux = createAmqpMux(conn);

  await assertThrowsAsync(
    async () => {
      await mux.receiveContent(1, 60);
    },
    Error,
    "EOF",
  );
});

test("receive content - throws error if no header", async () => {
  const conn = createSocket();
  conn.read.mock.setImplementation(createMockReader([
    contentFrame(1, [1]),
  ]));

  const mux = createAmqpMux(conn);

  await assertThrowsAsync(
    async () => {
      await mux.receiveContent(1, 60);
    },
    Error,
    "EOF",
  );
});

test("receive content - can receive content on multiple channels", async () => {
  const conn = createSocket();
  conn.read.mock.setImplementation(createMockReader([
    basicHeader(1, 1, { correlationId: "1" }),
    basicHeader(2, 2, { correlationId: "2" }),
    contentFrame(2, [1]),
    contentFrame(1, [2]),
    contentFrame(2, [3]),
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

test("send content - does not send content frame when there is no content", async () => {
  const conn = createSocket();
  const mux = createAmqpMux(conn);

  await mux.sendContent(1, 60, {}, new Uint8Array(0));

  assertEquals(conn.write.mock.calls.length, 1);
  assertEquals(conn.write.mock.calls[0][0], {
    type: "header",
    channel: 1,
    payload: {
      classId: 60,
      props: {},
      size: 0,
    },
  });
});

test("send content - sends header and content frame", async () => {
  const conn = createSocket();
  const mux = createAmqpMux(conn);

  await mux.sendContent(1, 60, {}, new Uint8Array([1, 2]));

  assertEquals(conn.write.mock.calls.length, 2);
  assertEquals(conn.write.mock.calls[0][0], {
    type: "header",
    channel: 1,
    payload: {
      classId: 60,
      props: {},
      size: 2,
    },
  });
  assertEquals(conn.write.mock.calls[1][0], {
    type: "content",
    channel: 1,
    payload: new Uint8Array([1, 2]),
  });
});

test("receive - throws error if EOF", async () => {
  const conn = createSocket();
  conn.read.mock.setImplementation(createMockReader([]));

  const mux = createAmqpMux(conn);

  await assertThrowsAsync(
    async () => {
      await mux.receive(1, 10, 10);
    },
    Error,
    "EOF",
  );
});

test("receive - resolves with frame args", async () => {
  const conn = createSocket();
  conn.read.mock.setImplementation(createMockReader([
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
  conn.read.mock.setImplementation(createMockReader([
    channelClose(1, {
      replyCode: SOFT_ERROR_ACCESS_REFUSED,
      replyText: "Some reason",
      classId: QUEUE,
      methodId: QUEUE_DECLARE,
    }),
  ]));

  const mux = createAmqpMux(conn);

  await assertThrowsAsync(
    async () => {
      await mux.receive(1, QUEUE, QUEUE_DECLARE_OK);
    },
    Error,
    "Channel 1 closed by server - 403 Some reason - caused by 'queue.declare'",
  );
});

test("receive - rejects on connection close", async () => {
  const conn = createSocket();
  conn.read.mock.setImplementation(createMockReader([
    connectionClose(0, {
      replyCode: HARD_ERROR_INTERNAL_ERROR,
      replyText: "Some reason",
      classId: 0,
      methodId: 0,
    }),
  ]));

  const mux = createAmqpMux(conn);

  await assertThrowsAsync(
    async () => {
      await mux.receive(1, QUEUE, QUEUE_DECLARE_OK);
    },
    Error,
    "Connection closed by server - 541 Some reason",
  );
});

test("receive - rejects on connection close with caused by method", async () => {
  const conn = createSocket();
  conn.read.mock.setImplementation(createMockReader([
    connectionClose(0, {
      replyCode: HARD_ERROR_INTERNAL_ERROR,
      replyText: "Some reason",
      classId: 60,
      methodId: 40,
    }),
  ]));

  const mux = createAmqpMux(conn);

  await assertThrowsAsync(
    async () => {
      await mux.receive(1, QUEUE, QUEUE_DECLARE_OK);
    },
    Error,
    "Connection closed by server - 541 Some reason - caused by 'basic.publish'",
  );
});

test("receive - stops reading on error", async () => {
  const conn = createSocket();
  conn.read.mock.setImplementation(async () => {
    throw new Error("Damn");
  });

  createAmqpMux(conn);
  await sleep(0);
  await sleep(0);
  assertEquals(conn.read.mock.calls.length, 1);
});

test("receive - reads until error", async () => {
  const conn = createSocket();
  conn.read.mock.setImplementation(createMockReader([
    basicHeader(1, 1, {}),
    contentFrame(1, [1]),
  ]));

  createAmqpMux(conn);
  await sleep(0);
  await sleep(0);
  await sleep(0);
  await sleep(0);
  assertEquals(conn.read.mock.calls.length, 3);
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

  conn.read.mock.setImplementation(createMockReader([frame, frame]));
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
