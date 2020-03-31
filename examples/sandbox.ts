import { connect } from "../amqp.ts";

const env = Deno.env();
const connection = await connect(
  { heartbeatInterval: 0, loglevel: env.DEBUG ? "debug" : "none" }
);

const channel1 = await connection.openChannel();
const channel2 = await connection.openChannel();

await channel1.declareQueue({ queue: "foo.queue" });
const consumer = await channel1.consume(
  { queue: "foo.queue", noAck: true },
  (args, props, data) => {
    console.log("Received message");
    console.log(args, props, data);
    console.log("Args", JSON.stringify(args));
    console.log("Properties", JSON.stringify(props));
    console.log("Message", new TextDecoder().decode(data));
    // channel1.ack({ deliveryTag: args.deliveryTag, multiple: true });
  }
);

await channel1.cancel(consumer);

await channel2.publish(
  { routingKey: "foo.queue" },
  { contentType: "application/json" },
  new TextEncoder().encode(JSON.stringify({ foo: "bar" }))
);

await channel1.publish(
  { routingKey: "foo.queue" },
  { contentType: "application/json" },
  new TextEncoder().encode(JSON.stringify({ foo: "bar" }))
);

// await channel1.close();

// setTimeout(() => connection.close(), 2000);
// await connection.close();
