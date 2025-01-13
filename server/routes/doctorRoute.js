import express, { Router } from "express";
import { doctorList, loginDoctor } from "../controllers/doctorController.js";

const doctorRouter = Router();
doctorRouter.get("/list", doctorList);

doctorRouter.post("/login", loginDoctor);

export default doctorRouter;