import express from "express";
import passport from "passport";
import userController from "../controller/user.controller";

const router = express.Router();
let authentication = passport.authenticate("jwt", { session: false });
router.put("/profile", authentication, userController.updateProfile);
router.get("/", authentication, userController.getUsers);
export default router;
