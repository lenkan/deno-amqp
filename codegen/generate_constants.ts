import {
  Spec,
  ArgumentDefinition,
  resolveArgumentType,
  flattenMethods,
  resolveType,
  pascalCase
} from "./utils.ts";

const { args, readFileSync, writeFileSync } = Deno;
const decoder = new TextDecoder("utf-8");
const spec = JSON.parse(decoder.decode(readFileSync(args[1]))) as Spec;

function constantName(name: string) {
  return name.replace(/-/g, "_");
}

function generateConstants() {
  return `
${spec.constants
  .map(constant => {
    return `
  /**
   * ${constant.name} ${constant.class ? `(${constant.class})` : ""}
   */
  export const ${constantName(constant.name)} = ${constant.value}
 `;
  })
  .join("\n")}
`;
}

const encoder = new TextEncoder();
const result = encoder.encode(generateConstants());

writeFileSync("framing/constants.ts", result);
