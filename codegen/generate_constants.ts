import { Spec, constantName } from "./utils.ts";

const { args, readFileSync, writeFileSync } = Deno;
const decoder = new TextDecoder("utf-8");
const spec = JSON.parse(decoder.decode(readFileSync(args[0]))) as Spec;

function generate() {
  return [
    ...spec.constants.map(c => {
      const name = c.class
        ? constantName(c.class + "-" + c.name)
        : constantName(c.name);
      return `export const ${name} = ${JSON.stringify(c.value)}`;
    }),
    ...spec.classes.flatMap(c => {
      return [
        `export const ${constantName(c.name)} = ${c.id}`,
        ...c.methods.map(m =>
          `export const ${constantName(c.name + "_" + m.name)} = ${m.id}`
        )
      ];
    })
  ].join("\n");
}

const encoder = new TextEncoder();
const result = encoder.encode(generate());

writeFileSync(`./amqp_constants.ts`, result);
