import { connect } from "../mod.ts";

const queueName = Deno.args[0];
if (!queueName) {
  console.log(`No queue name specified`);
  Deno.exit(1);
}

const connection = await connect();

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
