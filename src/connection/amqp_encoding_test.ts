import { createAmqpDecoder, createAmqpEncoder } from "./amqp_encoding.ts";
import {
  test,
  assertEquals,
  arrayOf,
} from "../testing.ts";
import { mock } from "../mock.ts";
import { AmqpFraming, Frame } from "../framing/mod.ts";

function createSocket() {
  return {
    read: mock.fn(),
    write: mock.fn(() => {}),
  };
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
  const write = createAmqpEncoder(conn);

  conn.write.mock.reset();

  write(
    {
      type: "method",
      channel: 0,
      payload: { classId: 10, methodId: 10, args: { serverProperties: {} } },
    },
  );

  assertEquals(conn.write.mock.calls.length, 1);
  assertEquals(conn.write.mock.calls[0][0], {
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
  const read = createAmqpDecoder(conn);

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

  conn.read.mock.setImplementation(createMockReader([data]));

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
