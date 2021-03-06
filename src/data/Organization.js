import database from "../utils/helpers/database.js";

// Constants
import * as Messages from "../utils/constants/messages.js";

// Constructor
class Organization {
  constructor(organization) {
    this.id = organization.id;
    this.name = organization.name;
    this.description = organization.description;
    this.field = organization.field;
    this.address = organization.address;
    this.longitude = organization.longitude;
    this.latitude = organization.latitude;
  }

  static getAll(callback) {
    database.query(`SELECT * FROM organizations`, (err, res) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, res);
      }
      return;
    });
  }

  static find(id, callback) {
    database.query(`SELECT * FROM organizations WHERE id = ${id}`, (err, res) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, res[0]);
      }
      return;
    });
  }

  static create(organization, callback) {
    database.query(`INSERT INTO organizations SET ?`, organization, (err, res) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, organization);
      }
      return;
    });
  }

  static update = (id, organization, callback) => {
    database.query(
      `UPDATE organizations SET name = '${organization.name}', description = '${organization.description}', field = '${organization.field}', address = '${organization.address}', longitude = '${organization.longitude}', latitude = '${organization.latitude}' WHERE id = ${id}`,
      (err, res) => {
        if (err) {
          callback(err, null);
        } else if (res.affectedRows === 0) {
          // Organization with this id was not found
          callback({ success: false, message: Messages.GET_NOT_FOUND }, null);
        } else {
          callback(null, { id, ...organization });
        }
        return;
      }
    );
  };

  static delete = (id, callback) => {
    database.query(`DELETE FROM organizations WHERE id = ${id}`, (err, res) => {
      if (err) {
        callback(err, null);
      } else if (res.affectedRows === 0) {
        // Organization with this id was not found
        callback({ success: false, message: Messages.GET_NOT_FOUND }, null);
      } else {
        callback(null, {
          success: true,
          message: Messages.DELETE_SUCCESSFUL,
        });
      }
    });
  };
}

export const requiredKeys = ["name", "description", "field", "address"];
export const allKeys = ["name", "description", "field", "address", "longitude", "latitude"];

export const ORGANIZATIONS = [];

export default Organization;
