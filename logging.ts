export interface LoggerOptions {}

export interface Logger {
  debug(message: string): void;
}

export function createLogger(options: LoggerOptions) {
  function debug(...args: unknown[]) {
    console.debug(...args);
  }

  return { debug };
}
