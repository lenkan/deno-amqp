import {
  MethodDefinition,
  Spec,
  resolveType,
  camelCase,
  ClassDefinition,
  ArgumentDefinition,
  resolveTypescriptType,
  pascalCase,
  printMethodArgsInterface,
  printMethodValueInterface
} from "./utils.ts";

const { args, readFileSync, writeFileSync } = Deno;
const decoder = new TextDecoder("utf-8");
const spec = JSON.parse(decoder.decode(readFileSync(args[0]))) as Spec;

function getDefaultValue(a: ArgumentDefinition) {
  if (a["default-value"] === undefined) {
    return undefined;
  }

  const type = resolveType(spec, a);
  const tsType = resolveTypescriptType(type);
  if (tsType === "bigint") {
    return `BigInt(${JSON.stringify(a["default-value"])})`;
  }

  return JSON.stringify(a["default-value"]);
}

function printEncodeMethodFunction(
  clazz: ClassDefinition,
  method: MethodDefinition
) {
  const name = `encode${pascalCase(clazz.name) + pascalCase(method.name)}`;
  const argsName = `${pascalCase(clazz.name) + pascalCase(method.name)}Args`;
  return `
export function ${name}(args: ${argsName}): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(encodeShortUint(${clazz.id}));
  w.writeSync(encodeShortUint(${method.id}));
  w.writeSync(encodeFields([
    ${method.arguments.map(arg => {
    const type = resolveType(spec, arg);
    const name = camelCase(arg.name);
    const defaultValue = getDefaultValue(arg);
    const value = arg["default-value"] !== undefined
      ? `args.${name} !== undefined ? args.${name} : ${defaultValue}`
      : `args.${name}`;
    return `{ type: "${type}" as const, value: ${value} }`;
  }).join(",")}
  ]));
  return w.bytes();
}
  `;
}

function printDecodeMethodFunction(
  clazz: ClassDefinition,
  method: MethodDefinition
) {
  const name = `decode${pascalCase(clazz.name) + pascalCase(method.name)}`;
  const returnName = `${pascalCase(clazz.name) + pascalCase(method.name)}`;
  return `
function ${name}(r: Deno.SyncReader): ${returnName} {
  const fields = decodeFields(r, [${method.arguments.map(a =>
    '"' + resolveType(spec, a) + '"'
  ).join(",")}]);
  const args = { ${method.arguments.map((a, i) =>
    `${camelCase(a.name)}: fields[${i}] as ${resolveTypescriptType(
      resolveType(spec, a)
    )}`
  ).join(",")}}
  return args;
}`;
}

function printMethodEncoder(spec: Spec) {
  return `
export function encodeMethod(method: SendMethod) : Uint8Array {
  switch(method.classId) {
    ${spec.classes.map(clazz => {
    return `
      case ${clazz.id}: { 
        switch(method.methodId) {
          ${clazz.methods.map(method => {
      const name = `encode${pascalCase(clazz.name) + pascalCase(method.name)}`;
      return `case ${method.id}: return ${name}(method.args);`;
    }).join("\n")}
          default:
            throw new Error("Unknown method " + method!.methodId + " for class '${clazz.name}'")
        }
      }
     `;
  }).join("\n")}
    default:
      throw new Error("Unknown class " + method!.classId);
  }
}
  `;
}

function printMethodDecoder(spec: Spec) {
  return `
export function decodeMethod(data: Uint8Array): ReceiveMethod {
  const r = new Deno.Buffer(data);
  const classId = decodeShortUint(r);
  const methodId = decodeShortUint(r);
  switch(classId) {
    ${spec.classes.map(clazz => {
    return `
      case ${clazz.id}: { 
        switch(methodId) {
          ${clazz.methods.map(method => {
      const name = `decode${pascalCase(clazz.name) + pascalCase(method.name)}`;
      return `case ${method.id}: return { classId, methodId, args: ${name}(r) };`;
    }).join("\n")}
          default:
            throw new Error("Unknown method " + methodId + " for class '${clazz.name}'")
        }
      }
     `;
  }).join("\n")}
    default:
      throw new Error("Unknown class " + classId);
  }
}
  `;
}

function generateConnection() {
  return [
    'import { decodeShortUint, encodeShortUint } from "../encoding/number_encoding.ts"',
    'import { decodeFields, encodeFields } from "../encoding/fields_encoding.ts"',
    'import { SendMethod, ReceiveMethod } from "../amqp_types.ts"',
    ...spec.classes.flatMap(clazz =>
      clazz.methods.map(m => printMethodArgsInterface(spec, clazz, m))
    ),
    ...spec.classes.flatMap(clazz =>
      clazz.methods.map(m => printMethodValueInterface(spec, clazz, m))
    ),
    ...spec.classes.flatMap(clazz =>
      clazz.methods.map(m => printEncodeMethodFunction(clazz, m))
    ),
    ...spec.classes.flatMap(clazz =>
      clazz.methods.map(m => printDecodeMethodFunction(clazz, m))
    ),
    printMethodEncoder(spec),
    printMethodDecoder(spec)
  ].join("\n");
}

const encoder = new TextEncoder();
const result = encoder.encode(generateConnection());

writeFileSync(`./encoding/method_encoding.ts`, result);
