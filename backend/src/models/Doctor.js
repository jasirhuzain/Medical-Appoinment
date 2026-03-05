import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  specialization: String,
  experience: Number,
  hospital: String,
  availableSlots: [
    {
      date: Date,
      time: String,
      isBooked: { type: Boolean, default: false }
    }
  ]
});

export default mongoose.model("Doctor", doctorSchema);