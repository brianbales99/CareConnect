import React from 'react';
import './DoctorDashboard.css';

const DoctorDashboard = () => {
    
    const upcomingAppointments = [
        { id: 1, patientName: 'Brian Bales', date: '2025-06-01', time: '10:00 AM' },
        { id: 2, patientName: 'Jane Smith', date: '2025-06-02', time: '02:00 PM' },
    ];

    const pendingAppointments = [
        { id: 3, patientName: 'Afnan Khan', requestedDate: '2025-06-05', requestedTime: '11:00 AM' },
        { id: 4, patientName: 'Tarique Mehtab', requestedDate: '2025-06-06', requestedTime: '01:00 PM' },
    ];

    return (
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
                            {upcomingAppointments.map(app => (
                                <tr key={app.id}>
                                    <td>{app.patientName}</td>
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
                            </tr>
                        </thead>
                        <tbody>
                            {pendingAppointments.map(app => (
                                <tr key={app.id}>
                                    <td>{app.patientName}</td>
                                    <td>{app.requestedDate}</td>
                                    <td>{app.requestedTime}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No pending appointments</p>
                )}
            </section>
        </div>
    );
};

export default DoctorDashboard;
