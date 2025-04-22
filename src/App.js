import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage"; 

// Pages
import Home from "./Pages/Home";
import DoctorDashboard from "./Pages/DoctorDashboard";
import PatientDashboard from "./Pages/PatientDashboard";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import FullSchedule from "./Pages/FullSchedule";


// Layout
import MainLayout from "./layouts/MainLayout";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  return (
    <Router>
      <div className="app-wrapper">
        <Routes>

          {/* Pages with Header/Footer shown if user is logged in */}
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
          {/* <Route
            path="/profile"
            element={
              user ? (
                <MainLayout>
                  <Profile />
                </MainLayout>
              ) : (
                <LoginPage />
              )
            }
          /> */}

          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* Other dashboards (optional: protect later) */}
          <Route path="/doctor" element={<DoctorDashboard />} />
          <Route path="/patient" element={<PatientDashboard />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
