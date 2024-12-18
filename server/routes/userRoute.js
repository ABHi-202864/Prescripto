import { Router } from "express";
import { registerUser, loginUser, getProfile, updateProfile, bookAppointment } from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";


const userRouter = Router();
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/update-profile", upload.single("image"), authUser, updateProfile);
userRouter.post("/book-appointment", authUser, bookAppointment);

userRouter.get("/get-profile", authUser, getProfile);


export default userRouter;