import {
  MethodDefinition,
  Spec,
  ClassDefinition,
  pascalCase,
  printClassPropertyInterface,
  printMethodArgsInterface,
  printMethodValueInterface,
  printReceiveMethodDefinition,
  printReceiveMethodUnion,
  printHeaderUnion,
  printHeaderDefinition,
  printEncodeMethodFunction,
  printDecodeMethodFunction,
  printMethodDecoder,
  printEncodeHeaderFunction,
  printDecodeHeaderFunction,
  printHeaderDecoder,
  constantName
} from "./utils.ts";

const { args, readFileSync, writeFileSync } = Deno;
const decoder = new TextDecoder("utf-8");
const spec = JSON.parse(decoder.decode(readFileSync(args[0]))) as Spec;

function printSendMethodFunction(
  clazz: ClassDefinition,
  method: MethodDefinition
) {
  const pascalName = `${pascalCase(clazz.name) + pascalCase(method.name)}`;
  const name = `send${pascalName}`;
  const encodeName = `encode${pascalName}`;
  const argsName = `${pascalName}Args`;
  const propsName = `${pascalCase(clazz.name)}Properties`;
  const responses = method.synchronous
    ? clazz.methods.filter(m =>
      m.id > method.id && m.name.startsWith(`${method.name}-`)
    )
    : [];

  if (method.content) {
    return `
      async ${name}(channel: number, args: ${argsName}, props: ${propsName}, data: Uint8Array) {
        await Promise.all([
          this.socket.write(channel, 1, ${encodeName}(args)),
          this.socket.write(channel, 2, encode${pascalCase(
      clazz.name
    )}Header(BigInt(data.length), props)),
        this.socket.write(channel, 3, data)
          ]);
      }
    `;
  } else if (method.synchronous) {
    const returnType = responses.map(m =>
      `${pascalCase(clazz.name)}${pascalCase(m.name)}`
    ).join(" | ");
    return `
      async ${name}(channel: number, args: ${argsName}): Promise<${returnType}> {
        await this.socket.write(channel, 1, ${encodeName}(args));
        return new Promise<${returnType}>((resolve, reject) => {
          const cancel = this.subscribeMethod(channel, reply => {
            ${responses.map(res => {
      return `if(reply.classId === ${clazz.id} && reply.methodId === ${res.id}) {
                cancel();
                return resolve(reply.args);
              }`;
    }).join("\n")}
          });
        });
      }
    `;
  } else {
    return `
      async ${name}(channel: number, args: ${argsName}) : Promise<void> {
        await this.socket.write(channel, 1, ${encodeName}(args));
      }
    `;
  }
}

function printReceiveMethodFunction(
  clazz: ClassDefinition,
  method: MethodDefinition
) {
  const pascalName = `${pascalCase(clazz.name) + pascalCase(method.name)}`;
  const name = `receive${pascalName}`;

  if (!method.content) {
    const returnType = `${pascalCase(clazz.name)}${pascalCase(
      method.name
    )}`;
    return `
      async ${name}(channel: number): Promise<${returnType}> {
        const method = await this.assertMethod(channel, ${clazz.id}, ${method.id});
        return method.args;
      }
    `;
  }
  return "";
}

function printSubscribeMethodFunction(
  clazz: ClassDefinition,
  method: MethodDefinition
) {
  const pascalName = `${pascalCase(clazz.name) + pascalCase(method.name)}`;
  const propsName = `${pascalCase(clazz.name)}Properties`;
  const name = `subscribe${pascalName}`;

  if (method.content) {
    return `
      ${name}(channel: number, handler: (args: ${pascalName}, props: ${propsName}, data: Uint8Array) => void): () => void {
        const cancel = this.subscribeMethod(channel, async method => {
          if(method.classId === ${clazz.id} && method.methodId === ${method.id}) {
              const header = await this.receiveHeader(channel);
              const content = await this.receiveContent(channel, header.size);
              return handler(method.args, header.props, content);
          }
        });
        return cancel;
      }
    `;
  } else {
    return `
      ${name}(channel: number, handler: (args: ${pascalName}) => void): () => void {
        const cancel = this.subscribeMethod(channel, async method => {
          if(method.classId === ${clazz.id} && method.methodId === ${method.id}) {
              return handler(method.args);
          }
        });
        return cancel;
      }
    `;
  }
}

