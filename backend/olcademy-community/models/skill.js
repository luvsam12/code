const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  user_skill: {
    type: String,
    required: true,
  },
  user_skill_rating: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Skill", skillSchema);
