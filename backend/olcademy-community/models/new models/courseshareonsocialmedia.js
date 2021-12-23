const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseshareonsocialmediaSchema = new mongoose.Schema({
  course_share_on_social_media_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name_of_platform: {
    type: String,
    required: true,
  },
  timestamp_of_share: {
    type: String,
    required: true,
  },
  course_id: {
    type: Schema.Types.ObjectId,
    ref: "Courses",
    required: true,
  },
});

module.exports = mongoose.model(
  "Courseshareonsocialmedia",
  courseshareonsocialmediaSchema
);
