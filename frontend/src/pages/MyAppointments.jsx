import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const MyAppointments = () => {
  const { doctors } = useContext(AppContext);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Title */}
      <h1 className="text-2xl font-semibold mb-6">My Appointments</h1>

      {/* Appointments List */}
      <div className="space-y-6">
        {doctors.slice(0, 3).map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg shadow-sm"
          >
            {/* Doctor Image */}
            <div>
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
            </div>

            {/* Doctor Details */}
            <div className="flex-1">
              <p className="text-lg font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">{item.speciality}</p>
              <p className="text-sm mt-2 font-semibold">Address:</p>
              <p className="text-sm text-gray-600">{item.address.line1}</p>
              <p className="text-sm text-gray-600">{item.address.line2}</p>
              <p className="text-sm mt-2">
                <span className="font-semibold">Date & Time:</span> 25, July,
                2024 | 8:30 PM
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                Pay here
              </button>
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100 transition">
                Cancel Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
