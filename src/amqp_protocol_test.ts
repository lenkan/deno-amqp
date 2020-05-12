import { AmqpProtocol } from "./amqp_protocol.ts";
import { assertEquals } from "./testing.ts";
import { QueueDeclareOk } from "./amqp_types.ts";
import { createResolvable } from "./resolvable.ts";
import { mock } from "./mock.ts";
import { AmqpMultiplexer } from "./amqp_multiplexer.ts";

Deno.test("should not wait for reply when sending async", async () => {
  const reply = { consumerCount: 0, messageCount: 0, queue: "amqp.gen" };

  const mux = mock.obj<AmqpMultiplexer>({
    receive: mock.fn(() => Promise.resolve(reply)),
    send: mock.fn(() => Promise.resolve()),
    receiveContent: mock.fn(() => Promise.resolve()),
    sendContent: mock.fn(),
    subscribe: mock.fn(),
  });

  const protocol = new AmqpProtocol(mux);

  await protocol.sendQueueDeclareAsync(0, {});

  assertEquals(mux.send.mock.calls.length, 1);
  assertEquals(mux.send.mock.calls[0][0], 0);
  assertEquals(mux.send.mock.calls[0][3], { nowait: true });
  assertEquals(mux.receive.mock.calls.length, 0);
});

Deno.test("should wait for reply when sending sync", async () => {
  const expectedReply = {
    consumerCount: 0,
    messageCount: 0,
    queue: "amqp.gen",
  };
  const resolvable = createResolvable<QueueDeclareOk>();

  const mux = mock.obj<AmqpMultiplexer>({
    receive: mock.fn(async () => resolvable),
    send: mock.fn(() => Promise.resolve()),
    receiveContent: mock.fn(() => Promise.resolve()),
    sendContent: mock.fn(),
    subscribe: mock.fn(),
  });

  const protocol = new AmqpProtocol(mux);

  let actualReply: QueueDeclareOk | null = null;
  const promise = protocol.sendQueueDeclare(0, {}).then((reply) => {
    actualReply = reply;
  });

  assertEquals(mux.send.mock.calls.length, 1);
  assertEquals(mux.send.mock.calls[0][0], 0);
  assertEquals(mux.send.mock.calls[0][3], { nowait: false });
  assertEquals(mux.receive.mock.calls.length, 0);

  assertEquals(actualReply, null);

  await resolvable.resolve(expectedReply);
  await promise;

  assertEquals(actualReply, expectedReply);
  assertEquals(mux.receive.mock.calls.length, 1);
  assertEquals(mux.receive.mock.calls[0][0], 0);
});
