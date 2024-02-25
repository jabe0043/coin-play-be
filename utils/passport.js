"use strict";
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const AuthUser = require("../models/authModel");

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } = process.env;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
    },
    async (_accessToken, _refreshToken, profile, cb) => {
      const email = profile.emails[0].value;

      try {
        const user = await AuthUser.findOneAndUpdate(
          { googleId: profile.id },
          {
            $set: {
              name: profile.displayName,
              email: email,
              googleId: profile.id,
            },
          },
          { 
            upsert: true, 
            returnDocument: 'after' 
          },
        );
        return cb(null, user);
      } catch (error) {
        return cb(error);
      }
    }
  )
);

// store only the user id in the session
passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

// get the full user from the id stored in the session
passport.deserializeUser(async (id, cb) => {
  try {
    const user = await AuthUser.findById(id);
    cb(null, user);
  } catch (error) {
    cb(error);
  }
});