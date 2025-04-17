// src/Pages/LoginPage.js
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { useNavigate, Link } from "react-router-dom";
import { Header } from "../Components/Header";
import { Footer } from "../Components/Footer";
import "./Login.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        navigate("/home"); // ⬅️ Redirect all roles to /home
      } else {
        alert("No role found for this user.");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed. Check your credentials.");
    }
  };

  return (
    <>
      <Header />
      <div className="login-container">
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
          <button type="submit">Login</button>
        </form>
        <p className="signup-redirect">
          Don’t have an account?{" "}
          <Link to="/signup" className="signup-link">
            Sign up
          </Link>
        </p>
      </div>
      <Footer />
    </>
  );
}

export default LoginPage;
