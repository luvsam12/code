const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const certificateSchema = new mongoose.Schema({
  user_certification_id: {
    type: String,
  },
  certifying_authority: {
    type: String,
    required: true,
  },
  certification_name: {
    type: String,
    required: true,
  },
  certificate_path_name: {
    type: String,
    required: true,
  },
  certification_place: {
    type: String,
  },
  certification_from_date: {
    type: Date,
  },
  certification_to_date: {
    type: Date,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Usercertificationsdetail", certificateSchema);
