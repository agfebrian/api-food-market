import { Router } from "express";
import { register, login } from "../controllers/AuthController";
import { validateRegister } from "../middlewares/validations/register";

export const authRoute: Router = Router();

authRoute.post("/register", validateRegister, register);
authRoute.post("/login", login);
