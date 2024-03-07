import { ISlicePayload } from "../baseSlice";

export interface IGetUsersData {
  _id: string;
  email: string;
  profilePic: string;
  email_verified: boolean;
  otp: string;
  userName: string;
  chatId: string;
  type: "pending" | "accepted";
  createdAt: string;
  updatedAt: string;
  __v: number;
  last_login?: number;
}
export interface IGetUserResponse extends ISlicePayload {
  data: IGetUsersData;
}
