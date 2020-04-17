type FrameErrorCode = "EOF" | "BAD_FRAME";

function format(code: FrameErrorCode, msg?: string) {
  if (!msg) {
    return code;
  }
  return `${code} - ${msg}`;
}

export class FrameError extends Error {
  constructor(public code: FrameErrorCode, msg?: string) {
    super(format(code, msg));
  }
}
