async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function retry<T>(func: () => Promise<T>): Promise<T> {
  let times = 100;
  while (times--) {
    try {
      const result = await func();
      return result;
    } catch (error) {
      console.error(error.message);
      await sleep(1000);
    }
  }
  throw new Error(`Giving up after 100 retries`);
}

const starter = new Uint8Array([
  ...new TextEncoder().encode("AMQP"),
  ...[0, 0, 9, 1],
]);

const conn = await retry(async () => {
  const conn = await Deno.connect({ hostname: "localhost", port: 5672 });
  await conn.write(starter);
  await conn.read(new Uint8Array(7));
  return conn;
});

conn.close();
