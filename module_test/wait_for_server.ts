import { connect } from "../mod.ts";

async function sleep(ms: number) {
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
  const conn = await retry(connect);
  await conn.close();
  Deno.exit(0);
} catch (error) {
  Deno.exit(1);
}
