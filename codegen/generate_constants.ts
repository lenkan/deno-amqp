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
  method: MethodDefinition,
) {
  const pascalName = `${pascalCase(clazz.name) + pascalCase(method.name)}`;
  const name = `send${pascalName}`;
  const encodeName = `encode${pascalName}`;
  const argsName = `${pascalName}Args`;
  const propsName = `${pascalCase(clazz.name)}Properties`;
  const responses = method.synchronous
    ? clazz.methods.filter((m) =>
      m.id > method.id && m.name.startsWith(`${method.name}-`)
    )
    : [];

  if (method.content) {
    return `
      async ${name}(channel: number, args: ${argsName}, props: ${propsName}, data: Uint8Array) {
        await Promise.all([
          this.socket.write({ channel, type: 1, payload: ${encodeName}(args) }),
          this.socket.write({ channel, type: 2, payload: encode${pascalCase(
      clazz.name,
    )}Header(BigInt(data.length), props) }),
        this.socket.write({ channel, type: 3, payload: data })
          ]);
      }
    `;
  } else if (method.synchronous && responses.length === 1) {
    const response = responses[0];
    const returnType = `${pascalCase(clazz.name)}${pascalCase(response.name)}`;
    return `
      async ${name}(channel: number, args: ${argsName}): Promise<${returnType}> {
        await this.socket.write({ channel, type: 1, payload: ${encodeName}(args) });
        return this.receiveMethod(channel, ${clazz.id}, ${response.id});
      }
    `;
  } else if (method.synchronous && responses.length > 1) {
    const returnType = responses.map((m) =>
      `${pascalCase(clazz.name)}${pascalCase(m.name)}`
    ).join(" | ");
    return `
      async ${name}(channel: number, args: ${argsName}): Promise<${returnType}> {
        await this.socket.write({ channel, type: 1, payload: ${encodeName}(args) });
        return Promise.race([
          ${responses.map((res) => {
      return `this.receiveMethod(channel, ${clazz.id}, ${res.id})`;
    }).join(",")}
        ])
      }
    `;
  } else {
    return `
      async ${name}(channel: number, args: ${argsName}) : Promise<void> {
        await this.socket.write({ channel, type: 1, payload: ${encodeName}(args) });
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
    const returnType = `${pascalCase(clazz.name)}${pascalCase(
      method.name,
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
  method: MethodDefinition,
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
interface Frame {
  channel: number;
  type: number;
  payload: Uint8Array;
}

interface Socket {
  write(frame: Frame): Promise<void>;
  read(): Promise<Frame>;
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

interface HeaderReceiver<T extends number> {
  channel: number;
  classId: T;
  handler: (h: Extract<Header, { classId: T }>) => void;
  error: (e: Error) => void;
}

interface ContentSubscriber {
  channel: number;
  handler: (data: Uint8Array) => void;
  error: (e: Error) => void;
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
  private contentSubscribers: ContentSubscriber[] = [];
  private headerReceivers: HeaderReceiver<any>[] = [];

  constructor(private socket: Socket) {
    this.listen();
  }

  private async listen() {
    while(true) {
      try {
        const frame = await this.socket.read()
        if(frame.type === 1) {
          this.emitMethod(frame.channel, decodeMethod(frame.payload));
        } else if (frame.type === 2) {
          this.emitHeader(frame.channel, decodeHeader(frame.payload));
        } else if (frame.type === 3) {
          this.emitContent(frame.channel, frame.payload);
        }
      } catch(err) {
        this.emitConnectionError(err);
        return;
      }
    }
  }

  private unsubscribeMethod(sub: MethodSubscriber<any, any>) {
    const index = this.methodSubscribers.indexOf(sub);
    if (index !== -1) {
      this.methodSubscribers.splice(index, index + 1);
    }
  }

  private unsubscribeHeader(sub: HeaderReceiver<any>) {
    const index = this.headerReceivers.indexOf(sub);
    if (index !== -1) {
      this.headerReceivers.splice(index, index + 1);
    }
  }

  private emitMethod(channel: number, method: ReceiveMethod) {
    const subscribers = [...this.methodSubscribers];
    subscribers.forEach((sub, index, self) => {
      if (
        channel === sub.channel && method.classId === sub.classId &&
        method.methodId === sub.methodId
      ) {
        sub.count++;
        if (sub.maxCount > 0 && sub.count >= sub.maxCount) {
          this.unsubscribeMethod(sub);
        }
        return sub.handler(method.args);
      }

      if (
        method.classId === CONNECTION && method.methodId === CONNECTION_CLOSE
      ) {
        this.unsubscribeMethod(sub);
        return sub.error(
          new Error(serializeConnectionError(method.args))
        );
      }

      if (
        channel === sub.channel && method.classId === CHANNEL &&
        method.methodId === CHANNEL_CLOSE
      ) {
        this.unsubscribeMethod(sub);
        sub.error(
          new Error(serializeChannelError(channel, method.args))
        );
      }
    });
  }

  private emitConnectionError(error: Error) {
    this.methodSubscribers.forEach(sub => sub.error(error));
    this.headerReceivers.forEach(sub => sub.error(error));
  }

  private emitHeader(channel: number, header: Header) {
    const receivers = [...this.headerReceivers];
    receivers.forEach(sub => {
      if (sub.channel === channel && sub.classId === header.classId) {
        this.unsubscribeHeader(sub);
        sub.handler(header);
      }
    });
  }

  private emitContent(channel: number, data: Uint8Array) {
    const subscribers = [...this.contentSubscribers];
    subscribers.forEach(sub => {
      if (sub.channel === channel) {
        sub.handler(data);
      }
    });
  }

  private subscribeContent(channel: number, handler: (data: Uint8Array) => void, onError: (error: Error) => void) {
    const sub: ContentSubscriber = { channel, handler, error: onError };
    this.contentSubscribers.push(sub);
    return () => this.unsubscribeContent(sub);
  }

  private unsubscribeContent(sub: ContentSubscriber) {
    const index = this.contentSubscribers.indexOf(sub);
    if(index !== -1) {
      this.contentSubscribers.splice(index, index + 1);
    }
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
    return () => this.unsubscribeMethod(sub);
  }

  private receiveHeader<T extends number>(
    channel: number,
    classId: T
  ): Promise<Extract<Header, { classId: T }>> {
    return new Promise<any>((resolve, reject) => {
      const receiver: HeaderReceiver<any> = {
        channel,
        classId,
        handler: resolve,
        error: reject
      };
      this.headerReceivers.push(receiver);
    });
  }

  private async receiveMethod<T extends number, U extends number>(
    channel: number,
    classId: T,
    methodId: U
  ): Promise<ExtractArgs<T, U>> {
    return new Promise<any>((resolve, reject) => {
      this.subscribeMethod<T, U>(
        channel,
        classId,
        methodId,
        resolve, 
        reject,
        1
      );
    });
  }

  private async receiveContent(channel: number, size: number) {
    const buffer = new Deno.Buffer();
    return new Promise<Uint8Array>((resolve, reject) => {
      const cancel = this.subscribeContent(channel, data => {
        buffer.writeSync(data);
        if (buffer.length >= size) {
          cancel();
          return resolve(buffer.bytes());
        }
      }, reject);
    });
  }

  ${spec.classes.flatMap((c) =>
    c.methods.filter((m) => isClientMethod(c, m)).map((m) =>
      printSendMethodFunction(c, m)
    )
  ).join("\n")}
  ${spec.classes.flatMap((c) =>
    c.methods.filter((m) => isServerMethod(c, m)).map((m) =>
      printReceiveMethodFunction(c, m)
    )
  ).join("\n")}
  ${spec.classes.flatMap((c) =>
    c.methods.filter((m) => isServerMethod(c, m)).map((m) =>
      printSubscribeMethodFunction(c, m)
    )
  ).join("\n")}
}
  `;
}

function generateConnection() {
  return [
    ...spec.constants.map((c) => {
      const name = c.class
        ? constantName(c.class + "-" + c.name)
        : constantName(c.name);
      return `export const ${name} = ${JSON.stringify(c.value)} as const`;
    }),
    ...spec.classes.flatMap((c) => {
      return [
        `export const ${constantName(c.name)} = ${c.id} as const`,
        ...c.methods.map((m) =>
          `export const ${constantName(
            c.name + "_" + m.name,
          )} = ${m.id} as const`
        ),
      ];
    }),
  ].join("\n");
}

const encoder = new TextEncoder();
const result = encoder.encode(generateConnection());

writeFileSync(`./amqp_constants.ts`, result);
