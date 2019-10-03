interface Spec {
  classes: ClassDefinition[];
  domains: [string, string];
  constants: { name: string; value: number, class: string };
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
  ["default-value"]: string | number | boolean | object;
}

function generateEncodeMethod(methodDefinition) {}
