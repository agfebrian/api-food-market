import type { Request } from "express";

export interface RequestUploadFile extends Request {
  file: Express.Multer.File;
}
