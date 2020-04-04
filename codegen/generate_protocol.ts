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
  constantName,
  isClientMethod,
  isServerMethod
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
  } else if (method.synchronous && responses.length === 1) {
    const response = responses[0];
    const returnType = `${pascalCase(clazz.name)}${pascalCase(response.name)}`;
    return `
      async ${name}(channel: number, args: ${argsName}): Promise<${returnType}> {
        await this.socket.write(channel, 1, ${encodeName}(args));
        return this.receiveMethod(channel, ${clazz.id}, ${response.id});
      }
    `;
  } else if (method.synchronous && responses.length > 1) {
    const returnType = responses.map(m =>
      `${pascalCase(clazz.name)}${pascalCase(m.name)}`
    ).join(" | ");
    return `
      async ${name}(channel: number, args: ${argsName}): Promise<${returnType}> {
        await this.socket.write(channel, 1, ${encodeName}(args));
        return Promise.race([
          ${responses.map(res => {
      return `this.receiveMethod(channel, ${clazz.id}, ${res.id})`;
    }).join(",")}
        ])
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
        return this.receiveMethod(channel, ${clazz.id}, ${method.id});
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
        return this.subscribeMethod(channel, ${clazz.id}, ${method.id}, async method => {
          const header = await this.receiveHeader(channel, ${clazz.id});
          const content = await this.receiveContent(channel, header.size);
          return handler(method, header.props, content);
        });
      }
    `;
  } else {
    return `
      ${name}(channel: number, handler: (args: ${pascalName}) => void): () => void {
        return this.subscribeMethod(channel, ${clazz.id}, ${method.id}, handler);
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

interface MethodSubscriber<T extends number, U extends number> {
  channel: number;
  classId: T;
  methodId: U;
  maxCount: number;
  count: number;
  handler: (m: ExtractArgs<T, U>) => void;
  error: (e: Error) => void;
}

interface HeaderSubscriber {
  channel: number;
  handler: (e: Error | null, h: Header) => void;
}

type ExtractMethod<T extends number, U extends number> = Extract<
  ReceiveMethod,
  { classId: T; methodId: U }
>;
type ExtractArgs<T extends number, U extends number> = ExtractMethod<
  T,
  U
>["args"];

function serializeChannelError(channel: number, args: ChannelClose) {
  return \`Channel \${channel} closed by server - \${args.replyCode} \${args
    .replyText || ""}\`;
}

function serializeConnectionError(args: ConnectionClose) {
  return \`Connection closed by server - \${args.replyCode} \${args
    .replyText || ""}\`;
}

export class AmqpProtocol {
  private methodSubscribers: MethodSubscriber<any, any>[] = [];
  private headerSubscribers: HeaderSubscriber[] = [];

  constructor(private socket: Socket) {
    this.socket.subscribe((err, channel, type, payload) => {
      if (err) {
        this.emitConnectionError(err);
        return;
      }

      if (type === 1) {
        this.emitMethod(channel, decodeMethod(payload));
      } else if (type === 2) {
        this.emitHeader(channel, decodeHeader(payload));
      }
    });
  }

  private unsubscribe(sub: MethodSubscriber<any, any>) {
    const index = this.methodSubscribers.indexOf(sub);
    if (index !== -1) {
      this.methodSubscribers.splice(index, index + 1);
    }
  }

  private emitMethod(channel: number, method: ReceiveMethod) {
    this.methodSubscribers.forEach((sub) => {
      if (
        channel === sub.channel && method.classId === sub.classId &&
        method.methodId === sub.methodId
      ) {
        sub.count++;
        if (sub.maxCount > 0 && sub.count >= sub.maxCount) {
          this.unsubscribe(sub);
        }
        return sub.handler(method.args);
      }

      if (
        method.classId === CONNECTION && method.methodId === CONNECTION_CLOSE
      ) {
        this.unsubscribe(sub);
        return sub.error(
          new Error(serializeConnectionError(method.args))
        );
      }

      if (
        channel === sub.channel && method.classId === CHANNEL &&
        method.methodId === CHANNEL_CLOSE
      ) {
        this.unsubscribe(sub);
        return sub.error(
          new Error(serializeChannelError(channel, method.args))
        );
      }
    });
  }

  private emitConnectionError(error: Error) {
    this.methodSubscribers.forEach(sub => sub.error(error));
    this.headerSubscribers.forEach(sub => sub.handler(error, null as any));
  }

  private emitHeader(channel: number, header: Header) {
    this.headerSubscribers.forEach(sub => {
      if (sub.channel === channel) {
        sub.handler(null, header);
      }
    });
  }

  private subscribeMethod<T extends number, U extends number>(
    channel: number,
    classId: T,
    methodId: U,
    handler: (m: ExtractArgs<T, U>) => void,
    onError: (e: Error) => void = () => {},
    maxCount: number = 0
  ) {
    const sub = {
      channel,
      classId,
      methodId,
      handler,
      error: onError,
      maxCount,
      count: 0
    } as MethodSubscriber<
      any,
      any
    >;
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
    handler: (e: Error | null, m: Header) => void
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

  private async receiveMethod<T extends number, U extends number>(
    channel: number,
    classId: T,
    methodId: U
  ): Promise<ExtractArgs<T, U>> {
    return new Promise<any>((resolve, reject) =>
      this.subscribeMethod<T, U>(
        channel,
        classId,
        methodId,
        resolve,
        reject,
        1
      )
    );
  }

  private async receiveHeader<T extends number>(
    channel: number,
    classId: T
  ): Promise<Extract<Header, { classId: T }>> {
    return new Promise((resolve, reject) => {
      const cancel = this.subscribeHeader(
        channel,
        (e, header) => {
          if (e) {
            cancel();
            return reject(e);
          }

          if (header.classId === classId) {
            cancel();
            return resolve(header as Extract<Header, { classId: T }>);
          }
        }
      );
    });
  }

  private async receiveContent(channel: number, size: number) {
    const buffer = new Deno.Buffer();
    return new Promise<Uint8Array>((resolve, reject) => {
      const cancel = this.socket.subscribe((err, ch, type, data) => {
        if (err) {
          cancel();
          return reject(err);
        }

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
    c.methods.filter(m => isClientMethod(c, m)).map(m =>
      printSendMethodFunction(c, m)
    )
  ).join("\n")}
  ${spec.classes.flatMap(c =>
    c.methods.filter(m => isServerMethod(c, m)).map(m =>
      printReceiveMethodFunction(c, m)
    )
  ).join("\n")}
  ${spec.classes.flatMap(c =>
    c.methods.filter(m => isServerMethod(c, m)).map(m =>
      printSubscribeMethodFunction(c, m)
    )
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
