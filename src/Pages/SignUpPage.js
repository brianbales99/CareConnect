import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import PopupModal from "../Components/PopupModal";
import "./SignUp.css";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [doctorPassword, setDoctorPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (role === "doctor") {
      setShowVerificationModal(true);
    } else {
      await createAccount();
    }
  };

  const createAccount = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        email,
        role,
      });
      alert("Signup successful!");
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error.message);
      alert("Signup failed. Please try again.");
    }
  };

  const handleVerifyDoctor = async () => {
    const correctPassword = "Doctor123";
    if (doctorPassword === correctPassword) {
      setShowVerificationModal(false);
      await createAccount();
    } else {
      alert("Incorrect doctor password. Please try again.");
    }
  };

  const cancelDoctorRole = () => {
    setShowVerificationModal(false);
    setRole(""); // reset selection
    setDoctorPassword("");
  };

  return (
    <div className="signup-container">
      <div className="auth-logo">CareConnect</div>
      <h2>Create Your Account</h2>
      <p>Join CareConnect to manage your appointments.</p>

      <form className="signup-form" onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
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

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
          className="signup-role"
        >
          <option value="" disabled hidden>
            Select your role
          </option>
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select>

        <button type="submit" className="signup-button">
          Sign Up
        </button>

        <button
          type="button"
          className="login-link-button"
          onClick={() => navigate("/login")}
        >
          Already have an account? Log In
        </button>
      </form>

      <PopupModal
        isOpen={showVerificationModal}
        title="Doctor Verification"
        onClose={cancelDoctorRole}
      >
        <p>This role requires verification. Enter the doctor password:</p>
        <input
          type="password"
          value={doctorPassword}
          onChange={(e) => setDoctorPassword(e.target.value)}
          placeholder="Enter doctor password"
        />
        <br /><br />
        <button
          onClick={handleVerifyDoctor}
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            padding: "8px 16px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          Confirm
        </button>
        <button
          onClick={cancelDoctorRole}
          style={{
            backgroundColor: "#6b7280",
            color: "white",
            padding: "8px 16px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </PopupModal>
    </div>
  );
}

export default SignUp;
