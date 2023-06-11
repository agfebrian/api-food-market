import { Request, Response } from "express";
import { userRegister, userLogin, userProfile } from "../services/AuthService";

export const register = async (req: Request, res: Response) => {
  const payload = req.body;
  const data = await userRegister(payload);
  res.status(data.statusCode).send(data);
};

export const login = async (req: Request, res: Response) => {
  const payload = req.body;
  const data = await userLogin(payload);
  res.status(data.statusCode).send(data);
};

export const handlerGetProfile = async (req: Request, res: Response) => {
  const params = req.query;
  const data = await userProfile(params);
  res.status(data.statusCode).send(data);
};
