import React, { createContext, useEffect, useState } from "react";
import { doctors } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const currencySymbol = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState([]);
  const [token,setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):"")
  const [userData,setUserData] = useState(false);

  const loadUserProfile = async () => {
    try{
      const {data} =await axios.get(backendUrl + '/api/user/get-profile',{headers:{token}})
      if(data.success){
        setUserData(data.userData)
      }else{
        toast.error(data.message)
      }

    }catch(e){
      console.log(e);
      toast.error(e.message)
    }
  }


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

  useEffect(()=>{
    if(token){
      loadUserProfile();
    }
    else{
      setUserData(false)
    }
  },[token])

  const value = {
    doctors,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,setUserData,loadUserProfile
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
