const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coursepaymentdetailsSchema = new mongoose.Schema({
  course_payment_details_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  payment_transaction_id: {
    type: String,
    required: true,
  },
  secret_key_for_transaction: {
    type: String,
    required: true,
  },
  invoice_id: {
    type: String,
    required: true,
  },
  paid_timestamp: {
    type: Date,
    required: true,
  },
  invoice_path_name: {
    type: String,
    required: true,
  },
  merchant_link_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(
  "Coursepaymentdetails",
  coursepaymentdetailsSchema
);
