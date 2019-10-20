import {
  Spec,
  ArgumentDefinition,
  flattenMethods,
  resolveArgumentType,
  resolveType,
  pascalCase
} from "./utils.ts";

const { args, readFileSync, writeFileSync } = Deno;
const decoder = new TextDecoder("utf-8");
const spec = JSON.parse(decoder.decode(readFileSync(args[1]))) as Spec;

const methods = flattenMethods(spec);

function resolveArgShape(args: ArgumentDefinition[]) {
  return `{ ${args
    .map(arg => {
      return `${arg.name}: ${resolveArgumentType(spec, arg)}`;
    })
    .join(";")} }`;
}

function generateDecodeMethod() {
  return `
import { createDecoder } from "./decoder.ts"

${methods
  .map(method => {
    return `export interface ${pascalCase(
      method.fullName
    )}Args ${resolveArgShape(method.arguments)}`;
  })
  .join("\n")}

export type MethodPayload = ${methods
    .map(method => {
      return `{ 
        className: "${method.className}", 
        methodName: "${method.methodName}", 
        classId: ${method.classId},
        methodId: ${method.id},
        name: "${method.fullName}", 
        args: ${pascalCase(method.fullName)}Args
      }`;
    })
    .join(" | ")}

export function decodeMethodPayload(classId: number, methodId: number, data: Uint8Array): MethodPayload {
  ${methods
    .map(method => {
      return `
        if(classId === ${method.classId} && methodId === ${method.id}) {
          const decoder = createDecoder(data);
          return {
            className: "${method.className}",
            methodName: "${method.methodName}",
            methodId: ${method.id},
            classId: ${method.classId},
            name: "${method.fullName}",
            args: {
              ${method.arguments.map(argument => {
                const name = `["${argument.name}"]`;
                const type = resolveType(spec, argument);
                switch (type) {
                  case "table":
                    return `${name}: decoder.decodeTable()`;
                  case "longstr":
                    return `${name}: decoder.decodeLongString()`;
                  case "shortstr":
                    return `${name}: decoder.decodeShortString()`;
                  case "octet":
                    return `${name}: decoder.decodeOctet()`;
                  case "short":
                    return `${name}: decoder.decodeShortUint()`;
                  case "long":
                    return `${name}: decoder.decodeLongUint()`;
                  case "bit":
                    return `${name}: decoder.decodeBit()`;
                  case "longlong":
                    return `${name}: decoder.decodeLongLongUint()`;
                  default:
                    throw new Error(`Cannot decode ${type}`);
                }
              })}
            }
          }
        }
        `;
    })
    .join("")}
      throw new Error("No match for class: " + classId + " and method: " + methodId);
    }
    `;
}

const encoder = new TextEncoder();
const result = encoder.encode(generateDecodeMethod());
writeFileSync("framing/method_decoder.ts", result);
