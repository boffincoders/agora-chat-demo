import mongoose from "mongoose";
import UserModel from "./user.schema";
export enum UserRequestType {
  ACCEPTED = "accepted",
  PENDING = "pending",
  REJECTED = "rejected",
}
const UserChatRequestSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, required: true, ref: UserModel },
    reqUser: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: UserModel,
    },
    type: { type: String, default: UserRequestType.PENDING },
  },
  { timestamps: true }
);
let UserChatRequestModel = mongoose.model(
  "UserChatRequests",
  UserChatRequestSchema
);
export default UserChatRequestModel;
