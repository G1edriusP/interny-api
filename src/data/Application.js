import database from "../utils/helpers/database.js";

// Constants
import * as Messages from "../utils/constants/messages.js";

// Constructor
class Application {
  constructor(application) {
    this.id = application.id;
    this.letter = application.letter;
    this.advertId = application.advertId;
  }

  static getAll(callback) {
    database.query(`SELECT * FROM applications`, (err, res) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, res);
      }
      return;
    });
  }

  static getAdvertApplications(orgId, adId, callback) {
    database.query(
      `SELECT * FROM adverts WHERE organizationId = ${orgId} AND id = ${adId}`,
      (err, adverts) => {
        if (err) {
          callback(err, null);
        } else {
          database.query(`SELECT * FROM applications`, (err, applications) => {
            if (err) {
              callback(err, null);
            } else {
              const advert = adverts.find((ad) => ad.id === adId);
              console.log(advert);
              const apps = applications
                .map((app) => (app.advertId === advert.id ? app : null))
                .filter((app) => app);
              callback(null, apps);
            }
          });
        }
        return;
      }
    );
  }

  static getAdvertApplication(orgId, adId, appId, callback) {
    database.query(
      `SELECT * FROM adverts WHERE organizationId = ${orgId} AND id = ${adId}`,
      (err, adverts) => {
        if (err) {
          callback(err, null);
        } else {
          database.query(`SELECT * FROM applications`, (err, applications) => {
            if (err) {
              callback(err, null);
            } else {
              const advert = adverts.find((ad) => ad.id === adId);
              if (advert) {
                const apps = applications
                  .map((app) => (app.advertId === advert.id ? app : null))
                  .filter((app) => app);
                const app = apps.find((a) => a.id === appId);
                if (app) {
                  callback(null, app);
                } else {
                  callback(null, { success: false, message: Messages.GET_NOT_FOUND });
                }
              } else {
                callback(null, { success: false, message: Messages.GET_NOT_FOUND });
              }
            }
          });
        }
        return;
      }
    );
  }

  static find(id, callback) {
    database.query(`SELECT * FROM applications WHERE id = ${id}`, (err, res) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, res[0]);
      }
      return;
    });
  }

  static create(application, callback) {
    database.query(`INSERT INTO applications SET ?`, application, (err, res) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, application);
      }
      return;
    });
  }

  static update = (id, application, callback) => {
    database.query(
      `UPDATE applications SET letter = '${application.letter}' WHERE id = ${id}`,
      (err, res) => {
        if (err) {
          callback(err, null);
        } else if (res.affectedRows === 0) {
          // Organization with this id was not found
          callback({ success: false, message: Messages.GET_NOT_FOUND }, null);
        } else {
          callback(null, { id, ...application });
        }
        return;
      }
    );
  };

  static delete = (id, callback) => {
    database.query(`DELETE FROM applications WHERE id = ${id}`, (err, res) => {
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

export const requiredKeys = ["letter", "advertId"];
export const allKeys = ["letter", "advertId"];

export const APPLICATIONS = [];

export default Application;
