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

function printMethodNameFunction(spec: Spec) {
  return `
  export function getMethodName(classId: number, methodId: number) {
    switch (classId) {
      ${spec.classes.map(clazz => {
    return `
        case ${clazz.id}:
          switch (methodId) {
            ${clazz.methods.map(method => {
      return `case ${method.id}: return "${clazz.name}.${method.name}";`;
    }).join("\n")}
          }
          break;
        `;
  }).join("\n")}
    }

    throw new Error("Unknown classId/methodId");
  }
  `;
}

function printClassNameFunction(spec: Spec) {
  return `
  export function getClassName(classId: number) {
    switch (classId) {
      ${spec.classes.map(clazz => {
    return `case ${clazz.id}: return "${clazz.name}";`;
  }).join("\n")}
    }

    throw new Error("Unknown classId");
  }
  `;
}

function generateConnection() {
  return [
    printHasContentFunction(spec),
    printClassNameFunction(spec),
    printMethodNameFunction(spec)
  ].join("\n");
}

const encoder = new TextEncoder();
const result = encoder.encode(generateConnection());

writeFileSync(`./amqp_helpers.ts`, result);
