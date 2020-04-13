import { createHeartbeatSocket } from "./amqp_heartbeat_socket.ts";
import {
  createAmqpMux,
  AmqpMultiplexer,
  AmqpSink,
  AmqpSource,
} from "./amqp_multiplexer.ts";
import { AmqpSocket } from "../framing/amqp_socket.ts";

export function createMux(conn: AmqpSocket): AmqpMultiplexer {
  const socket = createHeartbeatSocket(conn);
  return createAmqpMux(socket);
}

export {
  AmqpMultiplexer,
  AmqpSink,
  AmqpSource,
  AmqpSocket,
};
