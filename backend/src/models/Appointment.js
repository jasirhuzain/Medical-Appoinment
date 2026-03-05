import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  date: Date,
  time: String,
  status: {
    type: String,
    enum: ["booked", "completed", "cancelled"],
    default: "booked"
  }
}, { timestamps: true });

export default mongoose.model("Appointment", appointmentSchema);