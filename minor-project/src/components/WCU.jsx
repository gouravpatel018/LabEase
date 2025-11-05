import React from 'react'

function WCU() {
  const features = [
    { icon: "🧪", title: "Home Sample Collection" },
    { icon: "🔒", title: "Secure Digital Reports" },
    { icon: "🏥", title: "Trusted Partner Labs" },
    { icon: "🕒", title: "Flexible Time Slots" },
    { icon: "💰", title: "Affordable Packages" },
    { icon: "📱", title: "Book Anytime, Anywhere" },
  ];

  return (
    <section className="py-20 px-4 bg-[#f44336] text-center rounded-t-[40px] ">
      <h2 className="text-3xl font-bold mb-10 text-black">Why Choose Us?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-gray-50 hover:outline hover:outline-black/10 p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
          >
            <div className="text-4xl bg-blue-200 text-blue-600 w-20 h-20 flex items-center justify-center rounded-full mb-4">
              {feature.icon}
            </div>
            <p className="text-lg font-bold text-gray-700">{feature.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WCU