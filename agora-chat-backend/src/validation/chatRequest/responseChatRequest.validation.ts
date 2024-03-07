import { body } from "express-validator";

export const respondChatValidation = [
  body("reqId").notEmpty().withMessage("message is required").isMongoId(),
  body("respondType").isString(),
];
