import { connect } from "../mod.ts";

const queueName = Deno.args[0];
if (!queueName) {
  console.log(`No queue name specified`);
  Deno.exit(1);
}

const connection = await connect({ loglevel: "debug" });

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

connection.closed().then(() => {
  console.log("Closed peacefully");
}).catch((error) => {
  console.error("Connection closed with error");
  console.error(error.message);
});
