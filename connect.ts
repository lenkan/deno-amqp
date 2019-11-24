import { createConnection } from "./amqp_connection.ts";

const { dial } = Deno;

interface Options {
  hostname: string;
  port: number;
  username: string;
  password: string;
}

async function connect(options: Options) {
  const conn = await dial({ hostname: options.hostname, port: options.port });
  return createConnection(conn, {
    username: options.username,
    password: options.password
  });
}

connect({
  hostname: "localhost",
  port: 5672,
  username: "guest",
  password: "guest"
})
  .then(async connection => {
    await connection.open();
    const [channel1, channel2] = await Promise.all([
      connection.createChannel(),
      connection.createChannel()
    ]);
    channel1.declareQueue({ queue: "foo.queue" });
    channel1.consume("foo.queue", msg => {
      console.log("Received message", new TextDecoder().decode(msg.payload));
    });
  })
  .catch(e => {
    console.error(e);
    Deno.exit(1);
  });
