import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DoctorList from "./pages/DoctorList";
import DoctorAddSlot from "./pages/DoctorAddSlot.jsx";
import DoctorAppointments from "./pages/DoctorAppoinments.jsx";
import PatientAppointments from "./pages/PatientAppointments.jsx";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/doctors" element={<DoctorList />} />
<Route path="/appointments" element={<PatientAppointments/>} />
<Route path="/add-slot" element={<DoctorAddSlot/>} />
<Route path="/doctor-appointments" element={<DoctorAppointments/>} />
<Route path="/doctors" element={<DoctorList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;