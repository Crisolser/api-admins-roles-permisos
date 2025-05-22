import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

let {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME
} = process.env

export const pool = new Pool({
  host: DB_HOST,
  port: parseInt(DB_PORT || "5432", 10),
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASSWORD,
});