import { Request, Response } from "express";
import { getAllCategories, createCategory } from "../services/CategoryService";

export const handlerGetCategories = async (req: Request, res: Response) => {
  const data = await getAllCategories();
  res.status(data.statusCode).send(data);
};

export const handlerCreateCategory = async (req: Request, res: Response) => {
  const payload = req.body;
  const data = await createCategory(payload);
  res.status(data.statusCode).send(data);
};
