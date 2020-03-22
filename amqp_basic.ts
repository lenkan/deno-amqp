import { AmqpChannel } from "./amqp_channel.ts";
import {
  BasicProperties,
  BasicQosArgs,
  BasicQosOk,
  BasicAckArgs,
  BasicNackArgs,
  BasicConsumeArgs,
  BasicConsumeOk,
  BasicCancelArgs,
  BasicCancelOk,
  BasicPublishArgs,
  BasicDeliverArgs
} from "./amqp_types.ts";
import {
  BASIC,
  BASIC_DELIVER,
  BASIC_QOS,
  BASIC_QOS_OK,
  BASIC_ACK,
  BASIC_NACK,
  BASIC_CONSUME_OK,
  BASIC_CONSUME,
  BASIC_CANCEL_OK,
  BASIC_CANCEL,
  BASIC_PUBLISH
} from "./amqp_constants.ts";

export interface BasicDeliverHandler {
  (args: BasicDeliverArgs, props: BasicProperties, data: Uint8Array): void;
}

export class AmqpBasic {
  private consumers: { tag: string; handler: BasicDeliverHandler }[] = [];

  constructor(private socket: AmqpChannel) {
    this.socket.subscribe(BASIC, BASIC_DELIVER, (args, props, data) => {
      this.consumers.forEach(consumer => {
        if (consumer.tag === args.consumerTag) {
          consumer.handler(args, props, data);
        }
      });
    });
  }

  async qos(args: BasicQosArgs): Promise<BasicQosOk> {
    await this.socket.sendMethod(
      { classId: BASIC, methodId: BASIC_QOS, args }
    );
    return this.socket.receiveMethod(BASIC, BASIC_QOS_OK);
  }

  async ack(args: BasicAckArgs) {
    await this.socket.sendMethod(
      { classId: BASIC, methodId: BASIC_ACK, args }
    );
  }

  async nack(args: BasicNackArgs) {
    await this.socket.sendMethod(
      { classId: BASIC, methodId: BASIC_NACK, args }
    );
  }

  async consume(args: BasicConsumeArgs, handler: BasicDeliverHandler): Promise<
    BasicConsumeOk
  > {
    await this.socket.sendMethod(
      { classId: BASIC, methodId: BASIC_CONSUME, args }
    );
    const response = await this.socket.receiveMethod(BASIC, BASIC_CONSUME_OK);
    this.consumers.push({ tag: response.consumerTag, handler });
    return response;
  }

  async cancel(args: BasicCancelArgs): Promise<BasicCancelOk> {
    await this.socket.sendMethod(
      { classId: BASIC, methodId: BASIC_CANCEL, args }
    );
    const response = await this.socket.receiveMethod(BASIC, BASIC_CANCEL_OK);

    const index = this.consumers.findIndex(c => c.tag === args.consumerTag);
    if (index !== -1) {
      this.consumers.splice(index, index + 1);
    }

    return response;
  }

  async publish(
    args: BasicPublishArgs,
    props: BasicProperties,
    data: Uint8Array
  ): Promise<void> {
    await this.socket.sendMethod(
      { classId: BASIC, methodId: BASIC_PUBLISH, args }
    );
    await this.socket.sendHeader({ classId: BASIC, props, size: data.length });
    await this.socket.sendContent(data);
  }
}
