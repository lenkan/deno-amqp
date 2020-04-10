export interface Resolvable<T> {
  resolve: (value: T) => PromiseLike<T>;
  reject: (reason: Error) => void;
}

export interface ResolvablePromise<T> extends PromiseLike<T>, Resolvable<T> {}

export function createResolvable<T>(): ResolvablePromise<T> {
  let resolveFun: (value?: T | PromiseLike<T> | Promise<T>) => void;
  let rejectFun: (reason?: any) => void;

  const promise = new Promise<T>((resolve, reject): void => {
    resolveFun = resolve;
    rejectFun = reject;
  });

  promise.catch(() => {});

  return {
    then: promise.then.bind(promise),
    resolve(value: T) {
      resolveFun(value);
      return promise;
    },
    reject(reason: any) {
      rejectFun(reason);
    },
  };
}
