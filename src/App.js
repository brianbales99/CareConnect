import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home.js";
import DoctorDashboard from "./Pages/DoctorDashboard.js";
import PatientDashboard from "./Pages/PatientDashboard.js";




function App() {
  return (
    <Router>
      <div className="app-wrapper">
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