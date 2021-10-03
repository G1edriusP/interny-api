// Mock data
import { ADVERTS } from "../data/Advert.js";

// Response messages
import * as Messages from "../utils/constants/messages.js";

const getAdverts = async (req, res, next) => {
  res.status(200).send(ADVERTS);
};

const getAdvert = async (req, res, next) => {
  const id = JSON.parse(req.params.id);
  const advert = ADVERTS.find((ad) => ad.id === id);
  res.status(200).send(advert);
};

const postAdvert = async (req, res, next) => {
  const data = req.body;
  res.status(201).send(data);
};

const updateAdvert = async (req, res, next) => {
  const id = JSON.parse(req.params.id);
  const data = req.body;
  const advert = ADVERTS.find((ad) => ad.id === id);
  const updatedAdvert = { ...advert, ...data };
  res.status(200).send(updatedAdvert);
};

const deleteAdvert = async (req, res, next) => {
  let id = req.params.id;
  if (isNaN(id)) {
    res.status(400).send({ success: false, message: Messages.ID_NOT_SET });
  } else {
    id = JSON.parse(id);
  }

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
};

export default {
  getAdverts,
  getAdvert,
  postAdvert,
  updateAdvert,
  deleteAdvert,
};
