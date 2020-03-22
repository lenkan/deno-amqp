import { withTimeout, TimeoutSignal } from "./with_timeout.ts";
import {
  assertEquals,
  assertThrowsAsync,
  test
} from "../testing.ts";

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function sleeper(ms: number) {
  return () => sleep(ms);
}

test("should timeout after specified ms", async () => {
  const fn = async () => {
    await withTimeout(sleeper(20), 10);
  };
  await assertThrowsAsync(fn, Error, "Timeout occured after 10ms");
});

test("should timeout with specified error message", async () => {
  const fn = async () => {
    await withTimeout(sleeper(20), 10, "the message");
  };
  await assertThrowsAsync(fn, Error, "the message");
});

test(
  "should return value from specified function if not timedout",
  async () => {
    const getValue = async () => {
      await sleep(10);
      return "the value";
    };

    const result = await withTimeout(getValue, 20);
    assertEquals(result, "the value");
  }
);

test(
  "should signal the function if the function has been timed out",
  async () => {
    let signal: TimeoutSignal = { timedOut: false };
    const fn = async (s: TimeoutSignal) => {
      signal = s;
      await sleep(20);
    };

    const promise = withTimeout(fn, 10);
    await sleep(5);
    assertEquals(signal.timedOut, false);
    await assertThrowsAsync(async () => {
      await promise;
    });
    await sleep(5);
    assertEquals(signal.timedOut, true);
  }
);
