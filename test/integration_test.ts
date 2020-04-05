import { connect } from "../amqp.ts";
import {
  BasicPublishArgs,
  BasicProperties,
  BasicDeliver
} from "../amqp_codec.ts";
import { assertThrowsAsync, assertEquals } from "../testing.ts";
const { test } = Deno;
const encoder = new TextEncoder();
const decoder = new TextDecoder();

async function testPubSub(
  args: Omit<BasicPublishArgs, "routingKey">,
  props: BasicProperties,
  data: Uint8Array,
) {
  const publisherConn = await connect({ loglevel: "debug" });
  const subscriberConn = await connect({ loglevel: "debug" });
  const publisher = await publisherConn.openChannel();
  const subscriber = await subscriberConn.openChannel();
  console.log("Connected");

  const { queue } = await publisher.declareQueue({ autoDelete: true });

  const promise = new Promise<[BasicDeliver, BasicProperties, Uint8Array]>(
    async (resolve, reject) => {
      const { consumerTag } = await subscriber.consume(
        { queue },
        (args, props, data) => {
          subscriber.cancel({ consumerTag });
          resolve([args, props, data]);
        },
      );
    },
  );

  await publisher.publish(
    { ...args, routingKey: queue },
    props,
    data,
  );

  const result = await promise;
  console.log("Resolved promise");
  await publisher.close();
  await subscriber.close();
  console.log("Closed channels");
  await publisherConn.close();
  await publisher.ack({ deliveryTag: 231 });
  await subscriberConn.close();

  return result;
}

// test("publish subscribe test", async () => {
//   const result = await testPubSub(
//     {},
//     {},
//     encoder.encode(JSON.stringify({ foo: "bar" }))
//   );

//   assertEquals(result[0], {});
//   assertEquals(result[1], {});
// });

// test("should throw on channel error", async () => {
//   const conn1 = await connect({ loglevel: "debug" });

//   try {
//     const chan1 = await conn1.openChannel();

//     // amq.* queue names are reserved
//     await assertThrowsAsync(async () => {
//       await chan1.declareQueue({ queue: "amq.help" });
//     });
//   } finally {
//     await conn1.close();
//   }
// });

test(
  "cannot declare queue after channel after has been closed by server",
  async () => {
    const conn1 = await connect({ loglevel: "debug" });

    try {
      const chan1 = await conn1.openChannel();

      // Should cause an error due to reserved queue name
      await chan1.declareQueue({ queue: "amq.help" }).catch((_) => {});

      await assertThrowsAsync(async () => {
        await chan1.declareQueue({});
      });
    } finally {
      await conn1.close().catch((_) => {});
    }
  },
);
