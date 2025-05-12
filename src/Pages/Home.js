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
  const [doctorList, setDoctorList] = useState([]);
  const [availableTimeslots, setAvailableTimeslots] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const allTimeslots = [
    "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

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

  const fetchDoctors = async () => {
    const q = query(collection(db, "users"), where("role", "==", "doctor"));
    const snapshot = await getDocs(q);
    const fetchedDoctors = snapshot.docs.map(doc => {
      const data = doc.data();
      return `Dr. ${data.lastName}`;
    });
    setDoctorList(fetchedDoctors);
  };

  const fetchUnavailableTimes = async (doctor, date) => {
    const q = query(
      collection(db, "appointments"),
      where("doctor", "==", doctor),
      where("date", "==", date),
      where("status", "in", ["pending", "approved"])
    );
    const snapshot = await getDocs(q);
    const takenTimes = snapshot.docs.map(doc => doc.data().time);
    const available = allTimeslots.filter(t => !takenTimes.includes(t));
    setAvailableTimeslots(available);
  };

  useEffect(() => {
    if (auth.currentUser) {
      fetchAppointments();
      fetchDoctors();
    }
  }, []);

  useEffect(() => {
    if (selectedDoctor && selectedDate) {
      fetchUnavailableTimes(selectedDoctor, selectedDate);
    }
  }, [selectedDoctor, selectedDate]);

  const handleBook = async (e) => {
    e.preventDefault();
    const form = e.target;
    const doctor = form.doctor.value;
    const time = form.time.value;
    const date = form.date.value;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;

    await addDoc(collection(db, "appointments"), {
      userId: auth.currentUser.uid,
      doctor,
      date,
      time,
      status: "pending",
      patientName: `${firstName} ${lastName}`,
    });

    setShowBookModal(false);
    fetchAppointments();
  };

  const handleCancel = async (appt) => {
    await updateDoc(doc(db, "appointments", appt.id), {
      status: "canceled",
    });
    setAppointmentToCancel(null);
    setShowCancelModal(false);
    fetchAppointments();
  };

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

  const requestedAppointments = appointments.filter(a => a.status === "pending").slice(0, 3);
  const acceptedAppointments = appointments.filter(a => a.status === "approved").slice(0, 3);

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
        <h2 className="text-xl font-semibold mb-4">Requested Appointments</h2>
        {requestedAppointments.length === 0 ? (
          <p>No pending appointments.</p>
        ) : (
          <ul className="space-y-2">
            {requestedAppointments.map((appt) => (
              <li key={appt.id}><strong>{appt.date}</strong> at {appt.time} with {appt.doctor}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="upcoming-appointments">
        <h2 className="text-xl font-semibold mb-4">Accepted Appointments</h2>
        {acceptedAppointments.length === 0 ? (
          <p>No accepted appointments.</p>
        ) : (
          <ul className="space-y-2">
            {acceptedAppointments.map((appt) => (
              <li key={appt.id}><strong>{appt.date}</strong> at {appt.time} with {appt.doctor}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="home-schedule-wrapper">
        <a href="/appointments/schedule" className="home-button-full-schedule">View Full Schedule</a>
      </div>
      <div className="home-schedule-wrapper">
        <a href="/doctors" className="home-button-full-schedule">View All Doctors</a>
      </div>

      <PopupModal isOpen={showBookModal} title="Book Appointment" onClose={() => setShowBookModal(false)}>
        <form onSubmit={handleBook}>
          <label>First Name:</label><br />
          <input name="firstName" required /><br /><br />

          <label>Last Name:</label><br />
          <input name="lastName" required /><br /><br />

          <label>Select Doctor:</label><br />
          <select
            name="doctor"
            required
            onChange={(e) => setSelectedDoctor(e.target.value)}
          >
            <option value="">-- Select Doctor --</option>
            {doctorList.map(d => <option key={d} value={d}>{d}</option>)}
          </select><br /><br />

          <label>Select Date:</label><br />
          <input
            type="date"
            name="date"
            required
            onChange={(e) => setSelectedDate(e.target.value)}
          /><br /><br />

          <label>Select Time:</label><br />
          <select name="time" required>
            {availableTimeslots.map(t => <option key={t} value={t}>{t}</option>)}
          </select><br /><br />

          <button type="submit">Confirm Booking</button>
        </form>
      </PopupModal>

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

      <PopupModal isOpen={showModifyModal} title="Modify Appointment" onClose={() => setShowModifyModal(false)}>
        {!selectedAppointment ? (
          <>
            <p>Select appointment to modify:</p>
            <ul>
              {appointments.filter(a => a.status !== "approved").map(appt => (
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
              {allTimeslots.map(t => <option key={t} value={t}>{t}</option>)}
            </select><br /><br />

            <button type="submit">Confirm Modification</button>
          </form>
        )}
      </PopupModal>
    </div>
  );
}
