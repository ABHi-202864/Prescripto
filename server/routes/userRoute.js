import { Router } from "express";
import { registerUser, loginUser, getProfile, updateProfile } from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";


const userRouter = Router();
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/update-profile", upload.single("image"), authUser, updateProfile);

userRouter.get("/get-profile", authUser, getProfile);


export default userRouter;