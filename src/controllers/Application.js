// Mock data
import { APPLICATIONS } from "../data/Application.js";

// Response messages
import * as Messages from "../utils/constants/messages.js";

// Utils
import { checkId } from "../utils/helpers/other.js";

const getApplications = async (_, res) => {
  res.status(200).send(APPLICATIONS);
};

const getApplication = async (req, res) => {
  const id = checkId(req, res);
  if (id || id === 0) {
    const application = APPLICATIONS.find((app) => app.id === id);

    if (application) {
      res.status(200).send(application);
    } else {
      res.status(404).send({ success: false, message: Messages.GET_NOT_FOUND });
    }
  }
};

const postApplication = async (req, res) => {
  const data = req.body;
  if (Object.keys(data).length === 0) {
    res.status(400).send({ success: false, message: Messages.BAD_BODY });
  } else {
    res.status(201).send(data);
  }
};

// bad data was given ne 400 o 415

const updateApplication = async (req, res) => {
  const id = checkId(req, res);
  if (id || id === 0) {
    const data = req.body;

    if (Object.keys(data).length === 0) {
      res.status(400).send({ success: false, message: Messages.BAD_BODY });
    } else {
      const application = APPLICATIONS.find((app) => app.id === id);

      if (application) {
        const updatedApplication = { ...application, ...data };
        res.status(200).send(updatedApplication);
      } else {
        res
          .status(404)
          .send({ success: false, message: Messages.UPDATE_NOT_FOUND });
      }
    }
  }
};

const deleteApplication = async (req, res) => {
  const id = checkId(req, res);
  if (id || id === 0) {
    const application = APPLICATIONS.find((app) => app.id === id);

    if (application) {
      res
        .status(200)
        .send({ success: true, message: Messages.DELETE_SUCCESSFUL });
    } else {
      res
        .status(404)
        .send({ success: false, message: Messages.DELETE_UNSUCCESSFUL });
    }
  }
};

export default {
  getApplications,
  getApplication,
  postApplication,
  updateApplication,
  deleteApplication,
};
