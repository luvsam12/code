const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coursebatchSchema = new mongoose.Schema({
  course_batch_id: {
    type: String,
    required: true,
  },
  course_id: {
    type: Schema.Types.ObjectId,
    ref: "Courses",
    required: true,
  },
  update_timestamp: {
    type: Date,
  },
  lecture_start_time: {
    type: String,
  },
  lecture_end_time: {
    type: String,
  },
  batch_start_date: {
    type: string,
  },
  batch_registration_end_date: {
    type: String,
  },
  wallet_transfer_amount: {
    type: Number,
  },
  transfer_date: {
    type: String,
  },
  is_on_sunday: {
    type: Number,
  },
  is_on_monday: {
    type: Number,
  },
  is_on_tuesday: {
    type: Number,
  },
  is_on_wednesday: {
    type: Number,
  },
  is_on_friday: {
    type: Number,
  },
  is_on_saturday: {
    type: Number,
  },
  is_registration_end_date_updated: {
    type: Number,
  },
});

module.exports = mongoose.model("Coursebatch", coursebatchSchema);
