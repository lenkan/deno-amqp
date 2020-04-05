import { connect } from "../amqp.ts";

const env = Deno.env();
const queueName = Deno.args[0];
if (!queueName) {
  console.log(`No queue name specified`);
  Deno.exit(1);
}

const connection = await connect(
  { heartbeatInterval: 10, loglevel: env.DEBUG ? "debug" : "none" },
);

const channel = await connection.openChannel();

try {
  await channel.declareQueue({ queue: queueName });
  await channel.publish(
    { routingKey: queueName },
    { contentType: "application/json" },
    new TextEncoder().encode(JSON.stringify({ foo: "bar" })),
  );
} catch (error) {
  console.error(error);
} finally {
  await connection.close();
}
