// src/ProfilePage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ProfilePage = () => {
    const [weight, setWeight] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [recentMedicalIssue, setRecentMedicalIssue] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log({ weight, bloodGroup, recentMedicalIssue });
    };

    const handleCancel = () => {
        console.log("Cancel button clicked"); // Debugging log
        navigate('/'); // Navigate to the desired route
     };

    return (
        <div className="profile-page">
            <h2>User Profile</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        placeholder="Enter your first name"
                        required
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        placeholder="Enter your last name"
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div>
                    <label>Weight:</label>
                    <input
                        type="text"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Blood Group:</label>
                    <select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} required>
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
                        value={recentMedicalIssue}
                        onChange={(e) => setRecentMedicalIssue(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Save Profile</button>
                <button type="button" onClick={handleCancel} className="cancel-btn">Cancel</button> {/* Cancel button */}
            </form>
        </div>
    );
};

export default ProfilePage;