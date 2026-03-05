import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";

export const bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, time } = req.body;

    // 1️⃣ Validate input
    if (!doctorId || !date || !time) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2️⃣ Find the doctor by their Doctor Model ID (passed from Frontend)
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor record not found" });
    }

    // 3️⃣ Normalize dates for comparison (Strip time from Date objects)
    const targetDate = new Date(date).toISOString().split("T")[0];

    // 4️⃣ Find the slot index
    const slotIndex = doctor.availableSlots.findIndex(s => 
      new Date(s.date).toISOString().split("T")[0] === targetDate && 
      s.time === time
    );

    // 5️⃣ Check availability
    if (slotIndex === -1 || doctor.availableSlots[slotIndex].isBooked) {
      return res.status(400).json({ message: "Slot is no longer available" });
    }

    // 6️⃣ Update the slot (Using dot notation for reliable Mongoose saving)
    doctor.availableSlots[slotIndex].isBooked = true;
    
    // Create the appointment record
    const appointment = await Appointment.create({
      patientId: req.user.id, 
      doctorId: doctor.userId, // Referencing the User ID of the doctor
      date: targetDate,
      time,
      status: "booked"
    });

    // Save the doctor document with the updated slot
    await doctor.save();

    res.status(201).json({
      message: "Appointment confirmed!",
      appointment
    });

  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }

  
  
};
// ... keep your existing bookAppointment code above ...

export const getPatientAppointments = async (req, res) => {
  try {
    // 1️⃣ Find appointments where the patientId matches the logged-in user
    // 2️⃣ Use .populate to turn doctorId (an ID) into an object with name/email
    const appointments = await Appointment.find({ patientId: req.user.id })
      .populate("doctorId", "name email") 
      .sort({ date: 1 }); // Sort by date (closest first)

    res.status(200).json(appointments);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ message: "Could not fetch appointments" });
  }
};

// controllers/appointmentController.js

export const getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctorId: req.user.id })
      // This is the magic line: it swaps the ID for the actual Patient User object
      .populate("patientId", "name email") 
      .sort({ date: 1 });

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments" });
  }
};

// controllers/appointmentController.js

// controllers/appointmentController.js
export const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params; // Matches the :id in the route
    
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment record not found in database" });
    }

    // Release doctor slot logic...
    const doctor = await Doctor.findOne({ userId: appointment.doctorId });
    if (doctor) {
      const slotIndex = doctor.availableSlots.findIndex(s => 
        new Date(s.date).toISOString().split('T')[0] === new Date(appointment.date).toISOString().split('T')[0] && 
        s.time === appointment.time
      );
      if (slotIndex !== -1) {
        doctor.availableSlots[slotIndex].isBooked = false;
        await doctor.save();
      }
    }

    await Appointment.findByIdAndDelete(id);
    res.status(200).json({ message: "Cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};