const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coursesectiondaysSchema = new mongoose.Schema({
  course_section_days_id: {
    type: String,
    required: true,
  },
  course_section_id: {
    type: Schema.Types.ObjectId,
    ref: "Coursesectiondetails",
    required: true,
  },
  course_batch_id: {
    type: Schema.Types.ObjectId,
    ref: "Coursebatch",
    required: true,
  },
  course_id: {
    type: Schema.Types.ObjectId,
    ref: "Courses",
    required: true,
  },
  course_section_date: {
    type: Date,
  },
  course_section_held_day: {
    type: String,
  },
  email_notification_status: {
    type: String,
  },
  course_section_status: {
    type: String,
  },
  course_section_complete_date: {
    type: Date,
  },
  feedback_status: {
    type: String,
  },
  average_feedback_status: {
    type: String,
  },
  average_feedback_value: {
    type: String,
  },
  is_amount_transferred: {
    type: String,
  },
});

module.exports = mongoose.model("Coursesectiondays", coursesectiondaysSchema);
