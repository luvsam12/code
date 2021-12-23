const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");
const user = require("../models/user");
const jwt = require("jsonwebtoken");

passport.serializeUser(function (result, done) {
  done(null, result.id);
});

passport.deserializeUser(function (id, done) {
  user.findById(id, function (err, result) {
    done(err, result);
  });
});


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:7000/api/auth/google/olcademy",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    function (accessToken, refreshToken, profile, cb) {
      user
        .findOne({ user_email_id: profile.emails[0].value })
        .then((users) => {
          if (!users) {
              console.log("ddd");
            var newUser = new user({
              social_id: profile.id,
              social_handle: "google",
              user_email_id: profile.emails[0].value,
              full_name: profile.displayName
            });
            user.create(newUser, function (err, result) {
              console.log(result)
              result.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                return cb(err, user);
              });
          
            });
          } else {
            users.generateToken((err, user) => {
              if (err) return res.status(400).send(err);
              return cb(err, user);
            });
            }
        })
        .catch((err) => {
          console.log("Auth Google", err);
        });
    }
  )
);