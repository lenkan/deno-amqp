import {
  Spec,
  ArgumentDefinition,
  resolveArgumentType,
  flattenMethods,
  resolveType
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
      return `/** ${comment} */ ["${arg.name}"]${
        optional ? "?" : ""
      }: ${resolveArgumentType(spec, arg)}`;
    })
    .join(";")} }`;
}

function resolveValue(arg: ArgumentDefinition) {
  if (arg["default-value"] !== undefined) {
    return `args["${arg.name}"] !== undefined ? args["${
      arg.name
    }"] : ${JSON.stringify(arg["default-value"])}`;
  }
  return `args["${arg.name}"]`;
}

function generateEncodeMethod() {
  return `
import { createEncoder } from "./encoder.ts"

export type MethodArgs = {
  ${methods
    .map(method => {
      return `["${method.fullName}"]: ${resolveArgShape(method.arguments)}`;
    })
    .join(";")}
}

export type MethodPayload = ${methods
    .map(method => {
      return `{ name: "${method.fullName}", args: MethodArgs["${method.fullName}"] }`;
    })
    .join(" | ")}

export function encodeMethodPayload(payload: MethodPayload): Uint8Array {
  const { name, args } = payload;
  ${methods
    .map(method => {
      return `
        if(name === "${method.fullName}") {
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
