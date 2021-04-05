import { connect } from "../mod.ts";

const queueName = Deno.args[0];

const connection = await connect({ hostname: "127.0.0.1" });

const channel = await connection.openChannel();

await channel.declareQueue({ queue: queueName });
await channel.publish(
  { routingKey: queueName },
  { contentType: "application/json" },
  new TextEncoder().encode(JSON.stringify({ foo: "bar" })),
);
await connection.close();
