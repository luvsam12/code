const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const useraccountdetailsSchema = new mongoose.Schema({
  user_account_details_id: {
    type: String,
    required: true,
  },
  transaction_check: {
    type: Number,
    required: true,
  },
  user_name: {
    type: String,
    required: true,
  },
  user_bank_account_number: {
    type: String,
    required: true,
  },
  user_address: {
    type: String,
    required: true,
  },
  user_bank_account_branch: {
    type: String,
    required: true,
  },
  user_account_ifsc: {
    type: String,
    required: true,
  },
  is_courses_shown: {
    type: Number,
    required: true,
  },
  is_promotions_enabled: {
    type: Number,
    required: true,
  },
  is_announcements_enabled: {
    type: Number,
    required: true,
  },
  is_mail_notification_enabled: {
    type: Number,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  user_bank_name: {
    type: String,
    required: true,
  },
  verification_id: {
    type: String,
    required: true,
  },
  verification_proof: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Useraccountdetails", useraccountdetailsSchema);
