import {
  Spec,
  camelCase,
  ClassDefinition,
  resolveTypescriptType,
  pascalCase,
  disclaimer
} from "./utils.ts";

const { args, readFileSync, writeFileSync } = Deno;
const decoder = new TextDecoder("utf-8");
const spec = JSON.parse(decoder.decode(readFileSync(args[0]))) as Spec;

function printEncodeHeaderFunction(
  clazz: ClassDefinition
) {
  const name = `encode${pascalCase(clazz.name)}Header`;
  return `
function ${name}(header: Extract<Header, { classId: ${clazz.id} }>): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(header.classId));
  w.writeSync(enc.encodeShortUint(0));
  w.writeSync(enc.encodeLongLongUint(header.size));
  w.writeSync(enc.encodeOptionalFields([
    ${(clazz.properties || []).map(prop => {
    const name = camelCase(prop.name);
    return `{ type: "${prop.type}", value: header.props.${name} }`;
  }).join(",")}
  ]));
  return w.bytes();
}
  `;
}

function printDecodeHeaderFunction(
  clazz: ClassDefinition
) {
  const name = `decode${pascalCase(clazz.name)}Header`;
  return `
function ${name}(r: Deno.SyncReader): Extract<Header, { classId: ${clazz.id} }> {
  const weight = enc.decodeShortUint(r);
  const size = enc.decodeLongLongUint(r); 
  const fields = enc.decodeOptionalFields(r, [${(clazz.properties || []).map(
    p => '"' + p.type + '"'
  ).join(",")}]);
  const props = { ${(clazz.properties || []).map((p, i) =>
    `${camelCase(p.name)}: fields[${i}] as ${resolveTypescriptType(p.type)}`
  ).join(",")}};

  return { classId: ${clazz.id}, size, props };
}
  `;
}

function printHeaderEncoder(spec: Spec) {
  return `
export function encodeHeader(header: Header) : Uint8Array {
  switch(header.classId) {
    ${spec.classes.map(clazz => {
    return `case ${clazz.id}: return encode${pascalCase(
      clazz.name
    )}Header(header);`;
  }).join("\n")}
    default:
      throw new Error("Unknown class " + header!.classId);
  }
}
  `;
}

function printHeaderDecoder(spec: Spec) {
  return `
export function decodeHeader(data: Uint8Array) : Header {
  const r = new Deno.Buffer(data);
  const classId = enc.decodeShortUint(r);
  switch(classId) {
    ${spec.classes.map(clazz => {
    return `case ${clazz.id}: return decode${pascalCase(
      clazz.name
    )}Header(r);`;
  }).join("\n")}
    default:
      throw new Error("Unknown class " + classId);
  }
}
  `;
}

function generateConnection() {
  return [
    disclaimer,
    'import * as enc from "../encoding/mod.ts"',
    'import { Header } from "../amqp_types.ts"',
    ...spec.classes.flatMap(printEncodeHeaderFunction),
    ...spec.classes.flatMap(printDecodeHeaderFunction),
    printHeaderEncoder(spec),
    printHeaderDecoder(spec)
  ].join("\n");
}

const encoder = new TextEncoder();
const result = encoder.encode(generateConnection());

writeFileSync(`./encoding/header_encoding.ts`, result);
