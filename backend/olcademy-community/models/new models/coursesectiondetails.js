const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coursesectiondetailsSchema = new mongoose.Schema({
  course_section_details_id: {
    type: String,
    required: true,
  },
  course_section_id: {
    type: Schema.Types.ObjectId,
    ref: "Coursesectiondetails",
    required: true,
  },
  course_section_description: {
    type: String,
    required: true,
  },
  course_id: {
    type: Schema.Types.ObjectId,
    ref: "Courses",
    required: true,
  },
  course_section_title: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(
  "Coursesectiondetails",
  coursesectiondetailsSchema
);
