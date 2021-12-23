const mongoose = require("mongoose");

const replyCommentSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  full_name: {
    type: String,
    required: true,
  },
  parent_comment_id: {
    type: String,
    required: true,
  },
  parent_reply_id: {
    type: String,
    default: "",
  },
  depth: {
    type: Number,
    default: 2,
  },
  post_id: {
    type: String,
    required: true,
  },
  user_type: {
    type: String,
    required: true,
  },
  about_user: {
    type: String,
    default: null,
  },
  comment: {
    type: String,
    default: null,
    required: true,
  },
  likes: {
    type: Array,
    default: [],
  },
  spam: {
    type: Number,
    default: 0,
  },
  inappropriate_content: {
    type: Number,
    default: 0,
  },
  harassment: {
    type: Number,
    default: 0,
  },
  copyright_issue: {
    type: Number,
    default: 0,
  },
  other: {
    type: Number,
    default: 0,
  },
  show: {
    type: Number,
    default: 1,
  },
  reports: {
    type: Number,
    default: 0,
  },
  published_on: {
    // published timestamp
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("ReplyComment", replyCommentSchema);
