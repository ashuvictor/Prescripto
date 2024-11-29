import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors,changeAvailability} = useContext(AdminContext);

  // Fetch doctors list when token is available
  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Doctors</h1>

      {/* Grid container for doctors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {doctors.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-200"
          >
            {/* Doctor Image */}
            <img
              src={item.image}
              alt={`${item.name}`}
              className="w-full h-48 object-cover"
            />

            {/* Doctor Info */}
            <div className="p-4">
              <p className="text-lg font-semibold text-gray-800">
                Dr. {item.name}
              </p>
              <p className="text-sm text-gray-500">{item.speciality}</p>
            </div>

            {/* Availability */}
            <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-t">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={item.available}
                  onChange={()=>{changeAvailability(item._id)}}
                  readOnly
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                />
                <p className="text-sm text-gray-600">Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
