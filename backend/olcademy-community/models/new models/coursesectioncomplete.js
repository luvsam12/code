const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coursesectioncompleteSchema = new mongoose.Schema({
  course_section_complete_id: {
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
  feedback_for_question1: {
    type: Number,
  },
  feedback_for_question2: {
    type: Number,
  },
  feedback_for_question3: {
    type: Number,
  },
  feedback_for_question4: {
    type: Number,
  },
  feedback_for_question5: {
    type: Number,
  },
  feedback_for_question6: {
    type: Number,
  },
  final_feedback: {
    type: String,
  },
  feedback_category: {
    type: String,
  },
});

module.exports = mongoose.model(
  "Coursesectioncomplete",
  coursesectioncompleteSchema
);
