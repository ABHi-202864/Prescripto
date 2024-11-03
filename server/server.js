import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";

// APP CONFIGURATION
const app = express();
const port = process.env.PORT || 4000;
connectDB();

// MIDDLEWARES
app.use(express.json());
app.use(cors());


// API END-POINT
app.get("/", (req, res) => {
  res.send("abhi");
});


// APP LISTEN
app.listen(port, () => console.log(`DOKING PORT : ${port}`));