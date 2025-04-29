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

// 🛠️ Custom toolbar: show only Month + Year
function CustomToolbar({ label }) {
  return (
    <div style={{ textAlign: "center", fontSize: "1.5rem", margin: "1rem 0", fontWeight: "bold" }}>
      {label}
    </div>
  );
}

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
            views={['month']}
            defaultView="month"
            components={{
              toolbar: CustomToolbar, // 🛠 use your custom toolbar
            }}
            style={{ height: "100%" }}
          />
        </div>
      </div>

    </>
  );
}
