const uri =
  "https://raw.githubusercontent.com/rabbitmq/rabbitmq-codegen/master/amqp-rabbitmq-0.9.1.json";
fetch(uri).then(async response => {
  const data = await response.body.json();
  const encoder = new TextEncoder();
  const buffer = encoder.encode(JSON.stringify(data));
  Deno.writeFileSync("amqp-rabbitmq-0.9.1.json", buffer);
  console.log(JSON.stringify(data, null, 2));
});

function typeOf(type: string) {
  switch (type) {
    case "octet":
    case "short":
    case "shortshort":
    case "long":
    case "longlong":
    case "double":
    case "float":
    case "timestamp":
      return "number";
    case "shortstr":
    case "longstr":
      return "string";
    case "table":
      return "Object";
    case "bit":
      return "boolean";
    default:
      return "any";
  }
}

function stringifyValue({ type, value }) {
  switch (type) {
    case "shortstr":
    case "longstr":
      return value === undefined ? value : `'${value}'`;
    case "table":
      return "{}";
    default:
      return value;
  }
}

function capitalizeFirst(v: string) {
  return v.charAt(0).toUpperCase() + v.slice(1);
}

function camelCase(v: string) {
  return v.replace(/(\-\w)/g, m => m[1].toUpperCase());
}

function interfaceName(className: string, methodName: string) {
  const interfacePrefix = `Amqp${capitalizeFirst(className)}`;
  const interfaceSuffix = capitalizeFirst(methodName).replace(/(-\w)/g, m =>
    m[1].toUpperCase()
  );
  const interfaceName = `${interfacePrefix}${interfaceSuffix}`;
  return interfaceName;
}

interface AmqpSpec {
  classes: Array<any>;
  domains: Array<Array<string>>;
  constants: Array<{ name: string; value: number }>;
}

//   const spec: AmqpSpec = JSON.parse(body)
//   const methods = spec.classes.reduce((result, clazz) => {
//     return [...result, ...clazz.methods.map(m => {
//       const name = `${clazz.name}.${m.name.replace('-', '_')}`
//       const iName = interfaceName(clazz.name, m.name)
//       const args = m.arguments.map(arg => {
//         const name = camelCase(arg.name)

//         const type = arg.type || spec.domains.find(domain => domain[0] === arg.domain)[1]
//         const defaultValue = stringifyValue({ type, value: arg['default-value'] })
//         return {
//           name,
//           type,
//           defaultValue
//         }
//       })
//       return {
//         class: clazz.name,
//         name,
//         id: m.id,
//         iName,
//         args
//       }
//     })]
//   }, [])

//   const methodInterfaces = methods.map(method => {
//     const args = method.args.map(arg => {
//       return `${arg.name}${arg.defaultValue !== undefined ? '?' : ''}: ${typeOf(arg.type)}`
//     }).join(',\r\n')
//     return `
//     export interface ${method.iName} {
//       name: '${method.name}'
//       params: { ${args} }
//     }
//     export interface Encoded${method.iName} {
//       name: ${method.iName}['name']
//       decode(): ${method.iName}['params']
//     }
//     `
//   })

//   const classIdSwitch = [
//     'export function classId(name: AmqpMethodName) : number {',
//     '  switch(name.split(\'.\')[0]) {',
//     ...spec.classes.map(c => `    case '${c.name}': return ${c.id}`),
//     '    default: throw new Error(\'No such class\')',
//     '  }',
//     '}'
//   ].join('\r\n')

//   const amqpMethodType = [
//     'export type AmqpMethod =',
//     methods.map(method => `${method.iName}`).join(` |\r\n`),
//     'export type EncodedAmqpMethod =',
//     methods.map(method => `Encoded${method.iName}`).join(` |\r\n`)
//   ].join('\r\n')

//   const methodNameSwitch = [
//     'export function methodName(clazz: number, id: number) : AmqpMethodName {',
//     '  switch (clazz) {',
//     ...spec.classes.map(clazz => {
//       const clause = [
//         `    case ${clazz.id}:`,
//         `      switch(id) {`,
//         ...methods.filter(m => m.class === clazz.name).map(m => `        case ${m.id}: return '${m.name}'`),
//         '      default: throw new Error(\'No such method\')',
//         '      }'
//       ].join('\r\n')
//       return clause
//     }),
//     '    default: throw new Error(\'No such class\')',
//     '  }',
//     '}'
//   ].join('\r\n')

//   const methodIdSwitch = [
//     'export function methodId(name: AmqpMethodName) : number {',
//     '  switch(name) {',
//     ...methods.map(m => `    case '${m.name}': return ${m.id}`),
//     '    default: throw new Error(\'No such method name\')',
//     '  }',
//     '}'
//   ].join('\r\n')

//   const amqpConstants = [
//     'export enum AmqpConstant {',
//     spec.constants.map(constant => {
//       return `  ${constant.name.replace(/-/g, '_')} = ${constant.value}`
//     }).join(`,\r\n`),
//     '}'
//   ].join('\r\n')

//   const methodArguments = [
//     'export function methodArgs(name: AmqpMethodName) : Array<{ name: string, type: string, defaultValue?: any }> {',
//     '  switch(name) {',
//     ...methods.map(m => {
//       const args = m.args.map(arg => {
//         const name = camelCase(arg.name)
//         const type = arg.type
//         const defaultValue = arg.defaultValue
//         return [
//           `     {`,
//           `       name: '${name}',`,
//           `       type: '${type}',`,
//           `       defaultValue: ${defaultValue}`,
//           `     }`
//         ].join('\r\n')
//       }).join(',')
//       return [
//         `    case '${m.name}':`,
//         '    return [',
//         `      ${args}`,
//         ']'
//       ].join('\r\n')
//     }),
//     '    default: throw new Error(\'No such method name\')',
//     '  }',
//     '}'
//   ].join('\r\n')

//   const contents = [
//     ...methodInterfaces,
//     amqpConstants,
//     `export type AmqpMethodName = AmqpMethod['name']`,
//     amqpMethodType,
//     classIdSwitch,
//     methodNameSwitch,
//     methodIdSwitch,
//     methodArguments,
//     `export const spec = ${body}`,
//     `export default spec`
//   ].join('\r\n\r\n')

//   fs.writeFile('./src/amqp-spec.ts', Buffer.from(contents), {
//     encoding: 'utf8'
//   }, err => {
//     if (err) {
//       throw err
//     }
//   })
// })
