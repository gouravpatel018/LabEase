import React from "react";
import Select from "./Select";

function AddPatientInfo({formData, setFormData}) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    })); 
  };

  const genders = ["Male", "Female", "Others"];

  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  return (
    <>
      <header className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-800">
          Select Lab Test & Pathology Lab
        </h2>
        <p className="text-gray-500 mt-2 text-base">
          Select a test to view available pathology labs near you
        </p>
      </header>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6 text-lg "
      >
        {/* Full Name */}
        <div>
          <label className="label font-semibold" htmlFor="fullName">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            placeholder="John Doe"
            className="input input-bordered w-full"
            required
            name="p_name"
            onChange={handleChange}
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="label font-semibold" htmlFor="dob">
            Age
          </label>
          <input
            type="number"
            id="dob"
            className="input input-bordered w-full"
            required
            name="p_age"
            onChange={handleChange}
          />
        </div>

        {/* Gender */}
        <div>
          <label className="label font-semibold" htmlFor="gender">
            Gender
          </label>
          <select
            name="p_gender"
            onChange={handleChange}
            className="select w-full"
          >
            <option disabled={true} value="select gender">Select gender</option>
            {genders.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </div>

        {/* Phone Number */}
        <div>
          <label className="label font-semibold" htmlFor="phone">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            placeholder="9876543210"
            name="p_contact"
            onChange={handleChange}
            // onInput={(e) =>
            //   (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
            // }
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Email Address */}
        <div>
          <label className="label font-semibold" htmlFor="pincode">
            Pincode
          </label>
          <input
            type="number"
            id="pincode"
            name="p_pincode"
            onChange={handleChange}
            placeholder="pincode"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Address */}
        <div>
          <label className="label font-semibold" htmlFor="address">
            Address
          </label>
          <textarea
            id="address"
            name="p_add"
            onChange={handleChange}
            placeholder="Full Address"
            className="textarea textarea-bordered w-full"
            required
          ></textarea>
        </div>

        {/* Emergency Contact */}

        {/* Submit Button */}
        {/* <div className="md:col-span-2 text-right">
        <button type="submit" className="btn btn-primary mt-4">Save Patient Info</button>
      </div> */}
      </form>
    </>
  );
}

export default AddPatientInfo;
