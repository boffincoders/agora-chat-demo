import express from "express";
import passport from "passport";
import tokenController from "../controller/token.controller";
import { generateChatTokenValidation } from "../validation/generateChatToken";
import { validateData } from "../common";
let authentication = passport.authenticate("jwt", { session: false });

const router = express.Router();
router
  .route("/")
  .post(
    authentication,
    generateChatTokenValidation,
    validateData,
    tokenController.generateChatToken
  );
router.post("/bearer", authentication, tokenController.generateBearerToken);
export default router;
