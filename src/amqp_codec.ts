// deno-lint-ignore-file no-explicit-any
import * as enc from "./encoding/mod.ts";
import * as t from "./amqp_types.ts";

const methodNames: Record<number, Record<number, string>> = {
  [10]: {
    [10]: "connection.start",
    [11]: "connection.start-ok",
    [20]: "connection.secure",
    [21]: "connection.secure-ok",
    [30]: "connection.tune",
    [31]: "connection.tune-ok",
    [40]: "connection.open",
    [41]: "connection.open-ok",
    [50]: "connection.close",
    [51]: "connection.close-ok",
    [60]: "connection.blocked",
    [61]: "connection.unblocked",
    [70]: "connection.update-secret",
    [71]: "connection.update-secret-ok",
  },
  [20]: {
    [10]: "channel.open",
    [11]: "channel.open-ok",
    [20]: "channel.flow",
    [21]: "channel.flow-ok",
    [40]: "channel.close",
    [41]: "channel.close-ok",
  },
  [30]: {
    [10]: "access.request",
    [11]: "access.request-ok",
  },
  [40]: {
    [10]: "exchange.declare",
    [11]: "exchange.declare-ok",
    [20]: "exchange.delete",
    [21]: "exchange.delete-ok",
    [30]: "exchange.bind",
    [31]: "exchange.bind-ok",
    [40]: "exchange.unbind",
    [51]: "exchange.unbind-ok",
  },
  [50]: {
    [10]: "queue.declare",
    [11]: "queue.declare-ok",
    [20]: "queue.bind",
    [21]: "queue.bind-ok",
    [30]: "queue.purge",
    [31]: "queue.purge-ok",
    [40]: "queue.delete",
    [41]: "queue.delete-ok",
    [50]: "queue.unbind",
    [51]: "queue.unbind-ok",
  },
  [60]: {
    [10]: "basic.qos",
    [11]: "basic.qos-ok",
    [20]: "basic.consume",
    [21]: "basic.consume-ok",
    [30]: "basic.cancel",
    [31]: "basic.cancel-ok",
    [40]: "basic.publish",
    [50]: "basic.return",
    [60]: "basic.deliver",
    [70]: "basic.get",
    [71]: "basic.get-ok",
    [72]: "basic.get-empty",
    [80]: "basic.ack",
    [90]: "basic.reject",
    [100]: "basic.recover-async",
    [110]: "basic.recover",
    [111]: "basic.recover-ok",
    [120]: "basic.nack",
  },
  [90]: {
    [10]: "tx.select",
    [11]: "tx.select-ok",
    [20]: "tx.commit",
    [21]: "tx.commit-ok",
    [30]: "tx.rollback",
    [31]: "tx.rollback-ok",
  },
  [85]: {
    [10]: "confirm.select",
    [11]: "confirm.select-ok",
  },
};

export function getMethodName(
  classId: number,
  methodId: number,
): string | undefined {
  return methodNames[classId] && methodNames[classId][methodId];
}

export type WithNowait<T> = T & { nowait?: boolean };

export interface ReceiveConnectionStart {
  classId: 10;
  methodId: 10;
  args: t.ConnectionStart;
}

export interface ReceiveConnectionStartOk {
  classId: 10;
  methodId: 11;
  args: t.ConnectionStartOk;
}

export interface ReceiveConnectionSecure {
  classId: 10;
  methodId: 20;
  args: t.ConnectionSecure;
}

export interface ReceiveConnectionSecureOk {
  classId: 10;
  methodId: 21;
  args: t.ConnectionSecureOk;
}

export interface ReceiveConnectionTune {
  classId: 10;
  methodId: 30;
  args: t.ConnectionTune;
}

export interface ReceiveConnectionTuneOk {
  classId: 10;
  methodId: 31;
  args: t.ConnectionTuneOk;
}

export interface ReceiveConnectionOpen {
  classId: 10;
  methodId: 40;
  args: t.ConnectionOpen;
}

export interface ReceiveConnectionOpenOk {
  classId: 10;
  methodId: 41;
  args: t.ConnectionOpenOk;
}

export interface ReceiveConnectionClose {
  classId: 10;
  methodId: 50;
  args: t.ConnectionClose;
}

export interface ReceiveConnectionCloseOk {
  classId: 10;
  methodId: 51;
  args: t.ConnectionCloseOk;
}

export interface ReceiveConnectionBlocked {
  classId: 10;
  methodId: 60;
  args: t.ConnectionBlocked;
}

export interface ReceiveConnectionUnblocked {
  classId: 10;
  methodId: 61;
  args: t.ConnectionUnblocked;
}

export interface ReceiveConnectionUpdateSecret {
  classId: 10;
  methodId: 70;
  args: t.ConnectionUpdateSecret;
}

export interface ReceiveConnectionUpdateSecretOk {
  classId: 10;
  methodId: 71;
  args: t.ConnectionUpdateSecretOk;
}

export interface ReceiveChannelOpen {
  classId: 20;
  methodId: 10;
  args: t.ChannelOpen;
}

export interface ReceiveChannelOpenOk {
  classId: 20;
  methodId: 11;
  args: t.ChannelOpenOk;
}

export interface ReceiveChannelFlow {
  classId: 20;
  methodId: 20;
  args: t.ChannelFlow;
}

export interface ReceiveChannelFlowOk {
  classId: 20;
  methodId: 21;
  args: t.ChannelFlowOk;
}

export interface ReceiveChannelClose {
  classId: 20;
  methodId: 40;
  args: t.ChannelClose;
}

export interface ReceiveChannelCloseOk {
  classId: 20;
  methodId: 41;
  args: t.ChannelCloseOk;
}

export interface ReceiveAccessRequest {
  classId: 30;
  methodId: 10;
  args: t.AccessRequest;
}

export interface ReceiveAccessRequestOk {
  classId: 30;
  methodId: 11;
  args: t.AccessRequestOk;
}

export interface ReceiveExchangeDeclare {
  classId: 40;
  methodId: 10;
  args: t.ExchangeDeclare;
}

export interface ReceiveExchangeDeclareOk {
  classId: 40;
  methodId: 11;
  args: t.ExchangeDeclareOk;
}

export interface ReceiveExchangeDelete {
  classId: 40;
  methodId: 20;
  args: t.ExchangeDelete;
}

export interface ReceiveExchangeDeleteOk {
  classId: 40;
  methodId: 21;
  args: t.ExchangeDeleteOk;
}

export interface ReceiveExchangeBind {
  classId: 40;
  methodId: 30;
  args: t.ExchangeBind;
}

export interface ReceiveExchangeBindOk {
  classId: 40;
  methodId: 31;
  args: t.ExchangeBindOk;
}

export interface ReceiveExchangeUnbind {
  classId: 40;
  methodId: 40;
  args: t.ExchangeUnbind;
}

export interface ReceiveExchangeUnbindOk {
  classId: 40;
  methodId: 51;
  args: t.ExchangeUnbindOk;
}

export interface ReceiveQueueDeclare {
  classId: 50;
  methodId: 10;
  args: t.QueueDeclare;
}

export interface ReceiveQueueDeclareOk {
  classId: 50;
  methodId: 11;
  args: t.QueueDeclareOk;
}

export interface ReceiveQueueBind {
  classId: 50;
  methodId: 20;
  args: t.QueueBind;
}

export interface ReceiveQueueBindOk {
  classId: 50;
  methodId: 21;
  args: t.QueueBindOk;
}

export interface ReceiveQueuePurge {
  classId: 50;
  methodId: 30;
  args: t.QueuePurge;
}