function printAmqpProtocolClass() {
  return `
interface Socket {
  write(channel: number, type: number, payload: Uint8Array): Promise<void>;
  subscribe(
    handler: (
      err: Error | null,
      channel: number,
      type: number,
      payload: Uint8Array
    ) => void
  ): () => void;
}

interface MethodSubscriber {
  channel: number;
  handler: (m: ReceiveMethod) => void;
}

interface HeaderSubscriber {
  channel: number;
  handler: (h: Header) => void;
}

export class AmqpProtocol {
  private methodSubscribers: MethodSubscriber[] = [];
  private headerSubscribers: HeaderSubscriber[] = [];

  constructor(private socket: Socket) {
    this.socket.subscribe((err, channel, type, payload) => {
      if (type === 1) {
        this.emitMethod(channel, decodeMethod(payload));
      } else if (type === 2) {
        this.emitHeader(channel, decodeHeader(payload));
      }
    });
  }

  private emitMethod(channel: number, method: ReceiveMethod) {
    this.methodSubscribers.forEach(sub => {
      if (sub.channel === channel) {
        sub.handler(method);
      }
    });
  }

  private emitHeader(channel: number, header: Header) {
    this.headerSubscribers.forEach(sub => {
      if (sub.channel === channel) {
        sub.handler(header);
      }
    });
  }

  private subscribeMethod(
    channel: number,
    handler: (m: ReceiveMethod) => void
  ) {
    const sub = { channel, handler };
    this.methodSubscribers.push(sub);
    return () => {
      const index = this.methodSubscribers.indexOf(sub);
      if (index !== -1) {
        this.methodSubscribers.splice(index, index + 1);
      }
    };
  }

  private subscribeHeader(
    channel: number,
    handler: (m: Header) => void
  ) {
    const sub = { channel, handler };
    this.headerSubscribers.push(sub);
    return () => {
      const index = this.headerSubscribers.indexOf(sub);
      if (index !== -1) {
        this.headerSubscribers.splice(index, index + 1);
      }
    };
  }

  private async assertMethod<T extends number, U extends number>(
    channel: number,
    classId: T,
    methodId: U
  ): Promise<Extract<ReceiveMethod, { classId: T; methodId: U }>> {
    const method = await this.receiveMethod(channel);
    if (method.classId === classId && method.methodId === methodId) {
      return method as Extract<ReceiveMethod, { classId: T; methodId: U }>;
    }

    throw new Error(
      \`Expected \${classId}/\${methodId}, got \${method.classId}\${method.methodId}\`
    );
  }

  private async receiveMethod(channel: number) {
    return new Promise<ReceiveMethod>((resolve, reject) => {
      const cancel = this.subscribeMethod(channel, method => {
        cancel();
        return resolve(method);
      });
    });
  }

  private async receiveHeader(channel: number) {
    return new Promise<Header>((resolve, reject) => {
      const cancel = this.subscribeHeader(
        channel,
        header => {
          cancel();
          resolve(header);
        }
      );
    });
  }

  private async receiveContent(channel: number, size: number) {
    const buffer = new Deno.Buffer();
    return new Promise<Uint8Array>((resolve, reject) => {
      const cancel = this.socket.subscribe((err, ch, type, data) => {
        if (channel !== ch) {
          return;
        }

        if (type !== 3) {
          cancel();
          return resolve(buffer.bytes());
        }

        buffer.writeSync(data);
        if (buffer.length >= size) {
          cancel();
          return resolve(buffer.bytes());
        }
      });
    });
  }

  ${spec.classes.flatMap(c =>
    c.methods.map(m => printSendMethodFunction(c, m))
  ).join("\n")}
  ${spec.classes.flatMap(c =>
    c.methods.map(m => printReceiveMethodFunction(c, m))
  ).join("\n")}
  ${spec.classes.flatMap(c =>
    c.methods.map(m => printSubscribeMethodFunction(c, m))
  ).join("\n")}
}
  `;
}

function generateConnection() {
  return [
    'import * as enc from "./encoding/mod.ts"',
    ...spec.constants.map(c => {
      const name = c.class
        ? constantName(c.class + "-" + c.name)
        : constantName(c.name);
      return `export const ${name} = ${JSON.stringify(c.value)}`;
    }),
    ...spec.classes.flatMap(c => {
      return [
        `export const ${constantName(c.name)} = ${c.id}`,
        ...c.methods.map(m =>
          `export const ${constantName(c.name + "_" + m.name)} = ${m.id}`
        )
      ];
    }),
    ...spec.classes.map(printClassPropertyInterface),
    ...spec.classes.flatMap(clazz =>
      clazz.methods.map(m => printMethodArgsInterface(spec, clazz, m))
    ),
    ...spec.classes.flatMap(clazz =>
      clazz.methods.map(m => printMethodValueInterface(spec, clazz, m))
    ),
    ...spec.classes.flatMap(clazz =>
      clazz.methods.map(m => printReceiveMethodDefinition(clazz, m))
    ),
    ...spec.classes.map(printHeaderDefinition),
    printReceiveMethodUnion(spec),
    printHeaderUnion(spec),
    ...spec.classes.flatMap(clazz =>
      clazz.methods.map(m => printEncodeMethodFunction(spec, clazz, m))
    ),
    ...spec.classes.flatMap(clazz =>
      clazz.methods.map(m => printDecodeMethodFunction(spec, clazz, m))
    ),
    printMethodDecoder(spec),
    ...spec.classes.flatMap(printEncodeHeaderFunction),
    ...spec.classes.flatMap(printDecodeHeaderFunction),
    printHeaderDecoder(spec),
    printAmqpProtocolClass()
  ].join("\n");
}

const encoder = new TextEncoder();
const result = encoder.encode(generateConnection());

writeFileSync(`./amqp_protocol.ts`, result);
