const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const educationSchema = new mongoose.Schema({
  user_education_details_id: {
    type: String,
    required: true,
  },
  institution_name: {
    type: String,
    required: true,
  },
  degree_title: {
    type: String,
    required: true,
  },
  degree_start_year: {
    type: Date,
    required: true,
  },
  degree_end_year: {
    type: Date,
    required: true,
  },
  degree_grade: {
    type: Number,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Usereducationdetails", educationSchema);
