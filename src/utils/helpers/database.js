import mysql from "mysql";
import { config } from "dotenv";

config();

// Constants
import { DATABASE_CONFIG } from "../constants/database.js";

// Create a connection to the database
const connection = mysql.createPool(process.env.CLEARDB_DATABASE_URL);

export default connection;
