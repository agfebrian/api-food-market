import { Router } from "express";
import { register } from "../controllers/AuthController";

export const authRoute: Router = Router();

authRoute.post("/register", register);