export interface ReceiveQueuePurgeOk {
  classId: 50;
  methodId: 31;
  args: t.QueuePurgeOk;
}

export interface ReceiveQueueDelete {
  classId: 50;
  methodId: 40;
  args: t.QueueDelete;
}

export interface ReceiveQueueDeleteOk {
  classId: 50;
  methodId: 41;
  args: t.QueueDeleteOk;
}

export interface ReceiveQueueUnbind {
  classId: 50;
  methodId: 50;
  args: t.QueueUnbind;
}

export interface ReceiveQueueUnbindOk {
  classId: 50;
  methodId: 51;
  args: t.QueueUnbindOk;
}

export interface ReceiveBasicQos {
  classId: 60;
  methodId: 10;
  args: t.BasicQos;
}

export interface ReceiveBasicQosOk {
  classId: 60;
  methodId: 11;
  args: t.BasicQosOk;
}

export interface ReceiveBasicConsume {
  classId: 60;
  methodId: 20;
  args: t.BasicConsume;
}

export interface ReceiveBasicConsumeOk {
  classId: 60;
  methodId: 21;
  args: t.BasicConsumeOk;
}

export interface ReceiveBasicCancel {
  classId: 60;
  methodId: 30;
  args: t.BasicCancel;
}

export interface ReceiveBasicCancelOk {
  classId: 60;
  methodId: 31;
  args: t.BasicCancelOk;
}

export interface ReceiveBasicPublish {
  classId: 60;
  methodId: 40;
  args: t.BasicPublish;
}

export interface ReceiveBasicReturn {
  classId: 60;
  methodId: 50;
  args: t.BasicReturn;
}

export interface ReceiveBasicDeliver {
  classId: 60;
  methodId: 60;
  args: t.BasicDeliver;
}

export interface ReceiveBasicGet {
  classId: 60;
  methodId: 70;
  args: t.BasicGet;
}

export interface ReceiveBasicGetOk {
  classId: 60;
  methodId: 71;
  args: t.BasicGetOk;
}

export interface ReceiveBasicGetEmpty {
  classId: 60;
  methodId: 72;
  args: t.BasicGetEmpty;
}

export interface ReceiveBasicAck {
  classId: 60;
  methodId: 80;
  args: t.BasicAck;
}

export interface ReceiveBasicReject {
  classId: 60;
  methodId: 90;
  args: t.BasicReject;
}

export interface ReceiveBasicRecoverAsync {
  classId: 60;
  methodId: 100;
  args: t.BasicRecoverAsync;
}

export interface ReceiveBasicRecover {
  classId: 60;
  methodId: 110;
  args: t.BasicRecover;
}

export interface ReceiveBasicRecoverOk {
  classId: 60;
  methodId: 111;
  args: t.BasicRecoverOk;
}

export interface ReceiveBasicNack {
  classId: 60;
  methodId: 120;
  args: t.BasicNack;
}

export interface ReceiveTxSelect {
  classId: 90;
  methodId: 10;
  args: t.TxSelect;
}

export interface ReceiveTxSelectOk {
  classId: 90;
  methodId: 11;
  args: t.TxSelectOk;
}

export interface ReceiveTxCommit {
  classId: 90;
  methodId: 20;
  args: t.TxCommit;
}

export interface ReceiveTxCommitOk {
  classId: 90;
  methodId: 21;
  args: t.TxCommitOk;
}

export interface ReceiveTxRollback {
  classId: 90;
  methodId: 30;
  args: t.TxRollback;
}

export interface ReceiveTxRollbackOk {
  classId: 90;
  methodId: 31;
  args: t.TxRollbackOk;
}

export interface ReceiveConfirmSelect {
  classId: 85;
  methodId: 10;
  args: t.ConfirmSelect;
}

export interface ReceiveConfirmSelectOk {
  classId: 85;
  methodId: 11;
  args: t.ConfirmSelectOk;
}

export interface SendConnectionStart {
  classId: 10;
  methodId: 10;
  args: t.ConnectionStartArgs;
}

export interface SendConnectionStartOk {
  classId: 10;
  methodId: 11;
  args: t.ConnectionStartOkArgs;
}

export interface SendConnectionSecure {
  classId: 10;
  methodId: 20;
  args: t.ConnectionSecureArgs;
}

export interface SendConnectionSecureOk {
  classId: 10;
  methodId: 21;
  args: t.ConnectionSecureOkArgs;
}

export interface SendConnectionTune {
  classId: 10;
  methodId: 30;
  args: t.ConnectionTuneArgs;
}

export interface SendConnectionTuneOk {
  classId: 10;
  methodId: 31;
  args: t.ConnectionTuneOkArgs;
}

export interface SendConnectionOpen {
  classId: 10;
  methodId: 40;
  args: t.ConnectionOpenArgs;
}

export interface SendConnectionOpenOk {
  classId: 10;
  methodId: 41;
  args: t.ConnectionOpenOkArgs;
}

export interface SendConnectionClose {
  classId: 10;
  methodId: 50;
  args: t.ConnectionCloseArgs;
}

export interface SendConnectionCloseOk {
  classId: 10;
  methodId: 51;
  args: t.ConnectionCloseOkArgs;
}

export interface SendConnectionBlocked {
  classId: 10;
  methodId: 60;
  args: t.ConnectionBlockedArgs;
}

export interface SendConnectionUnblocked {
  classId: 10;
  methodId: 61;
  args: t.ConnectionUnblockedArgs;
}

export interface SendConnectionUpdateSecret {
  classId: 10;
  methodId: 70;
  args: t.ConnectionUpdateSecretArgs;
}

export interface SendConnectionUpdateSecretOk {
  classId: 10;
  methodId: 71;
  args: t.ConnectionUpdateSecretOkArgs;
}

export interface SendChannelOpen {
  classId: 20;
  methodId: 10;
  args: t.ChannelOpenArgs;
}

export interface SendChannelOpenOk {
  classId: 20;
  methodId: 11;
  args: t.ChannelOpenOkArgs;
}

export interface SendChannelFlow {
  classId: 20;
  methodId: 20;
  args: t.ChannelFlowArgs;
}

export interface SendChannelFlowOk {
  classId: 20;
  methodId: 21;
  args: t.ChannelFlowOkArgs;
}

export interface SendChannelClose {
  classId: 20;
  methodId: 40;
  args: t.ChannelCloseArgs;
}

export interface SendChannelCloseOk {
  classId: 20;
  methodId: 41;
  args: t.ChannelCloseOkArgs;
}

export interface SendAccessRequest {
  classId: 30;
  methodId: 10;
  args: t.AccessRequestArgs;
}

export interface SendAccessRequestOk {
  classId: 30;
  methodId: 11;
  args: t.AccessRequestOkArgs;
}

export interface SendExchangeDeclare {
  classId: 40;
  methodId: 10;
  args: WithNowait<t.ExchangeDeclareArgs>;
}

export interface SendExchangeDeclareOk {
  classId: 40;
  methodId: 11;
  args: t.ExchangeDeclareOkArgs;
}

export interface SendExchangeDelete {
  classId: 40;
  methodId: 20;
  args: WithNowait<t.ExchangeDeleteArgs>;
}

export interface SendExchangeDeleteOk {
  classId: 40;
  methodId: 21;
  args: t.ExchangeDeleteOkArgs;
}

export interface SendExchangeBind {
  classId: 40;
  methodId: 30;
  args: WithNowait<t.ExchangeBindArgs>;
}

export interface SendExchangeBindOk {
  classId: 40;
  methodId: 31;
  args: t.ExchangeBindOkArgs;
}

