import { body, query } from "express-validator";

export const generateChatTokenValidation = [
  query("uid").notEmpty().withMessage("uid is required"),
];
