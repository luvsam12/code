const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const doubtcleaningsessionSchema = new mongoose.Schema({
  doubt_clearing_session_id: {
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
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  doubt_clearing_session_day: {
    type: String,
  },
  doubt_clearing_session_date: {
    type: Date,
  },
  doubt_clearing_session_time: {
    type: String,
  },
  doubt_clearing_session_duration: {
    type: Number,
  },
  email_notification_status: {
    type: Number,
  },
  doubt_section_status: {
    type: String,
  },
  feedback_status: {
    type: Number,
  },
  average_feedback_status: {
    type: Number,
  },

  average_feedback_value: {
    type: Number,
  },
  amount_transfer_status: {
    type: String,
  },
});

module.exports = mongoose.model(
  "Doubtcleaningsession",
  doubtcleaningsessionSchema
);
