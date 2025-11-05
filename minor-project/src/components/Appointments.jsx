import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Appointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/users/requests/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    .then(res => {
      setAppointments(res.data);
    })
    .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen w-full max-w-5xl bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-indigo-700 mb-6">Total Appointments</h1>

      <div className="grid gap-4">
        {appointments.length === 0 ? (
          <p className="text-gray-600">No appointments found.</p>
        ) : (
          appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white rounded-xl shadow p-4 flex justify-between items-center hover:shadow-md transition"
            >
              <div>
                <p className="text-lg font-semibold text-gray-800">Patient: {appointment.p_name}</p>
                <p className="text-gray-600 text-sm">Age: {appointment.p_age}</p>
                <p className="text-gray-600 text-sm">Address: {appointment.p_add}</p>
              </div>
              <div className="text-right">
                <p className="text-indigo-600 text-lg">Test Type : {appointment.test_type || "N/A"}</p>
                <p className="text-green-600">Status : {appointment.status || "Pending"}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Appointments;
