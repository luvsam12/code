const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  post_id: {
    type: String,
    default: "",
  },
  comment_id: {
    type: String,
    default: "",
  },
  reply_comment_id: {
    type: String,
    default: "",
  },
  report_type: {
    type: String,
    required: true,
  },
  additional_comment: {
    type: String,
    default: ""
  },
});

module.exports = mongoose.model("Report", reportSchema);
