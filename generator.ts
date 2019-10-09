interface Spec {
  classes: ClassDefinition[];
  domains: [string, string];
  constants: { name: string; value: number; class: string };
}

interface ClassDefinition {
  id: number;
  methods: MethodDefinition[];
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

function generateMethodInterface(spec: Spec) {
  return `
export type Method = ${spec.classes
    .reduce<string[]>((result, clazz) => {
      for (const method of clazz.methods) {
        const properties = `
        {
          type: 1;
          channel: number;
          name: "${method.name}";
          classId: ${clazz.id};
          methodId: ${method.id};
          args: {
          ${method.arguments
            .map(arg => {
              return `["${arg.name}"]: any`;
            })
            .join(";")}
          }
        }
        `;
        result.push(properties); //`{ ${properties.("")} }`);
      }
      return result;
    }, [])
    .join(" | ")}
`;
}

function generateEncodeMethod(spec: Spec) {
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

  function resolveValue(arg: ArgumentDefinition) {
    if (arg["default-value"] !== undefined) {
      return `method.args["${arg.name}"] !== undefined ? method.args["${
        arg.name
      }"] : ${JSON.stringify(arg["default-value"])}`;
    }
    return `method.args["${arg.name}"]`;
  }

  return `
export function encodeMethodPayload(method: Method): Uint8Array {
  ${spec.classes
    .map(clazz => {
      return `
    if(method.classId === ${clazz.id}) {
      ${clazz.methods
        .map(method => {
          return `
        if(method.methodId === ${method.id}) {
          const encoder = createEncoder();
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
    })
    .join("")}
}
`;
}

function resolveType(domains: Spec["domains"], arg: ArgumentDefinition) {
  if (arg.type !== undefined) {
    return arg.type;
  }
  if (arg.domain !== undefined) {
    const domain = domains.find(d => d[0] === arg.domain);
    return domain[1];
  }
  throw new Error(`Cannot determine type ${arg}`);
}

function generateDecodeMethod(spec: Spec) {
  function resolveParameter(arg: ArgumentDefinition) {
    if (arg["default-value"] !== undefined) {
      return `method.args["${arg.name}"] !== undefined ? method.args["${
        arg.name
      }"] : ${JSON.stringify(arg["default-value"])}`;
    }
    return `method.args["${arg.name}"]`;
  }

  return `
export function decodeMethodPayload(channel: number, classId: number, methodId: number, data: Uint8Array): Method {
  ${spec.classes
    .map(clazz => {
      return `
    if(classId === ${clazz.id}) {
      ${clazz.methods
        .map(method => {
          return `
        if(methodId === ${method.id}) {
          const decoder = createDecoder(data);
          return {
            type: 1,
            name: "${method.name}",
            classId,
            methodId,
            channel,
            args: {
              ${method.arguments.map(argument => {
                const name = `["${argument.name}"]`;
                switch (resolveType(spec.domains, argument)) {
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
                    throw new Error(`Cannot decode ${resolveType(spec.domains, argument)}`);
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
    })
    .join("")}
}
`;
}

const { args, readFileSync, writeFileSync } = Deno;
const decoder = new TextDecoder("utf-8");
const amqpSpec = JSON.parse(decoder.decode(readFileSync(args[1])));

const interfaces = generateMethodInterface(amqpSpec);
const encodeMethod = generateEncodeMethod(amqpSpec);
const decodeMethod = generateDecodeMethod(amqpSpec);

const encoder = new TextEncoder();
const imports = [
  `import { createEncoder } from "./encoder.ts"`,
  `import { createDecoder } from "./decoder.ts"`
].join("\n");

writeFileSync(
  "output.ts",
  encoder.encode(imports + interfaces + encodeMethod + decodeMethod)
);
