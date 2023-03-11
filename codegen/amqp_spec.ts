import spec from "./amqp-rabbitmq-0.9.1.json" assert { type: "json" };

export interface Spec {
  classes: ClassDefinition[];
  domains: string[][];
  constants: ConstantDefinition[];
}

export interface ConstantDefinition {
  name: string;
  value: number;
  class?: string;
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
  synchronous?: boolean;
  response?: string;
  name: string;
  content?: boolean;
}

export interface PropertyDefinition {
  type: string;
  name: string;
}

export interface ArgumentDefinition {
  type?: string;
  domain?: string;
  name: string;
  ["default-value"]?: string | number | boolean | Record<string, unknown>;
}

export default spec as Spec;
