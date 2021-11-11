import database from "../utils/helpers/database.js";

// Constants
import { DATABASE_NAME } from "../utils/constants/database.js";
import * as Messages from "../utils/constants/messages.js";

// Constructor
class User {
  constructor(user) {
    this.id = user.id;
    this.email = user.email;
    this.password = user.password;
    this.name = user.name;
    this.surname = user.surname;
  }

  static getAll(callback) {
    database.query(`SELECT * FROM ${DATABASE_NAME}.users`, (err, res) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, res);
      }
      return;
    });
  }
}

export const requiredKeys = ["email", "password", "name", "surname"];
export const allKeys = ["email", "password", "name", "surname"];

export default User;
