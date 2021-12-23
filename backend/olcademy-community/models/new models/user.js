const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user_id: {
    type: Number,
  },
  user_name: {
    type: String,
    default: "",
  },
  full_name: {
    type: String,
    required: true,
  },
  user_email_id: {
    type: String,
    required: true,
  },
  user_account_password: {
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
  service_name: {
    type: String,
  },
  service_provider_id: {
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
  is_verified: {
    type: Number,
    default: 0,
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
  profile_image_path: {
    type: String,
  },
  interests: {
    type: Array,
  },
});

module.exports = mongoose.model("User", userSchema);