export interface SendExchangeUnbind {
  classId: 40;
  methodId: 40;
  args: WithNowait<t.ExchangeUnbindArgs>;
}

export interface SendExchangeUnbindOk {
  classId: 40;
  methodId: 51;
  args: t.ExchangeUnbindOkArgs;
}

export interface SendQueueDeclare {
  classId: 50;
  methodId: 10;
  args: WithNowait<t.QueueDeclareArgs>;
}

export interface SendQueueDeclareOk {
  classId: 50;
  methodId: 11;
  args: t.QueueDeclareOkArgs;
}

export interface SendQueueBind {
  classId: 50;
  methodId: 20;
  args: WithNowait<t.QueueBindArgs>;
}

export interface SendQueueBindOk {
  classId: 50;
  methodId: 21;
  args: t.QueueBindOkArgs;
}

export interface SendQueuePurge {
  classId: 50;
  methodId: 30;
  args: WithNowait<t.QueuePurgeArgs>;
}

export interface SendQueuePurgeOk {
  classId: 50;
  methodId: 31;
  args: t.QueuePurgeOkArgs;
}

export interface SendQueueDelete {
  classId: 50;
  methodId: 40;
  args: WithNowait<t.QueueDeleteArgs>;
}

export interface SendQueueDeleteOk {
  classId: 50;
  methodId: 41;
  args: t.QueueDeleteOkArgs;
}

export interface SendQueueUnbind {
  classId: 50;
  methodId: 50;
  args: t.QueueUnbindArgs;
}

export interface SendQueueUnbindOk {
  classId: 50;
  methodId: 51;
  args: t.QueueUnbindOkArgs;
}

export interface SendBasicQos {
  classId: 60;
  methodId: 10;
  args: t.BasicQosArgs;
}

export interface SendBasicQosOk {
  classId: 60;
  methodId: 11;
  args: t.BasicQosOkArgs;
}

export interface SendBasicConsume {
  classId: 60;
  methodId: 20;
  args: WithNowait<t.BasicConsumeArgs>;
}

export interface SendBasicConsumeOk {
  classId: 60;
  methodId: 21;
  args: t.BasicConsumeOkArgs;
}

export interface SendBasicCancel {
  classId: 60;
  methodId: 30;
  args: WithNowait<t.BasicCancelArgs>;
}

export interface SendBasicCancelOk {
  classId: 60;
  methodId: 31;
  args: t.BasicCancelOkArgs;
}

export interface SendBasicPublish {
  classId: 60;
  methodId: 40;
  args: t.BasicPublishArgs;
}

export interface SendBasicReturn {
  classId: 60;
  methodId: 50;
  args: t.BasicReturnArgs;
}

export interface SendBasicDeliver {
  classId: 60;
  methodId: 60;
  args: t.BasicDeliverArgs;
}

export interface SendBasicGet {
  classId: 60;
  methodId: 70;
  args: t.BasicGetArgs;
}

export interface SendBasicGetOk {
  classId: 60;
  methodId: 71;
  args: t.BasicGetOkArgs;
}

export interface SendBasicGetEmpty {
  classId: 60;
  methodId: 72;
  args: t.BasicGetEmptyArgs;
}

export interface SendBasicAck {
  classId: 60;
  methodId: 80;
  args: t.BasicAckArgs;
}

export interface SendBasicReject {
  classId: 60;
  methodId: 90;
  args: t.BasicRejectArgs;
}

export interface SendBasicRecoverAsync {
  classId: 60;
  methodId: 100;
  args: t.BasicRecoverAsyncArgs;
}

export interface SendBasicRecover {
  classId: 60;
  methodId: 110;
  args: t.BasicRecoverArgs;
}

export interface SendBasicRecoverOk {
  classId: 60;
  methodId: 111;
  args: t.BasicRecoverOkArgs;
}

export interface SendBasicNack {
  classId: 60;
  methodId: 120;
  args: t.BasicNackArgs;
}

export interface SendTxSelect {
  classId: 90;
  methodId: 10;
  args: t.TxSelectArgs;
}

export interface SendTxSelectOk {
  classId: 90;
  methodId: 11;
  args: t.TxSelectOkArgs;
}

export interface SendTxCommit {
  classId: 90;
  methodId: 20;
  args: t.TxCommitArgs;
}

export interface SendTxCommitOk {
  classId: 90;
  methodId: 21;
  args: t.TxCommitOkArgs;
}

export interface SendTxRollback {
  classId: 90;
  methodId: 30;
  args: t.TxRollbackArgs;
}

export interface SendTxRollbackOk {
  classId: 90;
  methodId: 31;
  args: t.TxRollbackOkArgs;
}

export interface SendConfirmSelect {
  classId: 85;
  methodId: 10;
  args: WithNowait<t.ConfirmSelectArgs>;
}

export interface SendConfirmSelectOk {
  classId: 85;
  methodId: 11;
  args: t.ConfirmSelectOkArgs;
}

export interface ConnectionHeader {
  classId: 10;
  props: t.ConnectionProperties;
  size: number;
}

export interface ChannelHeader {
  classId: 20;
  props: t.ChannelProperties;
  size: number;
}

export interface AccessHeader {
  classId: 30;
  props: t.AccessProperties;
  size: number;
}

export interface ExchangeHeader {
  classId: 40;
  props: t.ExchangeProperties;
  size: number;
}

export interface QueueHeader {
  classId: 50;
  props: t.QueueProperties;
  size: number;
}

export interface BasicHeader {
  classId: 60;
  props: t.BasicProperties;
  size: number;
}

export interface TxHeader {
  classId: 90;
  props: t.TxProperties;
  size: number;
}

export interface ConfirmHeader {
  classId: 85;
  props: t.ConfirmProperties;
  size: number;
}

export type ReceiveMethod =
  | ReceiveConnectionStart
  | ReceiveConnectionStartOk
  | ReceiveConnectionSecure
  | ReceiveConnectionSecureOk
  | ReceiveConnectionTune
  | ReceiveConnectionTuneOk
  | ReceiveConnectionOpen
  | ReceiveConnectionOpenOk
  | ReceiveConnectionClose
  | ReceiveConnectionCloseOk
  | ReceiveConnectionBlocked
  | ReceiveConnectionUnblocked
  | ReceiveConnectionUpdateSecret
  | ReceiveConnectionUpdateSecretOk
  | ReceiveChannelOpen
  | ReceiveChannelOpenOk
  | ReceiveChannelFlow
  | ReceiveChannelFlowOk
  | ReceiveChannelClose
  | ReceiveChannelCloseOk
  | ReceiveAccessRequest
  | ReceiveAccessRequestOk
  | ReceiveExchangeDeclare
  | ReceiveExchangeDeclareOk
  | ReceiveExchangeDelete
  | ReceiveExchangeDeleteOk
  | ReceiveExchangeBind
  | ReceiveExchangeBindOk
  | ReceiveExchangeUnbind
  | ReceiveExchangeUnbindOk
  | ReceiveQueueDeclare
  | ReceiveQueueDeclareOk
  | ReceiveQueueBind
  | ReceiveQueueBindOk
  | ReceiveQueuePurge
  | ReceiveQueuePurgeOk
  | ReceiveQueueDelete
  | ReceiveQueueDeleteOk
  | ReceiveQueueUnbind
  | ReceiveQueueUnbindOk
  | ReceiveBasicQos
  | ReceiveBasicQosOk
  | ReceiveBasicConsume
  | ReceiveBasicConsumeOk
  | ReceiveBasicCancel
  | ReceiveBasicCancelOk
  | ReceiveBasicPublish
  | ReceiveBasicReturn
  | ReceiveBasicDeliver
  | ReceiveBasicGet
  | ReceiveBasicGetOk
  | ReceiveBasicGetEmpty
  | ReceiveBasicAck
  | ReceiveBasicReject
  | ReceiveBasicRecoverAsync
  | ReceiveBasicRecover
  | ReceiveBasicRecoverOk
  | ReceiveBasicNack
  | ReceiveTxSelect
  | ReceiveTxSelectOk
  | ReceiveTxCommit
  | ReceiveTxCommitOk
  | ReceiveTxRollback
  | ReceiveTxRollbackOk
  | ReceiveConfirmSelect
  | ReceiveConfirmSelectOk;
