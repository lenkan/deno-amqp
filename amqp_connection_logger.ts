import { Frame } from "./framing/socket.ts";
import { getClassName, getMethodName } from "./amqp_helpers.ts";

export interface Logger {
  log(...args: unknown[]): void;
}

function formatFrame(frame: Frame) {
  if (frame.type === "heartbeat") {
    return "heartbeat";
  }

  if (frame.type === "method") {
    return `method(${getMethodName(
      frame.payload.classId,
      frame.payload.methodId
    )})`;
  }

  if (frame.type === "content") {
    return `content(size: ${frame.payload.length})`;
  }

  if (frame.type === "header") {
    return `header(${getClassName(
      frame.payload.classId
    )}, size: ${frame.payload.size})`;
  }

  throw new Error("Unknown frame type");
}

export function createLogger(logger?: Logger) {
  function logSend(frame: Frame) {
    logger && logger.log(`SEND(${frame.channel}) ${formatFrame(frame)}`);
  }

  function logRecv(frame: Frame) {
    const prefix = `RECV(${frame.channel}) `;
    logger && logger.log(prefix + formatFrame(frame));
  }
  return { logSend, logRecv };
}
