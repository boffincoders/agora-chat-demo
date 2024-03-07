import express from "express";
import passport from "passport";
import { validateData } from "../common";
import chatRequestController from "../controller/chatRequest.controller";
import { respondChatValidation } from "../validation/chatRequest/responseChatRequest.validation";
import { sendChatRequestValidation } from "../validation/chatRequest/sendChatRequest";
let authentication = passport.authenticate("jwt", { session: false });

const router = express.Router();
router
  .route("/")
  .post(
    authentication,
    sendChatRequestValidation,
    validateData,
    chatRequestController.sendChatRequest
  )
  .get(
    authentication,

    chatRequestController.getChatRequests
  )
  .put(
    authentication,
    respondChatValidation,
    validateData,
    chatRequestController.responseChatRequest
  );

export default router;
