/**
 * This is a generated file
 */

import * as enc from "../encoding/mod.ts";
import { Header } from "../amqp_types.ts";

function encodeConnectionHeader(
  header: Extract<Header, { classId: 10 }>
): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(header.classId));
  w.writeSync(enc.encodeShortUint(0));
  w.writeSync(enc.encodeLongLongUint(header.size));
  w.writeSync(enc.encodeOptionalFields([]));
  return w.bytes();
}

function encodeChannelHeader(
  header: Extract<Header, { classId: 20 }>
): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(header.classId));
  w.writeSync(enc.encodeShortUint(0));
  w.writeSync(enc.encodeLongLongUint(header.size));
  w.writeSync(enc.encodeOptionalFields([]));
  return w.bytes();
}

function encodeAccessHeader(
  header: Extract<Header, { classId: 30 }>
): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(header.classId));
  w.writeSync(enc.encodeShortUint(0));
  w.writeSync(enc.encodeLongLongUint(header.size));
  w.writeSync(enc.encodeOptionalFields([]));
  return w.bytes();
}

function encodeExchangeHeader(
  header: Extract<Header, { classId: 40 }>
): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(header.classId));
  w.writeSync(enc.encodeShortUint(0));
  w.writeSync(enc.encodeLongLongUint(header.size));
  w.writeSync(enc.encodeOptionalFields([]));
  return w.bytes();
}

function encodeQueueHeader(
  header: Extract<Header, { classId: 50 }>
): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(header.classId));
  w.writeSync(enc.encodeShortUint(0));
  w.writeSync(enc.encodeLongLongUint(header.size));
  w.writeSync(enc.encodeOptionalFields([]));
  return w.bytes();
}

function encodeBasicHeader(
  header: Extract<Header, { classId: 60 }>
): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(header.classId));
  w.writeSync(enc.encodeShortUint(0));
  w.writeSync(enc.encodeLongLongUint(header.size));
  w.writeSync(enc.encodeOptionalFields([
    { type: "shortstr", value: header.props.contentType },
    { type: "shortstr", value: header.props.contentEncoding },
    { type: "table", value: header.props.headers },
    { type: "octet", value: header.props.deliveryMode },
    { type: "octet", value: header.props.priority },
    { type: "shortstr", value: header.props.correlationId },
    { type: "shortstr", value: header.props.replyTo },
    { type: "shortstr", value: header.props.expiration },
    { type: "shortstr", value: header.props.messageId },
    { type: "timestamp", value: header.props.timestamp },
    { type: "shortstr", value: header.props.type },
    { type: "shortstr", value: header.props.userId },
    { type: "shortstr", value: header.props.appId },
    { type: "shortstr", value: header.props.clusterId }
  ]));
  return w.bytes();
}

function encodeTxHeader(header: Extract<Header, { classId: 90 }>): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(header.classId));
  w.writeSync(enc.encodeShortUint(0));
  w.writeSync(enc.encodeLongLongUint(header.size));
  w.writeSync(enc.encodeOptionalFields([]));
  return w.bytes();
}

function encodeConfirmHeader(
  header: Extract<Header, { classId: 85 }>
): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeShortUint(header.classId));
  w.writeSync(enc.encodeShortUint(0));
  w.writeSync(enc.encodeLongLongUint(header.size));
  w.writeSync(enc.encodeOptionalFields([]));
  return w.bytes();
}

function decodeConnectionHeader(r: Deno.SyncReader): Extract<
  Header,
  { classId: 10 }
> {
  const weight = enc.decodeShortUint(r);
  const size = enc.decodeLongLongUint(r);
  const fields = enc.decodeOptionalFields(r, []);
  const props = {};

  return { classId: 10, size, props };
}

function decodeChannelHeader(r: Deno.SyncReader): Extract<
  Header,
  { classId: 20 }
> {
  const weight = enc.decodeShortUint(r);
  const size = enc.decodeLongLongUint(r);
  const fields = enc.decodeOptionalFields(r, []);
  const props = {};

  return { classId: 20, size, props };
}

