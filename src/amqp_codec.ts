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

function encodeConnectionStart(args: t.ConnectionStartArgs): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 10 },
    { type: "short", value: 10 },
    {
      type: "octet" as const,
      value: args.versionMajor !== undefined ? args.versionMajor : 0,
    },
    {
      type: "octet" as const,
      value: args.versionMinor !== undefined ? args.versionMinor : 9,
    },
    { type: "table" as const, value: args.serverProperties },
    {
      type: "longstr" as const,
      value: args.mechanisms !== undefined ? args.mechanisms : "PLAIN",
    },
    {
      type: "longstr" as const,
      value: args.locales !== undefined ? args.locales : "en_US",
    },
  ]);
}

function encodeConnectionStartOk(args: t.ConnectionStartOkArgs): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 10 },
    { type: "short", value: 11 },
    { type: "table" as const, value: args.clientProperties },
    {
      type: "shortstr" as const,
      value: args.mechanism !== undefined ? args.mechanism : "PLAIN",
    },
    { type: "longstr" as const, value: args.response },
    {
      type: "shortstr" as const,
      value: args.locale !== undefined ? args.locale : "en_US",
    },
  ]);
}

function encodeConnectionSecure(args: t.ConnectionSecureArgs): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 10 },
    { type: "short", value: 20 },
    { type: "longstr" as const, value: args.challenge },
  ]);
}

function encodeConnectionSecureOk(args: t.ConnectionSecureOkArgs): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 10 },
    { type: "short", value: 21 },
    { type: "longstr" as const, value: args.response },
  ]);
}

function encodeConnectionTune(args: t.ConnectionTuneArgs): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 10 },
    { type: "short", value: 30 },
    {
      type: "short" as const,
      value: args.channelMax !== undefined ? args.channelMax : 0,
    },
    {
      type: "long" as const,
      value: args.frameMax !== undefined ? args.frameMax : 0,
    },
    {
      type: "short" as const,
      value: args.heartbeat !== undefined ? args.heartbeat : 0,
    },
  ]);
}

function encodeConnectionTuneOk(args: t.ConnectionTuneOkArgs): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 10 },
    { type: "short", value: 31 },
    {
      type: "short" as const,
      value: args.channelMax !== undefined ? args.channelMax : 0,
    },
    {
      type: "long" as const,
      value: args.frameMax !== undefined ? args.frameMax : 0,
    },
    {
      type: "short" as const,
      value: args.heartbeat !== undefined ? args.heartbeat : 0,
    },
  ]);
}

function encodeConnectionOpen(args: t.ConnectionOpenArgs): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 10 },
    { type: "short", value: 40 },
    {
      type: "shortstr" as const,
      value: args.virtualHost !== undefined ? args.virtualHost : "/",
    },
    {
      type: "shortstr" as const,
      value: args.capabilities !== undefined ? args.capabilities : "",
    },
    {
      type: "bit" as const,
      value: args.insist !== undefined ? args.insist : false,
    },
  ]);
}

function encodeConnectionOpenOk(args: t.ConnectionOpenOkArgs): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 10 },
    { type: "short", value: 41 },
    {
      type: "shortstr" as const,
      value: args.knownHosts !== undefined ? args.knownHosts : "",
    },
  ]);
}

function encodeConnectionClose(args: t.ConnectionCloseArgs): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 10 },
    { type: "short", value: 50 },
    { type: "short" as const, value: args.replyCode },
    {
      type: "shortstr" as const,
      value: args.replyText !== undefined ? args.replyText : "",
    },
    { type: "short" as const, value: args.classId },
    { type: "short" as const, value: args.methodId },
  ]);
}

function encodeConnectionCloseOk(args: t.ConnectionCloseOkArgs): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 10 },
    { type: "short", value: 51 },
  ]);
}

function encodeConnectionBlocked(args: t.ConnectionBlockedArgs): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 10 },
    { type: "short", value: 60 },
    {
      type: "shortstr" as const,
      value: args.reason !== undefined ? args.reason : "",
    },
  ]);
}

function encodeConnectionUnblocked(
  args: t.ConnectionUnblockedArgs,
): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 10 },
    { type: "short", value: 61 },
  ]);
}

function encodeConnectionUpdateSecret(
  args: t.ConnectionUpdateSecretArgs,
): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 10 },
    { type: "short", value: 70 },
    { type: "longstr" as const, value: args.newSecret },
    { type: "shortstr" as const, value: args.reason },
  ]);
}

function encodeConnectionUpdateSecretOk(
  args: t.ConnectionUpdateSecretOkArgs,
): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 10 },
    { type: "short", value: 71 },
  ]);
}

function encodeChannelOpen(args: t.ChannelOpenArgs): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 20 },
    { type: "short", value: 10 },
    {
      type: "shortstr" as const,
      value: args.outOfBand !== undefined ? args.outOfBand : "",
    },
  ]);
}

function encodeChannelOpenOk(args: t.ChannelOpenOkArgs): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 20 },
    { type: "short", value: 11 },
    {
      type: "longstr" as const,
      value: args.channelId !== undefined ? args.channelId : "",
    },
  ]);
}

function encodeChannelFlow(args: t.ChannelFlowArgs): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 20 },
    { type: "short", value: 20 },
    { type: "bit" as const, value: args.active },
  ]);
}

function encodeChannelFlowOk(args: t.ChannelFlowOkArgs): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 20 },
    { type: "short", value: 21 },
    { type: "bit" as const, value: args.active },
  ]);
}

function encodeChannelClose(args: t.ChannelCloseArgs): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 20 },
    { type: "short", value: 40 },
    { type: "short" as const, value: args.replyCode },
    {
      type: "shortstr" as const,
      value: args.replyText !== undefined ? args.replyText : "",
    },
    { type: "short" as const, value: args.classId },
    { type: "short" as const, value: args.methodId },
  ]);
}

function encodeChannelCloseOk(args: t.ChannelCloseOkArgs): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 20 },
    { type: "short", value: 41 },
  ]);
}

function encodeAccessRequest(args: t.AccessRequestArgs): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 30 },
    { type: "short", value: 10 },
    {
      type: "shortstr" as const,
      value: args.realm !== undefined ? args.realm : "/data",
    },
    {
      type: "bit" as const,
      value: args.exclusive !== undefined ? args.exclusive : false,
    },
    {
      type: "bit" as const,
      value: args.passive !== undefined ? args.passive : true,
    },
    {
      type: "bit" as const,
      value: args.active !== undefined ? args.active : true,
    },
    {
      type: "bit" as const,
      value: args.write !== undefined ? args.write : true,
    },
    { type: "bit" as const, value: args.read !== undefined ? args.read : true },
  ]);
}

function encodeAccessRequestOk(args: t.AccessRequestOkArgs): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 30 },
    { type: "short", value: 11 },
    {
      type: "short" as const,
      value: args.ticket !== undefined ? args.ticket : 1,
    },
  ]);
}

function encodeExchangeDeclare(
  args: WithNowait<t.ExchangeDeclareArgs>,
): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 40 },
    { type: "short", value: 10 },
    {
      type: "short" as const,
      value: args.ticket !== undefined ? args.ticket : 0,
    },
    { type: "shortstr" as const, value: args.exchange },
    {
      type: "shortstr" as const,
      value: args.type !== undefined ? args.type : "direct",
    },
    {
      type: "bit" as const,
      value: args.passive !== undefined ? args.passive : false,
    },
    {
      type: "bit" as const,
      value: args.durable !== undefined ? args.durable : false,
    },
    {
      type: "bit" as const,
      value: args.autoDelete !== undefined ? args.autoDelete : false,
    },
    {
      type: "bit" as const,
      value: args.internal !== undefined ? args.internal : false,
    },
    {
      type: "bit" as const,
      value: args.nowait !== undefined ? args.nowait : false,
    },
    {
      type: "table" as const,
      value: args.arguments !== undefined ? args.arguments : {},
    },
  ]);
}

