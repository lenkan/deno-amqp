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

async function connect(options: Options) {
  const socket = await dial({ hostname: "localhost", port: 5672 });
  let state: ConnectionState = "opening";
  const { username: user, password } = options;
  await socket.start();
  let heartbeatTimer: number;

  async function receiveMethod<T extends IncomingMethod, U extends T["name"]>(
    name: U,
    channel: number
  ): Promise<Extract<T, { name: U }>> {
    return new Promise((resolve, reject) => {
      const unsubscribe = socket.listen(frame => {
        if (frame.type === "method" && frame.name === "connection.close") {
          unsubscribe();
          return reject(`Channel closed`);
        }

        if (frame.channel !== channel) {
          return;
        }

        if (frame.type === "method" && frame.name === name) {
          unsubscribe();
          return resolve(frame as Extract<T, { name: U }>);
        }
      });
    });
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

  function stopHeartbeat() {
    clearInterval(heartbeatTimer);
  }

  function cleanup() {
    clearInterval(heartbeatTimer);
  }

  function open() {
    return new Promise((resolve, reject) => {
      const listeners: (() => void)[] = [];
      const unsubscribe = () => listeners.forEach(l => l());

      receiveMethod("connection.start", 0).then(async frame => {
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
      });

      receiveMethod("connection.tune", 0).then(async frame => {
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
      });

      receiveMethod("connection.open-ok", 0).then(async _ => {
        return resolve();
      });

      receiveMethod("connection.close", 0).then(async frame => {
        stopHeartbeat();
        await socket.write({
          type: "method",
          name: "connection.close-ok",
          channel: frame.channel,
          args: {}
        });

        return reject(new Error(`Connection handshake failed`));
      });
    });
  }

  await open();

  socket.listen(async frame => {
    if(frame.type === "method" && frame.className === "connection" && frame.channel !== 0) {
      await socket.write({
        type: "method",
        name: "connection.close",
        channel: 0,
        args: {
            "reply-code": 501,
            "reply-text": `Received connection method on channel ${frame.channel}`,
            "class-id": frame.classId,
            "method-id": frame.methodId
        }
      })
      await receiveMethod("connection.close-ok", 0);
      console.log("Close ok")
    }
  });

  socket.listen(async frame => {
    if(frame.type === "method" && frame.name === "connection.close") {
        console.log("Connection closing", JSON.stringify(frame.args));
        // TODO: Notify listeners about close
        cleanup();
        await socket.write({
          type: "method",
          name: "connection.close-ok",
          channel: frame.channel,
          args: {}
        });
      }
  })

  async function createChannel() {
    await socket.write({
      type: "method",
      name: "channel.open",
      channel: 1,
      args: { "out-of-band": "" }
    });

    const response = await receiveMethod("channel.open-ok", 1);
    console.log("Channel opened");
    console.log(JSON.stringify(response));
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

    const response = await receiveMethod("queue.declare-ok", 1);
    console.log("Queue declared");
    console.log(JSON.stringify(response));
  }

  async function close() {
    await socket.write({
      type: "method",
      name: "connection.close",
      channel: 0,
      args: {
        "reply-code": 302,
        "class-id": 0,
        "method-id": 0
      }
    });
    stopHeartbeat();

    await receiveMethod("connection.close-ok", 0);
    socket.close();
  }

  return { createChannel, declareQueue, close };
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

    setTimeout(() => connection.close(), 10000);
  })
  .catch(e => {
    console.error(e);
    Deno.exit(1);
  });

console.log("hej");
