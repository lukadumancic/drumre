import passport from "passport";
import { config } from "dotenv";
import User from '../models/Users';

const GoogleTokenStrategy = require("passport-google-token").Strategy;

config();
passport.use(
  new GoogleTokenStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleID: profile.id });
      if (existingUser) {
        console.log('existing user');
        done(null, existingUser);
      } else {
        console.log('new user');
        const user = await new User({ googleID: profile.id, email: profile.emails[0].value, name: profile.name.givenName, surname: profile.name.familyName, image: profile._json.picture, locale: profile._json.locale }).save();
        done(null, user);
      }
    })
);


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userID, done) => {
  User.findById(userID).then((user) => {
    done(null, user);
  });
});
