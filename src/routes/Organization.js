import express from "express";
import OrganizationController from "../controllers/Organization.js";
import { jwtMiddleware } from "../utils/helpers/auth.js";

const router = express.Router();

// GET organizations
router.get("/organizations", jwtMiddleware, OrganizationController.getOrganizations);

// GET organization
router.get("/organizations/:id", jwtMiddleware, OrganizationController.getOrganization);

// POST organization
router.post("/organizations", jwtMiddleware, OrganizationController.postOrganization);

// PUT organization
router.put("/organizations/:id", jwtMiddleware, OrganizationController.updateOrganization);

// DELETE organization
router.delete("/organizations/:id", jwtMiddleware, OrganizationController.deleteOrganization);

export default router;
