import {
  AmqpDecoder,
  AmqpEncoder,
  createAmqpDecoder,
  createAmqpEncoder,
} from "./amqp_encoding.ts";
import { createHeartbeatSocket } from "./amqp_heartbeat_socket.ts";
import { AmqpFraming } from "../framing/mod.ts";
import {
  createAmqpMux,
  AmqpMultiplexer,
  AmqpSink,
  AmqpSource,
} from "./amqp_multiplexer.ts";
import { AmqpSocket } from "./amqp_socket.ts";

export function createMux(conn: AmqpFraming & Deno.Closer): AmqpMultiplexer {
  const socket = createHeartbeatSocket({
    read: createAmqpDecoder(conn),
    write: createAmqpEncoder(conn),
    close: () => conn.close(),
  });
  return createAmqpMux(socket);
}

export {
  AmqpMultiplexer,
  AmqpSink,
  AmqpSource,
  AmqpSocket,
};
