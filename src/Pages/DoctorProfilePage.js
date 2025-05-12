// src/Pages/DoctorProfilePage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import './ProfilePage.css';
import { DoctorHeader } from '../Components/DoctorHeader';

const DoctorProfilePage = () => {
  const [doctorData, setDoctorData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    specialty: '',
    bio: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctorData = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setDoctorData(prev => ({
            ...prev,
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            email: data.email || '',
            specialty: data.specialty || '',
            bio: data.bio || ''
          }));
        }
      }
    };

    fetchDoctorData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (user) {
      const docRef = doc(db, 'users', user.uid);
      await setDoc(docRef, {
        ...doctorData,
        role: 'doctor',
      }, { merge: true });
      alert('Profile updated!');
    }
  };

  return (
    <>
      <DoctorHeader />
      <div className="profile-wrapper">
        <div className="profile-page">
          <h2>Doctor Profile</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>First Name:</label>
              <input type="text" value={doctorData.firstName} disabled />
            </div>

            <div>
              <label>Last Name:</label>
              <input type="text" value={doctorData.lastName} disabled />
            </div>

            <div>
              <label>Email:</label>
              <input type="email" value={doctorData.email} disabled />
            </div>

            <div>
              <label>Specialty:</label>
              <input
                type="text"
                value={doctorData.specialty}
                onChange={(e) => setDoctorData({ ...doctorData, specialty: e.target.value })}
              />
            </div>

            <div>
              <label>Bio:</label>
              <textarea
                value={doctorData.bio}
                onChange={(e) => setDoctorData({ ...doctorData, bio: e.target.value })}
                rows={4}
              />
            </div>

            <button type="submit">Save Profile</button>
            <button type="button" onClick={() => navigate('/doctordashboard')} className="cancel-btn">
              Cancel
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default DoctorProfilePage;
