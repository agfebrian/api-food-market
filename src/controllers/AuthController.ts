import { Request, Response } from "express";
import { userRegister } from "../services/AuthService";

export const register = async (req: Request, res: Response) => {
  const payload = req.body;
  const data = await userRegister(payload);
  res.status(data.statusCode).send(data);
};
