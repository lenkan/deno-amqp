import {
  parseOptions,
  AmqpConnectParameters,
  AmqpConnectOptions,
} from "./amqp_connect_options.ts";
import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@v0.57.0/testing/asserts.ts";

function testUrl(
  url: string,
  expected: AmqpConnectParameters,
): [string, () => void] {
  return [
    `parse ${url}`,
    () => {
      assertEquals(parseOptions(url), expected);
    },
  ];
}

function testOpts(
  opts: AmqpConnectOptions | undefined,
  expected: AmqpConnectParameters,
): [string, () => void] {
  return [
    `parse ${JSON.stringify(opts)}`,
    () => {
      assertEquals(parseOptions(opts), expected);
    },
  ];
}

function testUrlError(
  url: string,
  message?: string,
): [string, () => void] {
  return [
    `parse ${url} - throws ${message}`,
    () => {
      assertThrows(() => parseOptions(url), undefined, message);
    },
  ];
}

const defaultParams: AmqpConnectParameters = {
  hostname: "localhost",
  port: 5672,
  username: "guest",
  password: "guest",
  heartbeatInterval: undefined,
  loglevel: "none",
  frameMax: undefined,
  vhost: "/",
};

Deno.test(...testUrl("amqp://user:pass@localhost:5672", {
  ...defaultParams,
  username: "user",
  password: "pass",
}));

Deno.test(...testUrl("amqp://localhost", {
  ...defaultParams,
}));

Deno.test(...testUrl("amqp://somehost.com:123", {
  ...defaultParams,
  hostname: "somehost.com",
  port: 123,
}));

Deno.test(...testUrl("amqp://user:pass@somehost.com:123", {
  ...defaultParams,
  hostname: "somehost.com",
  port: 123,
  username: "user",
  password: "pass",
}));

Deno.test(...testUrl("amqp://localhost/somevhost", {
  ...defaultParams,
  vhost: "/somevhost",
}));

Deno.test(...testUrl("amqp://localhost:123/somevhost", {
  ...defaultParams,
  vhost: "/somevhost",
  port: 123,
}));

Deno.test(
  ...testUrlError("amqps://localhost:123/somevhost", "Unsupported protocol"),
);

Deno.test(...testUrl("amqp://localhost?heartbeat=10", {
  ...defaultParams,
  heartbeatInterval: 10,
}));

Deno.test(
  ...testUrlError(
    "amqp://localhost?heartbeat=abc",
    "Invalid heartbeat parameter abc",
  ),
);

Deno.test(...testUrl("amqp://localhost?frame_max=10", {
  ...defaultParams,
  frameMax: 10,
}));

Deno.test(
  ...testUrlError(
    "amqp://localhost?frame_max=abc",
    "Invalid frame_max parameter abc",
  ),
);

Deno.test(...testOpts(undefined, {
  ...defaultParams,
}));

Deno.test(...testOpts({}, {
  ...defaultParams,
}));

Deno.test(...testOpts({ hostname: "somehost.com" }, {
  ...defaultParams,
  hostname: "somehost.com",
}));

Deno.test(...testOpts({ port: 123 }, {
  ...defaultParams,
  port: 123,
}));
