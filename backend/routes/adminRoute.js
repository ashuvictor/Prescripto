import express from "express";
import { addDoctor } from "../controllers/adminController.js";
import upload from "../middleware/multer.js";

const adminRouter = express.Router();

console.log("Setting up admin routes...");

// Add Doctor Route
adminRouter.post("/add-doctor", upload.single("image"), (req, res, next) => {
  console.log("Add doctor route hit");
  next();
}, addDoctor);

export default adminRouter;