function encodeExchangeDeclareOk(args: t.ExchangeDeclareOkArgs): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 40 },
    { type: "short", value: 11 },
  ]);
}

function encodeExchangeDelete(
  args: WithNowait<t.ExchangeDeleteArgs>,
): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 40 },
    { type: "short", value: 20 },
    {
      type: "short" as const,
      value: args.ticket !== undefined ? args.ticket : 0,
    },
    { type: "shortstr" as const, value: args.exchange },
    {
      type: "bit" as const,
      value: args.ifUnused !== undefined ? args.ifUnused : false,
    },
    {
      type: "bit" as const,
      value: args.nowait !== undefined ? args.nowait : false,
    },
  ]);
}

function encodeExchangeDeleteOk(args: t.ExchangeDeleteOkArgs): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 40 },
    { type: "short", value: 21 },
  ]);
}

function encodeExchangeBind(args: WithNowait<t.ExchangeBindArgs>): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 40 },
    { type: "short", value: 30 },
    {
      type: "short" as const,
      value: args.ticket !== undefined ? args.ticket : 0,
    },
    { type: "shortstr" as const, value: args.destination },
    { type: "shortstr" as const, value: args.source },
    {
      type: "shortstr" as const,
      value: args.routingKey !== undefined ? args.routingKey : "",
    },
    {
      type: "bit" as const,
      value: args.nowait !== undefined ? args.nowait : false,
    },
    {
      type: "table" as const,
      value: args.arguments !== undefined ? args.arguments : {},
    },
  ]);
}

function encodeExchangeBindOk(args: t.ExchangeBindOkArgs): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 40 },
    { type: "short", value: 31 },
  ]);
}

function encodeExchangeUnbind(
  args: WithNowait<t.ExchangeUnbindArgs>,
): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 40 },
    { type: "short", value: 40 },
    {
      type: "short" as const,
      value: args.ticket !== undefined ? args.ticket : 0,
    },
    { type: "shortstr" as const, value: args.destination },
    { type: "shortstr" as const, value: args.source },
    {
      type: "shortstr" as const,
      value: args.routingKey !== undefined ? args.routingKey : "",
    },
    {
      type: "bit" as const,
      value: args.nowait !== undefined ? args.nowait : false,
    },
    {
      type: "table" as const,
      value: args.arguments !== undefined ? args.arguments : {},
    },
  ]);
}

function encodeExchangeUnbindOk(args: t.ExchangeUnbindOkArgs): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 40 },
    { type: "short", value: 51 },
  ]);
}

function encodeQueueDeclare(args: WithNowait<t.QueueDeclareArgs>): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 50 },
    { type: "short", value: 10 },
    {
      type: "short" as const,
      value: args.ticket !== undefined ? args.ticket : 0,
    },
    {
      type: "shortstr" as const,
      value: args.queue !== undefined ? args.queue : "",
    },
    {
      type: "bit" as const,
      value: args.passive !== undefined ? args.passive : false,
    },
    {
      type: "bit" as const,
      value: args.durable !== undefined ? args.durable : false,
    },
    {
      type: "bit" as const,
      value: args.exclusive !== undefined ? args.exclusive : false,
    },
    {
      type: "bit" as const,
      value: args.autoDelete !== undefined ? args.autoDelete : false,
    },
    {
      type: "bit" as const,
      value: args.nowait !== undefined ? args.nowait : false,
    },
    {
      type: "table" as const,
      value: args.arguments !== undefined ? args.arguments : {},
    },
  ]);
}

function encodeQueueDeclareOk(args: t.QueueDeclareOkArgs): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 50 },
    { type: "short", value: 11 },
    { type: "shortstr" as const, value: args.queue },
    { type: "long" as const, value: args.messageCount },
    { type: "long" as const, value: args.consumerCount },
  ]);
}

function encodeQueueBind(args: WithNowait<t.QueueBindArgs>): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 50 },
    { type: "short", value: 20 },
    {
      type: "short" as const,
      value: args.ticket !== undefined ? args.ticket : 0,
    },
    {
      type: "shortstr" as const,
      value: args.queue !== undefined ? args.queue : "",
    },
    { type: "shortstr" as const, value: args.exchange },
    {
      type: "shortstr" as const,
      value: args.routingKey !== undefined ? args.routingKey : "",
    },
    {
      type: "bit" as const,
      value: args.nowait !== undefined ? args.nowait : false,
    },
    {
      type: "table" as const,
      value: args.arguments !== undefined ? args.arguments : {},
    },
  ]);
}

function encodeQueueBindOk(args: t.QueueBindOkArgs): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 50 },
    { type: "short", value: 21 },
  ]);
}

function encodeQueuePurge(args: WithNowait<t.QueuePurgeArgs>): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 50 },
    { type: "short", value: 30 },
    {
      type: "short" as const,
      value: args.ticket !== undefined ? args.ticket : 0,
    },
    {
      type: "shortstr" as const,
      value: args.queue !== undefined ? args.queue : "",
    },
    {
      type: "bit" as const,
      value: args.nowait !== undefined ? args.nowait : false,
    },
  ]);
}

function encodeQueuePurgeOk(args: t.QueuePurgeOkArgs): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 50 },
    { type: "short", value: 31 },
    { type: "long" as const, value: args.messageCount },
  ]);
}

function encodeQueueDelete(args: WithNowait<t.QueueDeleteArgs>): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 50 },
    { type: "short", value: 40 },
    {
      type: "short" as const,
      value: args.ticket !== undefined ? args.ticket : 0,
    },
    {
      type: "shortstr" as const,
      value: args.queue !== undefined ? args.queue : "",
    },
    {
      type: "bit" as const,
      value: args.ifUnused !== undefined ? args.ifUnused : false,
    },
    {
      type: "bit" as const,
      value: args.ifEmpty !== undefined ? args.ifEmpty : false,
    },
    {
      type: "bit" as const,
      value: args.nowait !== undefined ? args.nowait : false,
    },
  ]);
}

function encodeQueueDeleteOk(args: t.QueueDeleteOkArgs): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 50 },
    { type: "short", value: 41 },
    { type: "long" as const, value: args.messageCount },
  ]);
}

function encodeQueueUnbind(args: t.QueueUnbindArgs): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 50 },
    { type: "short", value: 50 },
    {
      type: "short" as const,
      value: args.ticket !== undefined ? args.ticket : 0,
    },
    {
      type: "shortstr" as const,
      value: args.queue !== undefined ? args.queue : "",
    },
    { type: "shortstr" as const, value: args.exchange },
    {
      type: "shortstr" as const,
      value: args.routingKey !== undefined ? args.routingKey : "",
    },
    {
      type: "table" as const,
      value: args.arguments !== undefined ? args.arguments : {},
    },
  ]);
}

function encodeQueueUnbindOk(args: t.QueueUnbindOkArgs): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 50 },
    { type: "short", value: 51 },
  ]);
}

function encodeBasicQos(args: t.BasicQosArgs): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 60 },
    { type: "short", value: 10 },
    {
      type: "long" as const,
      value: args.prefetchSize !== undefined ? args.prefetchSize : 0,
    },
    {
      type: "short" as const,
      value: args.prefetchCount !== undefined ? args.prefetchCount : 0,
    },
    {
      type: "bit" as const,
      value: args.global !== undefined ? args.global : false,
    },
  ]);
}

function encodeBasicQosOk(args: t.BasicQosOkArgs): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 60 },
    { type: "short", value: 11 },
  ]);
}

