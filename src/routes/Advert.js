import express from "express";
import AdvertController from "../controllers/Advert.js";
import { jwtMiddleware } from "../utils/helpers/auth.js";

const router = express.Router();

// GET adverts
router.get("/adverts", jwtMiddleware, AdvertController.getAdverts);

// GET organization adverts
router.get("/organizations/:id/adverts", jwtMiddleware, AdvertController.getOrganizationAdverts);

// GET organization advert
router.get(
  "/organizations/:id/adverts/:adId",
  jwtMiddleware,
  AdvertController.getOrganizationAdvert
);

// GET advert
router.get("/adverts/:id", jwtMiddleware, AdvertController.getAdvert);

// POST advert
router.post("/adverts", jwtMiddleware, AdvertController.postAdvert);

// PUT advert
router.put("/adverts/:id", jwtMiddleware, AdvertController.updateAdvert);

// DELETE advert
router.delete("/adverts/:id", jwtMiddleware, AdvertController.deleteAdvert);

export default router;
