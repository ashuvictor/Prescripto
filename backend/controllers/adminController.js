import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs"; // For file cleanup
import doctorModel from "../models/doctorModel.js";

const addDoctor = async (req, res) => {
  try {
    console.log("Inside addDoctor controller...");
    console.log("Request Body:", req.body); // Log the form data
    console.log("Uploaded File:", req.file); // Log the file data

    // Destructure request body
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

    // Validate required fields
    if (!name || !email || !password || !speciality || !degree || !fees || !experience) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Email is not valid." });
    }

    // Validate password strength
    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters long." });
    }

    // Check if image is provided
    if (!imageFile) {
      console.error("Image file is missing");
      return res.status(400).json({ message: "Image is required." });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Upload image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    // Cleanup local file after upload
    fs.unlinkSync(imageFile.path);

    // Parse and validate address
    let parsedAddress;
    try {
      parsedAddress = JSON.parse(address);
    } catch (err) {
      return res.status(400).json({ message: "Invalid address format. Must be JSON." });
    }

    // Prepare doctor data
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
      address: parsedAddress,
      date: Date.now(),
    };

    // Save to database
    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.status(201).json({ success: true, message: "Doctor added successfully!" });
  } catch (error) {
    console.error("Error in addDoctor controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { addDoctor };
