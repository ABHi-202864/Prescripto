import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";


// APP CONFIGURATION
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// MIDDLEWARES
app.use(express.json());
app.use(cors());


// API END-POINTS
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

// APP LISTEN
app.listen(port, () => console.log(`DOKING PORT : ${port}`));