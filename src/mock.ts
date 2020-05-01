export type MockImplementation<T = any, Y extends any[] = any> = (
  ...args: Y
) => T;

export interface Mock<T = any, Y extends any[] = any> {
  calls: Y[];
  reset(): void;
  setImplementation(impl: MockImplementation<T, Y>): Mock<T, Y>;
}

export interface MockFunction<T = any, Y extends any[] = any> {
  (...args: Y): T;
  mock: Mock;
}

export function notImplemented(..._args: any): any {
  throw new Error("Not implemented");
}

export function createMock(
  impl: MockImplementation = notImplemented,
): MockFunction {
  const fn = (...args: any[]) => {
    mockCalls.push(args);
    return implementation(...args);
  };

  let implementation: MockImplementation = impl;

  const mockCalls: any[][] = [];

  function setImplementation(impl: MockImplementation) {
    implementation = impl;
    return mock;
  }

  function mockReset() {
    mockCalls.splice(0, mockCalls.length);
  }

  const mock: Mock = {
    calls: mockCalls,
    reset: mockReset,
    setImplementation,
  };

  return Object.assign(fn, { mock });
}

export interface MockFactory {
  fn(impl?: MockImplementation): MockFunction;
  obj<T>(obj: T): MockInterface<T>;
}

export type MockInterface<T> = {
  [key in keyof T]: T[key] extends (...args: any) => any
    ? (T[key] & { mock: Mock<ReturnType<T[key]>, Parameters<T[key]>> })
    : T[key];
};

export const mock: MockFactory = {
  fn: createMock,
  obj<T>(obj: MockInterface<T>) {
    return obj;
  },
};