function encodeBasicConsume(args: WithNowait<t.BasicConsumeArgs>): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 60 },
    { type: "short", value: 20 },
    {
      type: "short" as const,
      value: args.ticket !== undefined ? args.ticket : 0,
    },
    {
      type: "shortstr" as const,
      value: args.queue !== undefined ? args.queue : "",
    },
    {
      type: "shortstr" as const,
      value: args.consumerTag !== undefined ? args.consumerTag : "",
    },
    {
      type: "bit" as const,
      value: args.noLocal !== undefined ? args.noLocal : false,
    },
    {
      type: "bit" as const,
      value: args.noAck !== undefined ? args.noAck : false,
    },
    {
      type: "bit" as const,
      value: args.exclusive !== undefined ? args.exclusive : false,
    },
    {
      type: "bit" as const,
      value: args.nowait !== undefined ? args.nowait : false,
    },
    {
      type: "table" as const,
      value: args.arguments !== undefined ? args.arguments : {},
    },
  ]);
}

function encodeBasicConsumeOk(args: t.BasicConsumeOkArgs): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 60 },
    { type: "short", value: 21 },
    { type: "shortstr" as const, value: args.consumerTag },
  ]);
}

function encodeBasicCancel(args: WithNowait<t.BasicCancelArgs>): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 60 },
    { type: "short", value: 30 },
    { type: "shortstr" as const, value: args.consumerTag },
    {
      type: "bit" as const,
      value: args.nowait !== undefined ? args.nowait : false,
    },
  ]);
}

function encodeBasicCancelOk(args: t.BasicCancelOkArgs): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 60 },
    { type: "short", value: 31 },
    { type: "shortstr" as const, value: args.consumerTag },
  ]);
}

function encodeBasicPublish(args: t.BasicPublishArgs): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 60 },
    { type: "short", value: 40 },
    {
      type: "short" as const,
      value: args.ticket !== undefined ? args.ticket : 0,
    },
    {
      type: "shortstr" as const,
      value: args.exchange !== undefined ? args.exchange : "",
    },
    {
      type: "shortstr" as const,
      value: args.routingKey !== undefined ? args.routingKey : "",
    },
    {
      type: "bit" as const,
      value: args.mandatory !== undefined ? args.mandatory : false,
    },
    {
      type: "bit" as const,
      value: args.immediate !== undefined ? args.immediate : false,
    },
  ]);
}

function encodeBasicReturn(args: t.BasicReturnArgs): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 60 },
    { type: "short", value: 50 },
    { type: "short" as const, value: args.replyCode },
    {
      type: "shortstr" as const,
      value: args.replyText !== undefined ? args.replyText : "",
    },
    { type: "shortstr" as const, value: args.exchange },
    { type: "shortstr" as const, value: args.routingKey },
  ]);
}

function encodeBasicDeliver(args: t.BasicDeliverArgs): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 60 },
    { type: "short", value: 60 },
    { type: "shortstr" as const, value: args.consumerTag },
    { type: "longlong" as const, value: args.deliveryTag },
    {
      type: "bit" as const,
      value: args.redelivered !== undefined ? args.redelivered : false,
    },
    { type: "shortstr" as const, value: args.exchange },
    { type: "shortstr" as const, value: args.routingKey },
  ]);
}

function encodeBasicGet(args: t.BasicGetArgs): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 60 },
    { type: "short", value: 70 },
    {
      type: "short" as const,
      value: args.ticket !== undefined ? args.ticket : 0,
    },
    {
      type: "shortstr" as const,
      value: args.queue !== undefined ? args.queue : "",
    },
    {
      type: "bit" as const,
      value: args.noAck !== undefined ? args.noAck : false,
    },
  ]);
}

function encodeBasicGetOk(args: t.BasicGetOkArgs): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 60 },
    { type: "short", value: 71 },
    { type: "longlong" as const, value: args.deliveryTag },
    {
      type: "bit" as const,
      value: args.redelivered !== undefined ? args.redelivered : false,
    },
    { type: "shortstr" as const, value: args.exchange },
    { type: "shortstr" as const, value: args.routingKey },
    { type: "long" as const, value: args.messageCount },
  ]);
}

function encodeBasicGetEmpty(args: t.BasicGetEmptyArgs): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 60 },
    { type: "short", value: 72 },
    {
      type: "shortstr" as const,
      value: args.clusterId !== undefined ? args.clusterId : "",
    },
  ]);
}

function encodeBasicAck(args: t.BasicAckArgs): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 60 },
    { type: "short", value: 80 },
    {
      type: "longlong" as const,
      value: args.deliveryTag !== undefined ? args.deliveryTag : 0,
    },
    {
      type: "bit" as const,
      value: args.multiple !== undefined ? args.multiple : false,
    },
  ]);
}

function encodeBasicReject(args: t.BasicRejectArgs): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 60 },
    { type: "short", value: 90 },
    { type: "longlong" as const, value: args.deliveryTag },
    {
      type: "bit" as const,
      value: args.requeue !== undefined ? args.requeue : true,
    },
  ]);
}

function encodeBasicRecoverAsync(args: t.BasicRecoverAsyncArgs): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 60 },
    { type: "short", value: 100 },
    {
      type: "bit" as const,
      value: args.requeue !== undefined ? args.requeue : false,
    },
  ]);
}

function encodeBasicRecover(args: t.BasicRecoverArgs): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 60 },
    { type: "short", value: 110 },
    {
      type: "bit" as const,
      value: args.requeue !== undefined ? args.requeue : false,
    },
  ]);
}

function encodeBasicRecoverOk(args: t.BasicRecoverOkArgs): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 60 },
    { type: "short", value: 111 },
  ]);
}

function encodeBasicNack(args: t.BasicNackArgs): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 60 },
    { type: "short", value: 120 },
    {
      type: "longlong" as const,
      value: args.deliveryTag !== undefined ? args.deliveryTag : 0,
    },
    {
      type: "bit" as const,
      value: args.multiple !== undefined ? args.multiple : false,
    },
    {
      type: "bit" as const,
      value: args.requeue !== undefined ? args.requeue : true,
    },
  ]);
}

function encodeTxSelect(args: t.TxSelectArgs): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 90 },
    { type: "short", value: 10 },
  ]);
}

function encodeTxSelectOk(args: t.TxSelectOkArgs): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 90 },
    { type: "short", value: 11 },
  ]);
}

function encodeTxCommit(args: t.TxCommitArgs): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 90 },
    { type: "short", value: 20 },
  ]);
}

function encodeTxCommitOk(args: t.TxCommitOkArgs): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 90 },
    { type: "short", value: 21 },
  ]);
}

function encodeTxRollback(args: t.TxRollbackArgs): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 90 },
    { type: "short", value: 30 },
  ]);
}

function encodeTxRollbackOk(args: t.TxRollbackOkArgs): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 90 },
    { type: "short", value: 31 },
  ]);
}

function encodeConfirmSelect(
  args: WithNowait<t.ConfirmSelectArgs>,
): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 85 },
    { type: "short", value: 10 },
    {
      type: "bit" as const,
      value: args.nowait !== undefined ? args.nowait : false,
    },
  ]);
}

function encodeConfirmSelectOk(args: t.ConfirmSelectOkArgs): Uint8Array {
  return enc.encodeFields([
    { type: "short", value: 85 },
    { type: "short", value: 11 },
  ]);
}

function decodeConnectionStart(r: Deno.ReaderSync): t.ConnectionStart {
  const fields = enc.decodeFields(
    r,
    ["octet", "octet", "table", "longstr", "longstr"],
  );
  const args = {
    versionMajor: fields[0] as number,
    versionMinor: fields[1] as number,
    serverProperties: fields[2] as Record<string, unknown>,
    mechanisms: fields[3] as string,
    locales: fields[4] as string,
  };
  return args;
}

