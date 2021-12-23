const mongoose = require("mongoose");
const Schema = Number.Schema;

const supportquestionSchema = new mongoose.Schema({
  support_question_id: {
    type: Number,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  guest_user_email_id: {
    type: String,
    required: true,
  },
  question_submitted_timestamp: {
    type: Date,
    required: true,
  },
  support_question_subject: {
    type: String,
    required: true,
  },
  support_question_description: {
    type: String,
    required: true,
  },
  support_question_category: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Supportquestion", supportquestionSchema);
