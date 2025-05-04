// src/pages/Home.js
import React, { useState, useEffect } from "react";
import { db, auth } from "../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  updateDoc,
  doc,
} from "firebase/firestore";
import PopupModal from "../Components/PopupModal";
import "./Home.css";

export default function Home() {
  const [showBookModal, setShowBookModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);

  const doctors = ["Dr. Smith", "Dr. Lee", "Dr. Johnson", "Dr. Kim"];
  const timeslots = [
    "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  // Fetch Appointments
  const fetchAppointments = async () => {
    const q = query(
      collection(db, "appointments"),
      where("userId", "==", auth.currentUser.uid),
      where("status", "!=", "canceled"),
      orderBy("date")
    );
    const querySnapshot = await getDocs(q);
    const fetched = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setAppointments(fetched);
  };

  useEffect(() => {
    if (auth.currentUser) {
      fetchAppointments();
    }
  }, []);

  // Book Appointment
  const handleBook = async (e) => {
    e.preventDefault();
    const form = e.target;
    const doctor = form.doctor.value;
    const time = form.time.value;
    const date = form.date.value;

    await addDoc(collection(db, "appointments"), {
      userId: auth.currentUser.uid,
      doctor,
      date,
      time,
      status: "approved",
    });

    setShowBookModal(false);
    fetchAppointments();
  };

  // Cancel Appointment
  const handleCancel = async (appt) => {
    await updateDoc(doc(db, "appointments", appt.id), {
      status: "canceled",
    });
    setAppointmentToCancel(null);
    setShowCancelModal(false);
    fetchAppointments();
  };

  // Modify Appointment
  const handleModify = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, "appointments", selectedAppointment.id), {
      date: newDate,
      time: newTime,
    });
    setSelectedAppointment(null);
    setShowModifyModal(false);
    fetchAppointments();
  };

  // Get next 3 appointments
  const upcomingAppointments = appointments.slice(0, 3);

  return (
    <div className="home-container">
      <h1 className="home-heading">Welcome to CareConnect</h1>
      <p className="home-subheading">Your trusted healthcare appointment scheduling system.</p>

      <div className="home-button-group mb-8">
        <button onClick={() => setShowBookModal(true)} className="home-button-book">Book Appointment</button>
        <button onClick={() => setShowCancelModal(true)} className="home-button-cancel">Cancel Appointment</button>
        <button onClick={() => setShowModifyModal(true)} className="home-button-modify">Modify Appointment</button>
      </div>

      <div className="upcoming-appointments">
        <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
        {upcomingAppointments.length === 0 ? (
          <p>No upcoming appointments.</p>
        ) : (
          <ul className="space-y-2">
            {upcomingAppointments.map((appt) => (
              <li key={appt.id}><strong>{appt.date}</strong> at {appt.time} with {appt.doctor}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="home-schedule-wrapper">
        <a href="/appointments/schedule" className="home-button-full-schedule">View Full Schedule</a>
      </div>

      {/* Book Appointment Modal */}
      <PopupModal isOpen={showBookModal} title="Book Appointment" onClose={() => setShowBookModal(false)}>
        <form onSubmit={handleBook}>
          <label>Select Doctor:</label><br />
          <select name="doctor" required>{doctors.map(d => <option key={d}>{d}</option>)}</select><br /><br />

          <label>Select Time:</label><br />
          <select name="time" required>{timeslots.map(t => <option key={t}>{t}</option>)}</select><br /><br />

          <input type="date" name="date" required /><br /><br />
          <button type="submit">Confirm Booking</button>
        </form>
      </PopupModal>

      {/* Cancel Appointment Modal */}
      <PopupModal isOpen={showCancelModal} title="Cancel Appointment" onClose={() => setShowCancelModal(false)}>
        <p>Click an appointment to cancel:</p>
        <ul>
          {appointments.map(appt => (
            <li key={appt.id}>
              <button onClick={() => handleCancel(appt)}>{appt.date} at {appt.time} with {appt.doctor}</button>
            </li>
          ))}
        </ul>
      </PopupModal>

      {/* Modify Appointment Modal */}
      <PopupModal isOpen={showModifyModal} title="Modify Appointment" onClose={() => setShowModifyModal(false)}>
        {!selectedAppointment ? (
          <>
            <p>Select appointment to modify:</p>
            <ul>
              {appointments.map(appt => (
                <li key={appt.id}>
                  <button onClick={() => setSelectedAppointment(appt)}>{appt.date} at {appt.time} with {appt.doctor}</button>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <form onSubmit={handleModify}>
            <label>New Date:</label><br />
            <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} required /><br /><br />

            <label>New Time:</label><br />
            <select value={newTime} onChange={(e) => setNewTime(e.target.value)} required>
              <option value="">Select Time</option>
              {timeslots.map(t => <option key={t} value={t}>{t}</option>)}
            </select><br /><br />

            <button type="submit">Confirm Modification</button>
          </form>
        )}
      </PopupModal>
    </div>
  );
}
