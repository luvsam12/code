const mongoose = require("mongoose");
const Schema = Number.Schema;

const userappliedSchema = new mongoose.Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  user_name: {
    type: String,
    required: true,
  },
  user_email: {
    type: String,
    required: true,
  },
  path_for_resume: {
    type: String,
    required: true,
  },
  certificate_id_number: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Userapplied", userappliedSchema);
