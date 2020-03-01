import {
  decodeShortUint,
  decodeLongUint,
  encodeFrame,
  Frame,
  readFrame,
  decodeHeaderProperties,
  AmqpFieldSpec,
  decodeFields,
  encodeShortUint,
  encodeLongUint,
  encodeFields,
  AmqpFields,
  AmqpField,
  AmqpFieldType,
  encodeProperties
} from "../framing/encoder.ts";

export const FRAME_METHOD = 1;
export const FRAME_HEADER = 2;
export const FRAME_BODY = 3;
export const FRAME_HEARTBEAT = 8;
export const FRAME_END = 206;

export interface MethodDefinition<T = Record<string, any>,
  TArgs = Record<string, any>>
{
  classId: number;
  methodId: number;
  args: { type: AmqpFieldType; name: string; defaultValue?: any; }[];
  synchronous: boolean;
  content: boolean;
}

export interface ClassDefinition<TProps = Record<string, any>> {
  classId: number;
  props: { type: AmqpFieldType; name: string; }[];
}

export interface ContentHeader {
  classId: number;
  weight: number;
  properties: AmqpFields;
}

export interface Method {
  classId: number;
  methodId: number;
  args: AmqpFields;
}

export interface AmqpSocket {
  start(): Promise<void>;
  close(): void;
  sendMethod<T, TArgs>(
    channel: number,
    def: MethodDefinition<T, TArgs>,
    args: TArgs
  ): Promise<void>;
  sendContent<TProps>(
    channel: number,
    def: ClassDefinition<TProps>,
    properties: TProps,
    data: Uint8Array
  ): Promise<void>;
  subscribeContent<TProps>(
    channel: number,
    def: ClassDefinition<TProps>,
    handler: ContentHandler<TProps>
  ): () => void;
  subscribeMethod<T, TArgs>(
    channel: number,
    def: MethodDefinition<T, TArgs>,
    handler: MethodHandler<T>
  ): () => void;
  receiveMethod<T, TArgs>(
    channel: number,
    def: MethodDefinition<T, TArgs>
  ): Promise<T>;
  receiveContent<TProps>(
    channel: number,
    def: ClassDefinition<TProps>
  ): Promise<{ properties: TProps; data: Uint8Array; }>;
}

export type ContentHandler<TProps = Record<string, any>> = (
  properties: TProps,
  data: Uint8Array
) => void;

export type MethodHandler<TArgs = Record<string, any>> = (args: TArgs) => void;

type BodyHandler = (payload: Uint8Array) => void;

interface ContentSubscriber<TProps = Record<string, any>> {
  channel: number;
  def: ClassDefinition<TProps>;
  handler: ContentHandler<TProps>;
}

interface MethodSubscriber<T = Record<string, any>,
  TArgs = Record<string, any>>
{
  channel: number;
  def: MethodDefinition<T, TArgs>;
  handler: MethodHandler<T>;
}

interface DataSubscriber {
  channel: number;
  handler: BodyHandler;
}

function serializeArgs(
  m: MethodDefinition,
  args: any
): AmqpField[] {
  return m.args.map(
    a => ({
      type: a.type,
      value: args[a.name] !== undefined ? args[a.name] : a.defaultValue
    })
  );
}

function serializeProps(c: ClassDefinition, props: any): AmqpField[] {
  return c.props.map(
    p => ({ type: p.type, value: props[p.name] as any } as AmqpField)
  );
}

function deserializeArgs(
  methodDefinition: MethodDefinition,
  fields: AmqpField[]
) {
  return methodDefinition.args.reduce(
    (r, arg, index) => ({ ...r, [arg.name]: fields[index].value }),
    {}
  );
}

function deserializeProps(
  classDefinition: ClassDefinition,
  fields: AmqpField[]
) {
  return classDefinition.props.reduce(
    (r, prop, index) => ({ ...r, [prop.name]: fields[index] }),
    {}
  );
}

