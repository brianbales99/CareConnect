// src/components/DoctorHeader.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

export function DoctorHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // Optional: clear any extra state
    navigate("/login");
  };

  const goToDashboard = () => {
    navigate("/doctordashboard");
  };

  const goToProfile = () => {
    navigate("/doctor-profile");

  };

  return (
    <header className="careconnect-header">
      <h1 className="header-title">CareConnect Doctor</h1>
      <div className="header-buttons">
        <button onClick={goToDashboard} className="header-btn profile-btn">
          Dashboard
        </button>
        <button onClick={goToProfile} className="header-btn profile-btn">
          Profile
        </button>
        <button onClick={handleLogout} className="header-btn logout-btn">
          Log Out
        </button>
      </div>
    </header>
  );
}

export default DoctorHeader;