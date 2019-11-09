import {
  Spec,
  ArgumentDefinition,
  resolveArgumentType,
  flattenMethods,
  resolveType,
  pascalCase
} from "./utils.ts";

const { args, readFileSync, writeFileSync } = Deno;
const decoder = new TextDecoder("utf-8");
const spec = JSON.parse(decoder.decode(readFileSync(args[1]))) as Spec;

const methods = flattenMethods(spec);

function resolveArgShape(
  args: ArgumentDefinition[],
  readOnly: boolean = false
) {
  return `{ ${args
    .map(arg => {
      const comment =
        arg["default-value"] !== undefined
          ? `default: ${JSON.stringify(arg["default-value"])}`
          : "";
      const optional = !readOnly && arg["default-value"] !== undefined;
      return `/** ${comment} */ ${arg.name}${
        optional ? "?" : ""
      }: ${resolveArgumentType(spec, arg)}`;
    })
    .join(";")} }`;
}

function resolveValue(arg: ArgumentDefinition) {
  if (arg["default-value"] !== undefined) {
    return `payload.args.${arg.name} !== undefined ? payload.args.${
      arg.name
    } : ${JSON.stringify(arg["default-value"])}`;
  }
  return `payload.args.${arg.name}`;
}

function generateEncodeMethod() {
  return `
import { createEncoder } from "./encoder.ts"

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
        classId: ${method.classId},
        methodId: ${method.id},
        args: ${pascalCase(method.fullName)}Args
      }`;
    })
    .join(" | ")}

export function encodeMethodPayload(payload: MethodPayload): Uint8Array {
  ${methods
    .map(method => {
      return `
        if(payload.classId === ${method.classId} && payload.methodId === ${method.id}) {
          const encoder = createEncoder();
          encoder.encodeShortUint(${method.classId});
          encoder.encodeShortUint(${method.id});
          ${method.arguments
            .map(argument => {
              const value = resolveValue(argument);
              const type = resolveType(spec, argument);
              switch (type) {
                case "table":
                  return `encoder.encodeTable(${value})`;
                case "longstr":
                  return `encoder.encodeLongString(${value})`;
                case "shortstr":
                  return `encoder.encodeShortString(${value})`;
                case "octet":
                  return `encoder.encodeOctet(${value})`;
                case "short":
                  return `encoder.encodeShortUint(${value})`;
                case "long":
                  return `encoder.encodeLongUint(${value})`;
                case "bit":
                  return `encoder.encodeBit(${value})`;
                case "longlong":
                  return `encoder.encodeLongLongUint(${value})`;
                default:
                  throw new Error(`Cannot encode ${type}`);
              }
            })
            .join("\n")}
          return encoder.bytes();
        }
        `;
    })
    .join("")}
    }
    `;
}

const encoder = new TextEncoder();
const result = encoder.encode(generateEncodeMethod());

writeFileSync("framing/method_encoder.ts", result);
