import { connect } from "../mod.ts";

const queueName = Deno.args[0];

const connection = await connect();

const channel = await connection.openChannel();

await channel.declareQueue({ queue: queueName });
await channel.publish(
  { routingKey: queueName },
  { contentType: "application/json" },
  new TextEncoder().encode(JSON.stringify({ foo: "bar" })),
);
await connection.close();
