import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home.js";
import DoctorDashboard from "./Pages/DoctorDashboard.js";
import PatientDashboard from "./Pages/PatientDashboard.js";
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/SignUpPage';





function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/doctor" element={<DoctorDashboard />} />
          <Route path="/patient" element={<PatientDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;