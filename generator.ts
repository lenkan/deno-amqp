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
        const properties = [
          `classId: ${clazz.id}`,
          `methodId: ${method.id}`,
          ...method.arguments.map(arg => {
            return `["${arg.name}"]: any`;
          })
        ];
        result.push(`{ ${properties.join(";")} }`);
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
      return `method["${arg.name}"] !== undefined ? method["${
        arg.name
      }"] : ${JSON.stringify(arg["default-value"])}`;
    }
    return `method["${arg.name}"]`;
  }

  return `
function encodeMethod(method: Method): MethodFrame {
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
              }
            })
            .join("\n")}
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

const encoder = new TextEncoder();
const imports = [
  `import { createEncoder } from "./encoder"`,
  `import { createDecoder } from "./decoder"`
].join("\n");

writeFileSync("output.ts", encoder.encode(imports + interfaces + encodeMethod));
