import express from "express";
import AuthController from "../controllers/Auth.js";

const router = express.Router();

// POST Login
router.post("/login", AuthController.postLogin);

export default router;
