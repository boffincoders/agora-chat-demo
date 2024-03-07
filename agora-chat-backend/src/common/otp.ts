import nodeMailer from "nodemailer";
import { nodeMailerConfig } from "../config/mail";
import { EnvConfig } from "../config/env.config";
let mailer = nodeMailer.createTransport(nodeMailerConfig);

export const sendOtp = async (email: string, otp: string) => {
  let fromEmail = EnvConfig.nodeMailerFromEmail;
  if (fromEmail) {
    await mailer
      .sendMail({
        from: fromEmail,
        to: email,
        subject: "Welcome to Chat Website!",
        html: `<b>Your OTP for Chat Website is ${otp}</b>`,
      })
      .then((res) => console.log(res, "res"))
      .catch((err) => console.log(err, "err"));
  }
};

export const generateCustomOtp = () => {
  let otp = "";
  for (let i = 0; i < 4; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  return otp;
};
