import { ChatTokenBuilder } from "agora-token";
import { Request } from "express";
import { internalServerError, successResponse } from "../common";
import { EnvConfig } from "../config/env.config";

const generateChatToken = async (req: Request) => {
  try {
    const appId = EnvConfig.agoraAppId;
    const appCertificate = EnvConfig.agoraAppCertificate;
    const uid = req.query.uid;

    const expirationTimeInSeconds = 360000;

    let generateChatToken = ChatTokenBuilder.buildUserToken(
      appId,
      appCertificate,
      uid?.toString() ?? "",
      expirationTimeInSeconds
    );
    return successResponse(generateChatToken);
  } catch (error) {
    return internalServerError();
  }
};
const generateBearerToken = () => {
  try {
    const appId = EnvConfig.agoraAppId;
    const appCertificate = EnvConfig.agoraAppCertificate;
    const expirationTimeInSeconds = 360000;
    let generateChatToken = ChatTokenBuilder.buildAppToken(
      appId,
      appCertificate,
      expirationTimeInSeconds
    );
    return successResponse(generateChatToken);
  } catch (error) {
    return internalServerError();
  }
};

export default { generateChatToken, generateBearerToken };
