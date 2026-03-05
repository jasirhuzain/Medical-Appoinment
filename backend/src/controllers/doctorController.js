// src/controllers/doctorController.js
import Doctor from "../models/Doctor.js";

export const addAvailability = async (req, res) => {
  try {
    const { date, startTime, endTime } = req.body;

    if (!date || !startTime || !endTime) {
      return res.status(400).json({ message: "Date, startTime, and endTime are required" });
    }

    const doctor = await Doctor.findOne({ userId: req.user.id });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }

    const normalizedDate = new Date(date);

    // Generate slots every 30 minutes between startTime and endTime
    const start = new Date(`${date}T${startTime}`);
    const end = new Date(`${date}T${endTime}`);

    for (let t = start; t < end; t.setMinutes(t.getMinutes() + 30)) {
      const timeString = t.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      const exists = doctor.availableSlots.find(
        s =>
          new Date(s.date).toISOString().split("T")[0] === normalizedDate.toISOString().split("T")[0] &&
          s.time === timeString
      );

      if (!exists) {
        doctor.availableSlots.push({ date: normalizedDate, time: timeString, isBooked: false });
      }
    }

    await doctor.save();

    res.status(201).json({ message: "Slots added successfully", availableSlots: doctor.availableSlots });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};