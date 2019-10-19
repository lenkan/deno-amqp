export interface Spec {
  classes: ClassDefinition[];
  domains: [string, string];
  constants: { name: string; value: number; class: string }[];
}

export interface ClassDefinition {
  id: number;
  methods: MethodDefinition[];
  name: string;
}

export interface MethodDefinition {
  id: number;
  arguments: ArgumentDefinition[];
  synchronous?: boolean;
  name: string;
}

export interface ArgumentDefinition {
  type?: string;
  domain?: string;
  name: string;
  ["default-value"]: string | number | boolean | object;
}

export function flattenMethods(spec: Spec) {
  const methods = spec.classes.reduce<
    (MethodDefinition & {
      classId: number;
      className: string;
      methodName: string;
      fullName: string;
    })[]
  >((methods, clazz) => {
    return [
      ...methods,
      ...clazz.methods.map(m => ({
        ...m,
        classId: clazz.id,
        className: clazz.name,
        methodName: m.name,
        fullName: `${clazz.name}.${m.name}`
      }))
    ];
  }, []);
  return methods;
}

export function resolveArgumentType(spec: Spec, arg: ArgumentDefinition) {
  let type = resolveType(spec, arg);
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

export function resolveType(spec: Spec, arg: ArgumentDefinition) {
  if (arg.type !== undefined) {
    return arg.type;
  }
  if (arg.domain !== undefined) {
    const domain = spec.domains.find(d => d[0] === arg.domain);
    return domain[1];
  }
  throw new Error(`Cannot determine type ${arg}`);
}
