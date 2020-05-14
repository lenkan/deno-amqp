import {
  assertEquals,
  assertThrowsAsync,
  assertStrContains,
  assertNotEquals,
} from "https://deno.land/std@v0.51.0/testing/asserts.ts";
import {
  getQueue,
  randomString,
  withConnection,
  getQueueBindings,
} from "./api.ts";

Deno.test(
  "declare queue",
  withConnection(async (conn) => {
    const channel = await conn.openChannel();
    const queueName = `queue.${randomString(10)}`;
    await channel.declareQueue({ queue: queueName });

    const queue = await getQueue(queueName);

    assertEquals(queue?.name, queueName);
  }),
);

Deno.test(
  "declare anonymous queue",
  withConnection(async (conn) => {
    const channel = await conn.openChannel();
    const { queue: queueName } = await channel.declareQueue({});

    const queue = await getQueue(queueName);

    assertEquals(queue?.name, queueName);
  }),
);

Deno.test(
  "declare queue with reserved name",
  withConnection(async (conn) => {
    const channel = await conn.openChannel();
    const name = `amq.${randomString(10)}`;

    const error = await assertThrowsAsync(
      async () => {
        await channel.declareQueue({ queue: name });
      },
      Error,
    );

    assertStrContains(
      error.message,
      `Channel 1 closed by server - 403 ACCESS_REFUSED - queue name '${name}' contains reserved prefix`,
    );

    const queue = await getQueue(name);

    assertEquals(queue, null);
  }),
);

Deno.test(
  "declare and delete queue",
  withConnection(async (conn1) => {
    const channel = await conn1.openChannel();
    const queueName = `queue.${randomString(10)}`;

    await channel.declareQueue({ queue: queueName });
    await channel.deleteQueue({ queue: queueName });

    const queue = await getQueue(queueName);

    assertEquals(queue, null);
  }),
);

Deno.test(
  "declare queue on closed channel",
  withConnection(async (conn) => {
    const chan1 = await conn.openChannel();
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
        await conn.closed();
      },
      Error,
      "Connection closed by server - 504 CHANNEL_ERROR - expected 'channel.open' - caused by 'queue.declare'",
    );
  }),
);

Deno.test(
  "bind queue without declare",
  withConnection(async (conn) => {
    const channel = await conn.openChannel();

    await assertThrowsAsync(
      async () => {
        await channel.bindQueue({ exchange: "" });
      },
      Error,
      "Channel 1 closed by server - 404 NOT_FOUND - no previously declared queue - caused by 'queue.bind'",
    );
  }),
);

Deno.test(
  "bind queue after declare",
  withConnection(async (conn) => {
    const channel = await conn.openChannel();
    const queueName = `queue.${randomString(10)}`;
    const exchangeName = `exchange.${randomString(10)}`;
    const routingKey = "some.key";
    await channel.declareQueue({ queue: queueName });
    await channel.declareExchange({ exchange: exchangeName });
    await channel.bindQueue({ exchange: exchangeName, routingKey });

    const queue = await getQueue(queueName);
    assertEquals(queue?.name, queueName);

    const bindings = await getQueueBindings(queueName);
    const binding = bindings.find((b: any) => b.source === exchangeName);

    assertEquals(binding, {
      vhost: "/",
      source: exchangeName,
      destination: queueName,
      destination_type: "queue",
      routing_key: routingKey,
      arguments: {},
      properties_key: routingKey,
    });
  }),
);

Deno.test(
  "bind queue after declare",
  withConnection(async (conn) => {
    const channel = await conn.openChannel();
    const queueName = `queue.${randomString(10)}`;
    const exchangeName = `exchange.${randomString(10)}`;
    const routingKey = "some.key";
    await channel.declareQueue({ queue: queueName });
    await channel.declareExchange({ exchange: exchangeName });
    await channel.bindQueue({ exchange: exchangeName, routingKey });

    const queue = await getQueue(queueName);
    assertEquals(queue?.name, queueName);

    await getQueueBindings(queueName).then((bindings) => {
      const binding = bindings.find((b: any) => b.source === exchangeName);
      assertNotEquals(binding, undefined);
    });

    await channel.unbindQueue({ exchange: exchangeName, routingKey });

    await getQueueBindings(queueName).then((bindings) => {
      const binding = bindings.find((b: any) => b.source === exchangeName);
      assertEquals(binding, undefined);
    });
  }),
);
