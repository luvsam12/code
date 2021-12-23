const mongoose = require("mongoose");
const Schema = Number.Schema;

const studentquizanswersSchema = new mongoose.Schema({
  student_quiz_answers_id: {
    type: Number,
    required: true,
  },
  student_answer: {
    type: String,
    required: true,
  },
  assessment_question: {
    type: String,
    required: true,
  },
  assessment_details_id: {
    type: Schema.Types.ObjectId,
    ref: "Assessmentdetails",
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Studentquizanswers", studentquizanswersSchema);
