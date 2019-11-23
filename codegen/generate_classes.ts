import { Spec, flattenMethods, pascalCase, camelCase } from "./utils.ts";

const { args, readFileSync, writeFileSync } = Deno;
const decoder = new TextDecoder("utf-8");
const className = args[2];
const spec = JSON.parse(decoder.decode(readFileSync(args[1]))) as Spec;

function generateClass() {
  return `
import * as incoming from "./framing/method_encoder.ts";
import * as outgoing from "./framing/method_decoder.ts";
import { AmqpSocket } from "./framing/socket.ts";

${spec.classes.map(clazz => {
  const className = clazz.name;
  const methods = flattenMethods(spec).filter(m => m.className === className)
  return `
export interface ${pascalCase(className)}Methods {
    ${methods.filter(m => m.synchronous)
      .map(method => {
          const argType = `incoming.${pascalCase(method.fullName)}Args`;
          const returnType = `outgoing.${pascalCase(method.fullName)}OkArgs`;
          return `${camelCase(method.methodName)}(args: ${argType}): Promise<${returnType}>`
      }).join("\n")
    }
}

export function init${pascalCase(
    className
  )}(channel: number, socket: AmqpSocket): ${pascalCase(className)}Methods {
  return { 
    ${methods.filter(m => m.synchronous)
      .map(method => {
          const argType = `incoming.${pascalCase(method.fullName)}Args`;
          return `
        async ${camelCase(
          method.methodName
        )}(args: ${argType}) {
          await socket.send(channel, {
            classId: ${method.classId},
            methodId: ${method.id},
            args
          })

          return socket.receive(channel, {
            classId: ${method.classId},
            methodId: ${method.id + 1}
          })
        },`;
      })
      .join("")}
  }
}
`.trimStart();
}).join("")}
`;
}

const encoder = new TextEncoder();
const result = encoder.encode(generateClass());

writeFileSync(`amqp_methods.ts`, result);
