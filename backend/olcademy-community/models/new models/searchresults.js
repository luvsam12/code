const mongoose = require("mongoose");
const Schema = Number.Schema;

const searchresultsSchema = new mongoose.Schema({
  search_results_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  search_term: {
    type: String,
    required: true,
  },
  search_result_course_id: {
    type: String,
    required: true,
  },
  search_result_timestamp: {
    type: Date,
    required: true,
  },
  course_clicked_flag: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Searchresults", searchresultsSchema);
