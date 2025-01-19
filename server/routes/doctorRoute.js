import express, { Router } from "express";
import { doctorList, loginDoctor, appointmentsDoctor, appointmentComplete, appointmentCancel } from "../controllers/doctorController.js";
import authDoctor from "../middlewares/authDoctor.js";

const doctorRouter = Router();
doctorRouter.get("/list", doctorList);
doctorRouter.get("/appointments", authDoctor, appointmentsDoctor);

doctorRouter.post("/login", loginDoctor);
doctorRouter.post("/complete-appointment", authDoctor, appointmentComplete);
doctorRouter.post("/cancel-appointment", authDoctor, appointmentCancel);

export default doctorRouter;