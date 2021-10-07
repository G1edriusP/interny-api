import express from "express";
import ApplicationController from "../controllers/Application.js";

const router = express.Router();

// GET applications
router.get("/applications", ApplicationController.getApplications);

// GET application
router.get("/applications/:id", ApplicationController.getApplication);

// POST application
router.post("/applications", ApplicationController.postApplication);

// PATCH application
router.patch("/applications/:id", ApplicationController.updateApplication);

// DELETE application
router.delete("/applications/:id", ApplicationController.deleteApplication);

export default router;
