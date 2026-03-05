import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setRole(payload.role);
    } catch (err) {
      localStorage.removeItem("token");
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <button onClick={handleLogout} className="btn btn-error btn-sm">
            Logout
          </button>
        </div>

        {/* Role Info Card */}
        <div className="card bg-base-100 shadow-md mb-6">
          <div className="card-body">
            <p className="text-lg">
              Logged in as:
              <span className="badge badge-primary ml-2 capitalize">
                {role}
              </span>
            </p>
          </div>
        </div>

        {/* Patient Section */}
        {role === "patient" && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card bg-base-100 shadow-md">
              <div className="card-body">
                <h3 className="card-title">View Doctors</h3>
                <p>Browse available doctors and book appointments.</p>
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate("/doctors")}
                  >
                    Explore
                  </button>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-md">
              <div className="card-body">
                <h3 className="card-title">My Appointments</h3>
                <p>Check your upcoming and past appointments.</p>
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-secondary"
                    onClick={() => navigate("/appointments")}
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Doctor Section */}
        {role === "doctor" && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card bg-base-100 shadow-md">
              <div className="card-body">
                <h3 className="card-title">Add Availability</h3>
                <p>Set your available time slots for patients.</p>
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate("/add-slot")}
                  >
                    Add Slot
                  </button>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-md">
              <div className="card-body">
                <h3 className="card-title">View Appointments</h3>
                <p>Manage and track patient appointments.</p>
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-secondary"
                    onClick={() => navigate("/doctor-appointments")}
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Dashboard;