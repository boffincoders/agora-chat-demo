import mongoose from "mongoose";
import UserModel from "./user.schema";

const ChatSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    sent_from: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: UserModel,
    },
    sent_to: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: UserModel,
    },
    isReaded: { type: Boolean, default: false },
  },

  { timestamps: true }
);
let ChatModel = mongoose.model("chats", ChatSchema);
export default ChatModel;
