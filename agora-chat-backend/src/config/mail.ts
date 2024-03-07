import { EnvConfig } from "./env.config";

const userGmail = EnvConfig.nodeMailerEmailId;
const userGmailPassword = EnvConfig.nodeMailerEmailPassword;

export let nodeMailerConfig = {
  service: "gmail",
  auth: { user: userGmail, pass: userGmailPassword },
};
