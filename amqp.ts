import { AmqpConnection } from "./amqp_connection.ts";
import { createSocket } from "./framing/socket.ts";
import { Logger } from "./amqp_connection_logger.ts";
import { AmqpChannel } from "./amqp_channel.ts";
import { AmqpBasic } from "./amqp_basic.ts";
import { AmqpExchange } from "./amqp_exchange.ts";
import { AmqpQueue } from "./amqp_queue.ts";
import { HARD_ERROR_CONNECTION_FORCED } from "./amqp_constants.ts";

export interface AmqpOptions {
  hostname?: string;
  port?: number;
  username?: string;
  password?: string;
  heartbeatInterval?: number;
  logger?: Logger;
}

export interface AmqpChannelClient {
  close(): Promise<void>;
  basic: AmqpBasic;
  queue: AmqpQueue;
  exchange: AmqpExchange;
}

export interface AmqpClient {
  channel(): Promise<AmqpChannelClient>;
  close(): Promise<void>;
}

export async function connect(options: AmqpOptions = {}): Promise<AmqpClient> {
  const {
    hostname = "localhost",
    port = 5672,
    username = "guest",
    password = "guest",
    heartbeatInterval,
    logger
  } = options;

  const conn = await Deno.connect({ port, hostname });
  const socket = createSocket(conn);
  const connection = new AmqpConnection(
    socket,
    { username, password, heartbeatInterval },
    logger
  );
  await connection.open();

  async function openChannel(): Promise<AmqpChannelClient> {
    const channel = connection.createChannel();
    await channel.open({});
    const basic = new AmqpBasic(channel);
    const exchange = new AmqpExchange(channel);
    const queue = new AmqpQueue(channel);
    const close = async () => {
      await channel.close( { classId: 0, methodId: 0, replyCode: HARD_ERROR_CONNECTION_FORCED });
    }
    return { close, basic, exchange, queue };
  }

  async function close() {
    await connection.close();
  }

  return { channel: openChannel, close };
}
