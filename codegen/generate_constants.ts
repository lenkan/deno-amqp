import { constantName } from "./utils.ts";
import spec, { ConstantDefinition, Spec } from "./amqp_spec.ts";

function formatExport(name: string, value: number) {
  return `export const ${name} = ${JSON.stringify(value)} as const;`;
}

function formatConstant(constant: ConstantDefinition) {
  const name = constant.class ? constantName(constant.class, constant.name) : constantName(constant.name);
  return formatExport(name, constant.value);
}

const encoder = new TextEncoder();

const template = (spec: Spec) => `
${spec.constants.map(formatConstant).join("\n")}
${
  spec.classes.flatMap((c) => {
    return [
      formatExport(constantName(c.name), c.id),
      ...c.methods.map((m) => formatExport(constantName(c.name, m.name), m.id)),
    ];
  }).join("\n")
}
`;

await Deno.stdout.write(encoder.encode(template(spec)));
