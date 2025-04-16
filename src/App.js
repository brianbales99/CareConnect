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
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/doctor" element={<DoctorDashboard />} />
          <Route path="/patient" element={<PatientDashboard />} />
        </Routes>

    </Router>
  );
}

export default App;