export type SendMethod =
  | SendConnectionStart
  | SendConnectionStartOk
  | SendConnectionSecure
  | SendConnectionSecureOk
  | SendConnectionTune
  | SendConnectionTuneOk
  | SendConnectionOpen
  | SendConnectionOpenOk
  | SendConnectionClose
  | SendConnectionCloseOk
  | SendConnectionBlocked
  | SendConnectionUnblocked
  | SendConnectionUpdateSecret
  | SendConnectionUpdateSecretOk
  | SendChannelOpen
  | SendChannelOpenOk
  | SendChannelFlow
  | SendChannelFlowOk
  | SendChannelClose
  | SendChannelCloseOk
  | SendAccessRequest
  | SendAccessRequestOk
  | SendExchangeDeclare
  | SendExchangeDeclareOk
  | SendExchangeDelete
  | SendExchangeDeleteOk
  | SendExchangeBind
  | SendExchangeBindOk
  | SendExchangeUnbind
  | SendExchangeUnbindOk
  | SendQueueDeclare
  | SendQueueDeclareOk
  | SendQueueBind
  | SendQueueBindOk
  | SendQueuePurge
  | SendQueuePurgeOk
  | SendQueueDelete
  | SendQueueDeleteOk
  | SendQueueUnbind
  | SendQueueUnbindOk
  | SendBasicQos
  | SendBasicQosOk
  | SendBasicConsume
  | SendBasicConsumeOk
  | SendBasicCancel
  | SendBasicCancelOk
  | SendBasicPublish
  | SendBasicReturn
  | SendBasicDeliver
  | SendBasicGet
  | SendBasicGetOk
  | SendBasicGetEmpty
  | SendBasicAck
  | SendBasicReject
  | SendBasicRecoverAsync
  | SendBasicRecover
  | SendBasicRecoverOk
  | SendBasicNack
  | SendTxSelect
  | SendTxSelectOk
  | SendTxCommit
  | SendTxCommitOk
  | SendTxRollback
  | SendTxRollbackOk
  | SendConfirmSelect
  | SendConfirmSelectOk;
export type Header =
  | ConnectionHeader
  | ChannelHeader
  | AccessHeader
  | ExchangeHeader
  | QueueHeader
  | BasicHeader
  | TxHeader
  | ConfirmHeader;
