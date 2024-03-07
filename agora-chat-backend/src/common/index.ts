import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";

export const successResponse = (data?: any) => {
  let objToReturn: any = { success: true, statusCode: StatusCodes.OK };
  if (data) objToReturn = { ...objToReturn, data };
  return objToReturn;
};

export const errorResponse = (err: any) => {
  return { success: false, statusCode: StatusCodes.BAD_REQUEST, message: err };
};

export const internalServerError = () => {
  return {
    success: false,
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message: "Internal Sever Error",
  };
};
export const validateData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  else res.status(StatusCodes.BAD_REQUEST).send(errors);
};