function decodeAccessHeader(r: Deno.SyncReader): Extract<
  Header,
  { classId: 30 }
> {
  const weight = enc.decodeShortUint(r);
  const size = enc.decodeLongLongUint(r);
  const fields = enc.decodeOptionalFields(r, []);
  const props = {};

  return { classId: 30, size, props };
}

function decodeExchangeHeader(r: Deno.SyncReader): Extract<
  Header,
  { classId: 40 }
> {
  const weight = enc.decodeShortUint(r);
  const size = enc.decodeLongLongUint(r);
  const fields = enc.decodeOptionalFields(r, []);
  const props = {};

  return { classId: 40, size, props };
}

function decodeQueueHeader(r: Deno.SyncReader): Extract<
  Header,
  { classId: 50 }
> {
  const weight = enc.decodeShortUint(r);
  const size = enc.decodeLongLongUint(r);
  const fields = enc.decodeOptionalFields(r, []);
  const props = {};

  return { classId: 50, size, props };
}

function decodeBasicHeader(r: Deno.SyncReader): Extract<
  Header,
  { classId: 60 }
> {
  const weight = enc.decodeShortUint(r);
  const size = enc.decodeLongLongUint(r);
  const fields = enc.decodeOptionalFields(
    r,
    [
      "shortstr",
      "shortstr",
      "table",
      "octet",
      "octet",
      "shortstr",
      "shortstr",
      "shortstr",
      "shortstr",
      "timestamp",
      "shortstr",
      "shortstr",
      "shortstr",
      "shortstr"
    ]
  );
  const props = {
    contentType: fields[0] as string,
    contentEncoding: fields[1] as string,
    headers: fields[2] as Record<string, unknown>,
    deliveryMode: fields[3] as number,
    priority: fields[4] as number,
    correlationId: fields[5] as string,
    replyTo: fields[6] as string,
    expiration: fields[7] as string,
    messageId: fields[8] as string,
    timestamp: fields[9] as bigint,
    type: fields[10] as string,
    userId: fields[11] as string,
    appId: fields[12] as string,
    clusterId: fields[13] as string
  };

  return { classId: 60, size, props };
}

function decodeTxHeader(r: Deno.SyncReader): Extract<Header, { classId: 90 }> {
  const weight = enc.decodeShortUint(r);
  const size = enc.decodeLongLongUint(r);
  const fields = enc.decodeOptionalFields(r, []);
  const props = {};

  return { classId: 90, size, props };
}

function decodeConfirmHeader(r: Deno.SyncReader): Extract<
  Header,
  { classId: 85 }
> {
  const weight = enc.decodeShortUint(r);
  const size = enc.decodeLongLongUint(r);
  const fields = enc.decodeOptionalFields(r, []);
  const props = {};

  return { classId: 85, size, props };
}

export function encodeHeader(header: Header): Uint8Array {
  switch (header.classId) {
    case 10:
      return encodeConnectionHeader(header);
    case 20:
      return encodeChannelHeader(header);
    case 30:
      return encodeAccessHeader(header);
    case 40:
      return encodeExchangeHeader(header);
    case 50:
      return encodeQueueHeader(header);
    case 60:
      return encodeBasicHeader(header);
    case 90:
      return encodeTxHeader(header);
    case 85:
      return encodeConfirmHeader(header);
    default:
      throw new Error("Unknown class " + header!.classId);
  }
}

export function decodeHeader(data: Uint8Array): Header {
  const r = new Deno.Buffer(data);
  const classId = enc.decodeShortUint(r);
  switch (classId) {
    case 10:
      return decodeConnectionHeader(r);
    case 20:
      return decodeChannelHeader(r);
    case 30:
      return decodeAccessHeader(r);
    case 40:
      return decodeExchangeHeader(r);
    case 50:
      return decodeQueueHeader(r);
    case 60:
      return decodeBasicHeader(r);
    case 90:
      return decodeTxHeader(r);
    case 85:
      return decodeConfirmHeader(r);
    default:
      throw new Error("Unknown class " + classId);
  }
}
