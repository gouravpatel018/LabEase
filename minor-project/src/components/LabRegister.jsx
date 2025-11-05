import axios from "axios";
import React , {useState} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function LabRegister() {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    lab_name: "",
    email: "",
    username: "",
    password: "",
    user_type:"",
    lab_id: "",
    lab_location:"",
    lab_pincode:"",
    lab_open: "",
    lab_close: ""
  });

   const [error, setError] = useState("");
    const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData(prev => ({
        ...prev,
        [e.target.name]: e.target.value
      }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    console.log("formdata: ",formData)
    try{
        const res = await axios.post("http://127.0.0.1:8000/labs/register/", formData)

        console.log(res.data);

        if (res.data.lab_id) {
            setMessage("Signup successfully");
            navigate("/login");
          } else{
            navigate('/')
          }

    } 
    catch (e) {
        setError("Signup failed");
    }
  }
  return (
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
            <label className="fieldset-label">Email</label>
            <input
              type="email"
              className="border rounded-md px-2 py-1 bg-white text-gray-700 placeholder-gray-500"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />

<label className="fieldset-label">User type</label>
            <input
              type="text"
              className="border rounded-md px-2 py-1 bg-white text-gray-700 placeholder-gray-500"
              placeholder="eg. Lab"
              name="user_type"
              onChange={handleChange}
            />

            <label className="fieldset-label">Lab Name</label>
            <input
              type="text"
              className="border rounded-md px-2 py-1 bg-white text-gray-700 placeholder-gray-500"
              placeholder="Lab name"
              name="lab_name"
              onChange={handleChange}
            />
            
            
            <label className="fieldset-label">Lab Id</label>
            <input
              type="text"
              className="border rounded-md px-2 py-1 bg-white text-gray-700 placeholder-gray-500"
              placeholder="lab id"
              name="lab_id"
              onChange={handleChange}
            />
            <label className="fieldset-label">Lab location</label>
            <input
              type="address"
              className="border rounded-md px-2 py-1 bg-white text-gray-700 placeholder-gray-500"
              placeholder="location"
              name="lab_location"
              onChange={handleChange}
            />
            <label className="fieldset-label">Lab pincode</label>
            <input
              type="number"
              maxLength={6}
              className="border rounded-md px-2 py-1 bg-white text-gray-700 placeholder-gray-500"
              placeholder="pin code"
              name="lab_pincode"
              onChange={handleChange}
            />
            <label className="fieldset-label">Lab opening time</label>
            <input
              type="time"
              className="border rounded-md px-2 py-1 bg-white text-gray-700 placeholder-gray-500"
              placeholder="eg. 9 am"
              name="lab_open"
              onChange={handleChange}
            />
            <label className="fieldset-label">Lab closing time</label>
            <input
              type="time"
              className="border rounded-md px-2 py-1 bg-white text-gray-700 placeholder-gray-500"
              placeholder="eg. 9 am"
              name="lab_close"
              onChange={handleChange}
            />
            <button type="submit" className="btn btn-neutral mt-4">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LabRegister;
