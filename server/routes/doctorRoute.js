import express, { Router } from "express";
import { doctorList, loginDoctor, appointmentsDoctor } from "../controllers/doctorController.js";
import authDoctor from "../middlewares/authDoctor.js";

const doctorRouter = Router();
doctorRouter.get("/list", doctorList);
doctorRouter.get("/appointments", authDoctor, appointmentsDoctor);

doctorRouter.post("/login", loginDoctor);

export default doctorRouter;