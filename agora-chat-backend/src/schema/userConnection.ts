import mongoose from "mongoose";
import UserModel from "./user.schema";

const UserConnectionsSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, required: true, ref: UserModel },
    connection: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: UserModel,
    },
  },
  { timestamps: true }
);
let UserConnectionsModel = mongoose.model(
  "userConnections",
  UserConnectionsSchema
);
export default UserConnectionsModel;
