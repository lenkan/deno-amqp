interface Spec {
  classes: ClassDefinition[];
  domains: [string, string];
  constants: { name: string; value: number; class: string; }[];
}

interface ClassDefinition {
  id: number;
  methods: MethodDefinition[];
  name: string;
  properties?: PropertyDefinition[];
}

interface MethodDefinition {
  id: number;
  arguments: ArgumentDefinition[];
  synchronous: boolean;
  response?: string;
  name: string;
  content: boolean;
}

interface PropertyDefinition {
  type: string;
  name: string;
}

interface ArgumentDefinition {
  type?: string;
  domain?: string;
  name: string;
  ["default-value"]: string | number | boolean | object;
}

function resolveType(spec: Spec, arg: ArgumentDefinition) {
  if (arg.type !== undefined) {
    return arg.type;
  }
  if (arg.domain !== undefined) {
    const domain = spec.domains.find(d => d[0] === arg.domain);
    return domain![1];
  }
  throw new Error(`Cannot determine type ${arg}`);
}

function capitalize(word: string) {
  const first = word.charAt(0).toUpperCase();
  const rest = word.slice(1, word.length);
  return first + rest;
}

function camelCase(name: string) {
  const [first, ...rest] = name.split(/[-\.]/g);
  return first + rest.map(capitalize).join("");
}

function pascalCase(name: string) {
  return name
    .split(/[-\.]/g)
    .map(capitalize)
    .join("");
}

function resolveTypescriptType(type: string) {
  switch (type) {
    case "longlong":
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
      return "Uint8Array";
    default:
      throw new Error(`Unknown type '${type}'`);
  }
}

const { args, readFileSync, writeFileSync } = Deno;
const decoder = new TextDecoder("utf-8");
const spec = JSON.parse(decoder.decode(readFileSync(args[0]))) as Spec;

function constantName(name: string) {
  return name.replace(/-/g, "_").toUpperCase();
}

function generateArgFields(method: MethodDefinition) {
  return `[
   ${method.arguments.map(argument => {
    const type = resolveType(spec, argument);
    if (argument["default-value"] !== undefined) {
      const value = `args.${camelCase(
        argument.name
      )} !== undefined ? args.${camelCase(argument.name)} : ${JSON.stringify(
        argument["default-value"]
      )}`;
      return `{ type: "${type}", value: ${value} }`;
    }
    return `{ type: "${type}", value: args.${camelCase(argument.name)} }`;
  })}
]`;
}

function generatePropsFields(clazz: ClassDefinition) {
  return `[
                ${clazz.properties!.map(prop => {
    return `{ type: "${prop.type}", value: props.${camelCase(
      prop.name
    )} }`;
  })}
    ]`;
}

function generateArgsDecoder(method: MethodDefinition) {
  return `decodeFields(response.args, [${method.arguments.map(
    arg => `"${resolveType(spec, arg)}"`
  ).join(",")}])`;
}

function printMethodSpec(clazz: ClassDefinition, method: MethodDefinition) {
  const varName = `${camelCase(clazz.name)}${pascalCase(method.name)}`;
  const argsName = `${pascalCase(clazz.name)}${pascalCase(method.name)}Args`;
  const typeName = `${pascalCase(clazz.name)}${pascalCase(method.name)}`;
  const printArg = (a: ArgumentDefinition) => {
    const type = resolveType(spec, a);
    const name = camelCase(a.name);
    if (a["default-value"] !== undefined) {
      const defaultValue = JSON.stringify(a["default-value"]);
      return `{ type: "${type}", name: "${name}", defaultValue: ${defaultValue} }`;
    }
    return `{ type: "${type}", name: "${name}" }`;
  };
  return `
      export const ${varName} : MethodDefinition<${typeName}, ${argsName}> = {
        classId: ${clazz.id},
        methodId: ${method.id},
        args: [${method.arguments.map(printArg).join(",")}],
        synchronous: ${!!method.synchronous},
        content: ${!!method.content}
      }
    `;
}

function printClassPropertyInterface(clazz: ClassDefinition) {
  return `
  export interface ${pascalCase(clazz.name)}Properties {
    ${(clazz.properties || []).map(prop => {
    return `${camelCase(prop.name)}?: ${resolveTypescriptType(prop.type)}`;
  }).join("\n")}
  }
`;
}

function printMethodArgsInterface(
  clazz: ClassDefinition,
  method: MethodDefinition
) {
  return `
export interface ${pascalCase(clazz.name)}${pascalCase(method.name)}Args {
    ${method.arguments.map(arg => {
    const isOptional = arg["default-value"] !== undefined;
    const type = resolveTypescriptType(resolveType(spec, arg));
    return `${camelCase(arg.name)}${isOptional ? "?" : ""}: ${type};`;
  }).join("\n")}
}
    `;
}

function printMethodValueInterface(
  clazz: ClassDefinition,
  method: MethodDefinition
) {
  return `
export interface ${pascalCase(clazz.name)}${pascalCase(method.name)} {
    ${method.arguments.map(arg => {
    const type = resolveTypescriptType(resolveType(spec, arg));
    return `${camelCase(arg.name)}: ${type};`;
  }).join("\n")}
}
    `;
}

function printClassSpec(clazz: ClassDefinition) {
  const varName = `${camelCase(clazz.name)}`;
  const propsName = `${pascalCase(clazz.name)}Properties`;
  const printArg = (p: PropertyDefinition) => {
    const type = p.type;
    const name = camelCase(p.name);
    return `{ type: "${type}", name: "${name}" }`;
  };
  return `
      export const ${varName} : ClassDefinition<${propsName}> = {
        classId: ${clazz.id},
        props: [${(clazz.properties || []).map(printArg).join(",")}],
      }
    `;
}

function generateConnection() {
  const connection = `
${spec.classes.map(printClassPropertyInterface).join("\n")}

${spec.classes.flatMap(
    clazz => clazz.methods.map(m => printMethodArgsInterface(clazz, m))
  ).join("\n")}
${spec.classes.flatMap(
    clazz => clazz.methods.map(m => printMethodValueInterface(clazz, m))
  ).join("\n")}

${spec.classes.map(printClassSpec).join("\n")}
${spec.classes.flatMap(
    clazz => clazz.methods.map(m => printMethodSpec(clazz, m))
  ).join("\n")}
`;

  return [
    'import { MethodDefinition, ClassDefinition } from "./framing/socket.ts"',
    connection
  ].join("\n");
}

const encoder = new TextEncoder();
const result = encoder.encode(generateConnection());

writeFileSync(`./amqp_definitions.ts`, result);
