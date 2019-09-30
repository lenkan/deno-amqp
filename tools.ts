
const data = {
  Boolean:  "t",
  ShortShortInt:  "b",
  ShortShortUInt:  "B",
  ShortInt: "s",
  ShortUInt: "u",
  LongInt: "I",
  LongUInt: "i",
  LongLongInt: "l",
  Float: "f",
  Double: "d",
  Decimal: "D",
  ShortStr: "s",
  LongStr: "S",
  FieldArray: "A",
  Timestamp: "T",
  FieldTable: "F",
  ByteArray: "x",
  NoValue: "V"
}

const encoder = new TextEncoder();
console.log(`enum FieldType = {`)
Object.keys(data).map(key => {
  console.log(`${key} = ${encoder.encode(data[key])}, // ${data[key]}`)
})
console.log(`}`)