import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

export function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: Replace with real logout logic
    alert("Logged out");
    navigate("/login");
  };

  const goToProfile = () => {
    navigate("/profile");
  };

  return (
    <header className="careconnect-header">
      <h1 className="header-title">CareConnect</h1>
      <div className="header-buttons">
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
