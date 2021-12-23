const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserpointsSchema = new mongoose.Schema({
  user_badge_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  login_points: {
    type: Number,
    required: true,
  },
  student_enrollment_points: {
    type: Number,
    required: true,
  },
  student_assessment_points: {
    type: Number,
    required: true,
  },
  instructor_assessment_points: {
    type: Number,
    required: true,
  },
  student_review_points: {
    type: Number,
    required: true,
  },
  student_feedback_points: {
    type: Number,
    required: true,
  },
  student_course_complete_points: {
    type: Number,
    required: true,
  },
  instructor_points: {
    type: Number,
    required: true,
  },
  instructor_course_publish_points: {
    type: Number,
    required: true,
  },
  instructor_course_complete_points: {
    type: Number,
    required: true,
  },
  forum_participate_points: {
    type: Number,
    required: true,
  },
  instructor_doubt_session_points: {
    type: Number,
    required: true,
  },
  user_profile_points: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Userpoints", userpointsSchema);
