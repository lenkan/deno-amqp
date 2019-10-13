import { connect as dial, Frame } from "./framing/connect.ts";

const NULL_CHAR = String.fromCharCode(0);

interface Options {
  hostname: string;
  port: number;
  username: string;
  password: string;
}

async function connect(options: Options) {
  const connection = await dial({ hostname: "localhost", port: 5672 });
  const { username: user, password } = options;
  await connection.start();
  while (true) {
    const frame = await connection.read();

    console.log(`Received ${JSON.stringify(frame, null, 2)}`)
    if (frame.type === "heartbeat") {
      console.log(`Received heartbeat`);
    }

    if (frame.type === "method") {
      if (frame.name === "connection.start") {
        const mechanism = frame.args.mechanisms.split(" ")[0];
        const locale = frame.args.locales.split(" ")[0];

        await connection.write({
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
        await connection.write({
          type: "method",
          name: "connection.tune-ok",
          channel: frame.channel,
          args: {
            "channel-max": frame.args["channel-max"],
            "frame-max": frame.args["frame-max"],
            heartbeat: frame.args["heartbeat"]
          }
        });

        setInterval(async () => {
          await connection.write({
            type: "heartbeat",
            channel: 0
          });
        }, (10 / 2) * 1000);

        await connection.write({
          type: "method",
          name: "connection.open",
          channel: frame.channel,
          args: { "virtual-host": "/", capabilities: "", insist: true }
        });
      }
    }
  }
}

connect({
  hostname: "localhost",
  port: 5672,
  username: "guest",
  password: "guest"
}).catch(e => {
  console.error(e);
  Deno.exit(1);
});

console.log("hej");
