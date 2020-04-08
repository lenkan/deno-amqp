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

await channel.declareQueue({ queue: queueName });
await channel.consume(
  { queue: queueName },
  async (args, props, data) => {
    console.log(JSON.stringify(args));
    console.log(JSON.stringify(props));
    console.log(new TextDecoder().decode(data));
    await channel.ack({ deliveryTag: args.deliveryTag });
  },
);
