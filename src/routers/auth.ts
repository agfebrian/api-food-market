import { Router } from "express";
import { register } from "../controllers/AuthController";
import { validateRegister } from "../middlewares/validations/register";

export const authRoute: Router = Router();

authRoute.post("/register", validateRegister, register);
