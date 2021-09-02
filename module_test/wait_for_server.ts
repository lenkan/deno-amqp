import { connect } from "../mod.ts";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function retry<T>(func: () => Promise<T>): Promise<T> {
  let times = 30;
  while (times--) {
    try {
      const result = await func();
      return result;
    } catch (error) {
      console.error(error.message);
      await sleep(1000);
    }
  }

  throw new Error(`Giving up after 30 retries`);
}

try {
  const conn = await retry(() => connect({ hostname: "127.0.0.1" }));
  await conn.close();
  Deno.exit(0);
} catch (_error) {
  Deno.exit(1);
}
