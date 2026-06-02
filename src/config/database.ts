import knex from "knex";
import { createKnexConfig } from "./knex-config";

const connection = knex(createKnexConfig());

export default connection;
