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
    const value = getArgValue("args", arg);
    return `{ type: "${type}", value: ${value} }`;
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
    `${camelCase(a.name)}: fields[${i}].value`
  ).join(",")}}
  return args;
  `;
}

function printHeaderEncoding(
  clazz: ClassDefinition
) {
  return `enc.encodeProperties([
    ${(clazz.properties || []).map(prop => {
    const name = camelCase(prop.name);
    return `{ type: "${prop.type}", value: props["${name}"] }`;
  }).join(",")}
  ]);`;
}

function printHeaderDecoding(
  clazz: ClassDefinition
) {
  return `
  const fields = enc.decodeProperties(r, [${(clazz.properties || []).map(p =>
    '"' + p.type + '"'
  ).join(",")}]);
  const props = { ${(clazz.properties || []).map((p, i) =>
    `${camelCase(p.name)}: fields[${i}].value`
  ).join(",")}};

  return props;
  `;
}

function printMethodEncoder(spec: Spec) {
  return `
export function encodeArgs(classId: number, methodId: number, args: any) : Uint8Array {
  switch(classId) {
    ${spec.classes.map(clazz => {
    return `
      case ${clazz.id}: { 
        switch(methodId) {
          ${clazz.methods.map(method => {
      return `case ${method.id}: return ${printMethodArgsEncoding(
        method
      )}; break;`;
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
export function decodeArgs(r: Deno.SyncReader, classId: number, methodId: number): any {
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
export function encodeProps(classId: number, props: any) : Uint8Array {
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
export function decodeProps(r: Deno.SyncReader, classId: number) : any {
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
    'import * as enc from "./encoder.ts"',
    printMethodEncoder(spec),
    printMethodDecoder(spec),
    printHeaderEncoder(spec),
    printPropsDecoder(spec)
  ].join("\n");
}

const encoder = new TextEncoder();
const result = encoder.encode(generateConnection());

writeFileSync(`./framing/method_encoder.ts`, result);
