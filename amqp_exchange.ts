import { AmqpChannel } from "./amqp_channel.ts";
import {
  ExchangeDeclareArgs,
  ExchangeDeclareOk,
  ExchangeDeleteArgs,
  ExchangeDeleteOk,
  ExchangeBindArgs,
  ExchangeBindOk,
  ExchangeUnbindArgs,
  ExchangeUnbindOk
} from "./amqp_types.ts";
import {
  EXCHANGE_DECLARE,
  EXCHANGE,
  EXCHANGE_DECLARE_OK,
  EXCHANGE_DELETE,
  EXCHANGE_DELETE_OK,
  EXCHANGE_BIND,
  EXCHANGE_BIND_OK,
  EXCHANGE_UNBIND,
  EXCHANGE_UNBIND_OK
} from "./amqp_constants.ts";

export class AmqpExchange {
  constructor(private socket: AmqpChannel) {}

  async declare(args: ExchangeDeclareArgs): Promise<
    ExchangeDeclareOk
  > {
    await this.socket.sendMethod(
      { classId: EXCHANGE, methodId: EXCHANGE_DECLARE, args }
    );
    const response = await this.socket.receiveMethod(
      EXCHANGE,
      EXCHANGE_DECLARE_OK
    );
    return response;
  }

  async delete(args: ExchangeDeleteArgs): Promise<ExchangeDeleteOk> {
    await this.socket.sendMethod(
      { classId: EXCHANGE, methodId: EXCHANGE_DELETE, args }
    );
    const response = await this.socket.receiveMethod(
      EXCHANGE,
      EXCHANGE_DELETE_OK
    );
    return response;
  }

  async bind(args: ExchangeBindArgs): Promise<ExchangeBindOk> {
    await this.socket.sendMethod(
      { classId: EXCHANGE, methodId: EXCHANGE_BIND, args }
    );
    const response = await this.socket.receiveMethod(
      EXCHANGE,
      EXCHANGE_BIND_OK
    );
    return response;
  }

  async unbind(args: ExchangeUnbindArgs): Promise<ExchangeUnbindOk> {
    await this.socket.sendMethod(
      { classId: EXCHANGE, methodId: EXCHANGE_UNBIND, args }
    );
    const response = await this.socket.receiveMethod(
      EXCHANGE,
      EXCHANGE_UNBIND_OK
    );
    return response;
  }
}