export function decodeMethod(data: Uint8Array): ReceiveMethod {
  const decoder = new enc.AmqpDecoder(data);
  const classId = decoder.read("uint16");
  const methodId = decoder.read("uint16");
  switch (classId) {
    case 10: {
      switch (methodId) {
        case 10:
          return {
            classId,
            methodId,
            args: {
              versionMajor: decoder.read("uint8"),
              versionMinor: decoder.read("uint8"),
              serverProperties: decoder.read("table"),
              mechanisms: decoder.read("longstr"),
              locales: decoder.read("longstr"),
            },
          };

        case 11:
          return {
            classId,
            methodId,
            args: {
              clientProperties: decoder.read("table"),
              mechanism: decoder.read("shortstr"),
              response: decoder.read("longstr"),
              locale: decoder.read("shortstr"),
            },
          };

        case 20:
          return {
            classId,
            methodId,
            args: {
              challenge: decoder.read("longstr"),
            },
          };

        case 21:
          return {
            classId,
            methodId,
            args: {
              response: decoder.read("longstr"),
            },
          };

        case 30:
          return {
            classId,
            methodId,
            args: {
              channelMax: decoder.read("uint16"),
              frameMax: decoder.read("uint32"),
              heartbeat: decoder.read("uint16"),
            },
          };

        case 31:
          return {
            classId,
            methodId,
            args: {
              channelMax: decoder.read("uint16"),
              frameMax: decoder.read("uint32"),
              heartbeat: decoder.read("uint16"),
            },
          };

        case 40:
          return {
            classId,
            methodId,
            args: {
              virtualHost: decoder.read("shortstr"),
              capabilities: decoder.read("shortstr"),
              insist: decoder.read("bit"),
            },
          };

        case 41:
          return {
            classId,
            methodId,
            args: {
              knownHosts: decoder.read("shortstr"),
            },
          };

        case 50:
          return {
            classId,
            methodId,
            args: {
              replyCode: decoder.read("uint16"),
              replyText: decoder.read("shortstr"),
              classId: decoder.read("uint16"),
              methodId: decoder.read("uint16"),
            },
          };

        case 51:
          return {
            classId,
            methodId,
            args: {},
          };

        case 60:
          return {
            classId,
            methodId,
            args: {
              reason: decoder.read("shortstr"),
            },
          };

        case 61:
          return {
            classId,
            methodId,
            args: {},
          };

        case 70:
          return {
            classId,
            methodId,
            args: {
              newSecret: decoder.read("longstr"),
              reason: decoder.read("shortstr"),
            },
          };

        case 71:
          return {
            classId,
            methodId,
            args: {},
          };
        default:
          throw new Error(
            "Unknown method " + methodId + " for class 'connection'",
          );
      }
    }

    case 20: {
      switch (methodId) {
        case 10:
          return {
            classId,
            methodId,
            args: {
              outOfBand: decoder.read("shortstr"),
            },
          };

        case 11:
          return {
            classId,
            methodId,
            args: {
              channelId: decoder.read("longstr"),
            },
          };

        case 20:
          return {
            classId,
            methodId,
            args: {
              active: decoder.read("bit"),
            },
          };

        case 21:
          return {
            classId,
            methodId,
            args: {
              active: decoder.read("bit"),
            },
          };

        case 40:
          return {
            classId,
            methodId,
            args: {
              replyCode: decoder.read("uint16"),
              replyText: decoder.read("shortstr"),
              classId: decoder.read("uint16"),
              methodId: decoder.read("uint16"),
            },
          };

        case 41:
          return {
            classId,
            methodId,
            args: {},
          };
        default:
          throw new Error(
            "Unknown method " + methodId + " for class 'channel'",
          );
      }
    }

    case 30: {
      switch (methodId) {
        case 10:
          return {
            classId,
            methodId,
            args: {
              realm: decoder.read("shortstr"),
              exclusive: decoder.read("bit"),
              passive: decoder.read("bit"),
              active: decoder.read("bit"),
              write: decoder.read("bit"),
              read: decoder.read("bit"),
            },
          };

        case 11:
          return {
            classId,
            methodId,
            args: {
              ticket: decoder.read("uint16"),
            },
          };
        default:
          throw new Error("Unknown method " + methodId + " for class 'access'");
      }
    }

    case 40: {
      switch (methodId) {
        case 10:
          return {
            classId,
            methodId,
            args: {
              ticket: decoder.read("uint16"),
              exchange: decoder.read("shortstr"),
              type: decoder.read("shortstr"),
              passive: decoder.read("bit"),
              durable: decoder.read("bit"),
              autoDelete: decoder.read("bit"),
              internal: decoder.read("bit"),
              nowait: decoder.read("bit"),
              arguments: decoder.read("table"),
            },
          };

        case 11:
          return {
            classId,
            methodId,
            args: {},
          };

        case 20:
          return {
            classId,
            methodId,
            args: {
              ticket: decoder.read("uint16"),
              exchange: decoder.read("shortstr"),
              ifUnused: decoder.read("bit"),
              nowait: decoder.read("bit"),
            },
          };

        case 21:
          return {
            classId,
            methodId,
            args: {},
          };

        case 30:
          return {
            classId,
            methodId,
            args: {
              ticket: decoder.read("uint16"),
              destination: decoder.read("shortstr"),
              source: decoder.read("shortstr"),
              routingKey: decoder.read("shortstr"),
              nowait: decoder.read("bit"),
              arguments: decoder.read("table"),
            },
          };

        case 31:
          return {
            classId,
            methodId,
            args: {},
          };

        case 40:
          return {
            classId,
            methodId,
            args: {
              ticket: decoder.read("uint16"),
              destination: decoder.read("shortstr"),
              source: decoder.read("shortstr"),
              routingKey: decoder.read("shortstr"),
              nowait: decoder.read("bit"),
              arguments: decoder.read("table"),
            },
          };

        case 51:
          return {
            classId,
            methodId,
            args: {},
          };
        default:
          throw new Error(
            "Unknown method " + methodId + " for class 'exchange'",
          );
      }
    }

    case 50: {
      switch (methodId) {
        case 10:
          return {
            classId,
            methodId,
            args: {
              ticket: decoder.read("uint16"),
              queue: decoder.read("shortstr"),
              passive: decoder.read("bit"),
              durable: decoder.read("bit"),
              exclusive: decoder.read("bit"),
              autoDelete: decoder.read("bit"),
              nowait: decoder.read("bit"),
              arguments: decoder.read("table"),
            },
          };

        case 11:
          return {
            classId,
            methodId,
            args: {
              queue: decoder.read("shortstr"),
              messageCount: decoder.read("uint32"),
              consumerCount: decoder.read("uint32"),
            },
          };

        case 20:
          return {
            classId,
            methodId,
            args: {
              ticket: decoder.read("uint16"),
              queue: decoder.read("shortstr"),
              exchange: decoder.read("shortstr"),
              routingKey: decoder.read("shortstr"),
              nowait: decoder.read("bit"),
              arguments: decoder.read("table"),
            },
          };

        case 21:
          return {
            classId,
            methodId,
            args: {},
          };

        case 30:
          return {
            classId,
            methodId,
            args: {
              ticket: decoder.read("uint16"),
              queue: decoder.read("shortstr"),
              nowait: decoder.read("bit"),
            },
          };

        case 31:
          return {
            classId,
            methodId,
            args: {
              messageCount: decoder.read("uint32"),
            },
          };

        case 40:
          return {
            classId,
            methodId,
            args: {
              ticket: decoder.read("uint16"),
              queue: decoder.read("shortstr"),
              ifUnused: decoder.read("bit"),
              ifEmpty: decoder.read("bit"),
              nowait: decoder.read("bit"),
            },
          };

        case 41:
          return {
            classId,
            methodId,
            args: {
              messageCount: decoder.read("uint32"),
            },
          };

        case 50:
          return {
            classId,
            methodId,
            args: {
              ticket: decoder.read("uint16"),
              queue: decoder.read("shortstr"),
              exchange: decoder.read("shortstr"),
              routingKey: decoder.read("shortstr"),
              arguments: decoder.read("table"),
            },
          };

        case 51:
          return {
            classId,
            methodId,
            args: {},
          };
        default:
          throw new Error("Unknown method " + methodId + " for class 'queue'");
      }
    }

    case 60: {
      switch (methodId) {
        case 10:
          return {
            classId,
            methodId,
            args: {
              prefetchSize: decoder.read("uint32"),
              prefetchCount: decoder.read("uint16"),
              global: decoder.read("bit"),
            },
          };

        case 11:
          return {
            classId,
            methodId,
            args: {},
          };

        case 20:
          return {
            classId,
            methodId,
            args: {
              ticket: decoder.read("uint16"),
              queue: decoder.read("shortstr"),
              consumerTag: decoder.read("shortstr"),
              noLocal: decoder.read("bit"),
              noAck: decoder.read("bit"),
              exclusive: decoder.read("bit"),
              nowait: decoder.read("bit"),
              arguments: decoder.read("table"),
            },
          };

        case 21:
          return {
            classId,
            methodId,
            args: {
              consumerTag: decoder.read("shortstr"),
            },
          };

        case 30:
          return {
            classId,
            methodId,
            args: {
              consumerTag: decoder.read("shortstr"),
              nowait: decoder.read("bit"),
            },
          };

        case 31:
          return {
            classId,
            methodId,
            args: {
              consumerTag: decoder.read("shortstr"),
            },
          };

        case 40:
          return {
            classId,
            methodId,
            args: {
              ticket: decoder.read("uint16"),
              exchange: decoder.read("shortstr"),
              routingKey: decoder.read("shortstr"),
              mandatory: decoder.read("bit"),
              immediate: decoder.read("bit"),
            },
          };

        case 50:
          return {
            classId,
            methodId,
            args: {
              replyCode: decoder.read("uint16"),
              replyText: decoder.read("shortstr"),
              exchange: decoder.read("shortstr"),
              routingKey: decoder.read("shortstr"),
            },
          };

        case 60:
          return {
            classId,
            methodId,
            args: {
              consumerTag: decoder.read("shortstr"),
              deliveryTag: decoder.read("uint64"),
              redelivered: decoder.read("bit"),
              exchange: decoder.read("shortstr"),
              routingKey: decoder.read("shortstr"),
            },
          };

        case 70:
          return {
            classId,
            methodId,
            args: {
              ticket: decoder.read("uint16"),
              queue: decoder.read("shortstr"),
              noAck: decoder.read("bit"),
            },
          };

        case 71:
          return {
            classId,
            methodId,
            args: {
              deliveryTag: decoder.read("uint64"),
              redelivered: decoder.read("bit"),
              exchange: decoder.read("shortstr"),
              routingKey: decoder.read("shortstr"),
              messageCount: decoder.read("uint32"),
            },
          };

        case 72:
          return {
            classId,
            methodId,
            args: {
              clusterId: decoder.read("shortstr"),
            },
          };

        case 80:
          return {
            classId,
            methodId,
            args: {
              deliveryTag: decoder.read("uint64"),
              multiple: decoder.read("bit"),
            },
          };

        case 90:
          return {
            classId,
            methodId,
            args: {
              deliveryTag: decoder.read("uint64"),
              requeue: decoder.read("bit"),
            },
          };

        case 100:
          return {
            classId,
            methodId,
            args: {
              requeue: decoder.read("bit"),
            },
          };

        case 110:
          return {
            classId,
            methodId,
            args: {
              requeue: decoder.read("bit"),
            },
          };

        case 111:
          return {
            classId,
            methodId,
            args: {},
          };

        case 120:
          return {
            classId,
            methodId,
            args: {
              deliveryTag: decoder.read("uint64"),
              multiple: decoder.read("bit"),
              requeue: decoder.read("bit"),
            },
          };
        default:
          throw new Error("Unknown method " + methodId + " for class 'basic'");
      }
    }

    case 90: {
      switch (methodId) {
        case 10:
          return {
            classId,
            methodId,
            args: {},
          };

        case 11:
          return {
            classId,
            methodId,
            args: {},
          };

        case 20:
          return {
            classId,
            methodId,
            args: {},
          };

        case 21:
          return {
            classId,
            methodId,
            args: {},
          };

        case 30:
          return {
            classId,
            methodId,
            args: {},
          };

        case 31:
          return {
            classId,
            methodId,
            args: {},
          };
        default:
          throw new Error("Unknown method " + methodId + " for class 'tx'");
      }
    }

    case 85: {
      switch (methodId) {
        case 10:
          return {
            classId,
            methodId,
            args: {
              nowait: decoder.read("bit"),
            },
          };

        case 11:
          return {
            classId,
            methodId,
            args: {},
          };
        default:
          throw new Error(
            "Unknown method " + methodId + " for class 'confirm'",
          );
      }
    }

    default:
      throw new Error("Unknown class " + classId);
  }
}

