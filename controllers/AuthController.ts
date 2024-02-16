import { Request, Response } from "express";
import {
  userRegister,
  userLogin,
  userProfile,
  userUpdateProfilePhoto,
} from "../services/AuthService";
import type { RequestUploadFile } from "../types/request-upload-file.interface";

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
  const request = req as RequestUploadFile;
  const avatar = request.file.path;
  const data = await userUpdateProfilePhoto(authorization, avatar);
  res.status(data.statusCode).send(data);
};
