const mongoose = require("mongoose");

const socialProfileSchema = new mongoose.Schema({
  website: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
  link: {
    type: String,
  },
  user_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("SocialProfile", socialProfileSchema);
