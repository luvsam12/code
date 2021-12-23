const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courselecturedetailsSchema = new mongoose.Schema({
  course_lecture_details_id: {
    type: String,
    required: true,
  },
  course_id: {
    type: Schema.Types.ObjectId,
    ref: "Courses",
    required: true,
  },
  course_lecture_id: {
    type: Schema.Types.ObjectId,
    ref: "Coursesectiondetails",
    required: true,
  },
  course_lecture_title: {
    type: String,
    required: true,
  },
  course_lecture_description: {
    type: String,
    required: true,
  },
  is_course_lecture_completed: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(
  "Courselecturedetails",
  courselecturedetailsSchema
);
