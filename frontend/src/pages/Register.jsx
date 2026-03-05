import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
    specialization: "",
    experience: "",
    hospital: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      return setError("All fields are required");
    }

    try {
      setLoading(true);
      setError("");

      await API.post("/auth/register", form);

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center">Create Account</h2>

          {error && (
            <div className="alert alert-error text-sm py-2">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="input input-bordered w-full"
            />

            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="input input-bordered w-full"
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="input input-bordered w-full"
            />

            {/* Role Selection */}
            <div className="form-control">
              <label className="label font-semibold">Register As</label>
              <div className="flex gap-4">
                <label className="cursor-pointer flex items-center gap-2">
                  <input
                    type="radio"
                    name="role"
                    value="patient"
                    checked={form.role === "patient"}
                    onChange={handleChange}
                    className="radio radio-primary"
                  />
                  <span>Patient</span>
                </label>

                <label className="cursor-pointer flex items-center gap-2">
                  <input
                    type="radio"
                    name="role"
                    value="doctor"
                    checked={form.role === "doctor"}
                    onChange={handleChange}
                    className="radio radio-secondary"
                  />
                  <span>Doctor</span>
                </label>
              </div>
            </div>

            {/* Extra fields for doctors */}
            {form.role === "doctor" && (
              <>
                <input
                  name="specialization"
                  type="text"
                  placeholder="Specialization"
                  value={form.specialization}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />

                <input
                  name="experience"
                  type="number"
                  placeholder="Years of Experience"
                  value={form.experience}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />

                <input
                  name="hospital"
                  type="text"
                  placeholder="Hospital Name"
                  value={form.hospital}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </>
            )}

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Register"
              )}
            </button>
          </form>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link to="/" className="link link-primary">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;