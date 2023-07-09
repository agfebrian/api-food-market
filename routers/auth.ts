import { Router } from "express";
import {
  register,
  login,
  handlerGetProfile,
  handlerUpdateProfilePhoto,
} from "../controllers/AuthController";
import { validateRegister } from "../middlewares/validations/register";
import { auth } from "../middlewares/authentication";
import multer from "multer";
import path from "path";

export const authRoute: Router = Router();

const setupMulter = multer({
  storage: multer.diskStorage({}),
  fileFilter: (_req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(null, false);
      return;
    }
    cb(null, true);
  },
});
const upload = setupMulter;

authRoute.post("/register", validateRegister, register);
authRoute.post("/login", login);
authRoute.get("/profile", auth, handlerGetProfile);
authRoute.patch(
  "/profile-photo",
  auth,
  upload.single("avatar"),
  handlerUpdateProfilePhoto
);
