import {
  MethodDefinition,
  Spec,
  resolveType,
  camelCase,
  ClassDefinition,
  printMethodArgsInterface,
  printMethodValueInterface as printMethodPayloadInterface,
  printClassPropertyInterface,
  pascalCase,
  constantName,
  ArgumentDefinition
} from "./utils.ts";

const { args, readFileSync, writeFileSync } = Deno;
const decoder = new TextDecoder("utf-8");
const spec = JSON.parse(decoder.decode(readFileSync(args[0]))) as Spec;

function printMethodDefinition(
  clazz: ClassDefinition,
  method: MethodDefinition
) {
  return `
  export interface ${pascalCase(clazz.name)}${pascalCase(
    method.name
  )} {
    classId: ${clazz.id};
    methodId: ${method.id};
    payload: ${pascalCase(clazz.name)}${pascalCase(method.name)}Payload;
  }
  `;
}

function printClassDefinition(
  clazz: ClassDefinition
) {
  return `
  export interface ${pascalCase(clazz.name)}Header {
    classId: ${clazz.id};
    weight: number;
    size: number;
    props: ${pascalCase(clazz.name)}Properties;
  }`;
}

function printMethodArgsEncoding(
  method: MethodDefinition
) {
  return `writer.writeSync(enc.encodeFields([
    ${method.arguments.map(arg => {
    const type = resolveType(spec, arg);
    const name = camelCase(arg.name);
    return `{ type: "${type}", value: method.payload.${name} }`;
  }).join(",")}
  ]));`;
}

function printMethodDecoding(
  clazz: ClassDefinition,
  method: MethodDefinition
) {
  return `
  const fields = enc.decodeFields(r, [${method.arguments.map(a =>
    '"' + resolveType(spec, a) + '"'
  ).join(",")}]);
  const payload = { ${method.arguments.map((a, i) =>
    `${camelCase(a.name)}: fields[${i}].value`
  ).join(",")}}
  return { classId: ${clazz.id}, methodId: ${method.id}, payload }
  `;
}

function printHeaderEncoding(
  clazz: ClassDefinition
) {
  return `writer.writeSync(enc.encodeProperties([
    ${(clazz.properties || []).map(prop => {
    const name = camelCase(prop.name);
    return `{ type: "${prop.type}", value: header.props.${name} }`;
  }).join(",")}
  ]));`;
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

  return { weight, classId, props, size };
  `;
}

function printMethodEncoder(spec: Spec) {
  return `
export function encodeMethod(method: Method) : Uint8Array {
  const writer = new Deno.Buffer();
  writer.writeSync(enc.encodeShortUint(method.classId));
  writer.writeSync(enc.encodeShortUint(method.methodId));
  switch(method.classId) {
    ${spec.classes.map(clazz => {
    return `
      case ${clazz.id}: { 
        switch(method.methodId) {
          ${clazz.methods.map(method => {
      return `case ${method.id}: ${printMethodArgsEncoding(method)}; break;`;
    }).join("\n")}
        }
      }
      break;
     `;
  }).join("\n")}
  }
  return writer.bytes();
}
  `;
}

function printMethodDecoder(spec: Spec) {
  return `
export function decodeMethod(r: Deno.SyncReader): Method {
  const classId = enc.decodeShortUint(r);
  const methodId = enc.decodeShortUint(r);
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
export function encodeHeader(header: Header) {
  const writer = new Deno.Buffer();
  writer.writeSync(enc.encodeShortUint(header.classId));
  writer.writeSync(enc.encodeShortUint(header.weight)); // weight
  writer.writeSync(enc.encodeLongUint(0)); // high byte size
  writer.writeSync(enc.encodeLongUint(header.size));

  switch(header.classId) {
    ${spec.classes.map(clazz => {
    return `case ${clazz.id}: { ${printHeaderEncoding(clazz)} }; break;`;
  }).join("\n")}
  }
  return writer.bytes();
}
  `;
}

function printPropsDecoder(spec: Spec) {
  return `
export function decodeHeader(r: Deno.SyncReader) : Header {
  const classId = enc.decodeShortUint(r);
  const weight = enc.decodeShortUint(r);
  enc.decodeLongUint(r); // size high bytes
  const size = enc.decodeLongUint(r);
  switch(classId) {
    ${spec.classes.map(clazz => {
    return `case ${clazz.id}: { ${printHeaderDecoding(clazz)} };`;
  }).join("\n")}
  }

  throw new Error(\`Unknown class \${classId}\`);
}
  `;
}

function printHeaderUnion(spec: Spec) {
  return `
  export type Header = ${spec.classes.map(c => `${pascalCase(c.name)}Header`)
    .join(" | ")}
 `;
}

function printMethodUnion(spec: Spec) {
  return `
  export type Method = ${spec.classes.flatMap(c =>
    c.methods.map(m => `${pascalCase(c.name)}${pascalCase(m.name)}`)
  ).join(" | ")}
 `;
}

function printArgDefault(arg: ArgumentDefinition) {
  const argName = camelCase(arg.name);
  const argValue = `args.${argName}`;
  const defaultValue = arg["default-value"] !== undefined
    ? JSON.stringify(arg["default-value"])
    : undefined;
  if (arg["default-value"] !== undefined) {
    return `${argName}: ${argValue} !== undefined ? ${argValue} : ${defaultValue}`;
  }

  return `${argName}: ${argValue}`;
}

function printMethodBuilder(spec: Spec) {
  return `
  export const methods = {
    ${spec.classes.map(clazz => {
    return `
        ${camelCase(clazz.name)}: {
          ${clazz.methods.map(method => {
      const argsName = `${pascalCase(clazz.name)}${pascalCase(
        method.name
      )}Args`;
      const methodName = `${pascalCase(clazz.name)}${pascalCase(
        method.name
      )}`;
      return `
              ${camelCase(method.name)}(args: ${argsName}) : ${methodName} {
                return { classId: ${clazz.id}, methodId: ${method.id}, payload: { ${method
        .arguments.map(printArgDefault).join(",\n")} } }
              },
            `;
    }).join("\n")}
        },
      `;
  }).join("\n")}
  }
  `;
}

function printHasContentFunction(spec: Spec) {
  return `
  export function hasContent(m: Method) {
    switch (m.classId) {
      ${spec.classes.map(clazz => {
    return `
        case ${clazz.id}:
          switch (m.methodId) {
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
    'import * as enc from "./encoder.ts"',
    ...spec.classes.map(c => `export const ${constantName(c.name)} = ${c.id}`),
    ...spec.classes.flatMap(c =>
      c.methods.map(m =>
        `export const ${constantName(c.name + "_" + m.name)} = ${m.id}`
      )
    ),
    ...spec.classes.map(printClassPropertyInterface),
    ...spec.classes.flatMap(clazz =>
      clazz.methods.map(m => printMethodArgsInterface(spec, clazz, m))
    ),
    ...spec.classes.flatMap(clazz =>
      clazz.methods.map(m => printMethodPayloadInterface(spec, clazz, m))
    ),
    ...spec.classes.flatMap(clazz =>
      clazz.methods.map(m => printMethodDefinition(clazz, m))
    ),
    ...spec.classes.map(printClassDefinition),
    printMethodBuilder(spec),
    printHeaderUnion(spec),
    printMethodUnion(spec),
    printMethodEncoder(spec),
    printMethodDecoder(spec),
    printHeaderEncoder(spec),
    printPropsDecoder(spec),
    printHasContentFunction(spec)
  ].join("\n");
}

const encoder = new TextEncoder();
const result = encoder.encode(generateConnection());

writeFileSync(`./framing/methods.ts`, result);
