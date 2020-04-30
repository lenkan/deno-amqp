import { connect } from "../mod.ts";

function encode(text: string) {
  return new TextEncoder().encode(text);
}

const MESSAGES = parseInt(Deno.args[0] || "3000");

await connect({}).then(async (connection) => {
  const channel = await connection.openChannel();
  const { queue } = await channel.declareQueue({ autoDelete: true });

  await Promise.all(
    Array.from({ length: MESSAGES }).map(async (_, index) => {
      await channel.publish(
        { routingKey: queue },
        {},
        encode(index.toString()),
      );
    }),
  );

  await connection.close();
});
