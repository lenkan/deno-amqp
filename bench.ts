const files = [...Deno.readDirSync("./benchmark")].filter(isBench);

function isBench(file: Deno.DirEntry) {
  return file.name.endsWith("_bench.ts");
}

async function runBench(name: string) {
  const path = await Deno.realPath("./benchmark/" + name);
  const now = Date.now();

  const command = new Deno.Command(Deno.execPath(), {
    args: [
      "run",
      "--allow-net",
      "--allow-write",
      "--allow-read",
      path,
    ],
  });

  const { code, stderr } = command.outputSync();
  const time = Date.now() - now;

  if (code !== 0) {
    throw new Error(`Failed ${path} - ${stderr}`);
  }

  return time;
}

for (const file of files) {
  await runBench(file.name).then(() => {
    console.log(`${file.name} - OK`);
  }).catch((err) => {
    console.log(`${file.name} - Error - ${err.message}`);
  });
}
