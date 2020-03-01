import { AmqpSocket } from "./framing/socket.ts";
import { AmqpChannel } from "./amqp_channel.ts";
import { connectionClose, connection, connectionCloseOk } from "./amqp_definitions.ts";

export interface AmqpConnectionOptions {
  username: string;
  password: string;
}

export class AmqpConnection {
  private channels: AmqpChannel[] = [];

  constructor(
    private socket: AmqpSocket
  ) {
  }

  async createChannel() {
    const id = this.channels.length + 1;
    const channel = new AmqpChannel(this.socket, id);
    this.channels.push(channel);
    await channel.open();
    return channel;
  }

  async close() {
    await this.socket.sendMethod(
      0,
      connectionClose,
      {
        classId: connection.classId,
        methodId: connectionClose.methodId,
        replyCode: 503,
        replyText: "Client closed applicatoin"
      }
    );

    await this.socket.receiveMethod(0, connectionCloseOk)
    await this.socket.close();
  }
}
