import passport, { use } from "passport";
import local from "passport-local";

import { createHash, isValidPassword } from "../utils.js";
import config from "../config.js";

const { clientID, clientSecret, callbackUrl } = config;

const LocalStrategy = local.Strategy;

const initializePassport = () => {
    //Register strategy
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        try {
          const { first_name, last_name, email } = req.body;

          const user = userModel.findOne({ email: username });

          if (user) {
            console.log("User already exists");
            return done(null, false);
          }

          const newUser = {
            first_name,
            last_name,
            email,
            password: createHash(password),
          };

          let result = await userModel.create(newUser);

          return done(null, result);
        } catch (error) {
          return done(`Error trying to create user: ${error}`);
        }
      }
    )
  );
  passport.use("login", new LocalStrategy)
};

export default initializePassport;
