import { AmqpSocket, FrameMiddleware, FrameContext, Next } from "./framing/socket.ts";
import { FRAME_ERROR } from "./framing/constants.ts";

function monitorHeartbeat(): FrameMiddleware & { start(ms: number): void } {
  let timer = null;

  function start(ms: number) {

  }

  function stop() {

  }

  function middleware(context: FrameContext, next: Next) {
    const { frame } = context;
    if (frame.type !== "heartbeat") {
      return next();
    }

    if (frame.channel !== 0) {
      return context.write({
        type: "method",
        name: "connection.close",
        channel: frame.channel,
        args: {
          classId: 0,
          methodId: 0,
          replyCode: FRAME_ERROR,
          replyText: `Heartbeat on channel ${frame.channel}`
        }
      });
    }

    console.log("Received heartbeat");
  }
}

export function createHeartbeat() {
  let heartbeatTimer: number;
  let monitorTimer: number;
  function monitor() {
    const start = () => {
      monitorTimer = setTimeout(() => {
        console.error("No heartbeat");
      }, intervalSeconds * 2 * 1000);
    };

    socket.listen(frame => {
      if (frame.type === "heartbeat" && frame.channel === 0) {
        console.log(`Received heartbeat : ${JSON.stringify(frame)}`);
        clearTimeout(monitorTimer);
        start();
      }
    });
  }

  function start(intervalSeconds: number) {
    heartbeatTimer = setInterval(async () => {
      await socket.write({
        type: "heartbeat",
        channel: 0
      });
    }, (intervalSeconds * 1000) / 2);
  }

  function stop() {
    clearInterval(heartbeatTimer);
    clearTimeout(monitorTimer);
  }

  return { monitor, start, stop };
}
