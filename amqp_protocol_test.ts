import { AmqpProtocol } from "./amqp_protocol.ts";
import { createMock, assertEquals, createResolvable } from "./testing.ts";
import { QueueDeclareOk } from "./amqp_types.ts";

Deno.test("should not wait for reply when sending async", async () => {
  const reply = { consumerCount: 0, messageCount: 0, queue: "amqp.gen" };
  const promise = Promise.resolve<QueueDeclareOk>(reply);
  const mux = {
    receive: createMock(() => Promise.resolve(reply)),
    send: createMock(() => Promise.resolve()),
    receiveContent: createMock(() => Promise.resolve()),
    sendContent: createMock(),
    subscribe: createMock(),
  };

  const protocol = new AmqpProtocol(mux);

  await protocol.sendQueueDeclareAsync(0, {});

  assertEquals(mux.send.mockCalls.length, 1);
  assertEquals(mux.send.mockCalls[0][0], 0);
  assertEquals(mux.send.mockCalls[0][3], { nowait: true });
  assertEquals(mux.receive.mockCalls.length, 0);
});

Deno.test("should wait for reply when sending sync", async () => {
  const expectedReply = {
    consumerCount: 0,
    messageCount: 0,
    queue: "amqp.gen",
  };
  const resolvable = createResolvable<QueueDeclareOk>();

  const mux = {
    receive: createMock(async () => resolvable),
    send: createMock(() => Promise.resolve()),
    receiveContent: createMock(() => Promise.resolve()),
    sendContent: createMock(),
    subscribe: createMock(),
  };

  const protocol = new AmqpProtocol(mux);

  let actualReply: QueueDeclareOk | null = null;
  const promise = protocol.sendQueueDeclare(0, {}).then((reply) => {
    actualReply = reply;
  });

  assertEquals(mux.send.mockCalls.length, 1);
  assertEquals(mux.send.mockCalls[0][0], 0);
  assertEquals(mux.send.mockCalls[0][3], { nowait: false });
  assertEquals(mux.receive.mockCalls.length, 0);

  assertEquals(actualReply, null);

  await resolvable.resolve(expectedReply);
  await promise;

  assertEquals(actualReply, expectedReply);
  assertEquals(mux.receive.mockCalls.length, 1);
  assertEquals(mux.receive.mockCalls[0][0], 0);
});
