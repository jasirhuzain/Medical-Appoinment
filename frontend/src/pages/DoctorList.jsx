import { useEffect, useState } from "react";
import API from "../services/api"; // 1. Import your central API config

function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDoctors = async () => {
    try {
      // 2. Using API instance (headers/token handled by interceptor)
      const res = await API.get("/users/doctors"); 
      setDoctors(res.data);
    } catch (err) {
      setError("Failed to load doctors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleBook = async (doctorId, date, time) => {
    try {
      // 3. Using API instance for booking
      await API.post("/appointments/book", { doctorId, date, time });
      
      alert("Appointment booked successfully!");
      fetchDoctors(); // Refresh to show the slot as "Full"
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-base-content">Available Doctors</h2>

        {loading && (
          <div className="flex justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}

        {error && (
          <div className="alert alert-error mb-4">
            <span>{error}</span>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {doctors.map((doc) => (
            <div key={doc._id} className="card bg-base-100 shadow-xl border border-base-300">
              <div className="card-body">
                <h3 className="card-title text-primary">
                  {doc.userId?.name || "Unknown Doctor"}
                </h3>
                <p className="text-sm">
                  <span className="font-bold">Hospital:</span> {doc.hospital}
                </p>

                <div className="mt-4 border-t pt-4">
                  <h4 className="font-bold mb-3 text-sm opacity-70 uppercase tracking-wide">
                    Select a Time Slot:
                  </h4>
                  
                  <div className="flex flex-col gap-2">
                    {doc.availableSlots && doc.availableSlots.length > 0 ? (
                      doc.availableSlots.map((slot, index) => {
                        const d = new Date(slot.date);
                        const dateLabel = !isNaN(d) ? d.toLocaleDateString() : "Date TBD";

                        return (
                          <button
                            key={slot._id || index}
                            type="button"
                            className={`btn btn-block justify-between border-2 ${
                              slot.isBooked 
                                ? "btn-disabled bg-base-200 text-base-300 border-transparent" 
                                : "btn-outline btn-secondary hover:btn-secondary"
                            }`}
                            disabled={slot.isBooked}
                            onClick={() => handleBook(doc._id, slot.date, slot.time)}
                          >
                            <span className="text-xs">{dateLabel}</span>
                            <span className="font-bold">{slot.time}</span>
                            {slot.isBooked ? (
                              <span className="badge badge-ghost text-xs uppercase">Full</span>
                            ) : (
                              <span className="text-xs uppercase">Book &rarr;</span>
                            )}
                          </button>
                        );
                      })
                    ) : (
                      <p className="text-sm text-error italic">No availability listed yet.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!loading && doctors.length === 0 && (
          <div className="text-center py-20 opacity-50">
            <p className="text-xl">No doctors available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorList;