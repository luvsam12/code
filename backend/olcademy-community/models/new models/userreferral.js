const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userreferralSchema = new mongoose.Schema({
  user_refer_id: {
    type: String,
    required: true,
  },
  user_refer_code: {
    type: String,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  user_points: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Userreferral", userreferralSchema);
