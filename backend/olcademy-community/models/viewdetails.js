const mongoose = require("mongoose");

const viewsSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  post_id: {
    type: String,
    required: true,
  },
  num_of_views: {
    default: 0,
    type: Number,
  },
});

module.exports = mongoose.model("Viewdetail", viewsSchema);
