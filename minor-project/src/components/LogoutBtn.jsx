import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout as authLogout } from "../store/authSlice";

function logoutBtn() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");
        if(!localStorage.getItem("access_token")){
            dispatch(authLogout());
            navigate('/login');
        }
    }
  return (
    <button
      className="ml-4 px-4 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}

export default logoutBtn;
