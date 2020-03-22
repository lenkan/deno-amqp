import {
  MethodDefinition,
  Spec,
  ClassDefinition,
  printMethodArgsInterface,
  printMethodValueInterface as printMethodPayloadInterface,
  printClassPropertyInterface,
  pascalCase,
  constantName
} from "./utils.ts";

const { args, readFileSync, writeFileSync } = Deno;
const decoder = new TextDecoder("utf-8");
const spec = JSON.parse(decoder.decode(readFileSync(args[0]))) as Spec;

function printSendMethodDefinition(
  clazz: ClassDefinition,
  method: MethodDefinition
) {
  return `
  export interface Send${pascalCase(clazz.name)}${pascalCase(
    method.name
  )} {
    classId: ${clazz.id};
    methodId: ${method.id};
    args: ${pascalCase(clazz.name)}${pascalCase(method.name)}Args;
  }
  `;
}

function printContentHeaderDefinition(
  clazz: ClassDefinition
) {
  return `
  export interface ${pascalCase(clazz.name)}Header {
    classId: ${clazz.id};
    props: ${pascalCase(clazz.name)}Properties;
    size: number;
  }
  `;
}

function printReceiveMethodDefinition(
  clazz: ClassDefinition,
  method: MethodDefinition
) {
  return `
  export interface Receive${pascalCase(clazz.name)}${pascalCase(
    method.name
  )} {
    classId: ${clazz.id};
    methodId: ${method.id};
    args: ${pascalCase(clazz.name)}${pascalCase(method.name)};
  }
  `;
}

function printHeader(spec: Spec) {
  return `export type Header = ${spec.classes.map(c =>
    `${pascalCase(c.name)}Header`
  ).join(" | ")}`;
}

function printSendMethod(spec: Spec) {
  return `export type SendMethod = ${spec.classes.flatMap(c =>
    c.methods.map(m => `Send${pascalCase(c.name)}${pascalCase(m.name)}`)
  ).join(" | ")}`;
}

function printReceiveMethod(spec: Spec) {
  return `export type ReceiveMethod = ${spec.classes.flatMap(c =>
    c.methods.map(m => `Receive${pascalCase(c.name)}${pascalCase(m.name)}`)
  ).join(" | ")}`;
}

function generateTypes() {
  return [
    ...spec.classes.map(printClassPropertyInterface),
    ...spec.classes.flatMap(clazz =>
      clazz.methods.map(m => printMethodArgsInterface(spec, clazz, m))
    ),
    ...spec.classes.flatMap(clazz =>
      clazz.methods.map(m => printMethodPayloadInterface(spec, clazz, m))
    ),
    ...spec.classes.flatMap(clazz =>
      clazz.methods.map(m => printSendMethodDefinition(clazz, m))
    ),
    ...spec.classes.flatMap(clazz =>
      clazz.methods.map(m => printReceiveMethodDefinition(clazz, m))
    ),
    ...spec.classes.map(printContentHeaderDefinition),
    printSendMethod(spec),
    printReceiveMethod(spec),
    printHeader(spec)
  ].join("\n");
}

const encoder = new TextEncoder();
const result = encoder.encode(generateTypes());

writeFileSync(`./amqp_types.ts`, result);
