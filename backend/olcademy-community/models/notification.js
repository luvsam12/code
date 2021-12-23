const mongoose = require("mongoose");

const notificationsSchema = new mongoose.Schema({
  user_id: [{ type: String }],
  post_id: {
    type: String,
  },
  notification_user_type: {
    type: String,
  },
  count: {
    type: Number,
    default: 0,
  },
  notification_message: {
    type: String,
    required: true,
  },
  created_on: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Notification", notificationsSchema);