export function encodeMethod(method: SendMethod): Uint8Array {
  const encoder = new enc.AmqpEncoder();
  encoder.write("uint16", method.classId);
  encoder.write("uint16", method.methodId);
  switch (method.classId) {
    case 10: {
      switch (method.methodId) {
        case 10:
          encoder.write(
            "uint8",
            method.args.versionMajor !== undefined ? method.args.versionMajor : 0,
          );
          encoder.write(
            "uint8",
            method.args.versionMinor !== undefined ? method.args.versionMinor : 9,
          );
          encoder.write("table", method.args.serverProperties);
          encoder.write(
            "longstr",
            method.args.mechanisms !== undefined ? method.args.mechanisms : "PLAIN",
          );
          encoder.write(
            "longstr",
            method.args.locales !== undefined ? method.args.locales : "en_US",
          );
          break;

        case 11:
          encoder.write("table", method.args.clientProperties);
          encoder.write(
            "shortstr",
            method.args.mechanism !== undefined ? method.args.mechanism : "PLAIN",
          );
          encoder.write("longstr", method.args.response);
          encoder.write(
            "shortstr",
            method.args.locale !== undefined ? method.args.locale : "en_US",
          );
          break;

        case 20:
          encoder.write("longstr", method.args.challenge);
          break;

        case 21:
          encoder.write("longstr", method.args.response);
          break;

        case 30:
          encoder.write(
            "uint16",
            method.args.channelMax !== undefined ? method.args.channelMax : 0,
          );
          encoder.write(
            "uint32",
            method.args.frameMax !== undefined ? method.args.frameMax : 0,
          );
          encoder.write(
            "uint16",
            method.args.heartbeat !== undefined ? method.args.heartbeat : 0,
          );
          break;

        case 31:
          encoder.write(
            "uint16",
            method.args.channelMax !== undefined ? method.args.channelMax : 0,
          );
          encoder.write(
            "uint32",
            method.args.frameMax !== undefined ? method.args.frameMax : 0,
          );
          encoder.write(
            "uint16",
            method.args.heartbeat !== undefined ? method.args.heartbeat : 0,
          );
          break;

        case 40:
          encoder.write(
            "shortstr",
            method.args.virtualHost !== undefined ? method.args.virtualHost : "/",
          );
          encoder.write(
            "shortstr",
            method.args.capabilities !== undefined ? method.args.capabilities : "",
          );
          encoder.write(
            "bit",
            method.args.insist !== undefined ? method.args.insist : false,
          );
          break;

        case 41:
          encoder.write(
            "shortstr",
            method.args.knownHosts !== undefined ? method.args.knownHosts : "",
          );
          break;

        case 50:
          encoder.write("uint16", method.args.replyCode);
          encoder.write(
            "shortstr",
            method.args.replyText !== undefined ? method.args.replyText : "",
          );
          encoder.write("uint16", method.args.classId);
          encoder.write("uint16", method.args.methodId);
          break;

        case 51:
          break;

        case 60:
          encoder.write(
            "shortstr",
            method.args.reason !== undefined ? method.args.reason : "",
          );
          break;

        case 61:
          break;

        case 70:
          encoder.write("longstr", method.args.newSecret);
          encoder.write("shortstr", method.args.reason);
          break;

        case 71:
          break;

        default:
          throw new Error(
            "Unknown method " + (method as any).methodId +
              " for class 'connection'",
          );
      }
      break;
    }

    case 20: {
      switch (method.methodId) {
        case 10:
          encoder.write(
            "shortstr",
            method.args.outOfBand !== undefined ? method.args.outOfBand : "",
          );
          break;

        case 11:
          encoder.write(
            "longstr",
            method.args.channelId !== undefined ? method.args.channelId : "",
          );
          break;

        case 20:
          encoder.write("bit", method.args.active);
          break;

        case 21:
          encoder.write("bit", method.args.active);
          break;

        case 40:
          encoder.write("uint16", method.args.replyCode);
          encoder.write(
            "shortstr",
            method.args.replyText !== undefined ? method.args.replyText : "",
          );
          encoder.write("uint16", method.args.classId);
          encoder.write("uint16", method.args.methodId);
          break;

        case 41:
          break;

        default:
          throw new Error(
            "Unknown method " + (method as any).methodId +
              " for class 'channel'",
          );
      }
      break;
    }

    case 30: {
      switch (method.methodId) {
        case 10:
          encoder.write(
            "shortstr",
            method.args.realm !== undefined ? method.args.realm : "/data",
          );
          encoder.write(
            "bit",
            method.args.exclusive !== undefined ? method.args.exclusive : false,
          );
          encoder.write(
            "bit",
            method.args.passive !== undefined ? method.args.passive : true,
          );
          encoder.write(
            "bit",
            method.args.active !== undefined ? method.args.active : true,
          );
          encoder.write(
            "bit",
            method.args.write !== undefined ? method.args.write : true,
          );
          encoder.write(
            "bit",
            method.args.read !== undefined ? method.args.read : true,
          );
          break;

        case 11:
          encoder.write(
            "uint16",
            method.args.ticket !== undefined ? method.args.ticket : 1,
          );
          break;

        default:
          throw new Error(
            "Unknown method " + (method as any).methodId +
              " for class 'access'",
          );
      }
      break;
    }

    case 40: {
      switch (method.methodId) {
        case 10:
          encoder.write(
            "uint16",
            method.args.ticket !== undefined ? method.args.ticket : 0,
          );
          encoder.write("shortstr", method.args.exchange);
          encoder.write(
            "shortstr",
            method.args.type !== undefined ? method.args.type : "direct",
          );
          encoder.write(
            "bit",
            method.args.passive !== undefined ? method.args.passive : false,
          );
          encoder.write(
            "bit",
            method.args.durable !== undefined ? method.args.durable : false,
          );
          encoder.write(
            "bit",
            method.args.autoDelete !== undefined ? method.args.autoDelete : false,
          );
          encoder.write(
            "bit",
            method.args.internal !== undefined ? method.args.internal : false,
          );
          encoder.write(
            "bit",
            method.args.nowait !== undefined ? method.args.nowait : false,
          );
          encoder.write(
            "table",
            method.args.arguments !== undefined ? method.args.arguments : {},
          );
          break;

        case 11:
          break;

        case 20:
          encoder.write(
            "uint16",
            method.args.ticket !== undefined ? method.args.ticket : 0,
          );
          encoder.write("shortstr", method.args.exchange);
          encoder.write(
            "bit",
            method.args.ifUnused !== undefined ? method.args.ifUnused : false,
          );
          encoder.write(
            "bit",
            method.args.nowait !== undefined ? method.args.nowait : false,
          );
          break;

        case 21:
          break;

        case 30:
          encoder.write(
            "uint16",
            method.args.ticket !== undefined ? method.args.ticket : 0,
          );
          encoder.write("shortstr", method.args.destination);
          encoder.write("shortstr", method.args.source);
          encoder.write(
            "shortstr",
            method.args.routingKey !== undefined ? method.args.routingKey : "",
          );
          encoder.write(
            "bit",
            method.args.nowait !== undefined ? method.args.nowait : false,
          );
          encoder.write(
            "table",
            method.args.arguments !== undefined ? method.args.arguments : {},
          );
          break;

        case 31:
          break;

        case 40:
          encoder.write(
            "uint16",
            method.args.ticket !== undefined ? method.args.ticket : 0,
          );
          encoder.write("shortstr", method.args.destination);
          encoder.write("shortstr", method.args.source);
          encoder.write(
            "shortstr",
            method.args.routingKey !== undefined ? method.args.routingKey : "",
          );
          encoder.write(
            "bit",
            method.args.nowait !== undefined ? method.args.nowait : false,
          );
          encoder.write(
            "table",
            method.args.arguments !== undefined ? method.args.arguments : {},
          );
          break;

        case 51:
          break;

        default:
          throw new Error(
            "Unknown method " + (method as any).methodId +
              " for class 'exchange'",
          );
      }
      break;
    }

    case 50: {
      switch (method.methodId) {
        case 10:
          encoder.write(
            "uint16",
            method.args.ticket !== undefined ? method.args.ticket : 0,
          );
          encoder.write(
            "shortstr",
            method.args.queue !== undefined ? method.args.queue : "",
          );
          encoder.write(
            "bit",
            method.args.passive !== undefined ? method.args.passive : false,
          );
          encoder.write(
            "bit",
            method.args.durable !== undefined ? method.args.durable : false,
          );
          encoder.write(
            "bit",
            method.args.exclusive !== undefined ? method.args.exclusive : false,
          );
          encoder.write(
            "bit",
            method.args.autoDelete !== undefined ? method.args.autoDelete : false,
          );
          encoder.write(
            "bit",
            method.args.nowait !== undefined ? method.args.nowait : false,
          );
          encoder.write(
            "table",
            method.args.arguments !== undefined ? method.args.arguments : {},
          );
          break;

        case 11:
          encoder.write("shortstr", method.args.queue);
          encoder.write("uint32", method.args.messageCount);
          encoder.write("uint32", method.args.consumerCount);
          break;

        case 20:
          encoder.write(
            "uint16",
            method.args.ticket !== undefined ? method.args.ticket : 0,
          );
          encoder.write(
            "shortstr",
            method.args.queue !== undefined ? method.args.queue : "",
          );
          encoder.write("shortstr", method.args.exchange);
          encoder.write(
            "shortstr",
            method.args.routingKey !== undefined ? method.args.routingKey : "",
          );
          encoder.write(
            "bit",
            method.args.nowait !== undefined ? method.args.nowait : false,
          );
          encoder.write(
            "table",
            method.args.arguments !== undefined ? method.args.arguments : {},
          );
          break;

        case 21:
          break;

        case 30:
          encoder.write(
            "uint16",
            method.args.ticket !== undefined ? method.args.ticket : 0,
          );
          encoder.write(
            "shortstr",
            method.args.queue !== undefined ? method.args.queue : "",
          );
          encoder.write(
            "bit",
            method.args.nowait !== undefined ? method.args.nowait : false,
          );
          break;

        case 31:
          encoder.write("uint32", method.args.messageCount);
          break;

        case 40:
          encoder.write(
            "uint16",
            method.args.ticket !== undefined ? method.args.ticket : 0,
          );
          encoder.write(
            "shortstr",
            method.args.queue !== undefined ? method.args.queue : "",
          );
          encoder.write(
            "bit",
            method.args.ifUnused !== undefined ? method.args.ifUnused : false,
          );
          encoder.write(
            "bit",
            method.args.ifEmpty !== undefined ? method.args.ifEmpty : false,
          );
          encoder.write(
            "bit",
            method.args.nowait !== undefined ? method.args.nowait : false,
          );
          break;

        case 41:
          encoder.write("uint32", method.args.messageCount);
          break;

        case 50:
          encoder.write(
            "uint16",
            method.args.ticket !== undefined ? method.args.ticket : 0,
          );
          encoder.write(
            "shortstr",
            method.args.queue !== undefined ? method.args.queue : "",
          );
          encoder.write("shortstr", method.args.exchange);
          encoder.write(
            "shortstr",
            method.args.routingKey !== undefined ? method.args.routingKey : "",
          );
          encoder.write(
            "table",
            method.args.arguments !== undefined ? method.args.arguments : {},
          );
          break;

        case 51:
          break;

        default:
          throw new Error(
            "Unknown method " + (method as any).methodId + " for class 'queue'",
          );
      }
      break;
    }

    case 60: {
      switch (method.methodId) {
        case 10:
          encoder.write(
            "uint32",
            method.args.prefetchSize !== undefined ? method.args.prefetchSize : 0,
          );
          encoder.write(
            "uint16",
            method.args.prefetchCount !== undefined ? method.args.prefetchCount : 0,
          );
          encoder.write(
            "bit",
            method.args.global !== undefined ? method.args.global : false,
          );
          break;

        case 11:
          break;

        case 20:
          encoder.write(
            "uint16",
            method.args.ticket !== undefined ? method.args.ticket : 0,
          );
          encoder.write(
            "shortstr",
            method.args.queue !== undefined ? method.args.queue : "",
          );
          encoder.write(
            "shortstr",
            method.args.consumerTag !== undefined ? method.args.consumerTag : "",
          );
          encoder.write(
            "bit",
            method.args.noLocal !== undefined ? method.args.noLocal : false,
          );
          encoder.write(
            "bit",
            method.args.noAck !== undefined ? method.args.noAck : false,
          );
          encoder.write(
            "bit",
            method.args.exclusive !== undefined ? method.args.exclusive : false,
          );
          encoder.write(
            "bit",
            method.args.nowait !== undefined ? method.args.nowait : false,
          );
          encoder.write(
            "table",
            method.args.arguments !== undefined ? method.args.arguments : {},
          );
          break;

        case 21:
          encoder.write("shortstr", method.args.consumerTag);
          break;

        case 30:
          encoder.write("shortstr", method.args.consumerTag);
          encoder.write(
            "bit",
            method.args.nowait !== undefined ? method.args.nowait : false,
          );
          break;

        case 31:
          encoder.write("shortstr", method.args.consumerTag);
          break;

        case 40:
          encoder.write(
            "uint16",
            method.args.ticket !== undefined ? method.args.ticket : 0,
          );
          encoder.write(
            "shortstr",
            method.args.exchange !== undefined ? method.args.exchange : "",
          );
          encoder.write(
            "shortstr",
            method.args.routingKey !== undefined ? method.args.routingKey : "",
          );
          encoder.write(
            "bit",
            method.args.mandatory !== undefined ? method.args.mandatory : false,
          );
          encoder.write(
            "bit",
            method.args.immediate !== undefined ? method.args.immediate : false,
          );
          break;

        case 50:
          encoder.write("uint16", method.args.replyCode);
          encoder.write(
            "shortstr",
            method.args.replyText !== undefined ? method.args.replyText : "",
          );
          encoder.write("shortstr", method.args.exchange);
          encoder.write("shortstr", method.args.routingKey);
          break;

        case 60:
          encoder.write("shortstr", method.args.consumerTag);
          encoder.write("uint64", method.args.deliveryTag);
          encoder.write(
            "bit",
            method.args.redelivered !== undefined ? method.args.redelivered : false,
          );
          encoder.write("shortstr", method.args.exchange);
          encoder.write("shortstr", method.args.routingKey);
          break;

        case 70:
          encoder.write(
            "uint16",
            method.args.ticket !== undefined ? method.args.ticket : 0,
          );
          encoder.write(
            "shortstr",
            method.args.queue !== undefined ? method.args.queue : "",
          );
          encoder.write(
            "bit",
            method.args.noAck !== undefined ? method.args.noAck : false,
          );
          break;

        case 71:
          encoder.write("uint64", method.args.deliveryTag);
          encoder.write(
            "bit",
            method.args.redelivered !== undefined ? method.args.redelivered : false,
          );
          encoder.write("shortstr", method.args.exchange);
          encoder.write("shortstr", method.args.routingKey);
          encoder.write("uint32", method.args.messageCount);
          break;

        case 72:
          encoder.write(
            "shortstr",
            method.args.clusterId !== undefined ? method.args.clusterId : "",
          );
          break;

        case 80:
          encoder.write(
            "uint64",
            method.args.deliveryTag !== undefined ? method.args.deliveryTag : 0,
          );
          encoder.write(
            "bit",
            method.args.multiple !== undefined ? method.args.multiple : false,
          );
          break;

        case 90:
          encoder.write("uint64", method.args.deliveryTag);
          encoder.write(
            "bit",
            method.args.requeue !== undefined ? method.args.requeue : true,
          );
          break;

        case 100:
          encoder.write(
            "bit",
            method.args.requeue !== undefined ? method.args.requeue : false,
          );
          break;

        case 110:
          encoder.write(
            "bit",
            method.args.requeue !== undefined ? method.args.requeue : false,
          );
          break;

        case 111:
          break;

        case 120:
          encoder.write(
            "uint64",
            method.args.deliveryTag !== undefined ? method.args.deliveryTag : 0,
          );
          encoder.write(
            "bit",
            method.args.multiple !== undefined ? method.args.multiple : false,
          );
          encoder.write(
            "bit",
            method.args.requeue !== undefined ? method.args.requeue : true,
          );
          break;

        default:
          throw new Error(
            "Unknown method " + (method as any).methodId + " for class 'basic'",
          );
      }
      break;
    }

    case 90: {
      switch (method.methodId) {
        case 10:
          break;

        case 11:
          break;

        case 20:
          break;

        case 21:
          break;

        case 30:
          break;

        case 31:
          break;

        default:
          throw new Error(
            "Unknown method " + (method as any).methodId + " for class 'tx'",
          );
      }
      break;
    }

    case 85: {
      switch (method.methodId) {
        case 10:
          encoder.write(
            "bit",
            method.args.nowait !== undefined ? method.args.nowait : false,
          );
          break;

        case 11:
          break;

        default:
          throw new Error(
            "Unknown method " + (method as any).methodId +
              " for class 'confirm'",
          );
      }
      break;
    }

    default:
      throw new Error("Unknown class " + (method as any).classId);
  }
  return encoder.result();
}

