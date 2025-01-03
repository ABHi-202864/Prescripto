import { Router } from "express";
import { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancleAppointment, paymentRazorpay, verifyRazorpay } from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";


const userRouter = Router();
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/update-profile", upload.single("image"), authUser, updateProfile);
userRouter.post("/book-appointment", authUser, bookAppointment);
userRouter.post("/cancel-appointment", authUser, cancleAppointment);
userRouter.post("/payment-razorpay", authUser, paymentRazorpay);
userRouter.post("/verifyRazorpay", authUser, verifyRazorpay);

userRouter.get("/get-profile", authUser, getProfile);
userRouter.get("/appointments", authUser, listAppointment);


export default userRouter;