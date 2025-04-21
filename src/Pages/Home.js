// src/pages/Home.js
import React from "react";
import { Header } from "../Components/Header.js";
import { Footer } from "../Components/Footer.js";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const upcomingAppointments = [
    { id: 1, date: "2025-04-18", time: "10:00 AM", doctor: "Dr. Smith" },
    { id: 2, date: "2025-04-20", time: "2:00 PM", doctor: "Dr. Lee" },
  ];

  return (
    <>

      <div className="home-container">
        <h1 className="home-heading">Welcome to CareConnect</h1>
        <p className="home-subheading">
          Your trusted healthcare appointment scheduling system.
        </p>

        <div className="home-button-group mb-8">
          <Link to="/appointments/book" className="home-button-book">
            Book Appointment
          </Link>
          <Link to="/appointments/cancel" className="home-button-cancel">
            Cancel Appointment
          </Link>
          <Link to="/appointments/modify" className="home-button-modify">
            Modify Appointment
          </Link>
        </div>

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

        {/* Centered Full Schedule Button */}
        <div className="home-schedule-wrapper">
          <Link to="/appointments/schedule" className="home-button-full-schedule">
            View Full Schedule
          </Link>
        </div>
      </div>
    </>
  );
}