function decodeConnectionStartOk(r: Deno.ReaderSync): t.ConnectionStartOk {
  const fields = enc.decodeFields(
    r,
    ["table", "shortstr", "longstr", "shortstr"],
  );
  const args = {
    clientProperties: fields[0] as Record<string, unknown>,
    mechanism: fields[1] as string,
    response: fields[2] as string,
    locale: fields[3] as string,
  };
  return args;
}

function decodeConnectionSecure(r: Deno.ReaderSync): t.ConnectionSecure {
  const fields = enc.decodeFields(r, ["longstr"]);
  const args = { challenge: fields[0] as string };
  return args;
}

function decodeConnectionSecureOk(r: Deno.ReaderSync): t.ConnectionSecureOk {
  const fields = enc.decodeFields(r, ["longstr"]);
  const args = { response: fields[0] as string };
  return args;
}

function decodeConnectionTune(r: Deno.ReaderSync): t.ConnectionTune {
  const fields = enc.decodeFields(r, ["short", "long", "short"]);
  const args = {
    channelMax: fields[0] as number,
    frameMax: fields[1] as number,
    heartbeat: fields[2] as number,
  };
  return args;
}

function decodeConnectionTuneOk(r: Deno.ReaderSync): t.ConnectionTuneOk {
  const fields = enc.decodeFields(r, ["short", "long", "short"]);
  const args = {
    channelMax: fields[0] as number,
    frameMax: fields[1] as number,
    heartbeat: fields[2] as number,
  };
  return args;
}

function decodeConnectionOpen(r: Deno.ReaderSync): t.ConnectionOpen {
  const fields = enc.decodeFields(r, ["shortstr", "shortstr", "bit"]);
  const args = {
    virtualHost: fields[0] as string,
    capabilities: fields[1] as string,
    insist: fields[2] as boolean,
  };
  return args;
}

function decodeConnectionOpenOk(r: Deno.ReaderSync): t.ConnectionOpenOk {
  const fields = enc.decodeFields(r, ["shortstr"]);
  const args = { knownHosts: fields[0] as string };
  return args;
}

function decodeConnectionClose(r: Deno.ReaderSync): t.ConnectionClose {
  const fields = enc.decodeFields(r, ["short", "shortstr", "short", "short"]);
  const args = {
    replyCode: fields[0] as number,
    replyText: fields[1] as string,
    classId: fields[2] as number,
    methodId: fields[3] as number,
  };
  return args;
}

function decodeConnectionCloseOk(r: Deno.ReaderSync): t.ConnectionCloseOk {
  const fields = enc.decodeFields(r, []);
  const args = {};
  return args;
}

function decodeConnectionBlocked(r: Deno.ReaderSync): t.ConnectionBlocked {
  const fields = enc.decodeFields(r, ["shortstr"]);
  const args = { reason: fields[0] as string };
  return args;
}

function decodeConnectionUnblocked(r: Deno.ReaderSync): t.ConnectionUnblocked {
  const fields = enc.decodeFields(r, []);
  const args = {};
  return args;
}

function decodeConnectionUpdateSecret(
  r: Deno.ReaderSync,
): t.ConnectionUpdateSecret {
  const fields = enc.decodeFields(r, ["longstr", "shortstr"]);
  const args = { newSecret: fields[0] as string, reason: fields[1] as string };
  return args;
}

function decodeConnectionUpdateSecretOk(
  r: Deno.ReaderSync,
): t.ConnectionUpdateSecretOk {
  const fields = enc.decodeFields(r, []);
  const args = {};
  return args;
}

function decodeChannelOpen(r: Deno.ReaderSync): t.ChannelOpen {
  const fields = enc.decodeFields(r, ["shortstr"]);
  const args = { outOfBand: fields[0] as string };
  return args;
}

function decodeChannelOpenOk(r: Deno.ReaderSync): t.ChannelOpenOk {
  const fields = enc.decodeFields(r, ["longstr"]);
  const args = { channelId: fields[0] as string };
  return args;
}

function decodeChannelFlow(r: Deno.ReaderSync): t.ChannelFlow {
  const fields = enc.decodeFields(r, ["bit"]);
  const args = { active: fields[0] as boolean };
  return args;
}

function decodeChannelFlowOk(r: Deno.ReaderSync): t.ChannelFlowOk {
  const fields = enc.decodeFields(r, ["bit"]);
  const args = { active: fields[0] as boolean };
  return args;
}

function decodeChannelClose(r: Deno.ReaderSync): t.ChannelClose {
  const fields = enc.decodeFields(r, ["short", "shortstr", "short", "short"]);
  const args = {
    replyCode: fields[0] as number,
    replyText: fields[1] as string,
    classId: fields[2] as number,
    methodId: fields[3] as number,
  };
  return args;
}

function decodeChannelCloseOk(r: Deno.ReaderSync): t.ChannelCloseOk {
  const fields = enc.decodeFields(r, []);
  const args = {};
  return args;
}

function decodeAccessRequest(r: Deno.ReaderSync): t.AccessRequest {
  const fields = enc.decodeFields(
    r,
    ["shortstr", "bit", "bit", "bit", "bit", "bit"],
  );
  const args = {
    realm: fields[0] as string,
    exclusive: fields[1] as boolean,
    passive: fields[2] as boolean,
    active: fields[3] as boolean,
    write: fields[4] as boolean,
    read: fields[5] as boolean,
  };
  return args;
}

function decodeAccessRequestOk(r: Deno.ReaderSync): t.AccessRequestOk {
  const fields = enc.decodeFields(r, ["short"]);
  const args = { ticket: fields[0] as number };
  return args;
}

function decodeExchangeDeclare(r: Deno.ReaderSync): t.ExchangeDeclare {
  const fields = enc.decodeFields(
    r,
    [
      "short",
      "shortstr",
      "shortstr",
      "bit",
      "bit",
      "bit",
      "bit",
      "bit",
      "table",
    ],
  );
  const args = {
    ticket: fields[0] as number,
    exchange: fields[1] as string,
    type: fields[2] as string,
    passive: fields[3] as boolean,
    durable: fields[4] as boolean,
    autoDelete: fields[5] as boolean,
    internal: fields[6] as boolean,
    nowait: fields[7] as boolean,
    arguments: fields[8] as Record<string, unknown>,
  };
  return args;
}

function decodeExchangeDeclareOk(r: Deno.ReaderSync): t.ExchangeDeclareOk {
  const fields = enc.decodeFields(r, []);
  const args = {};
  return args;
}

function decodeExchangeDelete(r: Deno.ReaderSync): t.ExchangeDelete {
  const fields = enc.decodeFields(r, ["short", "shortstr", "bit", "bit"]);
  const args = {
    ticket: fields[0] as number,
    exchange: fields[1] as string,
    ifUnused: fields[2] as boolean,
    nowait: fields[3] as boolean,
  };
  return args;
}

function decodeExchangeDeleteOk(r: Deno.ReaderSync): t.ExchangeDeleteOk {
  const fields = enc.decodeFields(r, []);
  const args = {};
  return args;
}

function decodeExchangeBind(r: Deno.ReaderSync): t.ExchangeBind {
  const fields = enc.decodeFields(
    r,
    ["short", "shortstr", "shortstr", "shortstr", "bit", "table"],
  );
  const args = {
    ticket: fields[0] as number,
    destination: fields[1] as string,
    source: fields[2] as string,
    routingKey: fields[3] as string,
    nowait: fields[4] as boolean,
    arguments: fields[5] as Record<string, unknown>,
  };
  return args;
}

function decodeExchangeBindOk(r: Deno.ReaderSync): t.ExchangeBindOk {
  const fields = enc.decodeFields(r, []);
  const args = {};
  return args;
}

