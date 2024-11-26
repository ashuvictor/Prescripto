import React, { useState } from "react";
import { assets } from "../assets/assets";

const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "Edward Vincent",
    email: "richardjameswap@gmail.com",
    phone: "+1 123 456 7890",
    address: "57th Cross, Richmond Circle, Church Road, London",
    gender: "Male",
    birthday: "20 July, 2024",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6 max-w-3xl mx-auto border rounded-xl shadow-lg bg-white">
      {/* Profile Header */}
      <div className="flex items-center gap-6">
        <img
          src={assets.profile_pic}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-gray-400 text-3xl">+</span>
        </div>
      </div>

      {/* Name */}
      <h1 className="text-2xl font-semibold mt-4">{userInfo.name}</h1>

      {/* Contact Information */}
      <div className="mt-6">
        <h2 className="text-sm font-semibold text-gray-500 uppercase">
          Contact Information
        </h2>
        <div className="mt-2">
          <p>Email id:</p>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleInputChange}
              className="border w-full p-2 mt-1 rounded-md"
            />
          ) : (
            <p className="text-blue-500">{userInfo.email}</p>
          )}
        </div>
        <div className="mt-2">
          <p>Phone:</p>
          {isEditing ? (
            <input
              type="tel"
              name="phone"
              value={userInfo.phone}
              onChange={handleInputChange}
              className="border w-full p-2 mt-1 rounded-md"
            />
          ) : (
            <p className="text-blue-500">{userInfo.phone}</p>
          )}
        </div>
        <div className="mt-2">
          <p>Address:</p>
          {isEditing ? (
            <textarea
              name="address"
              value={userInfo.address}
              onChange={handleInputChange}
              className="border w-full p-2 mt-1 rounded-md"
            ></textarea>
          ) : (
            <p>{userInfo.address}</p>
          )}
        </div>
      </div>

      {/* Basic Information */}
      <div className="mt-6">
        <h2 className="text-sm font-semibold text-gray-500 uppercase">
          Basic Information
        </h2>
        <div className="mt-2">
          <p>Gender:</p>
          {isEditing ? (
            <select
              name="gender"
              value={userInfo.gender}
              onChange={handleInputChange}
              className="border w-full p-2 mt-1 rounded-md"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <p>{userInfo.gender}</p>
          )}
        </div>
        <div className="mt-2">
          <p>Birthday:</p>
          {isEditing ? (
            <input
              type="date"
              name="birthday"
              value={userInfo.birthday}
              onChange={handleInputChange}
              className="border w-full p-2 mt-1 rounded-md"
            />
          ) : (
            <p>{userInfo.birthday}</p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 border rounded-md text-primary border-primary hover:bg-primary hover:text-white transition"
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
        {isEditing && (
          <button
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 border rounded-md text-white bg-primary hover:opacity-90 transition"
          >
            Save information
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
