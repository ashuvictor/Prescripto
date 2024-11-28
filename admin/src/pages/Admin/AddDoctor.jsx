import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  // State variables to store form data
  const [doctorName, setDoctorName] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [email, setEmail] = useState("");
  const [degree, setDegree] = useState("");
  const [password, setPassword] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [doctorImage, setDoctorImage] = useState(null);

  const handleImageUpload = (e) => {
    setDoctorImage(e.target.files[0]);
  };

  const { backendUrl, aToken } = useContext(AdminContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!doctorImage) {
        return toast.error("Image Not selected");
      }
      const formData = new FormData();
      formData.append("doctorName", doctorName);
      formData.append("speciality", speciality);
      formData.append("email", email);
      formData.append("degree", degree);
      formData.append("password", password);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      if (doctorImage) {
        formData.append("doctorImage", doctorImage);
      }
      formData.forEach((value, key) => {
        console.log(`${key}--> ${value}`);
      });

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers:  {atoken:aToken}  }
      );
      if(data.success) {
        toast.success(data.message)
      }
      else{
        toast.error(data.message)
      }
    } catch (e) {
      toast.error(e)
      
    }

    // Combine form data into an object

    // Handle form submission logic (e.g., API call)
    console.log("Form Data Submitted:", formData);
  };

  return (
    <form
      className="m-5 w-full"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      {/* Form Title */}
      <p className="mb-3 text-lg font-medium text-gray-800">Add Doctor</p>

      {/* Form Container */}
      <div className="bg-white px-8 py-8 border-2 border-blue-300 rounded-lg w-full max-w-4xl mx-auto shadow-lg">
        {/* Image Upload Section */}
        <div className="flex flex-col items-center mb-6">
          <label
            htmlFor="doc-img"
            className="cursor-pointer flex flex-col items-center"
          >
            <img
              src={
                doctorImage
                  ? URL.createObjectURL(doctorImage)
                  : assets.upload_area
              }
              alt="Upload"
              className="w-24 h-24 rounded-full border border-gray-300 object-cover"
            />
          </label>
          <input type="file" id="doc-img" hidden onChange={handleImageUpload} />
          <p className="text-sm text-gray-600 mt-2">Upload doctor picture</p>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium">
              Doctor name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              required
              className="w-full p-3 border border-gray-300 rounded-md mt-1"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
            />
          </div>

          {/* Speciality */}
          <div>
            <label
              htmlFor="speciality"
              className="block text-gray-700 font-medium"
            >
              Speciality
            </label>
            <select
              id="speciality"
              required
              className="w-full p-3 border border-gray-300 rounded-md mt-1"
              value={speciality}
              onChange={(e) => setSpeciality(e.target.value)}
            >
              <option value="General physician">General physician</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatricians">Pediatricians</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
            </select>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Doctor Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Your email"
              required
              className="w-full p-3 border border-gray-300 rounded-md mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Education */}
          <div>
            <label htmlFor="degree" className="block text-gray-700 font-medium">
              Education
            </label>
            <input
              type="text"
              id="degree"
              placeholder="Education"
              required
              className="w-full p-3 border border-gray-300 rounded-md mt-1"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium"
            >
              Doctor Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              required
              className="w-full p-3 border border-gray-300 rounded-md mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Address */}
          <div>
            <label
              htmlFor="address1"
              className="block text-gray-700 font-medium"
            >
              Address
            </label>
            <input
              type="text"
              id="address1"
              placeholder="Address 1"
              required
              className="w-full p-3 border border-gray-300 rounded-md mt-1"
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
            />
            <input
              type="text"
              id="address2"
              placeholder="Address 2"
              required
              className="w-full p-3 border border-gray-300 rounded-md mt-2"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
            />
          </div>

          {/* Experience */}
          <div>
            <label
              htmlFor="experience"
              className="block text-gray-700 font-medium"
            >
              Experience
            </label>
            <select
              id="experience"
              required
              className="w-full p-3 border border-gray-300 rounded-md mt-1"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            >
              <option value="1 Year">1 Year</option>
              <option value="2 Year">2 Years</option>
              <option value="3 Year">3 Years</option>
              <option value="4 Year">4 Years</option>
              <option value="5 Year">5 Years</option>
            </select>
          </div>

          {/* Fees */}
          <div>
            <label htmlFor="fees" className="block text-gray-700 font-medium">
              Fees
            </label>
            <input
              type="number"
              id="fees"
              placeholder="Your fees"
              required
              className="w-full p-3 border border-gray-300 rounded-md mt-1"
              value={fees}
              onChange={(e) => setFees(e.target.value)}
            />
          </div>
        </div>

        {/* About Section */}
        <div className="mt-6">
          <label htmlFor="about" className="block text-gray-700 font-medium">
            About me
          </label>
          <textarea
            id="about"
            placeholder="Write about yourself"
            rows="5"
            required
            className="w-full p-3 border border-gray-300 rounded-md mt-1"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-center mt-8">
          <button
            type="submit"
            className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Add doctor
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddDoctor;