function decodeExchangeUnbind(r: Deno.ReaderSync): t.ExchangeUnbind {
  const fields = enc.decodeFields(
    r,
    ["short", "shortstr", "shortstr", "shortstr", "bit", "table"],
  );
  const args = {
    ticket: fields[0] as number,
    destination: fields[1] as string,
    source: fields[2] as string,
    routingKey: fields[3] as string,
    nowait: fields[4] as boolean,
    arguments: fields[5] as Record<string, unknown>,
  };
  return args;
}

function decodeExchangeUnbindOk(r: Deno.ReaderSync): t.ExchangeUnbindOk {
  const fields = enc.decodeFields(r, []);
  const args = {};
  return args;
}

function decodeQueueDeclare(r: Deno.ReaderSync): t.QueueDeclare {
  const fields = enc.decodeFields(
    r,
    ["short", "shortstr", "bit", "bit", "bit", "bit", "bit", "table"],
  );
  const args = {
    ticket: fields[0] as number,
    queue: fields[1] as string,
    passive: fields[2] as boolean,
    durable: fields[3] as boolean,
    exclusive: fields[4] as boolean,
    autoDelete: fields[5] as boolean,
    nowait: fields[6] as boolean,
    arguments: fields[7] as Record<string, unknown>,
  };
  return args;
}

function decodeQueueDeclareOk(r: Deno.ReaderSync): t.QueueDeclareOk {
  const fields = enc.decodeFields(r, ["shortstr", "long", "long"]);
  const args = {
    queue: fields[0] as string,
    messageCount: fields[1] as number,
    consumerCount: fields[2] as number,
  };
  return args;
}

function decodeQueueBind(r: Deno.ReaderSync): t.QueueBind {
  const fields = enc.decodeFields(
    r,
    ["short", "shortstr", "shortstr", "shortstr", "bit", "table"],
  );
  const args = {
    ticket: fields[0] as number,
    queue: fields[1] as string,
    exchange: fields[2] as string,
    routingKey: fields[3] as string,
    nowait: fields[4] as boolean,
    arguments: fields[5] as Record<string, unknown>,
  };
  return args;
}

function decodeQueueBindOk(r: Deno.ReaderSync): t.QueueBindOk {
  const fields = enc.decodeFields(r, []);
  const args = {};
  return args;
}

function decodeQueuePurge(r: Deno.ReaderSync): t.QueuePurge {
  const fields = enc.decodeFields(r, ["short", "shortstr", "bit"]);
  const args = {
    ticket: fields[0] as number,
    queue: fields[1] as string,
    nowait: fields[2] as boolean,
  };
  return args;
}

function decodeQueuePurgeOk(r: Deno.ReaderSync): t.QueuePurgeOk {
  const fields = enc.decodeFields(r, ["long"]);
  const args = { messageCount: fields[0] as number };
  return args;
}

function decodeQueueDelete(r: Deno.ReaderSync): t.QueueDelete {
  const fields = enc.decodeFields(
    r,
    ["short", "shortstr", "bit", "bit", "bit"],
  );
  const args = {
    ticket: fields[0] as number,
    queue: fields[1] as string,
    ifUnused: fields[2] as boolean,
    ifEmpty: fields[3] as boolean,
    nowait: fields[4] as boolean,
  };
  return args;
}

function decodeQueueDeleteOk(r: Deno.ReaderSync): t.QueueDeleteOk {
  const fields = enc.decodeFields(r, ["long"]);
  const args = { messageCount: fields[0] as number };
  return args;
}

function decodeQueueUnbind(r: Deno.ReaderSync): t.QueueUnbind {
  const fields = enc.decodeFields(
    r,
    ["short", "shortstr", "shortstr", "shortstr", "table"],
  );
  const args = {
    ticket: fields[0] as number,
    queue: fields[1] as string,
    exchange: fields[2] as string,
    routingKey: fields[3] as string,
    arguments: fields[4] as Record<string, unknown>,
  };
  return args;
}

function decodeQueueUnbindOk(r: Deno.ReaderSync): t.QueueUnbindOk {
  const fields = enc.decodeFields(r, []);
  const args = {};
  return args;
}

function decodeBasicQos(r: Deno.ReaderSync): t.BasicQos {
  const fields = enc.decodeFields(r, ["long", "short", "bit"]);
  const args = {
    prefetchSize: fields[0] as number,
    prefetchCount: fields[1] as number,
    global: fields[2] as boolean,
  };
  return args;
}

function decodeBasicQosOk(r: Deno.ReaderSync): t.BasicQosOk {
  const fields = enc.decodeFields(r, []);
  const args = {};
  return args;
}

function decodeBasicConsume(r: Deno.ReaderSync): t.BasicConsume {
  const fields = enc.decodeFields(
    r,
    ["short", "shortstr", "shortstr", "bit", "bit", "bit", "bit", "table"],
  );
  const args = {
    ticket: fields[0] as number,
    queue: fields[1] as string,
    consumerTag: fields[2] as string,
    noLocal: fields[3] as boolean,
    noAck: fields[4] as boolean,
    exclusive: fields[5] as boolean,
    nowait: fields[6] as boolean,
    arguments: fields[7] as Record<string, unknown>,
  };
  return args;
}

function decodeBasicConsumeOk(r: Deno.ReaderSync): t.BasicConsumeOk {
  const fields = enc.decodeFields(r, ["shortstr"]);
  const args = { consumerTag: fields[0] as string };
  return args;
}

function decodeBasicCancel(r: Deno.ReaderSync): t.BasicCancel {
  const fields = enc.decodeFields(r, ["shortstr", "bit"]);
  const args = {
    consumerTag: fields[0] as string,
    nowait: fields[1] as boolean,
  };
  return args;
}

function decodeBasicCancelOk(r: Deno.ReaderSync): t.BasicCancelOk {
  const fields = enc.decodeFields(r, ["shortstr"]);
  const args = { consumerTag: fields[0] as string };
  return args;
}

function decodeBasicPublish(r: Deno.ReaderSync): t.BasicPublish {
  const fields = enc.decodeFields(
    r,
    ["short", "shortstr", "shortstr", "bit", "bit"],
  );
  const args = {
    ticket: fields[0] as number,
    exchange: fields[1] as string,
    routingKey: fields[2] as string,
    mandatory: fields[3] as boolean,
    immediate: fields[4] as boolean,
  };
  return args;
}

function decodeBasicReturn(r: Deno.ReaderSync): t.BasicReturn {
  const fields = enc.decodeFields(
    r,
    ["short", "shortstr", "shortstr", "shortstr"],
  );
  const args = {
    replyCode: fields[0] as number,
    replyText: fields[1] as string,
    exchange: fields[2] as string,
    routingKey: fields[3] as string,
  };
  return args;
}

function decodeBasicDeliver(r: Deno.ReaderSync): t.BasicDeliver {
  const fields = enc.decodeFields(
    r,
    ["shortstr", "longlong", "bit", "shortstr", "shortstr"],
  );
  const args = {
    consumerTag: fields[0] as string,
    deliveryTag: fields[1] as number,
    redelivered: fields[2] as boolean,
    exchange: fields[3] as string,
    routingKey: fields[4] as string,
  };
  return args;
}

function decodeBasicGet(r: Deno.ReaderSync): t.BasicGet {
  const fields = enc.decodeFields(r, ["short", "shortstr", "bit"]);
  const args = {
    ticket: fields[0] as number,
    queue: fields[1] as string,
    noAck: fields[2] as boolean,
  };
  return args;
}

