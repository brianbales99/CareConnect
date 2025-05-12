// src/pages/AllDoctors.js
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import "./AllDoctors.css";

export default function AllDoctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      const q = query(collection(db, "users"), where("role", "==", "doctor"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setDoctors(data);
    };

    fetchDoctors();
  }, []);

  return (
    <div className="all-doctors-container">
      <h1>Our Doctors</h1>
      <div className="doctors-grid">
        {doctors.length === 0 ? (
          <p>No doctors found.</p>
        ) : (
          doctors.map((doctor) => (
            <div key={doctor.id} className="doctor-card">
              <h3>Dr. {doctor.lastName}</h3>
              <p><strong>First Name:</strong> {doctor.firstName}</p>
              <p><strong>Email:</strong> {doctor.email}</p>
              {doctor.specialty && <p><strong>Specialty:</strong> {doctor.specialty}</p>}
              {doctor.bio && <p><strong>Bio:</strong> {doctor.bio}</p>}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
