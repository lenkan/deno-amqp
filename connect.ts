type Listener = Deno.Listener;
type Conn = Deno.Conn;
type Reader = Deno.Reader;
type Writer = Deno.Writer;
const { dial } = Deno;
import * as e from "./encoding.ts";
import { createDecoder } from "./decoder.ts";

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

connect()
  .then(createSocket)
  .then(async socket => {
    const array = new Uint8Array({ length: 1 });

    interface FrameParams {
      type: number;
      channel: number;
      payload: Uint8Array;
    }

    function frame(params: FrameParams) {
      return new Uint8Array([
        ...e.encodeOctet(params.type),
        ...e.encodeShortUint(params.channel),
        ...e.encodeLongUint(params.payload.byteLength),
        ...params.payload,
        0xce
      ]);
    }

    interface StartParams {
      versionMajor?: number;
      versionMinor?: number;
      serverProperties: Record<string, string>;
      mechanisms?: string;
      locales?: string;
    }

    function start(params: StartParams) {
      return new Uint8Array([
        ...e.encodeOctet(10),
        ...e.encodeOctet(10),
        ...e.encodeOctet(params.versionMajor || 0),
        ...e.encodeOctet(params.versionMinor || 0),
        ...e.encodeTable({}),
        ...e.encodeLongString(params.mechanisms || "PLAIN"),
        ...e.encodeLongString(params.locales || "en_US")
      ]);
    }

    interface StartOkParams {
      clientProperties?: Record<string, string>;
      mechanism?: string;
      response: string;
      locale?: string;
    }

    function startOk(params: StartOkParams) {
      return new Uint8Array([
        ...e.encodeOctet(10),
        ...e.encodeOctet(11),
        ...e.encodeTable(params.clientProperties || {}),
        ...e.encodeLongString(params.response),
        ...e.encodeShortString(params.locale || "en_US")
      ]);
    }

    await socket.write(new Uint8Array([65, 77, 81, 80, 0, 0, 9, 1]));
    while (true) {
      const data = await socket.read();
      const decoder = createDecoder(data);
      const type = decoder.decodeOctet();
      const channel = decoder.decodeShortUint();
      const length = decoder.decodeLongUint();
    }
    // const result = await socket.read();
    // console.log(result);
  })
  .catch(e => {
    console.error(e);
    Deno.exit(1);
  });
// writer.

// // https://deno.land/std/http
// import {
//   BufReader,
//   BufWriter,
//   UnexpectedEOFError
// } from "https://deno.land/std/io/bufio.ts";

console.log("hej");
