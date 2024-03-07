import axios from "axios";
import { IBaseResponse, IPagination } from "../interfaces/base";
import { IGetChatRequestResponse } from "../interfaces/chat/getChatRequests.response";
import baseInstance from "../utils/baseInstance";
import { EnvConfig } from "../config/env.config";

class ChattingAppServices {
  // Auth
  signup = (data: { email: string; password: any }): Promise<IBaseResponse> => {
    return baseInstance
      .post("/auth/register", data)
      .then((res) => res)
      .catch((err) => err.response);
  };
  verifyOtp = (data: { email: string; otp: number }) => {
    return baseInstance
      .post("/auth/verify-otp", data)
      .then((res) => res)
      .catch((err) => err.response);
  };
  login = (data: { email: string; password: any }) => {
    return baseInstance
      .post("/auth/login", data)
      .then((res) => res)
      .catch((err) => err.response);
  };
  updateProfile = (data: any) => {
    return baseInstance
      .put("/user/profile", data)
      .then((res) => res)
      .catch((err) => err);
  };
  getUsers = (id?: string) => {
    let urlToFind = "/user";
    if (id) urlToFind = `/user?id=${id}`;
    return baseInstance
      .get(urlToFind)
      .then((res) => res)
      .catch((err) => err);
  };
  sendMessage = (data: { sent_to: string; message: string }) => {
    return baseInstance
      .post("/chat/message", data)
      .then((res) => res.data)
      .catch((err) => err);
  };
  getChatWithUser = (id: string, data: IPagination) => {
    return baseInstance
      .get(`/chat/user?id=${id}&perPage=${data.perPage}&pageNo=${data.pageNo}`)
      .then((res) => res.data)
      .catch((err) => err);
  };
  generateChatToken = (uid: string) => {
    return baseInstance
      .post(`/token?uid=${uid}`)
      .then((res) => res.data)
      .catch((err) => err);
  };
  createAgoraUser = (data: {
    token: string;
    username: string;
    password: any;
  }) => {
    return axios
      .post(
        `https://${EnvConfig.agoraHost}/${EnvConfig.agoraOrgName}/${EnvConfig.agoraAppName}/users`,
        {
          username: data.username,
          password: data.password,
        },
        { headers: { Authorization: `Bearer ${data.token}` } }
      )
      .then((res) => res.data)
      .catch((err) => err);
  };
  createBearerToken = () => {
    return baseInstance
      .post(`/token/bearer`)
      .then((res) => res.data)
      .catch((err) => err);
  };
  addUser = (userName: string): Promise<IBaseResponse> => {
    return baseInstance
      .post("/chat-request", { userName })
      .then((res) => res.data)
      .catch((err) => err.response);
  };
  getChatRequests = (): Promise<IGetChatRequestResponse> => {
    return baseInstance
      .get("/chat-request")
      .then((res) => res.data)
      .catch((err) => err);
  };
  respondChatRequest = (data: {
    respondType: string;
    reqId: string;
  }): Promise<IBaseResponse> => {
    return baseInstance
      .put("/chat-request", data)
      .then((res) => res.data)
      .catch((err) => err.response);
  };
}
let chatServices = new ChattingAppServices();
export default chatServices;
