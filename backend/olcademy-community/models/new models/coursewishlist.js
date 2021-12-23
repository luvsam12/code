const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coursewishlistSchema = new mongoose.Schema({
  course_wishlist_id: {
    type: String,
    required: true,
  },
  course_id: {
    type: Schema.Types.ObjectId,
    ref: "Courses",
    required: true,
  },
  course_batch_id: {
    type: Schema.Types.ObjectId,
    ref: "Coursebatch",
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  course_wishlist_timestamp: {
    type: String,
  },
});

module.exports = mongoose.model("Coursewishlist", coursewishlistSchema);
