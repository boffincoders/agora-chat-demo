import { internalServerError, successResponse } from "../common";
import ChatModel from "../schema/chat.schema";
const sendMessage = async (
  user: any,
  body: { message: string; sent_to: string }
) => {
  try {
    let obj = { ...body, sent_from: user._id };
    let sendMessage = await ChatModel.create(obj);
    return successResponse(sendMessage);
  } catch (error) {
    return internalServerError();
  }
};

const getChatWithUser = async (user: any, query: any) => {
  let { id, perPage, pageNo } = query;

  let pagesToSkip = (pageNo - 1) * perPage;
  pagesToSkip = Math.ceil(pagesToSkip);
  let queryForDocs = {
    $or: [
      {
        sent_from: user._id,
        sent_to: id,
      },
      { sent_from: id, sent_to: user._id },
    ],
  };
  let totalDocs = await ChatModel.countDocuments(queryForDocs);

  try {
    const findMessages = await ChatModel.find(queryForDocs)
      .sort({ createdAt: -1 })
      .limit(perPage)
      .skip(pagesToSkip);
    const isLastDoc = Math.ceil(totalDocs / perPage) === Number(pageNo);
    return successResponse({
      data: findMessages,
      perPage: Number(perPage),
      pageNo: Number(pageNo),
      isLastDoc,
    });
  } catch (error) {
    return internalServerError();
  }
};
export default { sendMessage, getChatWithUser };
