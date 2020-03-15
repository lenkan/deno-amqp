import { AmqpSocket } from "../framing/socket.ts";
import {
  CONNECTION,
  CONNECTION_START,
  methods,
  CONNECTION_TUNE,
  CONNECTION_OPEN_OK,
  CONNECTION_CLOSE,
  CONNECTION_CLOSE_OK,
  CHANNEL,
  CHANNEL_OPEN_OK,
  ConnectionTuneOkPayload
} from "../framing/methods.ts";
import { AmqpBasic } from "../amqp_basic.ts";
import { ChannelManager } from "./channel_manager.ts";

export interface AmqpConnectOptions {
  username: string;
  password: string;
  heartbeatInterval?: number;
}

export interface AmqpConnection {
  close(): Promise<void>;
  channel(): Promise<AmqpChannel>;
}

export interface AmqpChannel {
  close(): Promise<void>;
  basic: AmqpBasic;
}

const NULL_CHAR = String.fromCharCode(0);
function credentials(username: string, password: string) {
  return `${NULL_CHAR}${username}${NULL_CHAR}${password}`;
}

export async function connect(
  socket: AmqpSocket,
  options: AmqpConnectOptions
): Promise<AmqpConnection> {
  const {
    username = "guest",
    password = "guest",
    heartbeatInterval
  } = options;

  const tuned: ConnectionTuneOkPayload = {
    channelMax: 0,
    frameMax: 0,
    heartbeat: 0
  };

  let heartbeatTimer: number | null = null;
  const channels: ChannelManager[] = [];
  const channel0 = new ChannelManager(0, socket);
  channels.push(channel0);

  async function close() {
    await channel0.send(methods.connection.close({
      classId: CONNECTION,
      methodId: CONNECTION_CLOSE,
      replyCode: 503
    }));
    await channel0.once(CONNECTION, CONNECTION_CLOSE_OK, a => a);
    socket.close();
  }

  function shutdown() {
    if (heartbeatTimer !== null) {
      clearInterval(heartbeatTimer);
    }
  }

  async function startHeartbeat(interval: number) {
    if (heartbeatTimer !== null) {
      clearInterval(heartbeatTimer);
    }

    heartbeatTimer = setInterval(
      () => socket.write({ type: "heartbeat", channel: 0 }),
      interval
    );
  }

  async function negotiate() {
    await socket.start();

    await channel0.once(CONNECTION, CONNECTION_START, () => {});
    await channel0.send(methods.connection.startOk({
      clientProperties: {},
      response: credentials(username, password)
    }));

    await channel0.once(CONNECTION, CONNECTION_TUNE, tune => tune).then(
      async args => {
        const interval = heartbeatInterval !== undefined
          ? heartbeatInterval
          : args.heartbeat;

        const channelMax = args.channelMax;
        const frameMax = args.frameMax;

        await channel0.send(methods.connection.tuneOk({
          heartbeat: interval,
          channelMax: channelMax,
          frameMax: frameMax
        }));

        tuned.channelMax = channelMax;
        tuned.frameMax = frameMax;
        tuned.heartbeat = interval;
        await startHeartbeat(interval * 1000);
      }
    );

    await channel0.send(methods.connection.open({}));
    await channel0.once(CONNECTION, CONNECTION_OPEN_OK, o => o);
  }

  async function listen() {
    while (true) {
      const frame = await socket.read();

      if (!frame) {
        shutdown();
        return;
      }

      if (frame.type === "heartbeat") {
        continue;
      }

      channels.forEach(channel => channel.push(frame));
    }
  }

  listen().catch(error => {
    console.error(error);
  });

  channel0.on(CONNECTION, CONNECTION_CLOSE, async args => {
    await channel0.send(methods.connection.closeOk({}));
    socket.close();
    throw new Error(
      `Connection closed - ${args.replyCode} - ${args.replyText} - ${args.classId}/${args.methodId}`
    );
  });

  await negotiate();

  function findNextChannelId() {
    for (let i = 0; i < tuned.channelMax; ++i) {
      if (!channels.find(c => c.id === i)) {
        return i;
      }
    }

    throw new Error(
      `Cannot create more channels maximum of ${tuned.channelMax} reached`
    );
  }

  async function openChannel(): Promise<AmqpChannel> {
    const id = findNextChannelId();
    const channel = new ChannelManager(id, socket);
    channels.push(channel);

    await channel.send(methods.channel.open({}));
    await channel.once(CHANNEL, CHANNEL_OPEN_OK, args => args);

    const basic = new AmqpBasic(channel);

    return { close, basic };
  }

  return { close, channel: openChannel };
}
