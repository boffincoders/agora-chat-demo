import { body } from "express-validator";

export const sendChatRequestValidation = [
  body("userName").isString().notEmpty().withMessage("userName is required"),
];
