import tokenService from "../service/token.service";
import { Request,Response } from "express";

const generateChatToken = async (req: Request, res: Response) => {
    let response = await tokenService.generateChatToken(req);
    return res.status(response.statusCode).send(response);
  };

  const generateBearerToken=async(req: Request, res: Response)=>{
    let response=await tokenService.generateBearerToken()
    return res.status(response.statusCode).send(response);

  }
  
  export default {generateChatToken,generateBearerToken}