import { Request, Response } from "express";
import userService from "../service/user.service";

const updateProfile = async (req: Request, res: Response) => {
  console.log(req, "req");
  let response = await userService.updateProfile(req.user, req.body, req.files);
  return res.status(response.statusCode).send(response);
};
const getUsers = async (req: Request, res: Response) => {
  let response = await userService.getUsers(req.user, req?.query?.id as any);
  return res.status(response.statusCode).send(response);
};

export default { updateProfile, getUsers };
