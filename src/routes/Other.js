import express from "express";
import OtherController from "../controllers/Other.js";

const router = express.Router();

// GET organizations adverts
router.get("/organizations/:orgId/adverts", OtherController.getInnerAdverts);

// GET organizations advert
router.get(
  "/organizations/:orgId/adverts/:adId",
  OtherController.getInnerAdvert
);

// GET organizations advert applications
router.get(
  "/organizations/:orgId/adverts/:adId/applications",
  OtherController.getInnerApplications
);

// GET organizations advert application
router.get(
  "/organizations/:orgId/adverts/:adId/applications/:appId",
  OtherController.getInnerApplication
);

export default router;
