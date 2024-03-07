import { configDotenv } from "dotenv";

configDotenv();
export const EnvConfig = {
  jwtSecret: process.env.CHAT_DEMO_AGORA_JWT_SECRET as any,
  baseUrl: process.env.CHAT_DEMO_AGORA_BASE_URL as any,
  port: process.env.CHAT_DEMO_AGORA_PORT as any,
  mongodbUrl: process.env.CHAT_DEMO_AGORA_MONGODB as any,
  nodeMailerFromEmail: process.env
    .CHAT_DEMO_AGORA_NODE_MAILER_FROM_EMAIL as any,
  nodeMailerEmailId: process.env.CHAT_DEMO_AGORA_NODE_MAILER_EMAIL_ID as any,
  nodeMailerEmailPassword: process.env
    .CHAT_DEMO_AGORA_NODE_MAILER_EMAIL_PASSWORD as any,
  agoraAppId: process.env.CHAT_DEMO_AGORA_APP_ID as any,
  agoraAppCertificate: process.env.CHAT_DEMO_AGORA_APP_CERTIFICATE as any,
};
