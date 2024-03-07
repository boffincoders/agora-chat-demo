import path from "path";
import { errorResponse, internalServerError, successResponse } from "../common";
import UserChatRequestModel from "../schema/chatRequest";
import UserModel from "../schema/user.schema";
import { EnvConfig } from "../config/env.config";

const updateProfile = async (user: any, body: any, file: any) => {
  try {
    let foundEmail = await UserModel.findById(user.id);
    if (!foundEmail) return errorResponse("Email does not exists");
    let fileName = null;
    if (file && file.profilePic) {
      const destinationPath = path.join(
        __dirname,
        "../public/",
        file.profilePic.name
      );
      file.profilePic.mv(destinationPath, (err: any) => {
        if (err) return internalServerError();
      });
      fileName = file.profilePic.name;
    }
    let foundedUser = await UserModel.findByIdAndUpdate(
      foundEmail._id,
      {
        $set: {
          ...(fileName && { profilePic: fileName }),
          userName: body.userName,
        },
      },
      { new: true }
    ).lean();

    let updatedUser = {
      ...foundedUser,
      ...(foundedUser &&
        foundedUser.profilePic && {
          profilePic: EnvConfig.baseUrl + foundedUser?.profilePic,
        }),
    };
    delete updatedUser.password;
    return successResponse(updatedUser);
  } catch (error) {
    return internalServerError();
  }
};
const getSpecificUser = async (userId: string) => {
  try {
    let foundDoc = await UserModel.findOne({
      _id: userId,
      email_verified: true,
    }).lean();
    if (!foundDoc) return errorResponse("User Not Existed Or Deleted");
    let objToReturn: any = foundDoc;
    if (objToReturn.profilePic)
      objToReturn.profilePic = EnvConfig.baseUrl + objToReturn.profilePic;
    delete objToReturn.password;
    return successResponse(foundDoc);
  } catch (error) {
    return internalServerError();
  }
};
const getUsers = async (user: any, id?: string) => {
  try {
    let userDoc: any;
    if (!id)
      userDoc = await UserChatRequestModel.find({
        $or: [
          {
            user: user._id,
            type: "accepted",
          },

          {
            reqUser: user._id,
            type: "pending",
          },
          {
            reqUser: user._id,
            type: "accepted",
          },
        ],
      })
        .populate("reqUser", {
          email: 1,
          userName: 1,
          profilePic: 1,
          chatId: 1,
          _id: 1,
        })
        .populate("user", {
          email: 1,
          userName: 1,
          profilePic: 1,
          chatId: 1,
        })
        .lean();
    else
      userDoc = await UserModel.findOne({
        _id: id,
        email_verified: true,
      }).lean();

    let userRequestDoc = await UserChatRequestModel.findOne({
      reqUser: user._id,
      user: id,
    });
    if (!userDoc) return errorResponse("User does not existed");
    let usersList: any[] = [];
    if (!id && userDoc.length > 0) {
      userDoc.forEach((x: any) => {
        if (x.user._id.toString() !== user._id.toString())
          usersList.push({ ...x.user, chatType: x.type });
        else if (x.reqUser._id !== user._id)
          usersList.push({ ...x.reqUser, chatType: x.type });
      });
      userDoc = usersList;
    }
    if (Array.isArray(userDoc))
      userDoc = userDoc.map((user) => {
        let modifiedUser: any = {
          ...user,
          ...(user.profilePic && {
            profilePic: EnvConfig.baseUrl + user.profilePic,
          }),
        };
        delete modifiedUser.password;
        return modifiedUser;
      });
    else {
      userDoc["type"] = userRequestDoc?.type;
      delete userDoc.password;
    }

    return successResponse(userDoc);
  } catch (error) {
    return internalServerError();
  }
};

export default { updateProfile, getUsers, getSpecificUser };
