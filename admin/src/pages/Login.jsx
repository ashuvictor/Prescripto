import React, { useContext, useState } from "react";
import { assets } from "../assets/assets.js";
import { AdminContext } from "../context/AdminContext.jsx";
import axios from "axios"
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAToken, backendUrl } = useContext(AdminContext);
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try{
      if(state === "Admin"){
        const {data} =await axios.post(backendUrl+'/api/admin/login',{email,password})
        if(data.success){
          console.log("Data token",data.token)
          localStorage.setItem('aToken',data.token)
          setAToken(data.token);
        }
        else{
          toast.error(data.message)
        }

      }
      else{
         
      }

    }catch(e){

    }

  }

  return (
    <form className="min-h-[80vh] flex items-center" onSubmit={onSubmitHandler}>
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-primary">{state}</span> Login{" "}
        </p>
        <div className="w-full">
          <p>Email</p>
          <input
            type="email"
            required
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            type="password"
            required
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button className="bg-primary text-white w-full py-2 rounded-md text-base">
          Login
        </button>
        {state === "Admin" ? (
          <p>
            Doctor Login{" "}
            <span
              onClick={() => {
                setState("Doctor");
              }}
              className="text-primary underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Admin Login{" "}
            <span
              onClick={() => {
                setState("Admin");
              }}
              className="text-primary underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
