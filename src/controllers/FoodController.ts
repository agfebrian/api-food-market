import { Request, Response, NextFunction } from "express";
import { getAll } from "../repositories/FoodRepository";

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
