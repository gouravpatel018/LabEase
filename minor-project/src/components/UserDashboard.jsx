import React, { useEffect, useState } from 'react'
import userImg from "../assets/user.png"
import DashboardCard from './user-dashboard/DashboardCard'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserDashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [requestData, setRequestData] = useState([]);
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/users/dashboard/", {
      headers : {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    .then(res => {
      setData(res.data.user)
      console.log(res.data.user)
    })
    .catch(e => console.log(e))
  }, [])

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/users/requests/", {
      headers : {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    .then(res => {
      setRequestData(res.data)
      console.log(res.data)
      console.log("requestData", requestData)
      console.log("request date: ", requestData[0])
    })
    .catch(e => console.log(e))
  }, [])

  const dashboardCards = {
    overview: [
      { title: "Total Appointments", value: requestData.length},
      { title: "Upcoming Test", value:  requestData[0]?.p_date || "Not scheduled" },
    ],
    appointments: [
      { title: "Upcoming Appointments", value: "20 april" },
      { title: "Past Appointments", value: "Blood Test (Apr 14)" },
      { title: "Appointment status", value: "Completed" },
    ],
    reports: [
      { title: "CBC Report", value: "Apr 14, 2024" },
      { title: "LFT Report", value: "Mar 30, 2024" },
    ],
    payments: [
      { title: "Total Paid", value: "₹1500" },
      { title: "Pending Amount", value: "₹500" },
    ],
    settings: [],
  };

    

  const [activeState, setActiveState] = useState("overview");

  const cardItems = dashboardCards[activeState] || [];

  return (
    <div className="min-h-screen w-full px-10 flex bg-gray-50">
      
      {/* Sidebar */}
      <aside className="w-1/4 bg-blue-300/10 p-6">
        <div className="mb-10 flex flex-col items-start">
          {/* Profile picture + name */}
          <div className="h-24 w-24 bg-gray-200 rounded-full mb-4">
            <img src={userImg} alt="user" className='w-full rounded-full' />
          </div>
          <h2 className="text-center font-semibold">{data.full_name}</h2>
          <p className="text-center text-sm text-gray-500">{data.username}</p>
          <p className="text-center text-sm text-gray-500">{data.address}</p>
          <p className="text-center text-sm text-gray-500">{data.pincode}</p>
          <p className="text-center text-sm text-gray-500">{data.date_of_birth}</p>
        </div>

        {/* Navigation */}
        <nav className="space-y-4">
          <button
            onClick={() => setActiveState("overview")}
          className="text-left cursor-pointer w-full font-medium text-orange-600">Overview</button>
          <button 
          onClick={() => setActiveState("appointments")}
          className="text-left cursor-pointer w-full text-gray-700">Appointments</button>
          <button 
            onClick={() => setActiveState("reports")}
          className="text-left cursor-pointer w-full text-gray-700 hover:underline transition-all duration-300 ">Reports</button>
          <button
            onClick={() => setActiveState("payments")}
          className="text-left cursor-pointer w-full text-gray-700">Payments</button>
          <button 
          onClick={() => setActiveState("settings")}
          className="text-left cursor-pointer w-full text-gray-700">Settings</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 space-y-6 bg-rose-50/30 ">
        
        {/* Top wide card (Welcome / overview) */}
        <section className="bg-white rounded-xl shadow p-6">
          <h1 className="text-xl font-semibold">Welcome back, {data.full_name} 👋</h1>
          <p className="text-gray-500 mt-1">Here's your health dashboard overview</p>
        </section>

        {/* Grid Section - 2x2 cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {
            cardItems.map((item) => (
              <DashboardCard key={item.title} title={item.title} value={item.value} 
              onClick={() => {
                if (item.title.toLowerCase().includes("appointment")) {
                  navigate("/appointments");
                }
              }}
              />
            ))
          }
          {/* <DashboardCard title="Total Appointments" value="12" />
          <DashboardCard title="Upcoming Test" value="Blood Test (Apr 20)" />
          <DashboardCard title="Last Report" value="CBC Report - Apr 14" /> */}
          {/* <DashboardCard title="Wallet Balance" value="₹ 500" /> */}

        </section>
        <button className="bg-red-500 hover:bg-red-600 transition duration-300 cursor-pointer text-lg px-4 py-2 rounded-md text-white w-full lg:w-fit"
              onClick={() => navigate('/book-appointment')}
            >
                Book Appointment
            
            </button>
      </main>
    </div>
  )
}

export default UserDashboard