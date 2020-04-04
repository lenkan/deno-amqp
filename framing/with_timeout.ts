export interface TimeoutSignal {
  readonly timedOut: boolean;
}

export function withTimeout<T>(
  action: (signal: TimeoutSignal) => Promise<T>,
  ms: number,
  message?: string,
) {
  if (ms <= 0) {
    return action({ timedOut: false });
  }

  return new Promise<T>(async (resolve, reject) => {
    const signal = {
      timedOut: false,
    };

    const timer = setTimeout(() => {
      signal.timedOut = true;
      reject(new Error(message || `Timeout occured after ${ms}ms`));
    }, ms);

    action(signal).then((result) => {
      clearTimeout(timer);
      resolve(result);
    }).catch((error) => {
      clearTimeout(timer);
      reject(error);
    });
  });
}
