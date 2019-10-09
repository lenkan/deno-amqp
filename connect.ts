type Listener = Deno.Listener;
type Conn = Deno.Conn;
const { dial } = Deno;
import { createEncoder } from "./encoder.ts";
import { createDecoder } from "./decoder.ts";
import { encodeMethodPayload, Method, decodeMethodPayload } from "./output.ts";

async function connect() {
  const writer = await dial({
    hostname: "localhost",
    port: 5672,
    transport: "tcp"
  });

  return writer;
}

function createSocket(conn: Conn) {
  async function read(): Promise<Uint8Array> {
    const buffer = new Deno.Buffer();

    while (true) {
      const chunk = new Uint8Array(1024);
      const size = await conn.read(chunk);
      await buffer.write(chunk.slice(0, size));
      if (chunk[size - 1] === 0xce) {
        return buffer.bytes();
      }
    }
  }

  async function write(data: Uint8Array) {
    await conn.write(data);
  }

  return { read, write };
}

const FRAME_METHOD = 1;
const FRAME_HEADER = 2;
const FRAME_BODY = 3;
const FRAME_HEARTBEAT = 4;
const FRAME_END = 0xce;
const NULL_CHAR = String.fromCharCode(0);

const user = "guest";
const password = "guest";

function decodeFrame(data: Uint8Array): DecodedFrame {
  const decoder = createDecoder(data);
  const type = decoder.decodeOctet();
  const channel = decoder.decodeShortUint();
  const size = decoder.decodeLongUint();

  if (type === FRAME_METHOD) {
    const classId = decoder.decodeShortUint();
    const methodId = decoder.decodeShortUint();
    const bytes = decoder.bytes();
    const payload = bytes.slice(0, bytes.length - 1);
    return decodeMethodPayload(channel, classId, methodId, payload);
  }
}

type DecodedFrame = Method | { type: 4; channel: number };

function encodeFrame(frame: DecodedFrame) {
  const encoder = createEncoder();
  encoder.encodeOctet(frame.type);
  encoder.encodeShortUint(frame.channel);
  switch (frame.type) {
    case FRAME_METHOD:
      const payload = encodeMethodPayload(frame);
      encoder.encodeLongUint(payload.length + 4);
      encoder.encodeShortUint(frame.classId);
      encoder.encodeShortUint(frame.methodId);
      encoder.write(payload);
      break;
  }
  encoder.encodeOctet(FRAME_END);
  return encoder.bytes();
}

connect()
  .then(createSocket)
  .then(async socket => {
    await socket.write(new Uint8Array([65, 77, 81, 80, 0, 0, 9, 1]));
    while (true) {
      const data = await socket.read();
      const frame = decodeFrame(data);

      if (frame.type === FRAME_METHOD) {
        if (frame.name === "start") {
          const mechanism = frame.args.mechanisms.split(" ")[0];
          const locale = frame.args.locales.split(" ")[0];
          const payload = encodeFrame({
            type: FRAME_METHOD,
            classId: 10,
            methodId: 11,
            name: "start-ok",
            channel: frame.channel,
            args: {
              ["client-properties"]: {},
              locale,
              mechanism,
              response: `${NULL_CHAR}${user}${NULL_CHAR}${password}`
            }
          });

          socket.write(payload);
        }

        // challenge
        if(frame.classId === 10 && frame.methodId === 30) {
        }
      }
    }
  })
  .catch(e => {
    console.error(e);
    Deno.exit(1);
  });

console.log("hej");
