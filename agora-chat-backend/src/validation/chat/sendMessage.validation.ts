import { body } from "express-validator";

export const sendMessageValidation = [
  body("message").notEmpty().withMessage("message is required"),
  body("sent_to").notEmpty().withMessage("sent_to is required").isMongoId(),
];
