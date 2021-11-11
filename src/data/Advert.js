import database from "../utils/helpers/database.js";

// Constants
import { DATABASE_NAME } from "../utils/constants/database.js";
import * as Messages from "../utils/constants/messages.js";

class Advert {
  constructor(advert) {
    this.id = advert.id;
    this.title = advert.title;
    this.description = advert.description;
    this.years = advert.years;
    this.months = advert.months;
    this.webUrl = advert.webUrl;
    this.organizationId = advert.organizationId;
  }

  static getAll(callback) {
    database.query(`SELECT * FROM adverts`, (err, res) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, res);
      }
      return;
    });
  }

  static getAllFromOrganization(id, callback) {
    database.query(`SELECT * FROM adverts WHERE organizationId = ${id}`, (err, res) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, res);
      }
      return;
    });
  }

  static find(id, callback) {
    database.query(`SELECT * FROM adverts WHERE id = ${id}`, (err, res) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, res[0]);
      }
      return;
    });
  }

  static create(advert, callback) {
    database.query(`INSERT INTO adverts SET ?`, advert, (err, res) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, advert);
      }
      return;
    });
  }

  static update = (id, advert, callback) => {
    database.query(
      `UPDATE adverts SET title = '${advert.title}', description = '${advert.description}', years = '${advert.years}', months = '${advert.months}', days = '${advert.days}', webUrl = '${advert.webUrl}', organizationId = '${advert.organizationId}' WHERE id = ${id}`,
      (err, res) => {
        if (err) {
          callback(err, null);
        } else if (res.affectedRows === 0) {
          // Organization with this id was not found
          callback({ success: false, message: Messages.GET_NOT_FOUND }, null);
        } else {
          callback(null, { id, ...advert });
        }
        return;
      }
    );
  };

  static delete = (id, callback) => {
    database.query(`DELETE FROM adverts WHERE id = ${id}`, (err, res) => {
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

export const requiredKeys = ["title", "description", "years", "months", "days", "organizationId"];
export const allKeys = [
  "title",
  "description",
  "years",
  "months",
  "days",
  "webUrl",
  "organizationId",
];

export const ADVERTS = [];

export default Advert;
