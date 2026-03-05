// src/controllers/userController.js
import Doctor from "../models/Doctor.js";

export const getDoctors = async (req, res) => {
  try {
    // Fetch doctors from Doctor model, populate user details
    const doctors = await Doctor.find().populate("userId", "name email");
    res.json(doctors);
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};