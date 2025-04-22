import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebaseConfig";
import "./ForgotPassword.css";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent! Please check your inbox.");
    } catch (error) {
      console.error("Password reset error:", error.message);
      alert("Failed to send reset email. Make sure the email is correct.");
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="auth-logo">CareConnect</div>
      <h2>Reset Your Password</h2>
      <p>Enter your email to receive a password reset link.</p>
      <form onSubmit={handleReset}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
}

export default ForgotPasswordPage;
