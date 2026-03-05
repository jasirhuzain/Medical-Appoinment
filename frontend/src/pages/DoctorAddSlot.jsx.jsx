import { useState } from "react";
import API from "../services/api"; // 1. Use your centralized API instance

function DoctorAddSlot() {
  const [form, setForm] = useState({
    date: "",
    startTime: "",
    endTime: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.date || !form.startTime || !form.endTime) {
      return setError("All fields are required");
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");

      // 2. Using API instance (removes hardcoded URL and manual headers)
      await API.post("/doctors/availability", form);

      setMessage("Slot added successfully!");
      setForm({ date: "", startTime: "", endTime: "" });

    } catch (err) {
      setError(err.response?.data?.message || "Failed to add slot");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-6">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center text-base-content">
            Add Availability Slot
          </h2>

          {error && (
            <div className="alert alert-error mt-3">
              <span>{error}</span>
            </div>
          )}

          {message && (
            <div className="alert alert-success mt-3">
              <span>{message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="form-control">
              <label className="label"><span className="label-text">Date</span></label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">Start Time</span></label>
              <input
                type="time"
                name="startTime"
                value={form.startTime}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">End Time</span></label>
              <input
                type="time"
                name="endTime"
                value={form.endTime}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full mt-4"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Add Slot"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DoctorAddSlot;