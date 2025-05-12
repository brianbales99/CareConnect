// src/pages/FullSchedule.js
import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "./FullSchedule.css";
import { db, auth } from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function FullSchedule() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!auth.currentUser) return;

      const q = query(collection(db, "appointments"), where("userId", "==", auth.currentUser.uid));
      const querySnapshot = await getDocs(q);

      const fetched = querySnapshot.docs.map(doc => {
        const data = doc.data();
        const status = data.status;
        let backgroundColor = "#999";

        if (status === "pending") backgroundColor = "#f97316"; // orange
        else if (status === "approved") backgroundColor = "#22c55e"; // green
        else if (status === "declined" || status === "canceled") backgroundColor = "#ef4444"; // red

        return {
          id: doc.id,
          title: data.type || "Appointment",
          start: `${data.date}T${convertTo24Hr(data.time)}`,
          end: `${data.date}T${calculateEndTime(data.time)}`,
          backgroundColor,
          display: "block",
          extendedProps: {
            doctor: data.doctor,
            type: data.type || "General Appointment",
            status: data.status
          }
        };
      });

      setAppointments(fetched);
    };

    fetchAppointments();
  }, []);

  const convertTo24Hr = (timeStr) => {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":");

    if (modifier === "PM" && hours !== "12") hours = parseInt(hours, 10) + 12;
    if (modifier === "AM" && hours === "12") hours = "00";

    return `${hours}:${minutes}:00`;
  };

  const calculateEndTime = (timeStr) => {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":");
    hours = parseInt(hours, 10);
    minutes = parseInt(minutes, 10);

    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    minutes += 30;
    if (minutes >= 60) {
      hours += 1;
      minutes -= 60;
    }

    const pad = (n) => (n < 10 ? "0" + n : n);
    return `${pad(hours)}:${pad(minutes)}:00`;
  };

  const renderEventContent = (eventInfo) => {
    const appointment = eventInfo.event.extendedProps;

    return (
      <Tippy
        content={
          <div>
            <strong>Doctor:</strong> {appointment.doctor} <br />
            <strong>Type:</strong> {appointment.type} <br />
            <strong>Status:</strong> {appointment.status} <br />
            <strong>Time:</strong>{" "}
            {eventInfo.event.start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - {" "}
            {eventInfo.event.end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </div>
        }
      >
        <div>{eventInfo.event.title}</div>
      </Tippy>
    );
  };

  return (
    <div className="schedule-page">
      <h2 className="page-title">Full Appointment Schedule</h2>

      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={appointments}
          eventContent={renderEventContent}
          headerToolbar={{
            start: "prev",
            center: "title",
            end: "next",
          }}
          height="auto"
        />
      </div>
    </div>
  );
}
