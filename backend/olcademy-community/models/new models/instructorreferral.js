const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const instructorreferralSchema = new mongoose.Schema({
  instructor_referral_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  referral_code: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Instructorreferral", instructorreferralSchema);
