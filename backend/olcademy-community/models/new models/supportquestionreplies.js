const mongoose = require("mongoose");
const Schema = Number.Schema;

const supportquestionrepliesSchema = new mongoose.Schema({
  support_question_replies_id: {
    type: Number,
    required: true,
  },
  support_question_id: {
    type: Schema.Types.ObjectId,
    ref: "Supportquestion",
    required: true,
  },
  support_question_reply: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(
  "Supportquestionreplies",
  supportquestionrepliesSchema
);
