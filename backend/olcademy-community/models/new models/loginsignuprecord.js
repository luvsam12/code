const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const loginsignuprecordSchema = new mongoose.Schema({
  login_signup_record_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  login_timestamp: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Loginsignuprecord", loginsignuprecordSchema);
