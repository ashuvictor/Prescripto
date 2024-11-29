import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { userData, setUserData, token, backendUrl, loadUserProfile } =
    useContext(AppContext);
  const [image, setImage] = useState(null);

  // Update profile data to the backend
  const updateUserProfileData = async () => {
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    userData && (
      <div className="p-6 max-w-3xl mx-auto border rounded-xl shadow-lg bg-white">
        {/* Profile Header */}
        <div className="flex items-center gap-6">
          <img
            src={image ? URL.createObjectURL(image) : assets.profile_pic}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
          {isEditing && (
            <div>
              <label
                htmlFor="profileImage"
                className="cursor-pointer bg-primary text-white px-3 py-1 rounded-md"
              >
                Upload
              </label>
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          )}
        </div>

        {/* Name */}
        <h1 className="text-2xl font-semibold mt-4">
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={userData?.name || ""}
              onChange={handleInputChange}
              className="border w-full p-2 mt-1 rounded-md"
            />
          ) : (
            userData?.name
          )}
        </h1>

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
                value={userData?.email || ""}
                onChange={handleInputChange}
                className="border w-full p-2 mt-1 rounded-md"
              />
            ) : (
              <p className="text-blue-500">{userData?.email}</p>
            )}
          </div>
          <div className="mt-2">
            <p>Phone:</p>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={userData?.phone || ""}
                onChange={handleInputChange}
                className="border w-full p-2 mt-1 rounded-md"
              />
            ) : (
              <p className="text-blue-500">{userData?.phone}</p>
            )}
          </div>
          <div className="mt-2">
            <p>Address:</p>
            {isEditing ? (
              <textarea
                name="address"
                value={userData?.address || ""}
                onChange={handleInputChange}
                className="border w-full p-2 mt-1 rounded-md"
              ></textarea>
            ) : (
              <p>
                {userData?.address?.line1}, {userData?.address?.line2}
              </p>
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
                value={userData?.gender || ""}
                onChange={handleInputChange}
                className="border w-full p-2 mt-1 rounded-md"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <p>{userData?.gender}</p>
            )}
          </div>
          <div className="mt-2">
            <p>Birthday:</p>
            {isEditing ? (
              <input
                type="date"
                name="birthday"
                value={userData?.birthday || ""}
                onChange={handleInputChange}
                className="border w-full p-2 mt-1 rounded-md"
              />
            ) : (
              <p>{userData?.birthday}</p>
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
              onClick={updateUserProfileData}
              className="px-4 py-2 border rounded-md text-white bg-primary hover:opacity-90 transition"
            >
              Save information
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default MyProfile;
