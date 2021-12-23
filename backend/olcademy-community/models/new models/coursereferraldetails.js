const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coursereferraldetailsSchema = new mongoose.Schema({
  course_referral_id: {
    type: String,
    required: true,
  },
  course_id: {
    type: Schema.Types.ObjectId,
    ref: "Courses",
    required: true,
  },
  course_referral_code: {
    type: String,
    required: true,
  },
  course_referral_discount: {
    type: String,
    required: true,
  },
  course_referral_validity: {
    type: String,
    required: true,
  },
  referral_to_promote: {
    type: String,
    required: true,
  },
  course_referral_code_generation_timestamp: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model(
  "Coursereferraldetails",
  coursereferraldetailsSchema
);
