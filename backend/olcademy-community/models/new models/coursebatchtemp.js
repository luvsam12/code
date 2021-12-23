const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coursebatchtempSchema = new mongoose.Schema({
  course_batch_id: {
    type: String,
    required: true,
  },
  course_id: {
    type: Schema.Types.ObjectId,
    ref: "Courses",
    required: true,
  },
  trainer_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  lecture_start_time: {
    type: String,
  },
  lecture_end_time: {
    type: String,
  },
  batch_start_date: {
    type: Date,
  },
  batch_registration_end_date: {
    type: Date,
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
});

module.exports = mongoose.model("Coursebatchtemp", coursebatchtempSchema);
