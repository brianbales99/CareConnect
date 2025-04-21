// src/pages/FullSchedule.js
import React from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Header } from "../Components/Header";
import { Footer } from "../Components/Footer";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
});

// Sample appointments
const appointments = [
  {
    title: "Check-up with Dr. Smith",
    start: new Date(2025, 3, 18, 10, 0),
    end: new Date(2025, 3, 18, 10, 30),
  },
  {
    title: "Dental Cleaning with Dr. Lee",
    start: new Date(2025, 3, 20, 14, 0),
    end: new Date(2025, 3, 20, 14, 45),
  },
];

export default function FullSchedule() {
  return (
    <>
      <div className="p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Full Appointment Schedule</h2>
        <div style={{ height: "600px" }}>
        <Calendar
  localizer={localizer}
  events={appointments}
  startAccessor="start"
  endAccessor="end"
  views={['month', 'week', 'day', 'agenda']}
  defaultView="month"
  toolbar={true}
  popup={true}
  style={{ height: "100%" }}
/>

        </div>
      </div>
    </>
  );
}
