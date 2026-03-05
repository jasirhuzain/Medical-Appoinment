import express from "express";
import { getDoctors } from "../controllers/userController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/doctors", protect, getDoctors);


export default router;