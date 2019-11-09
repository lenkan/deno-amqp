import { connect as dial } from "./framing/socket.ts";
import { AmqpChannel } from "./amqp_channel.ts";
import { createConnection } from "./amqp_connection.ts";

interface Options {
  hostname: string;
  port: number;
  username: string;
  password: string;
}

interface AmqpConnection {
  createChannel(): Promise<void>;
}

async function connect(options: Options) {
  const socket = await dial({ hostname: "localhost", port: 5672 });
  const { username: user, password } = options;
  let channelNumber = 0;
  const channels: AmqpChannel[] = [];

  const connection = createConnection({ user, password }, socket);

  async function openChannel() {
    // TODO(lenkan): Reuse closed channel numbers
    const channel = new AmqpChannel({ channelNumber: ++channelNumber }, socket);
    await channel.open();
    channels.push(channel);

    return {
      open: () => channel.open(),
      close: () => channel.close()
    };
  }

  await connection.init();

  return {
    createChannel: openChannel,
    close: connection.close
  };
}

connect({
  hostname: "localhost",
  port: 5672,
  username: "guest",
  password: "guest"
})
  .then(async connection => {
    const channel1 = await connection.createChannel();
    const channel2 = await connection.createChannel();
    const channel3 = await connection.createChannel();
    await channel1.close();
    await channel1.open();
    
    // await connection.declareQueue(1, { name: "foo.queue" });
  })
  .catch(e => {
    console.error(e);
    Deno.exit(1);
  });

console.log("hej");
