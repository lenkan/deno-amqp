import {
  Spec,
  printReceiveMethodDefinition,
  printReceiveMethodUnion,
  printHeaderUnion,
  printHeaderDefinition,
  printEncodeMethodFunction,
  printDecodeMethodFunction,
  printMethodDecoder,
  printEncodeHeaderFunction,
  printDecodeHeaderFunction,
  printHeaderDecoder,
  printSendMethodUnion,
  printSendMethodDefinition,
  printMethodEncoder,
  printHeaderEncoder,
} from "./utils.ts";

const { args, readFileSync, writeFileSync } = Deno;
const decoder = new TextDecoder("utf-8");
const spec = JSON.parse(decoder.decode(readFileSync(args[0]))) as Spec;

const withNowaitInterface = `
export type WithNowait<T> = T & { nowait?: boolean };
`;

function generateConnection() {
  return [
    'import * as enc from "./encoding/mod.ts"',
    'import * as t from "./amqp_types.ts"',
    withNowaitInterface,
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
    ...spec.classes.flatMap((clazz) =>
      clazz.methods.map((m) => printEncodeMethodFunction(spec, clazz, m))
    ),
    ...spec.classes.flatMap((clazz) =>
      clazz.methods.map((m) => printDecodeMethodFunction(spec, clazz, m))
    ),
    ...spec.classes.flatMap(printEncodeHeaderFunction),
    ...spec.classes.flatMap(printDecodeHeaderFunction),
    `export ${printMethodDecoder(spec)}`,
    `export ${printMethodEncoder(spec)}`,
    `export ${printHeaderDecoder(spec)}`,
    `export ${printHeaderEncoder(spec)}`,
  ].join("\n");
}

const encoder = new TextEncoder();
const result = encoder.encode(generateConnection());

writeFileSync(`./amqp_codec.ts`, result);
