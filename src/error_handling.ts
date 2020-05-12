import { getMethodName } from "./amqp_codec.ts";
import { ChannelClose, ConnectionClose } from "./amqp_types.ts";

export function serializeChannelError(channel: number, args: ChannelClose) {
  const causedBy = getMethodName(args.classId, args.methodId);
  return `Channel ${channel} closed by server - ${args.replyCode} ${args
    .replyText || ""}${causedBy ? ` - caused by '${causedBy}'` : ""}`;
}

export function serializeConnectionError(args: ConnectionClose) {
  const causedBy = getMethodName(args.classId, args.methodId);
  return `Connection closed by server - ${args.replyCode} ${args
    .replyText || ""}${causedBy ? ` - caused by '${causedBy}'` : ""}`;
}
