import { withTimeout } from "./with_timeout.ts";
import {
  OutgoingFrame,
  AmqpSocket,
  IncomingFrame,
} from "./amqp_socket.ts";

const HEARTBEAT_FRAME: OutgoingFrame = {
  type: "heartbeat",
  channel: 0,
  payload: new Uint8Array([]),
};

class AmqpHeartbeatSocket implements AmqpSocket {
  private heartbeatTimeout: number = 0;
  private sendTimer: number | null = 0;
  private monitorHeartbeats: boolean = false;

  constructor(
    private socket: AmqpSocket,
  ) {}

  async read(): Promise<IncomingFrame> {
    while (true) {
      const timeout = this.monitorHeartbeats
        ? this.heartbeatTimeout * 1000 * 2
        : 0;

      const timeoutMessage =
        `missed heartbeat from server, timeout ${timeout}s`;

      const frame = await withTimeout(
        async () => this.socket.read(),
        timeout,
        timeoutMessage,
      ).catch((error) => {
        this.clear();
        throw error;
      });

      if (frame.type === "heartbeat") {
        continue;
      }

      // close-ok
      if (
        frame.type === "method" && frame.payload.classId === 10 &&
        frame.payload.methodId === 51
      ) {
        this.clear();
      }

      return frame;
    }
  }

  async write(frame: OutgoingFrame): Promise<void> {
    // tune-ok
    if (
      frame.type === "method" && frame.payload.classId === 10 &&
      frame.payload.methodId === 31
    ) {
      this.heartbeatTimeout = frame.payload.args.heartbeat || 0;
    }

    // open
    if (
      frame.type === "method" && frame.payload.classId === 10 &&
      frame.payload.methodId === 40
    ) {
      this.monitorHeartbeats = true;
    }

    // close-ok
    if (
      frame.type === "method" && frame.payload.classId === 10 &&
      frame.payload.methodId === 51
    ) {
      this.clear();
    }

    this.resetSendTimer();
    return this.socket.write(frame);
  }

  private clear() {
    this.monitorHeartbeats = false;
    this.heartbeatTimeout = 0;
    this.resetSendTimer();
  }

  private resetSendTimer() {
    if (this.sendTimer !== null) {
      clearTimeout(this.sendTimer);
      this.sendTimer = null;
    }

    if (this.heartbeatTimeout > 0) {
      this.sendTimer = setTimeout(() => {
        this.socket.write(HEARTBEAT_FRAME);
        this.resetSendTimer();
      }, this.heartbeatTimeout * 1000);
    }
  }
}

export function createHeartbeatSocket(
  socket: AmqpSocket,
): AmqpSocket {
  return new AmqpHeartbeatSocket(socket);
}
