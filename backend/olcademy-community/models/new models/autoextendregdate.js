const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const autoextendregdateSchema = new mongoose.Schema({
  auto_extend_id: {
    type: String,
    required: true,
  },
  course_id: {
    type: Schema.Types.ObjectId,
    ref: "Courses",
    required: true,
  },
  course_batch_id: {
    type: Schema.Types.ObjectId,
    ref: "Coursebatch",
    required: true,
  },
  auto_extend_reg_date: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Autoextendregdate", autoextendregdateSchema);
