interface Spec {
  classes: ClassDefinition[];
  domains: [string, string];
  constants: { name: string; value: number; class: string };
}

interface ClassDefinition {
  id: number;
  methods: MethodDefinition[];
  name: string;
}

interface MethodDefinition {
  id: number;
  arguments: ArgumentDefinition[];
  synchronous?: boolean;
  name: string;
}

interface ArgumentDefinition {
  type?: string;
  domain?: string;
  name: string;
  ["default-value"]: string | number | boolean | object;
}

const { args, readFileSync, writeFileSync } = Deno;
const decoder = new TextDecoder("utf-8");
const spec = JSON.parse(decoder.decode(readFileSync(args[1]))) as Spec;

const methods = spec.classes.reduce<(MethodDefinition & { classId: number })[]>(
  (methods, clazz) => {
    return [
      ...methods,
      ...clazz.methods.map(m => ({
        ...m,
        classId: clazz.id,
        name: `${clazz.name}.${m.name}`
      }))
    ];
  },
  []
);

function resolveArgumentType(arg: ArgumentDefinition) {
  let type = resolveType(arg);
  switch (type) {
    case "table":
      return `Record<string, any>`;
    case "longstr":
    case "shortstr":
      return `string`;
    case "octet":
    case "short":
    case "long":
      return `number`;
    case "bit":
      return `boolean`;
    case "longlong":
      return `Uint8Array`;
  }
  throw new Error(`Cannot determine type ${arg}`);
}

function resolveType(arg: ArgumentDefinition) {
  if (arg.type !== undefined) {
    return arg.type;
  }
  if (arg.domain !== undefined) {
    const domain = spec.domains.find(d => d[0] === arg.domain);
    return domain[1];
  }
  throw new Error(`Cannot determine type ${arg}`);
}

function resolveArgShape(
  args: ArgumentDefinition[],
  readOnly: boolean = false
) {
  return `{ ${args
    .map(arg => {
      const comment =
        arg["default-value"] !== undefined
          ? `default: ${JSON.stringify(arg["default-value"])}`
          : "";
      const optional = !readOnly && arg["default-value"] !== undefined;
      return `/** ${comment} */ ["${arg.name}"]${
        optional ? "?" : ""
      }: ${resolveArgumentType(arg)}`;
    })
    .join(";")} }`;
}

function resolveValue(arg: ArgumentDefinition) {
  if (arg["default-value"] !== undefined) {
    return `args["${arg.name}"] !== undefined ? args["${
      arg.name
    }"] : ${JSON.stringify(arg["default-value"])}`;
  }
  return `args["${arg.name}"]`;
}

function generateEncodeMethod() {
  return `
import { createEncoder } from "./encoder.ts"

export type MethodArgs = {
  ${methods
    .map(method => {
      return `["${method.name}"]: ${resolveArgShape(method.arguments)}`;
    })
    .join(";")}
}

export type MethodPayload = ${methods
    .map(method => {
      return `{ name: "${method.name}", args: MethodArgs["${method.name}"] }`;
    })
    .join(" | ")}

export function encodeMethodPayload(payload: MethodPayload): Uint8Array {
  const { name, args } = payload;
  ${methods
    .map(method => {
      return `
        if(name === "${method.name}") {
          const encoder = createEncoder();
          encoder.encodeShortUint(${method.classId});
          encoder.encodeShortUint(${method.id});
          ${method.arguments
            .map(argument => {
              const value = resolveValue(argument);
              switch (resolveType(argument)) {
                case "table":
                  return `encoder.encodeTable(${value})`;
                case "longstr":
                  return `encoder.encodeLongString(${value})`;
                case "shortstr":
                  return `encoder.encodeShortString(${value})`;
                case "octet":
                  return `encoder.encodeOctet(${value})`;
                case "short":
                  return `encoder.encodeShortUint(${value})`;
                case "long":
                  return `encoder.encodeLongUint(${value})`;
                case "bit":
                  return `encoder.encodeBit(${value})`;
                case "longlong":
                  return `encoder.encodeLongLongUint(${value})`;
                default:
                  throw new Error(`Cannot encode ${resolveType(argument)}`);
              }
            })
            .join("\n")}
          return encoder.bytes();
        }
        `;
    })
    .join("")}
    }
    `;
}

const encoder = new TextEncoder();
const result = encoder.encode(generateEncodeMethod());

writeFileSync("framing/method_encoder.ts", result);
