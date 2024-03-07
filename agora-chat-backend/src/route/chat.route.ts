import express from "express";
import passport from "passport";
import { validateData } from "../common";
import chatController from "../controller/chat.controller";
import { sendMessageValidation } from "../validation/chat/sendMessage.validation";
import { getChatWithUserValidation } from "../validation/chat/getChatsWithUser.validation";
let authentication = passport.authenticate("jwt", { session: false });

const router = express.Router();
router
  .route("/message")
  .post(
    authentication,
    sendMessageValidation,
    validateData,
    chatController.sendMessage
  );
router
  .route("/user")
  .get(
    authentication,
    getChatWithUserValidation,
    validateData,
    chatController.getChatWithUser
  );
export default router;
