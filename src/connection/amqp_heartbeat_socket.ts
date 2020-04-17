import {
  AmqpSocket,
  AmqpSocketReader,
  AmqpSocketWriter,
  OutgoingFrame,
  IncomingFrame,
} from "../framing/mod.ts";
import {
  CONNECTION,
  CONNECTION_TUNE_OK,
  CONNECTION_OPEN,
  CONNECTION_CLOSE_OK,
} from "../amqp_constants.ts";

const HEARTBEAT_FRAME: OutgoingFrame = {
  type: "heartbeat",
  channel: 0,
  payload: new Uint8Array([]),
};

class AmqpHeartbeatSocket implements AmqpSocketReader, AmqpSocketWriter {
  private heartbeatTimeout: number = 0;
  private sendTimer: number | null = 0;
  private monitorHeartbeats: boolean = false;

  constructor(
    private socket: AmqpSocket,
  ) {}

  private async heartbeatRead(): Promise<IncomingFrame> {
    const timeout = this.monitorHeartbeats
      ? this.heartbeatTimeout * 1000 * 2
      : 0;

    if (timeout === 0) {
      return this.socket.read();
    }

    const timeoutMessage = `server heartbeat timeout ${this.heartbeatTimeout}s`;

    return new Promise(async (resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error(timeoutMessage));
        this.clear();
        this.socket.close();
      }, timeout);

      this.socket.read()
        .then(resolve)
        .catch(reject)
        .finally(() => clearInterval(timer));
    });
  }

  async read(): Promise<IncomingFrame> {
    while (true) {
      const frame = await this.heartbeatRead();
      if (frame.type === "heartbeat") {
        continue;
      }

      if (frame.type === "method" && frame.payload.classId === CONNECTION) {
        if (frame.payload.methodId === CONNECTION_CLOSE_OK) {
          this.clear();
        }
      }

      return frame;
    }
  }

  async write(frame: OutgoingFrame): Promise<void> {
    if (frame.type === "method" && frame.payload.classId === CONNECTION) {
      if (frame.payload.methodId === CONNECTION_TUNE_OK) {
        this.heartbeatTimeout = frame.payload.args.heartbeat || 0;
      }

      if (frame.payload.methodId === CONNECTION_OPEN) {
        this.monitorHeartbeats = true;
      }

      if (frame.payload.methodId === CONNECTION_CLOSE_OK) {
        this.clear();
      }
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
): AmqpSocketReader & AmqpSocketWriter {
  return new AmqpHeartbeatSocket(socket);
}
