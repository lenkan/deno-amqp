import {
  MethodDefinition,
  Spec,
  resolveType,
  camelCase,
  ClassDefinition,
  ArgumentDefinition,
  resolveTypescriptType
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

function printMethodArgsEncoding(
  method: MethodDefinition
) {
  return `
  w.writeSync(enc.encodeFields([
    ${method.arguments.map(arg => {
    const type = resolveType(spec, arg);
    const name = camelCase(arg.name);
    const defaultValue = getDefaultValue(arg);
    const value = arg["default-value"] !== undefined
      ? `method.args.${name} !== undefined ? method.args.${name} : ${defaultValue}`
      : `method.args.${name}`;
    return `{ type: "${type}" as const, value: ${value} }`;
  }).join(",")}
  ]));
  return w.bytes();
  `;
}

function printMethodDecoding(
  method: MethodDefinition
) {
  return `
  const fields = enc.decodeFields(r, [${method.arguments.map(a =>
    '"' + resolveType(spec, a) + '"'
  ).join(",")}]);
  const args = { ${method.arguments.map((a, i) =>
    `${camelCase(a.name)}: fields[${i}] as ${resolveTypescriptType(
      resolveType(spec, a)
    )}`
  ).join(",")}}
  return { classId, methodId, args };
  `;
}

function printHeaderEncoding(
  clazz: ClassDefinition
) {
  return `
  w.writeSync(enc.encodeOptionalFields([
    ${(clazz.properties || []).map(prop => {
    const name = camelCase(prop.name);
    return `{ type: "${prop.type}", value: header.props.${name} }`;
  }).join(",")}
  ]));
  return w.bytes();
  `;
}

function printHeaderDecoding(
  clazz: ClassDefinition
) {
  return `
  const fields = enc.decodeOptionalFields(r, [${(clazz.properties || []).map(
    p => '"' + p.type + '"'
  ).join(",")}]);
  const props = { ${(clazz.properties || []).map((p, i) =>
    `${camelCase(p.name)}: fields[${i}] as ${resolveTypescriptType(p.type)}`
  ).join(",")}};

  return { classId, size, props };
  `;
}

function printMethodEncoder(spec: Spec) {
  return `
export function encodeMethod(method: SendMethod) : Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(method.classId));
  w.writeSync(enc.encodeShortUint(method.methodId));
  switch(method.classId) {
    ${spec.classes.map(clazz => {
    return `
      case ${clazz.id}: { 
        switch(method.methodId) {
          ${clazz.methods.map(method => {
      return `case ${method.id}: ${printMethodArgsEncoding(
        method
      )}; `;
    }).join("\n")}
        }
      }
      break;
     `;
  }).join("\n")}
  }
}
  `;
}

function printMethodDecoder(spec: Spec) {
  return `
export function decodeMethod(data: Uint8Array): ReceiveMethod {
  const r = new Deno.Buffer(data);
  const classId = enc.decodeShortUint(r);
  const methodId = enc.decodeShortUint(r);
  switch(classId) {
    ${spec.classes.map(clazz => {
    return `
      case ${clazz.id}: { 
        switch(methodId) {
          ${clazz.methods.map(method => {
      return `case ${method.id}: {
        ${printMethodDecoding(method)};
      }`;
    }).join("\n")}
        }
        break;
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
export function encodeHeader(header: Header) : Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(header.classId));
  w.writeSync(enc.encodeShortUint(0));
  w.writeSync(enc.encodeLongLongUint(BigInt(header.size)));
  switch(header.classId) {
    ${spec.classes.map(clazz => {
    return `case ${clazz.id}: { ${printHeaderEncoding(clazz)} };`;
  }).join("\n")}
  }
}
  `;
}

function printPropsDecoder(spec: Spec) {
  return `
export function decodeHeader(data: Uint8Array) : Header {
  const r = new Deno.Buffer(data);
  const classId = enc.decodeShortUint(r);
  const weight = enc.decodeShortUint(r);
  const size = enc.decodeLongLongUint(r); 
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
    'import { SendMethod, ReceiveMethod, Header } from "../amqp_types.ts"',
    printMethodEncoder(spec),
    printMethodDecoder(spec),
    printHeaderEncoder(spec),
    printPropsDecoder(spec)
  ].join("\n");
}

const encoder = new TextEncoder();
const result = encoder.encode(generateConnection());

writeFileSync(`./framing/method_encoder.ts`, result);
