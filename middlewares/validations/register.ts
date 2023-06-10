import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

export const validateRegister = [
  check("name").isString().notEmpty().withMessage("Name is required"),
  check("email")
    .isString()
    .isEmail()
    .withMessage("Email invalid")
    .notEmpty()
    .withMessage("Email is required"),
  check("password")
    .isString()
    .isLength({ min: 8, max: 8 })
    .withMessage("Password must be 8 character")
    .notEmpty()
    .withMessage("Password is required"),
  check("address").isString().notEmpty().withMessage("Address is required"),
  check("city").isString().notEmpty().withMessage("City is required"),
  check("phone_number").isString().notEmpty().withMessage("Phone is required"),
  check("house_number")
    .isString()
    .notEmpty()
    .withMessage("House number is required"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).send({
        status: false,
        statusCode: 422,
        data: {},
        message: "Invalid request",
        errors: errors.array(),
      });
      return;
    }
    next();
  },
];
