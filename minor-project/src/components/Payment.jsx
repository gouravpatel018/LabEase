import React from 'react'
import cashImg from "../assets/cod.png"
import upiImg from "../assets/upi.png"

function Payment() {
  return (
      <div className="flex flex-col items-center gap-6 p-4">
      <h2 className="text-2xl font-semibold">Payment Method</h2>
      <div className="flex gap-6">
        {/* Cash on Delivery Card */}
        <div className="cursor-pointer border border-gray-300 bg-white rounded-2xl p-6 w-60 flex flex-col items-center gap-3 shadow-md">
          <img
            src={cashImg}
            alt="Cash on Delivery"
            className="w-12 h-12"
          />
          <p className="font-bold">Cash on Delivery</p>
        </div>

        {/* UPI Card */}
        <div className="cursor-pointer border border-gray-300 bg-white rounded-2xl p-6 w-60 flex flex-col items-center gap-3 shadow-md">
          <img
            src={upiImg}
            alt="UPI"
            className="w-12 h-12"
          />
          <p className="font-bold">UPI</p>
        </div>
      </div>
    </div>
   
  )
}

export default Payment