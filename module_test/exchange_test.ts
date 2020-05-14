import {
  assertEquals,
  assertThrowsAsync,
  assertStrContains,
  assertNotEquals,
} from "https://deno.land/std@v0.51.0/testing/asserts.ts";
import {
  getExchange,
  randomString,
  withConnection,
  getExchangeBindings,
} from "./api.ts";

Deno.test(
  "declare exchange",
  withConnection(async (conn) => {
    const channel = await conn.openChannel();
    const exName = `exchange.${randomString(10)}`;
    await channel.declareExchange({ exchange: exName });

    const exchange = await getExchange(exName);

    assertEquals(exchange?.name, exName);
  }),
);

Deno.test(
  "declare exchange with reserved prefix",
  withConnection(async (conn) => {
    const channel = await conn.openChannel();
    const name = `amq.${randomString(10)}`;

    const error = await assertThrowsAsync(
      async () => {
        await channel.declareExchange({ exchange: name });
      },
      Error,
    );

    assertStrContains(error.message, "Channel 1 closed by server");
    assertStrContains(error.message, "403 ACCESS_REFUSED");
    assertStrContains(
      error.message,
      `exchange name '${name}' contains reserved prefix`,
    );

    const exchange = await getExchange(name);

    assertEquals(exchange, null);
  }),
);

Deno.test(
  "delcare exchange with empty name",
  withConnection(async (conn) => {
    const channel = await conn.openChannel();
    const name = `amq.${randomString(10)}`;

    const error = await assertThrowsAsync(
      async () => {
        await channel.declareExchange({ exchange: name });
      },
      Error,
    );

    assertStrContains(error.message, "Channel 1 closed by server");
    assertStrContains(error.message, "403 ACCESS_REFUSED");
    assertStrContains(
      error.message,
      `exchange name '${name}' contains reserved prefix`,
    );

    const exchange = await getExchange(name);

    assertEquals(exchange, null);
  }),
);

Deno.test(
  "declare and delete exchange",
  withConnection(async (conn1) => {
    const channel = await conn1.openChannel();
    const exName = `exchange.${randomString(10)}`;

    await channel.declareExchange({ exchange: exName });
    await channel.deleteExchange({ exchange: exName });

    const exchange = await getExchange(exName);

    assertEquals(exchange, null);
  }),
);

Deno.test(
  "bind exchange without declare",
  withConnection(async (conn) => {
    const channel = await conn.openChannel();
    const source = `exchange.source.${randomString(10)}`;
    const destination = `exchange.destination.${randomString(10)}`;

    await assertThrowsAsync(
      async () => {
        await channel.bindExchange({ source, destination });
      },
      Error,
      `Channel 1 closed by server - 404 NOT_FOUND - no exchange '${source}' in vhost '/' - caused by 'exchange.bind'`,
    );
  }),
);

Deno.test(
  "bind after declare only source",
  withConnection(async (conn) => {
    const channel = await conn.openChannel();
    const source = `exchange.source.${randomString(10)}`;
    const destination = `exchange.destination.${randomString(10)}`;

    await channel.declareExchange({ exchange: source });
    await assertThrowsAsync(
      async () => {
        await channel.bindExchange({ source, destination });
      },
      Error,
      `Channel 1 closed by server - 404 NOT_FOUND - no exchange '${destination}' in vhost '/' - caused by 'exchange.bind'`,
    );
  }),
);

Deno.test(
  "bind after declare source and destination",
  withConnection(async (conn) => {
    const channel = await conn.openChannel();
    const source = `exchange.source.${randomString(10)}`;
    const destination = `exchange.destination.${randomString(10)}`;

    await channel.declareExchange({ exchange: source });
    await channel.declareExchange({ exchange: destination });
    await channel.bindExchange({ source, destination });

    await getExchangeBindings(source).then((bindings) => {
      const binding = bindings.find((b: any) => b.destination === destination);
      assertNotEquals(binding, undefined);
    });

    await channel.unbindExchange({ source, destination });
    await getExchangeBindings(source).then((bindings) => {
      const binding = bindings.find((b: any) => b.destination === destination);
      assertEquals(binding, undefined);
    });
  }),
);
