// src/pages/Home.js
import React, { useState } from "react";
import { Header } from "../Components/Header.js";
import { Footer } from "../Components/Footer.js";
import PopupModal from "../Components/PopupModal";
import "./Home.css";

export default function Home() {
  const [showBookModal, setShowBookModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showModifyModal, setShowModifyModal] = useState(false);

  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);

  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  const upcomingAppointments = [
    { id: 1, date: "2025-04-18", time: "10:00 AM", doctor: "Dr. Smith" },
    { id: 2, date: "2025-04-20", time: "2:00 PM", doctor: "Dr. Lee" },
  ];

  const doctors = ["Dr. Smith", "Dr. Lee", "Dr. Johnson", "Dr. Kim"];
  const timeslots = [
    "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  const handleCancelClick = (appt) => {
    setAppointmentToCancel(appt);
    setShowCancelConfirm(true);
  };

  const confirmCancel = () => {
    alert(`Appointment with ${appointmentToCancel.doctor} on ${appointmentToCancel.date} canceled!`);
    setShowCancelConfirm(false);
    setAppointmentToCancel(null);
  };

  return (
    <>

      <div className="home-container">
        <h1 className="home-heading">Welcome to CareConnect</h1>
        <p className="home-subheading">
          Your trusted healthcare appointment scheduling system.
        </p>

        {/* Appointment Action Buttons */}
        <div className="home-button-group mb-8">
          <button onClick={() => setShowBookModal(true)} className="home-button-book">
            Book Appointment
          </button>
          <button onClick={() => setShowCancelModal(true)} className="home-button-cancel">
            Cancel Appointment
          </button>
          <button onClick={() => setShowModifyModal(true)} className="home-button-modify">
            Modify Appointment
          </button>
        </div>

        {/* Upcoming Appointments */}
        <div className="upcoming-appointments">
          <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
          {upcomingAppointments.length === 0 ? (
            <p>No upcoming appointments.</p>
          ) : (
            <ul className="space-y-2">
              {upcomingAppointments.map((appt) => (
                <li key={appt.id}>
                  <strong>{appt.date}</strong> at {appt.time} with {appt.doctor}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Full Schedule Button */}
        <div className="home-schedule-wrapper">
          <a href="/appointments/schedule" className="home-button-full-schedule">
            View Full Schedule
          </a>
        </div>
      </div>

      {/* Popup Modals */}

      {/* Book Appointment */}
      <PopupModal
        isOpen={showBookModal}
        title="Book Appointment"
        onClose={() => setShowBookModal(false)}
      >
        <form>
          <div>
            <label>Select Doctor:</label><br />
            <select>
              {doctors.map((doctor, idx) => (
                <option key={idx} value={doctor}>{doctor}</option>
              ))}
            </select>
          </div>
          <br />
          <div>
            <label>Select Time:</label><br />
            <select>
              {timeslots.map((time, idx) => (
                <option key={idx} value={time}>{time}</option>
              ))}
            </select>
          </div>
          <br />
          <input type="date" /><br /><br />
          <button type="submit">Confirm Booking</button>
        </form>
      </PopupModal>

      {/* Cancel Appointment */}
      <PopupModal
        isOpen={showCancelModal}
        title="Cancel Appointment"
        onClose={() => {
          setShowCancelModal(false);
          setShowCancelConfirm(false);
          setAppointmentToCancel(null);
        }}
      >
        {!showCancelConfirm ? (
          <>
            <p>Click an appointment to cancel it:</p>
            <ul className="space-y-2">
              {upcomingAppointments.map((appt) => (
                <li key={appt.id}>
                  <button
                    style={{
                      backgroundColor: "#dc2626",
                      color: "white",
                      border: "none",
                      padding: "10px 15px",
                      borderRadius: "5px",
                      marginTop: "10px",
                      cursor: "pointer",
                      width: "100%"
                    }}
                    onClick={() => handleCancelClick(appt)}
                  >
                    {appt.date} at {appt.time} with {appt.doctor}
                  </button>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <p>Are you sure you want to cancel this appointment?</p>
            <strong>{appointmentToCancel?.date} at {appointmentToCancel?.time} with {appointmentToCancel?.doctor}</strong>
            <br /><br />
            <button
              onClick={confirmCancel}
              style={{
                backgroundColor: "#ef4444",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                marginRight: "10px",
                cursor: "pointer"
              }}
            >
              Yes, Cancel
            </button>
            <button
              onClick={() => setShowCancelConfirm(false)}
              style={{
                backgroundColor: "#6b7280",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              No, Go Back
            </button>
          </>
        )}
      </PopupModal>

      {/* Modify Appointment */}
      <PopupModal
        isOpen={showModifyModal}
        title="Modify Appointment"
        onClose={() => {
          setShowModifyModal(false);
          setSelectedAppointmentId(null);
          setNewDate("");
          setNewTime("");
        }}
      >
        {!selectedAppointmentId ? (
          <>
            <p>Select an appointment to modify:</p>
            <ul className="space-y-2">
              {upcomingAppointments.map((appt) => (
                <li key={appt.id}>
                  <button
                    style={{
                      backgroundColor: "#facc15",
                      color: "black",
                      border: "none",
                      padding: "10px 15px",
                      borderRadius: "5px",
                      marginTop: "10px",
                      cursor: "pointer",
                      width: "100%"
                    }}
                    onClick={() => setSelectedAppointmentId(appt.id)}
                  >
                    {appt.date} at {appt.time} with {appt.doctor}
                  </button>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <form style={{ marginTop: "20px" }}>
            <label>New Date:</label><br />
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
            /><br /><br />

            <label>New Time:</label><br />
            <select value={newTime} onChange={(e) => setNewTime(e.target.value)}>
              <option value="">Select Time</option>
              {timeslots.map((time, idx) => (
                <option key={idx} value={time}>{time}</option>
              ))}
            </select><br /><br />

            <button type="submit">Confirm Modification</button>
          </form>
        )}
      </PopupModal>

    </>
  );
}
