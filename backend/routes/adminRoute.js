import express from "express";
import { addDoctor,allDoctors,loginAdmin } from "../controllers/adminController.js";
import upload from "../middleware/multer.js";
import authAdmin from "../middleware/authAdmin.js"
import { changeAvailability } from "../controllers/doctorController.js";

const adminRouter = express.Router();

console.log("Setting up admin routes...");

// Add Doctor Route
adminRouter.post("/add-doctor",authAdmin, upload.single("image"), (req, res, next) => {
  console.log("Add doctor route hit");
  next();
}, addDoctor);

adminRouter.post("/login",loginAdmin)
adminRouter.post("/all-doctors",authAdmin,allDoctors)
adminRouter.post("/change-availability",authAdmin,changeAvailability)

export default adminRouter;