export function decodeHeader(data: Uint8Array): Header {
  const decoder = new enc.AmqpDecoder(data);
  const classId = decoder.read("uint16");
  // weight unused
  decoder.read("uint16");
  const size = decoder.read("uint64");
  const flags = decoder.read("flags");
  switch (classId) {
    case 10:
      return {
        classId,
        size,
        props: {},
      };
    case 20:
      return {
        classId,
        size,
        props: {},
      };
    case 30:
      return {
        classId,
        size,
        props: {},
      };
    case 40:
      return {
        classId,
        size,
        props: {},
      };
    case 50:
      return {
        classId,
        size,
        props: {},
      };
    case 60:
      return {
        classId,
        size,
        props: {
          contentType: flags[0] ? decoder.read("shortstr") : undefined,
          contentEncoding: flags[1] ? decoder.read("shortstr") : undefined,
          headers: flags[2] ? decoder.read("table") : undefined,
          deliveryMode: flags[3] ? decoder.read("uint8") : undefined,
          priority: flags[4] ? decoder.read("uint8") : undefined,
          correlationId: flags[5] ? decoder.read("shortstr") : undefined,
          replyTo: flags[6] ? decoder.read("shortstr") : undefined,
          expiration: flags[7] ? decoder.read("shortstr") : undefined,
          messageId: flags[8] ? decoder.read("shortstr") : undefined,
          timestamp: flags[9] ? decoder.read("uint64") : undefined,
          type: flags[10] ? decoder.read("shortstr") : undefined,
          userId: flags[11] ? decoder.read("shortstr") : undefined,
          appId: flags[12] ? decoder.read("shortstr") : undefined,
          clusterId: flags[13] ? decoder.read("shortstr") : undefined,
        },
      };
    case 90:
      return {
        classId,
        size,
        props: {},
      };
    case 85:
      return {
        classId,
        size,
        props: {},
      };
    default:
      throw new Error("Unknown class " + classId);
  }
}

