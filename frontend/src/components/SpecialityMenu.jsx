import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  console.log("***123", specialityData);

  return (
    <div id="speciality" className="flex flex-col items-center gap-4 text-gray-800 py-16">
      <h1 className="text-3xl font-medium ">Find By Speciality</h1>
      <p className="w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors, schedule
        your appointment hassle-free.
      </p>
      <div className="flex sm:justify-center gap-4 pt-5 w-full overflow-scroll">
        {specialityData.map((item, index) => (
          <Link onClick={()=>scrollTo(0,0)}key={index} to={`doctors/${item.speciality}`} className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-300">
            <img src={item.image} alt={item.speciality} className="w-16 sm:w-24 mb-2"/>
            <p>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
