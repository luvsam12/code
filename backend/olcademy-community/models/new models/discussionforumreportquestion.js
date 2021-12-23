const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const discussionforumreportquestionSchema = new mongoose.Schema({
  reported_question_id: {
    type: String,
    required: true,
  },
  discussion_forum_question_id: {
    type: Schema.Types.ObjectId,
    ref: "Discussionforumquestions",
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  reported_question_timestamp: {
    type: Date,
  },
});

module.exports = mongoose.Model(
  "Discussionforumreportquestion",
  discussionforumreportquestionSchema
);
