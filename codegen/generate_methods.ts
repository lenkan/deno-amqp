import { Spec, flattenMethods, pascalCase, camelCase } from "./utils.ts";

const { args, readFileSync, writeFileSync } = Deno;
const decoder = new TextDecoder("utf-8");
const spec = JSON.parse(decoder.decode(readFileSync(args[1]))) as Spec;

function generateClass() {
  return `
import * as incoming from "./method_encoder.ts";
import * as outgoing from "./method_decoder.ts";

interface Send {
  (channel: number, method: { classId: number, methodId: number, args: any }): Promise<void>
}

interface Receive {
  (channel: number, method: { classId: number, methodId: number }): Promise<any>
}

${spec.classes
  .map(clazz => {
    const className = clazz.name;
    const methods = flattenMethods(spec).filter(m => m.className === className);
    return `
export interface ${pascalCase(className)}Methods {
    ${methods
      .filter(m => m.synchronous)
      .map(method => {
        const argType = `incoming.${pascalCase(method.fullName)}Args`;
        const returnType = `outgoing.${pascalCase(method.fullName)}OkArgs`;
        return `${camelCase(
          method.methodName
        )}(channel: number, args: ${argType}): Promise<${returnType}>`;
      })
      .join("\n")}
    ${methods
      .filter(m => !m.synchronous)
      .map(method => {
        const argType = `incoming.${pascalCase(method.fullName)}Args`;
        return `${camelCase(
          method.methodName
        )}(channel: number, args: ${argType}): Promise<void>`;
      })
      .join("\n")}
}

export function init${pascalCase(className)}(send: Send, receive: Receive): ${pascalCase(
      className
    )}Methods {
  return { 
    ${methods
      .filter(m => m.synchronous)
      .map(method => {
        const argType = `incoming.${pascalCase(method.fullName)}Args`;
        return `
        async ${camelCase(
          method.methodName
        )}(channel: number, args: ${argType}) {
          await send(channel, {
            classId: ${method.classId},
            methodId: ${method.id},
            args
          })

          return receive(channel, {
            classId: ${method.classId},
            methodId: ${method.id + 1}
          })
        },`;
      })
      .join("")}
    ${methods
      .filter(m => !m.synchronous)
      .map(method => {
        const argType = `incoming.${pascalCase(method.fullName)}Args`;
        return `
        async ${camelCase(
          method.methodName
        )}(channel: number, args: ${argType}) {
          await send(channel, {
            classId: ${method.classId},
            methodId: ${method.id},
            args
          })
        },`;
      })
      .join("")}
  }
}
`.trimStart();
  })
  .join("")}

export interface AmqpMethods {
  ${spec.classes.map(clazz => {
    return `${camelCase(clazz.name)}: ${pascalCase(clazz.name)}Methods`
  }).join("\n")}
}

export function initializeMethods(send: Send, receive: Receive): AmqpMethods {
  return { 
    ${spec.classes
    .map(clazz => {
      return `${camelCase(clazz.name)}: init${pascalCase(clazz.name)}(send, receive)`;
    })
    .join(", ")} 
  }
}
`;
}

const encoder = new TextEncoder();
const result = encoder.encode(generateClass());

writeFileSync(`./framing/methods.ts`, result);
