import React, { createContext, useEffect, useState } from "react";
import { doctors } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const currencySymbol = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState([]);

  const value = {
    doctors,
    currencySymbol,
  };
  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/list");
      if (data.success) {
        setDoctors(data.doctors);
      }
      else{
        toast.error(data.message)
      }
    } catch (e) {
      console.log(e);
      toast.error(e.message)
    }
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
