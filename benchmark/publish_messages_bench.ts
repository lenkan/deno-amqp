import { connect } from "../mod.ts";
import { benchmark } from "./benchmark.ts";

function encode(text: string) {
  return new TextEncoder().encode(text);
}

const connection = await connect();
try {
  const channel = await connection.openChannel();
  const { queue } = await channel.declareQueue({ autoDelete: true });

  await benchmark("publish_messages", async () => {
    await Promise.all(
      Array.from({ length: 10000 }).map(async (_, index) => {
        await channel.publish(
          { routingKey: queue },
          {},
          encode(index.toString()),
        );
      }),
    );
  });
} finally {
  await connection.close();
}
