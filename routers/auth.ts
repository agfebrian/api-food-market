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
import bcrypt from "bcrypt";
import path from "path";

export const authRoute: Router = Router();

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../uploads/"),
  filename(req, file, callback) {
    callback(
      null,
      bcrypt.hashSync(file.originalname.split(".")[0], 10) +
        "." +
        file.originalname.split(".")[1]
    );
  },
});
const upload = multer({ storage: storage });

authRoute.post("/register", validateRegister, register);
authRoute.post("/login", login);
authRoute.get("/profile", auth, handlerGetProfile);
authRoute.patch(
  "/profile-photo",
  auth,
  upload.single("avatar"),
  handlerUpdateProfilePhoto
);
