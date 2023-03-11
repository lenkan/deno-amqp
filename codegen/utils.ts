import { ArgumentDefinition, ClassDefinition, MethodDefinition, Spec } from "./amqp_spec.ts";

export function resolveType(spec: Spec, arg: ArgumentDefinition) {
  if (arg.type !== undefined) {
    return arg.type;
  }
  if (arg.domain !== undefined) {
    const domain = spec.domains.find((d) => d[0] === arg.domain);
    return domain![1];
  }
  throw new Error(`Cannot determine type ${arg}`);
}

export function capitalize(word: string) {
  const first = word.charAt(0).toUpperCase();
  const rest = word.slice(1, word.length);
  return first + rest;
}

export function camelCase(...names: string[]) {
  const [first, ...rest] = names.join("-").split(/[-\.]/g);
  return first + rest.map(capitalize).join("");
}

export function pascalCase(...names: string[]) {
  return names.join("-")
    .split(/[-\.]/g)
    .map(capitalize)
    .join("");
}

export function resolveTypescriptType(type: string) {
  switch (type) {
    case "longlong":
      return "number";
    case "long":
    case "short":
    case "octet":
      return "number";
    case "bit":
      return "boolean";
    case "shortstr":
    case "longstr":
      return "string";
    case "table":
      return "Record<string, unknown>";
    case "timestamp":
      return "number";
    default:
      throw new Error(`Unknown type '${type}'`);
  }
}

export function resolveEncoderType(type: string) {
  switch (type) {
    case "longlong":
    case "timestamp":
      return "uint64";
    case "long":
      return "uint32";
    case "short":
      return "uint16";
    case "octet":
      return "uint8";
    case "bit":
      return "bit";
    case "shortstr":
    case "longstr":
    case "table":
      return type;
    default:
      throw new Error(`Unknown type '${type}'`);
  }
}

export function constantName(...names: string[]) {
  return names.join("-").replace(/-/g, "_").toUpperCase();
}

export function printClassPropertyInterface(clazz: ClassDefinition) {
  return `
  export interface ${pascalCase(clazz.name)}Properties {
    ${
    (clazz.properties || []).map((prop) => {
      return `${camelCase(prop.name)}?: ${resolveTypescriptType(prop.type)}`;
    }).join("\n")
  }
  }
`;
}

export function printMethodArgsInterface(
  spec: Spec,
  clazz: ClassDefinition,
  method: MethodDefinition,
) {
  const name = `${pascalCase(clazz.name)}${
    pascalCase(
      method.name,
    )
  }Args`;
  return `
export interface ${name} {
    ${
    method.arguments.filter((arg) => arg.name !== "nowait").map((arg) => {
      const isOptional = arg["default-value"] !== undefined;
      const comment = isOptional ? `/** Default ${JSON.stringify(arg["default-value"])} */` : "";
      const type = resolveTypescriptType(resolveType(spec, arg));
      return `${comment}${camelCase(arg.name)}${isOptional ? "?" : ""}: ${type};`;
    }).join("\n")
  }
}
    `;
}

export function printMethodValueInterface(
  spec: Spec,
  clazz: ClassDefinition,
  method: MethodDefinition,
) {
  const name = `${pascalCase(clazz.name)}${pascalCase(method.name)}`;
  return `
export interface ${name} extends ${name}Args {
    ${
    method.arguments.map((arg) => {
      const type = resolveTypescriptType(resolveType(spec, arg));
      return `${camelCase(arg.name)}: ${type};`;
    }).join("\n")
  }
}
    `;
}

export function printReceiveMethodDefinition(
  clazz: ClassDefinition,
  method: MethodDefinition,
) {
  return `
  export interface Receive${pascalCase(clazz.name)}${
    pascalCase(
      method.name,
    )
  } {
    classId: ${clazz.id};
    methodId: ${method.id};
    args: t.${pascalCase(clazz.name)}${pascalCase(method.name)};
  }
  `;
}

