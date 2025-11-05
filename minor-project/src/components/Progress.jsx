function Progress({steps, currentStep, bgColor, fgColor}) {
  // const steps = ["Select Test", "Date & Time", "Patient Info", "Confirm"];
  // const currentStep = 2; // change this to simulate different steps
  const stepPercentage = ((currentStep - 1 ) / (steps.length - 1 )) * 100;

  return (
    <div className="w-full px-4 py-6 ">
      <div className="relative px-2 py-4 h-20">
        {/* Background Bar */}
        <div className={`absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-2.5 ${bgColor} rounded-full z-0`} />

        {/* Foreground Progress */}
        <div
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 h-2.5 ${fgColor} rounded-full z-10 transition-all duration-300`}
          style={{ width: `${stepPercentage}%` }}
        />

        {/* Step Circles & Titles */}
        {steps.map((label, index) => {
          const isActive = index + 1 <= currentStep;
          return (
            <div
              key={index}
              className={`absolute top-0 h-20 w-1/4`}
              style={{ left: `${(index / (steps.length - 1)) * 100}%`, width: "0" }}
            >
              {/* Circle */}
              <div
                className={`absolute top-1/2 transform -translate-y-1/2 z-20 -left-1 h-8 w-8 rounded-full flex items-center justify-center text-white text-sm font-semibold ${
                  isActive ? "bg-green-600" : "bg-gray-300"
                }`}
              >
                {index + 1}
              </div>
              
              {/* Step Title */}
              <div className="absolute top-0 text-sm text-gray-700 hidden sm:block w-32 -ml-14 text-center font-bold">
                {label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Progress;
