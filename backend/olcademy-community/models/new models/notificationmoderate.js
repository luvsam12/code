const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationModeratorSchema = new mongoose.Schema({
    notification_moderator_id: {
    type: Number,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  course_id: {
    type: Schema.Types.ObjectId,
    ref: "Courses",
    required: true,
  },
  unique_key: {
    type: String,
    required: true,
  },
  notification_moderator_status: {
    type: Number,
    required: true,
  },
  moderator_mark_as_read: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("NotificationModerator", notificationModeratorSchema);
