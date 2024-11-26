// api for adding doctor
import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
const addDoctor = async (req, res) => {
  try {
    console.log("Inside addDoctor controller...");
    console.log("Request Body:", req.body); // Log the form data
    console.log("Uploaded File:", req.file); // Log the file data

    const {
      name,
      email,
      password,
      speciality,
      degree,
      about,
      fees,
      address,
      experience,
    } = req.body;
    const imageFile = req.file;

    if (!imageFile) {
      console.error("Image file is missing");
      return res.status(400).json({ message: "Image is required." });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Email is not valid." });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password is not strong." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      fees,
      about,
      address: JSON.parse(address),
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();
    res.json({success:true,message:"Doctor Added"})
  } catch (error) {
    console.error("Error in addDoctor controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { addDoctor };
