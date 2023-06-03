import { Router } from "express";
import { addFood, getFoods, getFood } from "../controllers/FoodController";

export const foodRouter: Router = Router();

foodRouter.get("/", getFoods);
foodRouter.post("/", addFood);
foodRouter.get("/:id", getFood);
