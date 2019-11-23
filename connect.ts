import { connect as dial } from "./framing/socket.ts";
import { AmqpChannel } from "./amqp_channel.ts";
import { AmqpConnection } from "./amqp_connection.ts";
import { createLogger } from "./logging.ts";

interface Options {
  hostname: string;
  port: number;
  username: string;
  password: string;
}

async function connect(options: Options) {
  const socket = await dial({ hostname: "localhost", port: 5672 });
  const { username: user, password } = options;
  let channelNumber = 0;
  const channels: AmqpChannel[] = [];

  const connection = new AmqpConnection({ user, password }, socket);

  const logger = createLogger({});

  socket.use((context, next) => {
    next();
    if (context.frame.type === "method") {
      logger.debug(`Received ${context.frame.channel} ${context.frame.classId}-${context.frame.methodId}`);
    }
  });

  async function createChannel() {
    // TODO(lenkan): Reuse closed channel numbers
    const channel = new AmqpChannel({ channelNumber: ++channelNumber }, socket);
    await channel.open();
    channels.push(channel);

    return channel;
  }

  await connection.init();

  return {
    createChannel: createChannel,
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
    await channel1.queue.delete({ queue: "foo.queue" });
    await channel1.queue.declare({ queue: "foo.queue", autoDelete: true });
    await channel1.exchange.delete({ exchange: "foo.exchange" });
    await channel1.exchange.declare({ exchange: "foo.exchange" });
    await channel1.queue.bind({ queue: "foo.queue", exchange: "foo.exchange" })

    // await connection.declareQueue(1, { name: "foo.queue" });
  })
  .catch(e => {
    console.error(e);
    Deno.exit(1);
  });

console.log("hej");
