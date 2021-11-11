import express from "express";
import AuthController from "../controllers/Auth.js";

const router = express.Router();

// GET users
router.get("/users", AuthController.getAllUsers);

// POST Login
router.post("/login", AuthController.postLogin);

// POST Logout
router.post("/logout", AuthController.postLogout);

export default router;
