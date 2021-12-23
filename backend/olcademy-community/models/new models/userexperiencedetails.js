const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const experienceSchema = new mongoose.Schema({
  user_experience_details_id: {
    type: String,
    required: true,
  },
  company_name: {
    type: String,
    required: true,
  },
  designation_year: {
    type: String,
    required: true,
  },
  job_start_year: {
    type: Date,
    required: true,
  },
  job_end_date: {
    type: Date,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Userexperiencedetails", experienceSchema);
