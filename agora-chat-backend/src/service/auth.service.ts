import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { errorResponse, internalServerError, successResponse } from "../common";
import { generateName } from "../common/customNameGenerator";
import { generateCustomOtp, sendOtp } from "../common/otp";
import UserModel from "../schema/user.schema";
import { ChatTokenBuilder } from "agora-token";
import { EnvConfig } from "../config/env.config";

const expirationTimeInSeconds = 360000;
const signup = async (body: { email: string; password: any }) => {
  try {
    const { email, password } = body;
    let foundEmail = await UserModel.findOne({ email });
    if (foundEmail && !foundEmail.email_verified)
      await UserModel.findByIdAndDelete(foundEmail._id);
    if (foundEmail && foundEmail.email_verified)
      return errorResponse("Email already registered with us");
    let generatedOtp = generateCustomOtp();
    await sendOtp(email, generatedOtp);
    let hashedPassword = await bcrypt.hash(password, 10);
    await UserModel.create({
      email,
      password: hashedPassword,
      otp: generatedOtp,
    });

    return successResponse({
      message: `An Verification OTP sent to ${email}. Verify it to login`,
    });
  } catch (error) {
    return internalServerError();
  }
};
const verifyEmail = async (body: { email: string; otp: number }) => {
  try {
    const { email, otp } = body;
    let foundEmail = await UserModel.findOne({ email });
    if (!foundEmail) return errorResponse("Email not registered with us");
    let matchOtp = foundEmail.otp?.toString() === otp.toString();
    if (!matchOtp) return errorResponse("OTP does not match");
    let user = await UserModel.findByIdAndUpdate(
      foundEmail._id,
      {
        $set: { email_verified: true },
      },
      { new: true }
    );
    let returnedUser: any = user;
    delete returnedUser?.password;
    return successResponse(returnedUser);
  } catch (error) {
    return internalServerError();
  }
};
const login = async (body: { email: string; password: any }) => {
  try {
    let { email, password } = body;
    let foundEmail = await UserModel.findOne({
      email,
      email_verified: true,
    }).lean();

    if (!foundEmail) return errorResponse("Email does not registered with us");
    let comparePassword = await bcrypt.compare(password, foundEmail.password);
    if (!comparePassword) return errorResponse("Incorrect Password");
    let token = jwt.sign({ _id: foundEmail._id }, EnvConfig.jwtSecret);
    let generateUniqueName = generateName();
    let agoraBearerToken;

    if (!foundEmail.last_login) {
      let bearerToken = ChatTokenBuilder.buildAppToken(
        EnvConfig.agoraAppId,
        EnvConfig.agoraAppCertificate,
        expirationTimeInSeconds
      );
      if (bearerToken) agoraBearerToken = bearerToken;
    }

    foundEmail = await UserModel.findByIdAndUpdate(
      foundEmail._id,
      {
        $set: {
          last_login: new Date().getTime(),
          ...(!foundEmail.userName &&
            generateUniqueName && {
              userName: generateUniqueName,
            }),
          ...(!foundEmail.chatId &&
            generateUniqueName && {
              chatId: generateUniqueName.toLowerCase(),
            }),
        },
      },
      { new: true }
    ).lean();

    let user: any = {
      ...foundEmail,
      ...(foundEmail!.profilePic && {
        profilePic: EnvConfig.baseUrl + foundEmail!.profilePic,
      }),
      ...(agoraBearerToken && { agoraBearerToken }),
    };
    delete user.password;
    return successResponse({ ...user, token });
  } catch (error) {
    return internalServerError();
  }
};
export default { signup, verifyEmail, login };
