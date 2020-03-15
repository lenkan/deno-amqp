import {
  Spec
} from "./utils.ts";

const { args, readFileSync, writeFileSync } = Deno;
const decoder = new TextDecoder("utf-8");
const spec = JSON.parse(decoder.decode(readFileSync(args[0]))) as Spec;

function printHasContentFunction(spec: Spec) {
  return `
  export function hasContent(classId: number, methodId: number) {
    switch (classId) {
      ${spec.classes.map(clazz => {
    return `
        case ${clazz.id}:
          switch (methodId) {
            ${clazz.methods.map(method => {
      if (method.content) {
        return `case ${method.id}: return true;`;
      }
    }).join("\n")}
          }
          break;
        `;
  }).join("\n")}
    }

    return false;
  }
  `;
}

function generateConnection() {
  return [
    printHasContentFunction(spec)
  ].join("\n");
}

const encoder = new TextEncoder();
const result = encoder.encode(generateConnection());

writeFileSync(`./amqp_helpers.ts`, result);
