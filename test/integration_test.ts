import {
  assertEquals
} from "https://deno.land/std/testing/asserts.ts";
import { connect } from "../amqp.ts";

const { test } = Deno;
const encoder = new TextEncoder();
const decoder = new TextDecoder();

test("publish subscribe test", async () => {
  const conn1 = await connect();
  const conn2 = await connect();
  const chan1 = await conn1.channel();
  const chan2 = await conn2.channel();

  // chan1.basic.

  const { queue } = await chan1.basic.declareQueue({});
  const { consumerTag } = await chan1.basic.consume(
    { queue },
    (args, props, data) => {
      console.log(
        "Received",
        { args, props, data: JSON.parse(decoder.decode(data)) }
      );
      conn1.close();
      conn2.close();
    }
  );

  console.log("Consumer tag");

  await chan2.basic.publish(
    { routingKey: queue },
    {},
    encoder.encode(JSON.stringify({ foo: "bar" }))
  );
});
