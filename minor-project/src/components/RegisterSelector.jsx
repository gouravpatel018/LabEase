import React, { useState } from "react";
import labIcon from "../assets/labIcon.png"

const RegisterSelector = ({
    setUserType
}) => {

  return (
    <div className="my-20 flex items-center justify-center  px-4">
      <div className="bg-white rounded-2xl p-6 shadow-md w-full max-w-4xl border border-black/10">
        <form className="flex flex-col md:flex-row items-center justify-center gap-6">
          {/* User Selection */}
          <label htmlFor="user" className="cursor-pointer">
            <input
              type="radio"
              name="role"
              id="user"
              className="hidden peer"
              value="user"
              onChange={(e) => setUserType(e.target.value)}
            />
            <div className="bg-gray-50 rounded-2xl p-4 w-60 flex flex-col items-center shadow peer-checked:border-2 peer-checked:border-blue-500 transition-all">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="User Icon"
                className="w-24 h-24 object-contain mb-4"
              />
              <p className="text-center text-lg font-medium">
                Register as User
              </p>
            </div>
          </label>

          {/* Lab Selection */}
          <label htmlFor="lab" className="cursor-pointer">
            <input
              type="radio"
              name="role"
              id="lab"
              className="hidden peer"
              value="lab"
              onChange={(e) => setUserType(e.target.value)}
            />
            <div className="bg-gray-50 rounded-2xl p-4 w-60 flex flex-col items-center shadow peer-checked:border-2 peer-checked:border-blue-500 transition-all">
              <img
                src={labIcon}
                alt="Lab Icon"
                className="w-24 h-24 object-contain mb-4"
              />
              <p className="text-center text-lg font-medium">Register as Lab</p>
            </div>
          </label>
        </form>
      </div>
    </div>
  );
};

export default RegisterSelector;
