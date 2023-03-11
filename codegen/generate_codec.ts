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
} from "./utils.ts";
import spec, { Spec } from "./amqp_spec.ts";

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

const encoder = new TextEncoder();

const template = (spec: Spec) => `
// deno-lint-ignore-file no-explicit-any
import * as enc from "./encoding/mod.ts"
import * as t from "./amqp_types.ts"

${printMethodNameFunction(spec)}
${withNowaitInterface}
${spec.classes.flatMap((clazz) => clazz.methods.map((m) => printReceiveMethodDefinition(clazz, m))).join("\n")}
${spec.classes.flatMap((clazz) => clazz.methods.map((m) => printSendMethodDefinition(clazz, m))).join("\n")}
${spec.classes.map(printHeaderDefinition).join("\n")}
${printReceiveMethodUnion(spec)}
${printSendMethodUnion(spec)}
${printHeaderUnion(spec)}

export ${printMethodDecoder(spec)}
export ${printMethodEncoder(spec)}
export ${printHeaderDecoder(spec)}
export ${printHeaderEncoder(spec)}
`;

await Deno.stdout.write(encoder.encode(template(spec)));
