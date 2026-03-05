// src/routes/doctorRoutes.js

import express from "express";
import { addAvailability } from "../controllers/doctorController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post(
  "/availability",
  protect,
  authorizeRoles("doctor"),
  addAvailability
);
export default router;