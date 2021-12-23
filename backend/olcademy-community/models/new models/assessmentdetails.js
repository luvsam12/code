const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const assessmentdetailsSchema = new mongoose.Schema({
  assessment_details_id: {
    type: String,
    required: true,
  },
  topics: {
    type: String,
    required: true,
  },
  trainer_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  duration_of_assessment: {
    type: String,
    required: true,
  },
  validity_period: {
    type: String,
    required: true,
  },
  course_id: {
    type: Schema.Types.ObjectId,
    ref: "Courses",
    required: true,
  },
  assessment_name: {
    type: String,
    required: true,
  },
  publish_status: {
    type: String,
    required: true,
  },
  publish_date: {
    type: Date,
    required: true,
  },
  course_batch_id: {
    type: Schema.Types.ObjectId,
    ref: "Coursebatch",
    required: true,
  },
});

module.exports = mongoose.model("Assessmentdetails", assessmentdetailsSchema);
