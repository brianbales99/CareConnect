// src/Pages/DoctorDashboard.js
import React, { useEffect, useState } from 'react';
import './DoctorDashboard.css';
import { db, auth } from '../firebaseConfig';
import { collection, getDocs, updateDoc, doc, query, getDoc, where } from 'firebase/firestore';
import { DoctorHeader } from '../Components/DoctorHeader';
import PopupModal from '../Components/PopupModal';

const DoctorDashboard = () => {
  const [pendingAppointments, setPendingAppointments] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [doctorName, setDoctorName] = useState('');

  useEffect(() => {
    const fetchDoctorAndAppointments = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const doctorRef = doc(db, 'users', user.uid);
      const doctorSnap = await getDoc(doctorRef);
      if (!doctorSnap.exists()) return;

      const doctorData = doctorSnap.data();
      const fullName = `Dr. ${doctorData.lastName}`;
      setDoctorName(fullName);

      const q = query(collection(db, 'appointments'), where('doctor', '==', fullName));
      const querySnapshot = await getDocs(q);

      const pending = [];
      const approved = [];

      for (const docSnap of querySnapshot.docs) {
        const data = docSnap.data();
        const appointment = { id: docSnap.id, ...data };
        if (data.status === 'pending') {
          pending.push(appointment);
        } else if (data.status === 'approved') {
          approved.push(appointment);
        }
      }

      setPendingAppointments(pending);
      setUpcomingAppointments(approved);
    };

    fetchDoctorAndAppointments();
  }, []);

  const handleStatusUpdate = async (apptId, newStatus) => {
    await updateDoc(doc(db, 'appointments', apptId), {
      status: newStatus,
    });
    setPendingAppointments(pendingAppointments.filter((appt) => appt.id !== apptId));
    if (newStatus === 'approved') {
      const approvedAppt = pendingAppointments.find((appt) => appt.id === apptId);
      setUpcomingAppointments([...upcomingAppointments, approvedAppt]);
    }
  };

  const handleViewPatient = async (userId) => {
    try {
      const userRef = doc(db, 'users', userId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setSelectedPatient(userSnap.data());
      }
    } catch (err) {
      console.error('Failed to fetch patient profile:', err);
    }
  };

  const renderPatientLink = (app) => {
    const name = app.firstName && app.lastName ? `${app.firstName} ${app.lastName}` : app.patientName || 'Unknown';
    return (
      <span
        className="clickable-patient-name"
        onClick={() => handleViewPatient(app.userId)}
        style={{ color: '#2563eb', cursor: 'pointer', textDecoration: 'underline' }}
      >
        {name}
      </span>
    );
  };

  return (
    <>
      <DoctorHeader />

      <div className="doctor-dashboard">
        <h2>Doctor Dashboard</h2>

        <section>
          <h3>Upcoming Appointments</h3>
          {upcomingAppointments.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Date</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {upcomingAppointments.map((app) => (
                  <tr key={app.id}>
                    <td>{renderPatientLink(app)}</td>
                    <td>{app.date}</td>
                    <td>{app.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No upcoming appointments</p>
          )}
        </section>

        <section>
          <h3>Pending Appointments</h3>
          {pendingAppointments.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Requested Date</th>
                  <th>Requested Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingAppointments.map((app) => (
                  <tr key={app.id}>
                    <td>{renderPatientLink(app)}</td>
                    <td>{app.date}</td>
                    <td>{app.time}</td>
                    <td>
                      <button onClick={() => handleStatusUpdate(app.id, 'approved')}>Accept</button>{' '}
                      <button onClick={() => handleStatusUpdate(app.id, 'declined')}>Decline</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No pending appointments</p>
          )}
        </section>

        <PopupModal isOpen={!!selectedPatient} title="Patient Profile" onClose={() => setSelectedPatient(null)}>
          {selectedPatient ? (
            <div className="patient-profile">
              <p><strong>First Name:</strong> {selectedPatient.firstName}</p>
              <p><strong>Last Name:</strong> {selectedPatient.lastName}</p>
              <p><strong>Email:</strong> {selectedPatient.email}</p>
              <p><strong>Recent Medical Issue:</strong> {selectedPatient.recentMedicalIssue || 'Not specified'}</p>
            </div>
          ) : null}
        </PopupModal>
      </div>
    </>
  );
};

export default DoctorDashboard;
