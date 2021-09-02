import { connect } from "../mod.ts";
import { assertThrowsAsync } from "https://deno.land/std@0.106.0/testing/asserts.ts";

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
    await assertThrowsAsync(
      async () => {
        await connect("amqp://invaliduser:somepass@127.0.0.1:5672");
      },
      undefined,
      "EOF",
    );
    await Promise.resolve();
  },
);

Deno.test(
  "connect url - wrong port",
  async () => {
    await assertThrowsAsync(
      async () => {
        await connect("amqp://guest:guest@127.0.0.1:5673");
      },
      Deno.errors.ConnectionRefused,
    );
  },
);

Deno.test(
  "connect url - does not support amqps",
  async () => {
    await assertThrowsAsync(
      async () => {
        await connect("amqps://guest:guest@127.0.0.1:5672");
      },
      Error,
      "Unsupported protocol",
    );
  },
);
