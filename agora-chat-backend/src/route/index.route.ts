import { Router } from "express";
import authRouter from "./auth.route";
import chatRouter from "./chat.route";
import chatRequestRouter from "./chatRequest.route";
import tokenRouter from "./token.route";
import userRouter from "./user.route";
import {Request, Response} from 'express'

const router = Router();

router.get("/", (req: Request, res: Response) => {
    return res.json({
        message:"Server running successfully"
    })
});
router.use("/user", userRouter);
router.use("/token", tokenRouter);
router.use("/auth", authRouter);
router.use("/chat", chatRouter);
router.use("/chat-request", chatRequestRouter);

export default router;
