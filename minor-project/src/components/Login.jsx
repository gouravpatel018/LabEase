import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";

function Login() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name] : e.target.value
    }))
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError("");
    try{
      const res = await axios.post("http://127.0.0.1:8000/login/", formData);

      console.log(res.data);

      const {access, refresh, user} = res.data;

      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);

      localStorage.setItem("user", JSON.stringify(user))
      dispatch(login());

      console.log("logged in as: ", user.username)

      if(user.user_type === "lab"){
        navigate('/lab-dashboard')
      } else{
        navigate('/user-dashboard');
      }
      
    }
    catch(err) {
      setError("Login Failed");
    }
  }
  return (
    <>
      {/* <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box text-2xl">
      <legend className="fieldset-legend">Login</legend>
    </fieldset> */}
      <div className="min-h-screen w-full ">
        <div className="bg-base-200 max-w-114 w-9/10 shadow-md rounded-2xl flex mx-auto justify-center border border-black/10 mt-20">
          <div className="mx-auto w-full  px-4 py-8 lg:px-6 lg:py-10 border-black/10">
            <h2 className="text-center text-2xl font-bold leading-tight">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-base text-black/60 ">
              Don&apos;t have any account? &nbsp;
              <Link
                to="/signup"
                className="font-medium text-primary transition-all duration-200 hover:underline"
              >
                Sign Up
              </Link>
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col  px-4 py-6 gap-2  max-w-7xl text-xl"
            >
              <label className="fieldset-label">Username</label>
              <input
                type="text"
                className="border rounded-md px-2 py-1 bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="username"
                name="username"
                onChange={handleChange}
              />

              <label className="fieldset-label">Password</label>
              <input
                type="password"
                className="border rounded-md px-2 py-1 bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Password"
                name="password"
                onChange={handleChange}
              />

              <button
                type="submit"
              className="btn btn-neutral mt-4">Login</button>

              {
                error && (
                  <div className="mt-4 text-red-600 border border-red-300 p-2 rounded-md text-sm">
                    {error}
                  </div>
                )
              }
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
