const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new mongoose.Schema({
  project_name: {
    type: String,
    required: true,
  },
  no_of_team_members: {
    type: Number,
    required: true,
  },
  project_start_date: {
    type: String,
    required: true,
  },
  project_end_date: {
    type: String,
    required: true,
  },
  project_description: {
    type: String,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Userprojectdetail", projectSchema);
