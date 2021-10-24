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

// Open the MySQL connection
// connection.connect((error) => {
//   if (error) throw error;
//   console.log("Successfully connected to the database.");
// });

export default connection;
