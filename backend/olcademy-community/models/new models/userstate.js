const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userstateSchema = new mongoose.Schema({
  login_record_id: {
    type: String,
    required: true,
  },
  login_timestamp: {
    type: String,
    required: true,
  },
  logout_timestamp: {
    type: String,
    required: true,
  },
  login_logout_status: {
    type: String,
    required: true,
    default: "Inactive",
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Userstate", userstateSchema);
