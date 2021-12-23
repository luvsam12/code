const mongoose = require("mongoose");
const Schema = Number.Schema;

const webinarsSchema = new mongoose.Schema({
  course_count: {
    type: Number,
    required: true,
  },
  trainer_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  trainer_name: {
    type: String,
    required: true,
  },
  trainer_name_metaphone: {
    type: String,
    required: true,
  },
  course_id: {
    type: Schema.Types.ObjectId,
    ref: "Courses",
    required: true,
  },
  course_image_path: {
    type: String,
    required: true,
  },
  course_title: {
    type: String,
    required: true,
  },
  course_title_metaphone: {
    type: String,
    required: true,
  },
  course_subtitle: {
    type: String,
    required: true,
  },
  course_subtitle_metaphone: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  course_price: {
    type: String,
    required: true,
  },
  course_description: {
    type: String,
    required: true,
  },
  course_welcome_message: {
    type: String,
    required: true,
  },
  course_completion_message: {
    type: String,
    required: true,
  },
  course_language: {
    type: String,
    required: true,
  },
  level_of_course: {
    type: String,
    required: true,
  },
  course_category: {
    type: String,
    required: true,
  },
  trainer_description: {
    type: String,
    required: true,
  },
  course_video_path: {
    type: String,
    required: true,
  },
  course_access_platform_link: {
    type: String,
    required: true,
  },
  course_access_platform_name: {
    type: String,
    required: true,
  },
  course_access_platform_id: {
    type: String,
    required: true,
  },
  course_status: {
    type: String,
    required: true,
  },
  published_timestamp: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Webinars", webinarsSchema);
