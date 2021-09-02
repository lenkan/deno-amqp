async function benchmarkFunction(
  fn: () => void | Promise<void>,
): Promise<number> {
  const now = window.performance.now();
  await fn();
  return window.performance.now() - now;
}

function existsSync(path: string) {
  try {
    if (!Deno.statSync(path).isDirectory) {
      return false;
    }
    return true;
  } catch (_error) {
    return false;
  }
}

export async function benchmark(
  name: string,
  fn: () => void | Promise<void>,
): Promise<void> {
  const result = await benchmarkFunction(fn);

  if (!existsSync("./benchmark/out")) {
    Deno.mkdirSync("./benchmark/out", { recursive: true });
  }

  Deno.writeTextFile(
    "./benchmark/out/" + name,
    `${result}ms\n`,
  );
}
