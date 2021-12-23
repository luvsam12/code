const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const skillSchema = new mongoose.Schema({
  user_skills_id: {
    type: String,
    required: true,
  },
  user_skill: {
    type: String,
    required: true,
  },
  user_skill_rating: {
    type: String,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Userkills", skillSchema);
