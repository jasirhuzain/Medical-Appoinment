import { useEffect, useState } from "react";
import API from "../services/api";

function PatientAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAppointments = async () => {
    try {
      const res = await API.get("/appointments/patient");
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

  const cancelAppointment = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;
    
    try {
      await API.delete(`/appointments/${id}`);
      // Optimistically update UI or re-fetch
      fetchAppointments();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to cancel appointment");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">My Appointments</h2>

        {loading && (
          <div className="flex justify-center"><span className="loading loading-spinner loading-lg"></span></div>
        )}

        {error && (
          <div className="alert alert-error mb-4"><span>{error}</span></div>
        )}

        <div className="space-y-4">
          {appointments.map((appt) => (
            <div key={appt._id} className="card bg-base-100 shadow-md border-l-4 border-primary">
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <div>
                    {/* Note: Ensure your backend populates the doctor's name */}
                    <h3 className="card-title text-xl">
                      Dr. {appt.doctorId?.name || "Specialist"} 
                    </h3>
                    <p className="text-sm opacity-70">{appt.doctorId?.email}</p>
                  </div>
                  <div className={`badge ${
                    appt.status === "booked" ? "badge-success" : "badge-ghost"
                  }`}>
                    {appt.status}
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold block">Date</span>
                    {new Date(appt.date).toLocaleDateString()}
                  </div>
                  <div>
                    <span className="font-semibold block">Time</span>
                    {appt.time}
                  </div>
                </div>

                <div className="card-actions justify-end mt-4">
                  {appt.status === "booked" && (
                    <button
                      className="btn btn-error btn-outline btn-sm"
                      onClick={() => cancelAppointment(appt._id)}
                    >
                      Cancel Appointment
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {!loading && appointments.length === 0 && (
          <div className="text-center py-10">
            <p className="text-xl opacity-50">You have no upcoming appointments.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PatientAppointments;