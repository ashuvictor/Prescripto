import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

// APP CONFIG
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary()

// middlewares

app.use(express.json());
app.use(cors());

//endpoint

app.get("/", (req, res) => {
  res.send("Api working great");
});

app.listen(port,()=>{
    console.log("Sever started",port)
})
