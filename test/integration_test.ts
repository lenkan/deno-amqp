import { connect } from "../mod.ts";
import { assertThrowsAsync } from "../testing.ts";
const { test } = Deno;

test(
  "cannot declare queue after channel after has been closed by server",
  async () => {
    const conn1 = await connect({ loglevel: "debug" });

    try {
      const chan1 = await conn1.openChannel();

      // Should cause an error due to reserved queue name
      await chan1.declareQueue({ queue: "amq.help" }).catch((_) => {});

      await assertThrowsAsync(async () => {
        await chan1.declareQueue({});
      });
    } finally {
      await conn1.close().catch((_) => {});
    }
  },
);
