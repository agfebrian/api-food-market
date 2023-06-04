import { Router } from "express";
import {
  handlerGetCategories,
  handlerCreateCategory,
} from "../controllers/CategoryController";

export const categoryRouter: Router = Router();

categoryRouter.get("/", handlerGetCategories);
categoryRouter.post("/", handlerCreateCategory);
