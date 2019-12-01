import {
  CONNECTION,
  CONNECTION_START,
  CONNECTION_TUNE,
  CONNECTION_FORCED
} from "./framing/constants.ts";
import { createProtocol, IncomingFrame } from "./framing/mod.ts";
import { AmqpChannel, createChannel } from "./amqp_channel.ts";

export interface AmqpConnectionOptions {
  username: string;
  password: string;
}

export interface AmqpConnection {
  createChannel(): Promise<AmqpChannel>;
  close(): Promise<void>;
}

const NULL_CHAR = String.fromCharCode(0);

export async function createConnection(
  conn: Deno.Conn,
  options: AmqpConnectionOptions
): Promise<AmqpConnection> {
  const { username: user, password } = options;

  const amqp = createProtocol(conn);

  const channels: AmqpChannel[] = [];
  const channelNumbers: number[] = [];

  function generateChannelNumber() {
    // TODO(lenkan): Use max channels
    for (let i = 1; i < 10000; ++i) {
      if (!channelNumbers.includes(i)) {
        channelNumbers.push(i);
        return i;
      }
    }
    throw new Error(`Could not find a free channel number`);
  }

  async function openChannel(): Promise<AmqpChannel> {
    const num = generateChannelNumber();
    await amqp.channel.open(num, {});

    const channel = createChannel(num, amqp);
    channels.push(channel);
    return channel;
  }

  async function open() {
    await amqp.initialize();
    await amqp
      .receive(0, { classId: CONNECTION, methodId: CONNECTION_START })
      .then(async args => {
        await amqp.connection.startOk(0, {
          clientProperties: {},
          locale: args.locales.split(" ")[0],
          mechanism: args.mechanisms.split(" ")[0],
          response: `${NULL_CHAR}${user}${NULL_CHAR}${password}`
        });
      });

    await amqp
      .receive(0, { classId: CONNECTION, methodId: CONNECTION_TUNE })
      .then(async args => {
        await amqp.connection.tuneOk(0, {
          channelMax: args.channelMax,
          frameMax: args.frameMax,
          heartbeat: 0 //method.args.heartbeat
        });

        await amqp.connection.open(0, {});
      });
  }

  async function close() {
    await amqp.connection.close(0, {
      classId: 0,
      methodId: 0,
      replyCode: CONNECTION_FORCED,
      replyText: "Connection closed by client"
    });
  }

  await open();

  return {
    createChannel: openChannel,
    close: close
  };
}
