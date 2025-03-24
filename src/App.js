import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home.js";
import DoctorDashboard from "./Pages/DoctorDashboard.js";
import PatientDashboard from "./Pages/PatientDashboard.js";

// Components
import { Navbar } from "./Components/Navbar.js";


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/doctor" element={<DoctorDashboard />} />

          <Route path="/patient" element={<PatientDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;