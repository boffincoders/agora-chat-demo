import { Request, Response } from "express";
import authService from "../service/auth.service";

const signup = async (req: Request, res: Response) => {
  let response = await authService.signup(req.body);
  return res.status(response.statusCode).send(response);
};
const login = async (req: Request, res: Response) => {
  let response = await authService.login(req.body);
  return res.status(response.statusCode).send(response);
};
const verifyEmail = async (req: Request, res: Response) => {
  let response = await authService.verifyEmail(req.body);
  return res.status(response.statusCode).send(response);
};

export default { signup, verifyEmail, login };
