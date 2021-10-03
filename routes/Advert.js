import express from "express";

// Mock data
import { ADVERTS } from "../data/Advert.js";

const router = express.Router();

// router.get("/", (req, res, next) => {
//   res.status(200);
// });

// GET adverts
router.get("/adverts", (req, res, next) => {
  res.status(200).send(ADVERTS);
});

// GET advert
router.get("/adverts/:id", (req, res, next) => {
  const id = JSON.parse(req.params.id);
  const advert = ADVERTS.find((ad) => ad.id === id);
  res.status(200).send(advert);
});

// POST advert
router.post("/adverts", (req, res, next) => {
  const data = req.body;
  res.status(201).send(data);
});

// PATCH advert
router.patch("/adverts/:id", (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  const advert = ADVERTS.find((ad) => ad.id === id);
  const updatedAdvert = { ...advert, ...data };
  res.status(200).send(updatedAdvert);
});

// DELETE advert
// router.post("/adverts/:id", (req, res, next) => {
//   const data = req.body;
//   res.status(201).send(data);
// });

export default router;
