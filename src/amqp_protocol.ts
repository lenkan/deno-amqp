import { AmqpMultiplexer } from "./amqp_multiplexer.ts";
import * as t from "./amqp_types.ts";

export class AmqpProtocol {
  constructor(private mux: AmqpMultiplexer) {}

  async sendConnectionStartOk(
    channel: number,
    args: t.ConnectionStartOkArgs,
  ): Promise<void> {
    await this.mux.send(channel, 10, 11, args);
  }

  async sendConnectionSecureOk(
    channel: number,
    args: t.ConnectionSecureOkArgs,
  ): Promise<void> {
    await this.mux.send(channel, 10, 21, args);
  }

  async sendConnectionTuneOk(
    channel: number,
    args: t.ConnectionTuneOkArgs,
  ): Promise<void> {
    await this.mux.send(channel, 10, 31, args);
  }

  async sendConnectionOpen(
    channel: number,
    args: t.ConnectionOpenArgs,
  ): Promise<t.ConnectionOpenOk> {
    await this.mux.send(channel, 10, 40, args);
    return this.mux.receive(channel, 10, 41);
  }

  async sendConnectionClose(
    channel: number,
    args: t.ConnectionCloseArgs,
  ): Promise<t.ConnectionCloseOk> {
    await this.mux.send(channel, 10, 50, args);
    return this.mux.receive(channel, 10, 51);
  }

  async sendConnectionCloseOk(
    channel: number,
    args: t.ConnectionCloseOkArgs,
  ): Promise<void> {
    await this.mux.send(channel, 10, 51, args);
  }

  async sendChannelOpen(
    channel: number,
    args: t.ChannelOpenArgs,
  ): Promise<t.ChannelOpenOk> {
    await this.mux.send(channel, 20, 10, args);
    return this.mux.receive(channel, 20, 11);
  }

  async sendChannelFlow(
    channel: number,
    args: t.ChannelFlowArgs,
  ): Promise<t.ChannelFlowOk> {
    await this.mux.send(channel, 20, 20, args);
    return this.mux.receive(channel, 20, 21);
  }

  async sendChannelClose(
    channel: number,
    args: t.ChannelCloseArgs,
  ): Promise<t.ChannelCloseOk> {
    await this.mux.send(channel, 20, 40, args);
    return this.mux.receive(channel, 20, 41);
  }

  async sendChannelCloseOk(
    channel: number,
    args: t.ChannelCloseOkArgs,
  ): Promise<void> {
    await this.mux.send(channel, 20, 41, args);
  }

  async sendExchangeDeclareAsync(
    channel: number,
    args: t.ExchangeDeclareArgs,
  ): Promise<void> {
    await this.mux.send(channel, 40, 10, { ...args, nowait: true });
  }

  async sendExchangeDeclare(
    channel: number,
    args: t.ExchangeDeclareArgs,
  ): Promise<t.ExchangeDeclareOk> {
    await this.mux.send(channel, 40, 10, { ...args, nowait: false });
    return this.mux.receive(channel, 40, 11);
  }

  async sendExchangeDeclareOk(
    channel: number,
    args: t.ExchangeDeclareOkArgs,
  ): Promise<void> {
    await this.mux.send(channel, 40, 11, args);
  }

  async sendExchangeDeleteAsync(
    channel: number,
    args: t.ExchangeDeleteArgs,
  ): Promise<void> {
    await this.mux.send(channel, 40, 20, { ...args, nowait: true });
  }

  async sendExchangeDelete(
    channel: number,
    args: t.ExchangeDeleteArgs,
  ): Promise<t.ExchangeDeleteOk> {
    await this.mux.send(channel, 40, 20, { ...args, nowait: false });
    return this.mux.receive(channel, 40, 21);
  }

  async sendExchangeDeleteOk(
    channel: number,
    args: t.ExchangeDeleteOkArgs,
  ): Promise<void> {
    await this.mux.send(channel, 40, 21, args);
  }

