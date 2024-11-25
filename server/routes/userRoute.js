import { Router } from "express";
import { registerUser } from "../controllers/userConteoller";

const userRouter = Router();
userRouter.post("/register", registerUser);

export default userRouter;