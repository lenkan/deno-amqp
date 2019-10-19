import {
  connect as dial,
  IncomingFrame,
  OutgoingFrame,
  Heartbeat,
  AmqpSocket,
  IncomingMethod
} from "./framing/socket.ts";

const NULL_CHAR = String.fromCharCode(0);

interface Options {
  hostname: string;
  port: number;
  username: string;
  password: string;
}

interface AmqpConnection {
  createChannel(): Promise<void>;
}

type ConnectionState = "opening" | "running" | "closed";
type FrameHandler = (frame: IncomingFrame) => void;
interface FrameListener {
  handler: FrameHandler;
}

async function connect(options: Options) {
  const socket = await dial({ hostname: "localhost", port: 5672 });
  let state: ConnectionState = "opening";
  const { username: user, password } = options;
  await socket.start();
  let heartbeatTimer: number;

  let listeners: FrameHandler[] = [];

  function once(listener: FrameHandler) {
    const wrapper = (frame: IncomingFrame) => {
      listeners.splice(listeners.indexOf(wrapper), 1);
      listener(frame);
    };
    listeners.push(wrapper);
  }

  function on(listener: FrameHandler) {
    listeners.push(listener);
  }

  function handleMethod(method: IncomingMethod) {}

  function handleHeartbeat(heartbeat: Heartbeat) {
    // TODO: Handle missing heartbeats
    console.log(`Received heartbeat`);
  }

  function startHeartbeat(interval: number) {
    heartbeatTimer = setInterval(async () => {
      await socket.write({
        type: "heartbeat",
        channel: 0
      });
    }, interval);
  }

  function cleanup() {
    clearInterval(heartbeatTimer);
  }

  async function open() {
    while (true) {
      const frame = await socket.read();
      console.log("[connection] received", JSON.stringify(frame, null, 2));

      if (frame.type === "method") {
        if (frame.name === "connection.start") {
          const mechanism = frame.args.mechanisms.split(" ")[0];
          const locale = frame.args.locales.split(" ")[0];

          await socket.write({
            type: "method",
            name: "connection.start-ok",
            channel: frame.channel,
            args: {
              ["client-properties"]: {},
              locale,
              mechanism,
              response: `${NULL_CHAR}${user}${NULL_CHAR}${password}`
            }
          });
        }

        if (frame.name === "connection.tune") {
          await socket.write({
            type: "method",
            name: "connection.tune-ok",
            channel: frame.channel,
            args: {
              "channel-max": frame.args["channel-max"],
              "frame-max": frame.args["frame-max"],
              heartbeat: frame.args["heartbeat"]
            }
          });

          startHeartbeat(frame.args.heartbeat);

          await socket.write({
            type: "method",
            name: "connection.open",
            channel: frame.channel,
            args: { "virtual-host": "/", capabilities: "", insist: true }
          });
        }

        if (frame.name === "connection.open-ok") {
          return;
        }

        if (frame.name === "connection.close") {
          cleanup();
          await socket.write({
            type: "method",
            name: "connection.close-ok",
            channel: frame.channel,
            args: {}
          });

          throw new Error(
            `Connection handshake failed:  ${JSON.stringify(frame.args)}`
          );
        }
      }
    }
  }

  await open();

  async function startReceiving() {
    while (true) {
      const frame = await socket.read();
      console.log(`Received frame: ${JSON.stringify(frame)}`);

      if (frame.type === "method" && frame.className === "connection") {
        if(frame.channel !== 0) {
          await socket.write({
            type: "method",
            name: "connection.close",
            channel: 0,
            args: {
              "reply-code": 501,
              "reply-text": `Received heartbeat on channel ${frame.channel}`,
              "class-id": frame.classId,
              "method-id": frame.methodId,
            }
          })
        }
        if (frame.name === "connection.close") {
          console.log("Connection closing", JSON.stringify(frame.args));
          cleanup();
          await socket.write({
            type: "method",
            name: "connection.close-ok",
            channel: frame.channel,
            args: {}
          });
        }

        return;
      }

      if(frame.type)

      listeners.forEach(listener => listener(frame));
    }
  }

  startReceiving().catch(error => {
    console.error(`Fatal error`, error);
  });

  async function createChannel() {
    await socket.write({
      type: "method",
      name: "channel.open",
      channel: 1,
      args: { "out-of-band": "" }
    });

    return new Promise((resolve, reject) => {
      on(frame => {
        if (
          frame.channel === 1 &&
          frame.type === "method" &&
          frame.name === "channel.open-ok"
        ) {
          console.log("Opened channel");
          return resolve();
        }
      });
    });
  }

  async function declareQueue() {
    await socket.write({
      type: "method",
      name: "queue.declare",
      channel: 1,
      args: {
        queue: "foo-bar"
      }
    });
  }

  async function close() {
    await socket.write({
      type: "method",
      name: "connection.close",
      args: {


      }
    })
  }

  return { createChannel, declareQueue };
}

connect({
  hostname: "localhost",
  port: 5672,
  username: "guest",
  password: "guest"
})
  .then(async connection => {
    await connection.createChannel();
    await connection.declareQueue();
  })
  .catch(e => {
    console.error(e);
    Deno.exit(1);
  });

console.log("hej");
