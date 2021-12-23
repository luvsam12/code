const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userassessmentstatusSchema = new mongoose.Schema({
  user_assessment_status_id: {
    type: String,
    required: true,
  },
  assessment_details_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status_assessment_completed: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model(
  "Userassessmentstatus",
  userassessmentstatusSchema
);
