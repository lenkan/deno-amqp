import { withTimeout, TimeoutSignal } from "./with_timeout.ts";
import {
  assertEquals,
  assertThrowsAsync,
  test,
} from "../testing.ts";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function sleeper(ms: number) {
  return () => sleep(ms);
}

test("should timeout after specified ms", async () => {
  const promise = sleep(20);
  await assertThrowsAsync(async () => {
    await withTimeout(() => promise, 10);
  }, Error, "Timeout occured after 10ms");
  await promise;
});

test("should timeout with specified error message", async () => {
  const promise = sleep(20);

  await assertThrowsAsync(async () => {
    await withTimeout(() => promise, 10, "the message");
  }, Error, "the message");

  await promise;
});

test(
  "should return value from specified function if not timedout",
  async () => {
    const promise = sleep(10);
    const getValue = async () => {
      await promise;
      return "the value";
    };

    const result = await withTimeout(getValue, 20);
    assertEquals(result, "the value");
    await promise;
  },
);

test(
  "should signal the function if the function has been timed out",
  async () => {
    let signal: TimeoutSignal = { timedOut: false };

    const sleeper = sleep(20);
    const fn = async (s: TimeoutSignal) => {
      signal = s;
      await sleeper;
    };

    const promise = withTimeout(fn, 10);
    await sleep(5);
    assertEquals(signal.timedOut, false);
    await assertThrowsAsync(async () => {
      await promise;
    });
    await sleep(5);
    assertEquals(signal.timedOut, true);
    await sleeper;
  },
);