export function printSendMethodDefinition(
  clazz: ClassDefinition,
  method: MethodDefinition,
) {
  const hasNowait = !!method.arguments.find((arg) => arg.name === "nowait");
  const argsName = `t.${pascalCase(clazz.name)}${pascalCase(method.name)}Args`;
  const argsType = hasNowait ? `WithNowait<${argsName}>` : argsName;
  return `
  export interface Send${pascalCase(clazz.name)}${
    pascalCase(
      method.name,
    )
  } {
    classId: ${clazz.id};
    methodId: ${method.id};
    args: ${argsType};
  }
  `;
}

export function printSendMethodUnion(spec: Spec) {
  return `export type SendMethod = ${
    spec.classes.flatMap((c) => c.methods.map((m) => `Send${pascalCase(c.name)}${pascalCase(m.name)}`)).join(" | ")
  }`;
}

export function printReceiveMethodUnion(spec: Spec) {
  return `export type ReceiveMethod = ${
    spec.classes.flatMap((c) => c.methods.map((m) => `Receive${pascalCase(c.name)}${pascalCase(m.name)}`)).join(" | ")
  }`;
}

export function printHeaderDefinition(
  clazz: ClassDefinition,
) {
  return `
  export interface ${pascalCase(clazz.name)}Header {
    classId: ${clazz.id};
    props: t.${pascalCase(clazz.name)}Properties;
    size: number;
  }
  `;
}

export function printHeaderUnion(spec: Spec) {
  return `export type Header = ${spec.classes.map((c) => `${pascalCase(c.name)}Header`).join(" | ")}`;
}

export function getDefaultValue(a: ArgumentDefinition) {
  if (a["default-value"] === undefined) {
    return undefined;
  }

  return JSON.stringify(a["default-value"]);
}

export function printMethodEncode(spec: Spec, method: MethodDefinition) {
  return method.arguments.map((arg) => {
    const type = resolveEncoderType(resolveType(spec, arg));
    const name = camelCase(arg.name);
    const defaultValue = getDefaultValue(arg);
    const value = arg["default-value"] !== undefined
      ? `method.args.${name} !== undefined ? method.args.${name} : ${defaultValue}`
      : `method.args.${name}`;

    return `encoder.write("${type}", ${value})`;
  }).join(`\n`);
}

export function printMethodEncoder(spec: Spec) {
  return `
function encodeMethod(method: SendMethod): Uint8Array {
  const encoder = new enc.AmqpEncoder();
  encoder.write("uint16", method.classId);
  encoder.write("uint16", method.methodId);
  switch(method.classId) {
    ${
    spec.classes.map((clazz) => {
      return `
      case ${clazz.id}: { 
        switch(method.methodId) {
          ${
        clazz.methods.map((method) => {
          return `
          case ${method.id}:
            ${printMethodEncode(spec, method)}
            break;
          `;
        }).join("\n")
      }
          default:
            throw new Error("Unknown method " + (method as any).methodId + " for class '${clazz.name}'")
        }
        break;
      }
     `;
    }).join("\n")
  }
    default:
      throw new Error("Unknown class " + (method as any).classId);
  }
  return encoder.result();
}
  `;
}

export function printMethodDecoder(spec: Spec) {
  return `
function decodeMethod(data: Uint8Array): ReceiveMethod {
  const decoder = new enc.AmqpDecoder(data);
  const classId = decoder.read("uint16");
  const methodId = decoder.read("uint16");
  switch(classId) {
    ${
    spec.classes.map((clazz) => {
      return `
      case ${clazz.id}: { 
        switch(methodId) {
          ${
        clazz.methods.map((method) => {
          return `
          case ${method.id}: 
            return { 
              classId, 
              methodId, 
              args: {
                ${
            method.arguments.map((arg) => {
              const name = camelCase(arg.name);
              const type = resolveEncoderType(resolveType(spec, arg));
              return `${name}: decoder.read("${type}"),`;
            }).join("\n")
          }
              }
          };`;
        }).join("\n")
      }
          default:
            throw new Error("Unknown method " + methodId + " for class '${clazz.name}'")
        }
      }
     `;
    }).join("\n")
  }
    default:
      throw new Error("Unknown class " + classId);
  }
}
  `;
}

