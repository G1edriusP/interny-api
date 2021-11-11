// Mock data
import Advert, { requiredKeys, allKeys, ADVERTS } from "../data/Advert.js";

// Response messages
import * as Messages from "../utils/constants/messages.js";

// Utils
import { checkId, checkRequired } from "../utils/helpers/other.js";

const getAdverts = async (_, res) => {
  Advert.getAll((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(data);
    }
  });
};

const getOrganizationAdverts = async (req, res) => {
  const id = checkId(req, res);
  if (id) {
    Advert.getAllFromOrganization(id, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else if (data) {
        res.status(200).send(data);
      } else {
        res.status(404).send({ success: false, message: Messages.GET_NOT_FOUND });
      }
    });
  }
};

const getAdvert = async (req, res) => {
  const id = checkId(req, res);
  if (id) {
    Advert.find(id, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else if (data) {
        res.status(200).send(data);
      } else {
        res.status(404).send({ success: false, message: Messages.GET_NOT_FOUND });
      }
    });
  }
};

const postAdvert = async (req, res) => {
  const data = req.body;
  if (Object.keys(data).length === 0) {
    res.status(400).send({ success: false, message: Messages.BAD_BODY });
  } else {
    const params = checkRequired(requiredKeys, allKeys, data, res);
    if (params) {
      const advert = new Advert(params);
      Advert.create(advert, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(201).send(data);
        }
      });
    }
  }
};

const updateAdvert = async (req, res) => {
  const id = checkId(req, res);
  if (id) {
    const data = req.body;

    if (Object.keys(data).length === 0) {
      res.status(415).send({ success: false, message: Messages.BAD_BODY });
    } else {
      const params = checkRequired(requiredKeys, allKeys, data, res);
      if (params) {
        const advert = new Advert(params);
        Advert.update(id, advert, (err, data) => {
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

const deleteAdvert = async (req, res) => {
  const id = checkId(req, res);
  if (id) {
    Advert.delete(id, (err, data) => {
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
  getAdverts,
  getOrganizationAdverts,
  getAdvert,
  postAdvert,
  updateAdvert,
  deleteAdvert,
};
