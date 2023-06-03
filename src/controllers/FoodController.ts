import { Request, Response } from "express";
import { createFood, getAllFoods, findFood } from "../services/FoodService";

export const getFoods = async (req: Request, res: Response) => {
  const params = {
    category: req.query.category || "",
    perPage: req.query.perPage || "",
  };

  const data = await getAllFoods(params as any);
  res.status(data.statusCode).send(data);
};

export const addFood = async (req: Request, res: Response) => {
  const payload = req.body;
  const data = await createFood(payload);
  res.status(data.statusCode).send(data);
};

export const getFood = async (req: Request, res: Response) => {
  const payload = req.params;
  const data = await findFood(payload.id);
  res.status(data.statusCode).send(data);
};
