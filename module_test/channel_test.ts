import { assertRejects } from "../src/testing.ts";
import { randomString, withConnection } from "./api.ts";

Deno.test(
  "publish on closed channel closes connection",
  withConnection(async (conn) => {
    const channel = await conn.openChannel();
    const exchange = `e.${randomString(10)}`;

    await channel.close();
    await channel.closed();

    await channel.publish({ exchange, routingKey: "" }, {}, new Uint8Array());

    await assertRejects(
      async () => {
        await conn.closed();
      },
      Error,
      `Connection closed by server - 504 CHANNEL_ERROR - expected 'channel.open' - caused by 'basic.publish'`,
    );
  }),
);
