import React from "react";
import hero from "../assets/hero.png";
import Container from "./Container/Container";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();
  const authStatus = useSelector(state => state.auth.status)
  return (
    <Container>
      <div className="hero min-h-screen ">
        <div className="hero-content flex-col-reverse lg:flex-row-reverse">
          <div className="flex justify-center">
            <img
              src={hero}
              className="w-9/10 mt-8 lg:mt-0 lg:w-full max-w-sm rounded-lg shadow-2xl"
            />
          </div>

          <div className="mt-6 lg:mt-0 pr-0 lg:pr-16">
            <h1 className="text-4xl font-bold lg:text-6xl leading-tight">
              Skip the Lab Queue –{" "}
              <span className="text-red-500">Get Tested at Home!</span>
            </h1>
            <p className="py-6 text-sm lg:text-lg leading-relaxed">
              Skip the clinic wait — get professional blood tests at home,
              performed by trained experts using secure and hygienic practices
              with timely online results
            </p>
            <button className="bg-red-500 hover:bg-red-600 transition duration-300 cursor-pointer text-lg px-4 py-2 rounded-md text-white w-full lg:w-fit"
              onClick={() => {
                if(authStatus){
                  navigate('/book-appointment')
                } else{
                  navigate('/login')
                }
              }}
            >
              {
                authStatus ? "Book Appointment" : "Get Started"
              }
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Hero;
