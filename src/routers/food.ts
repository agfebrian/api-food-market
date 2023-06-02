import { Router } from "express";
import { addFood, getFoods } from "../controllers/FoodController";

export const foodRouter: Router = Router();

foodRouter.get("/", getFoods);
foodRouter.post("/", addFood);
