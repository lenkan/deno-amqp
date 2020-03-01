import { connect } from "../connect.ts";

connect().then(async connection => {
  const channel1 = await connection.createChannel();
  await channel1.declareQueue({ queue: "foo.queue" });

  await channel1.consume({ queue: "foo.queue" }, (args, props, data) => {
    console.log("Arguments: ", args);
    console.log("Properties: ", props);
    console.log("Received message", new TextDecoder().decode(data));
  });

  await channel1.publish(
    { routingKey: "foo.queue" },
    {},
    new TextEncoder().encode("Foo bar")
  );

  await connection.close()
});
