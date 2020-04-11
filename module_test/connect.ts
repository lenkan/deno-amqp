import { connect } from "../amqp.ts";

const conn = await connect();
await conn.close();
