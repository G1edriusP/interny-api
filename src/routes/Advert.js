import express from "express";
import AdvertController from "../controllers/Advert.js";

const router = express.Router();

// GET adverts
router.get("/adverts", AdvertController.getAdverts);

// GET organization adverts
router.get("/organizations/:id/adverts", AdvertController.getOrganizationAdverts);

// GET advert
router.get("/adverts/:id", AdvertController.getAdvert);

// POST advert
router.post("/adverts", AdvertController.postAdvert);

// PUT advert
router.put("/adverts/:id", AdvertController.updateAdvert);

// DELETE advert
router.delete("/adverts/:id", AdvertController.deleteAdvert);

export default router;
