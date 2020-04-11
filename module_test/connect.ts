import { connect } from "../mod.ts";

const conn = await connect();
await conn.close();