  async sendExchangeBindAsync(
    channel: number,
    args: t.ExchangeBindArgs,
  ): Promise<void> {
    await this.mux.send(channel, 40, 30, { ...args, nowait: true });
  }

  async sendExchangeBind(
    channel: number,
    args: t.ExchangeBindArgs,
  ): Promise<t.ExchangeBindOk> {
    await this.mux.send(channel, 40, 30, { ...args, nowait: false });
    return this.mux.receive(channel, 40, 31);
  }

  async sendExchangeBindOk(
    channel: number,
    args: t.ExchangeBindOkArgs,
  ): Promise<void> {
    await this.mux.send(channel, 40, 31, args);
  }

  async sendExchangeUnbindAsync(
    channel: number,
    args: t.ExchangeUnbindArgs,
  ): Promise<void> {
    await this.mux.send(channel, 40, 40, { ...args, nowait: true });
  }

  async sendExchangeUnbind(
    channel: number,
    args: t.ExchangeUnbindArgs,
  ): Promise<t.ExchangeUnbindOk> {
    await this.mux.send(channel, 40, 40, { ...args, nowait: false });
    return this.mux.receive(channel, 40, 51);
  }

  async sendExchangeUnbindOk(
    channel: number,
    args: t.ExchangeUnbindOkArgs,
  ): Promise<void> {
    await this.mux.send(channel, 40, 51, args);
  }

  async sendQueueDeclareAsync(
    channel: number,
    args: t.QueueDeclareArgs,
  ): Promise<void> {
    await this.mux.send(channel, 50, 10, { ...args, nowait: true });
  }

  async sendQueueDeclare(
    channel: number,
    args: t.QueueDeclareArgs,
  ): Promise<t.QueueDeclareOk> {
    await this.mux.send(channel, 50, 10, { ...args, nowait: false });
    return this.mux.receive(channel, 50, 11);
  }

  async sendQueueDeclareOk(
    channel: number,
    args: t.QueueDeclareOkArgs,
  ): Promise<void> {
    await this.mux.send(channel, 50, 11, args);
  }

  async sendQueueBindAsync(
    channel: number,
    args: t.QueueBindArgs,
  ): Promise<void> {
    await this.mux.send(channel, 50, 20, { ...args, nowait: true });
  }

  async sendQueueBind(
    channel: number,
    args: t.QueueBindArgs,
  ): Promise<t.QueueBindOk> {
    await this.mux.send(channel, 50, 20, { ...args, nowait: false });
    return this.mux.receive(channel, 50, 21);
  }

  async sendQueueBindOk(
    channel: number,
    args: t.QueueBindOkArgs,
  ): Promise<void> {
    await this.mux.send(channel, 50, 21, args);
  }

  async sendQueuePurgeAsync(
    channel: number,
    args: t.QueuePurgeArgs,
  ): Promise<void> {
    await this.mux.send(channel, 50, 30, { ...args, nowait: true });
  }

  async sendQueuePurge(
    channel: number,
    args: t.QueuePurgeArgs,
  ): Promise<t.QueuePurgeOk> {
    await this.mux.send(channel, 50, 30, { ...args, nowait: false });
    return this.mux.receive(channel, 50, 31);
  }

  async sendQueuePurgeOk(
    channel: number,
    args: t.QueuePurgeOkArgs,
  ): Promise<void> {
    await this.mux.send(channel, 50, 31, args);
  }

  async sendQueueDeleteAsync(
    channel: number,
    args: t.QueueDeleteArgs,
  ): Promise<void> {
    await this.mux.send(channel, 50, 40, { ...args, nowait: true });
  }

  async sendQueueDelete(
    channel: number,
    args: t.QueueDeleteArgs,
  ): Promise<t.QueueDeleteOk> {
    await this.mux.send(channel, 50, 40, { ...args, nowait: false });
    return this.mux.receive(channel, 50, 41);
  }

  async sendQueueDeleteOk(
    channel: number,
    args: t.QueueDeleteOkArgs,
  ): Promise<void> {
    await this.mux.send(channel, 50, 41, args);
  }

