const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const enrolledcoursedetailsSchema = new mongoose.Schema({
  enrolled_course_details_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  course_progress: {
    type: Number,
  },
  rating_by_enrolled_student: {
    type: Number,
  },
  course_id: {
    type: Schema.Types.ObjectId,
    ref: "Courses",
    required: true,
  },
  review_given_by_student: {
    type: String,
  },
  course_status: {
    type: String,
  },
  course_batch_id: {
    type: Schema.Types.ObjectId,
    ref: "Coursebatch",
    required: true,
  },
  coupon_applied: {
    type: String,
  },
  user_enrolled_date: {
    type: String,
  },
  payment_transaction_id: {
    type: String,
  },
  review_submission_date: {
    type: Date,
  },
  review_title: {
    type: String,
  },
  user_enrolled_timestamp: {
    type: Date,
  },
  certification_verification_id: {
    type: Schema.Types.ObjectId,
    ref: "Certicates",
    required: true,
  },
  course_completion_date: {
    type: String,
  },
  accept_student_timestamp: {
    type: String,
  },
});

module.exports = mongoose.model(
  "Enrolledcoursedetails",
  enrolledcoursedetailsSchema
);
