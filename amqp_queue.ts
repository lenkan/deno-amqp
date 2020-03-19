import { AmqpChannel } from "./amqp_channel.ts";
import {
  QueueDeclareArgs,
  QueueDeclareOk,
  QueueDeleteArgs,
  QueueDeleteOk,
  QueueBindOk,
  QueueBindArgs,
  QueueUnbindArgs,
  QueueUnbindOk,
  QueuePurgeArgs,
  QueuePurgeOk
} from "./amqp_types.ts";
import {
  QUEUE,
  QUEUE_DECLARE_OK,
  QUEUE_DECLARE,
  QUEUE_DELETE,
  QUEUE_DELETE_OK,
  QUEUE_BIND,
  QUEUE_BIND_OK,
  QUEUE_UNBIND,
  QUEUE_UNBIND_OK,
  QUEUE_PURGE,
  QUEUE_PURGE_OK
} from "./amqp_constants.ts";

export class AmqpQueue {
  constructor(private socket: AmqpChannel) {}

  async declare(args: QueueDeclareArgs): Promise<QueueDeclareOk> {
    await this.socket.send(QUEUE, QUEUE_DECLARE, args);
    const response = await this.socket.receive(QUEUE, QUEUE_DECLARE_OK);
    return response;
  }

  async delete(args: QueueDeleteArgs): Promise<QueueDeleteOk> {
    await this.socket.send(QUEUE, QUEUE_DELETE, args);
    const response = await this.socket.receive(QUEUE, QUEUE_DELETE_OK);
    return response;
  }

  async bind(args: QueueBindArgs): Promise<QueueBindOk> {
    await this.socket.send(QUEUE, QUEUE_BIND, args);
    const response = await this.socket.receive(QUEUE, QUEUE_BIND_OK);
    return response;
  }

  async unbind(args: QueueUnbindArgs): Promise<QueueUnbindOk> {
    await this.socket.send(QUEUE, QUEUE_UNBIND, args);
    const response = await this.socket.receive(QUEUE, QUEUE_UNBIND_OK);
    return response;
  }

  async purge(args: QueuePurgeArgs): Promise<QueuePurgeOk> {
    await this.socket.send(QUEUE, QUEUE_PURGE, args);
    const response = await this.socket.receive(QUEUE, QUEUE_PURGE_OK);
    return response;
  }
}
