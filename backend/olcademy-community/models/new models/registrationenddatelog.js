const mongoose = require("mongoose");
const Schema = Number.Schema;

const registrationenddatelogSchema = new mongoose.Schema({
  registration_end_date_id: {
    type: String,
    required: true,
  },
  course_batch_id: {
    type: Schema.Types.ObjectId,
    ref: "Coursebatch",
    required: true,
  },
  previous_registration_end_date: {
    type: Date,
    required: true,
  },
  is_renew: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model(
  "registrationenddatelog",
  registrationenddatelogSchema
);
