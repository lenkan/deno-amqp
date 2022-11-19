import { connect } from "../mod.ts";
import { assertRejects } from "../deps_dev.ts";

Deno.test(
  "connect url",
  async () => {
    const conn = await connect("amqp://guest:guest@127.0.0.1:5672");
    await conn.close();
  },
);

Deno.test(
  "connect url - missing port",
  async () => {
    const conn = await connect("amqp://guest:guest@127.0.0.1");
    await conn.close();
  },
);

Deno.test(
  "connect url - invalid username/password",
  async () => {
    await assertRejects(
      async () => {
        await connect("amqp://invaliduser:somepass@127.0.0.1:5672");
      },
      Error,
      "EOF",
    );
    await Promise.resolve();
  },
);

Deno.test(
  "connect url - wrong port",
  async () => {
    await assertRejects(
      async () => {
        await connect("amqp://guest:guest@127.0.0.1:5673");
      },
      Deno.errors.ConnectionRefused,
    );
  },
);
