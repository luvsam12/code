const mongoose = require("mongoose");
const Schema = Number.Schema;

const studentdoubtsessionSchema = new mongoose.Schema({
  doubt_session_id: {
    type: Number,
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
  course_section_id: {
    type: Schema.Types.ObjectId,
    ref: "Coursesectiondetails",
    required: true,
  },
  doubt_session_date: {
    type: Date,
    required: true,
  },
  doubt_session_time: {
    type: String,
    required: true,
  },
  email_notification_status: {
    type: Number,
    required: true,
  },
  doubt_section_status: {
    type: String,
    required: true,
  },
  feedback_status: {
    type: Number,
    required: true,
  },
  average_feedback_value: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model(
  "Studentdoubtsession",
  studentdoubtsessionSchema
);
