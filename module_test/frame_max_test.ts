import { assertThrowsAsync } from "../src/testing.ts";
import { withConnection, randomString } from "./api.ts";

Deno.test(
  "large frames can be sent in chunks",
  withConnection(async (conn) => {
    const channel = await conn.openChannel();

    await channel.publish({}, {}, new Uint8Array(5000));
  }, { frameMax: 4096 }),
);