function decodeBasicGetOk(r: Deno.ReaderSync): t.BasicGetOk {
  const fields = enc.decodeFields(
    r,
    ["longlong", "bit", "shortstr", "shortstr", "long"],
  );
  const args = {
    deliveryTag: fields[0] as number,
    redelivered: fields[1] as boolean,
    exchange: fields[2] as string,
    routingKey: fields[3] as string,
    messageCount: fields[4] as number,
  };
  return args;
}

function decodeBasicGetEmpty(r: Deno.ReaderSync): t.BasicGetEmpty {
  const fields = enc.decodeFields(r, ["shortstr"]);
  const args = { clusterId: fields[0] as string };
  return args;
}

function decodeBasicAck(r: Deno.ReaderSync): t.BasicAck {
  const fields = enc.decodeFields(r, ["longlong", "bit"]);
  const args = {
    deliveryTag: fields[0] as number,
    multiple: fields[1] as boolean,
  };
  return args;
}

function decodeBasicReject(r: Deno.ReaderSync): t.BasicReject {
  const fields = enc.decodeFields(r, ["longlong", "bit"]);
  const args = {
    deliveryTag: fields[0] as number,
    requeue: fields[1] as boolean,
  };
  return args;
}

function decodeBasicRecoverAsync(r: Deno.ReaderSync): t.BasicRecoverAsync {
  const fields = enc.decodeFields(r, ["bit"]);
  const args = { requeue: fields[0] as boolean };
  return args;
}

function decodeBasicRecover(r: Deno.ReaderSync): t.BasicRecover {
  const fields = enc.decodeFields(r, ["bit"]);
  const args = { requeue: fields[0] as boolean };
  return args;
}

function decodeBasicRecoverOk(r: Deno.ReaderSync): t.BasicRecoverOk {
  const fields = enc.decodeFields(r, []);
  const args = {};
  return args;
}

function decodeBasicNack(r: Deno.ReaderSync): t.BasicNack {
  const fields = enc.decodeFields(r, ["longlong", "bit", "bit"]);
  const args = {
    deliveryTag: fields[0] as number,
    multiple: fields[1] as boolean,
    requeue: fields[2] as boolean,
  };
  return args;
}

function decodeTxSelect(r: Deno.ReaderSync): t.TxSelect {
  const fields = enc.decodeFields(r, []);
  const args = {};
  return args;
}

function decodeTxSelectOk(r: Deno.ReaderSync): t.TxSelectOk {
  const fields = enc.decodeFields(r, []);
  const args = {};
  return args;
}

function decodeTxCommit(r: Deno.ReaderSync): t.TxCommit {
  const fields = enc.decodeFields(r, []);
  const args = {};
  return args;
}

function decodeTxCommitOk(r: Deno.ReaderSync): t.TxCommitOk {
  const fields = enc.decodeFields(r, []);
  const args = {};
  return args;
}

function decodeTxRollback(r: Deno.ReaderSync): t.TxRollback {
  const fields = enc.decodeFields(r, []);
  const args = {};
  return args;
}

function decodeTxRollbackOk(r: Deno.ReaderSync): t.TxRollbackOk {
  const fields = enc.decodeFields(r, []);
  const args = {};
  return args;
}

function decodeConfirmSelect(r: Deno.ReaderSync): t.ConfirmSelect {
  const fields = enc.decodeFields(r, ["bit"]);
  const args = { nowait: fields[0] as boolean };
  return args;
}

function decodeConfirmSelectOk(r: Deno.ReaderSync): t.ConfirmSelectOk {
  const fields = enc.decodeFields(r, []);
  const args = {};
  return args;
}

function encodeConnectionHeader(header: ConnectionHeader): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeFields([
    { type: "short", value: 10 },
    { type: "short", value: 0 }, // weight unused
    { type: "longlong", value: header.size },
  ]));
  w.writeSync(enc.encodeOptionalFields([]));
  return w.bytes();
}

function encodeChannelHeader(header: ChannelHeader): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeFields([
    { type: "short", value: 20 },
    { type: "short", value: 0 }, // weight unused
    { type: "longlong", value: header.size },
  ]));
  w.writeSync(enc.encodeOptionalFields([]));
  return w.bytes();
}

function encodeAccessHeader(header: AccessHeader): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeFields([
    { type: "short", value: 30 },
    { type: "short", value: 0 }, // weight unused
    { type: "longlong", value: header.size },
  ]));
  w.writeSync(enc.encodeOptionalFields([]));
  return w.bytes();
}

function encodeExchangeHeader(header: ExchangeHeader): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeFields([
    { type: "short", value: 40 },
    { type: "short", value: 0 }, // weight unused
    { type: "longlong", value: header.size },
  ]));
  w.writeSync(enc.encodeOptionalFields([]));
  return w.bytes();
}

function encodeQueueHeader(header: QueueHeader): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeFields([
    { type: "short", value: 50 },
    { type: "short", value: 0 }, // weight unused
    { type: "longlong", value: header.size },
  ]));
  w.writeSync(enc.encodeOptionalFields([]));
  return w.bytes();
}

function encodeBasicHeader(header: BasicHeader): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeFields([
    { type: "short", value: 60 },
    { type: "short", value: 0 }, // weight unused
    { type: "longlong", value: header.size },
  ]));
  w.writeSync(enc.encodeOptionalFields([
    { type: "shortstr", value: header.props.contentType },
    { type: "shortstr", value: header.props.contentEncoding },
    { type: "table", value: header.props.headers },
    { type: "octet", value: header.props.deliveryMode },
    { type: "octet", value: header.props.priority },
    { type: "shortstr", value: header.props.correlationId },
    { type: "shortstr", value: header.props.replyTo },
    { type: "shortstr", value: header.props.expiration },
    { type: "shortstr", value: header.props.messageId },
    { type: "timestamp", value: header.props.timestamp },
    { type: "shortstr", value: header.props.type },
    { type: "shortstr", value: header.props.userId },
    { type: "shortstr", value: header.props.appId },
    { type: "shortstr", value: header.props.clusterId },
  ]));
  return w.bytes();
}

function encodeTxHeader(header: TxHeader): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeFields([
    { type: "short", value: 90 },
    { type: "short", value: 0 }, // weight unused
    { type: "longlong", value: header.size },
  ]));
  w.writeSync(enc.encodeOptionalFields([]));
  return w.bytes();
}

function encodeConfirmHeader(header: ConfirmHeader): Uint8Array {
  const w = new Deno.Buffer();
  w.writeSync(enc.encodeFields([
    { type: "short", value: 85 },
    { type: "short", value: 0 }, // weight unused
    { type: "longlong", value: header.size },
  ]));
  w.writeSync(enc.encodeOptionalFields([]));
  return w.bytes();
}

function decodeConnectionHeader(r: Deno.ReaderSync): ConnectionHeader {
  const weight = enc.decodeShortUint(r);
  const size = enc.decodeLongLongUint(r);
  const fields = enc.decodeOptionalFields(r, []);
  const props = {};

  return { classId: 10, size, props };
}

function decodeChannelHeader(r: Deno.ReaderSync): ChannelHeader {
  const weight = enc.decodeShortUint(r);
  const size = enc.decodeLongLongUint(r);
  const fields = enc.decodeOptionalFields(r, []);
  const props = {};

  return { classId: 20, size, props };
}

function decodeAccessHeader(r: Deno.ReaderSync): AccessHeader {
  const weight = enc.decodeShortUint(r);
  const size = enc.decodeLongLongUint(r);
  const fields = enc.decodeOptionalFields(r, []);
  const props = {};

  return { classId: 30, size, props };
}

function decodeExchangeHeader(r: Deno.ReaderSync): ExchangeHeader {
  const weight = enc.decodeShortUint(r);
  const size = enc.decodeLongLongUint(r);
  const fields = enc.decodeOptionalFields(r, []);
  const props = {};

  return { classId: 40, size, props };
}

