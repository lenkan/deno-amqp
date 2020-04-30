import {
  MethodDefinition,
  Spec,
  ClassDefinition,
  pascalCase,
  isClientMethod,
  isServerMethod,
} from "./utils.ts";

const { args, readFileSync, writeFileSync } = Deno;
const decoder = new TextDecoder("utf-8");
const spec = JSON.parse(decoder.decode(readFileSync(args[0]))) as Spec;

function printSendMethodFunction(
  clazz: ClassDefinition,
  method: MethodDefinition,
) {
  const pascalName = `${pascalCase(clazz.name) + pascalCase(method.name)}`;
  const name = `send${pascalName}`;
  const argsName = `${pascalName}Args`;
  const propsName = `${pascalCase(clazz.name)}Properties`;
  const responses = method.synchronous
    ? clazz.methods.filter((m) =>
      m.id > method.id && m.name.startsWith(`${method.name}-`)
    )
    : [];
  const noWaitArg = !!method.arguments.find((a) => a.name === "nowait");

  if (method.content) {
    return `
      async ${name}(channel: number, args: t.${argsName}, props: t.${propsName}, data: Uint8Array) {
        await Promise.all([
          this.mux.send(channel, ${clazz.id}, ${method.id}, args),
          this.mux.sendContent(channel, ${clazz.id}, props, data)
        ]);
      }
    `;
  } else if (noWaitArg) {
    const response = responses[0];
    const returnType = `${pascalCase(clazz.name)}${pascalCase(response.name)}`;
    return `
      async ${name}Async(channel: number, args: t.${argsName}): Promise<void> {
        await this.mux.send(channel, ${clazz.id}, ${method.id}, { ...args, nowait: true });
      }

      async ${name}(channel: number, args: t.${argsName}): Promise<t.${returnType}> {
        await this.mux.send(channel, ${clazz.id}, ${method.id}, { ...args, nowait: false });
        return this.mux.receive(channel, ${clazz.id}, ${response.id});
      }
    `;
  } else if (method.synchronous && responses.length === 1) {
    const response = responses[0];
    const returnType = `${pascalCase(clazz.name)}${pascalCase(response.name)}`;
    return `
      async ${name}(channel: number, args: t.${argsName}): Promise<t.${returnType}> {
        await this.mux.send(channel, ${clazz.id}, ${method.id}, args);
        return this.mux.receive(channel, ${clazz.id}, ${response.id});
      }
    `;
  } else if (method.synchronous && responses.length > 1) {
    const returnType = responses.map((m) =>
      `t.${pascalCase(clazz.name)}${pascalCase(m.name)}`
    ).join(" | ");
    return `
      async ${name}(channel: number, args: t.${argsName}): Promise<${returnType}> {
        await this.mux.send(channel, ${clazz.id}, ${method.id}, args);
        return Promise.race([
          ${
      responses.map((res) => {
        return `this.mux.receive(channel, ${clazz.id}, ${res.id})`;
      }).join(",")
    }
        ])
      }
    `;
  } else {
    return `
      async ${name}(channel: number, args: t.${argsName}) : Promise<void> {
        await this.mux.send(channel, ${clazz.id}, ${method.id}, args);
      }
    `;
  }
}

function printReceiveMethodFunction(
  clazz: ClassDefinition,
  method: MethodDefinition,
) {
  const pascalName = `${pascalCase(clazz.name) + pascalCase(method.name)}`;
  const name = `receive${pascalName}`;

  if (!method.content) {
    const returnType = `t.${pascalCase(clazz.name)}${
      pascalCase(
        method.name,
      )
    }`;
    return `
      async ${name}(channel: number): Promise<${returnType}> {
        return this.mux.receive(channel, ${clazz.id}, ${method.id});
      }
    `;
  }
  return "";
}

function printSubscribeMethodFunction(
  clazz: ClassDefinition,
  method: MethodDefinition,
) {
  const pascalName = `${pascalCase(clazz.name) + pascalCase(method.name)}`;
  const propsName = `${pascalCase(clazz.name)}Properties`;
  const name = `subscribe${pascalName}`;

  if (method.content) {
    return `
      ${name}(channel: number, handler: (args: t.${pascalName}, props: t.${propsName}, data: Uint8Array) => void): () => void {
        return this.mux.subscribe(channel, ${clazz.id}, ${method.id}, async method => {
          const [props, content] = await this.mux.receiveContent(channel, ${clazz.id});
          return handler(method, props, content);
        });
      }
    `;
  } else {
    return `
      ${name}(channel: number, handler: (args: t.${pascalName}) => void): () => void {
        return this.mux.subscribe(channel, ${clazz.id}, ${method.id}, handler);
      }
    `;
  }
}

function printAmqpProtocolClass() {
  return `
export class AmqpProtocol {
  constructor(private mux: AmqpMultiplexer) {}

  ${
    spec.classes.flatMap((c) =>
      c.methods.filter((m) => isClientMethod(c, m)).map((m) =>
        printSendMethodFunction(c, m)
      )
    ).join("\n")
  }
  ${
    spec.classes.flatMap((c) =>
      c.methods.filter((m) => isServerMethod(c, m)).map((m) =>
        printReceiveMethodFunction(c, m)
      )
    ).join("\n")
  }
  ${
    spec.classes.flatMap((c) =>
      c.methods.filter((m) => isServerMethod(c, m)).map((m) =>
        printSubscribeMethodFunction(c, m)
      )
    ).join("\n")
  }
}
  `;
}

function generateConnection() {
  return [
    'import { AmqpMultiplexer } from "./connection/mod.ts"',
    'import * as t from "./amqp_types.ts"',
    printAmqpProtocolClass(),
  ].join("\n");
}

const encoder = new TextEncoder();
const result = encoder.encode(generateConnection());

writeFileSync(`./src/amqp_protocol.ts`, result);
