import { ExtractJwt, Strategy } from "passport-jwt";
import UserModel from "../schema/user.schema";
import { EnvConfig } from "./env.config";
const jwtStrategy = (passport: any) => {
  passport.use(
    new Strategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: EnvConfig.jwtSecret,
      },
      async function (jwt_payload, done) {
        let user = await UserModel.findOne({ _id: jwt_payload._id });
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      }
    )
  );
};
export default jwtStrategy;
