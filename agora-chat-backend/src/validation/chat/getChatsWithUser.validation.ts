import { query } from "express-validator";

export const getChatWithUserValidation = [
  query("id").notEmpty().withMessage("id is required"),
  query("pageNo")
    .isNumeric()
    .withMessage("pageNo should not be string")
    .notEmpty()
    .withMessage("pageNo is required"),
  query("perPage")
    .isNumeric()
    .withMessage("perPage should not be string")
    .notEmpty()
    .withMessage("perPage is required"),
];
