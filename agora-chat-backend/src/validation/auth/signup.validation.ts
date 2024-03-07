import { body } from "express-validator";

export const signupValidation = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must me email"),
  body("password").notEmpty().withMessage("Password is required"),
];
