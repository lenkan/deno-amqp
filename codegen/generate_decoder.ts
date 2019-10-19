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

function resolveArgShape(args: ArgumentDefinition[]) {
  return `{ ${args
    .map(arg => {
      return `["${arg.name}"]: ${resolveArgumentType(arg)}`;
    })
    .join(";")} }`;
}

function generateDecodeMethod() {
  return `
import { createDecoder } from "./decoder.ts"

export type MethodArgs = {
  ${methods
    .map(method => `["${method.name}"]: ${resolveArgShape(method.arguments)}`)
    .join(";")}
}

export type MethodPayload = ${methods
    .map(method => {
      return `{ name: "${method.name}", args: MethodArgs["${method.name}"] }`;
    })
    .join(" | ")}

export function decodeMethodPayload(classId: number, methodId: number, data: Uint8Array): MethodPayload {
  ${methods
    .map(method => {
      return `
        if(classId === ${method.classId} && methodId === ${method.id}) {
          const decoder = createDecoder(data);
          return {
            name: "${method.name}",
            args: {
              ${method.arguments.map(argument => {
                const name = `["${argument.name}"]`;
                switch (resolveType(argument)) {
                  case "table":
                    return `${name}: decoder.decodeTable()`;
                  case "longstr":
                    return `${name}: decoder.decodeLongString()`;
                  case "shortstr":
                    return `${name}: decoder.decodeShortString()`;
                  case "octet":
                    return `${name}: decoder.decodeOctet()`;
                  case "short":
                    return `${name}: decoder.decodeShortUint()`;
                  case "long":
                    return `${name}: decoder.decodeLongUint()`;
                  case "bit":
                    return `${name}: decoder.decodeBit()`;
                  case "longlong":
                    return `${name}: decoder.decodeLongLongUint()`;
                  default:
                    throw new Error(`Cannot decode ${resolveType(argument)}`);
                }
              })}
            }
          }
        }
        `;
    })
    .join("")}
    }
    `;
}

const encoder = new TextEncoder();
const result = encoder.encode(generateDecodeMethod());
writeFileSync("framing/method_decoder.ts", result);
