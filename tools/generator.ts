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

function generateMethodInterface(spec: Spec) {
  const methods = flattenMethods(spec);
  return `
export type Method = ${methods
    .map(method => {
      const properties = `
        {
          type: "method";
          channel: number;
          name: "${method.name}";
          args: {
          ${method.arguments
            .map(arg => {
              return `["${arg.name}"]: any`;
            })
            .join(";")}
          }
        }
        `;
      return properties;
    })
    .join(" | ")}
`;
}

function flattenMethods(spec: Spec) {
  const methods = spec.classes.reduce<
    (MethodDefinition & { classId: number })[]
  >((methods, clazz) => {
    return [
      ...methods,
      ...clazz.methods.map(m => ({
        ...m,
        classId: clazz.id,
        name: `${clazz.name}.${m.name}`
      }))
    ];
  }, []);
  return methods;
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

  const methods = flattenMethods(spec);

  return `
export function encodeMethodPayload(method: Method): Uint8Array {
  ${methods
    .map(method => {
      return `
        if(method.name === "${method.name}") {
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
  const methods = flattenMethods(spec);

  return `
export function decodeMethodPayload(channel: number, classId: number, methodId: number, data: Uint8Array): Method {
  ${methods
    .map(method => {
      return `
        if(classId === ${method.classId} && methodId === ${method.id}) {
          const decoder = createDecoder(data);
          return {
            type: "method",
            name: "${method.name}",
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
                    throw new Error(
                      `Cannot decode ${resolveType(spec.domains, argument)}`
                    );
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
  "framing/methods.ts",
  encoder.encode(imports + interfaces + encodeMethod + decodeMethod)
);
