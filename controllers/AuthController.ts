import { Request, Response } from "express";
import {
  userRegister,
  userLogin,
  userProfile,
  userUpdateProfilePhoto,
} from "../services/AuthService";

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
  const authorization = req.headers.authorization!;
  const data = await userProfile(authorization);
  res.status(data.statusCode).send(data);
};

export const handlerUpdateProfilePhoto = async (
  req: Request,
  res: Response
) => {
  const authorization = req.headers.authorization!;
  const data = await userUpdateProfilePhoto(
    authorization,
    `${req.file?.destination}${req.file?.filename}`
  );
  res.status(data.statusCode).send(data);
};
