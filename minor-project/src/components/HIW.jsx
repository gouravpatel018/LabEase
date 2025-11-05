import React from "react";
import labImg from "../assets/lab.png";
import book from "../assets/book.png";
function HIW() {
  const steps = [
    {
      title: "Step 1",
      src: labImg,
      description:
        "Browse a wide range of lab tests available across various pathology labs and select the one that fits your needs.",
    },
    {
      title: "Step 2",
      src: book,
      description:
        "Choose your preferred date and time slot for sample collection right from the comfort of your home.",
    },
    {
      title: "Step 3",
      src: labImg,
      description:
        "Get samples collected at your doorstep by a certified lab technician.",
    },
    {
      title: "Step 4",
      src: book,
      description:
        "Access your test results securely through your account and download them anytime, anywhere.",
    },
  ];

  return (
    <div className="px-4 py-12 lg:p-8">
      <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className="card shadow-md bg-base-100 hover:shadow-xl transition-all duration-300"
          >
            <div className="card-body text-center">
              <h3 className="card-title justify-center text-gray-500"><span>➤</span>{step.title}</h3>

              <img src={step.src} alt="" />
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HIW;
