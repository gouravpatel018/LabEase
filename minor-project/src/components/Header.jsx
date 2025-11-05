import React, { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import logo2 from "../assets/logo2.png"
import logo from "../assets/labEase.png"
import { useSelector } from "react-redux";
import LogoutBtn from "./LogoutBtn";


function Header() {

  const authStatus = useSelector((state) => state.auth.status);

  // console.log("header: ",authStatus)
  const navigate = useNavigate();
  return (
    <>
      <div className="navbar bg-white px-2 lg:px-10 shadow-sm  border-b border-b-gray-200 fixed left-0 right-0 top-0 h-18 z-99">
        <div className="flex-1 ">
          {/* <button className="btn btn-ghost text-xl font-bold  w-20" onClick={() => navigate("/")}> */}
            <div className="w-20 cursor-pointer" onClick={() => navigate('/')}>
             <img src={logo2} className="w-full" />
            </div>
            
          {/* </button> */}
        </div>
        <div className="flex-none">
          {
            !authStatus ? (
              <ul className="menu menu-horizontal px-1 text-xl">
            <li>
              <button
              className="px-4 py-1.5 border border-red-500 text-red-500 rounded hover:bg-red-50 transition"
              
              onClick={() => navigate("/login")}>Login</button>
            </li>

            <li>
              <button
                className="ml-4 px-4 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition"
              onClick={() => navigate("/signup")}>Sign up</button>
            </li>
          </ul>
            ) : (
              <ul className="menu menu-horizontal px-1 text-xl">
            <li>
              <LogoutBtn />
            </li>
          </ul>
            )
          }
          
        </div>
      </div>
    </>
  );
}

export default Header;
