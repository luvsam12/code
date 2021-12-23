const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const discussionforumreportanswerSchema = new mongoose.Schema({
  report_answer_id: {
    type: String,
    required: true,
  },
  discussion_forum_answer_id: {
    type: Schema.Types.ObjectId,
    ref: "Discussionforumanswer",
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  report_answer_timestamp: {
    type: Date,
  },
});

module.exports = mongoose.Model(
  "Discussionforumreportanswer",
  discussionforumreportanswerSchema
);
