const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const assessmentquestionandanswerSchema = new mongoose.Schema({
  assessment_question_answer_id: {
    type: String,
    required: true,
  },
  assessment_details_id: {
    type: Schema.Types.ObjectId,
    ref: "Assessmentdetails",
    required: true,
  },
  question_sequence_number: {
    type: Number,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  option1: {
    type: String,
    required: true,
  },
  option2: {
    type: String,
    required: true,
  },
  option3: {
    type: String,
    required: true,
  },
  option4: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  question_score: {
    type: Number,
    required: true,
  },
  question_difficulty: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(
  "Assessmentquestionandanswer",
  assessmentquestionandanswerSchema
);
