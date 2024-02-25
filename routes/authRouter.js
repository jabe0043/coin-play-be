"use strict";
const { Router } = require("express");
const debug = require("debug")("app:authRouter");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const authRouter = Router();

require("../utils/passport.js");

authRouter.get("/google", (req, res, next) => {
  debug("authRouter.get('/google')");
  const redirect_url = req.query.redirect_url;
  const authenticator = passport.authenticate("google", {
    scope: ["profile", "email"],
    state: redirect_url,
  });
  authenticator(req, res, next);
});

authRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    debug("authRouter.get('/google/callback')");
    const { state } = req.query;
    const redirectUrl = state ?? "/api/people";
    const id = req.user._id.toString();
    const token = jwt.sign({ id }, process.env.JWT_SECRET);

    res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); //TODO:

    res.redirect(`${redirectUrl}?token=${token}`);
  }
);

authRouter.get("/logout", (req, res) => {
  debug("authRouter.get('/logout')");
  req.logout({}, () => {
    res.redirect("/");
  });
});

module.exports = authRouter;






