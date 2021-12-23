const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");
const Schema = mongoose.Schema;

const saltRounds = 10;

const userSchema = new mongoose.Schema({
  user_bio: {
    type: String,
    default: "",
  },
  verified: {
    type: String,
    default: "False",
  },
  full_name: {
    type: String,
    required: true,
  },
  username : {
    type : String
  },
  user_email_id: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  date_of_birth: {
    type: String,
  },
  gender: {
    type: String,
  },
  is_admin: {
    type: Number,
    default: 0,
  },
  is_student: {
    type: Number,
    default: 1,
  },
  is_instructor: {
    type: Number,
    default: 0,
  },
  is_hr: {
    type: Number,
    default: 0,
  },
  is_moderator: {
    type: Number,
    default: 0,
  },
  is_intern: {
    type: Number,
    default: 0,
  },
  user_country: {
    type: String,
  },
  social_handle: {
    type: String,
  },
  social_id: {
    type: String,
  },
  about_user: {
    type: String,
  },
  user_contact_number: {
    type: Number,
  },
  user_address: {
    type: String,
  },
  email_verification_code: {
    type: Number,
  },
  user_designation: {
    type: String,
  },
  is_invite_as_teacher: {
    type: Number,
  },
  new_login: {
    type: Number,
  },
  user_signature_path: {
    type: String,
  },
  reffered_code: {
    type: String,
  },
  login_count: {
    type: Number,
    default: 0,
  },
  interest: {
    type: Array,
    default: [],
  },
  bookmarks: {
    type: Array,
    default: [],
  },
  kudos: {
    type: Number,
  },
  following: {
    type: Array,
    default: [],
  },
  followers: {
    type: Array,
    default: [],
  },
  connections: {
    type: Array,
    default: [],
  },
  pending: {
    type: Array,
    default: [],
  },
  requested: {
    type: Array,
    default: [],
  },
  notification: [
    {
      id: { type: String },
      isRead: { type: Boolean, default: false },
    },
  ],
  profile_image_path: {
    type: String,
    default: "http://localhost:7000//icons/1610790877390.webp",
  },
  profie_image_public_id: {
    type: String,
    default: "",
  },
  token: {
    type: String,
  },
  unread_notification: {
    type: Number,
    default: 0,
  },
  login_count: {
    type: Number,
    default: 0,
  },
  notification_like: {
    type: Boolean,
    default: true,
  },
  notification_comment: {
    type: Boolean,
    default: true,
  },
  notification_connection_accept: {
    type: Boolean,
    default: true,
  },
  notification_connection_send: {
    type: Boolean,
    default: true,
  },
  ip_addresses: {
    type: Array,
    default: [],
  },
  blacklisted_ip: {
    type: Array,
    default: [],
  },
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

userSchema.pre("save", function (next) {
  var user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  var user = this;
  var token = jwt.sign(user._id.toHexString(), "secret");

  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  var user = this;

  jwt.verify(token, "secret", function (err, decode) {
    user.findOne({ _id: decode, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

module.exports = mongoose.model("User", userSchema);
