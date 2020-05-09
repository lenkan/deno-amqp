import { connect } from "../mod.ts";
import { benchmark } from "./benchmark.ts";

function encode(text: string) {
  return new TextEncoder().encode(text);
}

const COUNT = 10000;
const connection = await connect();

try {
  const channel = await connection.openChannel();
  const { queue } = await channel.declareQueue({ autoDelete: true });

  await Promise.all(
    Array.from({ length: COUNT }).map(async (_, index) => {
      await channel.publish(
        { routingKey: queue },
        {},
        encode(index.toString()),
      );
    }),
  );

  await benchmark("consume_messages", async () => {
    let count = 0;
    await new Promise((resolve, reject) => {
      channel.consume({ queue: queue }, (args, props, data) => {
        count++;
        if (count === COUNT) {
          resolve();
        }
      }).catch(reject);
    });
  });
} finally {
  await connection.close();
}
