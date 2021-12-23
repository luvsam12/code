const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
  company_name: {
    type: String,
    required: true,
  },
  designation_title: {
    type: String,
    required: true,
  },
  job_start_date: {
    type: String,
    required: true,
  },
  job_end_date: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Experience", experienceSchema);
