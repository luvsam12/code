const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  certifying_firm: {
    type: String,
    required: true,
  },
  name_of_certification: {
    type: String,
    required: true,
  },
  date_of_completion: {
    type: String,
  },
  user_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Certicate", certificateSchema);
