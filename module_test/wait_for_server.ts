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

async function runConnect() {
  const process = Deno.run(
    { cmd: ["deno", "--allow-net", "./module_test/connect.ts"] },
  );

  const status = await process.status();
  if (!status.success) {
    throw new Error("Failed to connect");
  }
}

await retry(runConnect);
