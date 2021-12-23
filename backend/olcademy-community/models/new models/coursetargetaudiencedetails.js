const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coursetargetaudiencedetailsSchema = new mongoose.Schema({
  course_target_audience_details_id: {
    type: String,
    required: true,
  },
  course_id: {
    type: Schema.Types.ObjectId,
    ref: "Courses",
    required: true,
  },
  course_target_audience_description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(
  "Coursetargetaudiencedetails",
  coursetargetaudiencedetailsSchema
);
