const files = [...Deno.readDirSync("./benchmark")].filter(isBench);

function isBench(file: Deno.DirEntry) {
  return file.name.endsWith("_bench.ts");
}

async function runBench(name: string) {
  const path = await Deno.realPath("./benchmark/" + name);

  const now = Date.now();
  const process = Deno.run(
    { cmd: ["deno", "run", "--allow-net", path] },
  );

  const status = await process.status();
  const time = Date.now() - now;
  if (!status.success) {
    throw new Error(`Failed ${path} - ${status}`);
  }

  return time;
}

for (const file of files) {
  const results: number[] = [];
  const path = await Deno.realPath("./benchmark/" + file.name);

  for (let i = 0; i < 10; i++) {
    const time = await runBench(file.name);
    console.log(`${file.name} - ${time}ms`);
    results.push(time);
  }

  await Deno.writeTextFile(
    path.replace(".ts", "_result"),
    results.map((t) => `${t}ms`).join("\n"),
  );
}
