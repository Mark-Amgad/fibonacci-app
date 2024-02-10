import { Pool } from "pg";
import config from "../config/config";

const connection = new Pool({
  host: config.pgHost,
  user: config.pgUser,
  database: config.pgDatabase,
  password: config.pgPassword || "messi99",
});

export default connection;
