import { Request, Response } from "express";
import chatService from "../service/chat.service";

const sendMessage = async (req: Request, res: Response) => {
  let response = await chatService.sendMessage(req.user, req.body);
  return res.status(response.statusCode).send(response);
};
const getChatWithUser = async (req: Request, res: Response) => {
  let response = await chatService.getChatWithUser(req.user, req.query);
  return res.status(response.statusCode).send(response);
};

export default { sendMessage, getChatWithUser };
