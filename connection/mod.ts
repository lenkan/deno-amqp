import {
  createAmqpSocket,
  AmqpDecodeReader,
  AmqpEncodeWriter,
  AmqpSocket
} from "./amqp_socket.ts";
import { createHeartbeatSocket } from "./amqp_heartbeat_socket.ts";
import { AmqpFraming } from "../framing/mod.ts";
import {
  createAmqpMux,
  AmqpMultiplexer,
  AmqpSink,
  AmqpSource
} from "./amqp_multiplexer.ts";

export function createSocket(framing: AmqpFraming) {
  return createHeartbeatSocket(createAmqpSocket(framing));
}

export function createMux(framing: AmqpFraming) {
  return createAmqpMux(createHeartbeatSocket(createAmqpSocket(framing)));
}

export {
  AmqpMultiplexer,
  AmqpSink,
  AmqpSource,
  AmqpSocket,
  AmqpDecodeReader,
  AmqpEncodeWriter
};
