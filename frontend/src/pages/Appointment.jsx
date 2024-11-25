import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const Appointment = () => {
  const { docId } = useParams(); // Get the doctor's ID from the URL parameters
  const { doctors, currencySymbol } = useContext(AppContext); // Access doctors and currency symbol from the context
  const [docInfo, setDocInfo] = useState(null); // Store doctor's information
  const [docSlots, setDocSlots] = useState([]); // Store available slots for the doctor
  const [slotIndex, setSlotIndex] = useState(0); // Index of the selected day
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null); // Store the selected time slot
  const daysOfTheWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]; // Array for day names

  // Fetch doctor information based on the ID
  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo); // Set the doctor's information in state
  };

  // Fetch doctor info when component mounts or when `doctors` or `docId` changes
  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  // Generate available time slots for the doctor
  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  const getAvailableSlots = async () => {
    setDocSlots([]); // Clear previous slots
    const today = new Date(); // Get the current date

    for (let i = 1; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i); // Set the date for each iteration
      const endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0); // End time for slots is 9:00 PM

      if (i === 0) {
        // If today, adjust the start time based on the current time
        currentDate.setHours(Math.max(currentDate.getHours() + 1, 10));
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        // For future days, start at 10:00 AM
        currentDate.setHours(10, 0, 0, 0);
      }

      const timeSlots = [];
      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
        timeSlots.push({
          datetime: new Date(currentDate), // Store the datetime object
          time: formattedTime, // Store the formatted time as a string
        });

        currentDate.setMinutes(currentDate.getMinutes() + 30); // Increment by 30 minutes
      }
      setDocSlots((prev) => [...prev, timeSlots]); // Add the slots for the day to the state
    }
  };

  return (
    docInfo && (
      <div>
        {/* Doctor Information Section */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              src={docInfo.image}
              alt=""
              className="bg-primary w-full sm:max-w-72 rounded-lg"
            />
          </div>
          <div className="flex-1 border border-gray-300 rounded-lg p-8 bg-white shadow-md">
            <p className="flex items-center gap-2 font-medium text-gray-900 text-2xl">
              {docInfo.name}
              <img src={assets.verified_icon} alt="" className="w-5" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {docInfo.experience} years
              </button>
            </div>
            <div>
              <p className="flex items-center gap-2 text-sm font-medium text-gray-900 mt-6">
                About
                <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-400 mt-1">{docInfo.about}</p>
            </div>
            <p className="mt-4">
              Appointment Fee {currencySymbol}
              <span>{docInfo.fees}</span>
            </p>
          </div>
        </div>

        {/* Booking Slots Section */}
        <div className="sm:ml-72 sm:pl-4 mt-6 font-medium text-gray-800">
          <p className="mb-4">Booking Slots</p>
          <div className="flex gap-4 items-center w-full overflow-x-auto scrollbar-hide">
            {docSlots.length &&
              docSlots.map((daySlots, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center justify-center py-3 px-5 rounded-full cursor-pointer border transition-all duration-300 ${
                    slotIndex === index
                      ? "bg-blue-500 text-white border-blue-500"
                      : "border-gray-400 text-gray-800"
                  }`}
                  onClick={() => {
                    setSlotIndex(index);
                    setSelectedTimeSlot(null); // Reset selected time slot
                  }}
                >
                  <p className="text-sm font-semibold">
                    {daySlots[0] &&
                      daysOfTheWeek[daySlots[0].datetime.getDay()]}
                  </p>
                  <p className="text-lg font-medium">
                    {daySlots[0] && daySlots[0].datetime.getDate()}
                  </p>
                </div>
              ))}
          </div>

          {/* Time Slots for Selected Day */}
          <div className="flex items-center gap-3 overflow-x-scroll mt-4">
            {docSlots.length &&
              docSlots[slotIndex].map((item, index) => (
                <p
                  onClick={() => setSelectedTimeSlot(item.time)}
                  key={index}
                  className={`text-sm font-light flex-shrink-0 px-5 py-5 rounded-full cursor-pointer ${
                    selectedTimeSlot === item.time
                      ? "bg-primary text-white"
                      : "text-gray-500 border border-gray-400"
                  }`}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>
          <button className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6">Book an Appointment</button>
        </div>
      </div>
    )
  );
};

export default Appointment;
