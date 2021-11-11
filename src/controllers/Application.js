// Mock data
import Application, { requiredKeys, allKeys } from "../data/Application.js";

// Response messages
import * as Messages from "../utils/constants/messages.js";

// Utils
import { checkId, checkRequired } from "../utils/helpers/other.js";

const getApplications = async (_, res) => {
  Application.getAll((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(data);
    }
  });
};

const getApplication = async (req, res) => {
  const id = checkId(req, res);
  if (id) {
    Application.find(id, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else if (data) {
        res.status(200).send(data);
      } else {
        res
          .status(404)
          .send({ success: false, message: Messages.GET_NOT_FOUND });
      }
    });
  }
};

const postApplication = async (req, res) => {
  const data = req.body;
  if (Object.keys(data).length === 0) {
    res.status(400).send({ success: false, message: Messages.BAD_BODY });
  } else {
    const params = checkRequired(requiredKeys, allKeys, data, res);
    if (params) {
      const organization = new Application(params);
      Application.create(organization, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(201).send(data);
        }
      });
    }
  }
};

const updateApplication = async (req, res) => {
  const id = checkId(req, res);
  if (id) {
    const data = req.body;

    if (Object.keys(data).length === 0) {
      res.status(415).send({ success: false, message: Messages.BAD_BODY });
    } else {
      const params = checkRequired(requiredKeys, allKeys, data, res);
      if (params) {
        const organization = new Application(params);
        Application.update(id, organization, (err, data) => {
          if (err) {
            if (!err.success) {
              res.status(404).send(err);
            } else {
              res.status(500).send(err);
            }
          } else {
            res.status(200).send(data);
          }
        });
      }
    }
  }
};

const deleteApplication = async (req, res) => {
  const id = checkId(req, res);
  if (id) {
    Application.delete(id, (err, data) => {
      if (err) {
        if (!err.success) {
          res.status(404).send(err);
        } else {
          res.status(500).send(err);
        }
      } else {
        res.status(200).send(data);
      }
    });
  }
};

export default {
  getApplications,
  getApplication,
  postApplication,
  updateApplication,
  deleteApplication,
};
