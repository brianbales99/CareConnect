import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

export function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("Logged out");
    navigate("/login");
  };

  const goToProfile = () => {
    navigate("/profile");
  };

  const goHome = () => {
    navigate("/");
  };

  return (
    <header className="careconnect-header">
      <h1 className="header-title">CareConnect</h1>
      <div className="header-buttons">
        <button onClick={goHome} className="header-btn home-btn">
          Home
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
