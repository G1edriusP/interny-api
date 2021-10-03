import express from "express";
import AdvertController from "../controllers/Advert.js";

const router = express.Router();

// GET adverts
router.get("/adverts", AdvertController.getAdverts);

// GET advert
router.get("/adverts/:id", AdvertController.getAdvert);

// POST advert
router.post("/adverts", AdvertController.postAdvert);

// PATCH advert
router.patch("/adverts/:id", AdvertController.updateAdvert);

// DELETE advert
// router.post("/adverts/:id", (req, res, next) => {
//   const data = req.body;
//   res.status(201).send(data);
// });

export default router;
