import { createAmqpSocket } from "./amqp_socket.ts";
import {
  test,
  assertEquals,
  createMock,
  arrayOf
} from "../testing.ts";
import { AmqpFraming, Frame } from "../framing/mod.ts";

function createSocket() {
  return {
    read: createMock(),
    write: createMock(() => {}),
  };
}

function createMiddleware(sock: AmqpFraming) {
  return createAmqpSocket(sock);
}

function createMockReader(frames: Frame[]) {
  return function mockRead() {
    const frame = frames.shift();
    if (frame) {
      return frame;
    }

    return null;
  };
}

test("write method frame", async () => {
  const conn = createSocket();
  const middleware = createMiddleware(conn);

  conn.write.mockReset();

  middleware.write(
    {
      type: "method",
      channel: 0,
      payload: { classId: 10, methodId: 10, args: { serverProperties: {} } },
    },
  );

  assertEquals(conn.write.mockCalls.length, 1);
  assertEquals(conn.write.mockCalls[0][0], {
    type: 1,
    channel: 0,
    payload: arrayOf(
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
    ),
  });
});

test("read method frame", async () => {
  const conn = createSocket();
  const middleware = createMiddleware(conn);

  const data: Frame = {
    type: 1,
    channel: 0,
    payload: arrayOf(
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
    ),
  };

  conn.read.mockImplementation(createMockReader([data]));

  const frame = await middleware.read();
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
