import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import './ProfilePage.css';

const ProfilePage = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [weight, setWeight] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [recentMedicalIssue, setRecentMedicalIssue] = useState('');

  const navigate = useNavigate();

  // Fetch user profile on load
  useEffect(() => {
    const fetchUserProfile = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        setEmail(userData.email || '');
        setFirstName(userData.firstName || '');
        setLastName(userData.lastName || '');
        setWeight(userData.weight || '');
        setBloodGroup(userData.bloodGroup || '');
        setRecentMedicalIssue(userData.recentMedicalIssue || '');
      }
    };

    fetchUserProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = auth.currentUser;
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        weight,
        bloodGroup,
        recentMedicalIssue
      });

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-page">
        <h2>User Profile</h2>
        <form onSubmit={handleSubmit}>

          <div>
            <label>First Name:</label>
            <input type="text" value={firstName} disabled />
          </div>

          <div>
            <label>Last Name:</label>
            <input type="text" value={lastName} disabled />
          </div>

          <div>
            <label>Email:</label>
            <input type="email" value={email} disabled />
          </div>

          <div>
            <label>Weight:</label>
            <input
              type="text"
              placeholder="Enter your weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Blood Group:</label>
            <select
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              required
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>

          <div>
            <label>Recent Medical Issue:</label>
            <textarea
              placeholder="Describe any recent issues..."
              value={recentMedicalIssue}
              onChange={(e) => setRecentMedicalIssue(e.target.value)}
              required
            />
          </div>

          <button type="submit">Save Profile</button>
          <button
            type="button"
            onClick={handleCancel}
            className="cancel-btn"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
