import {
  MethodDefinition,
  Spec,
  resolveType,
  camelCase,
  ClassDefinition,
  ArgumentDefinition
} from "./utils.ts";

const { args, readFileSync, writeFileSync } = Deno;
const decoder = new TextDecoder("utf-8");
const spec = JSON.parse(decoder.decode(readFileSync(args[0]))) as Spec;

function getArgValue(varName: string, arg: ArgumentDefinition) {
  const argName = camelCase(arg.name);
  const argValue = `${varName}["${argName}"]`;
  const defaultValue = arg["default-value"] !== undefined
    ? JSON.stringify(arg["default-value"])
    : undefined;
  if (arg["default-value"] !== undefined) {
    return `${argValue} !== undefined ? ${argValue} : ${defaultValue}`;
  }

  return argValue;
}

function printMethodArgsEncoding(
  method: MethodDefinition
) {
  return `enc.encodeFields([
    ${method.arguments.map(arg => {
    const type = resolveType(spec, arg);
    const name = camelCase(arg.name);
    const defaultValue = JSON.stringify(arg["default-value"]);
    return `field("${type}", args["${name}"], ${defaultValue})`;
  }).join(",")}
  ]);`;
}

function printMethodDecoding(
  clazz: ClassDefinition,
  method: MethodDefinition
) {
  return `
  const fields = enc.decodeFields(r, [${method.arguments.map(a =>
    '"' + resolveType(spec, a) + '"'
  ).join(",")}]);
  const args = { ${method.arguments.map((a, i) =>
    `${camelCase(a.name)}: fields[${i}]`
  ).join(",")}}
  return args;
  `;
}

function printHeaderEncoding(
  clazz: ClassDefinition
) {
  return `enc.encodeOptionalFields([
    ${(clazz.properties || []).map(prop => {
    const name = camelCase(prop.name);
    return `field("${prop.type}", props["${name}"])`;
  }).join(",")}
  ]);`;
}

function printHeaderDecoding(
  clazz: ClassDefinition
) {
  return `
  const fields = enc.decodeOptionalFields(r, [${(clazz.properties || []).map(
    p => '"' + p.type + '"'
  ).join(",")}]);
  const props = { ${(clazz.properties || []).map((p, i) =>
    `${camelCase(p.name)}: fields[${i}]`
  ).join(",")}};

  return props;
  `;
}

function printMethodEncoder(spec: Spec) {
  return `
export function encodeArgs(classId: number, methodId: number, args: Record<string, enc.AmqpOptionalFieldValue>) : Uint8Array {
  switch(classId) {
    ${spec.classes.map(clazz => {
    return `
      case ${clazz.id}: { 
        switch(methodId) {
          ${clazz.methods.map(method => {
      return `case ${method.id}: return ${printMethodArgsEncoding(
        method
      )}; `;
    }).join("\n")}
        }
      }
      break;
     `;
  }).join("\n")}
  }

  throw new Error(\`Unknown method \${classId} \${methodId}\`);
}
  `;
}

function printMethodDecoder(spec: Spec) {
  return `
export function decodeArgs(r: Deno.SyncReader, classId: number, methodId: number): Record<string, enc.AmqpFieldValue> {
  switch(classId) {
    ${spec.classes.map(clazz => {
    return `
      case ${clazz.id}: { 
        switch(methodId) {
          ${clazz.methods.map(method => {
      return `case ${method.id}: {
        ${printMethodDecoding(clazz, method)};
      }`;
    }).join("\n")}
        }
      }
     `;
  }).join("\n")}
  }

  throw new Error(\`Unknown method \${classId} \${methodId}\`);
}
  `;
}

function printHeaderEncoder(spec: Spec) {
  return `
export function encodeProps(classId: number, props: Record<string, enc.AmqpOptionalFieldValue>) : Uint8Array {
  switch(classId) {
    ${spec.classes.map(clazz => {
    return `case ${clazz.id}: { return ${printHeaderEncoding(clazz)} };`;
  }).join("\n")}
  }

  throw new Error(\`Unknown class \${classId}\`);
}
  `;
}

function printPropsDecoder(spec: Spec) {
  return `
export function decodeProps(r: Deno.SyncReader, classId: number) : Record<string, enc.AmqpOptionalFieldValue> {
  switch(classId) {
    ${spec.classes.map(clazz => {
    return `case ${clazz.id}: { ${printHeaderDecoding(clazz)} };`;
  }).join("\n")}
  }

  throw new Error(\`Unknown class \${classId}\`);
}
  `;
}

function generateConnection() {
  return [
    'import * as enc from "../encoding/mod.ts"',
    `function field(type: enc.AmqpFieldType, value?: enc.AmqpFieldValue, defaultValue?: enc.AmqpFieldValue) : enc.AmqpField {
  return { type, value: value !== undefined ? value : defaultValue } as enc.AmqpField
}`,
    printMethodEncoder(spec),
    printMethodDecoder(spec),
    printHeaderEncoder(spec),
    printPropsDecoder(spec)
  ].join("\n");
}

const encoder = new TextEncoder();
const result = encoder.encode(generateConnection());

writeFileSync(`./framing/method_encoder.ts`, result);