  async sendQueueUnbind(
    channel: number,
    args: t.QueueUnbindArgs,
  ): Promise<t.QueueUnbindOk> {
    await this.mux.send(channel, 50, 50, args);
    return this.mux.receive(channel, 50, 51);
  }

  async sendQueueUnbindOk(
    channel: number,
    args: t.QueueUnbindOkArgs,
  ): Promise<void> {
    await this.mux.send(channel, 50, 51, args);
  }

  async sendBasicQos(
    channel: number,
    args: t.BasicQosArgs,
  ): Promise<t.BasicQosOk> {
    await this.mux.send(channel, 60, 10, args);
    return this.mux.receive(channel, 60, 11);
  }

  async sendBasicConsumeAsync(
    channel: number,
    args: t.BasicConsumeArgs,
  ): Promise<void> {
    await this.mux.send(channel, 60, 20, { ...args, nowait: true });
  }

  async sendBasicConsume(
    channel: number,
    args: t.BasicConsumeArgs,
  ): Promise<t.BasicConsumeOk> {
    await this.mux.send(channel, 60, 20, { ...args, nowait: false });
    return this.mux.receive(channel, 60, 21);
  }

  async sendBasicCancelAsync(
    channel: number,
    args: t.BasicCancelArgs,
  ): Promise<void> {
    await this.mux.send(channel, 60, 30, { ...args, nowait: true });
  }

  async sendBasicCancel(
    channel: number,
    args: t.BasicCancelArgs,
  ): Promise<t.BasicCancelOk> {
    await this.mux.send(channel, 60, 30, { ...args, nowait: false });
    return this.mux.receive(channel, 60, 31);
  }

  async sendBasicPublish(
    channel: number,
    args: t.BasicPublishArgs,
    props: t.BasicProperties,
    data: Uint8Array,
  ) {
    await Promise.all([
      this.mux.send(channel, 60, 40, args),
      this.mux.sendContent(channel, 60, props, data),
    ]);
  }

  async sendBasicGet(
    channel: number,
    args: t.BasicGetArgs,
  ): Promise<t.BasicGetOk | t.BasicGetEmpty> {
    await this.mux.send(channel, 60, 70, args);
    return Promise.race([
      this.mux.receive(channel, 60, 71),
      this.mux.receive(channel, 60, 72),
    ]);
  }

  async sendBasicAck(channel: number, args: t.BasicAckArgs): Promise<void> {
    await this.mux.send(channel, 60, 80, args);
  }

  async sendBasicReject(
    channel: number,
    args: t.BasicRejectArgs,
  ): Promise<void> {
    await this.mux.send(channel, 60, 90, args);
  }

  async sendBasicRecoverAsync(
    channel: number,
    args: t.BasicRecoverAsyncArgs,
  ): Promise<void> {
    await this.mux.send(channel, 60, 100, args);
  }

  async sendBasicRecover(
    channel: number,
    args: t.BasicRecoverArgs,
  ): Promise<t.BasicRecoverOk> {
    await this.mux.send(channel, 60, 110, args);
    return this.mux.receive(channel, 60, 111);
  }

  async sendBasicNack(channel: number, args: t.BasicNackArgs): Promise<void> {
    await this.mux.send(channel, 60, 120, args);
  }

  async sendTxSelect(
    channel: number,
    args: t.TxSelectArgs,
  ): Promise<t.TxSelectOk> {
    await this.mux.send(channel, 90, 10, args);
    return this.mux.receive(channel, 90, 11);
  }

  async sendTxCommit(
    channel: number,
    args: t.TxCommitArgs,
  ): Promise<t.TxCommitOk> {
    await this.mux.send(channel, 90, 20, args);
    return this.mux.receive(channel, 90, 21);
  }

  async sendTxRollback(
    channel: number,
    args: t.TxRollbackArgs,
  ): Promise<t.TxRollbackOk> {
    await this.mux.send(channel, 90, 30, args);
    return this.mux.receive(channel, 90, 31);
  }

