const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new mongoose.Schema({
  shared: {
    type: Schema.Types.ObjectId,
    ref: "Posts",
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  post_title: {
    type: String,
    required: true,
  },
  author_name: {
    type: String,
    required: true,
  },
  published_on: {
    type: Date,
  },
  post_content: {
    type: String,
    required: true,
  },
  forum_image_content: {
    type: String,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  hashtags: {
    type: Array,
    default: [],
  },
  notifications: {
    //stores user_id
    type: Array,
    default: [],
  },
  likes: {
    //stores user_id
    type: Array,
    default: [],
  },
  bookmarks: {
    //stores user_id
    type: Array,
    default: [],
  },
  num_of_views: {
    type: Number,
    default: 0,
  },
  num_of_shares: {
    type: Number,
    default: 0,
  },
  media: {
    type: Array,
    default: [],
  },
  media_tag: {
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
  comments: {
    type: Number,
    default: 0,
  },
  post_type: {
    type: String,
    required: true,
  },
  isShared: {
    type: Boolean,
    default: false,
  },
  media_public_id: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("Posts", postSchema);
