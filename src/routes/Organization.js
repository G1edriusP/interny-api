import express from "express";
import OrganizationController from "../controllers/Organization.js";

const router = express.Router();

// GET organizations
router.get("/organizations", OrganizationController.getOrganizations);

// GET organization
router.get("/organizations/:id", OrganizationController.getOrganization);

// POST organization
router.post("/organizations", OrganizationController.postOrganization);

// PATCH organization
router.put("/organizations/:id", OrganizationController.updateOrganization);

// DELETE organization
router.delete("/organizations/:id", OrganizationController.deleteOrganization);

export default router;
