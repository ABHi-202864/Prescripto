import express from "express";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";
import { addDoctor, allDoctors, loginAdmin, appointmentsAdmin, appointmentCancel, adminDashbord } from "../controllers/adminController.js";
import { changeAvailablity } from "../controllers/doctorController.js";

const adminRouter = express.Router();
adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
adminRouter.post("/login", loginAdmin);
adminRouter.post("/all-doctors", authAdmin, allDoctors);
adminRouter.post("/change-availablity", authAdmin, changeAvailablity);
adminRouter.post("/cancel-appointment", authAdmin, appointmentCancel);

adminRouter.get("/appointments", authAdmin, appointmentsAdmin);
adminRouter.get("/dashboard", authAdmin, adminDashbord);

export default adminRouter;