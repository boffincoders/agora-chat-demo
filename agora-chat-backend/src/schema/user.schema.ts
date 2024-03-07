import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: null },
    email_verified: { type: Boolean, default: false },
    last_login: { type: Number },
    otp: { type: String },
    userName: { type: String },
    chatId: { type: String },

  },
  { timestamps: true }
);
let UserModel = mongoose.model("users", UserSchema);
export default UserModel;
