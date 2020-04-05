import {
  Spec,
  printClassPropertyInterface,
  printMethodArgsInterface,
  printMethodValueInterface,
  printReceiveMethodDefinition,
  printReceiveMethodUnion,
  printHeaderUnion,
  printHeaderDefinition,
  printSendMethodUnion,
  printSendMethodDefinition
} from "./utils.ts";

const { args, readFileSync, writeFileSync } = Deno;
const decoder = new TextDecoder("utf-8");
const spec = JSON.parse(decoder.decode(readFileSync(args[0]))) as Spec;

function generateConnection() {
  return [
    ...spec.classes.map(printClassPropertyInterface),
    ...spec.classes.flatMap((clazz) =>
      clazz.methods.map((m) => printMethodArgsInterface(spec, clazz, m))
    ),
    ...spec.classes.flatMap((clazz) =>
      clazz.methods.map((m) => printMethodValueInterface(spec, clazz, m))
    ),
    ...spec.classes.flatMap((clazz) =>
      clazz.methods.map((m) => printReceiveMethodDefinition(clazz, m))
    ),
    ...spec.classes.flatMap((clazz) =>
      clazz.methods.map((m) => printSendMethodDefinition(clazz, m))
    ),
    ...spec.classes.map(printHeaderDefinition),
    printReceiveMethodUnion(spec),
    printSendMethodUnion(spec),
    printHeaderUnion(spec),
  ].join("\n");
}

const encoder = new TextEncoder();
const result = encoder.encode(generateConnection());

writeFileSync(`./amqp_types.ts`, result);