function decodeQueueHeader(r: Deno.ReaderSync): QueueHeader {
  const weight = enc.decodeShortUint(r);
  const size = enc.decodeLongLongUint(r);
  const fields = enc.decodeOptionalFields(r, []);
  const props = {};

  return { classId: 50, size, props };
}

function decodeBasicHeader(r: Deno.ReaderSync): BasicHeader {
  const weight = enc.decodeShortUint(r);
  const size = enc.decodeLongLongUint(r);
  const fields = enc.decodeOptionalFields(
    r,
    [
      "shortstr",
      "shortstr",
      "table",
      "octet",
      "octet",
      "shortstr",
      "shortstr",
      "shortstr",
      "shortstr",
      "timestamp",
      "shortstr",
      "shortstr",
      "shortstr",
      "shortstr",
    ],
  );
  const props = {
    contentType: fields[0] as string,
    contentEncoding: fields[1] as string,
    headers: fields[2] as Record<string, unknown>,
    deliveryMode: fields[3] as number,
    priority: fields[4] as number,
    correlationId: fields[5] as string,
    replyTo: fields[6] as string,
    expiration: fields[7] as string,
    messageId: fields[8] as string,
    timestamp: fields[9] as number,
    type: fields[10] as string,
    userId: fields[11] as string,
    appId: fields[12] as string,
    clusterId: fields[13] as string,
  };

  return { classId: 60, size, props };
}

function decodeTxHeader(r: Deno.ReaderSync): TxHeader {
  const weight = enc.decodeShortUint(r);
  const size = enc.decodeLongLongUint(r);
  const fields = enc.decodeOptionalFields(r, []);
  const props = {};

  return { classId: 90, size, props };
}

function decodeConfirmHeader(r: Deno.ReaderSync): ConfirmHeader {
  const weight = enc.decodeShortUint(r);
  const size = enc.decodeLongLongUint(r);
  const fields = enc.decodeOptionalFields(r, []);
  const props = {};

  return { classId: 85, size, props };
}

