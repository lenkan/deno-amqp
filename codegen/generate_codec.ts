import {
  printHeaderDecoder,
  printHeaderDefinition,
  printHeaderEncoder,
  printHeaderUnion,
  printMethodDecoder,
  printMethodEncoder,
  printReceiveMethodDefinition,
  printReceiveMethodUnion,
  printSendMethodDefinition,
  printSendMethodUnion,
  Spec,
} from "./utils.ts";

const { args, readFileSync, writeFileSync } = Deno;
const decoder = new TextDecoder("utf-8");
const spec = JSON.parse(decoder.decode(readFileSync(args[0]))) as Spec;

function printMethodNameFunction(spec: Spec) {
  return `
const methodNames: Record<number, Record<number, string>> = {
  ${
    spec.classes.map((clazz) => {
      return `[${clazz.id}]: {
      ${
        clazz.methods.map((method) => {
          return `[${method.id}]: "${clazz.name}.${method.name}"`;
        })
      }
    }`;
    })
  }
}

export function getMethodName(classId: number, methodId: number): string | undefined {
  return methodNames[classId] && methodNames[classId][methodId];
}
  `;
}

const withNowaitInterface = `
export type WithNowait<T> = T & { nowait?: boolean };
`;

function generateConnection() {
  return [
    "// deno-lint-ignore-file no-explicit-any",
    'import * as enc from "./encoding/mod.ts"',
    'import * as t from "./amqp_types.ts"',
    printMethodNameFunction(spec),
    withNowaitInterface,
    ...spec.classes.flatMap((clazz) => clazz.methods.map((m) => printReceiveMethodDefinition(clazz, m))),
    ...spec.classes.flatMap((clazz) => clazz.methods.map((m) => printSendMethodDefinition(clazz, m))),
    ...spec.classes.map(printHeaderDefinition),
    printReceiveMethodUnion(spec),
    printSendMethodUnion(spec),
    printHeaderUnion(spec),
    `export ${printMethodDecoder(spec)}`,
    `export ${printMethodEncoder(spec)}`,
    `export ${printHeaderDecoder(spec)}`,
    `export ${printHeaderEncoder(spec)}`,
  ].join("\n");
}

const encoder = new TextEncoder();
const result = encoder.encode(generateConnection());

writeFileSync(`./src/amqp_codec.ts`, result);
