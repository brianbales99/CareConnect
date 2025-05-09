// src/Pages/LoginPage.js
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Authenticate user
      await signInWithEmailAndPassword(auth, email, password);
      // Always redirect to Home page
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err.message);
      alert("Login failed. Check your credentials and try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="auth-logo">CareConnect</div>
      <h2>Welcome Back</h2>
      <p>Log in to manage your appointments.</p>

      <form onSubmit={handleLogin}>
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

        <p
          className="forgot-link"
          style={{ textAlign: "right", margin: "0 0 10px 0" }}
        >
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>

        <button type="submit" className="login-button">
          Login
        </button>
      </form>

      <p className="signup-redirect">
        Don’t have an account?{' '}
        <Link to="/signup" className="signup-link">
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;