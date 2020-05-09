import { encodeMethod, encodeHeader } from "../src/amqp_codec.ts";
import { BASIC_PUBLISH } from "../src/amqp_constants.ts";
import { BASIC } from "../src/amqp_constants.ts";
import { benchmark } from "./benchmark.ts";

function randomString() {
  return Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
}

const randomStrings = Array.from({ length: 10 }).map(randomString);

await benchmark("encode_publish_method", () => {
  for (let i = 0; i < 10000; ++i) {
    encodeMethod({
      classId: BASIC,
      methodId: BASIC_PUBLISH,
      args: {
        exchange: randomStrings[i],
        immediate: false,
        mandatory: false,
        routingKey: randomStrings[i],
        ticket: 0,
      },
    });
  }
});

await benchmark("encode_basic_properties", () => {
  for (let i = 0; i < 10000; ++i) {
    encodeHeader({
      classId: BASIC,
      size: 123,
      props: {
        appId: randomStrings[i],
        clusterId: randomStrings[i],
        contentEncoding: "gzip",
        contentType: "application/json",
        correlationId: randomStrings[i],
        deliveryMode: 1,
        expiration: "123",
        headers: {
          "foo": "bar",
        },
        messageId: "123",
        priority: 1,
        replyTo: randomStrings[i],
        timestamp: 123,
        type: "123",
        userId: "123",
      },
    });
  }
});
