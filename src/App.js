import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import FullSchedule from "./Pages/FullSchedule";
import ProfilePage from "./Pages/ProfilePage";
import DoctorProfilePage from "./Pages/DoctorProfilePage";
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
          {/* Home */}
          <Route
            path="/"
            element={
              user ? (
                <MainLayout>
                  <Home />
                </MainLayout>
              ) : (
                <LoginPage />
              )
            }
          />

          {/* Full Schedule */}
          <Route
            path="/appointments/schedule"
            element={
              user ? (
                <MainLayout>
                  <FullSchedule />
                </MainLayout>
              ) : (
                <LoginPage />
              )
            }
          />

          {/* Doctor‑only profile page */}
          <Route
            path="/doctor-profile"
            element={
              user ? (
                <MainLayout>
                  <DoctorProfilePage />
                </MainLayout>
              ) : (
                <LoginPage />
              )
            }
          />

          {/* Shared /profile: shows doctor or patient view */}
          <Route
            path="/profile"
            element={
              user ? (
                <MainLayout>
                  {role === "doctor" ? (
                    <DoctorProfilePage />
                  ) : (
                    <ProfilePage />
                  )}
                </MainLayout>
              ) : (
                <LoginPage />
              )
            }
          />

          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/forgot-password"
            element={<ForgotPasswordPage />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