export function createSocket(conn: Deno.Conn): AmqpSocket {
  const contentSubscribers: ContentSubscriber[] = [];
  const methodSubscribers: MethodSubscriber[] = [];
  const bodySubscribers: DataSubscriber[] = [];

  function emitContentBody(channel: number, data: Uint8Array) {
    bodySubscribers.filter(s => s.channel === channel).forEach(
      s => s.handler(data)
    );
  }

  function emitMethod(
    channel: number,
    classId: number,
    methodId: number,
    payload: Uint8Array
  ) {
    methodSubscribers.filter(s => s.channel === channel &&
      s.def.methodId === methodId &&
      s.def.classId === classId).forEach(subcriber => {
        try {
          const buf = new Deno.Buffer(payload);
          const fields = decodeFields(
            buf,
            subcriber.def.args.map(t => t.type)
          );
          const args = deserializeArgs(subcriber.def, fields);
          subcriber.handler(args);
        } catch (error) {
          console.log("Method subscriber failed", error);
        }
      });
  }

  function emitContent(
    channel: number,
    classId: number,
    properties: Uint8Array,
    data: Uint8Array
  ) {
    contentSubscribers.filter(
      s => s.channel === channel && s.def.classId === classId
    ).forEach(subscriber => {
      try {
        const buf = new Deno.Buffer(properties);
        const fields = decodeHeaderProperties(
          buf,
          subscriber.def.props.map(p => p.type)
        );
        const props = deserializeProps(subscriber.def, fields);
        subscriber.handler(props, data);
      } catch (error) {
        console.log("Content subscriber failed", error);
      }
    });
  }

  async function write(frame: Frame): Promise<void> {
    await conn.write(encodeFrame(frame));
  }

  async function sendMethod(
    channel: number,
    def: MethodDefinition,
    args: Record<string, any>
  ): Promise<void> {
    const buffer = new Deno.Buffer();
    buffer.writeSync(encodeShortUint(def.classId));
    buffer.writeSync(encodeShortUint(def.methodId));
    buffer.writeSync(encodeFields(serializeArgs(def, args)));
    console.log("Sending", { classId: def.classId, methodId: def.methodId });
    await write({
      type: FRAME_METHOD,
      channel: channel,
      payload: buffer.bytes()
    });
  }

  async function sendContent(
    channel: number,
    def: ClassDefinition,
    properties: Record<string, any>,
    data: Uint8Array
  ) {
    const buffer = new Deno.Buffer();

    buffer.writeSync(encodeShortUint(def.classId));
    buffer.writeSync(encodeShortUint(0)); // weight
    buffer.writeSync(encodeLongUint(0)); // high byte size
    buffer.writeSync(encodeLongUint(data.length)); // high byte size
    buffer.writeSync(encodeProperties(serializeProps(def, properties)));

    await write({ type: FRAME_HEADER, channel, payload: buffer.bytes() });
    await write({ type: FRAME_BODY, channel, payload: data });
  }

  function receiveBody(channel: number, size: number) {
    return new Promise<Uint8Array>((resolve, reject) => {
      const buffer = new Deno.Buffer();
      // TODO(lenkan): Detect and raise error if non-body frame is received on the channel
      const cancel = subscribeContentBody(channel, data => {
        buffer.writeSync(data);
        if (buffer.length >= size) {
          cancel();
          resolve(buffer.bytes());
        }
      });
    });
  }

  async function handleFrame(frame: Frame) {
    if (frame.type === FRAME_METHOD) {
      const r = new Deno.Buffer(frame.payload);
      const classId = decodeShortUint(r);
      const methodId = decodeShortUint(r);
      console.log("Received", { classId, methodId });
      emitMethod(frame.channel, classId, methodId, r.bytes());
    }

    if (frame.type === FRAME_HEADER) {
      const r = new Deno.Buffer(frame.payload);
      const classId = decodeShortUint(r);
      decodeShortUint(r); // weight unused
      decodeLongUint(r); // size high bytes
      const size = decodeLongUint(r);
      const properties = r.bytes();

      receiveBody(frame.channel, size).then(data => {
        emitContent(
          frame.channel,
          classId,
          properties,
          data
        );
      });
    }

    if (frame.type === FRAME_BODY) {
      emitContentBody(frame.channel, frame.payload);
    }
  }

  function subscribeContentBody(channel: number, handler: BodyHandler): () =>
    void
  {
    const subscriber: DataSubscriber = { channel, handler };
    bodySubscribers.push(subscriber);
    return () => {
      const index = bodySubscribers.indexOf(subscriber);
      if (index !== -1) {
        bodySubscribers.splice(index, index + 1);
      }
    };
  }

  function subscribeMethod<T, TArgs>(
    channel: number,
    def: MethodDefinition<T, TArgs>,
    handler: MethodHandler<T>
  ) {
    const subscriber: MethodSubscriber<T, TArgs> = { channel, def, handler };
    methodSubscribers.push(subscriber as MethodSubscriber);

    return () => {
      const index = methodSubscribers.indexOf(subscriber as MethodSubscriber);
      if (index !== -1) {
        methodSubscribers.splice(index, index + 1);
      }
    };
  }

  function receiveMethod<T, TArgs>(
    channel: number,
    def: MethodDefinition<T, TArgs>
  ): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const cancel = subscribeMethod<T, TArgs>(
        channel,
        def,
        args => {
          cancel();
          resolve(args);
        }
      );
    });
  }

  function subscribeContent<TProps>(
    channel: number,
    def: ClassDefinition<TProps>,
    handler: ContentHandler<TProps>
  ) {
    const subscriber = { channel, def, handler };
    contentSubscribers.push(subscriber as ContentSubscriber);

    return () => {
      const index = contentSubscribers.indexOf(
        subscriber as ContentSubscriber
      );
      if (index !== -1) {
        contentSubscribers.splice(index, index + 1);
      }
    };
  }

  function receiveContent<TProps>(
    channel: number,
    def: ClassDefinition<TProps>
  ): Promise<{ properties: TProps; data: Uint8Array; }> {
    return new Promise((resolve, reject) => {
      const cancel = subscribeContent<TProps>(
        channel,
        def,
        (args, data) => {
          cancel();
          resolve({ properties: args, data });
        }
      );
    });
  }

  async function start() {
    conn.write(new TextEncoder().encode("AMQP"));
    conn.write(new Uint8Array([0, 0, 9, 1]));
    while (true) {
      const frame = await readFrame(conn);
      if (frame === null) {
        break;
      }

      handleFrame(frame);
    }
  }

  function close() {
    conn.closeWrite();
  }

  return {
    sendMethod,
    sendContent,
    subscribeContent,
    subscribeMethod,
    receiveMethod,
    receiveContent,
    start,
    close
  };
}
