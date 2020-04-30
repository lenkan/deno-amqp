import { encodeMethod } from "../src/amqp_codec.ts";
import { BASIC_PUBLISH } from "../src/amqp_constants.ts";
import { BASIC } from "../src/amqp_constants.ts";

function randomString() {
  return Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
}

const COUNT = parseInt(Deno.args[0] || "10000");
const randomStrings = Array.from({ length: COUNT }).map(randomString);

for (let i = 0; i < COUNT; ++i) {
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
