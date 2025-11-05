// components/PendingRequests.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PendingRequests() {
    const navigate = useNavigate();
  const [pendingRequests, setPendingRequests] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/labs/requests/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        const pending = res.data.filter((obj) => obj.status === "pending");
        setPendingRequests(pending);
      })
      .catch((e) => console.log(e));
  }, []);

  const handleAccept = (requestId, paymentAmount) => {
    axios
      .post(
        `http://127.0.0.1:8000/labs/requests/`,
        {
          request_id: requestId,
          payment: paymentAmount,
          status: "accepted",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then(() => {
        // Remove accepted request from the state
        setPendingRequests((prev) =>
          prev.filter((req) => req.request_id !== requestId)
        );
        navigate('/lab-appointments')
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="p-10 w-full max-w-5xl">
      <h1 className="text-2xl font-bold mb-6">Pending Sample Collections</h1>
      <div className="space-y-4">
        {pendingRequests.map((req, idx) => (
          <div key={idx} className="bg-white p-4 rounded shadow">
            <p>
              <strong>Name:</strong> {req.p_name}
            </p>
            <p>
              <strong>Age:</strong> {req.p_age}
            </p>
            <p>
              <strong>Address:</strong> {req.p_add}
            </p>
            <p>
              <strong>Status:</strong> {req.status}
            </p>

            <button
              className="mt-2 bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
              onClick={() => handleAccept(req.request_id, req.payment)}
            >
              Accept Request
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PendingRequests;
