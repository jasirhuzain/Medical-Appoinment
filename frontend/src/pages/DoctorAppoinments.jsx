import { useEffect, useState } from "react";
import API from "../services/api";

function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAppointments = async () => {
    try {
      const res = await API.get("/appointments/doctor");
      setAppointments(res.data);
    } catch (err) {
      setError("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Use the DELETE method to match your working patient-side logic
  const cancelAppointment = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this appointment? This will reopen the slot.")) return;

    try {
      await API.delete(`/appointments/${id}`);
      // Refresh list to remove the card
      fetchAppointments();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to cancel appointment");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-6 text-base-content">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Doctor Appointments</h2>

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

        <div className="space-y-4">
          {appointments.map((appt) => (
            <div key={appt._id} className="card bg-base-100 shadow-xl border border-base-300">
              <div className="card-body">
                <h3 className="card-title text-primary">
                  Patient: {appt.patientId?.name || "Unknown Patient"}
                </h3>

                <p className="text-sm opacity-80">
                  <span className="font-semibold">Email:</span> {appt.patientId?.email || "N/A"}
                </p>

                <p className="text-sm">
                  <span className="font-semibold">Date:</span> {new Date(appt.date).toLocaleDateString()}
                </p>

                <p className="text-sm">
                  <span className="font-semibold">Time:</span> {appt.time || "Not specified"}
                </p>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-base-200">
                  <span
                    className={`badge badge-md font-bold uppercase ${
                      appt.status === "booked" ? "badge-success" : "badge-warning"
                    }`}
                  >
                    {appt.status}
                  </span>

                  {/* Doctor's Action Button */}
                  {appt.status === "booked" && (
                    <div className="flex gap-2">
                      <button
                        className="btn btn-error btn-outline btn-sm"
                        onClick={() => cancelAppointment(appt._id)}
                      >
                        Cancel / Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {!loading && appointments.length === 0 && (
          <div className="text-center py-20 opacity-50">
            <p className="text-xl">No upcoming appointments found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorAppointments;