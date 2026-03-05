// routes/appointmentRoutes.js
import express from "express";
import { 
  bookAppointment, 
  getPatientAppointments, getDoctorAppointments,cancelAppointment // <--- You need to import this
} from "../controllers/appointmentController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";


const router = express.Router();

// 1. Existing Booking route
router.post(
  "/book",
  protect,
  authorizeRoles("patient"),
  bookAppointment
);

// 2. NEW: Fetching route for the PatientAppointments.jsx component
// This matches: GET /api/appointments/patient
router.get(
  "/patient",
  protect,
  authorizeRoles("patient"),
  getPatientAppointments
);
// GET /api/appointments/doctor
router.get(
  "/doctor",
  protect,
  authorizeRoles("doctor"),
  getDoctorAppointments
);



// Allow both patients and doctors to cancel
router.delete("/:id", protect, cancelAppointment);

export default router;