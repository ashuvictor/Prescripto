import express from "express";
import cors from "cors";
import "dotenv/config";

// APP CONFIG
const app = express();
const port = process.env.PORT || 4000;

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