export function encodeHeader(header: Header): Uint8Array {
  const encoder = new enc.AmqpEncoder();
  encoder.write("uint16", header.classId);
  encoder.write("uint16", 0);
  encoder.write("uint64", header.size);
  switch (header.classId) {
    case 10:
      encoder.write("flags", []);

      break;
    case 20:
      encoder.write("flags", []);

      break;
    case 30:
      encoder.write("flags", []);

      break;
    case 40:
      encoder.write("flags", []);

      break;
    case 50:
      encoder.write("flags", []);

      break;
    case 60:
      encoder.write("flags", [
        header.props.contentType !== undefined,
        header.props.contentEncoding !== undefined,
        header.props.headers !== undefined,
        header.props.deliveryMode !== undefined,
        header.props.priority !== undefined,
        header.props.correlationId !== undefined,
        header.props.replyTo !== undefined,
        header.props.expiration !== undefined,
        header.props.messageId !== undefined,
        header.props.timestamp !== undefined,
        header.props.type !== undefined,
        header.props.userId !== undefined,
        header.props.appId !== undefined,
        header.props.clusterId !== undefined,
      ]);

      if (header.props.contentType !== undefined) {
        encoder.write("shortstr", header.props.contentType);
      }

      if (header.props.contentEncoding !== undefined) {
        encoder.write("shortstr", header.props.contentEncoding);
      }

      if (header.props.headers !== undefined) {
        encoder.write("table", header.props.headers);
      }

      if (header.props.deliveryMode !== undefined) {
        encoder.write("uint8", header.props.deliveryMode);
      }

      if (header.props.priority !== undefined) {
        encoder.write("uint8", header.props.priority);
      }

      if (header.props.correlationId !== undefined) {
        encoder.write("shortstr", header.props.correlationId);
      }

      if (header.props.replyTo !== undefined) {
        encoder.write("shortstr", header.props.replyTo);
      }

      if (header.props.expiration !== undefined) {
        encoder.write("shortstr", header.props.expiration);
      }

      if (header.props.messageId !== undefined) {
        encoder.write("shortstr", header.props.messageId);
      }

      if (header.props.timestamp !== undefined) {
        encoder.write("uint64", header.props.timestamp);
      }

      if (header.props.type !== undefined) {
        encoder.write("shortstr", header.props.type);
      }

      if (header.props.userId !== undefined) {
        encoder.write("shortstr", header.props.userId);
      }

      if (header.props.appId !== undefined) {
        encoder.write("shortstr", header.props.appId);
      }

      if (header.props.clusterId !== undefined) {
        encoder.write("shortstr", header.props.clusterId);
      }

      break;
    case 90:
      encoder.write("flags", []);

      break;
    case 85:
      encoder.write("flags", []);

      break;
    default:
      throw new Error("Unknown class " + (header as any).classId);
  }

  return encoder.result();
}
