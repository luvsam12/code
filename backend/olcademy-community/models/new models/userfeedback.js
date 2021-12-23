const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feedbackSchema = new mongoose.Schema({
  user_feedback_id: {
    type: String,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  user_email_id: {
    type: String,
  },
  user_feedback: {
    type: String,
  },
  user_page_url: {
    type: String,
  },
  user_feedback_timestamp: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Userfeedback", feedbackSchema);
