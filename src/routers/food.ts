import { Router } from "express";
import { getFoods } from "../controllers/FoodController";

export const foodRouter: Router = Router();

foodRouter.get("/", getFoods);
