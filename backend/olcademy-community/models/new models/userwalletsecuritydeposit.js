const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersecuritydepositSchema = new mongoose.Schema({
  user_wallet_security_deposit: {
    type: String,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  course_batch_id: {
    type: Schema.Types.ObjectId,
    ref: "Coursebatch",
    required: true,
  },
  course_id: {
    type: Schema.Types.ObjectId,
    ref: "Courses",
    required: true,
  },
  user_security_amount: {
    type: String,
  },
  user_remaining_amount: {
    type: String,
  },
  visible_in_wallet: {
    type: String,
  },
  wallet_transfer: {
    type: String,
  },
  transaction_id: {
    type: String,
  },
  transaction_date: {
    type: String,
  },
});

module.exports = mongoose.model(
  "Usersecuritydeposit",
  usersecuritydepositSchema
);
