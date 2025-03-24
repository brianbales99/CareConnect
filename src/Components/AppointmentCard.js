// components/AppointmentCard.js
export function AppointmentCard({ appointment }) {
    return (
      <div className="bg-white p-4 shadow-md rounded-xl mb-4">
        <h2 className="text-lg font-semibold">{appointment.doctorName}</h2>
        <p>{appointment.date} at {appointment.time}</p>
        <p>Patient: {appointment.patientName}</p>
      </div>
    );
  }