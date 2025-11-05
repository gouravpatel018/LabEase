import React, { useEffect, useState } from 'react'
import axios from 'axios'

function TotalAppointmentsLab() {
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/labs/requests/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    .then(res => {
      setAppointments(res.data)
    })
    .catch(e => console.log(e))
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 px-10 py-6">
      <h2 className="text-2xl font-bold mb-6">All Lab Appointments</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {appointments.map((req, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <p><strong>Patient:</strong> {req.p_name}</p>
            <p><strong>Age:</strong> {req.p_age}</p>
            <p><strong>Test:</strong> {req.test_type}</p>
            <p><strong>Address:</strong> {req.p_add}</p>
            <p><strong>Appointment Date:</strong> {req.p_date}</p>
            <p><strong>Status:</strong> <span className={`font-semibold ${req.status === "accepted" ? "text-green-600" : "text-yellow-600"}`}>{req.status}</span></p>
            <p><strong>Payment:</strong> {req.payment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TotalAppointmentsLab
