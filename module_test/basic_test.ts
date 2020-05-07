import {
  BasicProperties,
  BasicDeliverArgs,
} from "../mod.ts";
import {
  assertEquals,
  assertThrowsAsync,
} from "https://deno.land/std@v1.0.0-rc1/testing/asserts.ts";
import { createResolvable } from "../src/resolvable.ts";
import { withConnection, randomString } from "./api.ts";

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
  "consume queue no-ack",
  withConnection(async (conn) => {
    const channel = await conn.openChannel();

    const { queue } = await channel.declareQueue({ autoDelete: true });
    const promise = createResolvable<
      [BasicDeliverArgs, BasicProperties, Uint8Array]
    >();

    await channel.consume({ queue, noAck: true }, (args, props, content) => {
      promise.resolve([args, props, content]);
    });

    const now = Date.now();
    await channel.publish(
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
  "consume queue with ack",
  withConnection(async (conn) => {
    const channel = await conn.openChannel();

    const { queue } = await channel.declareQueue({ autoDelete: true });
    const promise = createResolvable<
      [BasicDeliverArgs, BasicProperties, Uint8Array]
    >();

    await channel.consume({ queue }, async (args, props, content) => {
      await channel.ack({ deliveryTag: args.deliveryTag });
      promise.resolve([args, props, content]);
    });

    const now = Date.now();
    await channel.publish(
      { routingKey: queue },
      { timestamp: now },
      encodeText(JSON.stringify({ foo: "bar" })),
    );

    const [_args, props, content] = await promise;
    assertEquals(cleanObj(props), { timestamp: now });
    assertEquals(JSON.parse(decodeText(content)), { foo: "bar" });
  }),
);

Deno.test(
  "consume queue with nack + requeue",
  withConnection(async (conn) => {
    const channel = await conn.openChannel();

    const { queue } = await channel.declareQueue({ autoDelete: true });
    const promise = createResolvable<
      [BasicDeliverArgs, BasicProperties, Uint8Array]
    >();

    let receiveCount = 0;
    await channel.consume({ queue }, async (args, props, content) => {
      if (++receiveCount <= 1) {
        await channel.nack({ deliveryTag: args.deliveryTag, requeue: true });
      } else {
        promise.resolve([args, props, content]);
      }
    });

    const now = Date.now();
    await channel.publish(
      { routingKey: queue },
      { timestamp: now },
      encodeText(JSON.stringify({ foo: "bar" })),
    );

    const [_args, props, content] = await promise;
    assertEquals(cleanObj(props), { timestamp: now });
    assertEquals(JSON.parse(decodeText(content)), { foo: "bar" });
  }),
);

Deno.test(
  "consume empty message",
  withConnection(async (conn) => {
    const channel = await conn.openChannel();
    const { queue } = await channel.declareQueue({ autoDelete: true });
    const promise = createResolvable<
      [BasicDeliverArgs, BasicProperties, Uint8Array]
    >();

    await channel.consume({ noAck: true }, (args, props, content) => {
      promise.resolve([args, props, content]);
    });

    const now = Date.now();
    await channel.publish(
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

Deno.test(
  "create, bind and consume queue",
  withConnection(async (conn) => {
    const channel = await conn.openChannel();

    const exchangeName = `exchange.${randomString(10)}`;
    const { queue } = await channel.declareQueue({ autoDelete: true });
    await channel.declareExchange({ exchange: exchangeName });
    await channel.bindQueue({ exchange: exchangeName, routingKey: queue });

    const promise = createResolvable<
      [BasicDeliverArgs, BasicProperties, Uint8Array]
    >();

    await channel.consume({ queue, noAck: true }, (args, props, content) => {
      promise.resolve([args, props, content]);
    });

    const now = Date.now();
    await channel.publish(
      { routingKey: queue, exchange: exchangeName },
      { timestamp: now },
      encodeText(JSON.stringify({ foo: "bar" })),
    );

    const [args, props, content] = await promise;
    assertEquals(args.deliveryTag, 1);
    assertEquals(args.exchange, exchangeName);
    assertEquals(args.routingKey, queue);
    assertEquals(args.redelivered, false);
    assertEquals(cleanObj(props), { timestamp: now });
    assertEquals(JSON.parse(decodeText(content)), { foo: "bar" });
  }),
);
