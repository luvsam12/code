const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationMainSchema = new mongoose.Schema({
  notification_main_id :{
      type: String,
      required: true,
  },
  notification_type :{
      type: Number,
      required: true,
  },
  notification_category:{
      type: String,
      required: true,
  },
  unique_key:{
      type: String,
      required: true,

  },
  notification_timestamp:{
      type: Date,
  },
});
module.exports = mongoose.model("NotificationMain", notificationMainSchema);
