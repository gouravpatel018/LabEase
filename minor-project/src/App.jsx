import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "./store/authSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if(token) {
      dispatch(login())
    }
  }, [])
  return (
    <>
      <div className="text-2xl text-black">
        <Header />
        <main className="flex items-center justify-center mt-18 bg-white">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
