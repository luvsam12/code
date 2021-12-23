const mongoose = require("mongoose");
const Schema = Number.Schema;

const studentperformancesummarySchema = new mongoose.Schema({
  student_performance_summary_id: {
    type: Number,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  trainer_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  assessment_details_id: {
    type: Schema.Types.ObjectId,
    ref: "Assessmentdetails",
    required: true,
  },
  marks_obtained: {
    type: Number,
    required: true,
  },
  topics: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(
  "Studentperformancesummary",
  studentperformancesummarySchema
);