  async sendConfirmSelectAsync(
    channel: number,
    args: t.ConfirmSelectArgs,
  ): Promise<void> {
    await this.mux.send(channel, 85, 10, { ...args, nowait: true });
  }

  async sendConfirmSelect(
    channel: number,
    args: t.ConfirmSelectArgs,
  ): Promise<t.ConfirmSelectOk> {
    await this.mux.send(channel, 85, 10, { ...args, nowait: false });
    return this.mux.receive(channel, 85, 11);
  }

  async receiveConnectionStart(channel: number): Promise<t.ConnectionStart> {
    return this.mux.receive(channel, 10, 10);
  }

  async receiveConnectionSecure(channel: number): Promise<t.ConnectionSecure> {
    return this.mux.receive(channel, 10, 20);
  }

  async receiveConnectionTune(channel: number): Promise<t.ConnectionTune> {
    return this.mux.receive(channel, 10, 30);
  }

  async receiveConnectionClose(channel: number): Promise<t.ConnectionClose> {
    return this.mux.receive(channel, 10, 50);
  }

  async receiveChannelFlow(channel: number): Promise<t.ChannelFlow> {
    return this.mux.receive(channel, 20, 20);
  }

  async receiveChannelClose(channel: number): Promise<t.ChannelClose> {
    return this.mux.receive(channel, 20, 40);
  }

  async receiveBasicAck(channel: number): Promise<t.BasicAck> {
    return this.mux.receive(channel, 60, 80);
  }

  async receiveBasicNack(channel: number): Promise<t.BasicNack> {
    return this.mux.receive(channel, 60, 120);
  }

  subscribeConnectionStart(
    channel: number,
    handler: (args: t.ConnectionStart) => void,
  ): () => void {
    return this.mux.subscribe(channel, 10, 10, handler);
  }

  subscribeConnectionSecure(
    channel: number,
    handler: (args: t.ConnectionSecure) => void,
  ): () => void {
    return this.mux.subscribe(channel, 10, 20, handler);
  }

  subscribeConnectionTune(
    channel: number,
    handler: (args: t.ConnectionTune) => void,
  ): () => void {
    return this.mux.subscribe(channel, 10, 30, handler);
  }

  subscribeConnectionClose(
    channel: number,
    handler: (args: t.ConnectionClose) => void,
  ): () => void {
    return this.mux.subscribe(channel, 10, 50, handler);
  }

  subscribeChannelFlow(
    channel: number,
    handler: (args: t.ChannelFlow) => void,
  ): () => void {
    return this.mux.subscribe(channel, 20, 20, handler);
  }

  subscribeChannelClose(
    channel: number,
    handler: (args: t.ChannelClose) => void,
  ): () => void {
    return this.mux.subscribe(channel, 20, 40, handler);
  }

  subscribeBasicReturn(
    channel: number,
    handler: (
      args: t.BasicReturn,
      props: t.BasicProperties,
      data: Uint8Array,
    ) => void,
  ): () => void {
    return this.mux.subscribe(channel, 60, 50, async (method) => {
      const [props, content] = await this.mux.receiveContent(channel, 60);
      return handler(method, props, content);
    });
  }

  subscribeBasicDeliver(
    channel: number,
    handler: (
      args: t.BasicDeliver,
      props: t.BasicProperties,
      data: Uint8Array,
    ) => void,
  ): () => void {
    return this.mux.subscribe(channel, 60, 60, async (method) => {
      const [props, content] = await this.mux.receiveContent(channel, 60);
      return handler(method, props, content);
    });
  }

  subscribeBasicAck(
    channel: number,
    handler: (args: t.BasicAck) => void,
  ): () => void {
    return this.mux.subscribe(channel, 60, 80, handler);
  }

  subscribeBasicNack(
    channel: number,
    handler: (args: t.BasicNack) => void,
  ): () => void {
    return this.mux.subscribe(channel, 60, 120, handler);
  }
}
