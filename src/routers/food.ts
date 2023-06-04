import { Router } from "express";
import {
  handlerCreateFood,
  handlerGetFoods,
  handlerGetFood,
} from "../controllers/FoodController";

export const foodRouter: Router = Router();

foodRouter.get("/", handlerGetFoods);
foodRouter.post("/", handlerCreateFood);
foodRouter.get("/:id", handlerGetFood);
