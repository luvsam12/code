const mongoose = require("mongoose");
const Schema = Number.Schema;

const skillsrequiredforinternshipSchema = new mongoose.Schema({
  internship_skills_needed_id: {
    type: String,
    required: true,
  },
  internship_id: {
    type: Schema.Types.ObjectId,
    ref: "Internshipcertificationdetails",
    required: true,
  },
  skill_title: {
    type: String,
    required: true,
  },
  is_deleted_status: {
    type: Number,
    required: true,
  },
  updated_timestamp: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model(
  "Skillsrequiredforinternship",
  skillsrequiredforinternshipSchema
);
