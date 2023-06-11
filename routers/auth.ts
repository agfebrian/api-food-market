import { Router } from "express";
import {
  register,
  login,
  handlerGetProfile,
} from "../controllers/AuthController";
import { validateRegister } from "../middlewares/validations/register";
import { auth } from "../middlewares/authentication";

export const authRoute: Router = Router();

authRoute.post("/register", validateRegister, register);
authRoute.post("/login", login);
authRoute.get("/profile", auth, handlerGetProfile);
