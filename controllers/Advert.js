// Mock data
import { ADVERTS } from "../data/Advert.js";

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
  const id = req.params.id;
  const data = req.body;
  const advert = ADVERTS.find((ad) => ad.id === id);
  const updatedAdvert = { ...advert, ...data };
  res.status(200).send(updatedAdvert);
};

export default { getAdverts, getAdvert, postAdvert, updateAdvert };
