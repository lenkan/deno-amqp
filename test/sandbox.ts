import { connect } from "../mod.ts";

connect().then(async connection => {
  const channel = await connection.createChannel();
  const conn1 = await connect();
  const conn2 = await connect();

  await channel.declareQueue({ queue: "foo.queue" })

  const channel1 = await conn1.createChannel();
  const channel2 = await conn2.createChannel();

  channel1.declareQueue({ queue: "foo.queue" });

  await channel2.consume("foo.queue", msg => {
    console.log("Received message", new TextDecoder().decode(msg.payload));
  });

  await channel1.publish("", "foo.queue")
});
