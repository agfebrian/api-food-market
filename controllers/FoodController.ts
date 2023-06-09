import { Request, Response } from "express";
import {
  createFood,
  getAllFoods,
  findFood,
  deleteFoods,
} from "../services/FoodService";

export const handlerGetFoods = async (req: Request, res: Response) => {
  const params = {
    category: req.query.category || "",
    perPage: req.query.perPage || "",
  };

  const data = await getAllFoods(params as any);
  res.type("application/json").status(data.statusCode).send(data);
};

export const handlerCreateFood = async (req: Request, res: Response) => {
  const payload = req.body;
  const data = await createFood(payload);
  res.type("application/json").status(data.statusCode).send(data);
};

export const handlerGetFood = async (req: Request, res: Response) => {
  const payload = req.params;
  const data = await findFood(payload.id);
  res.type("application/json").status(data.statusCode).send(data);
};

export const handlerDeleteFood = async (req: Request, res: Response) => {
  const payload = req.body;
  const data = await deleteFoods(payload.id);
  res.type("application/json").status(data.statusCode).send(data);
};
