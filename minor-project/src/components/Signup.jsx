import React, { useState } from "react";
import Container from "./Container/Container";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    address: "",
    pincode: "",
    date_of_birth: "",
    user: {
      username: "",
      email: "", 
      password: ""
    }
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const {name, value} = e.target;
    if(name.startsWith('user.')){
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        user: {
          ...prev.user,
          [field]: value,
        }
      }));
    } else{
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const res = await axios.post("http://127.0.0.1:8000/users/register/", formData);
      console.log(res.data)
      
      if (res.data.message === "Customer registered successfully!") {
        setMessage("Signup successfully");
        navigate("/login");
      } else{
        navigate('/')
      }
    } catch (e) {
      setError("Signup failed");
    }
  };
  return (
    <>
      <div className="min-h-screen w-full">
        <div className="bg-base-200 max-w-lg w-9/10  shadow-md rounded-2xl flex mx-auto justify-center border border-black/10 mt-20">
          <div className="mx-auto w-full px-4 py-8 lg:px-10 lg:py-12 border-black/10">
            <h2 className="text-center text-2xl font-bold leading-tight">
              Sign up to create your account
            </h2>
            <p className="mt-2 text-center text-base text-black/60 ">
              Already have an account? &nbsp;
              <Link
                to="/login"
                className="font-medium text-primary transition-all duration-200 hover:underline"
              >
                Login
              </Link>
            </p>
            <form
              action=""
              className="flex flex-col  px-4 py-6 gap-2  max-w-7xl text-xl"
              onSubmit={handleSubmit}
            >
              <label className="fieldset-label">Name</label>
              <input
                type="text"
                className="border rounded-md px-2 py-1 bg-white text-gray-700 placeholder-gray-500"
                placeholder="Full Name"
                name="full_name"
                onChange={handleChange}
              />
              <label className="fieldset-label">Email</label>
              <input
                type="email"
                className="border rounded-md px-2 py-1 bg-white text-gray-700 placeholder-gray-500"
                placeholder="Email"
                name="email"
                onChange={handleChange}
              />
              <label className="fieldset-label">Username</label>
              <input
                type="text"
                className="border rounded-md px-2 py-1 bg-white text-gray-700 placeholder-gray-500"
                placeholder="username"
                name="username"
                onChange={handleChange}
              />
              <label className="fieldset-label">Password</label>
              <input
                type="password"
                className="border rounded-md px-2 py-1 bg-white text-gray-700 placeholder-gray-500"
                placeholder="Password"
                name="password"
                onChange={handleChange}
              />
              
              <label className="fieldset-label">Address</label>
              <input
                type="address"
                className="border rounded-md px-2 py-1 bg-white text-gray-700 placeholder-gray-500"
                placeholder="Address"
                name="address"
                onChange={handleChange}
              />
              <label className="fieldset-label">Pincode</label>
              <input
                type="number"
                className="border rounded-md px-2 py-1 bg-white text-gray-700 placeholder-gray-500"
                placeholder="pincode"
                name="pincode"
                onChange={handleChange}
              />
              <label className="fieldset-label">DOB</label>
              <input
                type="date"
                className="border rounded-md px-2 py-1 bg-white text-gray-700 placeholder-gray-500"
                placeholder="Date of birth"
                name="date_of_birth"
                onChange={handleChange}
              />
              <button type="submit" className="btn btn-neutral mt-4">Sign up</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
