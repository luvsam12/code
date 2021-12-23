const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coursebatchreferraldetailsSchema = new mongoose.Schema({
  batch_referral_id: {
    type: String,
    required: true,
  },
  course_id: {
    type: Schema.Types.ObjectId,
    ref: "Courses",
    required: true,
  },
  course_batch_id: {
    type: Schema.Types.ObjectId,
    ref: "Coursebatch",
    required: true,
  },
  batch_referral_code: {
    type: String,
  },
  batch_referral_validity: {
    type: String,
  },
  batch_referral_discount: {
    type: Number,
  },
  batch_referral_to_promote: {
    type: Number,
  },
  batch_referral_code_generation_timestamp: {
    type: Date,
  },
});

module.exports = mongoose.model(
  "Coursebatchrefer",
  coursebatchreferraldetailsSchema
);
