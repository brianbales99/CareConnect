// src/Pages/SignUp.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import "./SignUp.css";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email,
        role,
      });

      alert("Signup successful!");
    } catch (error) {
      console.error("Signup error:", error.message);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <>
      <div className="signup-container">
      <div className="auth-logo">CareConnect</div>

        <h2>Create Your Account</h2>
        <p>Join CareConnect to manage your appointments.</p>
        <form className="signup-form" onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="administrator">Administrator</option>
          </select> */}

          <button type="submit" className="signup-button">
            Sign Up
          </button>

          {/* ✅ New Login button */}
          <button
            type="button"
            className="login-link-button"
            onClick={() => navigate("/login")}
          >
            Already have an account? Log In
          </button>
        </form>
      </div>
    </>
  );
}

export default SignUp;
