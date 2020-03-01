import { AmqpSocket } from "./framing/socket.ts";
import {
  channelOpen,
  channelOpenOk,
  QueueDeclareArgs,
  QueueDeclareOk,
  queueDeclare,
  queueDeclareOk,
  BasicConsumeArgs,
  BasicDeliverArgs,
  BasicProperties,
  BasicConsumeOk,
  basicConsume,
  basicConsumeOk,
  basicDeliver,
  basic,
  BasicPublishArgs,
  basicPublish
} from "./amqp_definitions.ts";

export interface BasicConsumer {
  (args: BasicDeliverArgs, props: BasicProperties, data: Uint8Array): void;
}

export class AmqpChannel {
  constructor(private socket: AmqpSocket, private id: number) {}

  async open() {
    await this.socket.sendMethod(this.id, channelOpen, {});
    await this.socket.receiveMethod(this.id, channelOpenOk);
  }

  async declareQueue(
    args: QueueDeclareArgs
  ): Promise<QueueDeclareOk> {
    await this.socket.sendMethod(this.id, queueDeclare, args);
    return this.socket.receiveMethod(this.id, queueDeclareOk);
  }

  async consume(
    args: BasicConsumeArgs,
    handler: BasicConsumer
  ): Promise<BasicConsumeOk> {
    await this.socket.sendMethod(this.id, basicConsume, args);
    const ok = await this.socket.receiveMethod(this.id, basicConsumeOk);

    this.socket.subscribeMethod(this.id, basicDeliver, async args => {
      const content = await this.socket.receiveContent(this.id, basic);
      handler(args, content.properties, content.data);
    });

    return ok;
  }

  async publish(
    args: BasicPublishArgs,
    props: BasicProperties,
    data: Uint8Array
  ): Promise<void> {
    await this.socket.sendMethod(this.id, basicPublish, args);
    await this.socket.sendContent(this.id, basic, props, data);
  }
}
