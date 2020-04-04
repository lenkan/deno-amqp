import {
  Frame,
  AmqpReaderWriter
} from "./types.ts";
import { withTimeout } from "./with_timeout.ts";

const HEARTBEAT_FRAME: Frame = {
  type: 8,
  channel: 0,
  payload: new Uint8Array([]),
};

export class AmqpHeartbeatMiddleware implements AmqpReaderWriter {
  private heartbeatTimeout: number = 0;
  private sendTimer: number | null = 0;

  constructor(private socket: AmqpReaderWriter) {}

  async read(): Promise<Frame> {
    const timeoutMessage =
      `missed heartbeat from server, timeout ${this.heartbeatTimeout}s`;

    while (true) {
      const result = await withTimeout(async () => {
        const frame = await this.socket.read();

        if (!frame) {
          throw new Error("Connection closed by server");
        }

        return frame;
      }, this.heartbeatTimeout * 1000 * 2, timeoutMessage);

      if (result.type === 8) {
        continue;
      }

      return result;
    }
  }

  write(frame: Frame): Promise<void> {
    this.resetSendTimer();
    return this.socket.write(frame);
  }

  setHeartbeatInterval(interval: number) {
    this.heartbeatTimeout = interval;
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
