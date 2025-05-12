// src/App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import FullSchedule from "./Pages/FullSchedule";
import ProfilePage from "./Pages/ProfilePage";
import DoctorDashboard from "./Pages/DoctorDashboard";
import DoctorProfilePage from "./Pages/DoctorProfilePage";
import AllDoctors from "./Pages/AllDoctors";
import MainLayout from "./layouts/MainLayout";

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          const snap = await getDoc(doc(db, "users", currentUser.uid));
          setRole(snap.exists() ? snap.data().role : "");
        } catch (err) {
          console.error("Failed to load user role:", err);
          setRole("");
        }
      } else {
        setRole("");
      }

      setLoading(false);
    });

    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="app-wrapper">
        <Routes>
          {/* Doctor-only routes */}
          <Route
            path="/doctordashboard"
            element={
              user && role === "doctor" ? <DoctorDashboard /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/doctor-profile"
            element={
              user && role === "doctor" ? <DoctorProfilePage /> : <Navigate to="/login" replace />
            }
          />

          {/* Patient-only routes */}
          <Route
            path="/home"
            element={
              user && role === "patient" ? (
                <MainLayout>
                  <Home />
                </MainLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/appointments/schedule"
            element={
              user && role === "patient" ? (
                <MainLayout>
                  <FullSchedule />
                </MainLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/profile"
            element={
              user && role === "patient" ? (
                <MainLayout>
                  <ProfilePage />
                </MainLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/doctors"
            element={
              user && role === "patient" ? (
                <MainLayout>
                  <AllDoctors />
                </MainLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Public */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
