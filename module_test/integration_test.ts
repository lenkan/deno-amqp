import {
  connect,
  AmqpConnection,
  AmqpChannel,
  BasicProperties,
  BasicDeliverArgs,
} from "../mod.ts";
import {
  assertEquals,
  assertThrowsAsync,
} from "https://deno.land/std@v1.0.0-rc1/testing/asserts.ts";
import { createResolvable } from "../src/resolvable.ts";

interface AmqpChannelTest {
  (conn: AmqpConnection, channel: AmqpChannel): Promise<void>;
}

function withChannel(tester: AmqpChannelTest): () => Promise<void> {
  return async () => {
    const connection = await connect();
    const channel = await connection.openChannel();

    try {
      await tester(connection, channel);
    } finally {
      await connection.close();
    }
  };
}

function cleanObj<T extends object>(o: T): T {
  return Object.keys(o).reduce<T>((res: any, key) => {
    const value = (o as any)[key];
    if (value !== undefined) {
      res[key] = value;
    }
    return res;
  }, {} as T);
}

function encodeText(str: string) {
  return new TextEncoder().encode(str);
}

function decodeText(data: Uint8Array) {
  return new TextDecoder().decode(data);
}

Deno.test(
  "cannot declare queue after channel after has been closed by server",
  withChannel(async (conn1, chan1) => {
    // Should cause an error due to reserved queue name
    await assertThrowsAsync(
      async () => {
        await chan1.declareQueue({ queue: "amq.help" });
      },
      Error,
      "Channel 1 closed by server - 403 ACCESS_REFUSED - queue name 'amq.help' contains reserved prefix 'amq.*' - caused by 'queue.declare'",
    );

    await assertThrowsAsync(
      async () => {
        await chan1.declareQueue({});
      },
      Error,
      "Connection closed by server - 504 CHANNEL_ERROR - expected 'channel.open' - caused by 'queue.declare'",
    );

    await assertThrowsAsync(
      async () => {
        await conn1.closed();
      },
      Error,
      "Connection closed by server - 504 CHANNEL_ERROR - expected 'channel.open' - caused by 'queue.declare'",
    );
  }),
);

Deno.test(
  "can declare, consume and publish to anonymous queue",
  withChannel(async (_conn1, chan1) => {
    const { queue } = await chan1.declareQueue({ autoDelete: true });
    const promise = createResolvable<
      [BasicDeliverArgs, BasicProperties, Uint8Array]
    >();

    await chan1.consume({ noAck: true }, (args, props, content) => {
      promise.resolve([args, props, content]);
    });

    const now = Date.now();
    await chan1.publish(
      { routingKey: queue },
      { timestamp: now },
      encodeText(JSON.stringify({ foo: "bar" })),
    );

    const [args, props, content] = await promise;
    assertEquals(args.deliveryTag, 1);
    assertEquals(args.exchange, "");
    assertEquals(args.routingKey, queue);
    assertEquals(args.redelivered, false);
    assertEquals(cleanObj(props), { timestamp: now });
    assertEquals(JSON.parse(decodeText(content)), { foo: "bar" });
  }),
);

Deno.test(
  "can publish and consume empty messages",
  withChannel(async (_conn1, chan1) => {
    const { queue } = await chan1.declareQueue({ autoDelete: true });
    const promise = createResolvable<
      [BasicDeliverArgs, BasicProperties, Uint8Array]
    >();

    await chan1.consume({ noAck: true }, (args, props, content) => {
      promise.resolve([args, props, content]);
    });

    const now = Date.now();
    await chan1.publish(
      { routingKey: queue },
      { timestamp: now },
      new Uint8Array(0),
    );

    const [args, props, content] = await promise;
    assertEquals(args.deliveryTag, 1);
    assertEquals(args.exchange, "");
    assertEquals(args.routingKey, queue);
    assertEquals(args.redelivered, false);
    assertEquals(cleanObj(props), { timestamp: now });
    assertEquals(content, new Uint8Array(0));
  }),
);
