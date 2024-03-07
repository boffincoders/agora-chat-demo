import { Request, Response } from "express";
import { internalServerError } from "../common";
import chatRequestService from "../service/chatRequest.service";

const sendChatRequest = async (req: Request, res: Response) => {
  try {
    let result = await chatRequestService.sendChatRequest(
      req.body.userName,
      req.user
    );
    return res.status(result.statusCode).send(result);
  } catch (error) {
    return internalServerError();
  }
};
const getChatRequests = async (req: Request, res: Response) => {
  try {
    let result = await chatRequestService.getChatRequests(req.user);
    return res.status(result.statusCode).send(result);
  } catch (error) {
    return internalServerError();
  }
};
const responseChatRequest = async (req: Request, res: Response) => {
  try {
    let result = await chatRequestService.respondChatRequest(
      req.body,
      req.user
    );
    return res.status(result.statusCode).send(result);
  } catch (error) {
    return internalServerError();
  }
};

export default { sendChatRequest, getChatRequests, responseChatRequest };
