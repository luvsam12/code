const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
  institution_name: {
    type: String,
    required: true,
  },
  degree_title: {
    type: String,
    required: true,
  },
  degree_start_date: {
    type: String,
    required: true,
  },
  degree_end_date: {
    type: String,
    required: true,
  },
  degree_grade: {
    type: Number,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Education", educationSchema);