export function decodeMethod(data: Uint8Array): ReceiveMethod {
  const r = new Deno.Buffer(data);
  const classId = enc.decodeShortUint(r);
  const methodId = enc.decodeShortUint(r);
  switch (classId) {
    case 10: {
      switch (methodId) {
        case 10:
          return { classId, methodId, args: decodeConnectionStart(r) };
        case 11:
          return { classId, methodId, args: decodeConnectionStartOk(r) };
        case 20:
          return { classId, methodId, args: decodeConnectionSecure(r) };
        case 21:
          return { classId, methodId, args: decodeConnectionSecureOk(r) };
        case 30:
          return { classId, methodId, args: decodeConnectionTune(r) };
        case 31:
          return { classId, methodId, args: decodeConnectionTuneOk(r) };
        case 40:
          return { classId, methodId, args: decodeConnectionOpen(r) };
        case 41:
          return { classId, methodId, args: decodeConnectionOpenOk(r) };
        case 50:
          return { classId, methodId, args: decodeConnectionClose(r) };
        case 51:
          return { classId, methodId, args: decodeConnectionCloseOk(r) };
        case 60:
          return { classId, methodId, args: decodeConnectionBlocked(r) };
        case 61:
          return { classId, methodId, args: decodeConnectionUnblocked(r) };
        case 70:
          return { classId, methodId, args: decodeConnectionUpdateSecret(r) };
        case 71:
          return { classId, methodId, args: decodeConnectionUpdateSecretOk(r) };
        default:
          throw new Error(
            "Unknown method " + methodId + " for class 'connection'",
          );
      }
    }

    case 20: {
      switch (methodId) {
        case 10:
          return { classId, methodId, args: decodeChannelOpen(r) };
        case 11:
          return { classId, methodId, args: decodeChannelOpenOk(r) };
        case 20:
          return { classId, methodId, args: decodeChannelFlow(r) };
        case 21:
          return { classId, methodId, args: decodeChannelFlowOk(r) };
        case 40:
          return { classId, methodId, args: decodeChannelClose(r) };
        case 41:
          return { classId, methodId, args: decodeChannelCloseOk(r) };
        default:
          throw new Error(
            "Unknown method " + methodId + " for class 'channel'",
          );
      }
    }

    case 30: {
      switch (methodId) {
        case 10:
          return { classId, methodId, args: decodeAccessRequest(r) };
        case 11:
          return { classId, methodId, args: decodeAccessRequestOk(r) };
        default:
          throw new Error("Unknown method " + methodId + " for class 'access'");
      }
    }

    case 40: {
      switch (methodId) {
        case 10:
          return { classId, methodId, args: decodeExchangeDeclare(r) };
        case 11:
          return { classId, methodId, args: decodeExchangeDeclareOk(r) };
        case 20:
          return { classId, methodId, args: decodeExchangeDelete(r) };
        case 21:
          return { classId, methodId, args: decodeExchangeDeleteOk(r) };
        case 30:
          return { classId, methodId, args: decodeExchangeBind(r) };
        case 31:
          return { classId, methodId, args: decodeExchangeBindOk(r) };
        case 40:
          return { classId, methodId, args: decodeExchangeUnbind(r) };
        case 51:
          return { classId, methodId, args: decodeExchangeUnbindOk(r) };
        default:
          throw new Error(
            "Unknown method " + methodId + " for class 'exchange'",
          );
      }
    }

    case 50: {
      switch (methodId) {
        case 10:
          return { classId, methodId, args: decodeQueueDeclare(r) };
        case 11:
          return { classId, methodId, args: decodeQueueDeclareOk(r) };
        case 20:
          return { classId, methodId, args: decodeQueueBind(r) };
        case 21:
          return { classId, methodId, args: decodeQueueBindOk(r) };
        case 30:
          return { classId, methodId, args: decodeQueuePurge(r) };
        case 31:
          return { classId, methodId, args: decodeQueuePurgeOk(r) };
        case 40:
          return { classId, methodId, args: decodeQueueDelete(r) };
        case 41:
          return { classId, methodId, args: decodeQueueDeleteOk(r) };
        case 50:
          return { classId, methodId, args: decodeQueueUnbind(r) };
        case 51:
          return { classId, methodId, args: decodeQueueUnbindOk(r) };
        default:
          throw new Error("Unknown method " + methodId + " for class 'queue'");
      }
    }

    case 60: {
      switch (methodId) {
        case 10:
          return { classId, methodId, args: decodeBasicQos(r) };
        case 11:
          return { classId, methodId, args: decodeBasicQosOk(r) };
        case 20:
          return { classId, methodId, args: decodeBasicConsume(r) };
        case 21:
          return { classId, methodId, args: decodeBasicConsumeOk(r) };
        case 30:
          return { classId, methodId, args: decodeBasicCancel(r) };
        case 31:
          return { classId, methodId, args: decodeBasicCancelOk(r) };
        case 40:
          return { classId, methodId, args: decodeBasicPublish(r) };
        case 50:
          return { classId, methodId, args: decodeBasicReturn(r) };
        case 60:
          return { classId, methodId, args: decodeBasicDeliver(r) };
        case 70:
          return { classId, methodId, args: decodeBasicGet(r) };
        case 71:
          return { classId, methodId, args: decodeBasicGetOk(r) };
        case 72:
          return { classId, methodId, args: decodeBasicGetEmpty(r) };
        case 80:
          return { classId, methodId, args: decodeBasicAck(r) };
        case 90:
          return { classId, methodId, args: decodeBasicReject(r) };
        case 100:
          return { classId, methodId, args: decodeBasicRecoverAsync(r) };
        case 110:
          return { classId, methodId, args: decodeBasicRecover(r) };
        case 111:
          return { classId, methodId, args: decodeBasicRecoverOk(r) };
        case 120:
          return { classId, methodId, args: decodeBasicNack(r) };
        default:
          throw new Error("Unknown method " + methodId + " for class 'basic'");
      }
    }

    case 90: {
      switch (methodId) {
        case 10:
          return { classId, methodId, args: decodeTxSelect(r) };
        case 11:
          return { classId, methodId, args: decodeTxSelectOk(r) };
        case 20:
          return { classId, methodId, args: decodeTxCommit(r) };
        case 21:
          return { classId, methodId, args: decodeTxCommitOk(r) };
        case 30:
          return { classId, methodId, args: decodeTxRollback(r) };
        case 31:
          return { classId, methodId, args: decodeTxRollbackOk(r) };
        default:
          throw new Error("Unknown method " + methodId + " for class 'tx'");
      }
    }

    case 85: {
      switch (methodId) {
        case 10:
          return { classId, methodId, args: decodeConfirmSelect(r) };
        case 11:
          return { classId, methodId, args: decodeConfirmSelectOk(r) };
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
  switch (method.classId) {
    case 10: {
      switch (method.methodId) {
        case 10:
          return encodeConnectionStart(method.args);
        case 11:
          return encodeConnectionStartOk(method.args);
        case 20:
          return encodeConnectionSecure(method.args);
        case 21:
          return encodeConnectionSecureOk(method.args);
        case 30:
          return encodeConnectionTune(method.args);
        case 31:
          return encodeConnectionTuneOk(method.args);
        case 40:
          return encodeConnectionOpen(method.args);
        case 41:
          return encodeConnectionOpenOk(method.args);
        case 50:
          return encodeConnectionClose(method.args);
        case 51:
          return encodeConnectionCloseOk(method.args);
        case 60:
          return encodeConnectionBlocked(method.args);
        case 61:
          return encodeConnectionUnblocked(method.args);
        case 70:
          return encodeConnectionUpdateSecret(method.args);
        case 71:
          return encodeConnectionUpdateSecretOk(method.args);
        default:
          throw new Error(
            "Unknown method " + method!.methodId + " for class 'connection'",
          );
      }
    }

    case 20: {
      switch (method.methodId) {
        case 10:
          return encodeChannelOpen(method.args);
        case 11:
          return encodeChannelOpenOk(method.args);
        case 20:
          return encodeChannelFlow(method.args);
        case 21:
          return encodeChannelFlowOk(method.args);
        case 40:
          return encodeChannelClose(method.args);
        case 41:
          return encodeChannelCloseOk(method.args);
        default:
          throw new Error(
            "Unknown method " + method!.methodId + " for class 'channel'",
          );
      }
    }

    case 30: {
      switch (method.methodId) {
        case 10:
          return encodeAccessRequest(method.args);
        case 11:
          return encodeAccessRequestOk(method.args);
        default:
          throw new Error(
            "Unknown method " + method!.methodId + " for class 'access'",
          );
      }
    }

    case 40: {
      switch (method.methodId) {
        case 10:
          return encodeExchangeDeclare(method.args);
        case 11:
          return encodeExchangeDeclareOk(method.args);
        case 20:
          return encodeExchangeDelete(method.args);
        case 21:
          return encodeExchangeDeleteOk(method.args);
        case 30:
          return encodeExchangeBind(method.args);
        case 31:
          return encodeExchangeBindOk(method.args);
        case 40:
          return encodeExchangeUnbind(method.args);
        case 51:
          return encodeExchangeUnbindOk(method.args);
        default:
          throw new Error(
            "Unknown method " + method!.methodId + " for class 'exchange'",
          );
      }
    }

    case 50: {
      switch (method.methodId) {
        case 10:
          return encodeQueueDeclare(method.args);
        case 11:
          return encodeQueueDeclareOk(method.args);
        case 20:
          return encodeQueueBind(method.args);
        case 21:
          return encodeQueueBindOk(method.args);
        case 30:
          return encodeQueuePurge(method.args);
        case 31:
          return encodeQueuePurgeOk(method.args);
        case 40:
          return encodeQueueDelete(method.args);
        case 41:
          return encodeQueueDeleteOk(method.args);
        case 50:
          return encodeQueueUnbind(method.args);
        case 51:
          return encodeQueueUnbindOk(method.args);
        default:
          throw new Error(
            "Unknown method " + method!.methodId + " for class 'queue'",
          );
      }
    }

    case 60: {
      switch (method.methodId) {
        case 10:
          return encodeBasicQos(method.args);
        case 11:
          return encodeBasicQosOk(method.args);
        case 20:
          return encodeBasicConsume(method.args);
        case 21:
          return encodeBasicConsumeOk(method.args);
        case 30:
          return encodeBasicCancel(method.args);
        case 31:
          return encodeBasicCancelOk(method.args);
        case 40:
          return encodeBasicPublish(method.args);
        case 50:
          return encodeBasicReturn(method.args);
        case 60:
          return encodeBasicDeliver(method.args);
        case 70:
          return encodeBasicGet(method.args);
        case 71:
          return encodeBasicGetOk(method.args);
        case 72:
          return encodeBasicGetEmpty(method.args);
        case 80:
          return encodeBasicAck(method.args);
        case 90:
          return encodeBasicReject(method.args);
        case 100:
          return encodeBasicRecoverAsync(method.args);
        case 110:
          return encodeBasicRecover(method.args);
        case 111:
          return encodeBasicRecoverOk(method.args);
        case 120:
          return encodeBasicNack(method.args);
        default:
          throw new Error(
            "Unknown method " + method!.methodId + " for class 'basic'",
          );
      }
    }

    case 90: {
      switch (method.methodId) {
        case 10:
          return encodeTxSelect(method.args);
        case 11:
          return encodeTxSelectOk(method.args);
        case 20:
          return encodeTxCommit(method.args);
        case 21:
          return encodeTxCommitOk(method.args);
        case 30:
          return encodeTxRollback(method.args);
        case 31:
          return encodeTxRollbackOk(method.args);
        default:
          throw new Error(
            "Unknown method " + method!.methodId + " for class 'tx'",
          );
      }
    }

    case 85: {
      switch (method.methodId) {
        case 10:
          return encodeConfirmSelect(method.args);
        case 11:
          return encodeConfirmSelectOk(method.args);
        default:
          throw new Error(
            "Unknown method " + method!.methodId + " for class 'confirm'",
          );
      }
    }

    default:
      throw new Error("Unknown class " + method!.classId);
  }
}

export function decodeHeader(data: Uint8Array): Header {
  const r = new Deno.Buffer(data);
  const classId = enc.decodeShortUint(r);
  switch (classId) {
    case 10:
      return decodeConnectionHeader(r);
    case 20:
      return decodeChannelHeader(r);
    case 30:
      return decodeAccessHeader(r);
    case 40:
      return decodeExchangeHeader(r);
    case 50:
      return decodeQueueHeader(r);
    case 60:
      return decodeBasicHeader(r);
    case 90:
      return decodeTxHeader(r);
    case 85:
      return decodeConfirmHeader(r);
    default:
      throw new Error("Unknown class " + classId);
  }
}

export function encodeHeader(header: Header): Uint8Array {
  switch (header.classId) {
    case 10:
      return encodeConnectionHeader(header);
    case 20:
      return encodeChannelHeader(header);
    case 30:
      return encodeAccessHeader(header);
    case 40:
      return encodeExchangeHeader(header);
    case 50:
      return encodeQueueHeader(header);
    case 60:
      return encodeBasicHeader(header);
    case 90:
      return encodeTxHeader(header);
    case 85:
      return encodeConfirmHeader(header);
    default:
      throw new Error("Unknown class " + header!.classId);
  }
}
