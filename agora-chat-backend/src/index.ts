import cors from "cors";
import { configDotenv } from "dotenv";
import express from "express";
import fileUpload from "express-fileupload";
import passport from "passport";
import path from "path";
import { connectDb } from "./config/db.config";
import jwtStrategy from "./config/passport";
import mainRoutes from "./route/index.route";
import { EnvConfig } from "./config/env.config";

const app = express();
configDotenv();
const port = EnvConfig.port || 8000;

connectDb();
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
jwtStrategy(passport);
app.use(fileUpload({}));
app.use(express.urlencoded({ extended: true }));

app.use(mainRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
