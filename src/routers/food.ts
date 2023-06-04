import { Router } from "express";
import {
  handlerCreateFood,
  handlerGetFoods,
  handlerGetFood,
  handlerDeleteFood,
} from "../controllers/FoodController";

export const foodRouter: Router = Router();

foodRouter.get("/", handlerGetFoods);
foodRouter.post("/", handlerCreateFood);
foodRouter.get("/:id", handlerGetFood);
foodRouter.delete("/", handlerDeleteFood);
