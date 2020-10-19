import { connect } from "../mod.ts";
import { assertThrowsAsync } from "https://deno.land/std@0.74.0/testing/asserts.ts";

Deno.test(
  "connect url",
  async () => {
    const conn = await connect("amqp://guest:guest@localhost:5672");
    await conn.close();
  },
);

Deno.test(
  "connect url - missing port",
  async () => {
    const conn = await connect("amqp://guest:guest@localhost");
    await conn.close();
  },
);

Deno.test(
  "connect url - invalid username/password",
  async () => {
    await assertThrowsAsync(
      async () => {
        await connect("amqp://invaliduser:somepass@localhost:5672");
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
        await connect("amqp://guest:guest@localhost:5673");
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
        await connect("amqps://guest:guest@localhost:5672");
      },
      Error,
      "Unsupported protocol",
    );
  },
);
