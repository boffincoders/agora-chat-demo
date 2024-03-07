import { body } from "express-validator";

export const verifyOtpValidation = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must me email"),
  body("otp")
    .notEmpty()
    .withMessage("Otp is required")
    .isNumeric()
    .withMessage("otp must be a number"),
];
