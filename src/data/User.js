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
    this.role = user.role;
  }

  static getAll(callback) {
    database.query(`SELECT id, email, name, surname, role FROM users`, (err, res) => {
      if (err) {
        callback(err, null);
      } else {
        console.log(res);
        callback(null, res);
      }
      return;
    });
  }

  static find(id, callback) {
    database.query(
      `SELECT id, email, name, surname, role FROM users WHERE id = ${id}`,
      (err, res) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, res[0]);
        }
        return;
      }
    );
  }
}

export const requiredKeys = ["email", "password", "name", "surname", "role"];
export const allKeys = ["email", "password", "name", "surname", "role"];

export default User;
