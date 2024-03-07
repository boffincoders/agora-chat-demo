import express from "express";
import { validateData } from "../common";
import authController from "../controller/auth.controller";
import { signupValidation } from "../validation/auth/signup.validation";
import { verifyOtpValidation } from "../validation/auth/verifyOtp.validation";

const router = express.Router();
router.post("/register", signupValidation, validateData, authController.signup);
router.post("/login", signupValidation, validateData, authController.login);
router.post(
  "/verify-otp",
  verifyOtpValidation,
  validateData,
  authController.verifyEmail
);
export default router;
