import { printClassPropertyInterface, printMethodArgsInterface, printMethodValueInterface } from "./utils.ts";
import spec, { Spec } from "./amqp_spec.ts";

const template = (spec: Spec) => `
// deno-lint-ignore-file no-empty-interface
${spec.classes.map(printClassPropertyInterface).join("\n")}
${spec.classes.flatMap((clazz) => clazz.methods.map((m) => printMethodArgsInterface(spec, clazz, m))).join("\n")}
${spec.classes.flatMap((clazz) => clazz.methods.map((m) => printMethodValueInterface(spec, clazz, m))).join("\n")}
`;

const encoder = new TextEncoder();
const result = encoder.encode(template(spec));

await Deno.stdout.write(result);
