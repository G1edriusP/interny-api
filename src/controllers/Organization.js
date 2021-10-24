// Database
import Organization, { requiredKeys } from "../data/Organization.js";

// Response messages
import * as Messages from "../utils/constants/messages.js";

// Utils
import { checkId, checkRequired } from "../utils/helpers/other.js";

const getOrganizations = async (_, res) => {
  Organization.getAll((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(data);
    }
  });
};

const getOrganization = async (req, res) => {
  const id = checkId(req, res);
  if (id) {
    Organization.find(id, (err, data) => {
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

const postOrganization = async (req, res) => {
  const data = req.body;
  if (Object.keys(data).length === 0) {
    res.status(400).send({ success: false, message: Messages.BAD_BODY });
  } else {
    const params = checkRequired(requiredKeys, data, res);
    if (params) {
      const organization = new Organization(params);
      Organization.create(organization, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(201).send(data);
        }
      });
    }
  }
};

const updateOrganization = async (req, res) => {
  const id = checkId(req, res);
  if (id) {
    const data = req.body;

    if (Object.keys(data).length === 0) {
      res.status(400).send({ success: false, message: Messages.BAD_BODY });
    } else {
      const params = checkRequired(requiredKeys, data, res);
      if (params) {
        const organization = new Organization(params);
        Organization.update(id, organization, (err, data) => {
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

const deleteOrganization = async (req, res) => {
  const id = checkId(req, res);
  if (id) {
    Organization.delete(id, (err, data) => {
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
  getOrganizations,
  getOrganization,
  postOrganization,
  updateOrganization,
  deleteOrganization,
};
