import { errorResponse, internalServerError, successResponse } from "../common";
import UserChatRequestModel, { UserRequestType } from "../schema/chatRequest";
import UserModel from "../schema/user.schema";

const sendChatRequest = async (userName: string, user: any) => {
  try {
    let foundUser = await UserModel.findOne({
      $or: [
        { email: userName, email_verified: true },
        { userName, email_verified: true },
      ],
    });
    if (!foundUser || foundUser._id.toString() === user._id.toString())
      return errorResponse("Invlid User Detail");

    let obj = {
      user: foundUser._id,
      reqUser: user._id,
    };
    let foundIsUserAlreadyAdded = await UserChatRequestModel.findOne({
      $or: [obj, { user: user._id, reqUser: foundUser._id }],
    });
    if (foundIsUserAlreadyAdded?.type === UserRequestType.ACCEPTED)
      return errorResponse("User Already Added With You");
    else if (foundIsUserAlreadyAdded?.type === UserRequestType.PENDING)
      return errorResponse(
        "Your Request Already Sent To This User Wait Until He Accepts"
      );
    else if (foundIsUserAlreadyAdded?.type === UserRequestType.REJECTED)
      await UserChatRequestModel.findByIdAndDelete(foundIsUserAlreadyAdded._id);

    await UserChatRequestModel.create(obj);

    return successResponse();
  } catch (error) {
    return internalServerError();
  }
};
const getChatRequests = async (user: any) => {
  try {
    let foundDoc = await UserChatRequestModel.find({
      user: user._id,
      type: UserRequestType.PENDING,
    }).populate("reqUser", { email: 1, userName: 1, profilePic: 1, chatId: 1 });
    return successResponse(foundDoc);
  } catch (error) {
    return internalServerError();
  }
};
const respondChatRequest = async (body: any, user: any) => {
  const { reqId, respondType } = body;
  try {
    let foundDoc = await UserChatRequestModel.findById(reqId);
    if (!foundDoc) return errorResponse("Request does not existed");
    if (foundDoc.user.toString() !== user._id.toString())
      return errorResponse("Something Went Wrong");
    await UserChatRequestModel.findByIdAndUpdate(foundDoc._id, {
      $set: { type: respondType },
    });
    return successResponse();
  } catch (error) {
    return internalServerError();
  }
};
export default { sendChatRequest, getChatRequests, respondChatRequest };
