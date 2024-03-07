import mongoose from "mongoose";
import { EnvConfig } from "./env.config";

export const connectDb = () => {
  let dbUrl = EnvConfig.mongodbUrl;
  if (dbUrl) {
    mongoose
      .connect(dbUrl)
      .then((res) => console.log("Connected Success"))
      .catch((err) => console.log("Not Connected"));
  } else {
    console.log("Mongodb Url not provided or not correct")
  }
};
