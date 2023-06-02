import { Request, Response, NextFunction } from "express";
import { getAll } from "../repositories/FoodRepository";
import { createFood } from "../services/FoodService";

export const getFoods = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const foods = await getAll();
  res.send({
    status: true,
    data: foods,
    message: "Success getting foods",
  });
};

export const addFood = async (req: Request, res: Response) => {
  const payload = req.body;
  const data = await createFood(payload);
  res.status(data.statusCode).send(data);
};
