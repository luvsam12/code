const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const keywordsfromcoursecontentSchema = new mongoose.Schema({
  keywords_id: {
    type: String,
    required: true,
  },
  course_id: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  extracted_keywords_from_course: {
    type: String,
    required: true,
  },
  keywords_metaphone: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(
  "Keywordsfromcoursecontent",
  keywordsfromcoursecontentSchema
);
