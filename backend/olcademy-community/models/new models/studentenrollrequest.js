const mongoose = require("mongoose");
const Schema = Number.Schema;

const studentenrollrequestSchema = new mongoose.Schema({
  student_request_id: {
    type: Number,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  trainer_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  course_id: {
    type: Schema.Types.ObjectId,
    ref: "Courses",
    required: true,
  },
  course_status: {
    type: Number,
    required: true,
  },
  course_batch_id: {
    type: Schema.Types.ObjectId,
    ref: "Coursebatch",
    required: true,
  },
  coupon_applied: {
    type: Number,
    required: true,
  },
  coupon_type: {
    type: Number,
    required: true,
  },
  user_enrolled_date: {
    type: String,
    required: true,
  },
  user_enrolled_timestamp: {
    type: String,
    required: true,
  },
  payment_transaction_id: {
    type: String,
    required: true,
  },
  accept_status: {
    type: String,
    required: true,
  },
  accept_status_timestamp: {
    type: Date,
    required: true,
  },
  refund_status: {
    type: String,
    required: true,
  },
  refund_status_timestamp: {
    type: Date,
    required: true,
  },

  payment_amount: {
    type: String,
    required: true,
  },
  merchant_name: {
    type: String,
    required: true,
  },
  purchase_order_number: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(
  "Studentenrollrequest",
  studentenrollrequestSchema
);
