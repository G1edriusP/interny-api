// Mock data
import { ORGANIZATIONS } from "../data/Organization.js";

// Response messages
import * as Messages from "../utils/constants/messages.js";

// Utils
import { checkId } from "../utils/helpers/other.js";

const getOrganizations = async (_, res) => {
  res.status(200).send(ORGANIZATIONS);
};

const getOrganization = async (req, res) => {
  const id = checkId(req, res);
  if (id || id === 0) {
    const organization = ORGANIZATIONS.find((org) => org.id === id);

    if (organization) {
      res.status(200).send(organization);
    } else {
      res.status(404).send({ success: false, message: Messages.GET_NOT_FOUND });
    }
  }
};

const postOrganization = async (req, res) => {
  const data = req.body;
  if (Object.keys(data).length === 0) {
    res.status(400).send({ success: false, message: Messages.BAD_BODY });
  } else {
    res.status(201).send(data);
  }
};

const updateOrganization = async (req, res) => {
  const id = checkId(req, res);
  if (id || id === 0) {
    const data = req.body;

    if (Object.keys(data).length === 0) {
      res.status(400).send({ success: false, message: Messages.BAD_BODY });
    } else {
      const organization = ORGANIZATIONS.find((org) => org.id === id);

      if (organization) {
        const updatedOrganization = { ...organization, ...data };
        res.status(200).send(updatedOrganization);
      } else {
        res
          .status(404)
          .send({ success: false, message: Messages.UPDATE_NOT_FOUND });
      }
    }
  }
};

const deleteOrganization = async (req, res) => {
  const id = checkId(req, res);
  if (id || id === 0) {
    const organization = ORGANIZATIONS.find((org) => org.id === id);

    if (organization) {
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
  getOrganizations,
  getOrganization,
  postOrganization,
  updateOrganization,
  deleteOrganization,
};
