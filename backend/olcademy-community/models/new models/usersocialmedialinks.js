const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const socialProfileSchema = new mongoose.Schema({
  user_google_link: {
    type: String,
  },
  user_twitter_link: {
    type: String,
  },
  user_facebook_link: {
    type: String,
  },
  user_linkedin_link: {
    type: String,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("usersocialmedialink", socialProfileSchema);
