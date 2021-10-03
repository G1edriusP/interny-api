// Mock data
import { ADVERTS } from "../data/Advert.js";

// Response messages
import * as Messages from "../utils/constants/messages.js";

// Utils
import { checkId } from "../utils/helpers/other.js";

const getAdverts = async (_, res) => {
  res.status(200).send(ADVERTS);
};

const getAdvert = async (req, res) => {
  const id = checkId(req, res);
  if (id) {
    const advert = ADVERTS.find((ad) => ad.id === id);

    if (advert) {
      res.status(200).send(advert);
    } else {
      res.status(404).send({ success: false, message: Messages.GET_NOT_FOUND });
    }
  }
};

const postAdvert = async (req, res) => {
  const data = req.body;
  if (Object.keys(data).length === 0) {
    res.status(400).send({ success: false, message: Messages.BAD_BODY });
  } else {
    res.status(201).send(data);
  }
};

const updateAdvert = async (req, res) => {
  const id = checkId(req, res);
  if (id || id === 0) {
    const data = req.body;

    if (Object.keys(data).length === 0) {
      res.status(400).send({ success: false, message: Messages.BAD_BODY });
    } else {
      const advert = ADVERTS.find((ad) => ad.id === id);

      if (advert) {
        const updatedAdvert = { ...advert, ...data };
        res.status(200).send(updatedAdvert);
      } else {
        res
          .status(404)
          .send({ success: false, message: Messages.UPDATE_NOT_FOUND });
      }
    }
  }
};

const deleteAdvert = async (req, res) => {
  const id = checkId(req, res);
  if (id) {
    const advert = ADVERTS.find((ad) => ad.id === id);

    if (advert) {
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
  getAdverts,
  getAdvert,
  postAdvert,
  updateAdvert,
  deleteAdvert,
};
