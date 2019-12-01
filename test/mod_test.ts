import { test } from "https://deno.land/std/testing/mod.ts";
import {
  assertEquals,
  assertThrows
} from "https://deno.land/std/testing/asserts.ts";

import { connect } from "../mod.ts";

test("test connection", async () => {
  const conn1 = await connect();
  const conn2 = await connect();

  const channel1 = await conn1.createChannel();
  const channel2 = await conn2.createChannel();

  channel1.declareQueue({ queue: "foo.queue" });

  await channel2.consume("foo.queue", msg => {
    console.log("Received message", new TextDecoder().decode(msg.payload));
  });

  await channel1.publish("", "foo.queue")
});
