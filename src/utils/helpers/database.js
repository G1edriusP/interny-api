import mysql from "mysql";

// Constants
import { DATABASE_CONFIG } from "../constants/database.js";

// Create a connection to the database
const connection = mysql.createPool({
  host: DATABASE_CONFIG.host,
  user: DATABASE_CONFIG.user,
  password: DATABASE_CONFIG.password,
  database: DATABASE_CONFIG.database,
});

export default connection;
