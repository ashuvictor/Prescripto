import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const RelatedDoctors = ({ docId, speciality }) => {
  const { doctors } = useContext(AppContext); // Fetch doctors from context
  const [relDoc, setRelDoc] = useState([]); // State for related doctors
  const navigate = useNavigate(); // Navigation function

  // Filter related doctors based on speciality and excluding the current doctor
  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && docId !== doc._id
      );
      setRelDoc(doctorsData); // Set related doctors in state
    }
  }, [doctors, speciality, docId]);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Top Doctors To Book</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-sm gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {relDoc.slice(0, 5).map((item, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              window.scrollTo(0, 0); // Scroll to top after navigating
            }}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-transform duration-500"
          >
            <img src={item.image} alt="" className="bg-blue-50 w-full h-40 object-cover" />
            <div className="p-4">
              <div className="flex items-center gap-2 text-center text-sm text-green-500">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <p>Available</p>
              </div>
              <p className="text-gray-900 text-lg font-medium mt-2">{item.name}</p>
              <p className="text-gray-500 text-sm mt-1">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10"
        onClick={() => {
          navigate("/doctors");
          window.scrollTo(0, 0); // Scroll to top
        }}
      >
        More...
      </button>
    </div>
  );
};

export default RelatedDoctors;
