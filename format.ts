#!/usr/bin/env -S deno run --allow-run --allow-write --allow-read --allow-env
const { exit, args, execPath } = Deno;
import { parse } from "https://deno.land/std/flags/mod.ts";
import { xrun } from "https://deno.land/std/prettier/util.ts";

async function main(opts): Promise<void> {
  const args = [
    execPath(),
    "run",
    "--allow-write",
    "--allow-read",
    "https://deno.land/std/prettier/main.ts",
    "--ignore",
    "node_modules",
    "--ignore",
    "testdata",
    "--ignore",
    "vendor",
    "--write"
  ];

  if (opts.check) {
    args.push("--check");
  }

  args.push(".");

  exit((await xrun({ args }).status()).code);
}

main(parse(args));
