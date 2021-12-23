const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32,
    unique: true,
  },
  icon: {
    type: String,
    default: null,
  },
  num_of_followers: {
    default: 0,
    type: Number,
  },
});

module.exports = mongoose.model("Category", categorySchema);
