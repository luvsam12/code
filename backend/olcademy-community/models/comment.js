const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  post_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  full_name: {
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
  num_of_replies: {
    type: Number,
    default: 0,
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

module.exports = mongoose.model("Comment", commentSchema);
