import { createLogger } from "./logging.ts";
import {
  BASIC,
  BASIC_DELIVER,
  CONNECTION,
  CONNECTION_START,
  CONNECTION_TUNE,
  CONNECTION_OPEN_OK
} from "./framing/constants.ts";
import { createProtocol, IncomingFrame } from "./framing/mod.ts";
import { AmqpChannel, createChannel } from "./amqp_channel.ts";

export interface AmqpConnectionOptions {
  username: string;
  password: string;
}

export interface AmqpConnection {
  createChannel(): AmqpChannel;
  open(): Promise<void>;
  close(): Promise<void>;
}

function log(frame: IncomingFrame) {
  const logger = createLogger({});
  if (frame.type === "method") {
    logger.debug(
      `Received ${frame.channel} ${frame.classId}-${frame.methodId}`
    );
  }

  // if (frame.type === "header") {
  //   logger.debug(`Received header`);
  //   logger.debug(JSON.stringify(frame, null, 2));
  //   logger.debug(new TextDecoder().decode(frame.payload));
  // }

  // if (frame.type === "content") {
  //   logger.debug(`Received content`);
  //   logger.debug(JSON.stringify(frame, null, 2));
  //   logger.debug(new TextDecoder().decode(frame.payload));
  // }

  if (
    frame.type === "method" &&
    frame.classId === BASIC &&
    frame.methodId === BASIC_DELIVER
  ) {
    logger.debug(JSON.stringify(frame.args));
  }
}

const NULL_CHAR = String.fromCharCode(0);

export function createConnection(
  conn: Deno.Conn,
  options: AmqpConnectionOptions
) {
  const { username: user, password } = options;

  const amqp = createProtocol(conn);

  const channels: AmqpChannel[] = [];
  const channelNumbers : number[] = [];

  function generateChannelNumber() {
    // TODO(lenkan): Use max channels
    for(let i = 1; i < 10000; ++i) {
      if(!channelNumbers.includes(i)) {
        channelNumbers.push(i);
        return i;
      }
    }
    throw new Error(`Could not find a free channel number`)
  }

  async function openChannel() {
    const num = generateChannelNumber();
    await amqp.channel.open(num, {})

    const channel = createChannel(num, amqp)
    channels.push(channel);
    return channel;
  }

  async function open() {
    amqp.listen(frame => log(frame));

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

  return {
    createChannel: openChannel,
    open: open,
    close: conn.close
  };
}
