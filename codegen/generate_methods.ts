import {
  Spec,
  flattenMethods,
  pascalCase,
  camelCase,
  resolveAmqpType
} from "./utils.ts";

const { args, readFileSync, writeFileSync } = Deno;
const decoder = new TextDecoder("utf-8");
const spec = JSON.parse(decoder.decode(readFileSync(args[1]))) as Spec;

function generateClass() {
  return `
import * as incoming from "./method_encoder.ts";
import * as outgoing from "./method_decoder.ts";

interface Send {
  (frame: any): Promise<void>
}

interface Receive {
  (frame: { type: number, channel: number, classId: number, methodId: number }): Promise<any>
}

${spec.classes
  .map(clazz => {
    const className = clazz.name;
    const methods = flattenMethods(spec).filter(m => m.className === className);
    return `
export interface ${pascalCase(className)}Properties {
  ${(clazz.properties || [])
    .map(prop => {
      return `["${prop.name}"]?: ${resolveAmqpType(prop.type)}`;
    })
    .join("\n")}
}

export interface ${pascalCase(className)}Methods {
    ${methods
      .filter(m => m.synchronous && !m.content)
      .map(method => {
        const argType = `incoming.${pascalCase(method.fullName)}Args`;
        const returnType = `outgoing.${pascalCase(method.fullName)}OkArgs`;
        return `${camelCase(
          method.methodName
        )}(channel: number, args: ${argType}): Promise<${returnType}>`;
      })
      .join("\n")}
    ${methods
      .filter(m => !m.synchronous && m.content)
      .map(method => {
        const argType = `incoming.${pascalCase(method.fullName)}Args`;
        const propertyType = `${pascalCase(className)}Properties`;
        return `${camelCase(
          method.methodName
        )}(channel: number, args: ${argType}, props: ${propertyType}, content: Uint8Array): Promise<void>`;
      })
      .join("\n")}
    ${methods
      .filter(m => !m.synchronous && !m.content)
      .map(method => {
        const argType = `incoming.${pascalCase(method.fullName)}Args`;
        return `${camelCase(
          method.methodName
        )}(channel: number, args: ${argType}): Promise<void>`;
      })
      .join("\n")}
}

export function init${pascalCase(
      className
    )}(send: Send, receive: Receive): ${pascalCase(className)}Methods {
  return { 
    ${methods
      .filter(m => m.synchronous && !m.content)
      .map(method => {
        const argType = `incoming.${pascalCase(method.fullName)}Args`;
        return `
        async ${camelCase(
          method.methodName
        )}(channel: number, args: ${argType}) {
          await send({
            channel,
            type: 1,
            classId: ${method.classId},
            methodId: ${method.id},
            args
          })

          return receive({
            type: 1,
            channel,
            classId: ${method.classId},
            methodId: ${method.id + 1}
          })
        },`;
      })
      .join("")}
    ${methods
      .filter(m => !m.synchronous && m.content)
      .map(method => {
        const argType = `incoming.${pascalCase(method.fullName)}Args`;
        const propertyType = `${pascalCase(className)}Properties`;
        return `
        async ${camelCase(
          method.methodName
        )}(channel: number, args: ${argType}, props: ${propertyType}, content: Uint8Array) {
          await send({
            type: 1,
            channel,
            classId: ${method.classId},
            methodId: ${method.id},
            args
          })

          await send({
            type: 2,
            channel,
            class: ${method.classId},
            weight: 0,
            flags: [
              ${(clazz.properties || []).map(prop => {
                return `props["${prop.name}"] !== undefined`
              }).join(",\n")}
            ],
            size: content.length,
            properties: props
          })


          if(content.length > 0) {
            await send({
              type: 3,
              channel,
              payload: content
            })
          }
        },`;
      })
      .join("")}
    ${methods
      .filter(m => !m.synchronous && !m.content)
      .map(method => {
        const argType = `incoming.${pascalCase(method.fullName)}Args`;
        return `
        async ${camelCase(
          method.methodName
        )}(channel: number, args: ${argType}) {
          await send({
            type: 1,
            channel,
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
  ${spec.classes
    .map(clazz => {
      return `${camelCase(clazz.name)}: ${pascalCase(clazz.name)}Methods`;
    })
    .join("\n")}
}

export function initializeMethods(send: Send, receive: Receive): AmqpMethods {
  return { 
    ${spec.classes
      .map(clazz => {
        return `${camelCase(clazz.name)}: init${pascalCase(
          clazz.name
        )}(send, receive)`;
      })
      .join(", ")} 
  }
}
`;
}

const encoder = new TextEncoder();
const result = encoder.encode(generateClass());

writeFileSync(`./framing/methods.ts`, result);
