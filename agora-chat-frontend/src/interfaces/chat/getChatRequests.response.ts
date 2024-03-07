import { IBaseResponse } from "../base";

export interface IGetChatRequestResponse extends IBaseResponse {
  data: IGetChatRequestData[];
}

export interface IGetChatRequestData {
  _id: string;
  user: string;
  reqUser: IGetChatRequestUser;
  type: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IGetChatRequestUser {
  _id: string;
  email: string;
  profilePic?: any;
  chatId: string;
  userName: string;
}