export function printEncodeHeader(
  clazz: ClassDefinition,
) {
  return `
  encoder.write("flags", [
    ${
    (clazz.properties || []).map((prop) => {
      const name = camelCase(prop.name);
      const type = resolveEncoderType(prop.type);
      if (type === "bit") {
        return `header.props.${name}`;
      } else {
        return `header.props.${name} !== undefined`;
      }
    }).join(",")
  }
  ]);

  ${
    (clazz.properties || []).map((prop) => {
      const name = camelCase(prop.name);
      const type = resolveEncoderType(prop.type);
      if (type === "bit") {
        return "";
      }

      return `
      if(header.props.${name} !== undefined) {
        encoder.write("${type}", header.props.${name});
      }
    `;
    }).join("\n")
  }
  `;
}

export function printHeaderEncoder(spec: Spec) {
  return `
function encodeHeader(header: Header) : Uint8Array {
  const encoder = new enc.AmqpEncoder();
  encoder.write("uint16", header.classId);
  encoder.write("uint16", 0);
  encoder.write("uint64", header.size);
  switch(header.classId) {
    ${
    spec.classes.map((clazz) => {
      return `case ${clazz.id}: 
        ${printEncodeHeader(clazz)}
         break;`;
    }).join("\n")
  }
    default:
      throw new Error("Unknown class " + (header as any).classId);
  }

  return encoder.result();
}
  `;
}

export function printHeaderDecoder(spec: Spec) {
  return `
function decodeHeader(data: Uint8Array) : Header {
  const decoder = new enc.AmqpDecoder(data);
  const classId = decoder.read("uint16");
  // weight unused
  decoder.read("uint16");
  const size = decoder.read("uint64");
  const flags = decoder.read("flags");
  switch(classId) {
    ${
    spec.classes.map((clazz) => {
      return `case ${clazz.id}: 
      return {
        classId,
        size,
        props: {
          ${
        (clazz.properties || []).map((prop, index) => {
          const name = camelCase(prop.name);
          const type = resolveEncoderType(prop.type);
          return `${name}: flags[${index}] ? decoder.read("${type}") : undefined`;
        }).join(",\n")
      }
        }
      };`;
    }).join("\n")
  }
    default:
      throw new Error("Unknown class " + classId);
  }
}
  `;
}

export const disclaimer = `
/**
 * This is a generated file
 */
`;

export function isServerMethod(
  clazz: ClassDefinition,
  method: MethodDefinition,
) {
  // https://www.rabbitmq.com/amqp-0-9-1-reference.html
  switch (clazz.name) {
    case "connection":
      return [
        "start",
        "tune",
        "secure",
        "close",
      ].includes(method.name);
    case "channel":
      return ["close", "flow"].includes(method.name);
    case "basic":
      return [
        "return",
        "deliver",
        "ack",
        "nack",
      ].includes(method.name);
    default:
      return false;
  }
}

export function isClientMethod(
  clazz: ClassDefinition,
  method: MethodDefinition,
) {
  // https://www.rabbitmq.com/amqp-0-9-1-reference.html
  switch (clazz.name) {
    case "connection":
      return [
        "open",
        "start-ok",
        "tune-ok",
        "secure-ok",
        "close",
        "close-ok",
      ].includes(method.name);
    case "channel":
      return [
        "open",
        "close",
        "close-ok",
        "flow",
      ].includes(method.name);
    case "exchange":
    case "queue":
      return true;
    case "basic":
      return [
        "qos",
        "consume",
        "cancel",
        "publish",
        "get",
        "ack",
        "reject",
        "nack",
        "recover-async",
        "recover",
      ].includes(method.name);
    case "tx":
      return [
        "select",
        "commit",
        "rollback",
      ].includes(method.name);
    case "confirm":
      return [
        "select",
      ].includes(method.name);
    default:
      return false;
  }
}
