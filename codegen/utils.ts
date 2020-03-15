export interface Spec {
  classes: ClassDefinition[];
  domains: [string, string];
  constants: { name: string; value: number; class: string }[];
}

export interface ClassDefinition {
  id: number;
  methods: MethodDefinition[];
  name: string;
  properties?: PropertyDefinition[];
}

export interface MethodDefinition {
  id: number;
  arguments: ArgumentDefinition[];
  synchronous: boolean;
  response?: string;
  name: string;
  content: boolean;
}

export interface PropertyDefinition {
  type: string;
  name: string;
}

export interface ArgumentDefinition {
  type?: string;
  domain?: string;
  name: string;
  ["default-value"]: string | number | boolean | object;
}

export function resolveType(spec: Spec, arg: ArgumentDefinition) {
  if (arg.type !== undefined) {
    return arg.type;
  }
  if (arg.domain !== undefined) {
    const domain = spec.domains.find(d => d[0] === arg.domain);
    return domain![1];
  }
  throw new Error(`Cannot determine type ${arg}`);
}

export function capitalize(word: string) {
  const first = word.charAt(0).toUpperCase();
  const rest = word.slice(1, word.length);
  return first + rest;
}

export function camelCase(name: string) {
  const [first, ...rest] = name.split(/[-\.]/g);
  return first + rest.map(capitalize).join("");
}

export function pascalCase(name: string) {
  return name
    .split(/[-\.]/g)
    .map(capitalize)
    .join("");
}

export function resolveTypescriptType(type: string) {
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

export function constantName(name: string) {
  return name.replace(/-/g, "_").toUpperCase();
}

export function printClassPropertyInterface(clazz: ClassDefinition) {
  return `
  export interface ${pascalCase(clazz.name)}Properties {
    ${(clazz.properties || []).map(prop => {
    return `${camelCase(prop.name)}?: ${resolveTypescriptType(prop.type)}`;
  }).join("\n")}
  }
`;
}

export function printMethodArgsInterface(
  spec: Spec,
  clazz: ClassDefinition,
  method: MethodDefinition
) {
  const name = `${pascalCase(clazz.name)}${pascalCase(
    method.name
  )}Args`;
  return `
export interface ${name} {
    ${method.arguments.map(arg => {
    const isOptional = arg["default-value"] !== undefined;
    const comment = isOptional
      ? `/** Default ${JSON.stringify(arg["default-value"])} */`
      : "";
    const type = resolveTypescriptType(resolveType(spec, arg));
    return `${comment}${camelCase(arg.name)}${isOptional
      ? "?"
      : ""}: ${type};`;
  }).join("\n")}
}
    `;
}

export function printMethodValueInterface(
  spec: Spec,
  clazz: ClassDefinition,
  method: MethodDefinition
) {
  const name = `${pascalCase(clazz.name)}${pascalCase(method.name)}`;
  return `
export interface ${name} extends ${name}Args {
    ${method.arguments.map(arg => {
    const type = resolveTypescriptType(resolveType(spec, arg));
    return `${camelCase(arg.name)}: ${type};`;
  }).join("\n")}
}
    `;
}
