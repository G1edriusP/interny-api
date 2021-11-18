import express from "express";
import ApplicationController from "../controllers/Application.js";
import { jwtMiddleware } from "../utils/helpers/auth.js";

const router = express.Router();

// GET applications
router.get("/applications", jwtMiddleware, ApplicationController.getApplications);

// GET Specific organization advert applications
router.get(
  "/organizations/:orgId/adverts/:adId/applications",
  jwtMiddleware,
  ApplicationController.getOrganizationAdvertApplications
);

// GET Specific organization advert application
router.get(
  "/organizations/:orgId/adverts/:adId/applications/:appId",
  jwtMiddleware,
  ApplicationController.getOrganizationAdvertApplication
);

// GET application
router.get("/applications/:id", jwtMiddleware, ApplicationController.getApplication);

// POST application
router.post("/applications", jwtMiddleware, ApplicationController.postApplication);

// PUT application
router.put("/applications/:id", jwtMiddleware, ApplicationController.updateApplication);

// DELETE application
router.delete("/applications/:id", jwtMiddleware, ApplicationController.deleteApplication);

export default router;
