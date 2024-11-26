import express from "express";
import { addDoctor,loginAdmin } from "../controllers/adminController.js";
import upload from "../middleware/multer.js";
import authAdmin from "../middleware/authAdmin.js"

const adminRouter = express.Router();

console.log("Setting up admin routes...");

// Add Doctor Route
adminRouter.post("/add-doctor",authAdmin, upload.single("image"), (req, res, next) => {
  console.log("Add doctor route hit");
  next();
}, addDoctor);

adminRouter.post("/login",loginAdmin)

export default adminRouter;
