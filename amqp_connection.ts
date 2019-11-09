import {
  CONNECTION,
  CONNECTION_START,
  CONNECTION_START_OK,
  CONNECTION_TUNE,
  CONNECTION_TUNE_OK,
  CONNECTION_OPEN,
  CONNECTION_OPEN_OK,
  CONNECTION_CLOSE,
  CONNECTION_CLOSE_OK,
  CONNECTION_FORCED
} from "./framing/constants.ts";
import {
  MethodPayload as IncomingMethodPayload,
  ConnectionStartArgs,
  ConnectionTuneArgs,
  ConnectionOpenOkArgs,
  ConnectionCloseArgs,
  ConnectionCloseOkArgs
} from "./framing/method_decoder.ts";
import { MethodPayload as OutgoingMethodPayload } from "./framing/method_encoder.ts";
import {
  IncomingFrame,
  Next,
  FrameContext,
  OutgoingFrame,
  AmqpSocket
} from "./framing/socket.ts";

const NULL_CHAR = String.fromCharCode(0);

export interface ConnectionOptions {
  user: string;
  password: string;
}

export interface ConnectionState {
  open: boolean;
  closing: boolean;
}

export function createConnection(
  options: ConnectionOptions,
  socket: AmqpSocket
) {
  const state: ConnectionState = {
    open: false,
    closing: false
  };

  function emit(m: OutgoingMethodPayload) {
    return socket.write({ channel: 0, type: "method", ...m });
  }

  function handleStart(args: ConnectionStartArgs) {
    return emit({
      methodId: CONNECTION_START_OK,
      classId: CONNECTION,
      args: {
        clientProperties: {},
        locale: args.locales.split(" ")[0],
        mechanism: args.mechanisms.split(" ")[0],
        response: `${NULL_CHAR}${options.user}${NULL_CHAR}${options.password}`
      }
    });
  }

  async function handleTune(args: ConnectionTuneArgs) {
    await emit({
      classId: CONNECTION,
      methodId: CONNECTION_TUNE_OK,
      args: {
        channelMax: args.channelMax,
        frameMax: args.frameMax,
        heartbeat: 0 //method.args.heartbeat
      }
    });

    await emit({
      classId: CONNECTION,
      methodId: CONNECTION_OPEN,
      args: {}
    });
  }

  async function handleOpenOk(args: ConnectionOpenOkArgs) {
    console.log("Connection opened");
    state.open = true;
  }

  async function handleClose(args: ConnectionCloseArgs) {
    console.log("Received close", args);
    state.open = false;
    await emit({
      classId: CONNECTION,
      methodId: CONNECTION_CLOSE_OK,
      args: {}
    });
  }

  async function handleCloseOk(args: ConnectionCloseOkArgs) {
    console.log("Received close", args);
    state.open = false;
    state.closing = false;
  }

  async function init() {
    await socket.start();
    await socket.receive(0, {
      classId: CONNECTION,
      methodId: CONNECTION_OPEN_OK
    });
  }

  async function close() {
    await socket.send(0, {
      methodId: CONNECTION_CLOSE,
      classId: CONNECTION,
      args: {
        classId: CONNECTION,
        methodId: CONNECTION_CLOSE,
        replyCode: CONNECTION_FORCED,
        replyText: `Connection closed by client`
      }
    });

    await socket.receive(0, {
      classId: CONNECTION,
      methodId: CONNECTION_CLOSE_OK
    });
  }

  async function middleware(context: FrameContext, next: Next) {
    const { frame: method } = context;
    if (
      state.closing &&
      !(
        method.type === "method" &&
        method.classId === CONNECTION &&
        method.methodId === CONNECTION_CLOSE_OK
      )
    ) {
      return;
    }

    if (method.type !== "method" || method.classId !== CONNECTION) {
      return next();
    }

    switch (method.methodId) {
      case CONNECTION_START:
        await handleStart(method.args);
        break;
      case CONNECTION_TUNE:
        await handleTune(method.args);
        break;
      case CONNECTION_OPEN_OK:
        await handleOpenOk(method.args);
        break;
      case CONNECTION_CLOSE:
        await handleClose(method.args);
        break;
      case CONNECTION_CLOSE_OK:
        await handleCloseOk(method.args);
        break;
    }

    return next();
  }

  socket.use(middleware);
  return { init, close }
}
